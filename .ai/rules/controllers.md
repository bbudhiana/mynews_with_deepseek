---
paths:
    - 'resources/js/pages/News/Show.tsx,app/Http/Controllers/NewsController.php'
---

# Controllers

## Article body renders server-side via pre-split halves

NewsController::show() pre-splits body into body_first and body_second at midpoint </p> boundary. Show.tsx renders both halves with dangerouslySetInnerHTML and injects the in-article AdBanner between them. Never use useEffect + ref.innerHTML — Google News crawler indexes static HTML body. Reading time derives from server-side body_word_count.
