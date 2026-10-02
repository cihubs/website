# program-navigation Specification

## Purpose
Provides structured navigation for 5 main programs and 2 subpages matching the WordPress site structure.

## Requirements

### Requirement: Navigation dropdown displays all programs
The system SHALL display a dropdown menu with all 5 main program links matching the WordPress structure.

#### Scenario: User opens Programs dropdown
- **WHEN** a user clicks the "Programas" navigation item
- **THEN** a dropdown appears with links to all 5 programs
- **AND** the dropdown uses the CIHUBS blue (#203370) as the accent color

### Requirement: Program 1 includes subpage links
The system SHALL include links to Discovery and Inmersión subpages under Program 1 navigation.

#### Scenario: Program 1 navigation shows subpages
- **WHEN** a user views Program 1 navigation or landing page
- **THEN** links to Discovery and Inmersión subpages are visible
- **AND** subpage links are styled consistently with main program links

### Requirement: Navigation matches WordPress URLs
The system SHALL use the same URL structure as the WordPress site for all program pages.

#### Scenario: Program navigation uses correct URLs
- **WHEN** a user clicks a program link
- **THEN** the URL matches the WordPress structure (e.g., /programas/soft-landing-de-conocimiento-e-innovacion/)
- **AND** the page renders the correct program content

### Requirement: Language switcher toggles ES/EN
The system SHALL provide a language switcher component to toggle between Spanish and English versions.

#### Scenario: User switches language
- **WHEN** a user clicks the language switcher
- **THEN** the language toggles between ES and EN
- **AND** the switcher updates to show the current language
