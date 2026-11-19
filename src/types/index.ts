export type AchievementId = 
  | 'FIRST_DIAGNOSIS'
  | 'CRICKET_HISTORIAN'
  | 'PERFECT_MEMORY'
  | 'MEME_THERAPIST'
  | 'NEVER_FORGET_1911'
  | 'STILL_STANDING';

export interface Achievement {
  id: AchievementId;
  title: string;
  description: string;
  icon: string;
  category: 'assessment' | 'quiz' | 'meme' | 'loyalty';
  unlockedAt?: string | null;
}

export interface TraumaOption {
  text: string;
  weight: number; // 0 to 3 or 0 to 20
  subtext?: string;
}

export interface TraumaQuestion {
  id: number;
  question: string;
  context?: string;
  options: TraumaOption[];
}

export type TraumaCategory = 
  | 'SLIGHTLY TRAUMATIZED'
  | 'EMOTIONALLY WOUNDED'
  | 'PERMANENTLY DAMAGED'
  | 'BEYOND RECOVERY';

export interface TraumaResult {
  score: number;
  category: TraumaCategory;
  title: string;
  diagnosis: string;
  prescription: string;
  color: string;
  badge: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  historicalContext: string;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  tierTitle: string;
  description: string;
  memeReaction: string;
}

export interface MemeTemplate {
  id: string;
  title: string;
  description: string;
  defaultTopText: string;
  defaultBottomText: string;
  tag: string;
  colorTheme: string;
  previewBg: string;
  illustrationType: 'dream_vs_nightmare' | 'flashback' | 'batting_collapse' | 'travis_head' | 'before_after' | 'scriptwriter';
}

export interface UserProgress {
  version: number;
  traumaScore: number | null;
  traumaCategory: TraumaCategory | null;
  traumaAnswers: Record<number, number>;
  quizBestScore: number | null;
  quizTotalTaken: number;
  healingProgress: number; // 0 to 100
  healingDeclared: boolean;
  unlockedAchievements: Record<string, string>; // id -> ISO timestamp
  memesGeneratedCount: number;
  visitCount: number;
  firstVisit: string;
  lastVisit: string;
  soundEnabled: boolean;
}

export interface ElapsedTime {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formattedText: string;
}
