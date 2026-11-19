import type { TraumaQuestion, TraumaResult, TraumaBand } from '../types';

export const TRAUMA_QUESTIONS: TraumaQuestion[] = [
  {
    id: "tq1",
    question: "What happens when someone mentions 19 November?",
    context: "Physical and involuntary psychological reaction test",
    options: [
      { id: "tq1_a", text: "What happened that day?", weight: 0, subtext: "Either blissful ignorance or selective amnesia" },
      { id: "tq1_b", text: "Please change the topic.", weight: 1, subtext: "Polite avoidance tactic" },
      { id: "tq1_c", text: "I remember every single moment.", weight: 2, subtext: "The vivid stadium trauma reel replays in 4K" },
      { id: "tq1_d", text: "I still haven't emotionally recovered.", weight: 3, subtext: "My therapist knows Travis Head by his first name" },
    ],
  },
  {
    id: "tq2",
    question: "What is your reaction when you see a picture of Travis Head?",
    context: "Visual stimulus & mustache flashback assessment",
    options: [
      { id: "tq2_a", text: "Nice player.", weight: 0, subtext: "You are either Australian or remarkably zen" },
      { id: "tq2_b", text: "Respect the performance.", weight: 1, subtext: "Applauded through gritted teeth and dry eyes" },
      { id: "tq2_c", text: "Instant flashbacks.", weight: 2, subtext: "That backward running catch haunts my dreams" },
      { id: "tq2_d", text: "Close the browser immediately.", weight: 3, subtext: "Defensive Alt+F4 muscle memory" },
    ],
  },
  {
    id: "tq3",
    question: "How many times have you watched the final highlights?",
    context: "Masochism & replay endurance evaluation",
    options: [
      { id: "tq3_a", text: "A few times.", weight: 0, subtext: "Analysing field placements like an armchair coach" },
      { id: "tq3_b", text: "Once.", weight: 1, subtext: "Accidentally clicked on YouTube and closed in 3 seconds" },
      { id: "tq3_c", text: "Never.", weight: 2, subtext: "Protected my remaining emotional sanity" },
      { id: "tq3_d", text: "Why would I do that to myself?", weight: 3, subtext: "I haven't watched cricket highlights since 18 Nov 2023" },
    ],
  },
  {
    id: "tq4",
    question: "What was your reaction as India's wickets fell?",
    context: "Iyer caught behind at 81/3. Total silence falls over 130,000 fans.",
    options: [
      { id: "tq4_a", text: "Still confident.", weight: 0, subtext: "KL Rahul and Kohli will easily stitch 150+" },
      { id: "tq4_b", text: "Slightly worried.", weight: 1, subtext: "Felt a minor disturbance in the cricket force" },
      { id: "tq4_c", text: "Something feels wrong.", weight: 2, subtext: "The pitch is playing slow and Cummins is smiling" },
      { id: "tq4_d", text: "I knew this wasn't going to end well.", weight: 3, subtext: "Turned the TV down and began mental preparations for despair" },
    ],
  },
  {
    id: "tq5",
    question: "Have you moved on?",
    context: "Long-term grief stage diagnosis",
    options: [
      { id: "tq5_a", text: "Completely.", weight: 0, subtext: "Life goes on. It's just a sport." },
      { id: "tq5_b", text: "Mostly.", weight: 1, subtext: "Only stings when someone wears yellow jerseys" },
      { id: "tq5_c", text: "Not really.", weight: 2, subtext: "Still wondering why we didn't score more boundaries between overs 11-40" },
      { id: "tq5_d", text: "We are still discussing it.", weight: 3, subtext: "10-0 campaign, brother. Ten and zero. How do you move on?!" },
    ],
  },
];

export function getTraumaBand(score: number): TraumaBand {
  if (score <= 24) return 'SLIGHTLY TRAUMATIZED';
  if (score <= 49) return 'EMOTIONALLY WOUNDED';
  if (score <= 74) return 'PERMANENTLY DAMAGED';
  return 'BEYOND RECOVERY';
}

export function calculateTraumaResult(score: number): TraumaResult {
  const boundedScore = Math.max(0, Math.min(100, Math.round(score)));
  const band = getTraumaBand(boundedScore);
  const now = new Date().toISOString();

  if (band === 'SLIGHTLY TRAUMATIZED') {
    return {
      score: boundedScore,
      band,
      title: 'MILD NOSTALGIA SYNDROME',
      diagnosis: 'Your coping mechanisms are functioning with suspicious efficiency. You probably watched the 2024 T20 World Cup win and told yourself "balance is restored."',
      prescription: 'Watch Rohit Sharma\'s 47 (31) highlight reel once a week. Avoid Australian yellow jerseys at sporting goods stores.',
      color: '#10b981', // green
      badge: '🧘 ZEN FAN',
      icon: 'ShieldCheck',
      completedAt: now,
    };
  } else if (band === 'EMOTIONALLY WOUNDED') {
    return {
      score: boundedScore,
      band,
      title: 'CHRONIC BOUNDARY DROUGHT',
      diagnosis: 'You have functional cricket recovery, but high-leverage matches still trigger elevated cortisol levels. Only 4 boundaries in 40 overs is permanently etched into your psyche.',
      prescription: 'Prescribed 2 daily doses of Mohammed Shami 7/57 vs New Zealand semi-final highlights. Strictly refrain from searching Travis Head 137.',
      color: '#f59e0b', // amber
      badge: '🩹 BANDAGED HEART',
      icon: 'HeartCrack',
      completedAt: now,
    };
  } else if (band === 'PERMANENTLY DAMAGED') {
    return {
      score: boundedScore,
      band,
      title: 'ACUTE TRAVIS HEAD PHOBIA',
      diagnosis: 'You suffer from profound PTSD whenever a team goes undefeated in the group stage. You genuinely believe Pat Cummins\' pre-match promise to "silence the crowd" is the coldest quote in sporting history.',
      prescription: 'Join a local cricket therapy circle. Whenever anyone mentions 240 all out, repeat 5 times: "It was just a slow black-soil pitch."',
      color: '#f97316', // orange
      badge: '⚠️ SEVERELY SCARRED',
      icon: 'AlertTriangle',
      completedAt: now,
    };
  } else {
    return {
      score: boundedScore,
      band,
      title: 'MAXIMUM AHMEDABAD SILENCE',
      diagnosis: 'Congratulations. Your recovery progress is still under investigation. You remember every dot ball, every DRS review, and the deafening silence of 130,000 spectators as the winning runs were hit.',
      prescription: 'Immediate emotional quarantine. Absolutely zero viewing of ICC tournaments without medical supervision. Recommended therapy: Rewatch 2011 World Cup Final on repeat.',
      color: '#ef4444', // red
      badge: '🚨 CODE BLUE: CRITICAL',
      icon: 'Flame',
      completedAt: now,
    };
  }
}
