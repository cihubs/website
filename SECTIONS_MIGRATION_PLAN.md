# CIHUBS Website Sections Migration Plan
## From WordPress to Astro + TinaCMS

## Current Sections Structure

Based on analysis of https://cihubs.com, the site has:

### Navigation Structure
```
Inicio → /
CIHubs → /cihubs/
Programas (dropdown):
  1. Soft Landing de Conocimiento e Innovación → /soft-landing-de-conocimiento-e-innovacion/
  2. Zonas Francas – Parques Científicos y Tecnológicos → /potenciar-zonas-francas-a-high-tech/
  3. Cadenas de valor globales → /encadenamientos-globales/
  4. Ciudades Científicas y Tecnológicas → /ciudades-cientificas-y-tecnologicas/
  5. Brazo comercial para centros generadores de conocimiento → /brazo-comercial-de-generadores-de-conocimiento/
Aliados → /aliados/
Noticias → /noticias/ (BLOG)
Switcher: ES/EN
```

### Program Sections Analysis

#### PROGRAMA 1: Soft Landing de Conocimiento e Innovación
**URL:** `/soft-landing-de-conocimiento-e-innovacion/`
**Subpages:**
- Discovery → `/programas-discovery/`
- Inmersión → `/programas-inmersion/`

**Structure:**
- Hero title: "PROGRAMA 1: Soft Landing de Conocimiento e Innovación"
- Description paragraph
- Two phases with "Ver más" links:
  - Etapa I Discovery (3 months, fee mensual)
  - Etapa II Inmersión (results-based remuneration)
- CTA: "Contáctenos"

**Subpage: Discovery** (`/programas-discovery/`)
- 3 programs with lists:
  1. Acompañamiento Empresarial (fee mensual 3 meses)
  2. Innovation Tours (costo único por empresa)
  3. Certified Bootcamps (costo único por persona)

**Subpage: Inmersión** (`/programas-inmersion/`)
- 3 main programs with subprograms:
  1. Generación de nuevos negocios (1.1, 1.2, 1.3)
  2. Conformación de equipos de talento humano (2.1, 2.2, 2.3)
  3. Consecución de grants y capital (3.1, 3.2, 3.3)

#### PROGRAMA 2: Zonas Francas – Parques Científicos y Tecnológicos
**URL:** `/potenciar-zonas-francas-a-high-tech/`
**Structure:**
- Hero title: "PROGRAMA 2: Zonas Francas – Parques Científicos y Tecnológicos"
- Definition paragraph
- 5 key functions (bullets)
- 7 components (bullets)
- CTA: "Contáctenos"

#### PROGRAMA 3: Cadenas de valor globales
**URL:** `/encadenamientos-globales/`
**Structure:**
- Hero title: "PROGRAMA 3: Cadenas de valor globales"
- Objective paragraph
- 3 bullet points
- Description of support materialization (3 bullets)
- Program stages: Discovery + Inmersión
- Additional initiatives (spinoffs, accelerators, etc.)
- CTA: "Contáctenos"

#### PROGRAMA 4: Ciudades Científicas y Tecnológicas
**URL:** `/ciudades-cientificas-y-tecnologicas/`
**Structure:**
- Hero title: "PROGRAMA 4: Ciudades Científicas y Tecnológicas"
- Definition paragraph
- 5 stages (bullets)
- CTA: "Contáctenos"

#### PROGRAMA 5: Brazo comercial para centros generadores de conocimiento
**URL:** `/brazo-comercial-de-generadores-de-conocimiento/`
**Structure:**
- Hero title: "PROGRAMA 5: Brazo comercial para centros generadores de conocimiento"
- Purpose paragraph
- Services list (9 bullets)
- Venture Builder program description
- CTA: "Contáctenos"

### Blog Section
**URL:** `/noticias/`
**Already exists in TinaCMS** under `src/content/blog/`
Needs proper listing page

## Proposed Astro Structure

```
src/
├── pages/
│   ├── index.astro                    # Home (Hero + Services + Blog preview)
│   ├── cihubs/
│   │   └── index.astro                # CIHubs about page
│   ├── programas/
│   │   ├── index.astro                # Programs overview
│   │   ├── soft-landing-de-conocimiento-e-innovacion.astro
│   │   ├── programas-discovery.astro
│   │   ├── programas-inmersion.astro
│   │   ├── potenciar-zonas-francas-a-high-tech.astro
│   │   ├── encadenamientos-globales.astro
│   │   ├── ciudades-cientificas-y-tecnologicas.astro
│   │   └── brazo-comercial-de-generadores-de-conocimiento.astro
│   ├── aliados/
│   │   └── index.astro                # Partners page
│   ├── noticias/
│   │   └── index.astro                # Blog listing
│   └── contacto/
│       └── index.astro                # Contact form
├── content/
│   ├── blog/                          # TinaCMS blog posts (already exists)
│   └── programs/                      # TinaCMS program content
│       ├── soft-landing.md
│       ├── discovery.md
│       ├── inmersion.md
│       ├── zonas-francas.md
│       ├── cadenas-globales.md
│       ├── ciudades-cientificas.md
│       └── brazo-comercial.md
└── layouts/
    ├── Base.astro
    ├── Program.astro                  # For program pages
    └── Blog.astro                     # For blog pages
```

## TinaCMS Schema Extensions

Need to extend `.tina/config.ts` to include:

```typescript
// programs collection
{
  name: 'programs',
  label: 'Programs',
  path: 'content/programs',
  fields: [
    { type: 'string', name: 'title', label: 'Title' },
    { type: 'string', name: 'subtitle', label: 'Subtitle' },
    { type: 'rich-text', name: 'description', label: 'Description' },
    { type: 'object', name: 'phases', label: 'Phases', list: true, fields: [
      { type: 'string', name: 'title' },
      { type: 'string', name: 'duration' },
      { type: 'rich-text', name: 'content' },
    ]},
    { type: 'object', name: 'components', label: 'Components', list: true, fields: [
      { type: 'string', name: 'title' },
      { type: 'rich-text', name: 'content' },
    ]},
  ],
}
```

## Components to Create

### Program Page Components
1. **ProgramHero** - Hero section with title and description
2. **ProgramPhase** - Phase/Stage card with "Ver más" functionality
3. **ProgramComponent** - Component/subprogram list
4. **ProgramCTA** - Contact CTA section

### Navigation Components
1. **ProgramsDropdown** - Dropdown menu for 5 programs
2. **LanguageSwitcher** - ES/EN toggle

### Layout Components
1. **ProgramLayout** - Layout for program pages
2. **BlogLayout** - Layout for blog listing and individual posts

## Migration Priority

### Phase 1: Core Structure (High Priority)
1. Create Astro routes for all program pages
2. Build ProgramHero component
3. Build ProgramPhase component
4. Build ProgramCTA component
5. Create program listing page (`/programas/`)

### Phase 2: Content Migration (Medium Priority)
1. Migrate PROGRAMA 1 content to TinaCMS
2. Migrate PROGRAMA 2 content to TinaCMS
3. Migrate PROGRAMA 3 content to TinaCMS
4. Migrate PROGRAMA 4 content to TinaCMS
5. Migrate PROGRAMA 5 content to TinaCMS

### Phase 3: Navigation & Features (Medium Priority)
1. Build ProgramsDropdown navigation
2. Build LanguageSwitcher component
3. Implement i18n routing (ES/EN)
4. Create blog listing page
5. Create Aliados page

### Phase 4: Enhancements (Low Priority)
1. Add smooth scroll to subpages
2. Add search functionality
3. Add breadcrumbs
4. Optimize SEO for each program page

## Design System Integration

All program pages must use:
- `@cihubs/tokens` for colors, spacing, typography
- Poppins 700 for hero titles
- Montserrat 400 for descriptions
- Montserrat 700 for CTAs
- CIHUBS blue palette (#203370 primary)
- Consistent spacing from tokens

## Next Steps

1. Create Astro route structure
2. Build base components
3. Extend TinaCMS schema
4. Migrate content from WordPress
5. Test navigation
6. Deploy and verify
