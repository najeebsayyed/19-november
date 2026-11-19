import { useState } from 'react';
import { 
  Share2, 
  MessageCircle, 
  Copy, 
  Check, 
  HeartCrack
} from 'lucide-react';
import { XIcon } from './Icons';
import { openWhatsAppShare, openTwitterShare, shareContent, getShareUrl } from '../utils/sharing';

interface SocialCallToActionProps {
  onPlayClick: () => void;
}

export const SocialCallToAction = ({
  onPlayClick,
}: SocialCallToActionProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const defaultShareText = `I just visited the 19 November Indian Cricket Fans' Trauma Center 🇮🇳😭\n"10 wins. 1 final. Still not recovered."\n\nTake the trauma test & challenge your cricket memory:`;

  const handleCopyLink = async () => {
    onPlayClick();
    const res = await shareContent({
      title: "19 November — The Indian Cricket Fans' Trauma Center",
      text: defaultShareText,
    });
    if (res.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    onPlayClick();
    await shareContent({
      title: "19 November — The Indian Cricket Fans' Trauma Center",
      text: defaultShareText,
    });
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-[#030712] via-[#0b1224] to-[#030712]">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] bg-sky-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-800 text-sky-400 text-xs font-bold tracking-widest uppercase mb-4">
          <HeartCrack className="w-3.5 h-3.5" />
          <span>SPREAD THE HEALING</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          DON'T SUFFER IN SILENCE
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
          Send this to the friend who still turns off the television when someone mentions Pat Cummins, or your cricket group chat that went silent on 19 November 2023.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              onPlayClick();
              openWhatsAppShare(defaultShareText);
            }}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-sm tracking-wide shadow-xl shadow-emerald-600/25 flex items-center gap-2.5 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Share on WhatsApp</span>
          </button>

          <button
            onClick={() => {
              onPlayClick();
              openTwitterShare(defaultShareText);
            }}
            className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-sm tracking-wide border border-slate-700 shadow-xl flex items-center gap-2.5 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <XIcon className="w-4 h-4 text-sky-400" />
            <span>Post on X</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-display font-bold text-sm tracking-wide border border-slate-700 shadow-xl flex items-center gap-2.5 cursor-pointer transition-all"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-display font-bold text-sm tracking-wide shadow-xl shadow-sky-600/25 flex items-center gap-2.5 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <Share2 className="w-5 h-5" />
            <span>Share Anywhere</span>
          </button>
        </div>

        <div className="mt-8 text-xs text-slate-500 font-mono">
          OFFICIAL CANONICAL PORTAL: {getShareUrl()}
        </div>
      </div>
    </section>
  );
};
