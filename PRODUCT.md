# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
- **Readers (Primary):** General audience reading digital news on desktop and mobile. Want fast-loading, credible, distraction-free news consumption, trending stories, category browsing, and search.
- **Editors / Journalists:** Internal editorial team creating and managing articles, categories, and media.
- **Administrators:** System managers handling configuration and users (CMS already available).

## Product Purpose
Deliver high-performance, credible, and modern digital news portal meeting international media standards (CNN, BBC, Kompas). Provide immediate access to breaking news, trending topics, and in-depth category journalism with strong visual hierarchy and sub-second reader responsiveness.

## Positioning
Professional-grade editorial newsroom platform built with modern SPA responsiveness (Inertia + React) on top of a rock-solid Laravel core, strictly optimized for local performance and mobile readability without third-party ad clutter.

## Operating Context
- Responsive web: Mobile-first (375px), tablet (768px), desktop (1440px).
- Running in existing Docker environment (FrankenPHP + MariaDB) accessible via `http://localhost:9006`.
- High reader traffic context demanding sub-second load times (Lighthouse 90+ target), SEO schema integration, and editorial workflow integrity.

## Capabilities and Constraints
- **Capabilities:**
  - Real-time Breaking News ticker.
  - Featured Hero Story with media banner.
  - Category-based aggregation (Nasional, Internasional, Politik, Ekonomi, Teknologi, Olahraga, Lifestyle, Entertainment, Kesehatan) displayed on homepage.
  - Popular & Trending ranking section.
  - Editor's Choice curated section.
  - Strategic Advertisement placements (Top banner, Sidebar, In-article, Bottom banner).
  - Article detail with read time, social share, related stories, and JSON-LD NewsArticle metadata.
  - Full-text search across titles, content, categories, and authors.
- **Constraints:**
  - No new database creation; must use existing MariaDB config.
  - No new `.env` or Docker architecture changes.
  - CMS already built; scope focuses on public news portal reader experience.

## Brand Commitments
- **Name:** Next Generation News Portal / MyNews
- **Aesthetic Benchmark:** CNN Digital, Kompas Digital, BBC News.
- **Color Palette:** Primary Dark `#0B1220`, Accent Editorial Red `#D71920`.
- **Typography:** Inter, Plus Jakarta Sans.

## Evidence on Hand
- PRD.md documenting complete functional requirements, taxonomy, schema, and layout hierarchy.
- Pre-existing Laravel 13 workspace with Vite, Inertia.js React, and TailwindCSS setup.

## Product Principles
1. **Speed & Clarity First:** Articles and headlines render instantly without layout shift.
2. **Editorial Gravitas:** Visual hierarchy reflects news urgency; breaking news demands immediate visual distinction.
3. **Frictionless Reading:** Typography and contrast tuned for sustained reading across mobile and desktop.
4. **Authentic Hierarchy:** Clear separation between lead stories, regular feeds, and multimedia/popular sidebars.

## Accessibility & Inclusion
- WCAG AA contrast ratio compliance on dark `#0B1220` and bright accent `#D71920`.
- Semantic HTML tags (`<article>`, `<header>`, `<nav>`, `<time>`).
- Full keyboard and screen reader accessibility for news navigation and search.
