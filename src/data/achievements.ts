import type { Achievement } from '../types';

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'FIRST_DIAGNOSIS',
    title: 'FIRST DIAGNOSIS',
    description: 'Faced the music and completed your official 19 November Trauma Assessment.',
    icon: 'Stethoscope',
    category: 'assessment',
  },
  {
    id: 'CRICKET_HISTORIAN',
    title: 'CRICKET HISTORIAN',
    description: 'Relived the statistical facts of the final by completing the 10-question Memory Quiz.',
    icon: 'BookOpen',
    category: 'quiz',
  },
  {
    id: 'PERFECT_MEMORY',
    title: 'PERFECT MEMORY',
    description: 'Scored an unbelievable 10/10 in the Memory Quiz. You remember every detail of the nightmare.',
    icon: 'Crown',
    category: 'quiz',
  },
  {
    id: 'MEME_THERAPIST',
    title: 'MEME THERAPIST',
    description: 'Crafted and exported your first custom coping meme using the Trauma Center canvas.',
    icon: 'Image',
    category: 'meme',
  },
  {
    id: 'NEVER_FORGET_1911',
    title: 'NEVER FORGET 19/11',
    description: 'Checked into the Trauma Center and finished at least one therapeutic coping activity.',
    icon: 'Flame',
    category: 'loyalty',
  },
  {
    id: 'STILL_STANDING',
    title: 'STILL STANDING',
    description: 'Returned to the Trauma Center on a separate visit. The heartbreak persists, but so do you.',
    icon: 'HeartHandshake',
    category: 'loyalty',
  },
];
