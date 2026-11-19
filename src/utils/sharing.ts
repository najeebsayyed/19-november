// Social sharing utilities

export function getShareUrl(): string {
  if (typeof window !== 'undefined') {
    // Return current origin or cleaner canonical URL if on localhost or custom domain
    return window.location.origin + window.location.pathname;
  }
  return 'https://19novtrauma.vercel.app';
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

  // Try Native Web Share API first
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      // Check if files can be shared
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
      // If user cancelled, don't fallback to clipboard error
      if (err instanceof Error && err.name === 'AbortError') {
        return { success: false, method: 'native' };
      }
    }
  }

  // Fallback: Copy to clipboard
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(fullText);
      return { success: true, method: 'clipboard' };
    }
  } catch {
    // ignore
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
