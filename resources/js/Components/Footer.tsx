import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="border-t border-[#1E293B] bg-[#070C16] text-[#94A3B8] py-12">
            <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                        My<span className="text-[#D71920]">News</span>
                    </Link>
                    <p className="mt-4 text-sm leading-relaxed">
                        Pusat distribusi berita terpercaya, cepat, dan independen berstandar editorial global.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider">Kategori</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/category/nasional" className="hover:text-white">Nasional</Link></li>
                        <li><Link href="/category/internasional" className="hover:text-white">Internasional</Link></li>
                        <li><Link href="/category/politik" className="hover:text-white">Politik</Link></li>
                        <li><Link href="/category/ekonomi" className="hover:text-white">Ekonomi</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider">Redaksi</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Pedoman Media Siber</a></li>
                        <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
                        <li><a href="#" className="hover:text-white">Susunan Redaksi</a></li>
                        <li><a href="#" className="hover:text-white">Karir</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider">Kontak</h4>
                    <p className="text-sm">Email: redaksi@mynews.id</p>
                    <p className="text-sm mt-1">Telp: +62 21 555 1234</p>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 mt-8 pt-8 border-t border-[#1E293B] text-xs text-center text-[#64748B]">
                &copy; {new Date().getFullYear()} MyNews Portal. Hak cipta dilindungi undang-undang.
            </div>
        </footer>
    );
}
