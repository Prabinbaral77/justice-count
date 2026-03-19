import { useState, useMemo } from 'react';
import { useAppContext } from '../App';
import CaseCard from '../components/CaseCard';
import { Search, TrendingUp, AlertOctagon } from 'lucide-react';

const CATEGORIES = ['All', 'Murder', 'Conflict', 'Corruption', 'Disappearance'] as const;

export default function Home() {
    const { cases } = useAppContext();
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const approvedCases = cases.filter(c => c.status === 'approved');

    const featured = approvedCases.find(c => c.isFeatured) ?? approvedCases[0];


    const filtered = useMemo(() => {
        return approvedCases
            .filter(c => c.id !== featured?.id) // Exclude featured case from the main list
            .filter(c => {
                const matchesSearch =
                    c.title.toLowerCase().includes(search.toLowerCase()) ||
                    c.victimName.toLowerCase().includes(search.toLowerCase()) ||
                    c.description.toLowerCase().includes(search.toLowerCase());
                return matchesSearch;
            });
    }, [approvedCases, search, activeCategory, featured?.id]);

    const trending = [...approvedCases]
        .sort((a, b) => (b.votes.denied + b.votes.served) - (a.votes.denied + a.votes.served))
        .slice(0, 3);

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative text-center space-y-6 pt-12 pb-16 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.08)_0%,_transparent_70%)] pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-semibold animate-pulse">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Live Cases Being Tracked
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-none">
                    न्याय{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-700">
                        खै
                    </span>{' '}
                    सरकार?
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                    A public memory for the forgotten. A demand for accountability.
                    Track unresolved justice cases and make your voice heard.
                </p>
            </section>

            {/* Search + Filter */}
            <section className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search cases by name or keyword..."
                        className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-red-500/40 transition-colors text-sm"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                ? 'bg-red-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Featured Case */}
            {featured && (
                <section>
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                        <AlertOctagon className="w-6 h-6 text-red-500" />
                        Featured Case
                    </h2>
                    <CaseCard caseData={featured} featured />
                </section>
            )}

            {/* All / Filtered Cases */}
            <section>
                <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                    <span className="w-1.5 h-7 bg-red-500 rounded-full inline-block"></span>
                    All Cases
                    <span className="text-slate-500 text-base font-normal">({filtered.length})</span>
                </h2>

                {filtered.length === 0 ? (
                    <div className="text-center py-20 text-slate-600 text-lg">
                        No cases found matching your search.
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                        {filtered.map(c => (
                            <CaseCard key={c.id} caseData={c} />
                        ))}
                    </div>
                )}
            </section>

            {/* Trending */}
            {trending.length > 0 && (
                <section className="border-t border-slate-800 pt-12">
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                        <TrendingUp className="w-6 h-6 text-amber-500" />
                        Trending
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {trending.map((c, i) => (
                            <div key={c.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex gap-4 items-start">
                                <span className="text-3xl font-black text-slate-700">#{i + 1}</span>
                                <div>
                                    <p className="font-bold text-white text-sm" >{c.title}</p>
                                    <p className="text-xs text-slate-500 mt-1">{(c.votes.served + c.votes.denied).toLocaleString()} votes</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
