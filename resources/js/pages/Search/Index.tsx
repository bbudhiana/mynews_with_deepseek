import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import AdBanner from '@/Components/AdBanner';
import { formatDate } from '@/lib/date';

interface Props {
    query?: string;
    articles?: any;
    navCategories?: any[];
}

export default function Index({ query = '', articles, navCategories }: Props) {
    const articleList = articles?.data || [];
    const totalArticles = articles?.total || 0;

    return (
        <>
            <Head title={`Hasil Pencarian: "${query}" - MyNews`} />
            <div className="bg-canvas text-ink min-h-screen">
                <Header categories={navCategories} />

                {/* Top Leaderboard Ad */}
                <div className="mx-auto max-w-7xl px-4">
                    <AdBanner position="top-leaderboard" />
                </div>

                <main className="mx-auto max-w-7xl px-4 py-8">
                    {/* Search Header */}
                    <div className="border-hairline mb-8 border-b pb-8">
                        <span className="text-accent text-xs font-black tracking-widest uppercase">
                            PENCARIAN
                        </span>
                        <h1 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">
                            Hasil untuk:{' '}
                            <span className="text-accent">"{query}"</span>
                        </h1>
                        <p className="text-ink-meta mt-2 text-sm">
                            Ditemukan {totalArticles} artikel terkait kata kunci
                            ini
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <div className="space-y-6 lg:col-span-8">
                            {articleList.length > 0 ? (
                                articleList.map((item: any) => (
                                    <article
                                        key={item.id}
                                        className="border-hairline group flex flex-col gap-6 border-b pb-6 md:flex-row"
                                    >
                                        <img
                                            src={
                                                item.featured_image?.url ||
                                                item.thumbnail?.url ||
                                                ''
                                            }
                                            alt={item.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="bg-card h-36 w-full rounded-xl object-cover md:w-56"
                                            onError={(e) => {
                                                e.currentTarget.style.display =
                                                    'none';
                                            }}
                                        />
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <span className="text-accent text-xs font-bold tracking-wider uppercase">
                                                    {item.category?.name ||
                                                        'BERITA'}
                                                </span>
                                                <Link
                                                    href={`/news/${item.slug}`}
                                                >
                                                    <h2 className="group-hover:text-accent mt-1 mb-2 text-xl leading-tight font-bold transition-colors">
                                                        {item.title}
                                                    </h2>
                                                </Link>
                                                <p className="text-ink-meta line-clamp-2 text-sm leading-relaxed">
                                                    {item.excerpt ||
                                                        item.sub_title}
                                                </p>
                                            </div>
                                            <div className="text-ink-subtle mt-4 text-xs">
                                                {formatDate(
                                                    item.published_at ||
                                                        item.created_at,
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="py-12 text-center">
                                    <p className="text-ink-meta text-lg">
                                        Tidak ada artikel ditemukan untuk "
                                        {query}"
                                    </p>
                                    <p className="text-ink-subtle mt-2 text-sm">
                                        Coba kata kunci lain atau jelajahi
                                        kategori populer.
                                    </p>
                                </div>
                            )}

                            {/* Pagination */}
                            {articles?.links && articleList.length > 0 && (
                                <div className="border-hairline mt-8 flex items-center justify-center gap-2 border-t pt-8">
                                    {articles.links.map(
                                        (link: any, index: number) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                aria-disabled={
                                                    !link.url || undefined
                                                }
                                                tabIndex={!link.url ? -1 : 0}
                                                className={`border px-4 py-2 text-sm transition-colors ${
                                                    link.active
                                                        ? 'bg-accent border-accent text-ink font-bold'
                                                        : 'text-ink-meta border-[#334155] hover:border-white'
                                                } ${!link.url ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ),
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8 lg:col-span-4">
                            <AdBanner position="sidebar" />

                            <div className="bg-card border-hairline border p-6">
                                <h3 className="text-ink mb-4 text-sm font-bold tracking-wider uppercase">
                                    KATA KUNCI POPULER
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        'Pemilu',
                                        'Rupiah',
                                        'Cuaca Ekstrem',
                                        'Harga Beras',
                                        'Subsidi BBM',
                                        'Timnas',
                                    ].map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/search?q=${encodeURIComponent(tag)}`}
                                            className="bg-elevated hover:bg-accent rounded-full px-3 py-1.5 text-xs transition-colors"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
