import { useState } from 'react';
import type { Comment } from '../data/mockData';
import { MessageCircle, Send } from 'lucide-react';

const EMOJI_REACTIONS = ['😡', '😢', '🙏', '🔥'] as const;
type Emoji = typeof EMOJI_REACTIONS[number];

interface CommentSectionProps {
    caseId: string;
    comments: Comment[];
}

export default function CommentSection({ comments: initialComments }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [text, setText] = useState('');
    const [reactions, setReactions] = useState<Record<Emoji, number>>({ '😡': 142, '😢': 98, '🙏': 211, '🔥': 77 });
    const [reactedWith, setReactedWith] = useState<Set<Emoji>>(new Set());

    const handleSubmit = () => {
        if (!text.trim()) return;
        const newComment: Comment = {
            id: `c-${Date.now()}`,
            text: text.trim(),
            author: 'Anonymous',
            createdAt: new Date().toISOString(),
        };
        setComments(prev => [newComment, ...prev]);
        setText('');
    };

    const handleReact = (emoji: Emoji) => {
        if (reactedWith.has(emoji)) return;
        setReactions(prev => ({ ...prev, [emoji]: prev[emoji] + 1 }));
        setReactedWith(prev => new Set(prev).add(emoji));
    };

    const formatDate = (iso: string) => {
        return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="space-y-6">
            {/* Emoji Reactions */}
            <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-3">Public Reaction</p>
                <div className="flex flex-wrap gap-3">
                    {EMOJI_REACTIONS.map(emoji => (
                        <button
                            key={emoji}
                            onClick={() => handleReact(emoji)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${reactedWith.has(emoji)
                                    ? 'border-red-500/60 bg-red-500/10 text-white scale-105'
                                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                                }`}
                        >
                            <span className="text-lg">{emoji}</span>
                            <span>{reactions[emoji].toLocaleString()}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Comment Input */}
            <div className="flex gap-3">
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    placeholder="Share your thoughts anonymously..."
                    className="flex-1 bg-slate-800/70 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-red-500/50 transition-colors"
                />
                <button
                    onClick={handleSubmit}
                    className="px-4 py-3 bg-red-600 hover:bg-red-500 rounded-xl text-white transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>

            {/* Comments List */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <MessageCircle className="w-4 h-4" />
                    <span>{comments.length} comments</span>
                </div>
                {comments.length === 0 && (
                    <p className="text-slate-600 italic text-sm text-center py-4">Be the first to share your voice.</p>
                )}
                {comments.map(c => (
                    <div key={c.id} className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-slate-400">{c.author}</span>
                            <span className="text-xs text-slate-600">{formatDate(c.createdAt)}</span>
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed">{c.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
