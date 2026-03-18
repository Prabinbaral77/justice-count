import { Link, useLocation } from 'react-router-dom';
import { Scale, FileText, ShieldAlert } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                            <Scale className="w-6 h-6 text-red-500" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">
                            न्याय <span className="text-red-500">खै</span>
                        </span>
                    </Link>

                    <div className="flex gap-1 sm:gap-4">
                        <Link
                            to="/submit"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/submit')
                                    ? 'bg-slate-800 text-white'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                                }`}
                        >
                            <FileText className="w-4 h-4" />
                            <span className="hidden sm:inline">Submit Issue</span>
                        </Link>
                        <Link
                            to="/admin"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/admin')
                                    ? 'bg-slate-800 text-white'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                                }`}
                        >
                            <ShieldAlert className="w-4 h-4" />
                            <span className="hidden sm:inline">Admin</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
