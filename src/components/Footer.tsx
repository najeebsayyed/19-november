import { Heart, ArrowUp, ShieldAlert, Globe } from 'lucide-react';
import { XIcon } from './Icons';

interface FooterProps {
  onPlayClick: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = ({ onPlayClick }: FooterProps) => {
  const scrollToTop = () => {
    onPlayClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#02050e] py-14 px-4 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Brand identity in footer */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-sky-500 p-[2px]">
            <div className="w-full h-full bg-[#030712] rounded-full flex items-center justify-center text-sm">
              🏏
            </div>
          </div>
          <span className="font-display font-black text-lg tracking-wider text-white">
            19 NOVEMBER
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
            EST. 19-11-2023
          </span>
        </div>

        {/* Humorous and Relatable Tribute Disclaimer */}
        <div className="max-w-2xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 mb-8 text-xs text-slate-400 leading-relaxed">
          <div className="flex items-center justify-center gap-1.5 text-slate-300 font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Parody & Fan Therapy Notice</span>
          </div>
          <p>
            This website is an unofficial, humorous fan-art tribute created by Indian cricket fans for Indian cricket fans to cope with the 19 November 2023 ICC Men's Cricket World Cup final. We celebrate the historic 10-match undefeated run, respect Australia's clinical victory, and believe laughter is the best therapy. Not affiliated with, authorized, or endorsed by the BCCI, ICC, Cricket Australia, or any official sports board.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400 mb-8">
          <a href="#story" onClick={onPlayClick} className="hover:text-sky-400 transition-colors">Match Memories</a>
          <a href="#assessment" onClick={onPlayClick} className="hover:text-sky-400 transition-colors">Trauma Test</a>
          <a href="#quiz" onClick={onPlayClick} className="hover:text-sky-400 transition-colors">Memory Quiz</a>
          <a href="#memes" onClick={onPlayClick} className="hover:text-sky-400 transition-colors">Meme Generator</a>
          <a href="#healing" onClick={onPlayClick} className="hover:text-sky-400 transition-colors">Healing Meter</a>
          <a href="#achievements" onClick={onPlayClick} className="hover:text-sky-400 transition-colors">Achievements</a>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="mb-8 p-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
          aria-label="Back to top"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* Tasteful Developer Attribution */}
        <div className="w-full max-w-xl py-6 mb-6 border-t border-b border-slate-800/80 flex flex-col items-center">
          <div className="text-sm font-semibold text-slate-200 flex items-center gap-1.5 mb-1.5">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline-block animate-pulse" />
            <span>by</span>
            <a 
              href="https://najeebsayyed.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors"
            >
              Najeeb Sayyed
            </a>
          </div>

          <p className="text-xs text-slate-400 italic mb-4">
            "Built for every Indian cricket fan who still remembers 19 November."
          </p>

          {/* Social Profiles & Website */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href="https://najeebsayyed.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white transition-all font-medium"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>My Website</span>
            </a>

            <a
              href="https://x.com/iNajeebSayyed"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white transition-all font-medium"
            >
              <XIcon className="w-3.5 h-3.5 text-slate-300" />
              <span>X (Twitter)</span>
            </a>
          </div>
        </div>

        {/* Creator tagline */}
        <div className="text-xs text-slate-500">
          <span>Created with tears, chai, and unending love for Indian cricket. © {CURRENT_YEAR}</span>
        </div>
      </div>
    </footer>
  );
};
