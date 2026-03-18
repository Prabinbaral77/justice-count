import { useState } from 'react';
import { useAppContext } from '../App';
import type { Case } from '../data/mockData';
import { AlertTriangle, CheckCircle, Upload } from 'lucide-react';

export default function AnonymousForm() {
    const { addCase } = useAppContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        const newCase: Case = {
            id: `case-${Date.now()}`,
            title: title.trim(),
            victimName: 'Anonymous Submission',
            startDate: new Date().toISOString(),
            description: description.trim(),
            tagline: 'न्याय खोज्दैछौं',
            imageUrl: imageUrl.trim() || undefined,
            votes: { served: 0, denied: 0 },
            comments: [],
            priority: false,
            status: 'pending',
        };

        addCase(newCase);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Submission Received</h2>
                <p className="text-slate-400 max-w-md">
                    Your story has been submitted for review. Once approved by an admin, it will appear on the public feed.
                    Thank you for your courage.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-200/80">
                    Your submission is <strong>completely anonymous</strong>. No personal data is required or stored.
                    All cases are reviewed before publication.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Case Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        placeholder="e.g. Nirmala Panta Murder Case"
                        className="w-full bg-slate-800/70 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-red-500/50 transition-colors text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        rows={6}
                        placeholder="Describe the case in detail. What happened? Who is responsible? What justice is being demanded?"
                        className="w-full bg-slate-800/70 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-red-500/50 transition-colors text-sm resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Image URL <span className="text-slate-500">(optional)</span>
                    </label>
                    <div className="relative">
                        <Upload className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full bg-slate-800/70 border border-slate-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-red-500/50 transition-colors text-sm"
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-colors text-base"
            >
                Submit Anonymously
            </button>
        </form>
    );
}
