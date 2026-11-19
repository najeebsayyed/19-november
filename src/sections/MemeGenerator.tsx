import React, { useState, useEffect, useRef } from 'react';
import { MEME_TEMPLATES } from '../data/memeTemplates';
import type { MemeTemplate } from '../types';
import { 
  drawMemeOnCanvas, 
  downloadMemeImage, 
  getMemeBlob 
} from '../utils/memeCanvas';
import { 
  Image, 
  Download, 
  Share2, 
  RefreshCw, 
  Sparkles,
  Type,
  Sliders,
  Check,
  MessageCircle
} from 'lucide-react';
import { XIcon } from '../components/Icons';
import { openWhatsAppShare, openTwitterShare, shareContent } from '../utils/sharing';
import confetti from 'canvas-confetti';

interface MemeGeneratorProps {
  onMemeGenerated: () => void;
  onPlayClick: () => void;
  onPlayCelebration: () => void;
}

export const MemeGenerator: React.FC<MemeGeneratorProps> = ({
  onMemeGenerated,
  onPlayClick,
  onPlayCelebration,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate>(MEME_TEMPLATES[0]);
  const [topText, setTopText] = useState<string>(MEME_TEMPLATES[0].defaultTopText);
  const [bottomText, setBottomText] = useState<string>(MEME_TEMPLATES[0].defaultBottomText);
  const [fontSize, setFontSize] = useState<number>(34);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [sharedToast, setSharedToast] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Redraw canvas whenever template, text, or fontSize changes
  useEffect(() => {
    if (!canvasRef.current) return;
    drawMemeOnCanvas(canvasRef.current, {
      template: selectedTemplate,
      topText,
      bottomText,
      fontSize,
    });
  }, [selectedTemplate, topText, bottomText, fontSize]);

  const handleTemplateSelect = (template: MemeTemplate) => {
    onPlayClick();
    setSelectedTemplate(template);
    setTopText(template.defaultTopText);
    setBottomText(template.defaultBottomText);
  };

  const handleResetDefaults = () => {
    onPlayClick();
    setTopText(selectedTemplate.defaultTopText);
    setBottomText(selectedTemplate.defaultBottomText);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    onPlayClick();
    setIsDownloading(true);

    try {
      const filename = `19-nov-meme-${selectedTemplate.id}.png`;
      const ok = downloadMemeImage(canvasRef.current, filename);
      if (ok) {
        onMemeGenerated();
        onPlayCelebration();
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch {
          // ignore
        }
      }
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handleNativeShare = async () => {
    if (!canvasRef.current) return;
    onPlayClick();
    const blob = await getMemeBlob(canvasRef.current);
    const shareText = `Made this coping meme on the 19 November Trauma Center 😭🏏: "${topText} - ${bottomText}"`;

    const res = await shareContent({
      title: "19 November Trauma Meme",
      text: shareText,
      blob: blob || undefined,
    });

    if (res.success) {
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 2500);
    }
  };

  return (
    <section id="memes" className="py-24 px-4 relative overflow-hidden bg-[#030712]">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/80 text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Image className="w-3.5 h-3.5" />
            <span>THERAPEUTIC MEME LAB</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
            LAUGHTER IS THE ONLY THERAPY
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-slate-400 text-sm sm:text-base">
            Craft your own 19 November coping memes. Download as real PNGs or share straight to social media.
          </p>
        </div>

        {/* Template Selector Carousel / Grid */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select A Trauma Template ({MEME_TEMPLATES.length} Available):
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {MEME_TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => handleTemplateSelect(tpl)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 group relative overflow-hidden ${
                  selectedTemplate.id === tpl.id
                    ? 'bg-slate-800/90 border-sky-400 shadow-lg shadow-sky-500/20 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 truncate">
                    {tpl.tag}
                  </span>
                  {selectedTemplate.id === tpl.id && (
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                  )}
                </div>

                <div className="font-display font-bold text-xs text-white line-clamp-2 mt-auto">
                  {tpl.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Studio Workspace: Canvas Preview + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Canvas Preview */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-[560px] bg-slate-950 border border-slate-800 rounded-3xl p-3 sm:p-4 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800/80 mb-3 text-xs text-slate-400">
                <span className="font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  CANVAS LIVE PREVIEW
                </span>
                <span className="font-mono text-[11px] text-slate-500">650 × 650 HIGH-DPI</span>
              </div>

              {/* The Real Canvas Element */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-black shadow-inner flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={650}
                  height={650}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Instant Actions Under Preview */}
              <div className="mt-4 flex flex-wrap items-center gap-3 justify-center sm:justify-between px-2">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex-1 min-w-[180px] py-3 px-5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? 'Exporting PNG...' : 'Download PNG'}</span>
                </button>

                <button
                  onClick={handleNativeShare}
                  className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-700 flex items-center gap-2 cursor-pointer transition-all"
                >
                  {sharedToast ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{sharedToast ? 'Shared!' : 'Share Meme'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Customization Controls */}
          <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-sky-400" />
                <span className="font-display font-bold text-sm uppercase tracking-wider text-white">
                  Meme Customizer
                </span>
              </div>
              <button
                onClick={handleResetDefaults}
                className="text-xs text-slate-400 hover:text-sky-400 flex items-center gap-1 cursor-pointer transition-colors"
                title="Reset to template defaults"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Text</span>
              </button>
            </div>

            {/* Top Text Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Top Caption:
              </label>
              <textarea
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                rows={2}
                placeholder="Enter top caption..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors font-medium"
              />
            </div>

            {/* Bottom Text Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Bottom Caption:
              </label>
              <textarea
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                rows={2}
                placeholder="Enter bottom caption..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors font-medium"
              />
            </div>

            {/* Font Size Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" /> Text Size
                </span>
                <span className="font-mono text-sky-400">{fontSize}px</span>
              </div>
              <input
                type="range"
                min={22}
                max={48}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* Quick Suggestions Pills */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Quick Coping Ideas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "10-0 is the real World Cup",
                  "Pat Cummins broke my heart",
                  "Boundary drought survivor",
                  "Why Travis Head why",
                  "Still not over 240",
                ].map((idea) => (
                  <button
                    key={idea}
                    onClick={() => {
                      onPlayClick();
                      setBottomText(idea.toUpperCase());
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 cursor-pointer transition-colors"
                  >
                    + "{idea}"
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Social Buttons for Memes */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Quick Share Channels:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onPlayClick();
                    openWhatsAppShare(`Look at this 19 November meme I made 😭🏏:\n"${topText} - ${bottomText}"`);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    onPlayClick();
                    openTwitterShare(`Coping with 19 November with memes:\n"${topText} - ${bottomText}"`);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <XIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Post on X</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
