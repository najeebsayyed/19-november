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

interface StorySectionProps {
  onPlayClick: () => void;
  onPlayWicket: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({
  onPlayClick,
  onPlayWicket,
}) => {
  const [activeMoment, setActiveMoment] = useState<number>(0);

  const matchMoments = [
    {
      time: "2:00 PM IST",
      phase: "THE TOSS & THE PROMISE",
      quote: "There is nothing more satisfying than hearing a big crowd go silent.",
      author: "Pat Cummins, Australian Captain",
      description: "Australia won the toss and shocked commentators by electing to field first on a dry pitch. Pat Cummins promised to silence 130,000 fans. We laughed. We shouldn't have.",
      icon: "🎯",
      impact: "Confidence: 99%",
    },
    {
      time: "3:15 PM IST",
      phase: "ROHIT'S EXPLOSIVE STORM",
      quote: "Hitman was batting like he had a flight to catch.",
      author: "Every Indian Fan",
      description: "Rohit Sharma blitzed 47 off 31 balls with 3 gigantic sixes. India was flying at 76/1 in 9.3 overs. Total euphoria in the stands. Then Travis Head ran back 12 meters to take a wonder catch.",
      icon: "⚡",
      impact: "Heart skips 3 beats",
    },
    {
      time: "4:30 PM IST",
      phase: "THE BOUNDARY DROUGHT",
      quote: "Where did the boundaries go?",
      author: "Statistical Nightmare",
      description: "Australia introduced cutters, reverse swing, and fielders who seemed to multiply. India hit only 4 boundaries in the final 40 overs. Virat Kohli (54) chopped on, KL Rahul grinded 66 off 107 balls.",
      icon: "⏳",
      impact: "Palms sweating profusely",
    },
    {
      time: "5:45 PM IST",
      phase: "240 ALL OUT",
      quote: "240 felt like a score. 241 felt personal.",
      author: "Ahmedabad Scoreboard",
      description: "India was bowled out for 240 in exactly 50.0 overs. Indian fans told themselves: 'The pitch is tricky, our bowlers took 10 wickets in every match, Shami and Bumrah will save us.'",
      icon: "🛑",
      impact: "Nervous dinner consumption",
    },
    {
      time: "7:00 PM IST",
      phase: "HOPE AT 47/3",
      quote: "Wait... are we actually defending this?!",
      author: "Brief Glimmer of Hope",
      description: "Bumrah and Shami struck early! Warner, Marsh, and Smith all fell cheaply. Australia 47/3. The stadium erupted into thunderous noise. We started dreaming again.",
      icon: "🔥",
      impact: "Adrenaline spike to 100%",
    },
    {
      time: "9:45 PM IST",
      phase: "THE TRAVIS HEAD MASTERCLASS",
      quote: "Then Travis Head decided to become the main character.",
      author: "The Inevitable Silence",
      description: "Travis Head (137 off 120 balls) and Marnus Labuschagne (58*) forged a 192-run stand. The Ahmedabad sea of blue slowly transformed into an eerie silence. At 241/4, the dream was over.",
      icon: "💔",
      impact: "Emotional damage: Permanent",
    },
  ];

  return (
    <section id="story" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#030712] via-[#080d1a] to-[#030712]">
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
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-sky-500/40 transition-all shadow-lg group">
            <div className="text-sky-400 text-2xl font-black mb-2">10 - 0</div>
            <p className="text-slate-200 font-semibold text-sm leading-relaxed">
              "10 matches won. We thought the script was already written."
            </p>
            <p className="text-xs text-slate-400 mt-2">Every team crushed, every match a masterclass... until Sunday.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-amber-500/40 transition-all shadow-lg group">
            <div className="text-amber-400 text-2xl font-black mb-2">137 (120)</div>
            <p className="text-slate-200 font-semibold text-sm leading-relaxed">
              "Then Travis Head decided to become the main character."
            </p>
            <p className="text-xs text-slate-400 mt-2">Catch of the century, century of the final. Pure heartbreak.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-red-500/40 transition-all shadow-lg group">
            <div className="text-red-400 text-2xl font-black mb-2">240 vs 241</div>
            <p className="text-slate-200 font-semibold text-sm leading-relaxed">
              "240 felt like a score. 241 felt personal."
            </p>
            <p className="text-xs text-slate-400 mt-2">The one run that stood between an entire nation and the trophy.</p>
          </div>
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
              <div className="font-display font-bold text-white text-base sm:text-lg">19 November 2023</div>
              <div className="text-[11px] text-slate-400 mt-0.5">ICC Men's World Cup Final</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>VENUE</span>
              </div>
              <div className="font-display font-bold text-white text-base sm:text-lg truncate">Narendra Modi Stadium</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Ahmedabad, Gujarat (130,000+ Fans)</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Target className="w-3.5 h-3.5 text-rose-400" />
                <span>FIRST INNINGS</span>
              </div>
              <div className="font-display font-bold text-sky-400 text-base sm:text-lg">India 240 All Out</div>
              <div className="text-[11px] text-slate-400 mt-0.5">50 Overs (KL Rahul 66, Rohit 47)</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>THE CHASE</span>
              </div>
              <div className="font-display font-bold text-amber-400 text-base sm:text-lg">Australia 241/4</div>
              <div className="text-[11px] text-slate-400 mt-0.5">43 Overs • Won by 6 Wickets</div>
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
              STAGE {activeMoment + 1} OF {matchMoments.length}
            </div>
          </div>

          {/* Timeline pill selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {matchMoments.map((m, idx) => (
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
          {matchMoments[activeMoment] && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 sm:p-8 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {matchMoments[activeMoment].phase}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {matchMoments[activeMoment].impact}
                </span>
              </div>

              <blockquote className="my-3 pl-4 border-l-2 border-sky-500 text-lg sm:text-xl font-display font-extrabold text-white italic">
                "{matchMoments[activeMoment].quote}"
              </blockquote>
              <p className="text-xs text-sky-300 font-medium mb-4">— {matchMoments[activeMoment].author}</p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {matchMoments[activeMoment].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
