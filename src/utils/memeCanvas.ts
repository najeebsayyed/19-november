import type { MemeTemplate } from '../types';

export interface MemeRenderOptions {
  template: MemeTemplate;
  topText: string;
  bottomText: string;
  fontSize?: number;
}

// Wrap text within max width
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

export function drawMemeOnCanvas(
  canvas: HTMLCanvasElement,
  options: MemeRenderOptions
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // 1. Draw Template-Specific Illustration
  drawTemplateArtwork(ctx, width, height, options.template);

  // 2. Draw Top Text
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  const baseFontSize = options.fontSize || Math.floor(width * 0.052);
  ctx.font = `900 ${baseFontSize}px 'Space Grotesk', Impact, -apple-system, sans-serif`;
  ctx.lineWidth = Math.max(4, Math.floor(baseFontSize * 0.16));
  ctx.lineJoin = 'round';
  ctx.shadowColor = 'rgba(0,0,0,0.85)';
  ctx.shadowBlur = 10;

  const maxTextWidth = width * 0.90;

  if (options.topText.trim()) {
    const topLines = wrapText(ctx, options.topText.toUpperCase(), maxTextWidth);
    const lineHeight = baseFontSize * 1.15;
    const startY = 32;

    topLines.forEach((line, index) => {
      const y = startY + index * lineHeight;
      ctx.strokeText(line, width / 2, y);
      ctx.fillText(line, width / 2, y);
    });
  }

  // 3. Draw Bottom Text
  if (options.bottomText.trim()) {
    ctx.textBaseline = 'bottom';
    const bottomLines = wrapText(ctx, options.bottomText.toUpperCase(), maxTextWidth);
    const lineHeight = baseFontSize * 1.15;
    const totalBottomHeight = bottomLines.length * lineHeight;
    const startY = height - 52 - totalBottomHeight;

    bottomLines.forEach((line, index) => {
      const y = startY + (index + 1) * lineHeight;
      ctx.strokeText(line, width / 2, y);
      ctx.fillText(line, width / 2, y);
    });
  }
  ctx.restore();

  // 4. Draw Official Watermark Banner
  ctx.save();
  ctx.fillStyle = 'rgba(3, 7, 18, 0.90)';
  ctx.fillRect(0, height - 38, width, 38);

  ctx.fillStyle = '#38bdf8';
  ctx.font = "bold 13px 'Space Grotesk', -apple-system, sans-serif";
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('🏏 19 NOVEMBER — The Trauma Center', 20, height - 19);

  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'right';
  ctx.font = "12px 'Space Grotesk', sans-serif";
  ctx.fillText('10 WINS. 1 FINAL. STILL NOT RECOVERED.', width - 20, height - 19);
  ctx.restore();
}

// Procedural vector illustration for each meme theme
function drawTemplateArtwork(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  template: MemeTemplate
) {
  switch (template.illustrationType) {
    case 'dream_vs_nightmare': {
      // Background split: Left deep India Blue, Right Aussie Gold / Dark
      const gradL = ctx.createLinearGradient(0, 0, w / 2, h);
      gradL.addColorStop(0, '#0c4a6e');
      gradL.addColorStop(1, '#082f49');
      ctx.fillStyle = gradL;
      ctx.fillRect(0, 0, w / 2, h);

      const gradR = ctx.createLinearGradient(w / 2, 0, w, h);
      gradR.addColorStop(0, '#451a03');
      gradR.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = gradR;
      ctx.fillRect(w / 2, 0, w / 2, h);

      // Center divider lightning
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2 - 10, h * 0.35);
      ctx.lineTo(w / 2 + 15, h * 0.65);
      ctx.lineTo(w / 2, h);
      ctx.stroke();

      // Left Graphic: 10 Stars in golden wreath
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏆 10 - 0', w * 0.25, h * 0.45);
      ctx.font = '16px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#bae6fd';
      ctx.fillText('UNSTOPPABLE RUN', w * 0.25, h * 0.52);
      ctx.font = '54px sans-serif';
      ctx.fillText('🦁', w * 0.25, h * 0.33);

      // Right Graphic: Broken Heart & Travis Head mustache
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.fillText('💔 240 ALL OUT', w * 0.75, h * 0.45);
      ctx.font = '16px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#fde68a';
      ctx.fillText('137 RUN HEARTBREAK', w * 0.75, h * 0.52);
      ctx.font = '54px sans-serif';
      ctx.fillText('🦘', w * 0.75, h * 0.33);
      break;
    }

    case 'flashback': {
      // Dark red/black apocalyptic stadium
      const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.7);
      grad.addColorStop(0, '#450a0a');
      grad.addColorStop(0.6, '#180303');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Searchlight beams
      ctx.save();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w, h);
      ctx.moveTo(w, 0);
      ctx.lineTo(0, h);
      ctx.stroke();
      ctx.restore();

      // Giant Thousand-Yard Stare Eyes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(w * 0.38, h * 0.45, 45, 25, 0, 0, Math.PI * 2);
      ctx.ellipse(w * 0.62, h * 0.45, 45, 25, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pupils reflecting 240 / 241
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(w * 0.38, h * 0.45, 12, 0, Math.PI * 2);
      ctx.arc(w * 0.62, h * 0.45, 12, 0, Math.PI * 2);
      ctx.fill();

      // Flashing text
      ctx.font = 'bold 20px "Space Grotesk", monospace';
      ctx.fillStyle = '#fca5a5';
      ctx.textAlign = 'center';
      ctx.fillText('[ FLASHBACK DETECTED: 19-11-2023 ]', w / 2, h * 0.62);
      break;
    }

    case 'batting_collapse': {
      // Top half bright, bottom half desert/tumbleweed
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.5, '#1e293b');
      bgGrad.addColorStop(1, '#090d16');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Score line chart crashing down
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(w * 0.1, h * 0.35); // Rohit flying start
      ctx.lineTo(w * 0.3, h * 0.25); // 76/1
      ctx.lineTo(w * 0.38, h * 0.48); // 81/3
      ctx.lineTo(w * 0.7, h * 0.52); // slow crawl
      ctx.lineTo(w * 0.9, h * 0.72); // all out 240
      ctx.stroke();

      // Nodes on graph
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(w * 0.3, h * 0.25, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(w * 0.9, h * 0.72, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = 'bold 16px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#86efac';
      ctx.fillText('76/1 (Rohit Storm)', w * 0.3, h * 0.21);

      ctx.fillStyle = '#fca5a5';
      ctx.fillText('4 BOUNDARIES IN 40 OVERS', w * 0.6, h * 0.62);
      break;
    }

    case 'travis_head': {
      // Dark navy stadium background with Aussie gold halo
      const grad = ctx.createRadialGradient(w / 2, h * 0.45, 20, w / 2, h * 0.45, w * 0.5);
      grad.addColorStop(0, '#78350f');
      grad.addColorStop(0.8, '#090d16');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Travis Head Mustache silhouette & sunglasses
      ctx.fillStyle = '#fbbf24';
      ctx.font = '90px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🥸', w / 2, h * 0.42);

      // Yellow batting helmet badge
      ctx.font = 'bold 32px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#fef08a';
      ctx.fillText('HEAD 137 (120)', w / 2, h * 0.54);

      ctx.font = '14px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('130,000 FANS REDUCED TO ABSOLUTE SILENCE', w / 2, h * 0.61);
      break;
    }

    case 'before_after': {
      // Two panels
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(0, 0, w / 2, h);

      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(w / 2, 0, w / 2, h);

      // Separator
      ctx.fillStyle = '#334155';
      ctx.fillRect(w / 2 - 2, 0, 4, h);

      // Left: 2:00 PM
      ctx.font = '70px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🥳🇮🇳', w * 0.25, h * 0.38);
      ctx.font = 'bold 22px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#6ee7b7';
      ctx.fillText('2:00 PM', w * 0.25, h * 0.5);
      ctx.font = '14px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#d1fae5';
      ctx.fillText('"Cup is coming home!"', w * 0.25, h * 0.56);

      // Right: 10:00 PM
      ctx.font = '70px sans-serif';
      ctx.fillText('🧎‍♂️🌧️', w * 0.75, h * 0.38);
      ctx.font = 'bold 22px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#c4b5fd';
      ctx.fillText('10:00 PM', w * 0.75, h * 0.5);
      ctx.font = '14px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#e0e7ff';
      ctx.fillText('"I am not turning on lights tonight"', w * 0.75, h * 0.56);
      break;
    }

    case 'scriptwriter': {
      // Script paper background
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Clipboard / document frame
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.roundRect(w * 0.15, h * 0.22, w * 0.7, h * 0.5, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('SCENE: WORLD CUP FINAL 2023', w * 0.2, h * 0.3);
      ctx.font = '14px monospace';
      ctx.fillText('INDIA: 10 WINS IN A ROW', w * 0.2, h * 0.36);
      ctx.fillText('FANS: CELEBRATION MODE ON', w * 0.2, h * 0.41);
      ctx.fillText('AUSTRALIA: "HOLD OUR FLAT WHITES"', w * 0.2, h * 0.46);

      // Big red REJECTED stamp
      ctx.save();
      ctx.translate(w * 0.55, h * 0.55);
      ctx.rotate(-0.18);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 4;
      ctx.strokeRect(-120, -25, 240, 50);
      ctx.fillStyle = '#ef4444';
      ctx.font = '900 24px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SPOILED BY CUMMINS', 0, 0);
      ctx.restore();
      break;
    }
  }
}

export function downloadMemeImage(canvas: HTMLCanvasElement, filename: string = '19-november-trauma-meme.png'): boolean {
  try {
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Download failed:', err);
    return false;
  }
}

export function getMemeBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
  });
}
