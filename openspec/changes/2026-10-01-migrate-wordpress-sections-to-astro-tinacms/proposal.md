# Proposal

## Why

The current CIHUBS website runs on WordPress with 5 main program sections (Soft Landing, Zonas Francas, Cadenas Globales, Ciudades Científicas, Brazo Comercial) plus 2 subpages (Discovery, Inmersión). These sections are hardcoded in WordPress, making it difficult for the client to manage content without developer assistance. The client requires TinaCMS to manage blog posts independently, but the program sections also need to be editable through the same CMS system.

## What Changes

- Create 7 new Astro page routes for program sections under `src/pages/programas/`
- Extend TinaCMS schema to include a `programs` collection with fields for title, subtitle, description, phases, and components
- Repair all TinaCMS deprecated packages/APIs and declare `tinacms` explicitly with aligned versions
- Build 4 new Astro components (Flowbite vanilla, zero JS): ProgramHero, ProgramPhase, ProgramComponent, ProgramCTA
- Build 2 navigation components: ProgramsDropdown, LanguageSwitcher (Flowbite data-attributes, inline SVG icons)
- Convert stateful React islands to Qwik (Announcement, SearchModal, Tabs, Accordion) and remove React entirely
- Remove Disqus (`disqus-react`) — replaced by Giscus on GitHub Discussions (repo `cihubs/content`, public)
- Create blog listing page at `src/pages/noticias/index.astro`
- Migrate all program content from cihubs.com to TinaCMS markdown files
- Consume @cihubs/design-system as workspace dependency (Poppins/Montserrat/Work Sans/Open Sans fonts, #203370 blue palette)

## Capabilities

### New Capabilities

- `program-content-management`: Enable client to manage program page content through TinaCMS without developer intervention
- `program-navigation`: Provide structured navigation for 5 main programs and 2 subpages matching WordPress structure
- `blog-listing`: Display blog posts with TinaCMS integration in a dedicated noticias section

## Impact

- **Affected code**: New Astro routes, TinaCMS schema extension, new Astro/Qwik components, React removal
- **Dependencies**: @cihubs/design-system as workspace dependency (quad-font per DESIGN.md), TinaCMS (aligned versions), Qwik + flowbite-qwik, Flowbite vanilla
- **Systems**: WordPress → content migration target, no impact on live WordPress site during development
- **Breaking changes**: React removal (islands rewritten), Disqus removal, Puppeteer scraper extraction to market-insights repo
