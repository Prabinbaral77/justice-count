import AnonymousForm from '../components/AnonymousForm';
import { Megaphone } from 'lucide-react';

export default function SubmitStory() {
    return (
        <div className="max-w-2xl mx-auto py-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-red-500/10 rounded-xl">
                    <Megaphone className="w-7 h-7 text-red-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-white">Submit a Case</h1>
                    <p className="text-slate-500 text-sm mt-0.5">Your voice matters — even anonymously.</p>
                </div>
            </div>

            <p className="text-slate-400 mb-8 leading-relaxed text-sm border-l-2 border-red-600 pl-4">
                Know of an unresolved injustice that deserves public attention? Share it here.
                No login required. Your story will be reviewed and published if appropriate.
            </p>

            <div className="p-6 sm:p-8 bg-slate-800/30 border border-slate-700/40 rounded-2xl">
                <AnonymousForm />
            </div>
        </div>
    );
}
