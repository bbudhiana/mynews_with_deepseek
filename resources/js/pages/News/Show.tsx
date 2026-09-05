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
                className="article-body text-[#E2E8F0] text-[17px] md:text-[19px] leading-[1.85] font-serif max-w-[68ch]"
            />
            <div className="my-12 flex justify-center">
                <AdBanner position="in-article" />
            </div>
            <div
                ref={secondRef}
                className="article-body text-[#E2E8F0] text-[17px] md:text-[19px] leading-[1.85] font-serif max-w-[68ch]"
            />
        </>
    );
}

export default function Show({ article, relatedNews, popularNews, navCategories }: Props) {
    if (!article) return null;
    return (
        <>
            <Head title={`${article.title} - MyNews`} />
            <div className="min-h-screen bg-[#0B1220] text-white">
                <Header categories={navCategories} />

                {/* Top Leaderboard Ad */}
                <div className="mx-auto max-w-7xl px-4">
                    <AdBanner position="top-leaderboard" />
                </div>

                <main className="mx-auto max-w-7xl px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Article Content */}
                        <article className="lg:col-span-8">
                            {/* Breadcrumb & Category */}
                            <div className="flex items-center gap-2 text-sm mb-6">
                                <Link href="/" className="text-[#94A3B8] hover:text-white">Home</Link>
                                <span className="text-[#475569]">/</span>
                                <Link href={`/category/${article.category?.slug || 'nasional'}`} className="text-[#D71920] font-bold uppercase tracking-wider">
                                    {article.category?.name || 'Nasional'}
                                </Link>
                            </div>

                            {/* Title & Meta */}
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                                {article.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center justify-end gap-4 py-4 border-y border-[#1E293B] mb-8 text-sm text-[#94A3B8]">
                                <span>{formatDate(article.published_at || article.created_at)}</span>
                                <span className="flex items-center gap-1">⏱️ 3 menit baca</span>
                            </div>

                            {(article.author?.bio || article.author?.name) && (
                                <div className="bg-[#131E31] border border-[#1E293B] p-4 mb-8 rounded-2xl flex items-start gap-4">
                                    {article.author?.profile_photo_path ? (
                                        <img
                                            src={`/storage/${article.author.profile_photo_path}`}
                                            alt={article.author.name}
                                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-[#1E293B] flex items-center justify-center text-2xl flex-shrink-0">
                                            👤
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="font-bold text-sm">{article.author.name}</div>
                                        <div className="text-xs text-[#D71920] mb-2">{article.author.job_title || 'Kontributor'}</div>
                                        {article.author?.bio && (
                                            <p className="text-xs text-[#94A3B8] line-clamp-3">{article.author.bio}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Featured Image */}
                            <figure className="mb-10">
                                <img
                                    src={article.featured_image?.url || article.thumbnail?.url || ''}
                                    alt={article.title}
                                    className="w-full h-auto rounded-2xl bg-[#131E31]"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                                <figcaption className="text-xs text-[#64748B] mt-3 text-left">
                                    {article.image_caption || article.image_credit
                                        ? `${article.image_caption ?? ''}${article.image_caption && article.image_credit ? ' • ' : ''}${article.image_credit ? `Kredit: ${article.image_credit}` : ''}`.trim()
                                        : 'Dokumentasi Redaksi'}
                                </figcaption>
                            </figure>

                            {/* Article Body — split at midpoint with in-article ad injected between */}
                            <ArticleBody html={article.body || article.excerpt || ''} />

                            {/* Tags */}
                            <div className="mt-12 pt-6 border-t border-[#1E293B]">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-[#94A3B8]">TAGS:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {['Nasional', 'Terkini', 'Pemerintah', 'Sorotan'].map(tag => (
                                            <Link key={tag} href={`/search?q=${tag.toLowerCase()}`} className="text-xs bg-[#1E293B] hover:bg-[#334155] px-3 py-1.5 rounded-full transition-colors">
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Share */}
                            <div className="mt-8 flex items-center gap-4">
                                <span className="text-sm font-bold">Bagikan:</span>
                                <button className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-80 transition-opacity">f</button>
                                <button className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:opacity-80 transition-opacity">𝕏</button>
                                <button className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:opacity-80 transition-opacity">W</button>
                                <button className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center hover:bg-[#334155] transition-colors">🔗</button>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-24 space-y-10">
                                {/* Sidebar Ad */}
                                <AdBanner position="sidebar" />

                                {/* Related News */}
                                <section>
                                    <h3 className="uppercase text-xs tracking-widest font-bold mb-4 text-[#D71920] border-b border-[#1E293B] pb-2">BERITA TERKAIT</h3>
                                    <div className="space-y-4">
                                        {relatedNews && relatedNews.map((item) => (
                                            <Link key={item.id} href={`/news/${item.slug}`} className="group flex gap-3 items-start">
                                                <img
                                                    src={item.featured_image?.url || item.thumbnail?.url || ''}
                                                    alt={item.title}
                                                    className="w-20 h-16 object-cover rounded-lg bg-[#131E31] flex-shrink-0"
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-sm leading-tight group-hover:text-[#D71920] transition-colors line-clamp-2 mb-1">{item.title}</h4>
                                                    <div className="text-xs text-[#64748B]">{formatDate(item.published_at)}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>

                                {/* Popular News */}
                                <section>
                                    <h3 className="uppercase text-xs tracking-widest font-bold mb-4 text-[#D71920] border-b border-[#1E293B] pb-2">SEDANG POPULER</h3>
                                    <div className="space-y-4">
                                        {popularNews && popularNews.map((item, index) => (
                                            <Link key={item.id || index} href={`/news/${item.slug}`} className="group flex gap-3 items-start">
                                                <div className="text-2xl font-black text-[#1E293B] w-6 flex-shrink-0">{index + 1}</div>
                                                <img
                                                    src={item.featured_image?.url || item.thumbnail?.url || ''}
                                                    alt={item.title}
                                                    className="w-16 h-12 object-cover rounded bg-[#131E31] flex-shrink-0"
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-[#D71920] transition-colors">{item.title}</div>
                                                    <div className="text-xs text-[#64748B] mt-1">{formatDate(item.published_at)}</div>
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
                <div className="mx-auto max-w-7xl px-4 mb-8">
                    <AdBanner position="bottom-leaderboard" />
                </div>

                <Footer />
            </div>
        </>
    );
}
