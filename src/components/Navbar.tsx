import { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Award,
  HeartCrack,
  Flame
} from 'lucide-react';
import type { LocalProgressV1 } from '../types';

interface NavbarProps {
  progress: LocalProgressV1;
  onToggleSound: () => void;
  onPlayClick: () => void;
}

export const Navbar = ({
  progress,
  onToggleSound,
  onPlayClick,
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Match', href: '#story' },
    { label: 'Trauma Test', href: '#assessment' },
    { label: 'Memory Quiz', href: '#quiz' },
    { label: 'Meme Therapy', href: '#memes' },
    { label: 'Healing Meter', href: '#healing' },
    { label: 'Badges', href: '#achievements' },
  ];

  const unlockedCount = (progress.achievements || []).length;

  const handleNavClick = (href: string) => {
    onPlayClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-sky-500 p-[2px] shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090d16] rounded-full flex items-center justify-center">
              <span className="text-xl">🏏</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[10px] text-white font-black animate-pulse">
              💔
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-lg tracking-wider text-white">
                19 NOVEMBER
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30 font-semibold tracking-wide uppercase">
                Trauma Center
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">10 Wins. 1 Final. Still Coping.</p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800/80 backdrop-blur-sm">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Unlocked Badges Counter */}
          <button
            onClick={() => handleNavClick('#achievements')}
            title="Your Trauma Achievements"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition-all cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{unlockedCount}/6</span>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={onToggleSound}
            title={progress.soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="p-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-sky-400 hover:border-sky-500/50 transition-all cursor-pointer"
            aria-label="Toggle sound"
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-sky-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Trauma Assessment Quick CTA */}
          <button
            onClick={() => handleNavClick('#assessment')}
            className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-black tracking-wide uppercase shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all cursor-pointer"
          >
            <HeartCrack className="w-3.5 h-3.5" />
            <span>Check Trauma</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800/80 hover:text-sky-400 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-xs text-slate-500">→</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Therapy Badges:</span>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> {unlockedCount} / 6 Unlocked
            </span>
          </div>
          <button
            onClick={() => handleNavClick('#assessment')}
            className="w-full mt-2 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4" /> Take Trauma Assessment
          </button>
        </div>
      )}
    </header>
  );
};
