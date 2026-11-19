import { useState, useEffect, useCallback } from 'react';
import type { LocalProgressV1, AchievementId, TraumaResult } from '../types';

export const STORAGE_KEY = 'nov19:progress:v1';

export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const INITIAL_PROGRESS: LocalProgressV1 = {
  version: 1,
  firstVisitDate: getLocalDateString(),
  lastVisitDate: getLocalDateString(),
  bestQuizScore: 0,
  completedQuizCount: 0,
  healingPercent: 19, // symbolic default 19%
  healingDeclared: false,
  achievements: [],
  memesGeneratedCount: 0,
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
  const [progress, setProgress] = useState<LocalProgressV1>(() => {
    if (typeof window === 'undefined') return INITIAL_PROGRESS;
    try {
      const today = getLocalDateString();
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return INITIAL_PROGRESS;
      const parsed = JSON.parse(stored);
      if (!parsed || typeof parsed !== 'object' || parsed.version !== 1) {
        return INITIAL_PROGRESS;
      }

      const firstVisit = parsed.firstVisitDate || today;
      const isLaterCalendarDay = today > firstVisit;
      let updatedAchievements = Array.isArray(parsed.achievements) ? [...parsed.achievements] : [];
      const hasStillStanding = updatedAchievements.some(
        (a: { id: string }) => a.id === 'STILL_STANDING'
      );

      if (isLaterCalendarDay && !hasStillStanding) {
        updatedAchievements.push({
          id: 'STILL_STANDING' as AchievementId,
          unlockedAt: new Date().toISOString(),
        });
      }

      return {
        ...INITIAL_PROGRESS,
        ...parsed,
        lastVisitDate: today,
        achievements: updatedAchievements,
      };
    } catch {
      return INITIAL_PROGRESS;
    }
  });

  // Save to localStorage whenever progress state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('LocalStorage save failed, running in-memory fallback:', e);
    }
  }, [progress]);

  const hasAchievement = useCallback((id: AchievementId) => {
    return progress.achievements.some((a) => a.id === id);
  }, [progress.achievements]);

  const unlockAchievement = useCallback((id: AchievementId) => {
    setProgress((prev) => {
      if (prev.achievements.some((a) => a.id === id)) return prev;

      const now = new Date().toISOString();
      const newAchievement = { id, unlockedAt: now };
      let updatedList = [...prev.achievements, newAchievement];

      // Any completed activity automatically unlocks NEVER_FORGET_1911
      if (id !== 'NEVER_FORGET_1911' && id !== 'STILL_STANDING') {
        if (!updatedList.some((a) => a.id === 'NEVER_FORGET_1911')) {
          updatedList = [...updatedList, { id: 'NEVER_FORGET_1911', unlockedAt: now }];
          dispatchAchievementUnlocked('NEVER_FORGET_1911');
        }
      }

      dispatchAchievementUnlocked(id);

      return {
        ...prev,
        achievements: updatedList,
      };
    });
  }, []);

  const saveTraumaResult = useCallback((result: TraumaResult, answers: Record<string, string>) => {
    setProgress((prev) => ({
      ...prev,
      latestTraumaResult: result,
      traumaAnswers: answers,
    }));
    unlockAchievement('FIRST_DIAGNOSIS');
  }, [unlockAchievement]);

  const saveQuizScore = useCallback((score: number) => {
    setProgress((prev) => {
      const best = Math.max(prev.bestQuizScore, score);
      return {
        ...prev,
        bestQuizScore: best,
        completedQuizCount: prev.completedQuizCount + 1,
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
      healingPercent: Math.max(0, Math.min(100, val)),
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
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    const fresh: LocalProgressV1 = {
      ...INITIAL_PROGRESS,
      firstVisitDate: getLocalDateString(),
      lastVisitDate: getLocalDateString(),
    };
    setProgress(fresh);
  }, []);

  // Map achievements for quick lookup { [id]: ISO string }
  const unlockedMap = progress.achievements.reduce<Record<string, string>>((acc, item) => {
    acc[item.id] = item.unlockedAt;
    return acc;
  }, {});

  return {
    progress,
    unlockedMap,
    hasAchievement,
    unlockAchievement,
    saveTraumaResult,
    saveQuizScore,
    saveMemeGenerated,
    saveHealingProgress,
    toggleSound,
    resetProgress,
  };
}
