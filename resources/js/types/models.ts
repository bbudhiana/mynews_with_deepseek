export interface Media {
    id: number;
    path: string | null;
    file_name?: string | null;
    mime_type?: string | null;
    size?: number | null;
    url: string | null;
    srcset: string | null;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    meta_description?: string | null;
    parent_id?: number | null;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface Author {
    id: number;
    name: string;
    slug: string;
    email?: string;
    bio?: string | null;
    job_title?: string | null;
    profile_photo_path?: string | null;
}

export interface ArticleListItem {
    id: number;
    title: string;
    slug: string;
    sub_title?: string | null;
    excerpt?: string | null;
    published_at: string | null;
    created_at?: string;
    category?: Pick<Category, 'id' | 'name' | 'slug'> | null;
    author?: Pick<Author, 'id' | 'name' | 'slug' | 'profile_photo_path'> | null;
    featured_image?: Media | null;
    thumbnail?: Media | null;
    tags?: Tag[];
    breaking_news_flag?: boolean;
    editor_pick_flag?: boolean;
}

export type ArticleAuthor = Author;

export interface Article extends ArticleListItem {
    body: string | null;
    body_first?: string;
    body_second?: string;
    body_word_count?: number;
    author_url?: string | null;
    image_caption?: string | null;
    image_credit?: string | null;
    status?: string;
    author?: Author | null;
}

export interface Paginated<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    meta?: {
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    current_page?: number;
    last_page?: number;
    total?: number;
}

export type { Author as User };
