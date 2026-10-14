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

export const COMMUNITY_THREADS: DiscussionThread[] = [
  {
    id: "thread-1",
    title: "Why does flex: 1 1 0 vs flex: 1 1 auto make such a difference in CSS Grid and Flexbox?",
    category: "Web Development",
    authorName: "Sarah Kim",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    createdAt: "2 hours ago",
    content: "I was debugging a layout where child elements were overflowing despite having flex: 1. Changing to flex-basis: 0 resolved it. Could someone explain how flex-basis determines content-size vs available-space distribution?",
    codeSnippet: `.child-container {
  /* When is flex: 1 1 0 preferred over flex: 1 1 auto? */
  flex: 1 1 0px;
  min-width: 0; /* Solves text overflow truncation */
}`,
    codeLanguage: "css",
    upvotes: 24,
    tags: ["CSS", "Flexbox", "Responsive"],
    commentsCount: 3,
    isSolved: true,
    comments: [
      {
        id: "c-101",
        authorName: "Kouluri Shahid",
        authorRole: "mentor",
        authorAvatar: "/icon.jpg",
        createdAt: "1 hour ago",
        content: "Great question Sarah! flex-basis: 0 distributes space strictly proportional to flex-grow without taking intrinsic content width into account. flex-basis: auto first calculates the natural content width, then distributes whatever leftover space remains. That's why basis: 0 guarantees strictly equal columns!",
        upvotes: 18
      },
      {
        id: "c-102",
        authorName: "Alex Chen",
        authorRole: "student",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        createdAt: "45 mins ago",
        content: "Also, min-width: 0 is essential! By default flex items have min-width: auto, which prevents shrinking below text length. Adding min-width: 0 allows ellipsis truncation to work cleanly.",
        upvotes: 12
      }
    ]
  },
  {
    id: "thread-2",
    title: "Two Sum in O(N): Storing complements in a JavaScript Map vs Object lookup performance",
    category: "DSA",
    authorName: "David Patel",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    createdAt: "5 hours ago",
    content: "When solving LeetCode Two Sum in JavaScript, is it better to use Map or a plain {} object for storing number complements?",
    codeSnippet: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    codeLanguage: "javascript",
    upvotes: 31,
    tags: ["DSA", "JavaScript", "Algorithms", "InterviewPrep"],
    commentsCount: 2,
    isSolved: true,
    comments: [
      {
        id: "c-201",
        authorName: "Priya Sharma",
        authorRole: "instructor",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        createdAt: "3 hours ago",
        content: "Map is preferred here because numeric keys are preserved as numbers rather than coerced to strings, and it avoids prototype collisions (like 'toString'). In V8, Map is highly optimized for frequent set/get operations.",
        upvotes: 22
      }
    ]
  },
  {
    id: "thread-3",
    title: "How to structure Next.js App Router Server Actions for secure database mutations",
    category: "Web Development",
    authorName: "Emily Vance",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    createdAt: "1 day ago",
    content: "With Next.js App Router, what is the best pattern to validate authorization and form input schemas inside 'use server' actions before inserting into Postgres?",
    codeSnippet: `'use server';
import { z } from 'zod';

const TaskSchema = z.object({
  title: z.string().min(3).max(100),
  priority: z.enum(['low', 'medium', 'high'])
});

export async function createTaskAction(prevState, formData) {
  // Validate schema & user session
}`,
    codeLanguage: "typescript",
    upvotes: 19,
    tags: ["Next.js", "React", "ServerActions", "Postgres"],
    commentsCount: 1,
    isSolved: false,
    comments: [
      {
        id: "c-301",
        authorName: "Kouluri Shahid",
        authorRole: "mentor",
        authorAvatar: "/icon.jpg",
        createdAt: "18 hours ago",
        content: "Zod safeParse() combined with a getSession() helper is the industry standard pattern. Always return structured { success: boolean, errors?: ... } objects so your client form can display field-level validation messages without reloading.",
        upvotes: 15
      }
    ]
  }
];

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
