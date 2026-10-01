import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = path.join(__dirname, "linkedin-posts", "clean");
const OUTPUT_DIR = path.join(__dirname, "..", "src", "content", "blog");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function parseRelativeDate(content) {
  const match = content.match(/hace (\d+) (dia|semana|mes|año)s?/i);
  if (!match) return new Date().toISOString().split("T")[0];

  const num = parseInt(match[1]);
  const unit = match[2].toLowerCase();
  const now = new Date();

  if (unit.includes("dia") || unit === "day") {
    now.setDate(now.getDate() - num);
  } else if (unit.includes("semana") || unit === "week") {
    now.setDate(now.getDate() - num * 7);
  } else if (unit.includes("mes") || unit === "month") {
    now.setMonth(now.getMonth() - num);
  } else if (unit.includes("año") || unit === "year") {
    now.setFullYear(now.getFullYear() - num);
  }

  return now.toISOString().split("T")[0];
}

function cleanBody(text) {
  return text
    .replace(
      /^[\d\s]+(semana|mes|día|año)s?\s*•.*?(?=El Impacto|El impacto)/i,
      "",
    )
    .replace(/hashtag#/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(body) {
  const firstSentence = body.split(/[.!?]/)[0];
  if (firstSentence && firstSentence.length > 10) {
    return firstSentence.length > 60
      ? firstSentence.substring(0, 57) + "..."
      : firstSentence;
  }
  return "CIHUBS - Actualización";
}

function processPost(filepath, index) {
  const content = fs.readFileSync(filepath, "utf8");

  let dateStr = "";
  let bodyLines = [];
  let inBody = false;

  const lines = content.split("\n");

  for (const line of lines) {
    if (line.startsWith("# ")) {
      const parts = line.replace("# ", "").split(" - ");
      if (parts.length > 1) {
        dateStr = parts[1].trim();
      }
      continue;
    }

    if (line.startsWith("*hace")) {
      dateStr = line.replace("*", "").trim();
      continue;
    }

    if (line.startsWith("---")) {
      inBody = true;
      continue;
    }

    if (line.startsWith("## Imágenes")) {
      inBody = false;
      continue;
    }

    if (inBody && line.trim() && !line.startsWith("![")) {
      bodyLines.push(line.trim());
    }
  }

  let fullBody = bodyLines.join(" ");
  fullBody = cleanBody(fullBody);

  const date = parseRelativeDate(fullBody);
  const title = extractTitle(fullBody);

  const slug = `linkedin-post-${index}`;

  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
meta_title: ""
description: "${fullBody.substring(0, 150).replace(/"/g, '\\"')}..."
date: ${date}
image: ""
categories:
  - Technology
  - Innovation
author: "CIHUBS"
tags:
  - LinkedIn
  - Innovation
  - Costa Rica
  - Entrepreneurship
draft: false
---

${fullBody}
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.md`), frontmatter);
  console.log(`✅ ${slug}.md - ${title.substring(0, 50)}...`);
}

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((f) => f.endsWith(".md") && f.includes("---hace"))
  .sort();

files.forEach((file, index) => {
  processPost(path.join(INPUT_DIR, file), index + 1);
});

console.log(`\n✨ Completado! ${files.length} posts en ${OUTPUT_DIR}`);
