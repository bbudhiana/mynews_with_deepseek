import { Link } from '@inertiajs/react';

interface BreakingProps {
    items?: { id: number; title: string; slug: string }[];
}

export default function BreakingNews({ items = [] }: BreakingProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="bg-accent text-ink flex items-center overflow-hidden px-4 py-2 text-sm">
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
        </div>
    );
}
