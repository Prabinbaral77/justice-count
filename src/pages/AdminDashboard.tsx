import { useState } from 'react';
import { useAppContext } from '../App';
import type { Case } from '../data/mockData';
import { ShieldAlert, CheckCircle, XCircle, Star, StarOff, Eye, Flame } from 'lucide-react';

export default function AdminDashboard() {
    const { cases } = useAppContext();
    const [localCases, setLocalCases] = useState<Case[]>(cases);
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);

    const handleAction = (id: string, action: 'approved' | 'rejected') => {
        setLocalCases(prev => prev.map(c => c.id === id ? { ...c, status: action } : c));
    };

    const handlePriority = (id: string) => {
        setLocalCases(prev => prev.map(c => c.id === id ? { ...c, priority: !c.priority } : c));
    };

    const handleFeatured = (id: string) => {
        setLocalCases(prev => prev.map(c => c.id === id ? { ...c, isFeatured: !c.isFeatured } : c));
    };

    const stats = {
        total: localCases.length,
        approved: localCases.filter(c => c.status === 'approved').length,
        pending: localCases.filter(c => c.status === 'pending').length,
        rejected: localCases.filter(c => c.status === 'rejected').length,
    };

    return (
        <div className="py-8 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
                <div className="p-3 bg-red-500/10 rounded-xl">
                    <ShieldAlert className="w-7 h-7 text-red-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
                    <p className="text-slate-400 text-sm">Manage, review, and moderate case submissions.</p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Total Cases', value: stats.total, color: 'text-white' },
                    { label: 'Approved', value: stats.approved, color: 'text-emerald-400' },
                    { label: 'Pending', value: stats.pending, color: 'text-amber-400' },
                    { label: 'Rejected', value: stats.rejected, color: 'text-slate-400' },
                ].map(stat => (
                    <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                        <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                        <p className="text-slate-500 text-xs mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            {selectedCase && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    onClick={() => setSelectedCase(null)}
                >
                    <div
                        className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-lg w-full mx-4 space-y-4"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold text-white">{selectedCase.title}</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">{selectedCase.description}</p>
                        <p className="text-xs text-slate-600">Victim: {selectedCase.victimName}</p>
                        <p className="text-xs text-slate-600">Start Date: {new Date(selectedCase.startDate).toLocaleDateString()}</p>
                        <button
                            onClick={() => setSelectedCase(null)}
                            className="mt-4 px-6 py-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Cases Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
                <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-800/60 text-xs uppercase font-semibold text-slate-400">
                        <tr>
                            <th className="px-6 py-4">Case</th>
                            <th className="px-6 py-4 hidden sm:table-cell">Victim</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                        {localCases.map((c) => (
                            <tr key={c.id} className="hover:bg-slate-800/20 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {c.isFeatured && <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500 shrink-0" />}
                                        {c.priority && <Star className="w-3 h-3 text-amber-400 shrink-0" />}
                                        <span className="font-medium text-white truncate max-w-[180px]">{c.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-400 hidden sm:table-cell">{c.victimName}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                                        c.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                                            'bg-slate-700 text-slate-400'
                                        }`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => setSelectedCase(c)}
                                            title="View details"
                                            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handlePriority(c.id)}
                                            title="Toggle priority"
                                            className={`p-1.5 rounded-lg transition-colors ${c.priority ? 'text-amber-400 hover:bg-amber-500/10' : 'text-slate-500 hover:text-amber-400 hover:bg-slate-700'}`}
                                        >
                                            {c.priority ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => handleAction(c.id, 'approved')}
                                            title="Approve"
                                            disabled={c.status === 'approved'}
                                            className="p-1.5 text-slate-500 hover:text-emerald-400 disabled:opacity-30 rounded-lg hover:bg-emerald-500/10 transition-colors"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleAction(c.id, 'rejected')}
                                            title="Reject"
                                            disabled={c.status === 'rejected'}
                                            className="p-1.5 text-slate-500 hover:text-red-400 disabled:opacity-30 rounded-lg hover:bg-red-500/10 transition-colors"
                                        >
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleFeatured(c.id)}
                                            title="Toggle Featured"
                                            className={`p-1.5 rounded-lg transition-colors ${c.isFeatured ? 'text-red-500 bg-red-500/10' : 'text-slate-500 hover:text-red-500 hover:bg-slate-700'}`}
                                        >
                                            <Flame className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
