export * from './seo';
export * from './models';

export interface Auth {
    user: {
        id: number;
        name: string;
        email: string;
        profile_photo_path?: string | null;
    } | null;
}

export interface SharedProps {
    name?: string;
    appUrl?: string;
    navCategories?: { id: number; name: string; slug: string }[];
    auth?: Auth;
    [key: string]: unknown;
}
