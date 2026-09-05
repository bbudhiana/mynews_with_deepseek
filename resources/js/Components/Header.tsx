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
        <header className="border-hairline bg-canvas/95 text-ink sticky top-0 z-50 border-b">
            <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-ink text-2xl font-bold tracking-tighter"
                        >
                            My<span className="text-accent">News</span>
                        </Link>
                        {categories.length > 0 && (
                            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
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
                                className="bg-elevated text-ink focus:border-accent placeholder-ink-meta w-48 border border-[#334155] px-4 py-2 text-sm transition-colors focus:outline-none md:w-64"
                            />
                            <button
                                type="submit"
                                className="text-ink-meta hover:text-accent absolute top-0 right-0 h-full px-3 transition-colors"
                                aria-label="Kirim pencarian"
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                            </button>
                        </form>
                        <Link
                            href="/login"
                            className="bg-accent text-ink px-5 py-2 text-sm font-bold transition-colors hover:bg-red-700"
                        >
                            MASUK
                        </Link>
                        {/* Mobile hamburger */}
                        <button
                            className="text-ink-meta hover:text-ink flex h-11 w-11 items-center justify-center transition-colors md:hidden"
                            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-nav"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? (
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile nav panel */}
                {mobileOpen && categories.length > 0 && (
                    <nav
                        id="mobile-nav"
                        className="border-hairline mt-4 grid grid-cols-2 gap-2 border-t pt-4 md:hidden"
                        aria-label="Navigasi kategori"
                    >
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className="hover:text-accent bg-card rounded-xl px-4 py-3 text-center text-sm font-medium transition-colors"
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
