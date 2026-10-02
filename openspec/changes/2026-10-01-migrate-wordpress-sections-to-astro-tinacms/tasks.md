# Tasks
<!-- Recovered from Devin stash 2026-10-01; corrected 2026-10-02: React -> Qwik + pure Astro, Flowbite vanilla, TinaCMS full repair. Checkboxes reset to [ ] (prior [x] did not land in any branch). -->

## 1. TinaCMS Schema Extension + Deprecated Repair

- [ ] 1.1 Declare `tinacms` explicitly and align `tinacms`/`@tinacms/cli`/`@tinacms/fields` versions; inventory and fix all deprecated packages/APIs
- [ ] 1.2 Add `programs` collection to `.tina/config.ts` with fields for title, subtitle, description, phases, and components and verify TinaCMS starts without schema validation errors
- [ ] 1.3 Regenerate `.tina/__generated__` and verify `tinacms dev` admin loads collections cleanly
- [ ] 1.4 Create `src/content/programs/` directory structure and verify directory exists

## 2. Astro Program Components (Flowbite vanilla, zero JS)

- [ ] 2.1 Create ProgramHero component in `src/components/astro/ProgramHero.astro` with title, subtitle, description props and verify component renders with CIHUBS branding (#203370 primary, Poppins 700 via design-system tokens)
- [ ] 2.2 Create ProgramPhase component in `src/components/astro/ProgramPhase.astro` (Flowbite accordion data-attributes) with title, duration, content, link props and verify expand/collapse works without framework JS
- [ ] 2.3 Create ProgramComponent component in `src/components/astro/ProgramComponent.astro` with title, content, list props and verify component renders lists with proper styling
- [ ] 2.4 Create ProgramCTA component in `src/components/astro/ProgramCTA.astro` with contact link and verify CTA button uses Montserrat 700 via semantic class

## 3. Navigation Components

- [ ] 3.1 Create ProgramsDropdown component in `src/components/astro/ProgramsDropdown.astro` (Flowbite dropdown data-attributes, inline SVG chevron) with 5 program links and verify dropdown displays all programs with CIHUBS blue accent
- [ ] 3.2 Create LanguageSwitcher component in `src/components/astro/LanguageSwitcher.astro` with ES/EN toggle placeholder (full i18n is a separate change)

## 4. Qwik Islands + React Removal

- [ ] 4.1 Add `@qwikdev/astro` + `flowbite-qwik` integrations and remove `@astrojs/react` from `astro.config.mjs`
- [ ] 4.2 Convert Announcement, SearchModal (+SearchResult), Tabs/Tab, Accordion to Qwik islands
- [ ] 4.3 Convert Video, Youtube, Button, Notice shortcodes to pure `.astro`; rewrite `useTheme` hook and `DynamicIcon` without React
- [ ] 4.4 Replace all `react-icons` usage with inline SVG; replace Disqus widget with Giscus (GitHub Discussions backend, `.astro` component, pathname mapping, repo `cihubs/content`)
- [ ] 4.5 Uninstall `react`, `react-dom`, `@astrojs/react`, `disqus-react`, `react-icons` and verify no React imports remain

## 5. Astro Routes

- [ ] 5.1 Create `src/pages/programas/index.astro` programs overview page and verify page renders with links to all 5 programs
- [ ] 5.2 Create `src/pages/programas/soft-landing-de-conocimiento-e-innovacion.astro` and verify page loads ProgramHero, ProgramPhase components with TinaCMS content
- [ ] 5.3 Create `src/pages/programas/programas-discovery.astro` and verify page displays Discovery program content with 3 programs
- [ ] 5.4 Create `src/pages/programas/programas-inmersion.astro` and verify page displays Inmersión program content with 3 main programs and subprograms
- [ ] 5.5 Create `src/pages/programas/potenciar-zonas-francas-a-high-tech.astro` and verify page displays 5 key functions and 7 components
- [ ] 5.6 Create `src/pages/programas/encadenamientos-globales.astro` and verify page displays program description and stages
- [ ] 5.7 Create `src/pages/programas/ciudades-cientificas-y-tecnologicas.astro` and verify page displays 5 implementation stages
- [ ] 5.8 Create `src/pages/programas/brazo-comercial-de-generadores-de-conocimiento.astro` and verify page displays services and Venture Builder program

## 6. Blog Listing

- [ ] 6.1 Create `src/pages/noticias/index.astro` blog listing page and verify page displays all blog posts from src/content/blog/
- [ ] 6.2 Implement pagination in blog listing when there are more than 10 posts and verify pagination controls appear correctly

## 7. Content Migration (source: https://cihubs.com/programas/ + child pages)

- [ ] 7.1 Migrate PROGRAMA 1 content to `src/content/programs/soft-landing.md` and verify content matches live site text
- [ ] 7.2 Migrate Discovery subpage content to `src/content/programs/discovery.md` and verify all 3 programs are included
- [ ] 7.3 Migrate Inmersión subpage content to `src/content/programs/inmersion.md` and verify all 3 main programs and subprograms are included
- [ ] 7.4 Migrate PROGRAMA 2 content to `src/content/programs/zonas-francas.md` and verify 5 key functions and 7 components are included
- [ ] 7.5 Migrate PROGRAMA 3 content to `src/content/programs/cadenas-globales.md` and verify program description and stages are included
- [ ] 7.6 Migrate PROGRAMA 4 content to `src/content/programs/ciudades-cientificas.md` and verify 5 implementation stages are included
- [ ] 7.7 Migrate PROGRAMA 5 content to `src/content/programs/brazo-comercial.md` and verify services and Venture Builder program are included

## 8. Design-System Wiring + Readability

- [ ] 8.1 Wire @cihubs/design-system as pnpm workspace dependency; remove vendored-token drift and hardcoded font families in components
- [ ] 8.2 Define semantic `@layer components` classes (buttons, cards) and verify no loose utilities or font literals remain outside `src/components/astro/` and `src/styles/`

## 9. Flowbite Vanilla Integration

- [ ] 9.1 Install `flowbite` (no flowbite-react) and add theme import + plugin + source to `src/styles/main.css` per Flowbite Astro docs
- [ ] 9.2 Include pinned Flowbite JS in `Base.astro` and verify dropdown/accordion interactivity with zero framework JS

## 10. Tooling + Scraper Extraction

- [ ] 10.1 Migrate package manager to pnpm (single lockfile, `packageManager` field) and mirror `node scripts/*` as `deno task`
- [ ] 10.2 Extract Puppeteer LinkedIn scraper to `cihubs/market-insights` repo; remove `puppeteer*` deps and `scripts/linkedin-scraper.js` from website

## 11. Integration and Testing

- [ ] 11.1 Test TinaCMS admin can edit program content and verify changes save to markdown files and appear on pages immediately
- [ ] 11.2 Verify all program pages use CIHUBS design system tokens (colors, typography, spacing) and run visual inspection
- [ ] 11.3 Test navigation dropdown links work correctly and verify all program links navigate to correct pages
- [ ] 11.4 Run `pnpm build` and verify build completes without errors
- [ ] 11.5 Run `pnpm check` and verify Astro type checking passes

## 12. i18n Implementation (DEFERRED - REQUIRES NEW CHANGE)

Full i18n (restructured localized folders, duplicated content, Astro i18n routing) is out of scope for this change. LanguageSwitcher stays a visual placeholder.
