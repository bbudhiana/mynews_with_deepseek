import { formatDate, formatDateShort } from '@/lib/date';

interface Props {
    date?: string | null;
    fallback?: string;
    format?: 'long' | 'short';
}

export default function DateTime({ date, fallback, format = 'long' }: Props) {
    if (!date) {
        return <>{fallback ?? ''}</>;
    }
    const iso = (() => {
        const d = new Date(date);
        return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
    })();
    const text = format === 'short' ? formatDateShort(date) : formatDate(date);

    return (
        <time dateTime={iso} className="whitespace-nowrap">
            {text}
        </time>
    );
}
