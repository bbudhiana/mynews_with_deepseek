import { Link } from '@inertiajs/react';

interface BreakingProps {
    items?: { id: number; title: string; slug: string }[];
}

export default function BreakingNews({ items = [] }: BreakingProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="bg-[#D71920] text-white flex items-center px-4 py-2 text-sm overflow-hidden">
            <span className="font-black tracking-wider uppercase text-xs flex-shrink-0 bg-black px-2 py-1 mr-4">
                BREAKING NEWS
            </span>
            <div className="flex gap-8 whitespace-nowrap overflow-x-auto scrollbar-none">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        href={`/news/${item.slug}`}
                        className="hover:underline flex items-center gap-2"
                    >
                        <span>•</span> {item.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}
