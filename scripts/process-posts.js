import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = path.join(__dirname, "linkedin-posts");
const OUTPUT_DIR = path.join(INPUT_DIR, "clean");

const PROFILE_PHOTO_PATTERN = /profile-displayphoto/i;
const LOGO_CIHUBS_PATTERN = /cihubs_logo/i;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function cleanContent(text) {
  let cleaned = text
    .replace(/hashtag\n#/g, "#")
    .replace(/hashtag\n/g, "")
    .replace(/Número de publicación en el feed \d+/g, "")
    .replace(/^CIHUBS\s*$/gm, "")
    .replace(/^\d+ seguidores\s*$/gm, "")
    .replace(/^\d+ veces compartido\s*$/gm, "")
    .replace(/^\d+\s*$/gm, "")
    .replace(/^Joseph Hidalgo Rodríguez y \d+\s+personas más\s*$/gm, "")
    .replace(/^Recomendar\s*$/gm, "")
    .replace(/^Comentar\s*$/gm, "")
    .replace(/^Compartir\s*$/gm, "")
    .replace(/^Enviar\s*$/gm, "")
    .replace(/^Activar para ver una imagen más grande\.\s*$/gm, "")
    .replace(/\.\.\. más/g, "")
    .replace(/Tu documento se está cargando/gi, "")
    .replace(/nacion\.com\s*Celebrar/gi, "")
    .replace(/\s+Celebrar\s*$/gi, "")
    .replace(/\s+Ver más\s*$/gi, "")
    .replace(/\s+Ver menos\s*$/gi, "")
    .replace(/mess\b/gi, "meses")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned;
}

function extractDate(lines) {
  const datePatterns = [
    /hace (\d+) (día|semana|mes|año)s?/i,
    /(\d+) (día|semana|mes|año)s? atrás/i,
  ];

  for (const line of lines) {
    for (const pattern of datePatterns) {
      const match = line.match(pattern);
      if (match) {
        const num = match[1];
        const unit = match[2];
        const suffix = parseInt(num) === 1 ? "" : "s";
        return `hace ${num} ${unit}${suffix}`;
      }
    }
  }
  return "";
}

function processPost(filepath, index) {
  const content = fs.readFileSync(filepath, "utf8");
  const lines = content.split("\n");

  let title = "";
  let date = "";
  let contentStart = false;
  let images = [];
  let links = [];
  let rawContent = [];
  let inContent = false;
  let inImages = false;
  let inLinks = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("# Post")) {
      continue;
    }

    if (line.startsWith("**Autor:**")) {
      title = line.replace("**Autor:**", "").trim();
      continue;
    }

    if (line.startsWith("**Fecha:**")) {
      date = extractDate(lines.slice(0, i));
      continue;
    }

    if (
      !date &&
      (line.match(/^\d+\s+(mes|semana|día|año)/) || line.match(/^hace \d+/))
    ) {
      date = extractDate([line]);
    }

    if (line.startsWith("**Fecha:**")) {
      date = extractDate(lines.slice(0, i));
      continue;
    }

    if (
      line.startsWith("**Autor:**") ||
      line.match(/^\d+\s+(mes|semana|día|año)/)
    ) {
      const possibleDate = extractDate([line]);
      if (possibleDate && !date) {
        date = possibleDate;
      }
    }

    if (line.startsWith("## Contenido")) {
      inContent = true;
      contentStart = true;
      continue;
    }

    if (line.startsWith("## Imágenes")) {
      inContent = false;
      inImages = true;
      continue;
    }

    if (line.startsWith("## Empresas")) {
      inImages = false;
      inLinks = true;
      continue;
    }

    if (inContent && line.trim()) {
      rawContent.push(line);
    }

    if (inImages && line.startsWith("![")) {
      const match = line.match(/!\[.*?\]\((.*?)\)/);
      if (match) {
        const url = match[1];
        if (
          !PROFILE_PHOTO_PATTERN.test(url) &&
          !LOGO_CIHUBS_PATTERN.test(url)
        ) {
          images.push(url);
        }
      }
    }

    if (inLinks && line.startsWith("- [")) {
      const match = line.match(/- \[(.*?)\]\((.*?)\)/);
      if (match) {
        let name = match[1].replace(/\n/g, " ").trim();
        if (!name.includes("seguidores") && name.length > 2) {
          links.push({ name, url: match[2] });
        }
      }
    }
  }

  let fullContent = cleanContent(rawContent.join("\n"));

  const sortedLinks = links.sort((a, b) => b.name.length - a.name.length);

  sortedLinks.forEach((l) => {
    const regex = new RegExp(`\\b${escapeRegex(l.name)}\\b`, "gi");
    if (regex.test(fullContent)) {
      fullContent = fullContent.replace(regex, `[$&](${l.url})`);
    }
  });

  const titleWithDate = date ? `${title} - ${date}` : title;
  const safeTitle =
    titleWithDate
      .replace(/mess\b/gi, "meses")
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50) || `post-${index}`;
  const outputFilename = `${index}-${safeTitle}.md`;

  let markdown = `# ${titleWithDate.replace(/mess\b/gi, "meses")}\n\n`;
  if (date) {
    markdown += `*${date.replace(/mess\b/gi, "meses")}*\n\n`;
  }
  markdown += `---\n\n`;
  markdown += fullContent + "\n\n";

  if (images.length > 0) {
    markdown += `## Imágenes\n\n`;
    images.forEach((img, idx) => {
      markdown += `![Imagen ${idx + 1}](${img})\n`;
    });
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, outputFilename), markdown);
  console.log(`✅ Guardado: ${outputFilename}`);
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((f) => f.endsWith(".md") && !f.includes("clean"))
  .sort();

files.forEach((file, index) => {
  processPost(path.join(INPUT_DIR, file), index + 1);
});

console.log(`\n✨ Proceso completado! Archivos guardados en ${OUTPUT_DIR}`);
