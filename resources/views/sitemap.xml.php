<?php /** @var array<int, array<string, string>> $urls */ ?>
<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($urls as $url) { ?>
    <url>
        <loc><?php echo htmlspecialchars($url['loc'], ENT_XML1); ?></loc>
        <?php if (! empty($url['lastmod'])) { ?>
        <lastmod><?php echo htmlspecialchars($url['lastmod'], ENT_XML1); ?></lastmod>
        <?php } ?>
        <?php if (! empty($url['changefreq'])) { ?>
        <changefreq><?php echo htmlspecialchars($url['changefreq'], ENT_XML1); ?></changefreq>
        <?php } ?>
        <?php if (! empty($url['priority'])) { ?>
        <priority><?php echo htmlspecialchars($url['priority'], ENT_XML1); ?></priority>
        <?php } ?>
    </url>
<?php } ?>
</urlset>
