

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

    // Simplified polygon for much better paint performance
    const clipPath = "polygon(2% 15%, 15% 5%, 85% 2%, 98% 12%, 97% 85%, 85% 95%, 15% 98%, 2% 88%)";

    return (
        <div
            className={`relative inline-block ${className} group/banner select-none transition-transform duration-300`}
            style={{
                transform: `rotate(${isLarge ? -0.8 : 0.6}deg)`,
                willChange: 'transform'
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
                {/* 3. Subtle Texture Highlights (Non-SVG replacement for performance) */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] pointer-events-none" />

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
