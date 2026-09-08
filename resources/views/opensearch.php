<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
    <ShortName><?php echo htmlspecialchars(config('app.name', 'MyNews'), ENT_XML1); ?></ShortName>
    <Description>Pencarian berita <?php echo htmlspecialchars(config('app.name', 'MyNews'), ENT_XML1); ?> - Nasional, Internasional, Politik, Ekonomi, Teknologi.</Description>
    <InputEncoding>UTF-8</InputEncoding>
    <OutputEncoding>UTF-8</OutputEncoding>
    <Url type="text/html" template="<?php echo htmlspecialchars(url('/search'), ENT_XML1); ?>?q={searchTerms}"/>
    <Url type="application/opensearchdescription+xml" rel="self" template="<?php echo htmlspecialchars(url('/opensearch.xml'), ENT_XML1); ?>"/>
</OpenSearchDescription>
