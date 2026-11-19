import React, { useState } from 'react';
import { 
  TRAUMA_QUESTIONS, 
  calculateTraumaResult 
} from '../data/traumaQuestions';
import type { TraumaResult } from '../types';
import { 
  HeartCrack, 
  RotateCcw, 
  Download, 
  Share2, 
  Check, 
  Sparkles,
  MessageCircle,
  Copy,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { XIcon } from '../components/Icons';
import { downloadTraumaResultCard } from '../utils/resultCard';
import { openWhatsAppShare, openTwitterShare, shareContent } from '../utils/sharing';
import confetti from 'canvas-confetti';

interface TraumaAssessmentProps {
  persistedResult?: TraumaResult;
  onSaveResult: (result: TraumaResult, answers: Record<string, string>) => void;
  onPlayClick: () => void;
  onPlayWicket: () => void;
  onPlayCelebration: () => void;
}

export const TraumaAssessment: React.FC<TraumaAssessmentProps> = ({
  persistedResult,
  onSaveResult,
  onPlayClick,
  onPlayWicket,
  onPlayCelebration,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [currentResult, setCurrentResult] = useState<TraumaResult | null>(persistedResult || null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const currentQ = TRAUMA_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex) / TRAUMA_QUESTIONS.length) * 100);
  const currentAnswerId = selectedAnswers[currentQ.id];

  const handleSelectOption = (optionId: string) => {
    onPlayClick();
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleContinue = () => {
    if (!currentAnswerId) return;
    onPlayClick();

    if (currentIndex < TRAUMA_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Calculate final score across all 5 questions
      let totalWeight = 0;
      TRAUMA_QUESTIONS.forEach((q) => {
        const chosenId = selectedAnswers[q.id];
        const chosenOpt = q.options.find((opt) => opt.id === chosenId);
        totalWeight += chosenOpt ? chosenOpt.weight : 0;
      });

      const normalizedScore = Math.round((totalWeight / 15) * 100);
      const resultObj = calculateTraumaResult(normalizedScore);
      setCurrentResult(resultObj);
      onSaveResult(resultObj, selectedAnswers);

      if (normalizedScore >= 75) {
        onPlayWicket();
      } else {
        onPlayCelebration();
      }

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#ef4444', '#fbbf24'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onPlayClick();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    onPlayClick();
    setSelectedAnswers({});
    setCurrentIndex(0);
    setCurrentResult(null);
  };

  const handleDownloadCard = async () => {
    if (!currentResult) return;
    onPlayClick();
    setIsDownloading(true);
    try {
      await downloadTraumaResultCard(currentResult);
    } finally {
      setIsDownloading(false);
    }
  };

  const shareText = currentResult
    ? `I just checked my 19 November trauma level: ${currentResult.band} (${currentResult.score}%) 😭\n\n"${currentResult.diagnosis.slice(0, 95)}..."`
    : 'Check your 19 November cricket trauma level!';

  const handleCopy = async () => {
    onPlayClick();
    const res = await shareContent({
      title: "19 November Trauma Report",
      text: shareText,
    });
    if (res.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="assessment" className="py-24 px-4 relative overflow-hidden bg-[#030712] scroll-mt-20">
      {/* Glow aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-800/80 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <HeartCrack className="w-3.5 h-3.5" />
            <span>PSYCHOLOGICAL TRIAGE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
            HOW TRAUMATIZED ARE YOU?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-slate-400 text-sm sm:text-base">
            Let's find out how much of 19 November is still living rent-free in your head.
          </p>
        </div>

        {/* Assessment Card Container */}
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
          {!currentResult ? (
            /* Quiz Active State */
            <div>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-bold tracking-wider uppercase mb-2">
                  <span className="text-sky-400">
                    Question {currentIndex + 1} of {TRAUMA_QUESTIONS.length}
                  </span>
                  <span className="text-slate-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-red-500 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / TRAUMA_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Context & Prompt */}
              <div className="mb-8">
                {currentQ.context && (
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    {currentQ.context}
                  </span>
                )}
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight">
                  {currentQ.question}
                </h3>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = currentAnswerId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'bg-sky-500/15 border-sky-400 text-white shadow-lg shadow-sky-500/20'
                          : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-600 hover:bg-slate-800/70 text-slate-200'
                      }`}
                    >
                      <div className="pr-4">
                        <div className="font-display font-bold text-base sm:text-lg group-hover:text-white transition-colors">
                          {opt.text}
                        </div>
                        {opt.subtext && (
                          <div className="text-xs text-slate-400 mt-1 font-normal">
                            {opt.subtext}
                          </div>
                        )}
                      </div>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-colors ${
                        isSelected 
                          ? 'bg-sky-500 border-sky-400 text-white' 
                          : 'border-slate-700 text-slate-400 group-hover:border-sky-400 group-hover:text-sky-400'
                      }`}>
                        {isSelected ? <Check className="w-4 h-4" /> : String.fromCharCode(65 + oIdx)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls: Back & Continue */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                {currentIndex > 0 ? (
                  <button
                    onClick={handlePrevious}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  disabled={!currentAnswerId}
                  onClick={handleContinue}
                  className={`px-7 py-3 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    currentAnswerId
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-slate-800/50 text-slate-500 border border-slate-800 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>{currentIndex === TRAUMA_QUESTIONS.length - 1 ? 'See Diagnosis' : 'Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="animate-in fade-in duration-300">
              <div className="text-center pb-6 border-b border-slate-800">
                <div
                  className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4"
                  style={{
                    backgroundColor: `${currentResult.color}15`,
                    color: currentResult.color,
                    border: `1px solid ${currentResult.color}40`,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>OFFICIAL TRAUMA DIAGNOSIS</span>
                </div>

                <div
                  className="font-display font-black text-6xl sm:text-8xl tracking-tight my-2"
                  style={{ color: currentResult.color }}
                >
                  {currentResult.score}%
                </div>

                <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-wide">
                  {currentResult.band}
                </h3>
                <p className="text-slate-400 text-sm font-semibold mt-1">
                  {currentResult.title}
                </p>
              </div>

              {/* Diagnosis Body */}
              <div className="my-8 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    CLINICAL OBSERVATION:
                  </span>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                    "{currentResult.diagnosis}"
                  </p>
                </div>

                <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    RECOMMENDED CRICKET THERAPY:
                  </span>
                  <p className="text-amber-200 text-xs sm:text-sm leading-relaxed">
                    {currentResult.prescription}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Retake & Download */}
              <div className="flex flex-wrap items-center gap-3 justify-center mb-8">
                <button
                  onClick={handleDownloadCard}
                  disabled={isDownloading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-sky-500/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? 'Generating...' : 'Download Result Card (PNG)'}</span>
                </button>

                <button
                  onClick={handleRetake}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-700 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Test</span>
                </button>
              </div>

              {/* Social Sharing Suite */}
              <div className="pt-6 border-t border-slate-800 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-3">
                  Share Your Trauma With Fellow Sufferers:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    onClick={() => {
                      onPlayClick();
                      openWhatsAppShare(shareText);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      onPlayClick();
                      openTwitterShare(shareText);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <XIcon className="w-4 h-4 text-sky-400" />
                    <span>Post on X</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied Link!' : 'Copy Result'}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
