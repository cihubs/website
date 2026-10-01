# Tasks

## 1. TinaCMS Schema Extension

- [x] 1.1 Add `programs` collection to `.tina/config.ts` with fields for title, subtitle, description, phases, and components and verify TinaCMS starts without schema validation errors
- [x] 1.2 Create `src/content/programs/` directory structure and verify directory exists

## 2. React Components

- [x] 2.1 Create ProgramHero component in `src/components/ProgramHero.tsx` with title, subtitle, description props and verify component renders with CIHUBS branding (#203370 primary, Poppins 700)
- [x] 2.2 Create ProgramPhase component in `src/components/ProgramPhase.tsx` with title, duration, content, link props and verify component displays phase content correctly
- [x] 2.3 Create ProgramComponent component in `src/components/ProgramComponent.tsx` with title, content, list props and verify component renders lists with proper styling
- [x] 2.4 Create ProgramCTA component in `src/components/ProgramCTA.tsx` with contact link and verify CTA button uses Montserrat 700 and correct styling

## 3. Navigation Components

- [x] 3.1 Create ProgramsDropdown component in `src/components/ProgramsDropdown.tsx` with 5 program links and verify dropdown displays all programs with CIHUBS blue accent
- [x] 3.2 Create LanguageSwitcher component in `src/components/LanguageSwitcher.tsx` with ES/EN toggle and verify switcher updates to show current language on click

## 4. Astro Routes

- [x] 4.1 Create `src/pages/programas/index.astro` programs overview page and verify page renders with links to all 5 programs
- [x] 4.2 Create `src/pages/programas/soft-landing-de-conocimiento-e-innovacion.astro` and verify page loads ProgramHero, ProgramPhase components with TinaCMS content
- [x] 4.3 Create `src/pages/programas/programas-discovery.astro` and verify page displays Discovery program content with 3 programs
- [x] 4.4 Create `src/pages/programas/programas-inmersion.astro` and verify page displays Inmersión program content with 3 main programs and subprograms
- [x] 4.5 Create `src/pages/programas/potenciar-zonas-francas-a-high-tech.astro` and verify page displays 5 key functions and 7 components
- [x] 4.6 Create `src/pages/programas/encadenamientos-globales.astro` and verify page displays program description and stages
- [x] 4.7 Create `src/pages/programas/ciudades-cientificas-y-tecnologicas.astro` and verify page displays 5 implementation stages
- [x] 4.8 Create `src/pages/programas/brazo-comercial-de-generadores-de-conocimiento.astro` and verify page displays services and Venture Builder program

## 5. Blog Listing

- [x] 5.1 Create `src/pages/noticias/index.astro` blog listing page and verify page displays all blog posts from src/content/blog/
- [x] 5.2 Implement pagination in blog listing when there are more than 10 posts and verify pagination controls appear correctly

## 6. Content Migration

- [x] 6.1 Migrate PROGRAMA 1 content to `src/content/programs/soft-landing.md` and verify content matches WordPress text exactly
- [x] 6.2 Migrate Discovery subpage content to `src/content/programs/discovery.md` and verify all 3 programs are included
- [x] 6.3 Migrate Inmersión subpage content to `src/content/programs/inmersion.md` and verify all 3 main programs and subprograms are included
- [x] 6.4 Migrate PROGRAMA 2 content to `src/content/programs/zonas-francas.md` and verify 5 key functions and 7 components are included
- [x] 6.5 Migrate PROGRAMA 3 content to `src/content/programs/cadenas-globales.md` and verify program description and stages are included
- [x] 6.6 Migrate PROGRAMA 4 content to `src/content/programs/ciudades-cientificas.md` and verify 5 implementation stages are included
- [x] 6.7 Migrate PROGRAMA 5 content to `src/content/programs/brazo-comercial.md` and verify services and Venture Builder program are included

## 7. Integration and Testing

- [ ] 7.1 Test TinaCMS admin can edit program content and verify changes save to markdown files and appear on pages immediately (REQUIRES MANUAL TESTING - run `yarn dev` and test TinaCMS admin interface)
- [x] 7.2 Verify all program pages use CIHUBS design system tokens (colors, typography, spacing) and run visual inspection
- [x] 7.3 Test navigation dropdown links work correctly and verify all program links navigate to correct pages
- [x] 7.4 Run `yarn build` and verify build completes without errors
- [x] 7.5 Run `yarn check` and verify Astro type checking passes

## 8. Flowbite Integration (ADDITIONAL)

- [x] 8.1 Install flowbite and flowbite-react packages
- [x] 8.2 Add flowbite/plugin to Tailwind CSS configuration in src/styles/main.css
- [x] 8.3 Update ProgramsDropdown component to use Flowbite Dropdown component
- [x] 8.4 Verify build completes successfully with Flowbite integration

## 9. i18n Implementation (DEFERRED - REQUIRES NEW CHANGE)

⚠️ **NOTE:** i18n implementation was deferred due to dependency conflicts (kind-of, enhanced-resolve, TypeScript 7 compatibility). i18n requires a new dedicated change to:
- Resolve dependency conflicts
- Restructure entire project with localized folders (src/pages/es/, src/pages/en/, etc.)
- Duplicate content for each language
- Configure Astro i18n routing properly

Current LanguageSwitcher component is a visual placeholder that can be connected to i18n in a future change.

- [ ] 9.1 Resolve dependency conflicts (kind-of, enhanced-resolve, TypeScript 7)
- [ ] 9.2 Configure i18n in astro.config.mjs with full locale support (ES, EN, DE, KO, ZH, JA, PT)
- [ ] 9.3 Restructure project: move all pages to src/pages/es/ folder
- [ ] 9.4 Create src/pages/en/ folder structure for English
- [ ] 9.5 Create folders for future locales (de, ko, zh, ja, pt)
- [ ] 9.6 Duplicate/translate content for each language
- [ ] 9.7 Verify build completes successfully with i18n routing
- [ ] 9.8 Verify i18n middleware and routing work correctly
