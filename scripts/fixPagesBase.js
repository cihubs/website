import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Workaround for @qwikdev/astro emitting Qwik chunk URLs as
// `{base-without-trailing-slash}build/...` (missing separator) on non-root
// bases, e.g. `/websitebuild/q-*.js` instead of `/website/build/q-*.js`.
// Rewrites the malformed prefix in built HTML files. No-op on root base.
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../src/config/config.json"), "utf8"),
);
const base = (config.site?.base_path || "/").replace(/\/$/, "");

if (!base) {
  console.log("fixPagesBase: root base, nothing to fix.");
  process.exit(0);
}

const dist = path.join(__dirname, "../dist");
const bad = ["/build/", "/assets/"].map((p) => `${base}${p.replace(/^\//, "")}`);
const good = [`${base}/build/`, `${base}/assets/`];

let fixed = 0;
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) {
      let html = fs.readFileSync(full, "utf8");
      let out = html;
      bad.forEach((b, i) => {
        out = out.split(b).join(good[i]);
      });
      if (out !== html) {
        fs.writeFileSync(full, out);
        fixed++;
      }
    }
  }
};
walk(dist);
console.log(`fixPagesBase: repaired ${fixed} HTML file(s) for base "${base}/".`);

// Fix split-brain asset emission: with a non-root base, island JS bundles
// (ClientRouter, Swiper, Youtube, qwik-preloader/loader, root.*.js) are
// emitted to dist/<base>/_astro/ while the HTML references <base>/_astro/*,
// which both `astro preview` and GitHub project Pages resolve against the
// dist ROOT (…/<base>/X → dist/X). So those JS files 404 unless merged up.
// Move (not copy) every file from dist/<base>/_astro/ into dist/_astro/.
// Idempotent: skips gracefully when the nested dir is absent.
const nestedAstro = path.join(dist, base.replace(/^\//, ""), "_astro");
const rootAstro = path.join(dist, "_astro");
if (fs.existsSync(nestedAstro)) {
  fs.mkdirSync(rootAstro, { recursive: true });
  let moved = 0;
  for (const f of fs.readdirSync(nestedAstro)) {
    const src = path.join(nestedAstro, f);
    const dest = path.join(rootAstro, f);
    if (!fs.statSync(src).isFile()) continue;
    if (!fs.existsSync(dest)) {
      fs.renameSync(src, dest);
      moved++;
    } else if (fs.readFileSync(src).equals(fs.readFileSync(dest))) {
      fs.unlinkSync(src); // identical duplicate, drop nested copy
      moved++;
    } else {
      console.log(
        `fixPagesBase: CONFLICT ${f} differs between nested and root _astro; keeping dist/_astro copy (served path wins).`,
      );
    }
  }
  if (fs.readdirSync(nestedAstro).length === 0) fs.rmdirSync(nestedAstro);
  console.log(
    `fixPagesBase: merged ${moved} file(s) from dist/${base.replace(/^\//, "")}/_astro/ into dist/_astro/.`,
  );
} else {
  console.log("fixPagesBase: no nested _astro dir, asset merge skipped.");
}
