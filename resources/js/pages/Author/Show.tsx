import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import AdBanner from '@/Components/AdBanner';
import SeoHead from '@/Components/SeoHead';
import { formatDate } from '@/lib/date';

interface Props {
    seo?: any;
    author: any;
    articles: any;
    navCategories?: any[];
}

export default function Show({ seo, author, articles, navCategories }: Props) {
    const list = articles?.data || [];

    return (
        <>
            <SeoHead seo={seo} title={seo?.title} />
            <div className="bg-canvas text-ink min-h-screen">
                <Header categories={navCategories} />

                <div className="mx-auto max-w-7xl px-4">
                    <AdBanner position="top-leaderboard" />
                </div>

                <main className="mx-auto max-w-7xl px-4 py-8">
                    <div className="border-hairline mb-8 flex items-start gap-6 border-b pb-8">
                        {author.profile_photo_path ? (
                            <img
                                src={`/storage/${author.profile_photo_path}`}
                                alt={author.name}
                                className="h-24 w-24 flex-shrink-0 rounded-full object-cover"
                            />
                        ) : (
                            <div className="bg-elevated flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full text-3xl">
                                👤
                            </div>
                        )}
                        <div>
                            <span className="text-accent text-xs font-black tracking-widest uppercase">
                                Kontributor
                            </span>
                            <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
                                {author.name}
                            </h1>
                            <p className="text-ink-meta mt-1 text-sm">
                                {author.job_title || 'Wartawan'}
                            </p>
                            {author.bio && (
                                <p className="text-ink-muted mt-3 max-w-3xl text-sm leading-relaxed">
                                    {author.bio}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-8">
                            {list.length > 0 ? (
                                list.map((item: any) => (
                                    <article key={item.id} className="group">
                                        <Link href={`/news/${item.slug}`}>
                                            <img
                                                src={
                                                    item.featured_image?.url ||
                                                    item.thumbnail?.url ||
                                                    ''
                                                }
                                                alt={item.title}
                                                loading="lazy"
                                                className="bg-card mb-3 h-44 w-full rounded-xl object-cover"
                                            />
                                            <span className="text-accent text-xs font-bold tracking-wider uppercase">
                                                {item.category?.name ||
                                                    'BERITA'}
                                            </span>
                                            <h2 className="group-hover:text-accent mt-1 line-clamp-2 text-lg leading-snug font-bold transition-colors">
                                                {item.title}
                                            </h2>
                                            <p className="text-ink-subtle mt-2 text-xs">
                                                {formatDate(item.published_at)}
                                            </p>
                                        </Link>
                                    </article>
                                ))
                            ) : (
                                <p className="text-ink-meta">
                                    Belum ada artikel.
                                </p>
                            )}
                        </div>

                        <aside className="space-y-8 lg:col-span-4">
                            <AdBanner position="sidebar" />
                        </aside>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
