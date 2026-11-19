// Centralized social sharing utilities

export const CANONICAL_PRODUCTION_URL = 'https://19novtrauma.vercel.app';

export function getShareUrl(): string {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    if (origin && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin + window.location.pathname;
    }
  }
  return CANONICAL_PRODUCTION_URL;
}

export interface ShareDataPayload {
  title: string;
  text: string;
  url?: string;
  blob?: Blob;
}

export async function shareContent(payload: ShareDataPayload): Promise<{ success: boolean; method: 'native' | 'clipboard' | 'fallback' }> {
  const url = payload.url || getShareUrl();
  const fullText = `${payload.text}\n\nCheck yours here: ${url}`;

  // 1. Try Native Web Share API first
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      if (payload.blob && navigator.canShare && navigator.canShare({ files: [new File([payload.blob], '19-november.png', { type: 'image/png' })] })) {
        const file = new File([payload.blob], '19-november.png', { type: 'image/png' });
        await navigator.share({
          title: payload.title,
          text: fullText,
          files: [file],
        });
        return { success: true, method: 'native' };
      }

      await navigator.share({
        title: payload.title,
        text: fullText,
        url: url,
      });
      return { success: true, method: 'native' };
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        // User voluntarily cancelled the share sheet
        return { success: false, method: 'native' };
      }
    }
  }

  // 2. Fallback: Copy to clipboard
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(fullText);
      return { success: true, method: 'clipboard' };
    }
  } catch {
    // clipboard access denied or unsupported
  }

  return { success: false, method: 'fallback' };
}

export function openWhatsAppShare(text: string, customUrl?: string) {
  const url = customUrl || getShareUrl();
  const message = `${text}\n\n${url}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

export function openTwitterShare(text: string, customUrl?: string) {
  const url = customUrl || getShareUrl();
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=19November,WorldCup2023,CricketTrauma`;
  window.open(twitterUrl, '_blank', 'noopener,noreferrer');
}
