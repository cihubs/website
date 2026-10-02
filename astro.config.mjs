import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import qwikdev from "@qwikdev/astro";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import sharp from "sharp";
import config from "./src/config/config.json";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  image: { service: sharp() },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    qwikdev(),
    sitemap(),
    AutoImport({
      imports: [
        "@/shortcodes/Button.astro",
        "@/shortcodes/Accordion.astro",
        "@/shortcodes/Notice.astro",
        "@/shortcodes/Video.astro",
        "@/shortcodes/Youtube.astro",
        "@/shortcodes/Tabs.astro",
        "@/shortcodes/Tab.astro",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: { theme: "one-dark-pro", wrap: true },
    extendDefaultPlugins: true,
  },
});
