# blog-listing Specification

## Purpose
Displays blog posts with TinaCMS integration in a dedicated noticias section, enabling the client to manage blog content independently.

## Requirements

### Requirement: Blog listing page displays all posts
The system SHALL display a list of all blog posts from TinaCMS on the noticias page.

#### Scenario: User visits noticias page
- **WHEN** a user navigates to /noticias/
- **THEN** the page displays a grid of all blog posts
- **AND** each post shows title, excerpt, date, and featured image

### Requirement: Blog listing page uses TinaCMS content
The system SHALL load blog post data from TinaCMS-managed markdown files in src/content/blog/.

#### Scenario: Blog listing loads TinaCMS content
- **WHEN** the noticias page loads
- **THEN** the page reads all markdown files from src/content/blog/
- **AND** the page renders posts sorted by date (newest first)

### Requirement: Blog listing page supports pagination
The system SHALL support pagination for blog posts when there are more than 10 posts.

#### Scenario: Blog listing shows pagination
- **WHEN** there are more than 10 blog posts
- **THEN** pagination controls appear at the bottom of the page
- **AND** users can navigate between pages

### Requirement: Blog listing uses CIHUBS design system
The system SHALL apply CIHUBS design system tokens to the blog listing page.

#### Scenario: Blog listing displays correct styling
- **WHEN** the noticias page loads
- **THEN** the page uses the CIHUBS blue palette (#203370) for accents
- **AND** the page uses Montserrat 400 for body text
- **AND** the page uses Poppins 700 for section titles

### Requirement: Blog posts support Giscus comments
The system SHALL render Giscus comments (GitHub Discussions backend, repo cihubs/content) on blog post pages instead of Disqus.

#### Scenario: Reader comments on a post
- **WHEN** a user scrolls to the comments section of a blog post
- **THEN** the Giscus widget loads mapped by page pathname
- **AND** no React or Disqus code ships on the page
