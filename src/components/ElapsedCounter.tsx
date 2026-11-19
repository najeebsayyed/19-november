import { useElapsedTime } from '../hooks/useElapsedTime';
import { Clock } from 'lucide-react';

export const ElapsedCounter = () => {
  const elapsed = useElapsedTime();

  const timeUnits = [
    { label: 'YEARS', value: elapsed.years },
    { label: 'MONTHS', value: elapsed.months },
    { label: 'DAYS', value: elapsed.days },
    { label: 'HOURS', value: elapsed.hours },
    { label: 'MINUTES', value: elapsed.minutes },
    { label: 'SECONDS', value: elapsed.seconds },
  ];

  return (
    <div className="w-full max-w-3xl bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          <Clock className="w-4 h-4 text-sky-400" />
          <span>TIME SINCE THE HEARTBREAK</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE IST</span>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {timeUnits.map((unit) => (
          <div 
            key={unit.label}
            className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 sm:p-3 flex flex-col items-center justify-center shadow-inner group hover:border-sky-500/40 transition-colors"
          >
            <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight group-hover:text-sky-400 transition-colors">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-400 italic text-center">
        "Every second counts, yet none of them heal the memory of that Sunday evening."
      </p>
    </div>
  );
};
