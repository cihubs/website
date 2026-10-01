# Proposal

## Why

The current CIHUBS website runs on WordPress with 5 main program sections (Soft Landing, Zonas Francas, Cadenas Globales, Ciudades Científicas, Brazo Comercial) plus 2 subpages (Discovery, Inmersión). These sections are hardcoded in WordPress, making it difficult for the client to manage content without developer assistance. The client requires TinaCMS to manage blog posts independently, but the program sections also need to be editable through the same CMS system.

## What Changes

- Create 7 new Astro page routes for program sections under `src/pages/programas/`
- Extend TinaCMS schema to include a `programs` collection with fields for title, subtitle, description, phases, and components
- Build 4 new React components: ProgramHero, ProgramPhase, ProgramComponent, ProgramCTA
- Build 2 navigation components: ProgramsDropdown, LanguageSwitcher
- Create blog listing page at `src/pages/noticias/index.astro`
- Migrate all program content from WordPress to TinaCMS markdown files
- Integrate @cihubs/design-system (Poppins/Montserrat/Work Sans/Open Sans fonts, #203370 blue palette)

## Capabilities

### New Capabilities

- `program-content-management`: Enable client to manage program page content through TinaCMS without developer intervention
- `program-navigation`: Provide structured navigation for 5 main programs and 2 subpages matching WordPress structure
- `blog-listing`: Display blog posts with TinaCMS integration in a dedicated noticias section

## Impact

- **Affected code**: New Astro routes, TinaCMS schema extension, new React components
- **Dependencies**: @cihubs/design-system (fonts recently updated), TinaCMS (already integrated)
- **Systems**: WordPress → content migration target, no impact on live WordPress site during development
- **Breaking changes**: None - new pages are additions, existing blog content preserved
