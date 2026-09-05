/**
 * Format a date string / timestamp as "5 September 2026".
 * Uses Indonesian locale for month names.
 */
export function formatDate(date: string | Date | null | undefined): string {
    const d = date ? new Date(date) : new Date();
    return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

/**
 * Format a date as "5 Sep 2026" (short month, no weekday).
 */
export function formatDateShort(date: string | Date | null | undefined): string {
    const d = date ? new Date(date) : new Date();
    return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}
