import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

puppeteer.use(StealthPlugin());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LINKEDIN_URL = "https://www.linkedin.com/company/cihubs/posts/";
const OUTPUT_DIR = path.join(__dirname, "linkedin-posts");
const OUTPUT_CLEAN_DIR = path.join(OUTPUT_DIR, "clean");
const COOKIE_FILE = path.join(__dirname, "linkedin-cookies.json");

const PROFILE_PHOTO_PATTERN = /profile-displayphoto/i;
const LOGO_CIHUBS_PATTERN = /cihubs_logo/i;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function saveCookies(page) {
  const cookies = await page.cookies();
  fs.writeFileSync(COOKIE_FILE, JSON.stringify(cookies, null, 2));
  console.log("💾 Cookies guardadas");
}

async function loadCookies(page) {
  if (fs.existsSync(COOKIE_FILE)) {
    const cookies = JSON.parse(fs.readFileSync(COOKIE_FILE, "utf8"));
    await page.setCookie(...cookies);
    console.log("💾 Cookies cargadas");
    return true;
  }
  return false;
}

async function scrapeLinkedIn() {
  console.log("🔐 LinkedIn Post Scraper para CIHubs\n");
  console.log("===========================================");
  console.log("INSTRUCCIONES:");
  console.log("1. Se abrirá LinkedIn en el navegador");
  console.log("2. Inicia sesión con Google SSO");
  console.log("3. El script detectará automáticamente el login");
  console.log("4. Se extraerán los posts automáticamente");
  console.log("===========================================\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    const hasCookies = await loadCookies(page);

    if (hasCookies) {
      console.log("📍 Abriendo LinkedIn con sesión guardada...");
      await page.goto("https://www.linkedin.com/feed", {
        waitUntil: "networkidle2",
      });

      const stillLoggedIn = await page.$(
        ".feed-shared-update-v2, .global-nav, [data-test-global-nav]",
      );
      if (stillLoggedIn) {
        console.log("✅ Sesión válida!Continuando...\n");
      } else {
        console.log("⚠️ Sesión expirada. Necesitas iniciar sesión de nuevo.");
        fs.unlinkSync(COOKIE_FILE);
        await page.goto("https://www.linkedin.com/login", {
          waitUntil: "networkidle2",
        });
      }
    } else {
      console.log("📍 Abriendo LinkedIn...");
      await page.goto("https://www.linkedin.com/login", {
        waitUntil: "networkidle2",
      });
    }

    const needsLogin = await page.$("#username");
    let loginDetected = false;

    if (needsLogin) {
      console.log("\n👤 Por favor inicia sesión con Google SSO...");
      console.log(
        "   El script continuará automáticamente en 600 segundos (10 minutos)...",
      );
      console.log("   O cuando detecte que has iniciado sesión.\n");

      let secondsWaited = 0;
      const maxSeconds = 600;

      while (!loginDetected && secondsWaited < maxSeconds) {
        await sleep(4000);
        secondsWaited += 2;

        try {
          const currentUrl = page.url();

          if (
            currentUrl.includes("/feed") ||
            currentUrl.includes("/company/") ||
            currentUrl.includes("/home")
          ) {
            console.log(`✅ Sesión detectada! URL: ${currentUrl}`);
            loginDetected = true;
          } else if (currentUrl.includes("checkpoint")) {
            console.log(`   ⏳ Verificando 2FA... (${secondsWaited}s)`);
          } else if (
            !currentUrl.includes("login") &&
            !currentUrl.includes("checkpoint")
          ) {
            console.log(`✅ Sesión detectada! URL: ${currentUrl}`);
            loginDetected = true;
          }
        } catch (e) {
          console.log("✅ Sesión detectada!");
          loginDetected = true;
        }

        if (!loginDetected && secondsWaited % 10 === 0) {
          console.log(`   ... esperando (${secondsWaited}s/${maxSeconds}s)`);
        }
      }

      if (loginDetected) {
        console.log("💾 Guardando cookies de sesión...");
        await saveCookies(page);
      }
    } else {
      console.log("✅ Ya tienes sesión activa!");
      await saveCookies(page);
    }

    if (!loginDetected && needsLogin) {
      console.log("⚠️ No se detectó login automático. Intentando continuar...");
    } else {
      console.log("✅ Sesión iniciada correctamente!");
    }

    console.log("\n📍 Verificando sesión en /feed...");
    await page.goto("https://www.linkedin.com/feed", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await sleep(3000);

    console.log("📍 Navegando a posts de CIHubs...");
    await page.goto(LINKEDIN_URL, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await sleep(12000);

    console.log("📜 Extrayendo posts (scrolling)...\n");

    const posts = [];
    let scrollAttempts = 0;
    const maxScrollAttempts = 15;
    let lastPostCount = 0;
    let consecutiveNoChange = 0;

    while (scrollAttempts < maxScrollAttempts) {
      await sleep(2000);

      await page.evaluate(() => {
        const selectors = [
          ".feed-shared-text__show-more-button",
          'button[aria-label*="See more"]',
          'button[aria-label*="Ver más"]',
          '[class*="show-more"] button',
          ".feed-shared-inline-show-more-button",
          ".feed-shared-update-v2__show-more-button",
        ];

        for (const sel of selectors) {
          const buttons = document.querySelectorAll(sel);
          buttons.forEach((btn) => {
            if (btn.offsetParent !== null) {
              btn.click();
            }
          });
        }
      });
      await sleep(2000);

      const postElements = await page
        .evaluate(() => {
          const selectors = [
            ".feed-shared-update-v2",
            "article",
            ".scaffold-finite-scroll",
          ];
          let elements = [];
          for (const sel of selectors) {
            elements = document.querySelectorAll(sel);
            if (elements.length > 0) break;
          }
          return Array.from(elements).map((el) => {
            const text = el.innerText || "";
            const author =
              el.querySelector(".feed-shared-actor__name, [class*='actor']")
                ?.innerText || "CIHubs";
            const date =
              el.querySelector(".feed-shared-actor__sub-description, time")
                ?.innerText || "";
            const images = Array.from(el.querySelectorAll("img"))
              .map((img) => img.src)
              .filter(
                (src) =>
                  src && src.includes("licdn.com") && !src.includes("data:"),
              )
              .slice(0, 5);
            const links = Array.from(
              el.querySelectorAll("a[href*='/company/'], a[href*='/profile/']"),
            )
              .map((a) => ({ text: a.innerText?.trim() || "", href: a.href }))
              .filter(
                (l) => l.text && l.href && l.href.includes("linkedin.com"),
              );

            return { text, author, date, images, links: links.slice(0, 20) };
          });
        })
        .catch(() => []);

      console.log(
        `   Scroll ${scrollAttempts + 1}/${maxScrollAttempts} - Elementos encontrados: ${postElements.length}`,
      );

      for (const el of postElements) {
        try {
          const text = (el.text || "").trim();
          const author = el.author || "CIHubs";
          const date = el.date || "";
          const images = el.images || [];
          const links = el.links || [];

          if (text && text.length > 20) {
            const postId = `${author}-${date}-${text.substring(0, 30)}`.replace(
              /[^a-zA-Z0-9]/g,
              "",
            );
            if (!posts.find((p) => p.id === postId)) {
              posts.push({
                id: postId,
                text,
                author,
                date,
                images,
                links,
              });
            }
          }
        } catch (e) {}
      }

      if (posts.length === lastPostCount && lastPostCount > 0) {
        consecutiveNoChange++;
        if (consecutiveNoChange >= 2) {
          console.log(
            "   ⏹️ No hay más posts nuevos (verificado 2 veces), terminado.",
          );
          break;
        }
        console.log(
          `   ⏹️ Sin cambios (${consecutiveNoChange}/2), intentando un scroll más...`,
        );
      } else {
        consecutiveNoChange = 0;
      }
      lastPostCount = posts.length;

      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
      await sleep(6000);
      scrollAttempts++;
    }

    console.log(`\n📊 Total de posts extraídos: ${posts.length}\n`);

    let savedCount = 0;
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const safeDate =
        (post.date || "").replace(/[^a-zA-Z0-9]/g, "-").substring(0, 20) ||
        `post-${i + 1}`;
      const filename = `${i + 1}-${safeDate}.md`;
      const filepath = path.join(OUTPUT_DIR, filename);

      let markdown = `# Post de LinkedIn\n\n`;
      markdown += `**Autor:** ${post.author || "CIHubs"}\n`;
      markdown += `**Fecha:** ${post.date || "N/A"}\n`;
      markdown += `**ID:** ${post.id}\n\n`;
      markdown += `---\n\n`;
      markdown += `## Contenido\n\n${post.text || "Sin contenido"}\n\n`;

      const images = post.images || [];
      if (images.length > 0) {
        markdown += `## Imágenes\n\n`;
        images.forEach((img, idx) => {
          markdown += `![Imagen ${idx + 1}](${img})\n`;
        });
        markdown += "\n";
      }

      const links = post.links || [];
      if (links.length > 0) {
        markdown += `## Empresas/Menciones\n\n`;
        links.forEach((link) => {
          markdown += `- [${link.text}](${link.href})\n`;
        });
        markdown += "\n";
      }

      fs.writeFileSync(filepath, markdown);
      console.log(`  ✅ Guardado: ${filename}`);
      savedCount++;
    }

    console.log(
      `\n✨ Proceso completado! ${savedCount} posts guardados en ${OUTPUT_DIR}`,
    );

    console.log("\n👋 Listo! Cierra el navegador cuando quieras.");
    await sleep(10000);
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.log("\n👀 Navegador abierto para que verifiques...");
    await sleep(30000);
  } finally {
    await browser.close();
  }
}

scrapeLinkedIn();
