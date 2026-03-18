

type Intensity = 'light' | 'medium' | 'heavy';

interface BloodFrameProps {
    src: string;
    alt: string;
    intensity?: Intensity;
    className?: string;
}

export default function BloodFrame({ src, alt, intensity = 'medium', className = '' }: BloodFrameProps) {
    // Map intensity to opacity/quantity values
    const config = {
        light: { opacity: 0.2, dots: 2, drips: 1 },
        medium: { opacity: 0.4, dots: 3, drips: 2 },
        heavy: { opacity: 0.7, dots: 6, drips: 4 },
    }[intensity];

    return (
        <div className={`relative overflow-hidden group bg-black rounded-lg select-none ${className}`} style={{ contain: 'paint' }}>
            {/* The Base Image */}
            <img
                src={src}
                alt={alt}
                draggable="false"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.7)' }}
            />

            {/* Dark Vignette to focus center */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

            {/* ── BLOOD FRAME OVERLAYS ────────────────────────────────── */}

            {/* 1. Edge Splatters (Simplified for performance) */}
            <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 10% 10%, rgba(127,29,29,${config.opacity}) 0%, transparent 25%),
                        radial-gradient(circle at 90% 5%, rgba(153,27,27,${config.opacity}) 0%, transparent 20%),
                        radial-gradient(circle at 5% 90%, rgba(185,28,28,${config.opacity}) 0%, transparent 28%),
                        radial-gradient(circle at 95% 95%, rgba(127,29,29,${config.opacity}) 0%, transparent 24%),
                        radial-gradient(circle at 50% 100%, rgba(185,28,28,${config.opacity}) 0%, transparent 30%),
                        radial-gradient(circle at 0% 50%, rgba(153,27,27,${config.opacity}) 0%, transparent 25%)
                    `,
                }}
            />

            {/* 2. Dripping Streaks from Top (HOVER ONLY) */}
            <div className="absolute top-0 left-0 right-0 h-full pointer-events-none z-20 overflow-hidden flex justify-around px-8 opacity-0 group-hover:opacity-50 transition-opacity duration-500">
                {[...Array(config.drips)].map((_, i) => (
                    <div
                        key={i}
                        className="w-[1.2px] bg-gradient-to-b from-red-900 via-red-700 to-transparent rounded-full group-hover:animate-drip"
                        style={{
                            height: `${20 + Math.random() * 40}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${3 + Math.random() * 3}s`,
                            marginLeft: `${Math.random() * 20}px`,
                            willChange: 'transform'
                        }}
                    />
                ))}
            </div>

            {/* 3. Detailed Corner Dots (SVG - Sharp for performance) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-30 z-30 transition-opacity duration-1000" preserveAspectRatio="none">
                <g>
                    {[...Array(config.dots)].map((_, i) => (
                        <circle
                            key={i}
                            cx={`${Math.random() < 0.5 ? Math.random() * 15 : 85 + Math.random() * 15}%`}
                            cy={`${Math.random() < 0.5 ? Math.random() * 15 : 85 + Math.random() * 15}%`}
                            r={1 + Math.random() * 2}
                            fill={i % 2 === 0 ? '#7f1d1d' : '#b91c1c'}
                        />
                    ))}
                </g>
            </svg>

            {/* Hover Intensity Enhancement Overlay */}
            <div className="absolute inset-0 bg-red-950/0 group-hover:bg-red-950/15 transition-colors duration-700 pointer-events-none" />

            <style>{`
                @keyframes drip {
                    0% { transform: translateY(-100%); opacity: 0; }
                    20% { opacity: 0.8; }
                    100% { transform: translateY(300%); opacity: 0; }
                }
                .group-hover\\:animate-drip {
                    animation: drip 4s infinite cubic-bezier(0.4, 0, 0.6, 1);
                }
            `}</style>
        </div>
    );
}
