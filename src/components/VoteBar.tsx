import { useState, useEffect } from 'react';
import { useAppContext } from '../App';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface VoteBarProps {
    caseId: string;
    votes: { served: number; denied: number };
}

export default function VoteBar({ caseId, votes }: VoteBarProps) {
    const { updateVote } = useAppContext();
    const [hasVoted, setHasVoted] = useState<'served' | 'denied' | null>(null);

    useEffect(() => {
        const voted = localStorage.getItem(`voted-${caseId}`);
        if (voted === 'served' || voted === 'denied') {
            setHasVoted(voted);
        }
    }, [caseId]);

    const handleVote = (type: 'served' | 'denied') => {
        if (hasVoted) return; // Prevent double voting logic
        updateVote(caseId, type);
        setHasVoted(type);
        localStorage.setItem(`voted-${caseId}`, type);
    };

    const total = votes.served + votes.denied;
    const servedPerc = total > 0 ? (votes.served / total) * 100 : 0;
    const deniedPerc = total > 0 ? (votes.denied / total) * 100 : 0;

    return (
        <div className="space-y-4">
            <div className="flex justify-between text-sm font-semibold mb-1">
                <span className="text-emerald-400">Justice Served ({votes.served})</span>
                <span className="text-red-500">Justice Denied ({votes.denied})</span>
            </div>

            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex relative">
                <div
                    className="h-full bg-emerald-500 transition-all duration-1000 ease-out"
                    style={{ width: `${servedPerc}%` }}
                />
                <div
                    className="h-full bg-red-500 transition-all duration-1000 ease-out absolute right-0"
                    style={{ width: `${deniedPerc}%` }}
                />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                    onClick={() => handleVote('served')}
                    disabled={hasVoted !== null}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${hasVoted === 'served'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 cursor-default'
                            : hasVoted
                                ? 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
                                : 'bg-slate-800 text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400'
                        }`}
                >
                    <ThumbsUp className="w-4 h-4" /> Served
                </button>
                <button
                    onClick={() => handleVote('denied')}
                    disabled={hasVoted !== null}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${hasVoted === 'denied'
                            ? 'bg-red-500/20 text-red-500 border border-red-500/50 cursor-default'
                            : hasVoted
                                ? 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
                                : 'bg-slate-800 text-slate-300 hover:bg-red-500/10 hover:text-red-500'
                        }`}
                >
                    <ThumbsDown className="w-4 h-4" /> Denied
                </button>
            </div>

            {hasVoted && (
                <p className="text-center text-xs text-slate-500 mt-2 italic">
                    You have already voted on this case.
                </p>
            )}
        </div>
    );
}
