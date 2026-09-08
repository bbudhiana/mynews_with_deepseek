import { Head } from '@inertiajs/react';

interface SeoProps {
    seo?: {
        title?: string;
        description?: string;
        url?: string;
        image?: string | null;
        type?: string;
        publishedTime?: string | null;
        modifiedTime?: string | null;
        authorName?: string | null;
        section?: string | null;
        tags?: string[] | null;
        siteName?: string | null;
        noindex?: boolean;
        publisherLogo?: string | null;
        publisherUrl?: string | null;
        sameAs?: string[] | null;
        searchUrl?: string | null;
    };
    title?: string;
    jsonLd?: unknown[];
    organizationJsonLd?: unknown;
    websiteJsonLd?: unknown;
}

export default function SeoHead({
    seo,
    title,
    jsonLd,
    organizationJsonLd,
    websiteJsonLd,
}: SeoProps) {
    const finalTitle = title || seo?.title;
    const description = seo?.description || 'Portal berita terkini Indonesia.';
    const url =
        seo?.url || (typeof window !== 'undefined' ? window.location.href : '');
    const image = seo?.image || null;
    const type = seo?.type || 'website';
    const robots = seo?.noindex
        ? 'noindex,follow'
        : 'index,follow,max-image-preview:large,max-snippet:-1';

    const jsonLdArray = jsonLd
        ? Array.isArray(jsonLd)
            ? jsonLd
            : [jsonLd]
        : [];

    if (organizationJsonLd) {
        jsonLdArray.push(organizationJsonLd);
    }

    if (websiteJsonLd) {
        jsonLdArray.push(websiteJsonLd);
    }

    return (
        <Head>
            <title>{finalTitle}</title>
            <meta name="description" content={description} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={url} />

            {image && (
                <link
                    rel="preload"
                    as="image"
                    href={image}
                    fetchPriority="high"
                />
            )}

            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={seo?.siteName ?? ''} />
            <meta property="og:locale" content="id_ID" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:site" content="@mynews_id" />

            {image && (
                <>
                    <meta property="og:image" content={image} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta name="twitter:image" content={image} />
                    <meta name="twitter:image:alt" content={finalTitle} />
                </>
            )}

            {type === 'article' && seo?.publishedTime && (
                <meta
                    property="article:published_time"
                    content={seo.publishedTime}
                />
            )}
            {type === 'article' && seo?.modifiedTime && (
                <meta
                    property="article:modified_time"
                    content={seo.modifiedTime}
                />
            )}
            {type === 'article' && seo?.section && (
                <meta property="article:section" content={seo.section} />
            )}
            {type === 'article' &&
                seo?.tags?.map((tag) => (
                    <meta key={tag} property="article:tag" content={tag} />
                ))}

            {jsonLdArray.map((data, idx) => (
                <script
                    key={`jsonld-${idx}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
                />
            ))}
        </Head>
    );
}
