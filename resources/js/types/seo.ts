export interface Seo {
    title: string;
    description: string;
    url: string;
    image: string | null;
    type: 'website' | 'article' | 'profile';
    publishedTime?: string | null;
    modifiedTime?: string | null;
    authorName?: string | null;
    section?: string | null;
    tags?: string[] | null;
    siteName?: string | null;
    noindex: boolean;
    publisherLogo?: string | null;
    publisherUrl?: string | null;
    sameAs?: string[] | null;
    searchUrl?: string | null;
}

export type JsonLd = Record<string, unknown>;
