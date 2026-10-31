"use client";

import { C_CODING_CHALLENGES, CodingChallenge } from "@/data/codingChallengesData";
import { recordCodeCompletion } from "./courseProgressMetrics";

const STORAGE_KEY_PROGRESS = "slrj_coding_practice_progress_v2";
const STORAGE_KEY_DRAFTS_PREFIX = "slrj_code_draft_";

export interface StudentCodingProgress {
  solvedProblemIds: string[];
  attemptedProblemIds: string[];
  totalSubmissions: number;
  successfulSubmissions: number;
  totalXpEarned: number;
  lastUpdated: string;
}

const DEFAULT_PROGRESS: StudentCodingProgress = {
  solvedProblemIds: [],
  attemptedProblemIds: [],
  totalSubmissions: 0,
  successfulSubmissions: 0,
  totalXpEarned: 0,
  lastUpdated: new Date().toISOString(),
};

export function getStudentCodingProgress(): StudentCodingProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProblemAttempt(problemId: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStudentCodingProgress();
    if (!current.attemptedProblemIds.includes(problemId)) {
      current.attemptedProblemIds.push(problemId);
    }
    current.totalSubmissions += 1;
    current.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(current));
  } catch (err) {
    console.error("Failed to save problem attempt:", err);
  }
}

export function saveProblemSolved(
  problemId: string,
  topicIndex: number,
  xpReward: number,
  courseSlug: string = "c-programming"
): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStudentCodingProgress();
    if (!current.attemptedProblemIds.includes(problemId)) {
      current.attemptedProblemIds.push(problemId);
    }
    if (!current.solvedProblemIds.includes(problemId)) {
      current.solvedProblemIds.push(problemId);
      current.successfulSubmissions += 1;
      current.totalXpEarned += xpReward;
    }
    current.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(current));

    // Also link with course progress metrics so topic card updates in curriculum
    recordCodeCompletion(courseSlug, topicIndex + 1);
  } catch (err) {
    console.error("Failed to save problem solved:", err);
  }
}

export function getSavedDraftCode(problemId: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(`${STORAGE_KEY_DRAFTS_PREFIX}${problemId}`);
  } catch {
    return null;
  }
}

export function saveDraftCode(problemId: string, code: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${STORAGE_KEY_DRAFTS_PREFIX}${problemId}`, code);
  } catch {
    // Ignore storage quota errors
  }
}

export interface PracticeAnalytics {
  totalChallenges: number;
  totalAttempted: number;
  totalSolved: number;
  accuracyRate: number; // percentage
  totalXp: number;
  byDifficulty: {
    easy: { solved: number; total: number; percentage: number };
    medium: { solved: number; total: number; percentage: number };
    hard: { solved: number; total: number; percentage: number };
  };
  byTopic: {
    topicIndex: number;
    topicTitle: string;
    solved: number;
    total: number;
    percentage: number;
  }[];
}

export function getCodingPracticeAnalytics(): PracticeAnalytics {
  const progress = getStudentCodingProgress();
  const all = C_CODING_CHALLENGES;

  const totalChallenges = all.length;
  const totalSolved = progress.solvedProblemIds.length;
  const totalAttempted = progress.attemptedProblemIds.length;

  const accuracyRate =
    progress.totalSubmissions > 0
      ? Math.round((progress.successfulSubmissions / progress.totalSubmissions) * 100)
      : totalSolved > 0
      ? 100
      : 0;

  // Breakdown by difficulty
  const easyChallenges = all.filter((c) => c.difficulty === "Easy");
  const medChallenges = all.filter((c) => c.difficulty === "Medium");
  const hardChallenges = all.filter((c) => c.difficulty === "Hard");

  const easySolved = easyChallenges.filter((c) => progress.solvedProblemIds.includes(c.id)).length;
  const medSolved = medChallenges.filter((c) => progress.solvedProblemIds.includes(c.id)).length;
  const hardSolved = hardChallenges.filter((c) => progress.solvedProblemIds.includes(c.id)).length;

  // Breakdown by topic (0 to 4)
  const topicTitles = [
    "Introduction, Variables & Data Types",
    "Operators, Conditions & Loops",
    "Functions, Arrays & Strings",
    "Pointers & Memory Management",
    "Structures & File Handling",
  ];

  const byTopic = topicTitles.map((title, idx) => {
    const topicChallenges = all.filter((c) => c.topicIndex === idx);
    const solved = topicChallenges.filter((c) => progress.solvedProblemIds.includes(c.id)).length;
    const total = topicChallenges.length;
    const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;
    return {
      topicIndex: idx,
      topicTitle: title,
      solved,
      total,
      percentage,
    };
  });

  return {
    totalChallenges,
    totalAttempted,
    totalSolved,
    accuracyRate,
    totalXp: progress.totalXpEarned,
    byDifficulty: {
      easy: {
        solved: easySolved,
        total: easyChallenges.length,
        percentage: easyChallenges.length > 0 ? Math.round((easySolved / easyChallenges.length) * 100) : 0,
      },
      medium: {
        solved: medSolved,
        total: medChallenges.length,
        percentage: medChallenges.length > 0 ? Math.round((medSolved / medChallenges.length) * 100) : 0,
      },
      hard: {
        solved: hardSolved,
        total: hardChallenges.length,
        percentage: hardChallenges.length > 0 ? Math.round((hardSolved / hardChallenges.length) * 100) : 0,
      },
    },
    byTopic,
  };
}
