import { Link } from '@inertiajs/react';
import { formatDate } from '@/lib/date';

interface ArticleItem {
    id: number;
    title: string;
    slug: string;
    published_at: string;
    created_at: string;
    featured_image: any;
    thumbnail: any;
}

interface CategoryData {
    id: number;
    name: string;
    slug: string;
    contents: ArticleItem[];
}

interface CategoryNewsProps {
    data?: CategoryData;
    title?: string;
}

export default function CategoryNews({ data, title }: CategoryNewsProps) {
    const articles = data?.contents || [];

    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-[#D71920]">●</span>
                    {title || data?.name || 'Kategori'}
                </h2>
                <Link href={`/category/${data?.slug || 'nasional'}`} className="text-[#D71920] text-sm font-medium hover:underline">
                    Lihat Semua →
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(0, 3).map((article) => (
                    <article key={article.id} className="group">
                        <div className="relative overflow-hidden mb-4">
                            <img
                                src={article.featured_image?.url || article.thumbnail?.url || ''}
                                alt={article.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 bg-[#131E31]"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                        </div>
                        <Link href={`/news/${article.slug}`}>
                            <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-[#D71920] transition-colors line-clamp-2">
                                {article.title}
                            </h3>
                        </Link>
                        <div className="text-xs text-[#64748B]">
                            {formatDate(article.published_at || article.created_at)}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
