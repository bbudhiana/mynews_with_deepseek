import { Link } from '@inertiajs/react';
import { formatDate } from '@/lib/date';
import type { ArticleListItem, Category } from '@/types';

type CategoryWithArticles = Category & { contents: ArticleListItem[] };

interface CategoryNewsProps {
    data?: CategoryWithArticles;
    title?: string;
}

export default function CategoryNews({ data, title }: CategoryNewsProps) {
    const articles = data?.contents || [];

    return (
        <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-ink flex items-center gap-3 text-2xl font-bold">
                    <span className="text-accent">●</span>
                    {title || data?.name || 'Kategori'}
                </h2>
                <Link
                    href={`/category/${data?.slug || 'nasional'}`}
                    className="text-accent text-sm font-medium hover:underline"
                >
                    Lihat Semua →
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.slice(0, 3).map((article) => (
                    <article key={article.id} className="group">
                        <div className="relative mb-4 overflow-hidden">
                            <img
                                src={
                                    article.featured_image?.url ||
                                    article.thumbnail?.url ||
                                    ''
                                }
                                srcSet={
                                    article.featured_image?.srcset || undefined
                                }
                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                alt={article.title}
                                width={640}
                                height={360}
                                loading="lazy"
                                decoding="async"
                                className="bg-card h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                        <Link href={`/news/${article.slug}`}>
                            <h3 className="group-hover:text-accent mb-2 line-clamp-2 text-lg leading-tight font-semibold transition-colors">
                                {article.title}
                            </h3>
                        </Link>
                        <div className="text-ink-subtle text-xs">
                            {formatDate(
                                article.published_at || article.created_at,
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
