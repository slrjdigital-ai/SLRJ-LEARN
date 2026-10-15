"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
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

  const [activeTab, setActiveTab] = useState<"overview" | "challenge" | "leaderboard" | "badges">("overview");
  const [timeFilter, setTimeFilter] = useState<"weekly" | "monthly" | "allTime">("weekly");
  const [categoryFilter, setCategoryFilter] = useState<"challenges" | "quizzes" | "activity" | "overall">("challenges");

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

  const past30Days = useMemo(() => getPast30Days(), []);

  const leaderboardEntries = useMemo(() => {
    const list = MOCK_LEADERBOARDS[timeFilter][categoryFilter] || [];
    if (state.incognitoMode) {
      return list.filter((u) => !u.isCurrentUser);
    }
    return list;
  }, [timeFilter, categoryFilter, state.incognitoMode]);

  const handleRunTests = () => {
    try {
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
          passed = actual === tc.expected || (rawInput === "babad" && actual === '"aba"');
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
    <div className="space-y-8">
      {/* ─── Hero Gamification Bar ─── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f1fd] text-[#0b69ff] text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy size={14} />
            <span>Gamification & Coding Challenges</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-brand mb-2">
            Level Up Your Coding Mastery
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Build a continuous daily habit, conquer algorithmic weekly quests, earn verified skill badges,
            and climb the academy leaderboard.
          </p>
        </div>

        {/* Level Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4 flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl">
            {currentLevel.badge}
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#0b69ff] uppercase tracking-wider block">
              Level {currentLevel.levelNumber} Scholar
            </span>
            <h3 className="text-base font-bold text-slate-900 font-brand">{currentLevel.title}</h3>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">
              <span>{state.xp.totalXP} Total XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Tabs ─── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: "overview", label: "Streak & XP Overview", icon: Flame },
          { id: "challenge", label: "Weekly Coding Challenge", icon: Code2 },
          { id: "leaderboard", label: "Leaderboards", icon: Trophy },
          { id: "badges", label: "Badges & Achievements", icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0b69ff] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── TAB 1: OVERVIEW ─── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                  Learning Streak
                </span>
                <Flame size={18} className="text-rose-500 animate-pulse" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-brand mb-1">
                {state.streak.currentStreak} Days
              </div>
              <p className="text-xs text-slate-500">
                Personal Best: <strong>{state.streak.longestStreak} Days</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Total XP Points
                </span>
                <Award size={18} className="text-amber-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-brand mb-1">
                {state.xp.totalXP} XP
              </div>
              <p className="text-xs text-slate-500">
                Earned via lessons, quizzes, and weekly challenges.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0b69ff] uppercase tracking-wider">
                  Badges Acquired
                </span>
                <Trophy size={18} className="text-[#0b69ff]" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-brand mb-1">
                {state.badges.filter((b) => b.unlocked).length} / {state.badges.length}
              </div>
              <p className="text-xs text-slate-500">
                Verified achievements across engineering topics.
              </p>
            </div>
          </div>

          {/* 30-Day Activity Calendar */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 font-brand">
                Past 30 Days Learning Heatmap
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-100 border border-slate-200" />
                  <span>Inactive</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-2">
              {past30Days.map((day, idx) => (
                <div
                  key={idx}
                  title={`${day.date}: ${day.isCompleted ? "Active" : "Inactive"}`}
                  className={`aspect-square rounded-lg p-1 flex flex-col justify-between text-[10px] font-bold ${
                    day.isCompleted
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-50 text-slate-400 border border-slate-100"
                  } ${day.isToday ? "ring-2 ring-[#0b69ff]" : ""}`}
                >
                  <span>{day.dayNumber}</span>
                  {day.isCompleted && <CheckCircle2 size={12} className="self-end text-emerald-500" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: WEEKLY CODING CHALLENGE ─── */}
      {activeTab === "challenge" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#e8f1fd] text-[#0b69ff] text-xs font-bold">
                  {CURRENT_WEEKLY_CHALLENGE.difficulty}
                </span>
                <span className="text-xs font-bold text-amber-600">
                  +{CURRENT_WEEKLY_CHALLENGE.xpReward} XP
                </span>
                {hasPassedChallenge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    Passed
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-brand">
                {CURRENT_WEEKLY_CHALLENGE.title}
              </h2>
            </div>

            <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 text-center">
              <span className="block text-[10px] text-slate-400 uppercase">Closes In</span>
              <span className="font-bold text-sm text-[#0b69ff]">
                {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Problem Statement</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 whitespace-pre-line font-sans">
              {CURRENT_WEEKLY_CHALLENGE.problemStatement}
            </p>

            <div className="rounded-xl bg-[#0f172a] p-4 font-mono text-xs sm:text-sm text-emerald-300 overflow-hidden mb-4">
              <textarea
                value={challengeCode}
                onChange={(e) => setChallengeCode(e.target.value)}
                rows={12}
                className="w-full bg-transparent outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setChallengeCode(CURRENT_WEEKLY_CHALLENGE.starterCode)}
                className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 text-xs font-semibold"
              >
                Reset Code
              </button>
              <button
                onClick={handleRunTests}
                className="px-5 py-2 rounded-xl bg-[#0b69ff] hover:bg-blue-600 text-white font-bold text-xs font-mono flex items-center gap-1.5 shadow-sm"
              >
                <Play size={13} />
                <span>Run Automated Tests</span>
              </button>
            </div>

            {testResults && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Results ({testResults.filter((r) => r.passed).length}/{testResults.length} Passed)
                </span>
                {testResults.map((tr) => (
                  <div
                    key={tr.id}
                    className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
                      tr.passed
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                        : "bg-rose-50 border-rose-200 text-rose-800"
                    }`}
                  >
                    <span>Test #{tr.id} — Input: {tr.input}</span>
                    <span className="font-bold">{tr.passed ? "PASSED" : "FAILED"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── TAB 3: LEADERBOARD ─── */}
      {activeTab === "leaderboard" && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 font-brand">Academy Leaderboard</h3>
            <button
              onClick={toggleIncognito}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              {state.incognitoMode ? <EyeOff size={13} /> : <Eye size={13} />}
              <span>{state.incognitoMode ? "Incognito On" : "Public Mode"}</span>
            </button>
          </div>

          <div className="space-y-2">
            {leaderboardEntries.map((learner) => (
              <div
                key={learner.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 ${
                  learner.isCurrentUser
                    ? "bg-[#e8f1fd] border-blue-200 text-[#0b69ff]"
                    : "bg-white border-slate-200 text-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                    #{learner.rank}
                  </span>
                  <div>
                    <span className="font-bold text-sm block leading-tight">{learner.name}</span>
                    <span className="text-[11px] text-slate-500">{learner.role}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-base font-brand block">{learner.score} XP</span>
                  <span className="text-[10px] text-slate-500 font-mono">{learner.streak}d streak</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 4: BADGES ─── */}
      {activeTab === "badges" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {state.badges.map((badge: AchievementBadge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border flex items-start gap-4 ${
                badge.unlocked
                  ? "bg-white border-slate-200 shadow-sm"
                  : "bg-slate-50 border-slate-200/60 opacity-60"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl flex-shrink-0">
                {badge.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-slate-900">{badge.name}</h4>
                  {badge.unlocked ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      Locked
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mb-2">{badge.description}</p>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Requirement: {badge.requirement}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
