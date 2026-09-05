import { Link, usePage } from '@inertiajs/react';

interface NavCategory {
    id: number;
    name: string;
    slug: string;
}

export default function Footer() {
    const { props } = usePage<{ navCategories?: NavCategory[] }>();
    const categories = props.navCategories ?? [];

    return (
        <footer className="border-hairline text-ink-meta border-t bg-[#070C16] py-12">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4">
                <div>
                    <Link
                        href="/"
                        className="text-ink text-2xl font-bold tracking-tighter"
                    >
                        <span className="text-accent">News</span> AI
                    </Link>
                    <p className="mt-4 text-sm leading-relaxed">
                        Pusat distribusi berita terpercaya, cepat, dan
                        independen berstandar editorial global. (<span className="text-amber-400">Dislaimer</span>: Ini adalah portal berita AI untuk tujuan riset & demonstrasi.)
                    </p>
                </div>
                <div>
                    <h4 className="text-ink mb-4 text-xs font-semibold tracking-wider uppercase">
                        Kategori
                    </h4>
                    <ul className="space-y-2 text-sm">
                        {categories.length > 0
                            ? categories.map((cat) => (
                                  <li key={cat.id}>
                                      <Link
                                          href={`/category/${cat.slug}`}
                                          className="hover:text-ink transition-colors"
                                      >
                                          {cat.name}
                                      </Link>
                                  </li>
                              ))
                            : [
                                  ['nasional', 'Nasional'],
                                  ['internasional', 'Internasional'],
                                  ['politik', 'Politik'],
                                  ['ekonomi', 'Ekonomi'],
                              ].map(([slug, label]) => (
                                  <li key={slug}>
                                      <Link
                                          href={`/category/${slug}`}
                                          className="hover:text-ink transition-colors"
                                      >
                                          {label}
                                      </Link>
                                  </li>
                              ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-ink mb-4 text-xs font-semibold tracking-wider uppercase">
                        Redaksi
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link
                                href="/pedoman-media"
                                className="hover:text-ink transition-colors"
                            >
                                Pedoman Media Siber
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/tentang-kami"
                                className="hover:text-ink transition-colors"
                            >
                                Tentang Kami
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/susunan-redaksi"
                                className="hover:text-ink transition-colors"
                            >
                                Susunan Redaksi
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/karir"
                                className="hover:text-ink transition-colors"
                            >
                                Karir
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-ink mb-4 text-xs font-semibold tracking-wider uppercase">
                        Kontak
                    </h4>
                    <p className="text-sm">Email: redaksi@newsai.my.id</p>
                    <p className="mt-1 text-sm">Telp: +62 21 555 xxxx</p>
                    <p className="mt-1 text-sm">
                        Alamat: Jl. Kebon Sirih No. xx, Jakarta Pusat
                    </p>
                </div>
            </div>
            <div className="border-hairline text-ink-subtle mx-auto mt-8 max-w-7xl border-t px-4 pt-8 text-center text-xs">
                &copy; {new Date().getFullYear()} NewsAI Portal. Hak cipta
                dilindungi undang-undang.
            </div>
        </footer>
    );
}
