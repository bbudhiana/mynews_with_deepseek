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

export default function Index({ query = "", articles, navCategories }: Props) {
    const articleList = articles?.data || [];
    const totalArticles = articles?.total || 0;

    return (
        <>
            <Head title={`Hasil Pencarian: "${query}" - MyNews`} />
            <div className="min-h-screen bg-[#0B1220] text-white">
                <Header categories={navCategories} />

                {/* Top Leaderboard Ad */}
                <div className="mx-auto max-w-7xl px-4">
                    <AdBanner position="top-leaderboard" />
                </div>

                <main className="mx-auto max-w-7xl px-4 py-8">
                    {/* Search Header */}
                    <div className="border-b border-[#1E293B] pb-8 mb-8">
                        <span className="text-[#D71920] font-black uppercase tracking-widest text-xs">PENCARIAN</span>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">
                            Hasil untuk: <span className="text-[#D71920]">"{query}"</span>
                        </h1>
                        <p className="text-sm text-[#94A3B8] mt-2">
                            Ditemukan {totalArticles} artikel terkait kata kunci ini
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-6">
                            {articleList.length > 0 ? (
                                articleList.map((item: any) => (
                                    <article key={item.id} className="border-b border-[#1E293B] pb-6 flex flex-col md:flex-row gap-6 group">
                                        <img
                                            src={item.featured_image?.url || item.thumbnail?.url || ''}
                                            alt={item.title}
                                            className="w-full md:w-56 h-36 object-cover rounded-xl bg-[#131E31]"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[#D71920] font-bold text-xs uppercase tracking-wider">
                                                    {item.category?.name || 'BERITA'}
                                                </span>
                                                <Link href={`/news/${item.slug}`}>
                                                    <h2 className="text-xl font-bold leading-tight group-hover:text-[#D71920] transition-colors mt-1 mb-2">
                                                        {item.title}
                                                    </h2>
                                                </Link>
                                                <p className="text-[#94A3B8] text-sm line-clamp-2 leading-relaxed">
                                                    {item.excerpt || item.sub_title}
                                                </p>
                                            </div>
                                            <div className="text-xs text-[#64748B] mt-4">
                                                {formatDate(item.published_at || item.created_at)}
                                            </div>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-[#94A3B8] text-lg">Tidak ada artikel ditemukan untuk "{query}"</p>
                                    <p className="text-[#64748B] text-sm mt-2">Coba kata kunci lain atau jelajahi kategori populer.</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {articles?.links && articleList.length > 0 && (
                                <div className="flex items-center justify-center gap-2 mt-8 pt-8 border-t border-[#1E293B]">
                                    {articles.links.map((link: any, index: number) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 border text-sm transition-colors ${
                                                link.active
                                                    ? 'bg-[#D71920] border-[#D71920] text-white font-bold'
                                                    : 'border-[#334155] text-[#94A3B8] hover:border-white'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-8">
                            <AdBanner position="sidebar" />

                            <div className="bg-[#131E31] p-6 border border-[#1E293B]">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">KATA KUNCI POPULER</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Pemilu', 'Rupiah', 'Cuaca Ekstrem', 'Harga Beras', 'Subsidi BBM', 'Timnas'].map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/search?q=${encodeURIComponent(tag)}`}
                                            className="text-xs bg-[#1E293B] hover:bg-[#D71920] px-3 py-1.5 rounded-full transition-colors"
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
