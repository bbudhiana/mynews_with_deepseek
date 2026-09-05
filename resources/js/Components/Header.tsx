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
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.visit(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/95 text-ink">
            <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-ink">
                            My<span className="text-accent">News</span>
                        </Link>
                        {categories.length > 0 && (
                            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/category/${cat.slug}`}
                                        className="hover:text-accent transition-colors"
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </nav>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari berita..."
                                aria-label="Cari berita"
                                className="w-48 md:w-64 bg-elevated border border-[#334155] py-2 px-4 text-sm text-ink focus:outline-none focus:border-accent transition-colors placeholder-ink-meta"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 h-full px-3 text-ink-meta hover:text-accent transition-colors"
                                aria-label="Kirim pencarian"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                            </button>
                        </form>
                        <Link
                            href="/login"
                            className="px-5 py-2 text-sm font-bold bg-accent text-ink hover:bg-red-700 transition-colors"
                        >
                            MASUK
                        </Link>
                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden w-11 h-11 flex items-center justify-center text-ink-meta hover:text-ink transition-colors"
                            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-nav"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile nav panel */}
                {mobileOpen && categories.length > 0 && (
                    <nav
                        id="mobile-nav"
                        className="md:hidden mt-4 pt-4 border-t border-hairline grid grid-cols-2 gap-2"
                        aria-label="Navigasi kategori"
                    >
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className="py-3 px-4 text-sm font-medium hover:text-accent transition-colors bg-card rounded-xl text-center"
                                onClick={() => setMobileOpen(false)}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
}
