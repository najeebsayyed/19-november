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
}

export interface AchievementProgress {
  id: AchievementId;
  unlockedAt: string; // ISO date string
}

export interface TraumaOption {
  id: string;
  text: string;
  weight: 0 | 1 | 2 | 3;
  subtext?: string;
}

export interface TraumaQuestion {
  id: string;
  question: string;
  context?: string;
  options: TraumaOption[];
}

export type TraumaBand = 
  | 'SLIGHTLY TRAUMATIZED'
  | 'EMOTIONALLY WOUNDED'
  | 'PERMANENTLY DAMAGED'
  | 'BEYOND RECOVERY';

export interface TraumaResult {
  score: number; // 0 to 100
  band: TraumaBand;
  title: string;
  diagnosis: string;
  prescription: string;
  color: string;
  badge: string;
  icon: string;
  completedAt: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
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
  completedAt: string;
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

export interface LocalProgressV1 {
  version: 1;
  firstVisitDate: string; // YYYY-MM-DD
  lastVisitDate: string;  // YYYY-MM-DD
  latestTraumaResult?: TraumaResult;
  traumaAnswers?: Record<string, string>; // questionId -> optionId
  bestQuizScore: number;
  completedQuizCount: number;
  healingPercent: number; // 0 to 100
  healingDeclared: boolean;
  achievements: AchievementProgress[];
  memesGeneratedCount: number;
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
