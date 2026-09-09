import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import AdBanner from '@/Components/AdBanner';
import SeoHead from '@/Components/SeoHead';
import DateTime from '@/Components/DateTime';
import ShareButtons from '@/Components/ShareButtons';
import { formatDate } from '@/lib/date';
import { usePage } from '@inertiajs/react';
import type {
    Article,
    ArticleListItem,
    JsonLd,
    Seo,
    SharedProps,
} from '@/types';

interface Props {
    seo?: Seo;
    jsonLd?: JsonLd[];
    article: Article;
    relatedNews: ArticleListItem[];
    popularNews: ArticleListItem[];
}

function estimateReadTime(wordCount: number): string {
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} menit baca`;
}

export default function Show({
    seo,
    jsonLd,
    article,
    relatedNews,
    popularNews,
}: Props) {
    const { props } = usePage<SharedProps>();
    if (!article) return null;

    const readTime = article.body_word_count
        ? estimateReadTime(article.body_word_count)
        : estimateReadTime((article.body || '').split(/\s+/).length);

    return (
        <>
            <SeoHead seo={seo} jsonLd={jsonLd} />
            <div className="bg-canvas text-ink min-h-screen">
                <Header categories={props.navCategories} />

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
                                <DateTime
                                    date={
                                        article.published_at ||
                                        article.created_at
                                    }
                                />
                                <span className="flex items-center gap-1">
                                    ⏱️ {readTime}
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
                                            {article.author_url ? (
                                                <Link
                                                    href={article.author_url}
                                                    className="hover:text-accent transition-colors"
                                                >
                                                    {article.author.name}
                                                </Link>
                                            ) : (
                                                article.author.name
                                            )}
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
                                    srcSet={
                                        article.featured_image?.srcset ||
                                        undefined
                                    }
                                    sizes="(min-width: 1024px) 66vw, 100vw"
                                    alt={article.title}
                                    width={1200}
                                    height={630}
                                    fetchPriority="high"
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

                            {/* Article Body — server-side pre-split for ad injection */}
                            <div
                                className="article-body text-ink-body max-w-[68ch] font-serif text-[18px] leading-[1.85] md:text-[19px]"
                                dangerouslySetInnerHTML={{
                                    __html: article.body_first || '',
                                }}
                            />
                            <div className="my-12 flex justify-center">
                                <AdBanner position="in-article" />
                            </div>
                            <div
                                className="article-body text-ink-body max-w-[68ch] font-serif text-[18px] leading-[1.85] md:text-[19px]"
                                dangerouslySetInnerHTML={{
                                    __html: article.body_second || '',
                                }}
                            />

                            {/* Tags */}
                            <div className="border-hairline mt-12 border-t pt-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-ink-meta text-sm font-bold">
                                        TAGS:
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags &&
                                        article.tags.length > 0 ? (
                                            article.tags.map((tag: any) => (
                                                <Link
                                                    key={tag.id}
                                                    href={`/search?q=${encodeURIComponent(tag.name)}`}
                                                    className="bg-elevated rounded-full px-3 py-1.5 text-xs transition-colors hover:bg-[#334155]"
                                                >
                                                    #{tag.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <span className="text-ink-subtle text-xs italic">
                                                Belum ada tag
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Share */}
                            <ShareButtons
                                title={article.title}
                                url={`${typeof window !== 'undefined' ? window.location.origin : ''}/news/${article.slug}`}
                            />
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
                                                        width={160}
                                                        height={120}
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
