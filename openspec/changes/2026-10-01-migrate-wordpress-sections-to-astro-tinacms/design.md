# Design

## Context

Current CIHUBS website runs on WordPress with 5 main program sections and 2 subpages, all hardcoded. The site already has TinaCMS integrated for blog content in `src/content/blog/` and a design system from `@cihubs/design-system` with the quad-font system per DESIGN.md (Poppins, Montserrat, Work Sans, Open Sans) and blue palette (#203370). The TinaCMS schema in `.tina/config.ts` currently only defines blog/authors/pages collections. The website uses Astro with Tailwind CSS v4, pnpm, and Flowbite vanilla (no React).

## Goals / Non-Goals

**Goals:**
- Enable client to manage program page content through TinaCMS without developer assistance
- Create 7 new Astro routes for program pages matching WordPress structure
- Extend TinaCMS schema to support program content with structured fields
- Build reusable components for program pages (Hero, Phase, Component, CTA)
- Implement navigation components (ProgramsDropdown, LanguageSwitcher)
- Create blog listing page at `/noticias/`
- Apply CIHUBS design system consistently across all new pages

**Non-Goals:**
- Full i18n implementation (initial language switcher placeholder only)
- Migration of Aliados page content (placeholder page only)
- Advanced blog features (basic listing only)
- Search functionality
- Breadcrumbs

## Decisions

### TinaCMS Schema Extension
**Decision:** Extend TinaCMS schema with a new `programs` collection instead of using the existing blog collection for programs.

**Rationale:** Programs have different content structure than blog posts (phases, components, duration, etc.). Separating concerns makes the schema cleaner and more maintainable.

**Alternatives considered:**
- Use blog collection for programs: Rejected - programs need different fields (phases, components) that don't apply to blog posts
- Store program content in static markdown: Rejected - client needs TinaCMS editing capability

### Component Architecture
**Decision:** Qwik islands for stateful UI (Announcement, SearchModal, Tabs, Accordion) and pure `.astro` components (zero JS) for static content (ProgramHero, ProgramPhase via Flowbite accordion, ProgramComponent, ProgramCTA, Video, Youtube, Button, Notice). React is removed entirely.

**Rationale:** Marketing/program sections need no framework JS — Flowbite `data-*` attributes plus CDN JS cover dropdowns/accordions. Only true client state justifies an island, and there Qwik resumability ships far less JS than React hydration.

**Alternatives considered:**
- React components: Rejected - per project decision React is out; hydration cost unjustified for content pages
- Pure Astro for everything: Rejected - search modal and tabs need client state

### Flowbite Vanilla (no flowbite-react)
**Decision:** Flowbite via CSS (`@import "flowbite/src/themes/default"`, `@plugin "flowbite/plugin"`, `@source "../../node_modules/flowbite"`) and JS via pinned CDN in `Base.astro`. Icons as inline SVG (flowbite-icons paths).

**Rationale:** Official Astro integration path; zero framework coupling.

**Alternatives considered:**
- flowbite-react: Rejected - requires React, which is removed

### Human-Readable Markup
**Decision:** Pages use a component vocabulary (`src/components/astro/`) plus semantic `@layer components` classes (`.btn-primary`, etc.). No loose Tailwind utilities in pages; no hardcoded font families — typography comes from design-system tokens.

**Rationale:** Keeps HTML human-readable and the design system as SSOT.

### TinaCMS Deprecated Repair
**Decision:** Declare `tinacms` explicitly, align `tinacms`/`@tinacms/cli`/`@tinacms/fields` versions, resolve React-19 peer conflicts (a consequence of React removal), and regenerate `.tina/__generated__`.

**Rationale:** TinaCMS is the top website requirement; current tree has undeclared transitive imports and peer breakage.

### File Structure
**Decision:** Place program pages under `src/pages/programas/` with kebab-case filenames matching WordPress URLs.

**Rationale:** Matches WordPress URL structure exactly for SEO consistency and simplifies routing.

**Alternatives considered:**
- Use dynamic routes `[slug].astro`: Rejected - programs have fixed, known names, not dynamic content
- Use subdirectories for each program: Rejected - flat structure is simpler and matches WordPress

### Design System Integration
**Decision:** Use @cihubs/design-system tokens directly rather than redefining values.

**Rationale:** The design system is the SSOT. Redefining colors/fonts would create divergence and maintenance burden.

**Alternatives considered:**
- Copy token values to project: Rejected - defeats purpose of having a design system

## Risks / Trade-offs

**Risk:** TinaCMS schema extension may conflict with existing blog collection configuration during migration.

**Mitigation:** Test TinaCMS configuration in isolation before merging to main. Run `pnpm dev` to verify schema validation.

**Risk:** Qwik integration (@qwikdev/astro) is new to this codebase.

**Mitigation:** Convert one island first (Announcement), verify build, then the rest. Keep static components in pure `.astro` so Qwik scope stays small.

**Risk:** TinaCMS version alignment may surface breaking schema APIs.

**Mitigation:** Inventory deprecated first (`npm ls`, Tina changelog), fix schema, regenerate `__generated__`, smoke-test `/admin` before merging.

**Trade-off:** Language switcher will be a placeholder initially without full i18n routing.

**Mitigation:** Implement switcher UI with click handler that logs intent. Full i18n can be added in a follow-up change once structure is validated.

**Risk:** Content migration from WordPress may have formatting differences.

**Mitigation:** Manually review migrated content in TinaCMS admin before going live. Keep WordPress site as fallback during transition.

## Migration Plan

1. Extend TinaCMS schema in `.tina/config.ts` with `programs` collection
2. Repair TinaCMS deprecated packages/APIs and regenerate `.tina/__generated__`
3. Wire @cihubs/design-system as workspace dependency; drop hardcoded font families
4. Build Astro components (ProgramHero, ProgramPhase, ProgramComponent, ProgramCTA)
5. Build navigation components (ProgramsDropdown, LanguageSwitcher)
6. Convert React islands to Qwik; remove React, disqus-react, react-icons; remove Disqus widget
7. Extract Puppeteer LinkedIn scraper to market-insights repo
8. Create Astro routes for 7 program pages
9. Create blog listing page at `src/pages/noticias/index.astro`
10. Migrate content from cihubs.com to TinaCMS markdown files
11. Test all program pages render correctly
12. Verify TinaCMS editing works for program content
13. Deploy to staging for client review

**Rollback Strategy:** If migration fails, WordPress site remains live. Astro changes can be reverted by deleting new routes and reverting TinaCMS schema. No data loss - WordPress content remains intact.

## Open Questions

None. All design decisions are clear and can be implemented as specified.
