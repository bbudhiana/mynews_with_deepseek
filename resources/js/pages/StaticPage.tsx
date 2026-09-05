import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import AdBanner from '@/Components/AdBanner';
import { formatDate } from '@/lib/date';

interface Section {
    heading: string;
    body: string[];
}

interface StaticPageData {
    slug: string;
    title: string;
    kicker: string;
    updated_at: string;
    intro: string;
    sections: Section[];
}

interface Props {
    page: StaticPageData;
    navCategories?: any[];
}

export default function StaticPage({ page, navCategories }: Props) {
    return (
        <>
            <Head title={`${page.title} - MyNews`} />
            <div className="bg-canvas text-ink min-h-screen">
                <Header categories={navCategories} />

                <div className="mx-auto max-w-7xl px-4">
                    <AdBanner position="top-leaderboard" />
                </div>

                <main className="mx-auto max-w-3xl px-4 py-12">
                    {/* Breadcrumb */}
                    <nav
                        className="mb-8 flex items-center gap-2 text-sm"
                        aria-label="Breadcrumb"
                    >
                        <a
                            href="/"
                            className="text-ink-meta hover:text-ink transition-colors"
                        >
                            Home
                        </a>
                        <span className="text-ink-faint" aria-hidden="true">
                            /
                        </span>
                        <span className="text-ink-meta">{page.title}</span>
                    </nav>

                    {/* Header */}
                    <header className="border-hairline mb-12 border-b pb-10">
                        <span className="text-accent text-xs font-black tracking-widest uppercase">
                            {page.kicker}
                        </span>
                        <h1 className="mt-3 mb-6 text-4xl leading-tight font-bold md:text-5xl">
                            {page.title}
                        </h1>
                        <p className="text-ink-muted text-lg leading-relaxed md:text-xl">
                            {page.intro}
                        </p>
                        <div className="text-ink-meta mt-6 text-xs">
                            Terakhir diperbarui: {formatDate(page.updated_at)}
                        </div>
                    </header>

                    {/* Sections */}
                    <article className="article-body">
                        {page.sections.map((section, idx) => (
                            <section key={idx} className="mb-10">
                                <h2 className="text-ink-strong mb-4 text-2xl font-bold">
                                    {section.heading}
                                </h2>
                                {section.body.map((paragraph, pIdx) => (
                                    <p
                                        key={pIdx}
                                        className="text-ink-muted mb-4 leading-relaxed"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </section>
                        ))}
                    </article>

                    {/* Contact */}
                    <aside className="border-hairline mt-16 border-t pt-8">
                        <p className="text-ink-meta text-sm">
                            Pertanyaan atau masukan? Hubungi{' '}
                            <a
                                href="mailto:redaksi@mynews.id"
                                className="text-accent hover:text-link-hover underline underline-offset-2"
                            >
                                redaksi@mynews.id
                            </a>
                        </p>
                    </aside>
                </main>

                <Footer />
            </div>
        </>
    );
}
