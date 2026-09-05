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

export default function Home({ breakingNews, heroNews, latestNews, popularNews, editorsChoice, categoriesList, navCategories }: Props) {
    return (
        <>
            <Head title="MyNews - Berita Terkini Indonesia" />
            <div className="min-h-screen bg-canvas text-ink">
                <Header categories={navCategories} />

                {/* Breaking News */}
                <BreakingNews items={breakingNews} />

                {/* Top Leaderboard Ad */}
                <div className="mx-auto max-w-7xl px-4">
                    <AdBanner position="top-leaderboard" />
                </div>

                <main className="mx-auto max-w-7xl px-4 py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Hero - Kompas.com style headline */}
                            {heroNews ? (
                                <article className="group">
                                    {/* Photo Section with overlays */}
                                    <Link href={`/news/${heroNews.slug}`} className="block">
                                        <div className="relative overflow-hidden rounded-2xl">
                                            <img
                                                src={heroNews.featured_image?.url || heroNews.thumbnail?.url || ''}
                                                alt={heroNews.title}
                                                fetchpriority="high"
                                                className="w-full h-[420px] md:h-[480px] object-cover bg-card group-hover:scale-[1.02] transition-transform duration-500"
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                            />

                                            {/* Category badge - top left */}
                                            <div className="absolute top-4 left-4 bg-accent text-ink text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider shadow-md">
                                                {heroNews.category?.name || 'NASIONAL'}
                                            </div>

                                            {/* Bottom gradient overlay for title readability */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-16 pb-5 px-5">
                                                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-2 group-hover:text-accent transition-colors text-ink">
                                                    {heroNews.title}
                                                </h1>
                                                <div className="flex items-center gap-3 text-[11px] text-ink/80">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-accent">👤</span>
                                                        <span>{heroNews.author?.name || 'Redaksi'}</span>
                                                    </div>
                                                    <span>•</span>
                                                    <span>{formatDateShort(heroNews.published_at || heroNews.created_at)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Excerpt below photo */}
                                        <p className="text-ink-muted text-sm md:text-base mt-4 leading-relaxed line-clamp-2">
                                            {heroNews.excerpt || heroNews.sub_title}
                                        </p>
                                    </Link>
                                </article>
                            ) : null}

                            {/* Editor's Choice Section */}
                            <EditorsChoice items={editorsChoice} />

                            {/* Latest News */}
                            <section>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <span className="text-accent">●</span>
                                    BERITA TERBARU
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {latestNews && latestNews.map((news) => (
                                        <article key={news.id} className="group">
                                            <div className="bg-elevated rounded-2xl overflow-hidden flex flex-col justify-between h-full">
                                                <div>
                                                    <img
                                                        src={news.featured_image?.url || news.thumbnail?.url || ''}
                                                        alt={news.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="w-full h-48 object-cover bg-card"
                                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                    />
                                                    <div className="p-6">
                                                        <div className="text-accent text-xs font-bold uppercase tracking-widest mb-2">
                                                            {news.category?.name || 'BERITA'}
                                                        </div>
                                                        <Link href={`/news/${news.slug}`}>
                                                            <h3 className="font-semibold text-lg leading-tight mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                                                {news.title}
                                                            </h3>
                                                        </Link>
                                                        <p className="text-ink-meta text-sm line-clamp-2 mb-4">
                                                            {news.excerpt}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="px-6 pb-6 text-ink-meta text-xs flex justify-between items-center border-t border-[#334155]/40 pt-4">
                                                    <span>{formatDate(news.published_at || news.created_at)}</span>
                                                    <Link href={`/news/${news.slug}`} className="text-accent font-medium">
                                                        Baca →
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            {/* Category News Blocks */}
                            {categoriesList && categoriesList.map((category) => (
                                <CategoryNews key={category.id} data={category} />
                            ))}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-10">
                                {/* Popular News */}
                                <section>
                                    <h3 className="uppercase text-xs tracking-widest font-bold mb-4 text-accent">BERITA POPULER</h3>
                                    <div className="space-y-6">
                                        {popularNews && popularNews.map((item, index) => (
                                            <div key={item.id || index} className="flex gap-4">
                                                <div aria-hidden="true" className="text-4xl font-black text-[#1E293B] w-8">{index + 1}</div>
                                                <div className="flex-1">
                                                    <Link href={`/news/${item.slug}`}>
                                                        <div className="font-medium leading-tight line-clamp-2 hover:text-accent transition-colors">
                                                            {item.title}
                                                        </div>
                                                    </Link>
                                                    <div className="text-xs text-ink-subtle mt-1">
                                                        {formatDate(item.published_at)}
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
                                    <h3 className="uppercase text-xs tracking-widest font-bold mb-4">KATEGORI</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["Nasional", "Internasional", "Politik", "Ekonomi", "Teknologi", "Olahraga", "Lifestyle", "Entertainment", "Kesehatan"].map((cat) => (
                                            <a
                                                key={cat}
                                                href={`/category/${cat.toLowerCase()}`}
                                                className="text-xs bg-elevated hover:bg-accent hover:text-ink px-4 py-2 rounded-full transition-colors"
                                            >
                                                {cat}
                                            </a>
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
