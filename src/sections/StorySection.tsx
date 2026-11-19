import React, { useState } from 'react';
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  Flame, 
  Clock, 
  Target,
  Sparkles,
  Zap
} from 'lucide-react';
import { MATCH_FACTS, HUMOROUS_CAPTIONS, MATCH_TIMELINE } from '../data/matchFacts';

interface StorySectionProps {
  onPlayClick: () => void;
  onPlayWicket: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({
  onPlayClick,
  onPlayWicket,
}) => {
  const [activeMoment, setActiveMoment] = useState<number>(0);

  return (
    <section id="story" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#030712] via-[#080d1a] to-[#030712] scroll-mt-20">
      {/* Background stadium glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-800/60 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>EXHIBIT A: HISTORICAL EVIDENCE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
            THE NIGHT WE DON'T TALK ABOUT
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            10 matches won. We thought the script was already written. Then 19 November 2023 happened.
          </p>
        </div>

        {/* Humorous Quote Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {HUMOROUS_CAPTIONS.map((cap, idx) => (
            <div 
              key={cap.highlight}
              className={`bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-sky-500/40 transition-all shadow-lg group ${
                idx === 1 ? 'hover:border-amber-500/40' : idx === 2 ? 'hover:border-red-500/40' : ''
              }`}
            >
              <div className={`text-2xl font-black mb-2 font-display ${
                idx === 0 ? 'text-sky-400' : idx === 1 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {cap.highlight}
              </div>
              <p className="text-slate-200 font-semibold text-sm leading-relaxed">
                "{cap.quote}"
              </p>
              <p className="text-xs text-slate-400 mt-2">{cap.note}</p>
            </div>
          ))}
        </div>

        {/* Fact Cards Scoreboard Grid */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl mb-14">
          <div className="flex items-center gap-2 mb-6 text-sm font-bold tracking-wider uppercase text-sky-400 pb-3 border-b border-slate-800">
            <Trophy className="w-4 h-4" />
            <span>Certified Historic Match Record</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span>DATE</span>
              </div>
              <div className="font-display font-bold text-white text-base sm:text-lg">{MATCH_FACTS.date}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{MATCH_FACTS.tournament}</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>VENUE</span>
              </div>
              <div className="font-display font-bold text-white text-base sm:text-lg truncate">Narendra Modi Stadium</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Ahmedabad, Gujarat ({MATCH_FACTS.attendance})</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Target className="w-3.5 h-3.5 text-rose-400" />
                <span>FIRST INNINGS</span>
              </div>
              <div className="font-display font-bold text-sky-400 text-base sm:text-lg">{MATCH_FACTS.indiaScore}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{MATCH_FACTS.indiaOvers} • KL Rahul 66, Rohit 47</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>THE CHASE</span>
              </div>
              <div className="font-display font-bold text-amber-400 text-base sm:text-lg">{MATCH_FACTS.australiaScore}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{MATCH_FACTS.margin}</div>
            </div>
          </div>
        </div>

        {/* Interactive Match Timeline: How the Trauma Unfolded */}
        <div className="bg-gradient-to-br from-slate-950 via-[#0b1020] to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>How The Trauma Unfolded (Timeline)</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Click each moment to relive the emotional rollercoaster step-by-step.
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              STAGE {activeMoment + 1} OF {MATCH_TIMELINE.length}
            </div>
          </div>

          {/* Timeline pill selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {MATCH_TIMELINE.map((m, idx) => (
              <button
                key={m.time}
                onClick={() => {
                  if (idx === 5) onPlayWicket();
                  else onPlayClick();
                  setActiveMoment(idx);
                }}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  activeMoment === idx
                    ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/25 scale-105'
                    : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.time}</span>
              </button>
            ))}
          </div>

          {/* Active Timeline Moment Spotlight */}
          {MATCH_TIMELINE[activeMoment] && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 sm:p-8 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {MATCH_TIMELINE[activeMoment].phase}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {MATCH_TIMELINE[activeMoment].impact}
                </span>
              </div>

              <blockquote className="my-3 pl-4 border-l-2 border-sky-500 text-lg sm:text-xl font-display font-extrabold text-white italic">
                "{MATCH_TIMELINE[activeMoment].quote}"
              </blockquote>
              <p className="text-xs text-sky-300 font-medium mb-4">— {MATCH_TIMELINE[activeMoment].author}</p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {MATCH_TIMELINE[activeMoment].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
