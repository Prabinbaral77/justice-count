

interface ProtestBannerProps {
    text: string;
    size?: 'sm' | 'lg';
    className?: string;
    intensity?: 'light' | 'dark';
}

export default function ProtestBanner({
    text,
    size = 'lg',
    className = '',
    intensity = 'light'
}: ProtestBannerProps) {
    const isLarge = size === 'lg';

    // Irregular "Hand-Painted" edge using a complex polygon
    // This simulates a rough, organic brush stroke better than a simple skew
    const clipPath = "polygon(1% 12%, 3% 5%, 8% 8%, 15% 2%, 25% 6%, 40% 1%, 55% 5%, 75% 0%, 88% 7%, 97% 3%, 99% 15%, 98% 40%, 100% 65%, 98% 88%, 95% 95%, 82% 92%, 65% 98%, 45% 94%, 30% 99%, 15% 95%, 5% 98%, 1% 85%, 2% 55%, 0% 30%)";

    return (
        <div
            className={`relative inline-block ${className} group/banner select-none`}
            style={{
                transform: `rotate(${isLarge ? -0.8 : 0.6}deg)`,
                filter: 'drop-shadow(0 10px 15px rgba(127, 29, 29, 0.4))'
            }}
        >
            {/* 1. Underlying Deep Shadow Layer (Paint Thickness) */}
            <div
                className="absolute inset-0 bg-red-950/40 translate-x-1 translate-y-1 blur-[1px]"
                style={{ clipPath }}
            />

            {/* 2. The Main Brush Stroke Layer */}
            <div
                className={`
                    relative ${isLarge ? 'px-8 py-3.5' : 'px-5 py-2'} 
                    text-white font-black tracking-wider text-center
                    transition-all duration-500 ease-out
                    group-hover/banner:scale-[1.03] group-hover/banner:rotate-0
                `}
                style={{
                    background: intensity === 'light'
                        ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)'
                        : 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
                    clipPath,
                    fontFamily: '"Noto Serif Devanagari", serif',
                    fontSize: isLarge ? 'clamp(1.1rem, 2.5vw, 1.7rem)' : '1rem',
                }}
            >
                {/* 3. Paint Texture Overlay (Subtle) */}
                <div
                    className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3F%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                />

                {/* 4. Horizontal "Dry Brush" Highlight */}
                <div className="absolute top-2 left-[10%] right-[10%] h-[1px] bg-white/20 blur-[0.5px]" />

                {/* The Text Content */}
                <span className="relative z-10 block drop-shadow-sm">
                    {text}
                </span>
            </div>

            {/* 5. Splatter Accents for Realism */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full blur-[2px] opacity-30 animate-pulse" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-red-900 rounded-full blur-[3px] opacity-20" />
        </div>
    );
}
