import { useEffect, useState } from 'react';

interface CounterProps {
    startDate: string;
}

export default function Counter({ startDate }: CounterProps) {
    const [days, setDays] = useState<number>(0);

    useEffect(() => {
        const calculateDays = () => {
            const start = new Date(startDate).getTime();
            const now = Date.now();
            const diffTime = Math.abs(now - start);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            setDays(diffDays);
        };

        calculateDays();
        // Re-check every hour in case it ticks over midnight while open
        const interval = setInterval(calculateDays, 1000 * 60 * 60);
        return () => clearInterval(interval);
    }, [startDate]);

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-slate-900/50 rounded-xl border border-red-900/30">
            <div className="flex items-baseline gap-1 font-extrabold font-mono text-red-500">
                <span className="text-4xl md:text-5xl">{days}</span>
                <span className="text-xl md:text-2xl opacity-80">दिन</span>
            </div>
            <p className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-widest text-center">
                Without Justice
            </p>
        </div>
    );
}
