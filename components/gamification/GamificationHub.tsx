"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import {
  CURRENT_WEEKLY_CHALLENGE,
  MOCK_LEADERBOARDS,
  getPast30Days,
  AchievementBadge,
  LeaderboardUser,
} from "@/lib/gamification";
import {
  Flame,
  Award,
  Trophy,
  Zap,
  Calendar,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Code2,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronRight,
  Shield,
  Layers,
  BarChart3,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GamificationHub() {
  const { user } = useAuth();
  const {
    state,
    currentLevel,
    nextLevel,
    levelProgress,
    xpToNextLevel,
    submitChallengeSolution,
    toggleIncognito,
  } = useGamification();

  // Active section tab: "overview" | "challenge" | "leaderboard" | "badges"
  const [activeTab, setActiveTab] = useState<"overview" | "challenge" | "leaderboard" | "badges">("overview");

  // Leaderboard filters
  const [timeFilter, setTimeFilter] = useState<"weekly" | "monthly" | "allTime">("weekly");
  const [categoryFilter, setCategoryFilter] = useState<"challenges" | "quizzes" | "activity" | "overall">("challenges");

  // Weekly Challenge interactive runner state
  const [challengeCode, setChallengeCode] = useState(
    state.submittedChallenges[CURRENT_WEEKLY_CHALLENGE.id]?.code || CURRENT_WEEKLY_CHALLENGE.starterCode
  );
  const [testResults, setTestResults] = useState<
    Array<{ id: number; passed: boolean; input: string; expected: string; actual: string }> | null
  >(null);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(
    Boolean(state.submittedChallenges[CURRENT_WEEKLY_CHALLENGE.id]?.passed)
  );

  // Live countdown timer to challenge deadline
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 4,
    hours: 14,
    minutes: 32,
    seconds: 15,
  });

  useEffect(() => {
    const target = new Date(CURRENT_WEEKLY_CHALLENGE.deadline).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 30 Days Activity Calendar
  const past30Days = useMemo(() => getPast30Days(), []);

  // Leaderboard entries computation
  const leaderboardEntries = useMemo(() => {
    const list = MOCK_LEADERBOARDS[timeFilter][categoryFilter] || [];
    if (state.incognitoMode) {
      // Filter out current user from public display if incognito enabled
      return list.filter((u) => !u.isCurrentUser);
    }
    return list;
  }, [timeFilter, categoryFilter, state.incognitoMode]);

  // Execute Challenge Tests in safe simulated evaluator
  const handleRunTests = () => {
    try {
      // Evaluate user code in safe scope
      // eslint-disable-next-line no-new-func
      const runner = new Function(
        `${challengeCode}; return typeof longestPalindrome === "function" ? longestPalindrome : null;`
      )();

      if (!runner) {
        setTestResults([
          {
            id: 1,
            passed: false,
            input: '"babad"',
            expected: '"bab"',
            actual: "Error: Function longestPalindrome not found",
          },
        ]);
        return;
      }

      const results = CURRENT_WEEKLY_CHALLENGE.testCases.map((tc) => {
        let actual = "";
        let passed = false;
        try {
          const rawInput = JSON.parse(tc.input);
          const out = runner(rawInput);
          actual = JSON.stringify(out);
          passed = actual === tc.expected || (rawInput === "babad" && actual === '"aba"'); // "aba" is also valid palindrome in "babad"
        } catch (err: any) {
          actual = `Error: ${err.message}`;
          passed = false;
        }

        return {
          id: tc.id,
          passed,
          input: tc.input,
          expected: tc.expected,
          actual,
        };
      });

      setTestResults(results);

      const allPassed = results.every((r) => r.passed);
      if (allPassed) {
        submitChallengeSolution(CURRENT_WEEKLY_CHALLENGE.id, challengeCode, true);
        setShowSolution(true);
      }
    } catch (e: any) {
      setTestResults([
        {
          id: 1,
          passed: false,
          input: 'Syntax Check',
          expected: 'Valid JS Syntax',
          actual: `SyntaxError: ${e.message}`,
        },
      ]);
    }
  };

  const hasPassedChallenge = Boolean(state.submittedChallenges[CURRENT_WEEKLY_CHALLENGE.id]?.passed);

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-28 pb-20 selection:bg-cyan-500/30">
      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* ─── Hero Gamification Bar ─── */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#071329] via-[#040A18] to-[#02050E] border border-cyan-500/30 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Trophy size={14} className="text-cyan-400" />
                <span>SoloLearn-Style Gamification Hub</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white mb-2">
                Level Up Your Coding Mastery
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Build a continuous daily habit, conquer algorithmic weekly quests, earn verified skill badges,
                and climb the global leaderboard.
              </p>
            </div>

            {/* Current Level Pill Box */}
            <div className="flex-shrink-0 p-5 rounded-2xl bg-[#080D1A]/90 border border-white/10 backdrop-blur-md flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-cyan-500/20 border border-amber-400/30 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/10">
                {currentLevel.badge}
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  Level {currentLevel.levelNumber} Scholar
                </span>
                <h3 className="text-xl font-bold text-white font-brand">{currentLevel.title}</h3>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                  <span>{state.xp.totalXP} Total XP</span>
                  <span>•</span>
                  <span className="text-amber-300">
                    {nextLevel ? `${xpToNextLevel} XP to ${nextLevel.title}` : "Max Level Reached!"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* XP Progress Bar to Next Level */}
          <div className="mt-6 pt-5 border-t border-white/10 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono mb-2 text-slate-300">
              <span>Level Progress ({levelProgress}%)</span>
              <span className="text-cyan-300">
                {nextLevel ? `${currentLevel.minXP} / ${nextLevel.minXP} XP` : "Mastery Max"}
              </span>
            </div>
            <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 transition-all duration-500 shadow-md shadow-cyan-500/20"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* ─── Navigation Tabs ─── */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
          {[
            { id: "overview", label: "Streak & XP Overview", icon: Flame },
            { id: "challenge", label: "Weekly Coding Challenge", icon: Code2 },
            { id: "leaderboard", label: "Global Leaderboards", icon: Trophy },
            { id: "badges", label: "Badges & Achievements", icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-mono font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-lg shadow-cyan-500/20"
                    : "bg-[#080D1A] hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─── TAB 1: STREAK & XP OVERVIEW ─── */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Daily Streak Card */}
              <div className="p-6 rounded-3xl bg-[#080D1A] border border-rose-500/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                    Learning Streak
                  </span>
                  <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400">
                    <Flame size={18} className="animate-pulse" />
                  </div>
                </div>
                <div className="text-4xl font-black text-white font-brand mb-1">
                  {state.streak.currentStreak} Days
                </div>
                <p className="text-xs text-slate-400">
                  Personal Best: <strong className="text-white">{state.streak.longestStreak} Days</strong>. Keep learning daily!
                </p>
              </div>

              {/* Verified Total XP */}
              <div className="p-6 rounded-3xl bg-[#080D1A] border border-amber-500/30 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    Total XP Points
                  </span>
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                    <Award size={18} />
                  </div>
                </div>
                <div className="text-4xl font-black text-white font-brand mb-1">
                  {state.xp.totalXP} XP
                </div>
                <p className="text-xs text-slate-400">
                  Earned via lessons, quizzes, weekly quests, and projects.
                </p>
              </div>

              {/* Badges Unlocked */}
              <div className="p-6 rounded-3xl bg-[#080D1A] border border-cyan-500/30 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Badges Acquired
                  </span>
                  <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400">
                    <Trophy size={18} />
                  </div>
                </div>
                <div className="text-4xl font-black text-white font-brand mb-1">
                  {state.badges.filter((b) => b.unlocked).length} / {state.badges.length}
                </div>
                <p className="text-xs text-slate-400">
                  Verified achievements across programming tracks.
                </p>
              </div>
            </div>

            {/* 30-Day Activity Heatmap Calendar */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                    <Calendar size={15} />
                    <span>Consistency Calendar</span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-brand">
                    Past 30 Days Learning Heatmap
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-white/5 border border-white/10" />
                    <span>Inactive</span>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-2.5">
                {past30Days.map((day, idx) => (
                  <div
                    key={idx}
                    title={`${day.date}: ${day.isCompleted ? "Active Learning Day" : "No Activity"}`}
                    className={`aspect-square rounded-xl p-1.5 flex flex-col justify-between transition-all ${
                      day.isCompleted
                        ? "bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-400/50 shadow-md shadow-emerald-500/10 text-emerald-300"
                        : "bg-white/[0.02] border border-white/5 text-slate-600 hover:border-white/20"
                    } ${day.isToday ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#080D1A]" : ""}`}
                  >
                    <span className="text-[10px] font-mono font-bold">{day.dayNumber}</span>
                    <div className="flex justify-end">
                      {day.isCompleted ? (
                        <CheckCircle2 size={13} className="text-emerald-400" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* XP Points Breakdown by Activity Category */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <BarChart3 size={15} />
                <span>Verified Activity Points</span>
              </div>
              <h3 className="text-xl font-bold text-white font-brand mb-6">
                XP Points Distribution Breakdown
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {[
                  { label: "Lessons", xp: state.xp.lessonsXP, icon: BookOpen, color: "text-cyan-400" },
                  { label: "Quizzes", xp: state.xp.quizzesXP, icon: HelpCircle, color: "text-amber-400" },
                  { label: "Challenges", xp: state.xp.challengesXP, icon: Code2, color: "text-emerald-400" },
                  { label: "Projects", xp: state.xp.projectsXP, icon: Layers, color: "text-purple-400" },
                  { label: "Community", xp: state.xp.communityXP, icon: Sparkles, color: "text-pink-400" },
                ].map((item, idx) => {
                  const pct = Math.round((item.xp / Math.max(1, state.xp.totalXP)) * 100);
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-slate-400">{item.label}</span>
                        <Icon size={14} className={item.color} />
                      </div>
                      <div className="text-xl font-black text-white font-brand mb-1">
                        {item.xp} XP
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{pct}% of total</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: WEEKLY CODING CHALLENGE ─── */}
        {activeTab === "challenge" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Challenge Header Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080D1A] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                      {CURRENT_WEEKLY_CHALLENGE.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                      {CURRENT_WEEKLY_CHALLENGE.difficulty} Difficulty
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1">
                      <Award size={13} />
                      +{CURRENT_WEEKLY_CHALLENGE.xpReward} XP Reward
                    </span>
                    {hasPassedChallenge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-black text-xs font-mono font-black flex items-center gap-1">
                        <CheckCircle2 size={13} />
                        Completed & Verified
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black text-white font-brand mb-2">
                    {CURRENT_WEEKLY_CHALLENGE.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Master edge cases and algorithmic time complexity. Submit your solution to claim points.
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="flex-shrink-0 p-4 rounded-2xl bg-[#030712] border border-white/10 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider mb-1">
                    Challenge Closes In
                  </span>
                  <div className="flex items-center gap-2 text-lg sm:text-2xl font-black font-brand text-cyan-300">
                    <span>{String(timeLeft.days).padStart(2, "0")}d</span>:
                    <span>{String(timeLeft.hours).padStart(2, "0")}h</span>:
                    <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>:
                    <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Statement */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl">
              <h3 className="text-base font-bold text-white font-brand mb-3 flex items-center gap-2">
                <Code2 size={18} className="text-cyan-400" />
                <span>Problem Statement</span>
              </h3>
              <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans mb-4">
                {CURRENT_WEEKLY_CHALLENGE.problemStatement}
              </div>

              {/* Required Skills */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                <span className="text-xs font-mono text-slate-400 font-bold">Skills Required:</span>
                {CURRENT_WEEKLY_CHALLENGE.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-cyan-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Code Editor & Test Runner */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  JavaScript Solution Editor
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChallengeCode(CURRENT_WEEKLY_CHALLENGE.starterCode)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    <span>Reset Starter Code</span>
                  </button>
                  <button
                    onClick={handleRunTests}
                    className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    <Play size={13} />
                    <span>Run Automated Tests</span>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-[#030712] border border-white/10 overflow-hidden mb-6">
                <textarea
                  value={challengeCode}
                  onChange={(e) => setChallengeCode(e.target.value)}
                  rows={14}
                  className="w-full p-4 bg-transparent font-mono text-xs sm:text-sm text-cyan-200 outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Test Results Output */}
              {testResults && (
                <div className="mb-6 p-5 rounded-2xl bg-[#030712] border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                      Automated Test Results ({testResults.filter((r) => r.passed).length}/{testResults.length} Passed)
                    </span>
                    {testResults.every((r) => r.passed) && (
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={14} />
                        All Tests Passed! +{CURRENT_WEEKLY_CHALLENGE.xpReward} XP Awarded
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {testResults.map((tr) => (
                      <div
                        key={tr.id}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                          tr.passed
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                            : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                        }`}
                      >
                        <div>
                          <span>Test Case #{tr.id} — Input: {tr.input}</span>
                          <span className="block text-[11px] text-slate-400 mt-0.5">
                            Expected: {tr.expected} | Got: {tr.actual}
                          </span>
                        </div>
                        <span className="font-bold">{tr.passed ? "PASSED" : "FAILED"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hints & Solution Section */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Lightbulb size={14} />
                  <span>{showHints ? "Hide Hints" : "View Algorithmic Hints"}</span>
                </button>

                {hasPassedChallenge && (
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer font-bold"
                  >
                    <CheckCircle2 size={14} />
                    <span>{showSolution ? "Hide Solution Explanation" : "View Official Solution Explanation"}</span>
                  </button>
                )}
              </div>

              {/* Hints Accordion */}
              {showHints && (
                <div className="mt-4 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-2 text-xs text-slate-300 font-sans">
                  <strong className="text-cyan-300 block font-mono">Hints:</strong>
                  {CURRENT_WEEKLY_CHALLENGE.hints.map((hint, idx) => (
                    <p key={idx}>• {hint}</p>
                  ))}
                </div>
              )}

              {/* Solution Modal/Accordion */}
              {showSolution && (
                <div className="mt-4 p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs sm:text-sm text-slate-200">
                  <h4 className="text-base font-bold text-emerald-300 font-brand mb-2">
                    Official Solution Breakdown
                  </h4>
                  <div className="whitespace-pre-line font-sans leading-relaxed mb-4">
                    {CURRENT_WEEKLY_CHALLENGE.solutionExplanation}
                  </div>
                  <pre className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-emerald-400 overflow-x-auto">
                    <code>{CURRENT_WEEKLY_CHALLENGE.solutionCode}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── TAB 3: LEADERBOARD ─── */}
        {activeTab === "leaderboard" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Leaderboard Toolbar & Privacy Toggle */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Competition Categories */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {[
                  { id: "challenges", label: "Weekly Coding Challenges" },
                  { id: "quizzes", label: "Quiz Competitions" },
                  { id: "activity", label: "Monthly Activity" },
                  { id: "overall", label: "Overall Hall of Fame" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                      categoryFilter === cat.id
                        ? "bg-cyan-400 text-black shadow-md shadow-cyan-500/20"
                        : "bg-white/5 text-slate-300 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Time Filters & Incognito Toggle */}
              <div className="flex items-center gap-3">
                <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                  {(["weekly", "monthly", "allTime"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeFilter(t)}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer uppercase ${
                        timeFilter === t ? "bg-white/15 text-white font-bold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {t === "allTime" ? "All-Time" : t}
                    </button>
                  ))}
                </div>

                {/* Privacy Incognito Setting */}
                <button
                  onClick={toggleIncognito}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                    state.incognitoMode
                      ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                  title="Toggle Incognito Mode: Hide your public score from leaderboards"
                >
                  {state.incognitoMode ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{state.incognitoMode ? "Incognito Active" : "Public Ranking"}</span>
                </button>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="p-6 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl overflow-hidden">
              <div className="space-y-3">
                {leaderboardEntries.map((learner) => {
                  const isTop3 = learner.rank <= 3;
                  const rankColors = [
                    "from-amber-400 to-yellow-500 text-black shadow-amber-500/30",
                    "from-slate-300 to-slate-400 text-black shadow-slate-400/20",
                    "from-amber-700 to-amber-600 text-white shadow-amber-700/20",
                  ];

                  return (
                    <div
                      key={learner.id}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                        learner.isCurrentUser
                          ? "bg-gradient-to-r from-cyan-950/40 via-[#07131F] to-[#040814] border-cyan-400/60 shadow-lg shadow-cyan-500/10"
                          : "bg-white/[0.02] border-white/5 hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Rank Badge */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-brand font-black text-sm ${
                            isTop3
                              ? `bg-gradient-to-br ${rankColors[learner.rank - 1]} shadow-md`
                              : "bg-white/5 text-slate-400"
                          }`}
                        >
                          #{learner.rank}
                        </div>

                        {/* Avatar */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={learner.avatar}
                          alt={learner.name}
                          className="w-10 h-10 rounded-full object-cover border border-white/10"
                        />

                        {/* Info */}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">
                              {learner.name}
                            </span>
                            {learner.isCurrentUser && (
                              <span className="text-[10px] font-mono font-black text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/30">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-mono text-slate-400">
                            {learner.role} • {learner.completedChallenges} Quests Solved
                          </span>
                        </div>
                      </div>

                      {/* Score & Streak */}
                      <div className="flex items-center gap-6 text-right">
                        <div className="hidden sm:block">
                          <span className="text-xs font-mono text-rose-400 flex items-center gap-1 justify-end font-bold">
                            <Flame size={13} />
                            <span>{learner.streak}d streak</span>
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            {learner.badgesCount} Badges
                          </span>
                        </div>

                        <div>
                          <span className="text-base sm:text-lg font-black text-amber-300 font-brand block">
                            {learner.score} XP
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Score</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 4: BADGES & ACHIEVEMENTS ─── */}
        {activeTab === "badges" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {state.badges.map((badge: AchievementBadge) => (
                <div
                  key={badge.id}
                  className={`p-6 rounded-3xl border transition-all flex items-start gap-5 ${
                    badge.unlocked
                      ? "bg-gradient-to-r from-amber-950/20 via-[#0A101D] to-[#040814] border-amber-500/30 shadow-xl shadow-amber-500/5"
                      : "bg-[#080D1A] border-white/5 opacity-70"
                  }`}
                >
                  {/* Badge Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border ${
                      badge.unlocked
                        ? "bg-gradient-to-br from-amber-400/20 to-yellow-500/10 border-amber-400/40 shadow-lg shadow-amber-500/20"
                        : "bg-white/5 border-white/10 text-slate-600 grayscale"
                    }`}
                  >
                    {badge.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-base font-bold text-white font-brand">
                        {badge.name}
                      </h4>
                      {badge.unlocked ? (
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-slate-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock size={12} />
                          Locked
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {badge.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-slate-400 mb-2">
                      <strong>Requirement:</strong> {badge.requirement}
                    </div>

                    {badge.unlocked && badge.unlockedAt && (
                      <span className="text-[10px] font-mono text-amber-300/80 block">
                        Unlocked on {badge.unlockedAt}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
