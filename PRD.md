# Product Requirement Document (PRD)

# Professional Online News Platform

**Project Name:** Next Generation News Portal\
**Reference Product:** CNN.com, Kompas.com, BBC News\
**Technology Stack:** Laravel 13.x + Inertia.js + React + TailwindCSS\
**Environment:** Docker (FrankenPHP + MariaDB)\
**Local URL:** http://localhost:9006

------------------------------------------------------------------------

# 1. Product Overview

## 1.1 Description

Membangun website portal berita profesional dengan standar industri
media digital modern seperti CNN.com dan Kompas.com.

Platform berfungsi sebagai pusat distribusi berita yang cepat,
terpercaya, responsif, dan memiliki pengalaman pengguna premium.

Fitur utama: - Publikasi berita real-time - Manajemen konten editorial -
Kategori berita - Multimedia content - SEO friendly architecture - User
engagement - Dashboard administrator - Workflow redaksi profesional

------------------------------------------------------------------------

# 2. Development Constraints

## 2.1 Existing Environment Requirement

Pengembangan wajib menggunakan environment yang sudah tersedia.

Tidak diperbolehkan: - Membuat database baru - Membuat file `.env`
baru - Setup ulang localhost - Mengganti framework - Mengubah
konfigurasi Docker existing

Gunakan: - Container webserver: `frankenphp` - Container database:
`mariadb` - URL existing: `http://localhost:9006`

------------------------------------------------------------------------

# 3. Technology Stack

Backend: - Laravel 13.x - PHP existing environment - MariaDB existing
database

Frontend: - React - Inertia.js - TailwindCSS

Infrastructure: - Docker existing environment

------------------------------------------------------------------------

# 4. Design Requirement

Sebelum implementasi kode wajib melakukan proses desain menggunakan:

-   Impeccable Design Skill
-   UI/UX Pro Max Skill
-   Frontend Design Skill

Target desain: - Premium editorial interface - Modern newsroom
experience - Mobile-first - Visual hierarchy kuat - Setara media berita
nasional

------------------------------------------------------------------------

# 5. Target User

## Reader

Kebutuhan: - Membaca berita - Melihat berita terbaru - Melihat berita
populer - Search berita - Share berita

## Editor

Kebutuhan: - Membuat berita - Mengedit berita - Upload media - Mengatur
publikasi

## Administrator

Kebutuhan: - User management - Role management - Website configuration -
Analytics

------------------------------------------------------------------------

# 6. Main Features

## Homepage

Komponen:

### Header

-   Logo
-   Navigation menu
-   Search
-   Admin access

### Breaking News

-   Headline berjalan
-   Berita urgent
-   Timestamp

### Hero News

-   Featured image
-   Title
-   Summary
-   Category
-   Author
-   Publish date

### Latest News

News card: - Image - Category - Title - Description - Time

### Editor's Choice

- Section "Pilihan Editor" dengan artikel kurasi
- Ditampilkan di sidebar atau kolom khusus
- Highlight dengan badge khusus

### Popular News

Ranking: 1. Berita populer 2. Berita populer 3. Berita populer

### Category Section

Kategori: - Nasional - Internasional - Politik - Ekonomi - Teknologi -
Olahraga - Lifestyle - Entertainment - Kesehatan
- Menampilkan grid berita berdasarkan kategori di halaman depan

### Advertisement Positions

- **Top Banner** (di bawah header): 728x90 atau 970x250 leaderboard
- **Sidebar Right** (di bawah Popular News): 300x250 atau 300x600
- **In-Article** (di dalam konten berita): 300x250
- **Bottom Banner** (sebelum footer): 728x90

------------------------------------------------------------------------

# 7. News Detail Page

URL:

    /news/{slug}

Content: - Category - Title - Subtitle - Author - Date - Reading time -
Featured image - Article content - Related news - Share button - Tags

------------------------------------------------------------------------

# 8. Category Page

URL:

    /category/{slug}

Fitur: - Category headline - Featured news - Article listing -
Pagination

------------------------------------------------------------------------

# 9. Search System

URL:

    /search?q=

Support: - Search title - Search content - Search category - Search
author

------------------------------------------------------------------------

# 10. Editorial Dashboard

Menu:

    Dashboard

    Content
     ├── News
     ├── Categories
     ├── Tags
     └── Media

    Users

    Settings

    Analytics

------------------------------------------------------------------------

# 11. News Management

CRUD News:

Field: - Title - Slug - Category - Thumbnail - Content - Author - Tags -
Status - Publish Date

Status: - Draft - Review - Published - Archived

------------------------------------------------------------------------

# 12. Database Requirement

Gunakan database existing dari `.env`.

Tidak membuat database baru.

Migration hanya dibuat jika diperlukan.

Suggested tables:

## articles

    id
    category_id
    title
    slug
    excerpt
    content
    thumbnail
    author_id
    status
    published_at
    views
    created_at
    updated_at

## categories

    id
    name
    slug
    description
    created_at
    updated_at

## tags

    id
    name
    slug

## article_tags

    article_id
    tag_id

------------------------------------------------------------------------

# 13. UI/UX Specification

Reference: - CNN Digital - Kompas Digital - BBC News

Style: Premium editorial newsroom.

Color:

Primary:

    #0B1220

Accent:

    #D71920

Typography: - Inter - Geist - Plus Jakarta Sans

Responsive:

Desktop: 1440px

Tablet: 768px

Mobile: 375px

------------------------------------------------------------------------

# 14. Performance Requirement

Target:

Lighthouse Performance 90+

Optimization: - Lazy loading image - Optimized asset bundle - Inertia
SSR - Query caching - Pagination

------------------------------------------------------------------------

# 15. SEO Requirement

Article wajib memiliki:

-   Meta title
-   Meta description
-   Open Graph metadata
-   NewsArticle JSON-LD schema

SEO URL:

    /news/judul-berita

------------------------------------------------------------------------

# 16. Security Requirement

Implement: - CSRF protection - Authentication - Authorization - Input
validation - XSS prevention - File upload validation

------------------------------------------------------------------------

# 17. Component Architecture

React:

    components/

    Header.jsx
    Footer.jsx
    NewsCard.jsx
    HeroNews.jsx
    BreakingNews.jsx
    CategoryCard.jsx
    PopularNews.jsx
    SearchBox.jsx
    Pagination.jsx

------------------------------------------------------------------------

# 18. Laravel Structure

    app/

    Models/
     Article.php
     Category.php
     Tag.php

    Http/
     Controllers/
      ArticleController.php
      CategoryController.php

      Admin/
       NewsController.php


    resources/

    js/

    Pages/
     Home.jsx
     News/
      Show.jsx
     Category/
      Index.jsx
     Admin/
      Dashboard.jsx

------------------------------------------------------------------------

# 19. Development Workflow

## Phase 1

UI/UX Research

Output: - Design system - Wireframe - Component planning

## Phase 2

Frontend Development

Build: - Homepage - Article page - Category page

## Phase 3

Backend Integration

Implement: - Model - Controller - Routing - Database integration

## Phase 4

CMS Dashboard

Implement: - CRUD - Upload - Workflow

## Phase 5

Optimization

Testing: - Performance - SEO - Security - Responsive

------------------------------------------------------------------------

# 20. Acceptance Criteria

Frontend: - Premium news interface - Responsive - Fast loading - Modern
UX

Backend: - Laravel 13 berjalan - Existing database digunakan - CRUD
berita berjalan

Infrastructure: - Docker existing digunakan - FrankenPHP aktif - MariaDB
existing digunakan - localhost:9006 berjalan

Quality: - Tidak membuat environment baru - Tidak merusak konfigurasi
existing - Production ready

------------------------------------------------------------------------

# 21. Future Enhancement

-   Comment system
-   AI recommendation
-   Newsletter
-   Push notification
-   Mobile application API
-   Advertisement management
-   Subscription system
-   Analytics dashboard
