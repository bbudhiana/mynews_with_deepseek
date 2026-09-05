import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import AdBanner from '@/Components/AdBanner';
import { formatDate } from '@/lib/date';

interface Props {
    category: any;
    featured: any;
    articles: any;
    navCategories?: any[];
}

export default function Index({ category, featured, articles, navCategories }: Props) {
    const categoryName = category?.name || "Nasional";
    return (
        <>
            <Head title={`Berita ${categoryName} Terkini - MyNews`} />
            <div className="min-h-screen bg-canvas text-ink">
                <Header categories={navCategories} />

                {/* Top Leaderboard Ad */}
                <div className="mx-auto max-w-7xl px-4">
                    <AdBanner position="top-leaderboard" />
                </div>

                <main className="mx-auto max-w-7xl px-4 py-8">
                    {/* Category Title Header */}
                    <div className="border-b border-hairline pb-6 mb-8 flex items-baseline justify-between">
                        <div>
                            <span className="text-accent font-black uppercase tracking-widest text-xs">KATEGORI</span>
                            <h1 className="text-4xl font-extrabold tracking-tight mt-1">{categoryName}</h1>
                        </div>
                        <span className="text-sm text-ink-meta">
                            Menampilkan {articles?.total || articles?.data?.length || 0} Berita
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Articles List */}
                        <div className="lg:col-span-8">
                            {/* Featured Category News */}
                            {featured && (
                                <article className="group mb-12 border-b border-hairline pb-8">
                                    <div className="relative overflow-hidden rounded-2xl mb-4">
                                        <img
                                            src={featured.featured_image?.url || featured.thumbnail?.url || ''}
                                            alt={featured.title}
                                            fetchpriority="high"
                                            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 bg-card"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                        <span className="absolute top-4 left-4 bg-accent text-ink text-xs font-bold px-3 py-1 uppercase">
                                            SOROTAN
                                        </span>
                                    </div>
                                    <Link href={`/news/${featured.slug}`}>
                                        <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-accent transition-colors mb-3">
                                            {featured.title}
                                        </h2>
                                    </Link>
                                    <p className="text-ink-meta leading-relaxed mb-4">
                                        {featured.excerpt || featured.sub_title}
                                    </p>
                                    <div className="text-xs text-ink-subtle">
                                        {formatDate(featured.published_at || featured.created_at)} • Oleh {featured.author?.name || 'Redaksi'}
                                    </div>
                                </article>
                            )}

                            {/* Articles Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {articles?.data && articles.data.map((item: any) => (
                                    <article key={item.id} className="group flex flex-col justify-between border-b border-hairline pb-6">
                                        <div>
                                            <div className="relative overflow-hidden rounded-xl mb-3">
                                                <img
                                                    src={item.featured_image?.url || item.thumbnail?.url || ''}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300 bg-card"
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                />
                                            </div>
                                            <Link href={`/news/${item.slug}`}>
                                                <h3 className="font-bold text-lg leading-snug group-hover:text-accent transition-colors line-clamp-2">
                                                    {item.title}
                                                </h3>
                                            </Link>
                                        </div>
                                        <div className="text-xs text-ink-subtle mt-4">
                                            {formatDate(item.published_at || item.created_at)}
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination Links */}
                            {articles?.links && (
                                <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-hairline">
                                    {articles.links.map((link: any, index: number) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            aria-disabled={!link.url || undefined}
                                            tabIndex={!link.url ? -1 : 0}
                                            className={`px-4 py-2 border text-sm transition-colors ${
                                                link.active
                                                    ? 'bg-accent border-accent text-ink font-bold'
                                                    : 'border-[#334155] text-ink-meta hover:border-white'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-10">
                            <AdBanner position="sidebar" />

                            {/* Subcategories */}
                            <div className="bg-card p-6 border border-hairline">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-4">TOPIK HANGAT {categoryName.toUpperCase()}</h3>
                                <ul className="space-y-3 text-sm text-ink-meta">
                                    <li><Link href={`/search?q=${encodeURIComponent('Kebijakan Publik')}`} className="hover:text-accent"># Kebijakan Publik</Link></li>
                                    <li><Link href={`/search?q=${encodeURIComponent('Hukum dan HAM')}`} className="hover:text-accent"># Hukum dan HAM</Link></li>
                                    <li><Link href={`/search?q=${encodeURIComponent('Dinamika Daerah')}`} className="hover:text-accent"># Dinamika Daerah</Link></li>
                                    <li><Link href={`/search?q=${encodeURIComponent('Pelayanan Publik')}`} className="hover:text-accent"># Pelayanan Publik</Link></li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
