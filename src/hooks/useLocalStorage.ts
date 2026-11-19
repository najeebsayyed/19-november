import { useState, useEffect, useCallback } from 'react';
import type { UserProgress, AchievementId, TraumaCategory } from '../types';

const STORAGE_KEY = 'TRAUMA_CENTER_STATE_V1';

const INITIAL_PROGRESS: UserProgress = {
  version: 1,
  traumaScore: null,
  traumaCategory: null,
  traumaAnswers: {},
  quizBestScore: null,
  quizTotalTaken: 0,
  healingProgress: 19, // symbolic 19%
  healingDeclared: false,
  unlockedAchievements: {},
  memesGeneratedCount: 0,
  visitCount: 1,
  firstVisit: new Date().toISOString(),
  lastVisit: new Date().toISOString(),
  soundEnabled: true,
};

// Global event bus for newly unlocked achievement toasts
export const ACHIEVEMENT_EVENT = 'trauma_achievement_unlocked';

export function dispatchAchievementUnlocked(id: AchievementId) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(ACHIEVEMENT_EVENT, { detail: { id } }));
  }
}

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window === 'undefined') return INITIAL_PROGRESS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return INITIAL_PROGRESS;
      const parsed = JSON.parse(stored);
      if (parsed.version !== INITIAL_PROGRESS.version) {
        return { ...INITIAL_PROGRESS, ...parsed, version: INITIAL_PROGRESS.version };
      }
      return { ...INITIAL_PROGRESS, ...parsed };
    } catch {
      return INITIAL_PROGRESS;
    }
  });

  // Save to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [progress]);

  // Check visit history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const now = new Date();
      if (stored) {
        const parsed: UserProgress = JSON.parse(stored);
        const lastVisitDate = new Date(parsed.lastVisit || parsed.firstVisit);
        // If last visit was at least 5 minutes ago or different day
        const diffMs = now.getTime() - lastVisitDate.getTime();
        const isSeparateVisit = diffMs > 5 * 60 * 1000;

        const newVisitCount = isSeparateVisit ? (parsed.visitCount || 1) + 1 : (parsed.visitCount || 1);

        const updated: UserProgress = {
          ...parsed,
          visitCount: newVisitCount,
          lastVisit: now.toISOString(),
        };

        // If returned on a separate visit, unlock STILL_STANDING
        if (newVisitCount >= 2 && !parsed.unlockedAchievements?.['STILL_STANDING']) {
          updated.unlockedAchievements = {
            ...(parsed.unlockedAchievements || {}),
            STILL_STANDING: now.toISOString(),
          };
          dispatchAchievementUnlocked('STILL_STANDING');
        }

        setProgress(updated);
      }
    } catch {
      // ignore
    }
  }, []);

  const unlockAchievement = useCallback((id: AchievementId) => {
    setProgress((prev) => {
      if (prev.unlockedAchievements[id]) return prev; // already unlocked

      const now = new Date().toISOString();
      const updated = {
        ...prev,
        unlockedAchievements: {
          ...prev.unlockedAchievements,
          [id]: now,
        },
      };

      // Also ensure NEVER_FORGET_1911 is unlocked on any completed activity
      if (id !== 'NEVER_FORGET_1911' && id !== 'STILL_STANDING') {
        if (!updated.unlockedAchievements['NEVER_FORGET_1911']) {
          updated.unlockedAchievements['NEVER_FORGET_1911'] = now;
          dispatchAchievementUnlocked('NEVER_FORGET_1911');
        }
      }

      dispatchAchievementUnlocked(id);
      return updated;
    });
  }, []);

  const saveTraumaResult = useCallback((score: number, category: TraumaCategory, answers: Record<number, number>) => {
    setProgress((prev) => ({
      ...prev,
      traumaScore: score,
      traumaCategory: category,
      traumaAnswers: answers,
    }));
    unlockAchievement('FIRST_DIAGNOSIS');
  }, [unlockAchievement]);

  const saveQuizScore = useCallback((score: number) => {
    setProgress((prev) => {
      const best = prev.quizBestScore === null ? score : Math.max(prev.quizBestScore, score);
      return {
        ...prev,
        quizBestScore: best,
        quizTotalTaken: prev.quizTotalTaken + 1,
      };
    });

    unlockAchievement('CRICKET_HISTORIAN');
    if (score === 10) {
      unlockAchievement('PERFECT_MEMORY');
    }
  }, [unlockAchievement]);

  const saveMemeGenerated = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      memesGeneratedCount: prev.memesGeneratedCount + 1,
    }));
    unlockAchievement('MEME_THERAPIST');
  }, [unlockAchievement]);

  const saveHealingProgress = useCallback((val: number, declared: boolean = false) => {
    setProgress((prev) => ({
      ...prev,
      healingProgress: Math.max(0, Math.min(100, val)),
      healingDeclared: declared ? true : prev.healingDeclared,
    }));
    if (declared) {
      unlockAchievement('NEVER_FORGET_1911');
    }
  }, [unlockAchievement]);

  const toggleSound = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    const clean: UserProgress = {
      ...INITIAL_PROGRESS,
      visitCount: 1,
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    } catch {
      // ignore
    }
    setProgress(clean);
  }, []);

  return {
    progress,
    unlockAchievement,
    saveTraumaResult,
    saveQuizScore,
    saveMemeGenerated,
    saveHealingProgress,
    toggleSound,
    resetProgress,
  };
}
