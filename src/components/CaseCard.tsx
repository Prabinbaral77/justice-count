import { useState, useEffect } from 'react';
import type { Case } from '../data/mockData';
import VoteBar from './VoteBar';
import CommentSection from './CommentSection';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

interface CaseCardProps {
    caseData: Case;
    featured?: boolean;
}

function useDays(startDate: string) {
    const [days, setDays] = useState(0);
    useEffect(() => {
        const calc = () => {
            const diff = Date.now() - new Date(startDate).getTime();
            setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
        };
        calc();
        const id = setInterval(calc, 1000 * 60 * 60);
        return () => clearInterval(id);
    }, [startDate]);
    return days;
}

// ─── Symbolic Visual Overlay ───────────────────────────────────────────────
function VisualAestheticsOverlay() {
    return (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {/* Dark desaturated tone reinforcement */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Subtle Red Overlay Gradient (Anger/Injustice) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-900/40 via-transparent to-transparent opacity-60" />

            {/* Spotlight Lighting (Centered on Face area) */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 50% 35%, transparent 10%, rgba(0,0,0,0.6) 70%)'
                }}
            />

            {/* Abstract Red Streaks (Pain/Injustice) */}
            <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                <line x1="10%" y1="-10%" x2="40%" y2="110%" stroke="currentColor" className="text-red-600" strokeWidth="0.5" transform="rotate(-5)" />
                <line x1="60%" y1="-20%" x2="80%" y2="120%" stroke="currentColor" className="text-red-700" strokeWidth="1" transform="rotate(10)" />
                <line x1="-5%" y1="40%" x2="105%" y2="60%" stroke="currentColor" className="text-red-800" strokeWidth="0.5" />
            </svg>

            {/* Symbolic Broken Justice Scale (Bottom Right) */}
            <div className="absolute bottom-6 right-6 opacity-15 text-white group-hover:opacity-25 transition-opacity duration-700">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    {/* The Scale Base (Cracked) */}
                    <path d="M12 3v17" />
                    <path d="M12 20h7" />
                    <path d="M12 20H5" />
                    {/* The Beam (Broken/Tilted) */}
                    <path d="M3 7l9-2 9 4" strokeDasharray="0.5 2" /> {/* Crack line */}
                    <path d="M3 7l9-2 9 4" />
                    {/* Left Plate (Low/Heavy) */}
                    <path d="M6 7v4" />
                    <path d="M3 11h6a3 3 0 0 1-6 0z" />
                    {/* Right Plate (High/Empty/Broken) */}
                    <path d="M18 9v2" />
                    <path d="M16 11h4" />
                    <circle cx="18" cy="14" r="1" /> {/* Falling piece */}
                </svg>
            </div>
        </div>
    );
}

// ─── Featured (wide hero) card ──────────────────────────────────────────────
function FeaturedCard({ caseData }: { caseData: Case }) {
    const [expanded, setExpanded] = useState(false);
    const days = useDays(caseData.startDate);

    return (
        <article
            className="group relative overflow-hidden rounded-2xl ring-1 ring-red-900/40 shadow-2xl shadow-red-950/40"
            style={{ background: '#0a0a0a' }}
        >
            {/* Priority badge */}
            {caseData.priority && (
                <div className="absolute top-4 left-4 z-30 flex items-center gap-1 bg-amber-500 text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                    <Star className="w-3 h-3 fill-black" /> Priority
                </div>
            )}

            {/* App watermark */}
            <div
                className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-white text-xs font-extrabold tracking-wide"
                style={{ background: 'rgba(180,0,0,0.85)', backdropFilter: 'blur(6px)' }}
            >
                <span className="text-base leading-none">⚖</span>
                <span>न्याय खै</span>
            </div>

            {/* Two-column on md+: image left, content right */}
            <div className="flex flex-col md:flex-row">
                {/* ── Image column ── */}
                <div className="relative md:w-5/12 h-80 md:h-auto md:min-h-[520px] shrink-0 overflow-hidden bg-black">
                    {caseData.imageUrl ? (
                        <img
                            src={caseData.imageUrl}
                            alt={caseData.victimName}
                            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110"
                            style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.8)' }}
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-7xl">⚖️</div>
                    )}

                    {/* Aesthetics Overlay */}
                    <VisualAestheticsOverlay />

                    {/* Fading Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0a0a0a]" />
                </div>

                {/* ── Content column ── */}
                <div className="flex-1 flex flex-col justify-between p-6 md:p-8 gap-6 z-20">
                    {/* Title banner */}
                    <div>
                        <div
                            className="inline-block px-5 py-2.5 mb-5 text-white font-extrabold tracking-wide rounded-lg shadow-lg shadow-red-900/20"
                            style={{ background: '#c0000e', fontFamily: '"Noto Serif Devanagari", serif', fontSize: 'clamp(1.1rem, 3vw, 1.6rem)' }}
                        >
                            {caseData.title}
                        </div>

                        {/* Day counter lines */}
                        <div className="space-y-2">
                            <p className="text-white/80 font-semibold" style={{ fontFamily: '"Noto Serif Devanagari", serif', fontSize: '1.05rem' }}>
                                {days.toLocaleString()} दिन मौन
                            </p>
                            <p className="text-white/65 font-medium" style={{ fontFamily: '"Noto Serif Devanagari", serif', fontSize: '0.95rem' }}>
                                अनुत्तरित प्रश्नहरूको {days.toLocaleString()} दिन
                            </p>
                            <p className="text-red-500 font-bold" style={{ fontFamily: '"Noto Serif Devanagari", serif', fontSize: '0.95rem' }}>
                                {caseData.victimName} को न्यायविहीन {days.toLocaleString()} दिन
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-red-800/50 to-transparent my-4" />

                        {/* Tagline */}
                        <p className="text-white/55 text-sm italic leading-relaxed" style={{ fontFamily: '"Noto Serif Devanagari", serif' }}>
                            "{caseData.tagline}"
                        </p>

                        {/* Description */}
                        <p className={`text-slate-400 text-sm leading-relaxed mt-3 ${!expanded ? 'line-clamp-3' : ''}`}>
                            {caseData.description}
                        </p>
                    </div>

                    {/* Expand toggle + panel */}
                    <div>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200
                                border-red-900/40 text-red-400 hover:bg-neutral-900 hover:border-red-700/60 hover:text-red-300 active:scale-95"
                        >
                            {expanded
                                ? <><ChevronUp className="w-4 h-4" /> Hide Details</>
                                : <><ChevronDown className="w-4 h-4" /> Show Votes &amp; Reactions</>
                            }
                        </button>

                        {expanded && (
                            <div className="space-y-5 pt-5 mt-4 border-t border-red-950/40" style={{ animation: 'fadeSlideIn 0.3s ease-out' }}>
                                <VoteBar caseId={caseData.id} votes={caseData.votes} />
                                <div className="h-px bg-white/5" />
                                <CommentSection caseId={caseData.id} comments={caseData.comments} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400;600;700;900&display=swap');
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </article>
    );
}

// ─── Regular (grid) card ─────────────────────────────────────────────────────
function RegularCard({ caseData }: { caseData: Case }) {
    const [expanded, setExpanded] = useState(false);
    const days = useDays(caseData.startDate);

    return (
        <article
            className="group relative overflow-hidden rounded-2xl ring-1 ring-white/5 shadow-xl shadow-black/40
                transition-all duration-500 hover:ring-red-800/30 hover:shadow-2xl hover:shadow-red-950/30 hover:-translate-y-1 cursor-pointer"
            style={{ background: '#0a0a0a' }}
        >
            {/* Priority badge */}
            {caseData.priority && (
                <div className="absolute top-4 left-4 z-30 flex items-center gap-1 bg-amber-500 text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                    <Star className="w-3 h-3 fill-black" /> Priority
                </div>
            )}

            {/* App watermark */}
            <div
                className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2 py-1 rounded-lg text-white text-[10px] font-extrabold tracking-wide"
                style={{ background: 'rgba(180,0,0,0.85)', backdropFilter: 'blur(6px)' }}
            >
                <span className="text-sm leading-none">⚖</span>
                <span>न्याय खै</span>
            </div>

            {/* Photo Section */}
            <div className="relative h-72 overflow-hidden bg-black">
                {caseData.imageUrl ? (
                    <img
                        src={caseData.imageUrl}
                        alt={caseData.victimName}
                        className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110"
                        style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.8)' }}
                    />
                ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-6xl">⚖️</div>
                )}

                {/* Visual Overlay */}
                <VisualAestheticsOverlay />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10" />

                {/* Red title banner at bottom of photo */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-3 text-center z-20" style={{ background: '#c0000edd' }}>
                    <h3
                        className="font-extrabold text-white text-lg leading-tight"
                        style={{ fontFamily: '"Noto Serif Devanagari", serif' }}
                    >
                        {caseData.title}
                    </h3>
                </div>
            </div>

            {/* Text section */}
            <div className="px-5 pt-4 pb-2" style={{ background: '#0d0d0d' }}>
                <div className="text-center space-y-1.5 mb-3">
                    <p className="text-white/80 font-semibold text-sm" style={{ fontFamily: '"Noto Serif Devanagari", serif' }}>
                        {days.toLocaleString()} दिन मौन
                    </p>
                    <p className="text-red-500 font-bold text-sm" style={{ fontFamily: '"Noto Serif Devanagari", serif' }}>
                        {caseData.victimName} को न्यायविहीन {days.toLocaleString()} दिन
                    </p>
                    <p className="text-white/45 text-xs italic" style={{ fontFamily: '"Noto Serif Devanagari", serif' }}>
                        "{caseData.tagline}"
                    </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-red-900/30 to-transparent mb-3" />

                <p className={`text-slate-400 text-xs leading-relaxed mb-3 ${!expanded ? 'line-clamp-2' : ''}`}>
                    {caseData.description}
                </p>
            </div>

            {/* Interactive */}
            <div className="px-5 pb-4" style={{ background: '#0d0d0d' }}>
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border text-xs font-semibold transition-all duration-200
                        border-red-900/40 text-red-400 hover:bg-neutral-900 hover:border-red-700/60 hover:text-red-300 active:scale-95"
                >
                    {expanded
                        ? <><ChevronUp className="w-3.5 h-3.5" /> Hide</>
                        : <><ChevronDown className="w-3.5 h-3.5" /> Votes &amp; Reactions</>
                    }
                </button>

                {expanded && (
                    <div className="space-y-4 pt-4 mt-3 border-t border-red-950/40" style={{ animation: 'fadeSlideIn 0.3s ease-out' }}>
                        <VoteBar caseId={caseData.id} votes={caseData.votes} />
                        <div className="h-px bg-white/5" />
                        <CommentSection caseId={caseData.id} comments={caseData.comments} />
                    </div>
                )}
            </div>
        </article>
    );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export default function CaseCard({ caseData, featured = false }: CaseCardProps) {
    return featured
        ? <FeaturedCard caseData={caseData} />
        : <RegularCard caseData={caseData} />;
}
