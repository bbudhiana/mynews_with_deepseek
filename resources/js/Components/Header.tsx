import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface NavCategory {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    categories?: NavCategory[];
}

export default function Header({ categories = [] }: Props) {
    const displayCategories = categories.length > 0 ? categories : [];
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.visit(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-[#1E293B] bg-[#0B1220]/95 backdrop-blur-lg text-white">
            <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                            My<span className="text-[#D71920]">News</span>
                        </Link>
                        {displayCategories.length > 0 && (
                            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                                {displayCategories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/category/${cat.slug}`}
                                        className="hover:text-[#D71920] transition-colors"
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </nav>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <form onSubmit={handleSearch} className="relative hidden sm:block">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari berita..."
                                className="w-64 bg-[#1E293B] border border-[#334155] rounded-none py-2 px-4 text-sm text-white focus:outline-none focus:border-[#D71920] transition-colors"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 h-full px-3 text-[#94A3B8] hover:text-[#D71920] transition-colors"
                                aria-label="Cari"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                            </button>
                        </form>
                        <Link
                            href="/login"
                            className="px-5 py-2 text-sm font-bold bg-[#D71920] text-white hover:bg-red-700 transition-colors"
                        >
                            MASUK
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
