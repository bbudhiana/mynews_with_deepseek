<!DOCTYPE html>
<html lang="id">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <meta name="theme-color" content="#0F172A">
        <meta name="format-detection" content="telephone=no">
        <meta name="geo.region" content="ID">
        <meta name="geo.placename" content="Indonesia">

        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K5PHY6KV1W"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K5PHY6KV1W', {'cookie_domain': 'newsai.my.id'});
        </script>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="{{ config('app.name', 'MyNews') }} Search">
        <meta name="mobile-web-app-capable" content="yes">

        <link rel="alternate" type="application/rss+xml" title="{{ config('app.name', 'MyNews') }} RSS" href="/feed.xml">
        <link rel="sitemap" type="application/xml" href="/sitemap.xml">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head />
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
