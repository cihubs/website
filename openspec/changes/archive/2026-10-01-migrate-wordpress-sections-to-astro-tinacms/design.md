# Design

## Context

Current CIHUBS website runs on WordPress with 5 main program sections and 2 subpages, all hardcoded. The site already has TinaCMS integrated for blog content in `src/content/blog/` and a design system from `@cihubs/design-system` with the updated CIHUBS fonts (Poppins, Montserrat, Work Sans, Open Sans) and blue palette (#203370). The TinaCMS schema in `.tina/config.ts` currently only defines the blog collection. The website uses Astro with Tailwind CSS v4.2.1.

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
**Decision:** Create React components for program pages instead of Astro components for complex UI.

**Rationale:** ProgramPhase and ProgramComponent have rich interactivity (expand/collapse, lists) that benefit from React state management. Astro components with client directives can achieve this but React is more straightforward for this complexity.

**Alternatives considered:**
- Pure Astro components: Rejected - complex state management would be cumbersome
- Server-side rendered components: Rejected - client-side interactivity required for expand/collapse

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

**Mitigation:** Test TinaCMS configuration in isolation before merging to main. Run `yarn dev` to verify schema validation.

**Risk:** React components may conflict with existing React version (React 19.2.4 currently installed).

**Mitigation:** Use React 19-compatible patterns and avoid deprecated APIs. Test components in isolation.

**Trade-off:** Language switcher will be a placeholder initially without full i18n routing.

**Mitigation:** Implement switcher UI with click handler that logs intent. Full i18n can be added in a follow-up change once structure is validated.

**Risk:** Content migration from WordPress may have formatting differences.

**Mitigation:** Manually review migrated content in TinaCMS admin before going live. Keep WordPress site as fallback during transition.

## Migration Plan

1. Extend TinaCMS schema in `.tina/config.ts` with `programs` collection
2. Create `src/content/programs/` directory structure
3. Build React components (ProgramHero, ProgramPhase, ProgramComponent, ProgramCTA)
4. Build navigation components (ProgramsDropdown, LanguageSwitcher)
5. Create Astro routes for 7 program pages
6. Create blog listing page at `src/pages/noticias/index.astro`
7. Migrate content from WordPress to TinaCMS markdown files
8. Test all program pages render correctly
9. Verify TinaCMS editing works for program content
10. Deploy to staging for client review

**Rollback Strategy:** If migration fails, WordPress site remains live. Astro changes can be reverted by deleting new routes and reverting TinaCMS schema. No data loss - WordPress content remains intact.

## Open Questions

None. All design decisions are clear and can be implemented as specified.
