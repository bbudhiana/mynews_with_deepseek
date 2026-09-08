<?php
use Illuminate\Support\Collection;

/** @var Collection<int, object> $items */ ?>
<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title><?php echo htmlspecialchars($siteName, ENT_XML1); ?> - Berita Terkini</title>
        <link><?php echo htmlspecialchars($siteUrl, ENT_XML1); ?></link>
        <description><?php echo htmlspecialchars($siteName, ENT_XML1); ?> — Portal berita terkini Indonesia.</description>
        <language>id-ID</language>
        <lastBuildDate><?php echo htmlspecialchars($updated, ENT_XML1); ?></lastBuildDate>
        <atom:link href="<?php echo htmlspecialchars($siteUrl.'/feed.xml', ENT_XML1); ?>" rel="self" type="application/rss+xml" />
<?php foreach ($items as $item) { ?>
        <item>
            <title><?php echo htmlspecialchars($item->title, ENT_XML1); ?></title>
            <link><?php echo htmlspecialchars($item->link, ENT_XML1); ?></link>
            <guid isPermaLink="true"><?php echo htmlspecialchars($item->guid, ENT_XML1); ?></guid>
            <pubDate><?php echo htmlspecialchars($item->pubDate ?? '', ENT_XML1); ?></pubDate>
            <?php if (! empty($item->description)) { ?>
            <description><?php echo htmlspecialchars($item->description, ENT_XML1); ?></description>
            <?php } ?>
            <?php if (! empty($item->category)) { ?>
            <category><?php echo htmlspecialchars($item->category, ENT_XML1); ?></category>
            <?php } ?>
            <?php if (! empty($item->author)) { ?>
            <dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/"><?php echo htmlspecialchars($item->author, ENT_XML1); ?></dc:creator>
            <?php } ?>
        </item>
<?php } ?>
    </channel>
</rss>
