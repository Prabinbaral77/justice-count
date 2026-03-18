

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
        light: { opacity: 0.3, dots: 3, drips: 2 },
        medium: { opacity: 0.6, dots: 6, drips: 4 },
        heavy: { opacity: 0.9, dots: 10, drips: 8 },
    }[intensity];

    return (
        <div className={`relative overflow-hidden group bg-black rounded-lg select-none ${className}`}>
            {/* The Base Image */}
            <img
                src={src}
                alt={alt}
                draggable="false"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.7)' }}
            />

            {/* Dark Vignette to focus center */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

            {/* ── BLOOD FRAME OVERLAYS ────────────────────────────────── */}

            {/* 1. Edge Splatters (Using CSS multiple backgrounds) */}
            <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity duration-500"
                style={{
                    opacity: config.opacity,
                    backgroundImage: `
                        radial-gradient(circle at 10% 10%, #7f1d1d 0%, transparent 15%),
                        radial-gradient(circle at 90% 5%, #991b1b 0%, transparent 12%),
                        radial-gradient(circle at 5% 90%, #b91c1c 0%, transparent 18%),
                        radial-gradient(circle at 95% 95%, #7f1d1d 0%, transparent 14%),
                        radial-gradient(circle at 50% 100%, #b91c1c 0%, transparent 20%),
                        radial-gradient(circle at 0% 50%, #991b1b 0%, transparent 15%)
                    `,
                    filter: 'blur(2px)'
                }}
            />

            {/* 2. Dripping Streaks from Top */}
            <div className="absolute top-0 left-0 right-0 h-full pointer-events-none z-20 overflow-hidden flex justify-around px-8 opacity-40 group-hover:opacity-60 transition-opacity">
                {[...Array(config.drips)].map((_, i) => (
                    <div
                        key={i}
                        className="w-[1.5px] bg-gradient-to-b from-red-900 via-red-700 to-transparent rounded-full animate-drip"
                        style={{
                            height: `${20 + Math.random() * 40}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${4 + Math.random() * 4}s`,
                            marginLeft: `${Math.random() * 20}px`
                        }}
                    />
                ))}
            </div>

            {/* 3. Detailed Corner Dots (SVG for sharpness/randomness) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-30" preserveAspectRatio="none">
                <defs>
                    <filter id="blood-blur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
                    </filter>
                </defs>
                <g filter="url(#blood-blur)">
                    {[...Array(config.dots)].map((_, i) => (
                        <circle
                            key={i}
                            cx={`${Math.random() < 0.5 ? Math.random() * 15 : 85 + Math.random() * 15}%`}
                            cy={`${Math.random() < 0.5 ? Math.random() * 15 : 85 + Math.random() * 15}%`}
                            r={1.5 + Math.random() * 4}
                            fill={i % 2 === 0 ? '#7f1d1d' : '#b91c1c'}
                            className="transition-all duration-1000"
                        />
                    ))}
                </g>
            </svg>

            {/* Hover Intensity Enhancement Overlay */}
            <div className="absolute inset-0 bg-red-950/0 group-hover:bg-red-950/10 transition-colors duration-700 pointer-events-none" />

            {/* Global styles for this component */}
            <style>{`
                @keyframes drip {
                    0% { transform: translateY(-100%); opacity: 0; }
                    20% { opacity: 0.8; }
                    100% { transform: translateY(300%); opacity: 0; }
                }
                .animate-drip {
                    animation-name: drip;
                    animation-iteration-count: infinite;
                    animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
                }
            `}</style>
        </div>
    );
}
