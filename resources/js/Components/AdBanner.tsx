interface AdBannerProps {
    position: 'top-leaderboard' | 'sidebar' | 'in-article' | 'bottom-leaderboard';
    className?: string;
}

export default function AdBanner({ position, className = '' }: AdBannerProps) {
    const config = {
        'top-leaderboard': {
            size: 'w-full max-w-[728px] h-[90px]',
            label: 'LEADERBOARD BANNER (728x90)',
        },
        'sidebar': {
            size: 'w-[300px] h-[250px] mx-auto',
            label: 'MEDIUM RECTANGLE (300x250)',
        },
        'in-article': {
            size: 'w-full max-w-[336px] h-[280px] mx-auto',
            label: 'IN-ARTICLE BANNER (336x280)',
        },
        'bottom-leaderboard': {
            size: 'w-full max-w-[970px] h-[90px]',
            label: 'BOTTOM LEADERBOARD (970x90)',
        },
    }[position];

    return (
        <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
            <span className="text-[10px] tracking-widest text-[#64748B] uppercase mb-1">
                ADVERTISEMENT
            </span>
            <div className={`${config.size} bg-[#131E31] border border-dashed border-[#334155] flex flex-col items-center justify-center p-4 text-center`}>
                <span className="text-xs font-bold text-[#94A3B8]">{config.label}</span>
                <span className="text-[10px] text-[#475569] mt-1">Sponsor Area</span>
            </div>
        </div>
    );
}
