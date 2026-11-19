import type { QuizQuestion, QuizResult } from '../types';

export const CRICKET_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "qq1",
    question: "What was India's total first-innings score in the 2023 World Cup Final?",
    options: [
      { id: "qq1_a", text: "240 all out" },
      { id: "qq1_b", text: "275/8" },
      { id: "qq1_c", text: "215 all out" },
      { id: "qq1_d", text: "248/9" },
    ],
    correctAnswerId: "qq1_a",
    explanation: "India was bowled out for 240 in exactly 50 overs on a sluggish Ahmedabad surface.",
    historicalContext: "After a blistering start (80 in the first 10 overs), India scored just four boundaries across the remaining 40 overs.",
  },
  {
    id: "qq2",
    question: "What was Australia's final score when they hit the winning runs?",
    options: [
      { id: "qq2_a", text: "241/4" },
      { id: "qq2_b", text: "240/3" },
      { id: "qq2_c", text: "244/5" },
      { id: "qq2_d", text: "242/4" },
    ],
    correctAnswerId: "qq2_a",
    explanation: "Australia reached 241/4 in 43 overs, finishing the chase with 42 balls to spare.",
    historicalContext: "Glenn Maxwell struck the winning runs off the first ball he faced, pulling for two runs after Travis Head was dismissed on 137.",
  },
  {
    id: "qq3",
    question: "By what margin did Australia defeat India to lift the 2023 World Cup?",
    options: [
      { id: "qq3_a", text: "6 wickets" },
      { id: "qq3_b", text: "7 wickets" },
      { id: "qq3_c", text: "4 wickets" },
      { id: "qq3_d", text: "5 wickets" },
    ],
    correctAnswerId: "qq3_a",
    explanation: "Australia won by 6 wickets, with Marnus Labuschagne (58*) anchoring the other end.",
    historicalContext: "Australia recovered from early trouble at 47/3 thanks to a mammoth 192-run stand between Head and Labuschagne.",
  },
  {
    id: "qq4",
    question: "At which stadium was the historic 2023 World Cup final held?",
    options: [
      { id: "qq4_a", text: "Narendra Modi Stadium, Ahmedabad" },
      { id: "qq4_b", text: "Wankhede Stadium, Mumbai" },
      { id: "qq4_c", text: "Eden Gardens, Kolkata" },
      { id: "qq4_d", text: "M. Chinnaswamy Stadium, Bengaluru" },
    ],
    correctAnswerId: "qq4_a",
    explanation: "It was held at the Narendra Modi Stadium in Ahmedabad in front of over 130,000 fans.",
    historicalContext: "Pat Cummins famously said in the pre-match press conference: 'There is nothing more satisfying than hearing a big crowd go silent.'",
  },
  {
    id: "qq5",
    question: "What happened at the coin toss before the match began?",
    options: [
      { id: "qq5_a", text: "Australia won the toss and elected to field" },
      { id: "qq5_b", text: "India won the toss and elected to bat" },
      { id: "qq5_c", text: "Australia won the toss and elected to bat" },
      { id: "qq5_d", text: "India won the toss and elected to bowl" },
    ],
    correctAnswerId: "qq5_a",
    explanation: "Pat Cummins won the toss and boldly opted to bowl first, anticipating heavy evening dew.",
    historicalContext: "Many experts were stunned at bowling first in a World Cup final, but the pitch proved two-paced in the afternoon and batted easier at night under dew.",
  },
  {
    id: "qq6",
    question: "How many runs did Travis Head score in his match-winning century?",
    options: [
      { id: "qq6_a", text: "137 runs" },
      { id: "qq6_b", text: "124 runs" },
      { id: "qq6_c", text: "148 runs" },
      { id: "qq6_d", text: "118 runs" },
    ],
    correctAnswerId: "qq6_a",
    explanation: "Travis Head played a legendary knock of 137 runs off 120 balls with 15 fours and 4 sixes.",
    historicalContext: "Head became only the third Australian after Ricky Ponting (2003) and Adam Gilchrist (2007) to score a century in a Men's ODI World Cup Final.",
  },
  {
    id: "qq7",
    question: "Who was officially awarded the Player of the Match in the 2023 Final?",
    options: [
      { id: "qq7_a", text: "Travis Head" },
      { id: "qq7_b", text: "Pat Cummins" },
      { id: "qq7_c", text: "Marnus Labuschagne" },
      { id: "qq7_d", text: "Mitchell Starc" },
    ],
    correctAnswerId: "qq7_a",
    explanation: "Travis Head took Player of the Match for his 137 runs and his acrobatic catch to dismiss Rohit Sharma.",
    historicalContext: "He also had taken the decisive running-back catch of Rohit Sharma off Maxwell that shifted the match's entire momentum.",
  },
  {
    id: "qq8",
    question: "Who was India's top run-scorer in the final, fighting hard for 66 runs?",
    options: [
      { id: "qq8_a", text: "KL Rahul" },
      { id: "qq8_b", text: "Virat Kohli" },
      { id: "qq8_c", text: "Rohit Sharma" },
      { id: "qq8_d", text: "Suryakumar Yadav" },
    ],
    correctAnswerId: "qq8_a",
    explanation: "KL Rahul scored 66 off 107 balls, anchoring the innings amidst continuous Australian pressure.",
    historicalContext: "Virat Kohli also scored a gritty 54 off 63 balls before chopping Pat Cummins onto his stumps in the 29th over.",
  },
  {
    id: "qq9",
    question: "How many runs did Indian captain Rohit Sharma smash in his explosive opening blitz?",
    options: [
      { id: "qq9_a", text: "47 runs" },
      { id: "qq9_b", text: "52 runs" },
      { id: "qq9_c", text: "38 runs" },
      { id: "qq9_d", text: "61 runs" },
    ],
    correctAnswerId: "qq9_a",
    explanation: "Rohit smashed 47 runs off just 31 deliveries, with 4 fours and 3 gigantic sixes.",
    historicalContext: "Rohit's fiery start had India at 76/1 in 9.3 overs before Head took a stunning catch over his shoulder running backwards.",
  },
  {
    id: "qq10",
    question: "How many consecutive matches had India won in the 2023 World Cup before the final?",
    options: [
      { id: "qq10_a", text: "10 consecutive wins" },
      { id: "qq10_b", text: "9 consecutive wins" },
      { id: "qq10_c", text: "8 consecutive wins" },
      { id: "qq10_d", text: "11 consecutive wins" },
    ],
    correctAnswerId: "qq10_a",
    explanation: "India had an undefeated 10-0 record heading into the final, dominating every single opponent.",
    historicalContext: "India had steamrolled Australia, Afghanistan, Pakistan, Bangladesh, New Zealand, England, Sri Lanka, South Africa, Netherlands, and New Zealand (semis).",
  },
];

export function evaluateQuizResult(score: number, total: number = 10): QuizResult {
  const percentage = Math.round((score / total) * 100);
  const now = new Date().toISOString();

  if (score === 10) {
    return {
      score,
      total,
      percentage,
      tierTitle: "CERTIFIED 19/11 HISTORIAN 🏆",
      description: "You remember everything. Even the pain.",
      memeReaction: "Bro has photographic trauma memory.",
      completedAt: now,
    };
  } else if (score >= 8) {
    return {
      score,
      total,
      percentage,
      tierTitle: "VETERAN CRICKET WITNESS 🏏",
      description: "Certified cricket historian.",
      memeReaction: "Respect the cricket knowledge, condolences for the emotional damage.",
      completedAt: now,
    };
  } else if (score >= 5) {
    return {
      score,
      total,
      percentage,
      tierTitle: "SELECTIVE COPING SURVIVOR 🩹",
      description: "The memories are a little blurry.",
      memeReaction: "A healthy middle ground: you know the tragedy happened, but spared your retina.",
      completedAt: now,
    };
  } else {
    return {
      score,
      total,
      percentage,
      tierTitle: "PROTECTIVE AMNESIA CHAMPION 🧠",
      description: "Maybe your brain is protecting you.",
      memeReaction: "Doctor's advice: Keep this memory locked. Don't go searching for answers.",
      completedAt: now,
    };
  }
}
