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
export function formatDateShort(
    date: string | Date | null | undefined,
): string {
    const d = date ? new Date(date) : new Date();
    return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

/**
 * Wrap formatted date string with a <time> element carrying the machine-readable
 * dateTime attribute for Schema.org completeness.
 */
export function formatDateTime(
    date: string | Date | null | undefined,
    formatter: (d: string | Date | null | undefined) => string = formatDate,
): { iso: string; html: string } {
    const d = date ? new Date(date) : new Date();
    const iso = Number.isNaN(d.getTime())
        ? new Date().toISOString()
        : d.toISOString();
    return { iso, html: formatter(date) };
}
