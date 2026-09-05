import { Link } from '@inertiajs/react';
import { formatDateShort } from '@/lib/date';

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
        <section className="border-hairline mb-12 border bg-[#0F172A] p-6">
            <div className="border-hairline mb-6 flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                    <span className="bg-accent text-ink px-2 py-0.5 text-[10px] font-black tracking-wider uppercase">
                        KURASI
                    </span>
                    <h2 className="text-ink flex items-center gap-2 text-xl font-bold tracking-tight">
                        PILIHAN EDITOR
                    </h2>
                </div>
                <span className="text-ink-meta text-xs">
                    Edisi Khusus Redaksi
                </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {items.map((item) => (
                    <article
                        key={item.id}
                        className="group flex flex-col justify-between"
                    >
                        <div>
                            <div className="relative mb-3 overflow-hidden">
                                <img
                                    src={
                                        item.featured_image?.url ||
                                        item.thumbnail?.url ||
                                        ''
                                    }
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="bg-card h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                <span className="bg-canvas/80 text-accent absolute top-2 left-2 px-2 py-1 text-[10px] font-bold uppercase backdrop-blur-sm">
                                    {item.category?.name || 'BERITA'}
                                </span>
                            </div>
                            <Link href={`/news/${item.slug}`}>
                                <h3 className="text-ink group-hover:text-accent line-clamp-2 text-base leading-snug font-semibold transition-colors">
                                    {item.title}
                                </h3>
                            </Link>
                            <p className="text-ink-meta mt-2 line-clamp-2 text-xs">
                                {item.excerpt}
                            </p>
                        </div>
                        <div className="text-ink-subtle border-hairline mt-4 flex items-center justify-between border-t pt-3 text-xs">
                            <span>Oleh {item.author?.name || 'Redaksi'}</span>
                            <span>
                                {formatDateShort(
                                    item.published_at || item.created_at,
                                )}
                            </span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
