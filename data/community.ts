export interface DiscussionComment {
  id: string;
  authorName: string;
  authorRole: "student" | "mentor" | "instructor";
  authorAvatar: string;
  createdAt: string;
  content: string;
  upvotes: number;
}

export interface DiscussionThread {
  id: string;
  title: string;
  category: "Web Development" | "Python" | "DSA" | "Careers & Interviews" | "Showcase" | "General";
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
  upvotes: number;
  tags: string[];
  commentsCount: number;
  comments: DiscussionComment[];
  isSolved?: boolean;
}

export interface StudentShowcase {
  id: string;
  studentName: string;
  studentTrack: string;
  studentAvatar: string;
  projectTitle: string;
  projectDescription: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  screenshotUrl: string;
  likesCount: number;
}

export interface DailyCodingChallenge {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  xpReward: number;
  prompt: string;
  starterCode: string;
  testCases: Array<{ input: string; expected: string }>;
  solutionHint: string;
}

export const COMMUNITY_THREADS: DiscussionThread[] = [];

export const STUDENT_SHOWCASES: StudentShowcase[] = [
  {
    id: "sc-1",
    studentName: "Alex Chen",
    studentTrack: "Full-Stack Web Development",
    studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    projectTitle: "DevPulse: Real-Time Developer Activity Monitor",
    projectDescription: "A full-stack dashboard built with Next.js, WebSockets, and Tailwind that aggregates GitHub pull requests, CI/CD build statuses, and Jira sprints in one unified terminal view.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "WebSockets"],
    liveUrl: "https://slrjlearn.in/projects",
    githubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    screenshotUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    likesCount: 58
  },
  {
    id: "sc-2",
    studentName: "Sarah Kim",
    studentTrack: "Frontend Engineering & UI/UX",
    studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    projectTitle: "WeatherSense: Geolocation Climate Studio",
    projectDescription: "Interactive atmospheric dashboard featuring live radar maps, UV safety advisories, and responsive SVG weather charts powered by OpenWeather REST API.",
    tags: ["JavaScript", "Fetch API", "CSS Grid", "ChartJS"],
    liveUrl: "https://slrjlearn.in/projects",
    githubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    screenshotUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop&q=80",
    likesCount: 42
  },
  {
    id: "sc-3",
    studentName: "Rohan Varma",
    studentTrack: "Python & AI Engineering",
    studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    projectTitle: "DocuQuery: PDF Semantic Search Assistant",
    projectDescription: "RAG pipeline that ingests long technical handbooks, computes FAISS vector embeddings, and answers queries with verified page citations.",
    tags: ["Python", "FastAPI", "VectorDB", "LangChain"],
    liveUrl: "https://slrjlearn.in/projects",
    githubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    screenshotUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    likesCount: 67
  }
];

export const DAILY_CHALLENGES: DailyCodingChallenge[] = [
  {
    id: "dc-palindrome",
    title: "Valid Palindrome with Alphanumeric Filtering",
    difficulty: "Easy",
    category: "Strings & Two Pointers",
    xpReward: 50,
    prompt: "Given a string s, return true if it is a palindrome after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters.",
    starterCode: `function isPalindrome(s) {
  // Write your solution here
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    testCases: [
      { input: `"A man, a plan, a canal: Panama"`, expected: "true" },
      { input: `"race a car"`, expected: "false" }
    ],
    solutionHint: "Use two pointers moving inwards towards the center after cleaning non-alphanumeric characters."
  },
  {
    id: "dc-fizzbuzz",
    title: "Classic FizzBuzz Generator",
    difficulty: "Easy",
    category: "Conditionals & Loops",
    xpReward: 40,
    prompt: "Given an integer n, return an array of strings where multiples of 3 are 'Fizz', multiples of 5 are 'Buzz', and multiples of both are 'FizzBuzz'.",
    starterCode: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(String(i));
  }
  return result;
}`,
    testCases: [
      { input: `3`, expected: `["1", "2", "Fizz"]` },
      { input: `5`, expected: `["1", "2", "Fizz", "4", "Buzz"]` }
    ],
    solutionHint: "Check divisibility by 15 (or both 3 and 5) first before checking 3 or 5 individually."
  }
];
