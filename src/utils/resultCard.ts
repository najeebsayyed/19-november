import type { TraumaResult } from '../types';

export function generateTraumaResultCardBlob(
  result: TraumaResult
): Promise<Blob | null> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(null);
      return;
    }

    const w = 1200;
    const h = 630;

    // 1. Dark Stadium Background
    const bg = ctx.createRadialGradient(w / 2, h * 0.25, 40, w / 2, h / 2, w * 0.7);
    bg.addColorStop(0, '#0f172a');
    bg.addColorStop(0.6, '#090d16');
    bg.addColorStop(1, '#020617');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Decorative blue/gold border
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    ctx.strokeStyle = result.color;
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, w - 40, h - 40);

    // 2. Top Header Pill
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 250, 40, 500, 36, 18);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🏏 THE UNOFFICIAL 19 NOVEMBER TRAUMA REPORT 🇮🇳', w / 2, 58);

    // 3. Trauma Score Gauge
    ctx.fillStyle = result.color;
    ctx.font = '900 84px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${result.score}%`, w / 2, 160);

    // Badge / Band Title
    ctx.fillStyle = '#f8fafc';
    ctx.font = '900 32px "Space Grotesk", sans-serif';
    ctx.fillText(result.band, w / 2, 220);

    // Subtitle / Title
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 18px "Space Grotesk", sans-serif';
    ctx.fillText(result.title, w / 2, 255);

    // 4. Score Progress Bar
    const barWidth = 600;
    const barHeight = 14;
    const barX = (w - barWidth) / 2;
    const barY = 280;

    // Track
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barWidth, barHeight, 7);
    ctx.fill();

    // Fill
    const fillWidth = Math.max(14, (barWidth * result.score) / 100);
    ctx.fillStyle = result.color;
    ctx.beginPath();
    ctx.roundRect(barX, barY, fillWidth, barHeight, 7);
    ctx.fill();

    // 5. Diagnosis Box
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(140, 320, 920, 160, 16);
    ctx.fill();
    ctx.stroke();

    // Diagnosis Text
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '19px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Wrap diagnosis
    const words = result.diagnosis.split(' ');
    let line1 = '';
    let line2 = '';
    words.forEach((w) => {
      if ((line1 + ' ' + w).length < 65) {
        line1 += (line1 ? ' ' : '') + w;
      } else {
        line2 += (line2 ? ' ' : '') + w;
      }
    });

    ctx.fillText(`"${line1}`, w / 2, 350);
    if (line2) {
      ctx.fillText(`${line2}"`, w / 2, 380);
    }

    // Prescription in Box
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'italic 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Rx Therapy: ${result.prescription.slice(0, 85)}...`, w / 2, 425);

    // 6. Scoreboard Reminder
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 15px "Space Grotesk", monospace';
    ctx.fillText('MATCH SUMMARY: IND 240 ALL OUT  •  AUS 241/4 (43 OV)  •  TRAVIS HEAD 137', w / 2, 515);

    // 7. Footer Seal & URL
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px "Space Grotesk", sans-serif';
    ctx.fillText('19 NOVEMBER TRAUMA CENTER • 10 WINS. 1 FINAL. NO RECOVERY.', w / 2, 570);

    canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
  });
}

export async function downloadTraumaResultCard(result: TraumaResult) {
  const blob = await generateTraumaResultCardBlob(result);
  if (!blob) return;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `19-nov-trauma-score-${result.score}pct.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
