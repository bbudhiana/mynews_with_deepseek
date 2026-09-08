<?php
use Illuminate\Support\Collection;

/** @var Collection<int, object> $urls */ ?>
<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
<?php foreach ($urls as $u) { ?>
    <url>
        <loc><?php echo htmlspecialchars($u->loc, ENT_XML1); ?></loc>
        <news:news>
            <news:publication>
                <news:name><?php echo htmlspecialchars(config('app.name'), ENT_XML1); ?></news:name>
                <news:language>id</news:language>
            </news:publication>
            <?php if (! empty($u->publication_date)) { ?>
            <news:publication_date><?php echo htmlspecialchars($u->publication_date, ENT_XML1); ?></news:publication_date>
            <?php } ?>
            <news:title><?php echo htmlspecialchars($u->title, ENT_XML1); ?></news:title>
            <?php if (! empty($u->keywords)) { ?>
            <news:keywords><?php echo htmlspecialchars($u->keywords, ENT_XML1); ?></news:keywords>
            <?php } ?>
        </news:news>
    </url>
<?php } ?>
</urlset>
