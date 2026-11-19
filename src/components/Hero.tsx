import React from 'react';
import { useElapsedTime } from '../hooks/useElapsedTime';
import { HeartCrack, Clock, ArrowDown, Activity } from 'lucide-react';

interface HeroProps {
  onCheckTrauma: () => void;
  onReliveHeartbreak: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onCheckTrauma,
  onReliveHeartbreak,
}) => {
  const elapsed = useElapsedTime();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Stadium Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b1d] to-[#030712]" />

        {/* Dynamic Stadium Floodlight Beams */}
        <div className="absolute top-0 left-1/4 w-[35vw] h-[70vh] bg-gradient-to-b from-sky-400/20 via-sky-500/5 to-transparent -rotate-12 blur-3xl transform -translate-x-1/2 pointer-events-none animate-floodlight" />
        <div className="absolute top-0 right-1/4 w-[35vw] h-[70vh] bg-gradient-to-b from-amber-400/15 via-sky-500/5 to-transparent rotate-12 blur-3xl transform translate-x-1/2 pointer-events-none animate-floodlight" />

        {/* Stadium light flares at corners */}
        <div className="absolute top-12 left-10 w-4 h-4 bg-white rounded-full blur-sm shadow-[0_0_80px_30px_rgba(56,189,248,0.35)]" />
        <div className="absolute top-12 right-10 w-4 h-4 bg-amber-100 rounded-full blur-sm shadow-[0_0_80px_30px_rgba(251,191,36,0.3)]" />

        {/* Stadium crowd silhouette at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 shadow-lg shadow-sky-500/10">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span>THE UNOFFICIAL INDIAN CRICKET FANS' TRAUMA CENTER</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_10px_35px_rgba(56,189,248,0.25)] select-none">
          19 NOVEMBER
        </h1>

        {/* Subheading */}
        <h2 className="mt-3 font-display font-extrabold text-xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-sky-400 tracking-wide">
          10 wins. 1 final. {elapsed.years} years. Still not recovered.
        </h2>

        {/* Supporting text */}
        <p className="mt-4 max-w-2xl text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
          "Remember when we were just one match away from lifting the World Cup? Yeah. We remember too."
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full max-w-md">
          <button
            onClick={onCheckTrauma}
            className="flex-1 min-w-[200px] px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-display font-black text-sm tracking-wider uppercase shadow-xl shadow-sky-600/30 hover:shadow-sky-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 group"
          >
            <HeartCrack className="w-4 h-4 text-rose-300 group-hover:scale-110 transition-transform" />
            <span>CHECK MY TRAUMA</span>
          </button>

          <button
            onClick={onReliveHeartbreak}
            className="flex-1 min-w-[200px] px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-display font-bold text-sm tracking-wider uppercase border border-slate-700/80 hover:border-slate-500 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>RELIVE THE HEARTBREAK</span>
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Live Elapsed Time Counter */}
        <div className="mt-12 w-full max-w-3xl bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Time Since The Heartbreak</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE IST TICK</span>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {[
              { label: 'YEARS', value: elapsed.years },
              { label: 'MONTHS', value: elapsed.months },
              { label: 'DAYS', value: elapsed.days },
              { label: 'HOURS', value: elapsed.hours },
              { label: 'MINUTES', value: elapsed.minutes },
              { label: 'SECONDS', value: elapsed.seconds },
            ].map((unit) => (
              <div 
                key={unit.label}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center shadow-inner group hover:border-sky-500/40 transition-colors"
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

          <p className="mt-3 text-xs text-slate-400 italic">
            "Every second counts, yet none of them heal the memory of that Sunday evening."
          </p>
        </div>

        {/* Dramatic Scoreboard Display */}
        <div className="mt-8 w-full max-w-2xl bg-gradient-to-r from-slate-950 via-[#0a0f1d] to-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
          {/* Subtle cricket ball seam glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* India Score */}
            <div className="flex-1 text-center sm:text-left px-3">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xl">🇮🇳</span>
                <span className="font-display font-extrabold text-sm tracking-wider text-slate-300">INDIA</span>
              </div>
              <div className="font-display font-black text-2xl sm:text-3xl text-sky-400 mt-0.5">
                240 <span className="text-xs sm:text-sm font-semibold text-slate-400 uppercase">ALL OUT (50 OV)</span>
              </div>
            </div>

            {/* VS Divider */}
            <div className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-black text-slate-400 uppercase tracking-widest">
              FINAL
            </div>

            {/* Australia Score */}
            <div className="flex-1 text-center sm:text-right px-3">
              <div className="flex items-center justify-center sm:justify-end gap-2">
                <span className="font-display font-extrabold text-sm tracking-wider text-slate-300">AUSTRALIA</span>
                <span className="text-xl">🇦🇺</span>
              </div>
              <div className="font-display font-black text-2xl sm:text-3xl text-amber-400 mt-0.5">
                241/4 <span className="text-xs sm:text-sm font-semibold text-slate-400 uppercase">(43.0 OV)</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-red-400 px-2">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-red-500" />
              RESULT: AUSTRALIA WON BY 6 WICKETS
            </span>
            <span className="text-slate-400 font-normal hidden sm:inline">POTM: Travis Head (137)</span>
          </div>
        </div>

        {/* Small Disclaimer */}
        <p className="mt-6 text-xs text-slate-400 max-w-lg">
          ⚠️ All memories are real. The healing statistics are completely unscientific.
        </p>
      </div>
    </section>
  );
};
