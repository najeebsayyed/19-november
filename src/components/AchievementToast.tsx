import { useState, useEffect } from 'react';
import { ACHIEVEMENT_EVENT } from '../hooks/useLocalStorage';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import type { Achievement } from '../types';
import { Award, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AchievementToastProps {
  onPlayUnlockSound: () => void;
}

export const AchievementToast = ({ onPlayUnlockSound }: AchievementToastProps) => {
  const [activeToast, setActiveToast] = useState<Achievement | null>(null);

  useEffect(() => {
    const handleUnlock = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      const id = customEvent.detail?.id;
      const found = ACHIEVEMENTS_DATA.find((a) => a.id === id);

      if (found) {
        setActiveToast(found);
        onPlayUnlockSound();

        try {
          confetti({
            particleCount: 35,
            spread: 50,
            origin: { y: 0.85, x: 0.85 },
            colors: ['#fbbf24', '#f59e0b', '#38bdf8'],
          });
        } catch {
          // ignore
        }

        const timer = setTimeout(() => {
          setActiveToast(null);
        }, 5500);

        return () => clearTimeout(timer);
      }
    };

    window.addEventListener(ACHIEVEMENT_EVENT, handleUnlock);
    return () => window.removeEventListener(ACHIEVEMENT_EVENT, handleUnlock);
  }, [onPlayUnlockSound]);

  if (!activeToast) return null;

  return (
    <div 
      role="status" 
      aria-live="polite" 
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl p-4 shadow-2xl shadow-amber-500/20 flex items-start gap-3 relative overflow-hidden backdrop-blur-md">
        {/* Top glowing edge */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
          <Award className="w-6 h-6" />
        </div>

        <div className="flex-1 pr-4">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-400 mb-0.5">
            <Sparkles className="w-3 h-3" />
            <span>Achievement Unlocked!</span>
          </div>
          <h4 className="font-display font-black text-sm text-white">
            {activeToast.title}
          </h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-snug">
            {activeToast.description}
          </p>
        </div>

        <button
          onClick={() => setActiveToast(null)}
          className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
          aria-label="Close toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
