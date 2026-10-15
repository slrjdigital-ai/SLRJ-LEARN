"use client";

// Types for the Gamification Engine
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD in user's local timezone
  completedDays: string[]; // array of YYYY-MM-DD
}

export interface XPBreakdown {
  lessonsXP: number;
  quizzesXP: number;
  challengesXP: number;
  projectsXP: number;
  communityXP: number;
  totalXP: number;
}

export interface UserLevel {
  levelNumber: number;
  title: string;
  minXP: number;
  maxXP: number;
  badge: string;
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  requirement: string;
  category: "streak" | "coding" | "quiz" | "project" | "milestone";
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 to 100
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  role: string;
  score: number;
  streak: number;
  completedChallenges: number;
  badgesCount: number;
  isCurrentUser?: boolean;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  skills: string[];
  problemStatement: string;
  starterCode: string;
  deadline: string; // ISO date string
  testCases: Array<{
    id: number;
    input: string;
    expected: string;
    description: string;
  }>;
  hints: string[];
  solutionExplanation: string;
  solutionCode: string;
  xpReward: number;
}

export interface GamificationState {
  streak: StreakData;
  xp: XPBreakdown;
  badges: AchievementBadge[];
  completedActivityIds: string[]; // Anti-cheat: prevent duplicate XP farming
  incognitoMode: boolean; // Privacy setting
  submittedChallenges: Record<string, { code: string; passed: boolean; submittedAt: string }>;
}

// Level Progression Table
export const LEVELS: UserLevel[] = [
  { levelNumber: 1, title: "Novice Coder", minXP: 0, maxXP: 250, badge: "🌱" },
  { levelNumber: 2, title: "Apprentice Developer", minXP: 251, maxXP: 600, badge: "⚡" },
  { levelNumber: 3, title: "Script Explorer", minXP: 601, maxXP: 1200, badge: "🔍" },
  { levelNumber: 4, title: "Code Crafter", minXP: 1201, maxXP: 2200, badge: "🛠️" },
  { levelNumber: 5, title: "Logic Engineer", minXP: 2201, maxXP: 3800, badge: "🧠" },
  { levelNumber: 6, title: "Algorithm Architect", minXP: 3801, maxXP: 6000, badge: "🏰" },
  { levelNumber: 7, title: "Full-Stack Specialist", minXP: 6001, maxXP: 9000, badge: "🚀" },
  { levelNumber: 8, title: "System Wizard", minXP: 9001, maxXP: 13500, badge: "🧙‍♂️" },
  { levelNumber: 9, title: "Tech Innovator", minXP: 13501, maxXP: 20000, badge: "🌟" },
  { levelNumber: 10, title: "Grandmaster Polymath", minXP: 20001, maxXP: 999999, badge: "👑" },
];

export function calculateLevel(totalXP: number): {
  currentLevel: UserLevel;
  nextLevel: UserLevel | null;
  progressPercent: number;
  xpToNextLevel: number;
} {
  const current =
    LEVELS.slice()
      .reverse()
      .find((lvl) => totalXP >= lvl.minXP) || LEVELS[0];

  const nextIndex = LEVELS.findIndex((l) => l.levelNumber === current.levelNumber) + 1;
  const next = nextIndex < LEVELS.length ? LEVELS[nextIndex] : null;

  if (!next) {
    return {
      currentLevel: current,
      nextLevel: null,
      progressPercent: 100,
      xpToNextLevel: 0,
    };
  }

  const range = next.minXP - current.minXP;
  const earnedInRange = Math.max(0, totalXP - current.minXP);
  const progressPercent = Math.min(100, Math.round((earnedInRange / range) * 100));
  const xpToNextLevel = Math.max(0, next.minXP - totalXP);

  return {
    currentLevel: current,
    nextLevel: next,
    progressPercent,
    xpToNextLevel,
  };
}

// Initial Standard Badges matching prompt requirements exactly
export const DEFAULT_BADGES: AchievementBadge[] = [
  {
    id: "first_lesson",
    name: "First Lesson Completed",
    description: "Successfully finished your first micro-learning lesson.",
    requirement: "Complete any 1 micro-lesson",
    category: "milestone",
    icon: "🎯",
    unlocked: true,
    unlockedAt: "Oct 12, 2026",
    progress: 100,
  },
  {
    id: "python_beginner",
    name: "Python Beginner",
    description: "Mastered fundamental Python variables, loops, and data structures.",
    requirement: "Complete 3 Python micro-lessons",
    category: "coding",
    icon: "🐍",
    unlocked: true,
    unlockedAt: "Oct 13, 2026",
    progress: 100,
  },
  {
    id: "js_explorer",
    name: "JavaScript Explorer",
    description: "Built interactive web UI elements and mastered DOM events.",
    requirement: "Complete 3 JavaScript challenges",
    category: "coding",
    icon: "⚡",
    unlocked: true,
    unlockedAt: "Oct 14, 2026",
    progress: 100,
  },
  {
    id: "quiz_master",
    name: "Quiz Master",
    description: "Demonstrated impeccable accuracy across knowledge checks.",
    requirement: "Score 100% on 3 different lesson quizzes",
    category: "quiz",
    icon: "🏆",
    unlocked: false,
    progress: 66,
  },
  {
    id: "streak_7",
    name: "Seven-Day Learning Streak",
    description: "Maintained a dedicated coding habit for 7 consecutive calendar days.",
    requirement: "Reach a 7-day active learning streak",
    category: "streak",
    icon: "🔥",
    unlocked: false,
    progress: 71, // 5 of 7
  },
  {
    id: "challenge_champ",
    name: "Coding Challenge Champion",
    description: "Conquered algorithmic puzzles and weekly coding competitions.",
    requirement: "Solve 2 weekly or daily coding challenges",
    category: "coding",
    icon: "⚔️",
    unlocked: true,
    unlockedAt: "Oct 15, 2026",
    progress: 100,
  },
  {
    id: "project_builder",
    name: "Project Builder",
    description: "Designed, engineered, and completed a real-world mini application.",
    requirement: "Complete any practical mini-project",
    category: "project",
    icon: "🚀",
    unlocked: false,
    progress: 50,
  },
  {
    id: "debugging_expert",
    name: "Debugging Expert",
    description: "Correctly predicted outputs and uncovered hidden code defects.",
    requirement: "Solve 2 'Guess the Output' coding puzzles",
    category: "coding",
    icon: "🐞",
    unlocked: false,
    progress: 50,
  },
  {
    id: "consistent_learner",
    name: "Consistent Learner",
    description: "Earned 600+ XP across programming, soft skills, and career tracks.",
    requirement: "Earn at least 600 total XP across multiple topics",
    category: "milestone",
    icon: "📚",
    unlocked: true,
    unlockedAt: "Oct 14, 2026",
    progress: 100,
  },
  {
    id: "fullstack_explorer",
    name: "Full-Stack Explorer",
    description: "Bridged client-side UI craftsmanship with backend database logic.",
    requirement: "Complete both frontend and backend micro-topics",
    category: "coding",
    icon: "🌐",
    unlocked: false,
    progress: 40,
  },
];

// Active Weekly Challenge Specification
export const CURRENT_WEEKLY_CHALLENGE: WeeklyChallenge = {
  id: "challenge-w42-palindrome",
  title: "Longest Palindromic Substring Optimizer",
  category: "Algorithms & String Manipulation",
  difficulty: "Medium",
  skills: ["Two Pointers", "Dynamic Programming", "Edge Case Handling", "Time Complexity O(n²)"],
  deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000).toISOString(), // 4 days 14 hours
  problemStatement: `Given a string \`s\`, return the longest palindromic substring in \`s\`. A palindrome is a sequence of characters that reads the same backward as forward.

### Constraints:
- 1 <= s.length <= 1000
- \`s\` consist of only lowercase and uppercase English letters.
- If multiple palindromes have the maximum length, return the first one encountered.`,
  starterCode: `function longestPalindrome(s) {
  if (!s || s.length <= 1) return s;

  let start = 0;
  let maxLength = 1;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLength = right - left + 1;
      if (currentLength > maxLength) {
        start = left;
        maxLength = currentLength;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    // Odd length palindrome (centered at i)
    expandAroundCenter(i, i);
    // Even length palindrome (centered between i and i + 1)
    expandAroundCenter(i, i + 1);
  }

  return s.substring(start, start + maxLength);
}`,
  testCases: [
    {
      id: 1,
      input: '"babad"',
      expected: '"bab"',
      description: 'Standard odd length center ("aba" is also valid)',
    },
    {
      id: 2,
      input: '"cbbd"',
      expected: '"bb"',
      description: "Even length palindrome in middle",
    },
    {
      id: 3,
      input: '"racecar"',
      expected: '"racecar"',
      description: "Entire string is a palindrome",
    },
    {
      id: 4,
      input: '"a"',
      expected: '"a"',
      description: "Single character edge case",
    },
  ],
  hints: [
    "A palindrome mirrors around its center. There are 2n - 1 centers (each character and each gap between characters).",
    "Expand outward from each center while characters on both ends match.",
    "Be sure to handle odd-length centers (e.g. 'aba') and even-length centers (e.g. 'abba').",
  ],
  solutionExplanation: `### Optimal Solution: Center Expansion Approach (O(n²) Time, O(1) Space)
Instead of checking every O(n²) substring (which would take O(n³) with validation), we observe that every palindrome expands outwards from its center.

There are $2n - 1$ potential centers:
- $n$ single-character centers for odd-length palindromes (like \`"aba"\` centered at \`'b'\`).
- $n - 1$ between-character centers for even-length palindromes (like \`"abba"\` centered between \`'b'\` and \`'b'\`).

For each center, we expand outward while \`s[left] === s[right]\`. If the resulting substring is longer than our current \`maxLength\`, we record the new starting index. This runs in $O(n^2)$ time with zero extra heap allocations!`,
  solutionCode: `function longestPalindrome(s) {
  if (!s || s.length < 2) return s;

  let start = 0;
  let maxLen = 1;

  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const len = right - left + 1;
      if (len > maxLen) {
        start = left;
        maxLen = len;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }

  return s.substring(start, start + maxLen);
}`,
  xpReward: 50,
};

// Global Leaderboards Data
export const MOCK_LEADERBOARDS: Record<
  "weekly" | "monthly" | "allTime",
  Record<"challenges" | "quizzes" | "activity" | "overall", LeaderboardUser[]>
> = {
  weekly: {
    challenges: [
      {
        id: "usr_alex_01",
        rank: 1,
        name: "Alex Chen (You)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Student",
        score: 450,
        streak: 5,
        completedChallenges: 6,
        badgesCount: 5,
        isCurrentUser: true,
      },
      {
        id: "usr_priya_03",
        rank: 2,
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        role: "Full-Stack Dev",
        score: 410,
        streak: 12,
        completedChallenges: 5,
        badgesCount: 7,
      },
      {
        id: "usr_marcus_04",
        rank: 3,
        name: "Marcus Aurelius",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        role: "Python Engineer",
        score: 380,
        streak: 9,
        completedChallenges: 4,
        badgesCount: 6,
      },
      {
        id: "usr_sarah_02",
        rank: 4,
        name: "Sarah Kim",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        role: "Student",
        score: 320,
        streak: 4,
        completedChallenges: 4,
        badgesCount: 4,
      },
      {
        id: "usr_elena_05",
        rank: 5,
        name: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        role: "Data Scientist",
        score: 290,
        streak: 6,
        completedChallenges: 3,
        badgesCount: 5,
      },
    ],
    quizzes: [
      {
        id: "usr_priya_03",
        rank: 1,
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        role: "Full-Stack Dev",
        score: 360,
        streak: 12,
        completedChallenges: 5,
        badgesCount: 7,
      },
      {
        id: "usr_alex_01",
        rank: 2,
        name: "Alex Chen (You)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Student",
        score: 310,
        streak: 5,
        completedChallenges: 6,
        badgesCount: 5,
        isCurrentUser: true,
      },
      {
        id: "usr_marcus_04",
        rank: 3,
        name: "Marcus Aurelius",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        role: "Python Engineer",
        score: 280,
        streak: 9,
        completedChallenges: 4,
        badgesCount: 6,
      },
    ],
    activity: [
      {
        id: "usr_alex_01",
        rank: 1,
        name: "Alex Chen (You)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Student",
        score: 640,
        streak: 5,
        completedChallenges: 6,
        badgesCount: 5,
        isCurrentUser: true,
      },
      {
        id: "usr_priya_03",
        rank: 2,
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        role: "Full-Stack Dev",
        score: 590,
        streak: 12,
        completedChallenges: 5,
        badgesCount: 7,
      },
    ],
    overall: [
      {
        id: "usr_alex_01",
        rank: 1,
        name: "Alex Chen (You)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Student",
        score: 1400,
        streak: 5,
        completedChallenges: 6,
        badgesCount: 5,
        isCurrentUser: true,
      },
      {
        id: "usr_priya_03",
        rank: 2,
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        role: "Full-Stack Dev",
        score: 1360,
        streak: 12,
        completedChallenges: 5,
        badgesCount: 7,
      },
    ],
  },
  monthly: {
    challenges: [
      {
        id: "usr_priya_03",
        rank: 1,
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        role: "Full-Stack Dev",
        score: 1850,
        streak: 12,
        completedChallenges: 22,
        badgesCount: 7,
      },
      {
        id: "usr_alex_01",
        rank: 2,
        name: "Alex Chen (You)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Student",
        score: 1680,
        streak: 5,
        completedChallenges: 18,
        badgesCount: 5,
        isCurrentUser: true,
      },
    ],
    quizzes: [],
    activity: [],
    overall: [],
  },
  allTime: {
    challenges: [
      {
        id: "usr_priya_03",
        rank: 1,
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        role: "Full-Stack Dev",
        score: 4950,
        streak: 12,
        completedChallenges: 58,
        badgesCount: 8,
      },
      {
        id: "usr_marcus_04",
        rank: 2,
        name: "Marcus Aurelius",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        role: "Python Engineer",
        score: 4120,
        streak: 9,
        completedChallenges: 49,
        badgesCount: 7,
      },
      {
        id: "usr_alex_01",
        rank: 3,
        name: "Alex Chen (You)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Student",
        score: 3850,
        streak: 5,
        completedChallenges: 42,
        badgesCount: 5,
        isCurrentUser: true,
      },
    ],
    quizzes: [],
    activity: [],
    overall: [],
  },
};

// Helper: Get local date in YYYY-MM-DD
export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Generate the past 30 days history for calendar view
export function getPast30Days(): Array<{ date: string; dayNumber: number; isCompleted: boolean; isToday: boolean }> {
  const result: Array<{ date: string; dayNumber: number; isCompleted: boolean; isToday: boolean }> = [];
  const todayStr = getLocalDateString();
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = getLocalDateString(d);

    // Mock completion: last 5 consecutive days + selective past days
    const isCompleted =
      i <= 4 || i === 7 || i === 8 || i === 11 || i === 12 || i === 13 || i === 18 || i === 19 || i === 24;

    result.push({
      date: dateStr,
      dayNumber: d.getDate(),
      isCompleted,
      isToday: dateStr === todayStr,
    });
  }

  return result;
}

const STORAGE_KEY = "slrj_gamification_state_v2";

export function getStoredGamificationState(): GamificationState {
  if (typeof window === "undefined") {
    return getInitialGamificationState();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed;
    }
  } catch (e) {
    console.error("Error reading gamification state:", e);
  }

  const initial = getInitialGamificationState();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch {}
  return initial;
}

export function saveGamificationState(state: GamificationState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event("gamification-update"));
  } catch (e) {
    console.error("Error saving gamification state:", e);
  }
}

export function getInitialGamificationState(): GamificationState {
  const today = getLocalDateString();
  const completedPastDays: string[] = [];
  const now = new Date();

  // Seed last 5 active days including today
  for (let i = 4; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    completedPastDays.push(getLocalDateString(d));
  }

  return {
    streak: {
      currentStreak: 5,
      longestStreak: 9,
      lastActiveDate: today,
      completedDays: completedPastDays,
    },
    xp: {
      lessonsXP: 350,
      quizzesXP: 240,
      challengesXP: 350,
      projectsXP: 250,
      communityXP: 60,
      totalXP: 1250, // Level 4
    },
    badges: DEFAULT_BADGES,
    completedActivityIds: [
      "lesson-python-01",
      "lesson-js-01",
      "challenge-palindrome",
      "quiz-web-intro",
    ],
    incognitoMode: false,
    submittedChallenges: {},
  };
}
