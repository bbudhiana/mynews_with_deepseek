import { Link, usePage } from '@inertiajs/react';
import type { SharedProps } from '@/types';

interface BreakingProps {
    items?: { id: number; title: string; slug: string }[];
}

export default function BreakingNews({ items = [] }: BreakingProps) {
    const { props } = usePage<SharedProps>();
    if (!items || items.length === 0) return null;

    const baseUrl = props.appUrl ?? '';
    const ld = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: items.map((item, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: item.title,
            url: `${baseUrl}/news/${item.slug}`,
        })),
    };

    return (
        <nav
            className="bg-accent text-ink flex items-center overflow-hidden px-4 py-2 text-sm"
            aria-label="Breaking news"
        >
            <span className="mr-4 flex-shrink-0 bg-black px-2 py-1 text-xs font-black tracking-wider uppercase">
                BREAKING NEWS
            </span>
            <div className="flex scrollbar-none gap-8 overflow-x-auto whitespace-nowrap">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        href={`/news/${item.slug}`}
                        className="flex items-center gap-2 hover:underline"
                    >
                        <span>•</span> {item.title}
                    </Link>
                ))}
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
            />
        </nav>
    );
}
