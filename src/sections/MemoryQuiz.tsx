import React, { useState } from 'react';
import { 
  CRICKET_QUIZ_QUESTIONS, 
  evaluateQuizResult 
} from '../data/quizQuestions';
import type { QuizQuestion, QuizResult } from '../types';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight,
  Sparkles,
  Share2,
  Copy,
  Check,
  MessageCircle
} from 'lucide-react';
import { XIcon } from '../components/Icons';
import { openWhatsAppShare, openTwitterShare, shareContent } from '../utils/sharing';
import confetti from 'canvas-confetti';

interface MemoryQuizProps {
  bestScore: number;
  onSaveScore: (score: number) => void;
  onPlayClick: () => void;
  onPlayBatHit: () => void;
  onPlayWicket: () => void;
  onPlayCelebration: () => void;
}

export const MemoryQuiz: React.FC<MemoryQuizProps> = ({
  bestScore,
  onSaveScore,
  onPlayClick,
  onPlayBatHit,
  onPlayWicket,
  onPlayCelebration,
}) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>(() =>
    [...CRICKET_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5)
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Initialize and randomize question order on start or replay
  const startQuiz = () => {
    const shuffled = [...CRICKET_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setHasAnswered(false);
    setScore(0);
    setIsCompleted(false);
    setQuizResult(null);
  };

  const currentQ = shuffledQuestions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (hasAnswered || !currentQ) return;

    setSelectedOptionId(optionId);
    setHasAnswered(true);

    const isCorrect = optionId === currentQ.correctAnswerId;
    if (isCorrect) {
      onPlayBatHit();
      setScore((prev) => prev + 1);
    } else {
      onPlayWicket();
    }
  };

  const handleNextQuestion = () => {
    onPlayClick();
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
    } else {
      // Quiz Complete
      const finalScore = score;
      const resultObj = evaluateQuizResult(finalScore, shuffledQuestions.length);
      setQuizResult(resultObj);
      setIsCompleted(true);
      onSaveScore(finalScore);

      if (finalScore >= 8) {
        onPlayCelebration();
        try {
          confetti({
            particleCount: 60,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const shareText = quizResult
    ? `I scored ${quizResult.score}/10 on the 19 November Cricket Memory Quiz! 🏏\nDiagnosis: ${quizResult.tierTitle}\n"${quizResult.description}"`
    : 'Test how much you remember about 19 November 2023!';

  const handleCopy = async () => {
    onPlayClick();
    const res = await shareContent({
      title: "19 November Memory Quiz Score",
      text: shareText,
    });
    if (res.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="quiz" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#030712] via-[#080d19] to-[#030712] scroll-mt-20">
      {/* Background glow */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/60 border border-sky-800/80 text-sky-400 text-xs font-bold tracking-widest uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>EXAMINATION ROOM</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
            HOW MUCH DO YOU REMEMBER?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-slate-400 text-sm sm:text-base">
            Let's test how closely you watched the final. 10 historically accurate questions.
          </p>

          {bestScore > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>Personal Best: {bestScore} / 10</span>
            </div>
          )}
        </div>

        {/* Quiz Container Card */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
          {!isCompleted && currentQ ? (
            <div>
              {/* Progress and Score Header */}
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-4 pb-3 border-b border-slate-800/80">
                <span className="text-sky-400">
                  Question {currentIndex + 1} of {shuffledQuestions.length}
                </span>
                <span className="text-emerald-400 font-mono">
                  Score: {score} / {currentIndex + (hasAnswered ? 1 : 0)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white leading-tight mb-6">
                {currentQ.question}
              </h3>

              {/* 4 Answer Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt, oIdx) => {
                  let styleClass = 'bg-slate-900/80 border-slate-800/90 text-slate-200 hover:border-slate-600 hover:bg-slate-850';

                  if (hasAnswered) {
                    if (opt.id === currentQ.correctAnswerId) {
                      styleClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-900/20';
                    } else if (opt.id === selectedOptionId) {
                      styleClass = 'bg-red-950/60 border-red-500 text-red-200';
                    } else {
                      styleClass = 'bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${styleClass}`}
                    >
                      <div className="flex items-center gap-3 pr-2">
                        <span className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="font-display font-bold text-sm sm:text-base">{opt.text}</span>
                      </div>

                      {hasAnswered && opt.id === currentQ.correctAnswerId && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                      {hasAnswered && opt.id === selectedOptionId && opt.id !== currentQ.correctAnswerId && (
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Context Box (shown immediately after answering) */}
              {hasAnswered && (
                <div 
                  role="status" 
                  aria-live="polite" 
                  className="my-6 bg-slate-900/95 border border-slate-800 rounded-2xl p-5 animate-in fade-in duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {selectedOptionId === currentQ.correctAnswerId ? (
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Spot on!
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Painful reality check
                      </span>
                    )}
                  </div>
                  <p className="text-slate-200 text-sm font-semibold mb-1">
                    {currentQ.explanation}
                  </p>
                  <p className="text-xs text-slate-400 italic">
                    Historical context: {currentQ.historicalContext}
                  </p>
                </div>
              )}

              {/* Next Question CTA */}
              {hasAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-sky-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    <span>
                      {currentIndex === shuffledQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : quizResult ? (
            /* Quiz Completed View */
            <div className="text-center py-4 animate-in fade-in duration-300">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-950 border border-sky-800 text-sky-400 text-xs font-bold tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXAM FINISHED</span>
              </div>

              <div className="font-display font-black text-6xl sm:text-8xl text-white tracking-tight my-2">
                {quizResult.score} <span className="text-2xl sm:text-4xl text-slate-500">/ 10</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-400 to-emerald-400 tracking-wide mt-2">
                {quizResult.tierTitle}
              </h3>

              <div className="my-6 max-w-xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium mb-3">
                  "{quizResult.description}"
                </p>
                <div className="pt-3 border-t border-slate-800/80 text-xs text-amber-300 font-mono">
                  {quizResult.memeReaction}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                <button
                  onClick={() => {
                    onPlayClick();
                    startQuiz();
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-sky-500/25 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Again</span>
                </button>
              </div>

              {/* Social Share */}
              <div className="pt-6 border-t border-slate-800">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-3">
                  Share Your Scorecard:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    onClick={() => {
                      onPlayClick();
                      openWhatsAppShare(shareText);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      onPlayClick();
                      openTwitterShare(shareText);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <XIcon className="w-3.5 h-3.5 text-sky-400" />
                    <span>Post on X</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied Link!' : 'Copy Score'}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
