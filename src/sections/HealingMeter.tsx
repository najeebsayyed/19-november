import React, { useState } from 'react';
import { 
  HeartPulse, 
  Sparkles, 
  CheckCircle, 
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HealingMeterProps {
  initialProgress: number;
  isDeclared: boolean;
  onSaveProgress: (val: number, declared?: boolean) => void;
  onPlayClick: () => void;
  onPlayCelebration: () => void;
}

export const HealingMeter: React.FC<HealingMeterProps> = ({
  initialProgress,
  isDeclared,
  onSaveProgress,
  onPlayClick,
  onPlayCelebration,
}) => {
  const [val, setVal] = useState<number>(initialProgress);
  const [hasDeclared, setHasDeclared] = useState<boolean>(isDeclared);
  const [showToast, setShowToast] = useState<boolean>(false);

  const getDynamicMessage = (pct: number) => {
    if (pct <= 10) return "Brother, it's been years.";
    if (pct <= 25) return "You're still watching the highlights?";
    if (pct <= 50) return "Progress has been detected.";
    if (pct <= 75) return "Maybe there is hope.";
    if (pct <= 99) return "Almost recovered. Don't watch the final again.";
    return "Congratulations. You're officially stronger than the scoreboard.";
  };

  const getEmoji = (pct: number) => {
    if (pct <= 10) return "😭";
    if (pct <= 25) return "🥺";
    if (pct <= 50) return "😐";
    if (pct <= 75) return "🙂";
    if (pct <= 99) return "🧘‍♂️";
    return "🏆";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    setVal(num);
    onSaveProgress(num, false);
  };

  const handleDeclare = () => {
    onPlayClick();
    onPlayCelebration();
    setHasDeclared(true);
    onSaveProgress(val, true);
    setShowToast(true);

    try {
      confetti({
        particleCount: val === 100 ? 100 : 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#10b981', '#fbbf24', '#f43f5e'],
      });
    } catch {
      // ignore
    }

    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <section id="healing" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#030712] via-[#090e1c] to-[#030712]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-3">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>THERAPEUTIC TRAJECTORY</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
            HOW MUCH HAVE YOU HEALED?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-slate-400 text-sm sm:text-base">
            Be honest. Nobody is judging you.
          </p>
        </div>

        {/* Healing Slider Card */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl backdrop-blur-xl relative">
          {/* Header indicator */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-wider">
                Self-Reported Recovery Status
              </span>
            </div>
            <div className="text-3xl sm:text-4xl">
              {getEmoji(val)}
            </div>
          </div>

          {/* Big Percentage Display */}
          <div className="text-center my-6">
            <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-emerald-400 tracking-tight">
              {val}%
            </div>
            <div className="mt-3 font-display font-bold text-lg sm:text-2xl text-white">
              "{getDynamicMessage(val)}"
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="my-10 px-2 sm:px-6">
            <div className="relative flex items-center">
              <input
                type="range"
                min={0}
                max={100}
                value={val}
                onChange={handleChange}
                className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300 transition-all shadow-inner"
              />
            </div>

            {/* Milestones labels */}
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-4">
              <span>0% (Acute PTSD)</span>
              <span className="hidden sm:inline">25% (Highlights Only)</span>
              <span>50% (Acceptance)</span>
              <span className="hidden sm:inline">75% (Coping Well)</span>
              <span>100% (Zen Master)</span>
            </div>
          </div>

          {/* Declare Button */}
          <div className="text-center pt-4">
            <button
              onClick={handleDeclare}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-display font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/25 flex items-center gap-2 mx-auto cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <CheckCircle className="w-5 h-5" />
              <span>DECLARE MY RECOVERY</span>
            </button>

            {hasDeclared && (
              <p className="mt-3 text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Declaration registered in local medical records!</span>
              </p>
            )}
          </div>

          {/* Toast on Declaration */}
          {showToast && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-600/80 text-emerald-200 text-xs sm:text-sm font-semibold text-center animate-in fade-in slide-in-from-bottom-2">
              🎉 Official certificate updated: Recovery score of {val}% has been stamped and saved!
            </div>
          )}

          {/* Medical Disclaimer */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-500 italic">
              ⚠️ Medical accuracy: 0%. Emotional accuracy: questionable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
