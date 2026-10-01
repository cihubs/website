# Spec Delta

## Purpose

Enables the client to manage program page content through TinaCMS without requiring developer intervention for text updates.

## ADDED Requirements

### Requirement: Program pages load from TinaCMS content
The system SHALL load program page content from TinaCMS-managed markdown files rather than hardcoded values.

#### Scenario: Program page renders with TinaCMS content
- **WHEN** a user navigates to a program page (e.g., /programas/soft-landing-de-conocimiento-e-innovacion/)
- **THEN** the page displays content from the corresponding TinaCMS markdown file
- **AND** the page structure matches the WordPress layout (hero, description, phases/components, CTA)

### Requirement: TinaCMS editor can modify program content
The system SHALL allow authorized users to edit program content through the TinaCMS admin interface.

#### Scenario: Admin edits program description
- **WHEN** an admin user opens TinaCMS and edits a program's description field
- **THEN** the changes are saved to the markdown file
- **AND** the changes are immediately visible on the program page after save

### Requirement: Program schema supports structured content
The system SHALL support structured program content including title, subtitle, description, phases, and components.

#### Scenario: Program page renders all content sections
- **WHEN** a program page has phases and components defined
- **THEN** the page renders all phases with their descriptions
- **AND** the page renders all components with their lists

### Requirement: Program pages use CIHUBS design system
The system SHALL apply CIHUBS design system tokens (colors, typography, spacing) to all program pages.

#### Scenario: Program page displays correct branding
- **WHEN** a program page loads
- **THEN** the page uses the CIHUBS blue palette (#203370 primary)
- **AND** the page uses Poppins 700 for hero titles
- **AND** the page uses Montserrat 400 for descriptions
