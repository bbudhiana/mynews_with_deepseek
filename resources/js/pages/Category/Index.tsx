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

export default function Index({
    category,
    featured,
    articles,
    navCategories,
}: Props) {
    const categoryName = category?.name || 'Nasional';
    return (
        <>
            <Head title={`Berita ${categoryName} Terkini - MyNews`} />
            <div className="bg-canvas text-ink min-h-screen">
                <Header categories={navCategories} />

                {/* Top Leaderboard Ad */}
                <div className="mx-auto max-w-7xl px-4">
                    <AdBanner position="top-leaderboard" />
                </div>

                <main className="mx-auto max-w-7xl px-4 py-8">
                    {/* Category Title Header */}
                    <div className="border-hairline mb-8 flex items-baseline justify-between border-b pb-6">
                        <div>
                            <span className="text-accent text-xs font-black tracking-widest uppercase">
                                KATEGORI
                            </span>
                            <h1 className="mt-1 text-4xl font-extrabold tracking-tight">
                                {categoryName}
                            </h1>
                        </div>
                        <span className="text-ink-meta text-sm">
                            Menampilkan{' '}
                            {articles?.total || articles?.data?.length || 0}{' '}
                            Berita
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Main Articles List */}
                        <div className="lg:col-span-8">
                            {/* Featured Category News */}
                            {featured && (
                                <article className="group border-hairline mb-12 border-b pb-8">
                                    <div className="relative mb-4 overflow-hidden rounded-2xl">
                                        <img
                                            src={
                                                featured.featured_image?.url ||
                                                featured.thumbnail?.url ||
                                                ''
                                            }
                                            alt={featured.title}
                                            fetchPriority="high"
                                            className="bg-card h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.style.display =
                                                    'none';
                                            }}
                                        />
                                        <span className="bg-accent text-ink absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase">
                                            SOROTAN
                                        </span>
                                    </div>
                                    <Link href={`/news/${featured.slug}`}>
                                        <h2 className="group-hover:text-accent mb-3 text-2xl leading-tight font-bold transition-colors md:text-3xl">
                                            {featured.title}
                                        </h2>
                                    </Link>
                                    <p className="text-ink-meta mb-4 leading-relaxed">
                                        {featured.excerpt || featured.sub_title}
                                    </p>
                                    <div className="text-ink-subtle text-xs">
                                        {formatDate(
                                            featured.published_at ||
                                                featured.created_at,
                                        )}{' '}
                                        • Oleh{' '}
                                        {featured.author?.name || 'Redaksi'}
                                    </div>
                                </article>
                            )}

                            {/* Articles Grid */}
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {articles?.data &&
                                    articles.data.map((item: any) => (
                                        <article
                                            key={item.id}
                                            className="group border-hairline flex flex-col justify-between border-b pb-6"
                                        >
                                            <div>
                                                <div className="relative mb-3 overflow-hidden rounded-xl">
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
                                                        className="bg-card h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display =
                                                                'none';
                                                        }}
                                                    />
                                                </div>
                                                <Link
                                                    href={`/news/${item.slug}`}
                                                >
                                                    <h3 className="group-hover:text-accent line-clamp-2 text-lg leading-snug font-bold transition-colors">
                                                        {item.title}
                                                    </h3>
                                                </Link>
                                            </div>
                                            <div className="text-ink-subtle mt-4 text-xs">
                                                {formatDate(
                                                    item.published_at ||
                                                        item.created_at,
                                                )}
                                            </div>
                                        </article>
                                    ))}
                            </div>

                            {/* Pagination Links */}
                            {articles?.links && (
                                <div className="border-hairline mt-12 flex items-center justify-center gap-2 border-t pt-8">
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
                        <aside className="space-y-10 lg:col-span-4">
                            <AdBanner position="sidebar" />

                            {/* Subcategories */}
                            <div className="bg-card border-hairline border p-6">
                                <h3 className="text-ink mb-4 text-sm font-bold tracking-wider uppercase">
                                    TOPIK HANGAT {categoryName.toUpperCase()}
                                </h3>
                                <ul className="text-ink-meta space-y-3 text-sm">
                                    <li>
                                        <Link
                                            href={`/search?q=${encodeURIComponent('Kebijakan Publik')}`}
                                            className="hover:text-accent"
                                        >
                                            # Kebijakan Publik
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/search?q=${encodeURIComponent('Hukum dan HAM')}`}
                                            className="hover:text-accent"
                                        >
                                            # Hukum dan HAM
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/search?q=${encodeURIComponent('Dinamika Daerah')}`}
                                            className="hover:text-accent"
                                        >
                                            # Dinamika Daerah
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/search?q=${encodeURIComponent('Pelayanan Publik')}`}
                                            className="hover:text-accent"
                                        >
                                            # Pelayanan Publik
                                        </Link>
                                    </li>
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
