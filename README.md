# 19 NOVEMBER — THE INDIAN CRICKET FANS' TRAUMA CENTER 🇮🇳😭

> **"10 wins. 1 final. 3 years. Still not recovered."**  
> *The official unofficial digital therapy and coping sanctuary for Indian cricket fans.*

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React 19](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🏏 Overview

On **19 November 2023**, the Indian cricket team marched into the ICC Men's Cricket World Cup final at the Narendra Modi Stadium in Ahmedabad with a flawless **10-0 undefeated streak**. 130,000 fans packed the world's largest cricket stadium in a vibrant sea of blue.

Then Travis Head, Pat Cummins, and the Australian cricket team intervened.

**19 NOVEMBER — The Trauma Center** is a high-performance, interactive, humorous, client-side web application designed to help Indian cricket fans laugh through the pain, test their historical knowledge, generate custom coping memes, measure their self-reported healing progress, and earn therapy badges.

---

## ✨ Features & Architecture

### 1. ⏱️ Live Heartbreak Elapsed Counter
- Dynamically computes the exact **Years, Months, Days, Hours, Minutes, and Seconds** elapsed since 19 November 2023 (`2023-11-19T00:00:00+05:30`) in **Asia/Kolkata (IST)** timezone.
- Isolated counter component (`ElapsedCounter.tsx`) preventing unnecessary re-renders of the hero section or application root.
- Authentic scoreboard display: **India 240 All Out** vs **Australia 241/4 (43.0 ov)**.

### 2. 📜 The Night We Don't Talk About (Interactive Timeline)
- Curated from a single centralized data module (`src/data/matchFacts.ts`):
  - 2:00 PM: Pat Cummins' promise to "silence 130,000 fans"
  - 3:15 PM: Rohit Sharma's flying 47 (31) blitz & Head's backwards catch
  - 4:30 PM: The middle-overs boundary drought (only 4 boundaries in 40 overs)
  - 5:45 PM: Bowled out for 240
  - 7:00 PM: Early hope at Australia 47/3
  - 9:45 PM: Travis Head's 137 off 120 balls & the Ahmedabad silence
- Interactive moment spotlight with synthesized audio effects.

### 3. 🩺 Trauma Assessment (Psychological Triage)
- 5 weighted, relatable multiple-choice questions assessing your emotional damage.
- Explicit "Continue" button flow on mobile preventing accidental skips.
- Categorizes you into 4 official therapy tiers:
  - `0–24%`: **SLIGHTLY TRAUMATIZED** (Zen Fan)
  - `25–49%`: **EMOTIONALLY WOUNDED** (Bandaged Heart)
  - `50–74%`: **PERMANENTLY DAMAGED** (Travis Head Phobia)
  - `75–100%`: **BEYOND RECOVERY** (Code Blue: Critical)
- Dynamic prescription & clinical commentary.
- Generates a **1200 × 630 downloadable PNG result card** via client-side canvas.
- Full sharing suite: WhatsApp, X (Twitter), Web Share API, and clipboard copy.

### 4. 🧠 Cricket Memory Quiz (10/10 Historical Exam)
- 10 historically verified questions randomized on every play.
- Evaluated using stable question IDs and option IDs (not display indices).
- Immediate visual and synthesized audio feedback on each answer with contextual trivia.
- Tracks personal best score in LocalStorage (`nov19:progress:v1`).
- Funny tiered diagnoses: *Certified 19/11 Historian*, *Veteran Witness*, *Selective Coping*, or *Protective Amnesia Champion*.

### 5. 🎨 Therapeutic Meme Generator
- 6 original canvas-drawn meme templates:
  1. *10 Wins, 1 Heartbreak* (Unstoppable Run vs Final Collapse)
  2. *When Someone Mentions 19 Nov* (The 1000-Yard Flashback Stare)
  3. *Trusting the Batting Lineup* (76/1 vs 240 all out)
  4. *Travis Head Enters The Chat* (130,000 Fans Reduced to Silence)
  5. *2:00 PM vs 10:00 PM* (The Mood Shift)
  6. *Who Wrote This Script?* (The Plot Twist)
- 100% client-side vector canvas drawing (immune to CORS taint & cross-origin failures).
- Real-time text preview, font-size adjustment, and quick-caption injection.
- One-click high-DPI **PNG download** and native **Web Share API** integration.

### 6. 💖 Self-Reported Healing Meter
- Interactive 0% to 100% emotional slider with dynamic, reactive commentary.
- **"DECLARE MY RECOVERY"** button triggering an audio-visual confetti celebration and saving progress to LocalStorage.
- Certified disclaimer: *"Medical accuracy: 0%. Emotional accuracy: questionable."*

### 7. 🏅 Trauma Achievements System
6 unlockable achievement badges stored persistently in `nov19:progress:v1`:
- `FIRST_DIAGNOSIS`: Completed the trauma assessment.
- `CRICKET_HISTORIAN`: Completed the 10-question memory quiz.
- `PERFECT_MEMORY`: Scored a flawless 10/10 in the memory quiz.
- `MEME_THERAPIST`: Generated and downloaded your first coping meme.
- `NEVER_FORGET_1911`: Checked in and completed at least one therapy activity.
- `STILL_STANDING`: Returned to the trauma center on a later local calendar day (`YYYY-MM-DD`).
- Live toast notification with victory fanfare sound when an achievement unlocks.
- Complete reset functionality for clearing local therapy records.

### 8. 🔊 Web Audio API Sound Synthesizer
- Built-in polyphonic audio synthesizer (bat strike, wicket drop, celebratory fanfare, achievement chime, clean UI click).
- Zero external audio files to fail, 404, or consume bandwidth.
- Sound toggle control with persistent state.

### 9. 📱 Mobile-First & Social Sharing
- Optimized for mobile viewports (320px, 360px, 390px, 430px, 768px, 1024px, 1440px).
- Direct **WhatsApp** share with formatted text & emoji.
- Direct **X (Twitter)** intent sharing.
- Native **Web Share API** with automatic clipboard copy fallback.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vite.dev/) with `@tailwindcss/vite` |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with custom stadium atmosphere |
| **Typography** | Space Grotesk (Headlines) & Plus Jakarta Sans (Body) |
| **Icons** | [Lucide React](https://lucide.react.dev/) + Custom SVG Icons |
| **Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Audio** | HTML5 Web Audio API Synthesizer |
| **Graphics** | HTML5 Canvas 2D API (Meme & Result Card generation) |
| **Persistence** | Versioned browser `localStorage` (`nov19:progress:v1`) |
| **Deployment** | [Vercel](https://vercel.com/) (Zero server dependencies) |

---

## 👨‍💻 Developer Attribution

**Made with ❤️ by Najeeb Sayyed**  
*"Built for every Indian cricket fan who still remembers 19 November."*

- **My Website:** [https://najeebsayyed.in](https://najeebsayyed.in)
- **X (Twitter):** [https://x.com/iNajeebSayyed](https://x.com/iNajeebSayyed)

---

## 🚀 Local Development

### Prerequisites
- Node.js `v18.0.0` or later (tested on Node `v24.20.0`)
- npm `v9.0.0` or later

### Installation

```bash
# 1. Clone repository
git clone https://github.com/your-username/19-november.git
cd 19-november

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Production Build

To test and build the production-ready distribution:

```bash
# Run TypeScript compilation and Vite build
npm run build

# Preview production build locally
npm run preview
```

The output bundle is generated in `dist/` with optimized chunk sizes and zero warnings.

---

## 🌐 Deploy to Vercel

This repository is pre-configured for instant deployment on Vercel with zero environment variables needed.

### Method 1: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel
```

### Method 2: Deploy with Git / GitHub

1. Initialize git and commit:
   ```bash
   git add .
   git commit -m "feat: complete 19 November Trauma Center application"
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your `19-november` repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **Deploy**.

`vercel.json` provides SPA routing rewrites and caching headers automatically.

---

## ⚖️ Legal & Parody Disclaimer

This website is a humorous, non-commercial parody and fan-tribute created by Indian cricket fans for entertainment and nostalgia. All match statistics and historical details are based on publicly available sporting records of the 2023 ICC Men's Cricket World Cup. This website is not endorsed by, sponsored by, or affiliated with the Board of Control for Cricket in India (BCCI), the International Cricket Council (ICC), Cricket Australia (CA), or any official cricket board or team.
