import { Link } from '@inertiajs/react';
import { formatDate } from '@/lib/date';

interface ArticleItem {
    id: number;
    title: string;
    category: any;
    author: any;
    slug: string;
    published_at: string;
    created_at: string;
    featured_image: any;
    thumbnail: any;
    excerpt: string;
}

interface Props {
    items?: ArticleItem[];
}

export default function EditorsChoice({ items = [] }: Props) {
    const curatedList: ArticleItem[] = items.length > 0 ? items : [
        {
            id: 101,
            title: "Investigasi: Menguak Jejak Transisi Energi Hijau di Pelosok Nusantara",
            category: { name: "INVESTIGASI" },
            author: { name: "Budi Santoso" },
            slug: "investigasi-transisi-energi-hijau",
            published_at: "2026-09-04T10:00:00Z",
            created_at: "2026-09-04T10:00:00Z",
            featured_image: null,
            thumbnail: null,
            excerpt: "Investigasi mendalam...",
        },
        {
            id: 102,
            title: "Masa Depan AI Generatif: Apakah Ancaman Nyata Bagi Talenta Kreatif Lokal?",
            category: { name: "TEKNOLOGI" },
            author: { name: "Siti Rahma" },
            slug: "masa-depan-ai-generatif-lokal",
            published_at: "2026-09-04T08:00:00Z",
            created_at: "2026-09-04T08:00:00Z",
            featured_image: null,
            thumbnail: null,
            excerpt: "AI generatif...",
        },
        {
            id: 103,
            title: "Refleksi Kebijakan Moneter Global dan Dampaknya ke Rupiah Pekan Ini",
            category: { name: "EKONOMI" },
            author: { name: "Hendrawan" },
            slug: "refleksi-kebijakan-moneter-rupiah",
            published_at: "2026-09-04T06:00:00Z",
            created_at: "2026-09-04T06:00:00Z",
            featured_image: null,
            thumbnail: null,
            excerpt: "Kebijakan moneter...",
        }
    ];

    return (
        <section className="bg-[#0F172A] border border-[#1E293B] p-6 mb-12">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 mb-6">
                <div className="flex items-center gap-3">
                    <span className="bg-[#D71920] text-white text-[10px] font-black px-2 py-0.5 tracking-wider uppercase">
                        KURASI
                    </span>
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        PILIHAN EDITOR
                    </h2>
                </div>
                <span className="text-xs text-[#94A3B8]">Edisi Khusus Redaksi</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {curatedList.map((item) => (
                    <article key={item.id} className="group flex flex-col justify-between">
                        <div>
                            <div className="relative overflow-hidden mb-3">
                                <img
                                    src={item.featured_image?.url || item.thumbnail?.url || ''}
                                    alt={item.title}
                                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300 bg-[#131E31]"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                                <span className="absolute top-2 left-2 bg-[#0B1220]/80 backdrop-blur-sm text-[#D71920] text-[10px] font-bold px-2 py-1 uppercase">
                                    {item.category?.name || 'BERITA'}
                                </span>
                            </div>
                            <Link href={`/news/${item.slug}`}>
                                <h3 className="text-base font-semibold leading-snug text-white group-hover:text-[#D71920] transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                            </Link>
                            <p className="text-xs text-[#94A3B8] line-clamp-2 mt-2">{item.excerpt}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[#64748B] mt-4 pt-3 border-t border-[#1E293B]">
                            <span>Oleh {item.author?.name || 'Redaksi'}</span>
                            <span>{formatDate(item.published_at || item.created_at)}</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
