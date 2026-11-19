export interface MatchFact {
  label: string;
  value: string;
  subtext: string;
}

export const MATCH_FACTS = {
  date: "19 November 2023",
  tournament: "ICC Men's Cricket World Cup 2023 Final",
  venue: "Narendra Modi Stadium, Ahmedabad, Gujarat, India",
  attendance: "130,000+ spectators",
  indiaScore: "240 all out",
  indiaOvers: "50.0 overs",
  australiaScore: "241/4",
  australiaOvers: "43.0 overs",
  margin: "Australia won by 6 wickets",
  toss: "Australia won the toss and elected to field",
  playerOfTheMatch: "Travis Head (Australia)",
  playerOfTheMatchStats: "137 runs off 120 balls (15x4, 4x6) + catch of Rohit Sharma",
  rohitScore: "47 runs off 31 balls (4x4, 3x6)",
  klRahulScore: "66 runs off 107 balls (1x4)",
  kohliScore: "54 runs off 63 balls (4x4)",
  indiaStreakBeforeFinal: "10 consecutive wins (10-0 undefeated streak)",
  boundaryDrought: "Only 4 boundaries scored in the final 40 overs of India's innings",
  cumminsQuote: "There is nothing more satisfying than hearing a big crowd go silent.",
};

export const HUMOROUS_CAPTIONS = [
  {
    highlight: "10 - 0",
    quote: "10 matches won. We thought the script was already written.",
    note: "Crushed every team, broke records... until Sunday.",
  },
  {
    highlight: "137 (120)",
    quote: "Then Travis Head decided to become the main character.",
    note: "Catch of the century, century of the final. Pure heartbreak.",
  },
  {
    highlight: "240 vs 241",
    quote: "240 felt like a score. 241 felt personal.",
    note: "The single run that stood between an entire nation and the trophy.",
  },
];

export const MATCH_TIMELINE = [
  {
    time: "2:00 PM IST",
    phase: "THE TOSS & THE PROMISE",
    quote: "There is nothing more satisfying than hearing a big crowd go silent.",
    author: "Pat Cummins, Australian Captain",
    description: "Australia won the toss and stunned commentators by electing to field first on a dry pitch. Pat Cummins famously promised to silence 130,000 fans. We thought it was bravado. It was a spoiler.",
    icon: "🎯",
    impact: "Confidence: 99%",
  },
  {
    time: "3:15 PM IST",
    phase: "ROHIT'S EXPLOSIVE STORM",
    quote: "Hitman was batting like he had a flight to catch.",
    author: "Every Indian Fan",
    description: "Rohit Sharma blitzed 47 off 31 balls with 3 gigantic sixes. India was flying at 76/1 in 9.3 overs. Total euphoria in the stands. Then Travis Head sprinted 12 meters backwards to pluck a wonder catch.",
    icon: "⚡",
    impact: "Heart skips 3 beats",
  },
  {
    time: "4:30 PM IST",
    phase: "THE BOUNDARY DROUGHT",
    quote: "Where did the boundaries go?",
    author: "Statistical Nightmare",
    description: "Australia deployed pinpoint cutters, reverse swing, and electric fielding. India hit only 4 boundaries in the final 40 overs. Virat Kohli (54) chopped on, KL Rahul grinded 66 off 107 balls under relentless pressure.",
    icon: "⏳",
    impact: "Palms sweating profusely",
  },
  {
    time: "5:45 PM IST",
    phase: "240 ALL OUT",
    quote: "240 felt like a score. 241 felt personal.",
    author: "Ahmedabad Scoreboard",
    description: "India was bowled out for 240 on the final ball of the 50th over. Indian fans consoled themselves: 'The pitch is tricky, our bowlers took 10 wickets in every match, Shami and Bumrah will defend this.'",
    icon: "🛑",
    impact: "Nervous dinner consumption",
  },
  {
    time: "7:00 PM IST",
    phase: "HOPE AT 47/3",
    quote: "Wait... are we actually defending this?!",
    author: "Brief Glimmer of Hope",
    description: "Bumrah and Shami struck early with fiery spells! Warner, Marsh, and Smith all fell cheaply. Australia reeling at 47/3. The stadium erupted into thunderous noise. We started believing in destiny.",
    icon: "🔥",
    impact: "Adrenaline spike to 100%",
  },
  {
    time: "9:45 PM IST",
    phase: "THE TRAVIS HEAD MASTERCLASS",
    quote: "Then Travis Head decided to become the main character.",
    author: "The Inevitable Silence",
    description: "Travis Head (137 off 120 balls) and Marnus Labuschagne (58*) forged a 192-run stand. The Ahmedabad sea of blue slowly transformed into an eerie silence. At 241/4 in the 43rd over, the dream was over.",
    icon: "💔",
    impact: "Emotional damage: Permanent",
  },
];
