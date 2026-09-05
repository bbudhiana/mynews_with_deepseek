import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="border-hairline text-ink-meta border-t bg-[#070C16] py-12">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4">
                <div>
                    <Link
                        href="/"
                        className="text-ink text-2xl font-bold tracking-tighter"
                    >
                        My<span className="text-accent">News</span>
                    </Link>
                    <p className="mt-4 text-sm leading-relaxed">
                        Pusat distribusi berita terpercaya, cepat, dan
                        independen berstandar editorial global.
                    </p>
                </div>
                <div>
                    <h4 className="text-ink mb-4 text-xs font-semibold tracking-wider uppercase">
                        Kategori
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link
                                href="/category/nasional"
                                className="hover:text-ink"
                            >
                                Nasional
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/category/internasional"
                                className="hover:text-ink"
                            >
                                Internasional
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/category/politik"
                                className="hover:text-ink"
                            >
                                Politik
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/category/ekonomi"
                                className="hover:text-ink"
                            >
                                Ekonomi
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-ink mb-4 text-xs font-semibold tracking-wider uppercase">
                        Redaksi
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/pedoman-media" className="hover:text-ink">
                                Pedoman Media Siber
                            </a>
                        </li>
                        <li>
                            <a href="/tentang-kami" className="hover:text-ink">
                                Tentang Kami
                            </a>
                        </li>
                        <li>
                            <a
                                href="/susunan-redaksi"
                                className="hover:text-ink"
                            >
                                Susunan Redaksi
                            </a>
                        </li>
                        <li>
                            <a href="/karir" className="hover:text-ink">
                                Karir
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-ink mb-4 text-xs font-semibold tracking-wider uppercase">
                        Kontak
                    </h4>
                    <p className="text-sm">Email: redaksi@mynews.id</p>
                    <p className="mt-1 text-sm">Telp: +62 21 555 1234</p>
                </div>
            </div>
            <div className="border-hairline text-ink-subtle mx-auto mt-8 max-w-7xl border-t px-4 pt-8 text-center text-xs">
                &copy; {new Date().getFullYear()} MyNews Portal. Hak cipta
                dilindungi undang-undang.
            </div>
        </footer>
    );
}
