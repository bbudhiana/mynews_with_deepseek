import { useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import AdBanner from '@/Components/AdBanner';
import { formatDate } from '@/lib/date';

interface Props {
    article: any;
    relatedNews: any[];
    popularNews: any[];
    navCategories?: any[];
}

/* ponytail: ref + innerHTML via useEffect dodges React 19 scheduler crash
   (Cannot read 'startTime' at reportAllChanges) when dangerouslySetInnerHTML
   is set during render. Upgrade path: switch to a server-rendered HTML island
   or a CMS-rendered fragment. */
function splitHtmlAtMidpoint(html: string): { first: string; second: string } {
    if (!html) return { first: '', second: '' };
    const parts = html.split(/(?<=<\/p>)/i);
    if (parts.length <= 1) {
        const mid = Math.floor(html.length / 2);
        return { first: html.slice(0, mid), second: html.slice(mid) };
    }
    const mid = Math.floor(parts.length / 2);
    return {
        first: parts.slice(0, mid).join(''),
        second: parts.slice(mid).join(''),
    };
}

function ArticleBody({ html }: { html: string }) {
    const firstRef = useRef<HTMLDivElement>(null);
    const secondRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { first, second } = splitHtmlAtMidpoint(html);
        if (firstRef.current) firstRef.current.innerHTML = first;
        if (secondRef.current) secondRef.current.innerHTML = second;
    }, [html]);

    return (
        <>
            <div
                ref={firstRef}
                className="article-body text-ink-body min-h-[40vh] max-w-[68ch] font-serif text-[18px] leading-[1.85] md:text-[19px]"
            />
            <div className="my-12 flex justify-center">
                <AdBanner position="in-article" />
            </div>
            <div
                ref={secondRef}
                className="article-body text-ink-body min-h-[40vh] max-w-[68ch] font-serif text-[18px] leading-[1.85] md:text-[19px]"
            />
        </>
    );
}

export default function Show({
    article,
    relatedNews,
    popularNews,
    navCategories,
}: Props) {
    if (!article) return null;
    return (
        <>
            <Head title={`${article.title} - MyNews`} />
            <div className="bg-canvas text-ink min-h-screen">
                <Header categories={navCategories} />

                {/* Top Leaderboard Ad */}
                <div className="mx-auto max-w-7xl px-4">
                    <AdBanner position="top-leaderboard" />
                </div>

                <main className="mx-auto max-w-7xl px-4 py-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        {/* Main Article Content */}
                        <article className="lg:col-span-8">
                            {/* Breadcrumb & Category */}
                            <div className="mb-6 flex items-center gap-2 text-sm">
                                <Link
                                    href="/"
                                    className="text-ink-meta hover:text-ink"
                                >
                                    Home
                                </Link>
                                <span className="text-ink-faint">/</span>
                                <Link
                                    href={`/category/${article.category?.slug || 'nasional'}`}
                                    className="text-accent font-bold tracking-wider uppercase"
                                >
                                    {article.category?.name || 'Nasional'}
                                </Link>
                            </div>

                            {/* Title & Meta */}
                            <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
                                {article.title}
                            </h1>

                            <div className="border-hairline text-ink-meta mb-8 flex flex-wrap items-center justify-end gap-4 border-y py-4 text-sm">
                                <span>
                                    {formatDate(
                                        article.published_at ||
                                            article.created_at,
                                    )}
                                </span>
                                <span className="flex items-center gap-1">
                                    ⏱️ 3 menit baca
                                </span>
                            </div>

                            {(article.author?.bio || article.author?.name) && (
                                <div className="bg-card border-hairline mb-8 flex items-start gap-4 rounded-2xl border p-4">
                                    {article.author?.profile_photo_path ? (
                                        <img
                                            src={`/storage/${article.author.profile_photo_path}`}
                                            alt={article.author.name}
                                            className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="bg-elevated flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-2xl">
                                            👤
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="text-sm font-bold">
                                            {article.author.name}
                                        </div>
                                        <div className="text-accent mb-2 text-xs">
                                            {article.author.job_title ||
                                                'Kontributor'}
                                        </div>
                                        {article.author?.bio && (
                                            <p className="text-ink-meta line-clamp-3 text-xs">
                                                {article.author.bio}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Featured Image */}
                            <figure className="mb-10">
                                <img
                                    src={
                                        article.featured_image?.url ||
                                        article.thumbnail?.url ||
                                        ''
                                    }
                                    alt={article.title}
                                    fetchpriority="high"
                                    className="bg-card h-auto w-full rounded-2xl"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                <figcaption className="text-ink-subtle mt-3 text-left text-xs">
                                    {article.image_caption ||
                                    article.image_credit
                                        ? `${article.image_caption ?? ''}${article.image_caption && article.image_credit ? ' • ' : ''}${article.image_credit ? `Kredit: ${article.image_credit}` : ''}`.trim()
                                        : 'Dokumentasi Redaksi'}
                                </figcaption>
                            </figure>

                            {/* Article Body — split at midpoint with in-article ad injected between */}
                            <ArticleBody
                                html={article.body || article.excerpt || ''}
                            />

                            {/* Tags */}
                            <div className="border-hairline mt-12 border-t pt-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-ink-meta text-sm font-bold">
                                        TAGS:
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            'Nasional',
                                            'Terkini',
                                            'Pemerintah',
                                            'Sorotan',
                                        ].map((tag) => (
                                            <Link
                                                key={tag}
                                                href={`/search?q=${tag.toLowerCase()}`}
                                                className="bg-elevated rounded-full px-3 py-1.5 text-xs transition-colors hover:bg-[#334155]"
                                            >
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Share */}
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <span className="mr-2 text-sm font-bold">
                                    Bagikan:
                                </span>
                                <button
                                    type="button"
                                    aria-label="Bagikan ke Facebook"
                                    className="text-ink flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] transition-opacity hover:opacity-80"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    aria-label="Bagikan ke X"
                                    className="text-ink flex h-11 w-11 items-center justify-center rounded-full bg-[#1DA1F2] transition-opacity hover:opacity-80"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    aria-label="Bagikan ke WhatsApp"
                                    className="text-ink flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] transition-opacity hover:opacity-80"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    aria-label="Salin tautan"
                                    className="bg-elevated text-ink flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-[#334155]"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        aria-hidden="true"
                                    >
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                    </svg>
                                </button>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-24 space-y-10">
                                {/* Sidebar Ad */}
                                <AdBanner position="sidebar" />

                                {/* Related News */}
                                <section>
                                    <h3 className="text-accent border-hairline mb-4 border-b pb-2 text-xs font-bold tracking-widest uppercase">
                                        BERITA TERKAIT
                                    </h3>
                                    <div className="space-y-4">
                                        {relatedNews &&
                                            relatedNews.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={`/news/${item.slug}`}
                                                    className="group flex items-start gap-3"
                                                >
                                                    <img
                                                        src={
                                                            item.featured_image
                                                                ?.url ||
                                                            item.thumbnail
                                                                ?.url ||
                                                            ''
                                                        }
                                                        alt={item.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="bg-card h-16 w-20 flex-shrink-0 rounded-lg object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display =
                                                                'none';
                                                        }}
                                                    />
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="group-hover:text-accent mb-1 line-clamp-2 text-sm leading-tight font-medium transition-colors">
                                                            {item.title}
                                                        </h4>
                                                        <div className="text-ink-subtle text-xs">
                                                            {formatDate(
                                                                item.published_at,
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                    </div>
                                </section>

                                {/* Popular News */}
                                <section>
                                    <h3 className="text-accent border-hairline mb-4 border-b pb-2 text-xs font-bold tracking-widest uppercase">
                                        SEDANG POPULER
                                    </h3>
                                    <div className="space-y-4">
                                        {popularNews &&
                                            popularNews.map((item, index) => (
                                                <Link
                                                    key={item.id || index}
                                                    href={`/news/${item.slug}`}
                                                    className="group flex items-start gap-3"
                                                >
                                                    <div className="w-6 flex-shrink-0 text-2xl font-black text-[#1E293B]">
                                                        {index + 1}
                                                    </div>
                                                    <img
                                                        src={
                                                            item.featured_image
                                                                ?.url ||
                                                            item.thumbnail
                                                                ?.url ||
                                                            ''
                                                        }
                                                        alt={item.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="bg-card h-12 w-16 flex-shrink-0 rounded object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display =
                                                                'none';
                                                        }}
                                                    />
                                                    <div className="min-w-0 flex-1">
                                                        <div className="group-hover:text-accent line-clamp-2 text-sm leading-tight font-medium transition-colors">
                                                            {item.title}
                                                        </div>
                                                        <div className="text-ink-subtle mt-1 text-xs">
                                                            {formatDate(
                                                                item.published_at,
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                    </div>
                                </section>
                            </div>
                        </aside>
                    </div>
                </main>

                {/* Bottom Leaderboard Ad */}
                <div className="mx-auto mb-8 max-w-7xl px-4">
                    <AdBanner position="bottom-leaderboard" />
                </div>

                <Footer />
            </div>
        </>
    );
}
