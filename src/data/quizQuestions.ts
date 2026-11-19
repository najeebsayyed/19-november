import type { QuizQuestion, QuizResult } from '../types';

export const CRICKET_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What was India's total first-innings score in the 2023 World Cup Final?",
    options: ["240 all out", "275/8", "215 all out", "248/9"],
    correctIndex: 0,
    explanation: "India was bowled out for 240 in exactly 50 overs on a sluggish surface.",
    historicalContext: "After a blistering start (80 in the first 10 overs), India scored just four boundaries across the remaining 40 overs.",
  },
  {
    id: 2,
    question: "What was Australia's final score when they hit the winning runs?",
    options: ["241/4", "240/3", "244/5", "242/4"],
    correctIndex: 0,
    explanation: "Australia reached 241/4 in 43 overs, finishing the chase with 42 balls to spare.",
    historicalContext: "Glenn Maxwell struck the winning runs off the first ball he faced, pulling for two runs after Travis Head was dismissed on 137.",
  },
  {
    id: 3,
    question: "By what margin did Australia defeat India to lift the 2023 World Cup?",
    options: ["6 wickets", "7 wickets", "4 wickets", "5 wickets"],
    correctIndex: 0,
    explanation: "Australia won by 6 wickets, with Marnus Labuschagne (58*) anchoring the other end.",
    historicalContext: "Australia recovered from early trouble at 47/3 thanks to a mammoth 192-run stand between Head and Labuschagne.",
  },
  {
    id: 4,
    question: "At which stadium was the historic 2023 World Cup final held?",
    options: [
      "Narendra Modi Stadium, Ahmedabad",
      "Wankhede Stadium, Mumbai",
      "Eden Gardens, Kolkata",
      "M. Chinnaswamy Stadium, Bengaluru"
    ],
    correctIndex: 0,
    explanation: "It was held at the Narendra Modi Stadium in Ahmedabad in front of over 130,000 fans.",
    historicalContext: "Pat Cummins famously said in the pre-match press conference: 'There is nothing more satisfying than hearing a big crowd go silent.'",
  },
  {
    id: 5,
    question: "What happened at the coin toss before the match began?",
    options: [
      "Australia won the toss and elected to field",
      "India won the toss and elected to bat",
      "Australia won the toss and elected to bat",
      "India won the toss and elected to bowl"
    ],
    correctIndex: 0,
    explanation: "Pat Cummins won the toss and boldly opted to bowl first, anticipating heavy evening dew.",
    historicalContext: "Many experts were stunned at bowling first in a World Cup final, but the pitch proved two-paced in the afternoon and batted easier at night under dew.",
  },
  {
    id: 6,
    question: "How many runs did Travis Head score in his match-winning century?",
    options: ["137 runs", "124 runs", "148 runs", "118 runs"],
    correctIndex: 0,
    explanation: "Travis Head played a legendary knock of 137 runs off 120 balls with 15 fours and 4 sixes.",
    historicalContext: "Head became only the third Australian after Ricky Ponting (2003) and Adam Gilchrist (2007) to score a century in a Men's ODI World Cup Final.",
  },
  {
    id: 7,
    question: "Who was officially awarded the Player of the Match in the 2023 Final?",
    options: ["Travis Head", "Pat Cummins", "Marnus Labuschagne", "Mitchell Starc"],
    correctIndex: 0,
    explanation: "Travis Head took Player of the Match for his 137 runs and his acrobatic catch to dismiss Rohit Sharma.",
    historicalContext: "He also had taken the decisive running-back catch of Rohit Sharma off Maxwell that shifted the match's entire momentum.",
  },
  {
    id: 8,
    question: "Who was India's top run-scorer in the final, fighting hard for 66 runs?",
    options: ["KL Rahul", "Virat Kohli", "Rohit Sharma", "Suryakumar Yadav"],
    correctIndex: 0,
    explanation: "KL Rahul scored 66 off 107 balls, anchoring the innings amidst continuous Australian pressure.",
    historicalContext: "Virat Kohli also scored a gritty 54 off 63 balls before chopping Pat Cummins onto his stumps in the 29th over.",
  },
  {
    id: 9,
    question: "How many runs did Indian captain Rohit Sharma smash in his explosive opening blitz?",
    options: ["47 runs", "52 runs", "38 runs", "61 runs"],
    correctIndex: 0,
    explanation: "Rohit smashed 47 runs off just 31 deliveries, with 4 fours and 3 gigantic sixes.",
    historicalContext: "Rohit's fiery start had India at 76/1 in 9.3 overs before Head took a stunning catch over his shoulder running backwards.",
  },
  {
    id: 10,
    question: "How many consecutive matches had India won in the 2023 World Cup before the final?",
    options: ["10 consecutive wins", "9 consecutive wins", "8 consecutive wins", "11 consecutive wins"],
    correctIndex: 0,
    explanation: "India had an undefeated 10-0 record heading into the final, dominating every single opponent.",
    historicalContext: "India had steamrolled Australia, Afghanistan, Pakistan, Bangladesh, New Zealand, England, Sri Lanka, South Africa, Netherlands, and New Zealand (semis).",
  },
];

export function evaluateQuizResult(score: number, total: number = 10): QuizResult {
  const percentage = Math.round((score / total) * 100);

  if (score === 10) {
    return {
      score,
      total,
      percentage,
      tierTitle: "CERTIFIED 19/11 HISTORIAN 🏆",
      description: "You remember everything. Even the pain. Every dot ball, every boundary drought, and Travis Head's exact wagon wheel is saved in your memory.",
      memeReaction: "Bro has photographic trauma memory.",
    };
  } else if (score >= 8) {
    return {
      score,
      total,
      percentage,
      tierTitle: "VETERAN CRICKET WITNESS 🏏",
      description: "Certified cricket historian. You watched the heartbreak with wide eyes and took mental notes while crying into your samosa.",
      memeReaction: "Respect the cricket knowledge, condolences for the emotional damage.",
    };
  } else if (score >= 5) {
    return {
      score,
      total,
      percentage,
      tierTitle: "SELECTIVE COPING SURVIVOR 🩹",
      description: "The memories are a little blurry. You probably switched off the television around over 32 and decided sleep was better than reality.",
      memeReaction: "A healthy middle ground: you know the tragedy happened, but spared your retina.",
    };
  } else {
    return {
      score,
      total,
      percentage,
      tierTitle: "PROTECTIVE AMNESIA CHAMPION 🧠",
      description: "Maybe your brain is protecting you. A brilliant defense mechanism! If you don't remember the details, maybe 19 November was just a fever dream.",
      memeReaction: "Doctor's advice: Keep this memory locked. Don't go searching for answers.",
    };
  }
}
