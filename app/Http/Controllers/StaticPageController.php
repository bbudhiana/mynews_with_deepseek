<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class StaticPageController extends Controller
{
    /**
     * Editorial pages served from in-code config.
     * Edit the $pages array below to update content — no migration needed.
     *
     * @var array<string, array<string, mixed>>
     */
    private array $pages = [
        'pedoman-media' => [
            'slug' => 'pedoman-media',
            'title' => 'Pedoman Media Siber',
            'kicker' => 'STANDAR REDAKSI',
            'updated_at' => '2026-09-01',
            'intro' => 'Pedoman ini merujuk pada Undang-Undang Pers No. 40 Tahun 1999 dan Kode Etik Jurnalistik, diperkuat oleh Pedoman Pemberitaan Media Siber yang dikeluarkan Dewan Pers.',
            'sections' => [
                [
                    'heading' => 'Akurasi & Verifikasi',
                    'body' => [
                        'Setiap karya jurnalistik wajib memuat informasi yang akurat, benar, dan dapat diverifikasi. Wartawan MyNews wajib menyertakan sumber primer untuk setiap klaim faktual.',
                        'Kutipan langsung menggunakan tanda kutip ganda; kutipan tidak langsung ditulis ulang tanpa mengubah makna. Sumber anonim hanya digunakan untuk melindungi identitas dengan persetujuan redaksi.',
                    ],
                ],
                [
                    'heading' => 'Koreksi & Ralat',
                    'body' => [
                        'MyNews menerima dan menindaklanjuti koreksi pembaca melalui kanal redaksi@mynews.id. Koreksi dimuat dalam 24 jam dengan label CATATAN REDAKSI pada posisi setara dengan artikel asli.',
                        'Setiap artikel yang dikoreksi tetap memuat versi lama yang ditandai dengan footer "Telah dikoreksi pada [tanggal]" untuk transparansi.',
                    ],
                ],
                [
                    'heading' => 'Pemisahan Berita & Opini',
                    'body' => [
                        'Berita ditulis dengan nada netral dan struktur piramida terbalik. Opini, esai, dan kolom dimuat di rubrik terpisah dengan label OPINI atau ESAI yang jelas terlihat.',
                    ],
                ],
                [
                    'heading' => 'Pemberitaan Anak',
                    'body' => [
                        'MyNews tidak menyebutkan identitas, alamat, sekolah, atau foto yang dapat mengenali anak berusia di bawah 16 tahun kecuali untuk kepentingan publik yang mendesak dan dengan persetujuan wali.',
                    ],
                ],
            ],
        ],

        'tentang-kami' => [
            'slug' => 'tentang-kami',
            'title' => 'Tentang MyNews',
            'kicker' => 'PROFIL PERUSAHAAN',
            'updated_at' => '2026-09-01',
            'intro' => 'MyNews adalah portal berita independen yang berkomitmen pada jurnalisme berkualitas, cepat, dan dapat dipercaya untuk pembaca Indonesia.',
            'sections' => [
                [
                    'heading' => 'Visi',
                    'body' => [
                        'Menjadi rujukan utama berita Indonesia yang menggerakkan pemikiran kritis dan literasi publik.',
                    ],
                ],
                [
                    'heading' => 'Misi',
                    'body' => [
                        'Menghadirkan peliputan yang akurat, mendalam, dan independen di era digital.',
                        'Memperkuat jurnalisme lokal dengan jaringan reporter di seluruh Indonesia.',
                        'Mendorong transparansi melalui koreksi terbuka dan keterbukaan sumber.',
                    ],
                ],
                [
                    'heading' => 'Sejarah Singkat',
                    'body' => [
                        'MyNews berdiri pada 2024 sebagai platform digital murni yang memadukan kecepatan distribusi dengan kedalaman peliputan. Dalam dua tahun pertama, MyNews melayani lebih dari 8 juta pembaca unik per bulan.',
                    ],
                ],
                [
                    'heading' => 'Kantor Redaksi',
                    'body' => [
                        'Alamat: Gedung Pers Nasional, Jl. Kebon Sirih No. 32-34, Jakarta Pusat 10110.',
                        'Email: redaksi@mynews.id | Telp: +62 21 555 1234',
                    ],
                ],
            ],
        ],

        'susunan-redaksi' => [
            'slug' => 'susunan-redaksi',
            'title' => 'Susunan Redaksi',
            'kicker' => 'TIM REDAKSI',
            'updated_at' => '2026-09-01',
            'intro' => 'Tim redaksi MyNews terdiri dari jurnalis profesional dengan pengalaman total lebih dari 50 tahun di media nasional dan internasional.',
            'sections' => [
                [
                    'heading' => 'Pemimpin Redaksi',
                    'body' => ['—'],
                ],
                [
                    'heading' => 'Redaktur',
                    'body' => [
                        'Redaktur Senior: [Nama]',
                        'Redaktur Desk Nasional: [Nama]',
                        'Redaktur Desk Ekonomi: [Nama]',
                        'Redaktur Desk Teknologi: [Nama]',
                        'Redaktur Desk Olahraga: [Nama]',
                    ],
                ],
                [
                    'heading' => 'Reporter',
                    'body' => [
                        'Jakarta: [Nama], [Nama], [Nama]',
                        'Bandung: [Nama]',
                        'Surabaya: [Nama]',
                        'Medan: [Nama]',
                        'Makassar: [Nama]',
                    ],
                ],
                [
                    'heading' => 'Tim Produksi',
                    'body' => [
                        'Editor Foto: [Nama]',
                        'Desainer Grafis: [Nama]',
                        'Video Journalist: [Nama]',
                        'Staf IT: [Nama]',
                    ],
                ],
            ],
        ],

        'karir' => [
            'slug' => 'karir',
            'title' => 'Karir di MyNews',
            'kicker' => 'BERGABUNG DENGAN KAMI',
            'updated_at' => '2026-09-01',
            'intro' => 'MyNews membuka kesempatan bagi jurnalis, editor, dan profesional media yang ingin tumbuh bersama redaksi yang berpandangan nasional.',
            'sections' => [
                [
                    'heading' => 'Mengapa MyNews',
                    'body' => [
                        'Standar editorial tinggi dengan perlindungan hukum pers.',
                        'Jaringan peliputan di 10 kota Indonesia.',
                        'Program pengembangan jurnalis melalui workshop rutin dan mentorship.',
                        'Kompetitif salary + tunjangan liputan.',
                    ],
                ],
                [
                    'heading' => 'Posisi yang Tersedia',
                    'body' => [
                        'Reporter Nasional — penempatan Jakarta. Pengalaman minimal 2 tahun.',
                        'Reporter Teknologi — penempatan Jakarta atau remote. Familiar dengan lanskap startup & AI.',
                        'Editor Foto — penempatan Jakarta. Portofolio jurnalistik dibutuhkan.',
                        'Video Journalist — penempatan Jakarta. Mahir Adobe Premiere atau DaVinci Resolve.',
                        'Product Manager (Digital) — penempatan Jakarta. Pengalaman media digital minimal 3 tahun.',
                    ],
                ],
                [
                    'heading' => 'Cara Melamar',
                    'body' => [
                        'Kirim CV, portofolio, dan surat motivasi ke karir@mynews.id dengan subjek "[Posisi] – [Nama Anda]".',
                        'Batas waktu: posisi ditutup ketika kandidat terpilih ditemukan. Seleksi berlangsung dalam 3-4 minggu.',
                    ],
                ],
                [
                    'heading' => 'Program Magang',
                    'body' => [
                        'MyNews menerima mahasiswa jurnalistik untuk magang 3-6 bulan. Kuota terbatas per semester. Hubungi magang@mynews.id untuk informasi lebih lanjut.',
                    ],
                ],
            ],
        ],
    ];

    public function show(string $page): Response
    {
        abort_unless(isset($this->pages[$page]), 404);

        return Inertia::render('StaticPage', [
            'page' => $this->pages[$page],
            'navCategories' => Category::root()->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }
}
