import { Link } from '@inertiajs/react';
import { formatDate } from '@/lib/date';

interface ArticleItem {
    id: number;
    title: string;
    category: any;
    author: any;
    slug: string;
    published_at: string;
    created_at: string;
    featured_image: any;
    thumbnail: any;
    excerpt: string;
}

interface Props {
    items?: ArticleItem[];
}

export default function EditorsChoice({ items = [] }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <section className="bg-[#0F172A] border border-hairline p-6 mb-12">
            <div className="flex items-center justify-between border-b border-hairline pb-4 mb-6">
                <div className="flex items-center gap-3">
                    <span className="bg-accent text-ink text-[10px] font-black px-2 py-0.5 tracking-wider uppercase">
                        KURASI
                    </span>
                    <h2 className="text-xl font-bold tracking-tight text-ink flex items-center gap-2">
                        PILIHAN EDITOR
                    </h2>
                </div>
                <span className="text-xs text-ink-meta">Edisi Khusus Redaksi</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item) => (
                    <article key={item.id} className="group flex flex-col justify-between">
                        <div>
                            <div className="relative overflow-hidden mb-3">
                                <img
                                    src={item.featured_image?.url || item.thumbnail?.url || ''}
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300 bg-card"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                                <span className="absolute top-2 left-2 bg-canvas/80 backdrop-blur-sm text-accent text-[10px] font-bold px-2 py-1 uppercase">
                                    {item.category?.name || 'BERITA'}
                                </span>
                            </div>
                            <Link href={`/news/${item.slug}`}>
                                <h3 className="text-base font-semibold leading-snug text-ink group-hover:text-accent transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                            </Link>
                            <p className="text-xs text-ink-meta line-clamp-2 mt-2">{item.excerpt}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-ink-subtle mt-4 pt-3 border-t border-hairline">
                            <span>Oleh {item.author?.name || 'Redaksi'}</span>
                            <span>{formatDate(item.published_at || item.created_at)}</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
