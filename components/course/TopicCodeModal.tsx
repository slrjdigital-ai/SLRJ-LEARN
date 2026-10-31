"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  X,
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Code2,
  Sparkles,
  Loader2,
  FileCode,
  Award,
  Lightbulb,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Target,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  BarChart3,
  Layers,
  ArrowRight,
  HelpCircle,
  Clock,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { useCertificatesManager } from "@/lib/certificateStorage";
import { useAuth } from "@/context/AuthContext";
import EditorCanvas from "@/components/playground/EditorCanvas";
import { EditorTheme, THEMES } from "@/lib/playground/syntaxHighlighter";
import {
  C_CODING_CHALLENGES,
  TOPIC_CHALLENGES_METADATA,
  CodingChallenge,
  TestCase,
  getChallengesForTopic,
} from "@/data/codingChallengesData";
import {
  getStudentCodingProgress,
  saveProblemAttempt,
  saveProblemSolved,
  getSavedDraftCode,
  saveDraftCode,
  getCodingPracticeAnalytics,
  PracticeAnalytics,
} from "@/lib/codingPracticeStorage";
import { EvaluatedTestCase } from "@/lib/cCodeRunner";

interface TopicCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle?: string;
  topicNumber?: number | string;
  courseTitle?: string;
  courseSlug?: string;
  language?: string;
  initialCode?: string;
  solutionCode?: string;
  taskDescription?: string;
  expectedOutput?: string;
  explanation?: string;
  isFinalCombined?: boolean;
}

export default function TopicCodeModal({
  isOpen,
  onClose,
  topicTitle = "C Programming",
  topicNumber = 1,
  courseTitle = "C Programming: Fundamentals to System Architecture",
  courseSlug = "c-programming",
  isFinalCombined = false,
}: TopicCodeModalProps) {
  const { awardXP } = useGamification();
  const { claimCertificate } = useCertificatesManager();
  const { user } = useAuth();

  // Active topic index (0 to 4)
  const initialTopicIdx = useMemo(() => {
    if (typeof topicNumber === "number") return Math.max(0, Math.min(4, topicNumber - 1));
    const parsed = parseInt(String(topicNumber), 10);
    if (!isNaN(parsed)) return Math.max(0, Math.min(4, parsed - 1));
    return 0;
  }, [topicNumber]);

  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(initialTopicIdx);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>("");

  // Editor settings
  const [editorTheme, setEditorTheme] = useState<EditorTheme>("vs-dark");
  const [fontSize, setFontSize] = useState<number>(14);
  const [activeLanguage, setActiveLanguage] = useState<string>("c");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Challenge state
  const [code, setCode] = useState<string>("");
  const [isSolutionRevealed, setIsSolutionRevealed] = useState<boolean>(false);
  const [expandedHintIndex, setExpandedHintIndex] = useState<number | null>(null);

  // Execution & Test results
  const [activeConsoleTab, setActiveConsoleTab] = useState<"terminal" | "testcases">("testcases");
  const [selectedTestCaseId, setSelectedTestCaseId] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [outputStdout, setOutputStdout] = useState<string>("");
  const [outputStderr, setOutputStderr] = useState<string>("");
  const [testResults, setTestResults] = useState<EvaluatedTestCase[]>([]);
  const [submissionScore, setSubmissionScore] = useState<number | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"Passed" | "Failed" | null>(null);
  const [executionStats, setExecutionStats] = useState<{ timeMs: number; memoryMb: number }>({
    timeMs: 0,
    memoryMb: 1.2,
  });

  // Analytics & Progress
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<PracticeAnalytics | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Challenges for active topic
  const topicChallenges = useMemo(() => {
    return getChallengesForTopic(activeTopicIndex);
  }, [activeTopicIndex]);

  // Current active challenge
  const activeChallenge = useMemo<CodingChallenge>(() => {
    const found = topicChallenges.find((c) => c.id === selectedChallengeId);
    return found || topicChallenges[0] || C_CODING_CHALLENGES[0];
  }, [topicChallenges, selectedChallengeId]);

  // Synchronize initial selection on modal open or topic switch
  useEffect(() => {
    if (isOpen) {
      setActiveTopicIndex(initialTopicIdx);
    }
  }, [isOpen, initialTopicIdx]);

  useEffect(() => {
    if (topicChallenges.length > 0) {
      const first = topicChallenges[0].id;
      setSelectedChallengeId(first);
    }
  }, [activeTopicIndex, topicChallenges]);

  // Load code (draft or starter) when active challenge changes
  useEffect(() => {
    if (!activeChallenge) return;
    const saved = getSavedDraftCode(activeChallenge.id);
    setCode(saved || activeChallenge.starterCode);
    setIsSolutionRevealed(false);
    setOutputStdout("");
    setOutputStderr("");
    setTestResults([]);
    setSubmissionScore(null);
    setSubmissionStatus(null);
    setExpandedHintIndex(null);
    if (activeChallenge.testCases.length > 0) {
      setSelectedTestCaseId(activeChallenge.testCases[0].id);
    }
  }, [activeChallenge]);

  // Refresh progress records
  const refreshProgress = useCallback(() => {
    const p = getStudentCodingProgress();
    setSolvedIds(p.solvedProblemIds);
    setAnalytics(getCodingPracticeAnalytics());
  }, []);

  useEffect(() => {
    if (isOpen) {
      refreshProgress();
    }
  }, [isOpen, refreshProgress]);

  // Lock body scroll and Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !showAnalyticsModal) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, showAnalyticsModal]);

  // Handle code change with auto-draft save
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (activeChallenge) {
      saveDraftCode(activeChallenge.id, newCode);
    }
  };

  // Reset starter code
  const handleResetCode = () => {
    if (!activeChallenge) return;
    setCode(activeChallenge.starterCode);
    saveDraftCode(activeChallenge.id, activeChallenge.starterCode);
    setIsSolutionRevealed(false);
    setOutputStdout("");
    setOutputStderr("");
    setTestResults([]);
    setSubmissionScore(null);
    setSubmissionStatus(null);
  };

  // Toggle reveal solution
  const handleToggleSolution = () => {
    if (!activeChallenge) return;
    if (isSolutionRevealed) {
      setCode(activeChallenge.starterCode);
      setIsSolutionRevealed(false);
    } else {
      setCode(activeChallenge.solutionCode);
      setIsSolutionRevealed(true);
    }
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Run Code (Sample Test Cases)
  const handleRunCode = async () => {
    if (!activeChallenge) return;
    setIsRunning(true);
    saveProblemAttempt(activeChallenge.id);

    try {
      const res = await fetch("/api/practice/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          problemId: activeChallenge.id,
          language: activeLanguage,
        }),
      });

      const data = await res.json();
      setOutputStdout(data.stdout || "");
      setOutputStderr(data.stderr || "");
      setTestResults(data.testResults || []);
      setExecutionStats({
        timeMs: data.executionTimeMs || 24,
        memoryMb: +(1.2 + Math.random() * 0.4).toFixed(2),
      });

      if (data.testResults && data.testResults.length > 0) {
        setSelectedTestCaseId(data.testResults[0].id);
        setActiveConsoleTab("testcases");
      } else {
        setActiveConsoleTab("terminal");
      }
    } catch (err: any) {
      setOutputStderr(`Execution failed: ${err?.message || "Server connection error"}`);
      setActiveConsoleTab("terminal");
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code (Comprehensive Evaluation with hidden test cases)
  const handleSubmitCode = async () => {
    if (!activeChallenge) return;
    setIsSubmitting(true);
    saveProblemAttempt(activeChallenge.id);

    try {
      const res = await fetch("/api/practice/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: activeChallenge.id,
          code,
          language: activeLanguage,
          courseSlug,
        }),
      });

      const data = await res.json();
      setOutputStdout(data.stdout || "");
      setOutputStderr(data.stderr || "");
      setTestResults(data.testResults || []);
      setSubmissionScore(data.score ?? 0);
      setSubmissionStatus(data.status || "Failed");
      setExecutionStats({
        timeMs: data.executionTimeMs || 32,
        memoryMb: +(1.4 + Math.random() * 0.3).toFixed(2),
      });

      setActiveConsoleTab("testcases");

      if (data.status === "Passed") {
        saveProblemSolved(activeChallenge.id, activeTopicIndex, data.xpAwarded || activeChallenge.xpReward, courseSlug);
        refreshProgress();

        try {
          awardXP(data.xpAwarded || activeChallenge.xpReward, `Solved: ${activeChallenge.title}`);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (err: any) {
      setOutputStderr(`Submission error: ${err?.message || "Network error"}`);
      setActiveConsoleTab("terminal");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigate to next challenge in topic
  const handleNextChallenge = () => {
    const currentIndex = topicChallenges.findIndex((c) => c.id === activeChallenge.id);
    if (currentIndex !== -1 && currentIndex < topicChallenges.length - 1) {
      setSelectedChallengeId(topicChallenges[currentIndex + 1].id);
    } else if (activeTopicIndex < 4) {
      setActiveTopicIndex((prev) => prev + 1);
    }
  };

  // Current topic solved count
  const topicSolvedCount = useMemo(() => {
    return topicChallenges.filter((c) => solvedIds.includes(c.id)).length;
  }, [topicChallenges, solvedIds]);

  // Selected test case details
  const activeTestCase = useMemo(() => {
    const fromResults = testResults.find((t) => t.id === selectedTestCaseId);
    if (fromResults) return fromResults;
    const fromChallenge = activeChallenge?.testCases.find((t) => t.id === selectedTestCaseId);
    if (fromChallenge) {
      return {
        ...fromChallenge,
        actualOutput: "",
        passed: false,
        executionTimeMs: 0,
      };
    }
    return testResults[0] || (activeChallenge?.testCases[0] ? { ...activeChallenge.testCases[0], actualOutput: "", passed: false, executionTimeMs: 0 } : null);
  }, [testResults, activeChallenge, selectedTestCaseId]);

  if (!isOpen) return null;

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-2 md:p-3 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
      onClick={onClose}
    >
      <div
        data-lenis-prevent="true"
        className={`w-full bg-[#080D1A] text-slate-100 shadow-2xl border border-slate-800 flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen ? "fixed inset-0 rounded-none z-50" : "max-w-[98vw] xl:max-w-7xl h-[96vh] rounded-2xl md:rounded-3xl"
        }`}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* ══════════════════════════════════════════════════════════════════
            TOP NAVIGATION & CONTROLS BAR
        ══════════════════════════════════════════════════════════════════ */}
        <header className="px-4 py-2.5 sm:px-5 bg-[#050914] border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          {/* Left: Brand & Topic Selector */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#12316B] to-[#18B6D2] text-white flex items-center justify-center shadow-xs">
                <Code2 size={18} />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-brand font-black text-xs text-white tracking-wide">SLRJ LEARN</span>
                  <span className="text-[10px] text-[#18B6D2] font-mono font-bold bg-[#18B6D2]/10 px-1.5 py-0.2 rounded border border-[#18B6D2]/20">
                    IDE
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">Learn. Practice. Build.</div>
              </div>
            </div>

            <span className="text-slate-700 hidden md:inline">|</span>

            {/* Topic Dropdown Switcher */}
            <div className="relative">
              <select
                aria-label="Select Course Topic"
                value={activeTopicIndex}
                onChange={(e) => setActiveTopicIndex(parseInt(e.target.value, 10))}
                className="bg-[#0B132B] hover:bg-[#101C3D] text-slate-200 text-xs font-bold py-1.5 pl-3 pr-8 rounded-xl border border-slate-700/80 focus:outline-none focus:ring-1 focus:ring-[#18B6D2] cursor-pointer appearance-none transition-all truncate max-w-[200px] sm:max-w-xs"
              >
                {TOPIC_CHALLENGES_METADATA.map((t) => (
                  <option key={t.topicIndex} value={t.topicIndex}>
                    Topic {t.topicIndex + 1}: {t.topicTitle}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>

            {/* Topic Progress Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-bold shrink-0">
              <CheckCircle2 size={12} />
              <span>
                {topicSolvedCount}/{topicChallenges.length} Solved
              </span>
            </div>
          </div>

          {/* Right: Language, Themes, Controls, Close */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-1 bg-[#0B132B] p-1 rounded-xl border border-slate-800 text-[11px]">
              {["c", "python", "cpp", "java", "js"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveLanguage(lang)}
                  className={`px-2 py-0.5 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                    activeLanguage === lang
                      ? "bg-[#18B6D2] text-[#050914] shadow-2xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title={lang === "c" ? "C (Active Execution Engine)" : `${lang.toUpperCase()} (Next module)`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Font Size Selector */}
            <div className="hidden md:flex items-center bg-[#0B132B] rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setFontSize((f) => Math.max(12, f - 1))}
                className="px-2 py-1 text-slate-400 hover:text-white font-mono transition-colors cursor-pointer"
                title="Decrease font size"
              >
                A-
              </button>
              <span className="text-[10px] text-slate-500 font-mono px-1">{fontSize}px</span>
              <button
                type="button"
                onClick={() => setFontSize((f) => Math.min(18, f + 1))}
                className="px-2 py-1 text-slate-400 hover:text-white font-mono transition-colors cursor-pointer"
                title="Increase font size"
              >
                A+
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() =>
                setEditorTheme((prev) => (prev === "vs-dark" ? "github-light" : "vs-dark"))
              }
              className="p-1.5 rounded-xl bg-[#0B132B] hover:bg-[#101C3D] text-slate-300 border border-slate-800 transition-colors cursor-pointer"
              title={`Switch editor theme (currently ${editorTheme})`}
            >
              {editorTheme === "github-light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {/* Analytics Modal Button */}
            <button
              type="button"
              onClick={() => {
                refreshProgress();
                setShowAnalyticsModal(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#12224A] hover:bg-[#172D63] text-[#18B6D2] border border-[#18B6D2]/30 text-xs font-bold transition-all cursor-pointer shadow-xs"
              title="View coding analytics and completion badges"
            >
              <BarChart3 size={14} />
              <span>Stats</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-xl bg-[#0B132B] hover:bg-[#101C3D] text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer hidden sm:block"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
              title="Close Practice Platform"
            >
              <X size={17} />
            </button>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════════════
            MAIN 3-PANEL CODING WORKSPACE
        ══════════════════════════════════════════════════════════════════ */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
          {/* ──────────────────────────────────────────────────────────────
              LEFT PANEL: Coding Problems & Instructions (4 of 12 cols)
          ────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 bg-[#070D1E] border-r border-slate-800/90 flex flex-col min-h-0 overflow-hidden">
            {/* Exercises Horizontal Tab Scroll / List Header */}
            <div className="p-3 bg-[#050A18] border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Topic {activeTopicIndex + 1} Exercises ({topicChallenges.length})
              </span>
              <span className="text-[11px] font-bold text-cyan-400">
                +{activeChallenge.xpReward} XP
              </span>
            </div>

            {/* Exercise Selector Pills */}
            <div className="p-2 bg-[#060B1C] border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
              {topicChallenges.map((ch, idx) => {
                const isSelected = ch.id === activeChallenge.id;
                const isSolved = solvedIds.includes(ch.id);

                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setSelectedChallengeId(ch.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#18B6D2] text-[#050914] shadow-xs"
                        : isSolved
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25"
                        : "bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-slate-700/60"
                    }`}
                  >
                    {isSolved ? (
                      <CheckCircle2 size={13} className={isSelected ? "text-[#050914]" : "text-emerald-400"} />
                    ) : (
                      <span className="font-mono text-[10px] opacity-75">{idx + 1}.</span>
                    )}
                    <span>{ch.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Problem Statement & Context (Scrollable Body) */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-slate-200">
              {/* Problem Title & Difficulty Badge */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      activeChallenge.difficulty === "Easy"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : activeChallenge.difficulty === "Medium"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {activeChallenge.difficulty}
                  </span>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-slate-400 text-xs">C Programming</span>
                  {solvedIds.includes(activeChallenge.id) && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      Solved ✅
                    </span>
                  )}
                </div>

                <h2 className="text-base sm:text-lg font-black font-brand text-white leading-snug">
                  {activeChallenge.title}
                </h2>
              </div>

              {/* Problem Description */}
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
                <p>{activeChallenge.description}</p>
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/25 text-xs text-blue-200">
                  <strong className="text-white">Objective: </strong>
                  <span>{activeChallenge.objective}</span>
                </div>
              </div>

              {/* Constraints */}
              {activeChallenge.constraints?.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Constraints & Specification
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {activeChallenge.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#18B6D2] font-mono">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sample Input & Expected Output Box */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Sample I/O Case</span>
                  <span className="text-[10px] font-normal text-slate-500">Case #1</span>
                </div>

                <div className="rounded-xl bg-[#040812] border border-slate-800 p-3 space-y-2 font-mono text-xs">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-sans font-bold">Input</div>
                    <div className="text-slate-300 text-[11px]">{activeChallenge.sampleInput}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-[10px] text-emerald-400 uppercase font-sans font-bold">Expected Output</div>
                    <div className="text-emerald-300 text-[11px] whitespace-pre-wrap">{activeChallenge.sampleOutput}</div>
                  </div>
                </div>
              </div>

              {/* Hints Accordion */}
              {activeChallenge.hints?.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Lightbulb size={13} />
                    <span>Problem Solving Hints ({activeChallenge.hints.length})</span>
                  </div>

                  <div className="space-y-1.5">
                    {activeChallenge.hints.map((hint, idx) => {
                      const isExpanded = expandedHintIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="rounded-xl border border-slate-800 bg-[#0A1226] overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedHintIndex(isExpanded ? null : idx)}
                            className="w-full px-3 py-2 text-left text-xs font-bold text-slate-300 hover:text-white flex items-center justify-between cursor-pointer"
                          >
                            <span>Hint {idx + 1}</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          {isExpanded && (
                            <div className="px-3 pb-2.5 pt-0 text-xs text-amber-200/90 leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-150">
                              {hint}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────────
              CENTER & BOTTOM PANELS: Editor + Console (8 of 12 cols)
          ────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-8 bg-[#090E1D] flex flex-col min-h-0 overflow-hidden">
            {/* Editor Tab Bar */}
            <div className="px-4 py-2 bg-[#070C18] border-b border-slate-800 flex items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-t-lg bg-[#0E172E] text-cyan-300 font-mono text-xs font-bold border-t-2 border-[#18B6D2]">
                  <FileCode size={13} />
                  <span>main.c</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                  ANSI C • GCC 14.2
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Solution Reveal Toggle */}
                <button
                  type="button"
                  onClick={handleToggleSolution}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSolutionRevealed
                      ? "bg-amber-500/20 text-amber-300 border-amber-400/40"
                      : "bg-slate-800/70 hover:bg-slate-700 text-slate-300 border-slate-700"
                  }`}
                  title={isSolutionRevealed ? "Revert to starter code" : "View explained solution"}
                >
                  <Lightbulb size={12} className={isSolutionRevealed ? "text-amber-400" : "text-slate-400"} />
                  <span className="hidden sm:inline">{isSolutionRevealed ? "Hide Solution" : "Show Solution"}</span>
                </button>

                {/* Copy Code */}
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                  title="Copy Code"
                >
                  {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>

                {/* Reset Code */}
                <button
                  type="button"
                  onClick={handleResetCode}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset to starter code"
                >
                  <RotateCcw size={12} />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* Code Editor Body */}
            <div className="flex-1 min-h-[220px] max-h-[50vh] lg:max-h-none overflow-hidden relative bg-[#070C18]">
              <EditorCanvas
                code={code}
                language={activeLanguage}
                theme={editorTheme}
                fontSize={fontSize}
                onChange={handleCodeChange}
                onRunShortcut={handleRunCode}
                onSaveShortcut={handleSubmitCode}
              />
            </div>

            {/* ──────────────────────────────────────────────────────────
                BOTTOM PANEL: Console Output & Test Cases
            ────────────────────────────────────────────────────────── */}
            <div className="h-64 sm:h-72 bg-[#050A16] border-t border-slate-800 flex flex-col shrink-0">
              {/* Console Tabs & Status Indicator */}
              <div className="px-4 py-2 bg-[#040812] border-b border-slate-800/90 flex items-center justify-between gap-3 text-xs shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("testcases")}
                    className={`px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeConsoleTab === "testcases"
                        ? "bg-[#18B6D2]/15 text-[#18B6D2] border border-[#18B6D2]/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Target size={13} />
                    <span>Test Cases ({activeChallenge.testCases.length})</span>
                    {submissionStatus && (
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                          submissionStatus === "Passed"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-rose-500/20 text-rose-400"
                        }`}
                      >
                        {submissionStatus}
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("terminal")}
                    className={`px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeConsoleTab === "terminal"
                        ? "bg-[#18B6D2]/15 text-[#18B6D2] border border-[#18B6D2]/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Terminal size={13} />
                    <span>Output Console</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                  <span>Time: {executionStats.timeMs}ms</span>
                  <span>•</span>
                  <span>Mem: {executionStats.memoryMb}MB</span>
                </div>
              </div>

              {/* Console Body */}
              <div className="flex-1 p-3 sm:p-4 overflow-y-auto font-mono text-xs">
                {activeConsoleTab === "testcases" ? (
                  <div className="space-y-3">
                    {/* Test Case Selection Chips */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {(testResults.length > 0 ? testResults : activeChallenge.testCases).map((tc, idx) => {
                        const isSelected = (tc as any).id === selectedTestCaseId;
                        const result = testResults.find((r) => r.id === (tc as any).id);
                        const isPassed = result?.passed;
                        const isRun = !!result;

                        return (
                          <button
                            key={(tc as any).id}
                            type="button"
                            onClick={() => setSelectedTestCaseId((tc as any).id)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#18B6D2] text-[#050914] border-[#18B6D2]"
                                : isRun && isPassed
                                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                                : isRun && !isPassed
                                ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                                : "bg-[#091124] text-slate-400 border-slate-800 hover:text-slate-200"
                            }`}
                          >
                            {isRun ? (
                              isPassed ? (
                                <Check size={12} className={isSelected ? "text-[#050914]" : "text-emerald-400"} />
                              ) : (
                                <XCircle size={12} className={isSelected ? "text-[#050914]" : "text-rose-400"} />
                              )
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-slate-600" />
                            )}
                            <span>
                              {tc.isHidden ? `Test ${idx + 1} (Hidden)` : `Case ${idx + 1}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Test Case Details */}
                    {activeTestCase && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div className="p-3 rounded-xl bg-[#030610] border border-slate-800/80 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-sans font-bold text-slate-400">
                            <span>Input</span>
                            <span className="text-[10px] text-slate-500">stdin</span>
                          </div>
                          <div className="text-slate-300 text-[11px] bg-[#070E22] p-2 rounded-lg min-h-[36px]">
                            {activeTestCase.input || "(no input)"}
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-sans font-bold text-emerald-400 pt-1">
                            <span>Expected Output</span>
                            <span className="text-[10px] text-emerald-500">Required</span>
                          </div>
                          <div className="text-emerald-300 text-[11px] bg-[#070E22] p-2 rounded-lg whitespace-pre-wrap min-h-[36px]">
                            {activeTestCase.expectedOutput}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#030610] border border-slate-800/80 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-sans font-bold text-slate-400">
                            <span>Your Output</span>
                            {activeTestCase.actualOutput !== undefined && activeTestCase.actualOutput !== "" ? (
                              activeTestCase.passed ? (
                                <span className="text-[10px] font-bold text-emerald-400">Passed ✅</span>
                              ) : (
                                <span className="text-[10px] font-bold text-rose-400">Failed ❌</span>
                              )
                            ) : (
                              <span className="text-[10px] text-slate-500">Not executed yet</span>
                            )}
                          </div>
                          <div
                            className={`text-[11px] p-2 rounded-lg whitespace-pre-wrap min-h-[96px] ${
                              activeTestCase.actualOutput !== undefined && activeTestCase.actualOutput !== ""
                                ? activeTestCase.passed
                                  ? "bg-emerald-950/20 text-emerald-200 border border-emerald-500/30"
                                  : "bg-rose-950/20 text-rose-200 border border-rose-500/30"
                                : "bg-[#070E22] text-slate-500 italic"
                            }`}
                          >
                            {activeTestCase.actualOutput || "Run or Submit your code to evaluate against this test case."}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Terminal Tab */
                  <div className="space-y-2">
                    {outputStderr && (
                      <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs whitespace-pre-wrap leading-relaxed">
                        {outputStderr}
                      </div>
                    )}
                    {outputStdout ? (
                      <div className="p-3 rounded-xl bg-[#030610] border border-slate-800 text-emerald-300 text-xs whitespace-pre-wrap leading-relaxed">
                        {outputStdout}
                      </div>
                    ) : (
                      !outputStderr && (
                        <div className="text-slate-500 italic text-xs py-4 text-center">
                          Click &apos;Run Code&apos; to execute in live C sandbox or &apos;Submit Code&apos; to evaluate against all test cases.
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* ──────────────────────────────────────────────────────────
                  STICKY ACTION TOOLBAR
              ────────────────────────────────────────────────────────── */}
              <div className="px-4 py-2.5 bg-[#030713] border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (activeChallenge.hints?.length > 0) {
                        setExpandedHintIndex(0);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-slate-700/80 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Lightbulb size={13} />
                    <span>Get Hint</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleSolution}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 text-xs font-bold transition-all cursor-pointer"
                  >
                    <BookOpen size={13} />
                    <span>{isSolutionRevealed ? "Hide Code" : "Solution"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Run Code Button */}
                  <button
                    type="button"
                    onClick={handleRunCode}
                    disabled={isRunning || isSubmitting}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isRunning ? (
                      <>
                        <Loader2 size={13} className="animate-spin text-cyan-400" />
                        <span>Compiling...</span>
                      </>
                    ) : (
                      <>
                        <Play size={13} fill="currentColor" className="text-cyan-400" />
                        <span>Run Code</span>
                      </>
                    )}
                  </button>

                  {/* Submit Code Button */}
                  <button
                    type="button"
                    onClick={handleSubmitCode}
                    disabled={isRunning || isSubmitting}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#18B6D2] to-[#12316B] hover:brightness-110 disabled:opacity-50 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={13} className="animate-spin text-white" />
                        <span>Evaluating...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={14} className="text-emerald-300" />
                        <span>Submit Code</span>
                      </>
                    )}
                  </button>

                  {/* Next Challenge Button */}
                  <button
                    type="button"
                    onClick={handleNextChallenge}
                    className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Go to next challenge"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            STUDENT PROGRESS & ANALYTICS MODAL DIALOG
        ══════════════════════════════════════════════════════════════════ */}
        {showAnalyticsModal && analytics && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => setShowAnalyticsModal(false)}
          >
            <div
              className="w-full max-w-xl bg-[#090F22] rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-5 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <BarChart3 size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Student Coding Analytics</h3>
                    <p className="text-xs text-slate-400">SLRJ Learn Practice Metric Summary</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAnalyticsModal(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-[#060B18] border border-slate-800 text-center">
                  <div className="text-xl font-black text-cyan-400">{analytics.totalSolved}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Solved</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#060B18] border border-slate-800 text-center">
                  <div className="text-xl font-black text-purple-400">{analytics.totalAttempted}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Attempted</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#060B18] border border-slate-800 text-center">
                  <div className="text-xl font-black text-emerald-400">{analytics.accuracyRate}%</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Accuracy</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#060B18] border border-slate-800 text-center">
                  <div className="text-xl font-black text-amber-400">+{analytics.totalXp}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">XP Earned</div>
                </div>
              </div>

              {/* Topic Completion Progress Bars */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Topic Completion Breakdown
                </div>
                <div className="space-y-2">
                  {analytics.byTopic.map((t) => (
                    <div key={t.topicIndex} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 truncate">
                          Topic {t.topicIndex + 1}: {t.topicTitle}
                        </span>
                        <strong className="text-cyan-400 font-mono">
                          {t.solved}/{t.total} ({t.percentage}%)
                        </strong>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#12316B] to-[#18B6D2] rounded-full transition-all"
                          style={{ width: `${t.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAnalyticsModal(false)}
                  className="px-5 py-2 rounded-xl bg-[#18B6D2] text-[#050914] text-xs font-black"
                >
                  Continue Practicing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
