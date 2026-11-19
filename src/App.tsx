import { useUserProgress } from './hooks/useLocalStorage';
import { useSoundEffects } from './hooks/useSoundEffects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorySection } from './sections/StorySection';
import { TraumaAssessment } from './sections/TraumaAssessment';
import { MemoryQuiz } from './sections/MemoryQuiz';
import { MemeGenerator } from './sections/MemeGenerator';
import { HealingMeter } from './sections/HealingMeter';
import { Achievements } from './sections/Achievements';
import { SocialCallToAction } from './components/SocialCallToAction';
import { Footer } from './components/Footer';
import { AchievementToast } from './components/AchievementToast';

export function App() {
  const {
    progress,
    unlockedMap,
    saveTraumaResult,
    saveQuizScore,
    saveMemeGenerated,
    saveHealingProgress,
    toggleSound,
    resetProgress,
  } = useUserProgress();

  const {
    playClick,
    playBatHit,
    playWicket,
    playAchievementUnlock,
    playCelebration,
  } = useSoundEffects(progress.soundEnabled);

  const scrollToSection = (id: string) => {
    playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white relative">
      {/* Navigation Bar */}
      <Navbar
        progress={progress}
        onToggleSound={toggleSound}
        onPlayClick={playClick}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section with isolated elapsed-time counter */}
        <Hero
          onCheckTrauma={() => scrollToSection('assessment')}
          onReliveHeartbreak={() => scrollToSection('story')}
        />

        {/* 2. The Story / Match Memories */}
        <StorySection
          onPlayClick={playClick}
          onPlayWicket={playWicket}
        />

        {/* 3. Trauma Assessment */}
        <TraumaAssessment
          persistedResult={progress.latestTraumaResult}
          onSaveResult={saveTraumaResult}
          onPlayClick={playClick}
          onPlayWicket={playWicket}
          onPlayCelebration={playCelebration}
        />

        {/* 4. Cricket Memory Quiz */}
        <MemoryQuiz
          bestScore={progress.bestQuizScore}
          onSaveScore={saveQuizScore}
          onPlayClick={playClick}
          onPlayBatHit={playBatHit}
          onPlayWicket={playWicket}
          onPlayCelebration={playCelebration}
        />

        {/* 5. Meme Generator */}
        <MemeGenerator
          onMemeGenerated={saveMemeGenerated}
          onPlayClick={playClick}
          onPlayCelebration={playCelebration}
        />

        {/* 6. Healing Meter */}
        <HealingMeter
          initialProgress={progress.healingPercent}
          isDeclared={progress.healingDeclared}
          onSaveProgress={saveHealingProgress}
          onPlayClick={playClick}
          onPlayCelebration={playCelebration}
        />

        {/* 7. Achievements System */}
        <Achievements
          unlockedMap={unlockedMap}
          onResetProgress={resetProgress}
          onPlayClick={playClick}
          onPlayWicket={playWicket}
        />

        {/* 8. Viral Social Sharing CTA */}
        <SocialCallToAction
          onPlayClick={playClick}
        />
      </main>

      {/* Footer with Developer Attribution */}
      <Footer
        onPlayClick={playClick}
      />

      {/* Real-time Achievement Unlock Toast */}
      <AchievementToast
        onPlayUnlockSound={playAchievementUnlock}
      />
    </div>
  );
}

export default App;
