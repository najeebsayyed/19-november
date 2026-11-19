import { useState } from 'react';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import type { AchievementId } from '../types';
import { 
  Award, 
  Lock, 
  CheckCircle2, 
  Flame, 
  BookOpen, 
  Image, 
  Crown, 
  HeartHandshake, 
  Stethoscope, 
  Trash2,
  AlertCircle
} from 'lucide-react';

interface AchievementsProps {
  unlockedMap: Record<string, string>;
  onResetProgress: () => void;
  onPlayClick: () => void;
  onPlayWicket: () => void;
}

export const Achievements = ({
  unlockedMap,
  onResetProgress,
  onPlayClick,
  onPlayWicket,
}: AchievementsProps) => {
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  const getIcon = (id: AchievementId) => {
    switch (id) {
      case 'FIRST_DIAGNOSIS': return <Stethoscope className="w-5 h-5" />;
      case 'CRICKET_HISTORIAN': return <BookOpen className="w-5 h-5" />;
      case 'PERFECT_MEMORY': return <Crown className="w-5 h-5" />;
      case 'MEME_THERAPIST': return <Image className="w-5 h-5" />;
      case 'NEVER_FORGET_1911': return <Flame className="w-5 h-5" />;
      case 'STILL_STANDING': return <HeartHandshake className="w-5 h-5" />;
    }
  };

  const unlockedCount = ACHIEVEMENTS_DATA.filter((a) => Boolean(unlockedMap[a.id])).length;
  const progressPercent = Math.round((unlockedCount / ACHIEVEMENTS_DATA.length) * 100);

  return (
    <section id="achievements" className="py-24 px-4 relative overflow-hidden bg-[#030712] scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/80 text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>HALL OF COPING</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
            YOUR TRAUMA ACHIEVEMENTS
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-slate-400 text-sm sm:text-base">
            Commemorate your progress through the 5 stages of grief. Badges persist on your device.
          </p>

          {/* Progress Tracker Pill */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl px-6 py-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Award className="w-4 h-4" />
              <span>{unlockedCount} of {ACHIEVEMENTS_DATA.length} Badges Unlocked</span>
            </div>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono text-slate-400">{progressPercent}%</span>
          </div>
        </div>

        {/* 6 Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {ACHIEVEMENTS_DATA.map((ach) => {
            const isUnlocked = Boolean(unlockedMap[ach.id]);
            const unlockDate = unlockedMap[ach.id];

            return (
              <div
                key={ach.id}
                className={`rounded-2xl p-6 border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-amber-500/40 shadow-xl shadow-amber-500/5'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-60'
                }`}
              >
                {/* Top Row: Icon + Status */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                      isUnlocked
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    {getIcon(ach.id)}
                  </div>

                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" />
                      UNLOCKED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                      <Lock className="w-3 h-3" />
                      LOCKED
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className={`font-display font-black text-base sm:text-lg mb-1.5 ${
                    isUnlocked ? 'text-white' : 'text-slate-400'
                  }`}>
                    {ach.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {ach.description}
                  </p>
                </div>

                {/* Footer timestamp if unlocked */}
                {isUnlocked && unlockDate && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                    Earned: {new Date(unlockDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reset Progress Section */}
        <div className="text-center pt-8 border-t border-slate-800/80">
          <button
            onClick={() => {
              onPlayClick();
              setShowResetModal(true);
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Local Therapy History</span>
          </button>
        </div>

        {/* Confirmation Modal */}
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="font-display font-black text-xl text-white">Reset Therapy Records?</h3>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                This will clear your trauma diagnosis score, quiz score, healing progress, and locked/unlocked achievements from this browser (`nov19:progress:v1`).
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    onPlayClick();
                    setShowResetModal(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onPlayWicket();
                    onResetProgress();
                    setShowResetModal(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
