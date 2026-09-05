# Implementation Plan for Professional Online News Portal

**Project:** Next Generation News Portal (Laravel 13 + Inertia.js + React + TailwindCSS)  
**Reference:** CNN.com, Kompas.com, BBC News  
**Environment:** Existing Docker (FrankenPHP + MariaDB) - No new DB or .env  
**Local URL:** http://localhost:9006

## Overview

This plan follows the PRD phases. All changes must use existing environment. Focus on premium editorial UI, mobile-first, fast loading, SEO-ready.

## Phase 1: UI/UX Research & Design (Impeccable + UI/UX Pro Max)

- Run `node /home/baban/.agents/skills/impeccable/scripts/context.mjs --target /home/baban/Projects/frontend/mynews_with_deepseek`
- Create DESIGN.md and update PRODUCT.md
- Design system: Premium newsroom (dark #0B1220 primary, #D71920 accent, Inter/Plus Jakarta Sans fonts)
- Components: Header, HeroNews, BreakingNews, NewsCard, CategoryCard, Pagination, SearchBox
- Wireframes for: Homepage, News Detail (/news/{slug}), Category (/category/{slug}), Admin Dashboard
- Mobile-first responsive (375px+)
- Output: DESIGN.md, component library in resources/js/components/

## Phase 2: Frontend Development (React + Inertia)

- Install dependencies if needed: `pnpm install` (use existing)
- Create pages:
    - resources/js/Pages/Home.jsx (homepage with all sections)
    - resources/js/Pages/News/Show.jsx (detail page)
    - resources/js/Pages/Category/Index.jsx
    - resources/js/Pages/Admin/Dashboard.jsx
- Build components: Header, Footer, NewsCard, HeroNews, etc.
- Implement search, categories navigation
- Add lazy loading, Inertia SSR for speed
- SEO: Meta tags, OG, JSON-LD in pages

## Phase 3: Backend Integration (Laravel)

- Create models: Article, Category, Tag, User
- Create controllers: ArticleController, CategoryController, Admin/NewsController
- Add routes in routes/web.php and api routes if needed
- Use existing database tables (articles, categories, tags, article_tags)
- Implement CRUD for news (Draft/Review/Published/Archived)
- Add authentication (existing Laravel auth)
- Query optimization, caching, pagination

## Phase 4: Integration, Testing & Optimization

- Connect frontend to backend via Inertia
- Test: Performance (Lighthouse 90+), SEO, responsive, security
- Run: `php artisan migrate` (if needed), `npm run build`, `php artisan serve` (via FrankenPHP)
- Fix any issues, run full test suite
- Deploy-ready: No new env changes

## Phase 5: Future Enhancement

- Connect frontend to backend via Inertia
- Test: Performance (Lighthouse 90+), SEO, responsive, security
- Run: `php artisan migrate` (if needed), `npm run build`, `php artisan serve` (via FrankenPHP)
- Fix any issues, run full test suite
- Deploy-ready: No new env changes

## Acceptance Criteria

- All PRD features implemented
- Premium UI matches reference media
- Existing Docker environment used
- No new database or config files created
- Lighthouse 90+, fast load, mobile responsive

## Next Steps

1. Run context script for design
2. Create DESIGN.md
3. Start with Phase 1 UI components

**Total effort estimate:** 2-3 weeks (team). Start with Phase 1.
