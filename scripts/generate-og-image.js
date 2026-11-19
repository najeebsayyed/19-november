import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Ensure public/images directory exists
const imagesDir = path.join(rootDir, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate stars / flashlights for the 130,000 crowd
const flashlightDots = [];
for (let i = 0; i < 90; i++) {
  const x = Math.floor(10 + Math.random() * 1180);
  const y = Math.floor(520 + Math.random() * 95);
  const r = (Math.random() * 1.5 + 0.8).toFixed(1);
  const opacity = (Math.random() * 0.7 + 0.3).toFixed(2);
  const color = Math.random() > 0.4 ? '#ffffff' : (Math.random() > 0.5 ? '#38bdf8' : '#fef08a');
  flashlightDots.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}" />`);
}

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>19 November OG Image</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Space+Grotesk:wght@700;800;900&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: #020617;
      font-family: 'Space Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      position: relative;
    }

    .stadium-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 1200px;
      height: 630px;
      z-index: 1;
    }

    .content {
      position: relative;
      z-index: 10;
      width: 1200px;
      height: 630px;
      padding: 38px 48px 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
    }

    .tricolor-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #ff9933 0%, #ffffff 50%, #138808 100%);
      box-shadow: 0 0 20px rgba(255, 153, 51, 0.6);
      z-index: 20;
    }

    .top-badge {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 8px 24px;
      border-radius: 9999px;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(56, 189, 248, 0.5);
      box-shadow: 0 0 25px rgba(2, 132, 199, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }

    .top-badge .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #ef4444;
      box-shadow: 0 0 10px #ef4444;
      animation: pulse 2s infinite;
    }

    .top-badge span {
      color: #38bdf8;
      font-size: 13.5px;
      font-weight: 800;
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    .hero-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: -4px;
    }

    .title-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    .main-title {
      font-size: 92px;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -2px;
      background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 50%, #38bdf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 6px 24px rgba(2, 132, 199, 0.45));
    }

    .crying-tear-svg {
      width: 78px;
      height: 78px;
      filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.6));
    }

    .supporting-title {
      margin-top: 10px;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #f87171;
      text-shadow: 0 0 25px rgba(239, 68, 68, 0.5);
    }

    .scoreboard-card {
      margin-top: 14px;
      width: 820px;
      background: rgba(10, 15, 30, 0.9);
      border: 1px solid rgba(51, 65, 85, 0.85);
      border-radius: 20px;
      padding: 16px 36px 14px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(14, 165, 233, 0.18);
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }

    .scoreboard-side {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .scoreboard-side.india {
      border-right: 1px dashed rgba(71, 85, 105, 0.7);
      padding-right: 24px;
    }

    .scoreboard-side.aus {
      padding-left: 24px;
    }

    .team-badge-row {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .team-flag-disc {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.3);
      flex-shrink: 0;
    }

    .team-label {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 2.5px;
      color: #cbd5e1;
    }

    .team-score {
      margin-top: 4px;
      font-size: 38px;
      font-weight: 900;
      display: flex;
      align-items: baseline;
      gap: 10px;
    }

    .team-score.ind-score {
      color: #38bdf8;
    }

    .team-score.aus-score {
      color: #fbbf24;
    }

    .score-sub {
      font-size: 16px;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 1px;
    }

    .venue-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #1e293b;
      border: 1px solid #475569;
      border-radius: 9999px;
      padding: 3px 18px;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 2px;
      color: #e2e8f0;
      text-transform: uppercase;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    }

    .bottom-features {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .feature-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      border-radius: 12px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(71, 85, 105, 0.6);
      color: #e2e8f0;
      font-size: 13.5px;
      font-weight: 700;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    .feature-pill svg {
      width: 17px;
      height: 17px;
    }

    .ball-graphic {
      position: absolute;
      right: 70px;
      top: 60px;
      width: 115px;
      height: 115px;
      z-index: 30;
      filter: drop-shadow(0 0 30px rgba(239, 68, 68, 0.55));
      opacity: 0.95;
    }
  </style>
</head>
<body>
  <!-- Indian Tricolor Header Accent -->
  <div class="tricolor-bar"></div>

  <!-- Stadium Lighting & Atmosphere SVG Background -->
  <svg class="stadium-bg" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep Night Sky Gradient -->
      <radialGradient id="skyGrad" cx="50%" cy="20%" r="80%">
        <stop offset="0%" stop-color="#0e244d" />
        <stop offset="40%" stop-color="#081329" />
        <stop offset="100%" stop-color="#020617" />
      </radialGradient>

      <!-- Stadium Left Floodlight Cones (India Cricket Blue) -->
      <linearGradient id="floodLeft1" x1="0%" y1="0%" x2="55%" y2="85%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.38" />
        <stop offset="60%" stop-color="#0284c7" stop-opacity="0.10" />
        <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
      </linearGradient>
      
      <linearGradient id="floodLeft2" x1="5%" y1="0%" x2="42%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55" />
        <stop offset="35%" stop-color="#38bdf8" stop-opacity="0.20" />
        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
      </linearGradient>

      <!-- Stadium Right Floodlight Cones (Golden Championship Light) -->
      <linearGradient id="floodRight1" x1="100%" y1="0%" x2="45%" y2="85%">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.30" />
        <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
      </linearGradient>

      <!-- Center Ambient Glow -->
      <radialGradient id="centerGlow" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#0369a1" stop-opacity="0.25" />
        <stop offset="60%" stop-color="#0284c7" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#020617" stop-opacity="0" />
      </radialGradient>

      <!-- Crowd Silhouette Gradient -->
      <linearGradient id="crowdGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b" stop-opacity="0.85" />
        <stop offset="45%" stop-color="#0f172a" stop-opacity="0.98" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
    </defs>

    <!-- Sky Background -->
    <rect width="1200" height="630" fill="url(#skyGrad)" />
    <rect width="1200" height="630" fill="url(#centerGlow)" />

    <!-- Left Floodlight Cones -->
    <polygon points="40,20 640,630 180,630" fill="url(#floodLeft1)" />
    <polygon points="50,20 440,630 250,630" fill="url(#floodLeft2)" />

    <!-- Right Floodlight Cones -->
    <polygon points="1160,20 560,630 1020,630" fill="url(#floodRight1)" />

    <!-- Floodlight Tower Top Fixtures -->
    <!-- Left Tower -->
    <line x1="16" y1="20" x2="74" y2="20" stroke="#475569" stroke-width="5" stroke-linecap="round" />
    <circle cx="26" cy="20" r="8" fill="#ffffff" filter="drop-shadow(0 0 15px #38bdf8)" />
    <circle cx="45" cy="20" r="8" fill="#ffffff" filter="drop-shadow(0 0 15px #38bdf8)" />
    <circle cx="64" cy="20" r="8" fill="#ffffff" filter="drop-shadow(0 0 15px #38bdf8)" />

    <!-- Right Tower -->
    <line x1="1126" y1="20" x2="1184" y2="20" stroke="#475569" stroke-width="5" stroke-linecap="round" />
    <circle cx="1136" cy="20" r="8" fill="#ffffff" filter="drop-shadow(0 0 15px #fbbf24)" />
    <circle cx="1155" cy="20" r="8" fill="#ffffff" filter="drop-shadow(0 0 15px #fbbf24)" />
    <circle cx="1174" cy="20" r="8" fill="#ffffff" filter="drop-shadow(0 0 15px #fbbf24)" />

    <!-- Stadium Architecture Arches -->
    <path d="M 0 150 Q 600 70 1200 150" stroke="#334155" stroke-width="2.5" opacity="0.4" fill="none" />
    <path d="M 0 190 Q 600 105 1200 190" stroke="#1e293b" stroke-width="2" opacity="0.5" fill="none" />

    <!-- Stadium Stands & Crowd Silhouette -->
    <!-- Back tier crowd -->
    <path d="M 0 525 Q 180 505 360 518 T 720 512 T 1080 518 Q 1150 522 1200 530 L 1200 630 L 0 630 Z" fill="url(#crowdGrad)" />

    <!-- Flashlight Dots for 130,000 Fans -->
    <g class="flashlights">
      ${flashlightDots.join('\n      ')}
    </g>

    <!-- Front tier crowd with individual fan heads & raised hands -->
    <path d="M 0 565 
             Q 40 558 80 562 Q 120 556 160 561 Q 200 555 240 560
             Q 280 554 320 561 Q 360 555 400 560 Q 440 553 480 559
             Q 520 554 560 560 Q 600 552 640 559 Q 680 554 720 560
             Q 760 553 800 559 Q 840 555 880 561 Q 920 554 960 560
             Q 1000 556 1040 562 Q 1080 554 1120 560 Q 1160 556 1200 564 
             L 1200 630 L 0 630 Z" fill="#020617" opacity="0.97" />

    <!-- Stadium Rim Lighting -->
    <path d="M 0 562 Q 600 530 1200 562" stroke="#38bdf8" stroke-width="1.8" stroke-opacity="0.35" fill="none" />
  </svg>

  <!-- Cricket Ball Graphic in top right -->
  <svg class="ball-graphic" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ogBallGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#f87171" />
        <stop offset="45%" stop-color="#dc2626" />
        <stop offset="100%" stop-color="#7f1d1d" />
      </radialGradient>
      <filter id="ballOuterGlow">
        <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#ef4444" flood-opacity="0.55"/>
      </filter>
    </defs>
    <!-- Cricket Ball Body -->
    <circle cx="50" cy="50" r="42" fill="url(#ogBallGrad)" filter="url(#ballOuterGlow)" />
    <!-- Heartbreak Seam Zigzag -->
    <path d="M 50 8 C 55 20, 44 28, 52 38 L 46 50 L 55 62 L 46 74 C 53 82, 48 88, 50 92" 
          stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Yellow Seam Stitches -->
    <path d="M 44 16 L 53 19 M 42 27 L 51 30 M 47 36 L 56 39 M 41 46 L 50 49 M 50 57 L 59 60 M 42 67 L 51 70 M 48 76 L 57 79 M 43 85 L 52 88" 
          stroke="#fef08a" stroke-width="2.5" stroke-linecap="round" />
    <!-- Glowing Blue Cricket Tear Drop -->
    <path d="M 68 30 C 68 30, 80 44, 80 52 C 80 58.6 74.6 64 68 64 C 61.4 64 56 58.6 56 52 C 56 44, 68 30, 68 30 Z" 
          fill="#38bdf8" stroke="#ffffff" stroke-width="1.8" filter="drop-shadow(0 0 12px #38bdf8)" />
  </svg>

  <!-- Foreground Content -->
  <div class="content">
    <!-- Top Badge -->
    <div class="top-badge">
      <div class="dot"></div>
      <span>THE INDIAN CRICKET FANS' TRAUMA CENTER</span>
    </div>

    <!-- Hero Title & Subheading -->
    <div class="hero-area">
      <div class="title-row">
        <h1 class="main-title">19 NOVEMBER</h1>
        <!-- Custom high-res crying face SVG for cross-platform perfection -->
        <svg class="crying-tear-svg" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="36" cy="36" r="34" fill="#fbbf24" stroke="#f59e0b" stroke-width="2" />
          <!-- Sad closed curved eyes -->
          <path d="M 20 28 Q 26 22 32 28" stroke="#78350f" stroke-width="3.5" stroke-linecap="round" fill="none" />
          <path d="M 40 28 Q 46 22 52 28" stroke="#78350f" stroke-width="3.5" stroke-linecap="round" fill="none" />
          <!-- Big open crying mouth -->
          <ellipse cx="36" cy="48" rx="13" ry="12" fill="#78350f" />
          <!-- Big waterfall tears flowing down -->
          <path d="M 23 31 C 23 31 16 46 16 54 C 16 60 21 65 26 65 C 31 65 34 60 34 54 C 34 46 27 31 27 31 Z" fill="#38bdf8" />
          <path d="M 49 31 C 49 31 42 46 42 54 C 42 60 47 65 52 65 C 57 65 60 60 60 54 C 60 46 53 31 53 31 Z" fill="#38bdf8" />
        </svg>
      </div>

      <div class="supporting-title">
        10 WINS. 1 FINAL. STILL NOT RECOVERED.
      </div>
    </div>

    <!-- Official Scoreboard Graphic -->
    <div class="scoreboard-card">
      <div class="venue-badge">AHMEDABAD • 19 NOVEMBER 2023</div>

      <!-- India Side -->
      <div class="scoreboard-side india">
        <div class="team-badge-row">
          <!-- Indian Tricolor Disc SVG -->
          <svg class="team-flag-disc" viewBox="0 0 32 32">
            <rect width="32" height="10.6" fill="#ff9933" />
            <rect y="10.6" width="32" height="10.7" fill="#ffffff" />
            <rect y="21.3" width="32" height="10.7" fill="#138808" />
            <circle cx="16" cy="16" r="4" fill="none" stroke="#000080" stroke-width="1" />
          </svg>
          <span class="team-label">INDIA</span>
        </div>
        <div class="team-score ind-score">
          <span>240</span>
          <span class="score-sub">ALL OUT (50.0)</span>
        </div>
      </div>

      <!-- Australia Side -->
      <div class="scoreboard-side aus">
        <div class="team-badge-row">
          <!-- Australia Green/Gold/Blue Disc SVG -->
          <svg class="team-flag-disc" viewBox="0 0 32 32">
            <rect width="32" height="32" fill="#002b7f" />
            <path d="M0 0 L16 16 M16 0 L0 16" stroke="#ffffff" stroke-width="2" />
            <circle cx="22" cy="10" r="1.5" fill="#ffffff" />
            <circle cx="25" cy="18" r="1.5" fill="#ffffff" />
            <circle cx="20" cy="24" r="1.5" fill="#ffffff" />
            <circle cx="10" cy="22" r="2.5" fill="#ffffff" />
          </svg>
          <span class="team-label">AUSTRALIA</span>
        </div>
        <div class="team-score aus-score">
          <span>241/4</span>
          <span class="score-sub">(43.0 OV)</span>
        </div>
      </div>
    </div>

    <!-- Bottom Feature Pills -->
    <div class="bottom-features">
      <div class="feature-pill">
        <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
        <span>Trauma Assessment</span>
      </div>

      <div class="feature-pill">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>Memory Quiz</span>
      </div>

      <div class="feature-pill">
        <svg viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
        <span>Meme Generator</span>
      </div>

      <div class="feature-pill">
        <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
        <span>Healing Meter</span>
      </div>
    </div>
  </div>
</body>
</html>
`;

const tempHtmlPath = path.join(rootDir, 'scripts', 'temp-og.html');
fs.writeFileSync(tempHtmlPath, htmlTemplate, 'utf8');

const outputOgPng = path.join(imagesDir, 'og-image.png');
const rootOgPng = path.join(rootDir, 'public', 'og-image.png');

console.log('Rendering refined 1200x630 OG image via Headless Chrome...');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const command = `"${chromePath}" --headless --disable-gpu --window-size=1200,630 --hide-scrollbars --screenshot="${outputOgPng}" "file://${tempHtmlPath.replace(/\\/g, '/')}"`;

try {
  execSync(command, { stdio: 'inherit' });
  
  // Also copy to public/og-image.png as mirror
  fs.copyFileSync(outputOgPng, rootOgPng);

  // Clean up temp file
  fs.unlinkSync(tempHtmlPath);

  const stats = fs.statSync(outputOgPng);
  const buf = fs.readFileSync(outputOgPng);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);

  console.log(`✅ Successfully generated refined OG Image!`);
  console.log(`Path: ${outputOgPng}`);
  console.log(`Mirror: ${rootOgPng}`);
  console.log(`Dimensions: ${width}x${height}px`);
  console.log(`File size: ${(stats.size / 1024).toFixed(1)} KB`);
} catch (err) {
  console.error('Error generating OG image:', err);
  process.exit(1);
}
