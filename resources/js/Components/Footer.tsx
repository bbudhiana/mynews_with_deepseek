import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="border-t border-hairline bg-[#070C16] text-ink-meta py-12">
            <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-ink">
                        My<span className="text-accent">News</span>
                    </Link>
                    <p className="mt-4 text-sm leading-relaxed">
                        Pusat distribusi berita terpercaya, cepat, dan independen berstandar editorial global.
                    </p>
                </div>
                <div>
                    <h4 className="text-ink font-semibold mb-4 uppercase text-xs tracking-wider">Kategori</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/category/nasional" className="hover:text-ink">Nasional</Link></li>
                        <li><Link href="/category/internasional" className="hover:text-ink">Internasional</Link></li>
                        <li><Link href="/category/politik" className="hover:text-ink">Politik</Link></li>
                        <li><Link href="/category/ekonomi" className="hover:text-ink">Ekonomi</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-ink font-semibold mb-4 uppercase text-xs tracking-wider">Redaksi</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/pedoman-media" className="hover:text-ink">Pedoman Media Siber</a></li>
                        <li><a href="/tentang-kami" className="hover:text-ink">Tentang Kami</a></li>
                        <li><a href="/susunan-redaksi" className="hover:text-ink">Susunan Redaksi</a></li>
                        <li><a href="/karir" className="hover:text-ink">Karir</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-ink font-semibold mb-4 uppercase text-xs tracking-wider">Kontak</h4>
                    <p className="text-sm">Email: redaksi@mynews.id</p>
                    <p className="text-sm mt-1">Telp: +62 21 555 1234</p>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 mt-8 pt-8 border-t border-hairline text-xs text-center text-ink-subtle">
                &copy; {new Date().getFullYear()} MyNews Portal. Hak cipta dilindungi undang-undang.
            </div>
        </footer>
    );
}
