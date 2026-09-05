import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import BreakingNews from '@/Components/BreakingNews';
import AdBanner from '@/Components/AdBanner';
import EditorsChoice from '@/Components/EditorsChoice';
import CategoryNews from '@/Components/CategoryNews';
import { formatDate, formatDateShort } from '@/lib/date';

interface Props {
    breakingNews: any[];
    heroNews: any;
    latestNews: any[];
    popularNews: any[];
    editorsChoice: any[];
    categoriesList: any[];
    navCategories: any[];
}

export default function Home({
    breakingNews,
    heroNews,
    latestNews,
    popularNews,
    editorsChoice,
    categoriesList,
    navCategories,
}: Props) {
    return (
        <>
            <Head title="MyNews - Berita Terkini Indonesia" />
            <div className="bg-canvas text-ink min-h-screen">
                <Header categories={navCategories} />

                {/* Breaking News */}
                <BreakingNews items={breakingNews} />

                {/* Top Leaderboard Ad */}
                <div className="mx-auto max-w-7xl px-4">
                    <AdBanner position="top-leaderboard" />
                </div>

                <main className="mx-auto max-w-7xl px-4 py-4">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Main Content */}
                        <div className="space-y-12 lg:col-span-8">
                            {/* Hero - Kompas.com style headline */}
                            {heroNews ? (
                                <article className="group">
                                    {/* Photo Section with overlays */}
                                    <Link
                                        href={`/news/${heroNews.slug}`}
                                        className="block"
                                    >
                                        <div className="relative overflow-hidden rounded-2xl">
                                            <img
                                                src={
                                                    heroNews.featured_image
                                                        ?.url ||
                                                    heroNews.thumbnail?.url ||
                                                    ''
                                                }
                                                alt={heroNews.title}
                                                fetchPriority="high"
                                                className="bg-card h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] md:h-[480px]"
                                                onError={(e) => {
                                                    e.currentTarget.style.display =
                                                        'none';
                                                }}
                                            />

                                            {/* Category badge - top left */}
                                            <div className="bg-accent text-ink absolute top-4 left-4 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-md">
                                                {heroNews.category?.name ||
                                                    'NASIONAL'}
                                            </div>

                                            {/* Bottom gradient overlay for title readability */}
                                            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent px-5 pt-16 pb-5">
                                                <h1 className="group-hover:text-accent text-ink mb-2 text-xl leading-tight font-bold transition-colors md:text-2xl lg:text-3xl">
                                                    {heroNews.title}
                                                </h1>
                                                <div className="text-ink/80 flex items-center gap-3 text-[11px]">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-accent">
                                                            👤
                                                        </span>
                                                        <span>
                                                            {heroNews.author
                                                                ?.name ||
                                                                'Redaksi'}
                                                        </span>
                                                    </div>
                                                    <span>•</span>
                                                    <span>
                                                        {formatDateShort(
                                                            heroNews.published_at ||
                                                                heroNews.created_at,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Excerpt below photo */}
                                        <p className="text-ink-muted mt-4 line-clamp-2 text-sm leading-relaxed md:text-base">
                                            {heroNews.excerpt ||
                                                heroNews.sub_title}
                                        </p>
                                    </Link>
                                </article>
                            ) : null}

                            {/* Editor's Choice Section */}
                            <EditorsChoice items={editorsChoice} />

                            {/* Latest News */}
                            <section>
                                <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                                    <span className="text-accent">●</span>
                                    BERITA TERBARU
                                </h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {latestNews &&
                                        latestNews.map((news) => (
                                            <article
                                                key={news.id}
                                                className="group"
                                            >
                                                <div className="bg-elevated flex h-full flex-col justify-between overflow-hidden rounded-2xl">
                                                    <div>
                                                        <img
                                                            src={
                                                                news
                                                                    .featured_image
                                                                    ?.url ||
                                                                news.thumbnail
                                                                    ?.url ||
                                                                ''
                                                            }
                                                            alt={news.title}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="bg-card h-48 w-full object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display =
                                                                    'none';
                                                            }}
                                                        />
                                                        <div className="p-6">
                                                            <div className="text-accent mb-2 text-xs font-bold tracking-widest uppercase">
                                                                {news.category
                                                                    ?.name ||
                                                                    'BERITA'}
                                                            </div>
                                                            <Link
                                                                href={`/news/${news.slug}`}
                                                            >
                                                                <h3 className="group-hover:text-accent mb-3 line-clamp-2 text-lg leading-tight font-semibold transition-colors">
                                                                    {news.title}
                                                                </h3>
                                                            </Link>
                                                            <p className="text-ink-meta mb-4 line-clamp-2 text-sm">
                                                                {news.excerpt}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-ink-meta flex items-center justify-between border-t border-[#334155]/40 px-6 pt-4 pb-6 text-xs">
                                                        <span>
                                                            {formatDate(
                                                                news.published_at ||
                                                                    news.created_at,
                                                            )}
                                                        </span>
                                                        <Link
                                                            href={`/news/${news.slug}`}
                                                            className="text-accent font-medium"
                                                        >
                                                            Baca →
                                                        </Link>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                </div>
                            </section>

                            {/* Category News Blocks */}
                            {categoriesList &&
                                categoriesList.map((category) => (
                                    <CategoryNews
                                        key={category.id}
                                        data={category}
                                    />
                                ))}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-10">
                                {/* Popular News */}
                                <section>
                                    <h3 className="text-accent mb-4 text-xs font-bold tracking-widest uppercase">
                                        BERITA POPULER
                                    </h3>
                                    <div className="space-y-6">
                                        {popularNews &&
                                            popularNews.map((item, index) => (
                                                <div
                                                    key={item.id || index}
                                                    className="flex gap-4"
                                                >
                                                    <div
                                                        aria-hidden="true"
                                                        className="w-8 text-4xl font-black text-[#1E293B]"
                                                    >
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <Link
                                                            href={`/news/${item.slug}`}
                                                        >
                                                            <div className="hover:text-accent line-clamp-2 leading-tight font-medium transition-colors">
                                                                {item.title}
                                                            </div>
                                                        </Link>
                                                        <div className="text-ink-subtle mt-1 text-xs">
                                                            {formatDate(
                                                                item.published_at,
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </section>

                                {/* Sidebar Ad */}
                                <AdBanner position="sidebar" />

                                {/* Categories */}
                                <section>
                                    <h3 className="mb-4 text-xs font-bold tracking-widest uppercase">
                                        KATEGORI
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {navCategories &&
                                        navCategories.length > 0
                                            ? navCategories.map((cat: any) => (
                                                  <Link
                                                      key={cat.id}
                                                      href={`/category/${cat.slug}`}
                                                      className="bg-elevated hover:bg-accent hover:text-ink rounded-full px-4 py-2 text-xs transition-colors"
                                                  >
                                                      {cat.name}
                                                  </Link>
                                              ))
                                            : [
                                                  'Nasional',
                                                  'Internasional',
                                                  'Politik',
                                                  'Ekonomi',
                                                  'Teknologi',
                                                  'Olahraga',
                                                  'Lifestyle',
                                                  'Entertainment',
                                                  'Kesehatan',
                                              ].map((cat) => (
                                                  <Link
                                                      key={cat}
                                                      href={`/category/${cat.toLowerCase()}`}
                                                      className="bg-elevated hover:bg-accent hover:text-ink rounded-full px-4 py-2 text-xs transition-colors"
                                                  >
                                                      {cat}
                                                  </Link>
                                              ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
