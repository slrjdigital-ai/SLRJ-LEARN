"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Play,
  RotateCcw,
  Lightbulb,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Terminal,
  Code2,
  Trophy,
  ChevronRight,
  X,
  Maximize2,
  BarChart2,
  Bot,
  Copy,
  Check,
  Loader2,
  MessageSquare,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

import {
  CodingChallenge,
  TopicChallengesGroup,
} from "@/data/codingChallengesData";
import { C_PRACTICE_CHALLENGES } from "@/data/codingPracticeChallenges";
import {
  evaluateCodeAgainstChallenge,
  EvaluatedTestCase,
  ExecutionResult,
} from "@/lib/cCodeRunner";
import {
  getStudentCodingProgress,
  saveProblemAttempt,
  saveProblemSolved,
  getSavedDraftCode,
  saveDraftCode,
} from "@/lib/codingPracticeStorage";
import { useGamification } from "@/context/GamificationContext";

// ─── Helpers ────────────────────────────────────────────────────────────────

function groupByTopic(challenges: CodingChallenge[]): TopicChallengesGroup[] {
  const map = new Map<number, TopicChallengesGroup>();
  for (const c of challenges) {
    if (!map.has(c.topicIndex)) {
      map.set(c.topicIndex, {
        topicIndex: c.topicIndex,
        topicTitle: c.topicTitle,
        description: "",
        challenges: [],
      });
    }
    map.get(c.topicIndex)!.challenges.push(c);
  }
  return Array.from(map.values()).sort((a, b) => a.topicIndex - b.topicIndex);
}

const TOPICS = groupByTopic(C_PRACTICE_CHALLENGES);

const TOPIC_TITLES = [
  "Topic 1: Introduction, Variables & Data Types",
  "Topic 2: Operators, Conditions & Loops",
  "Topic 3: Functions, Arrays & Strings",
  "Topic 4: Pointers & Memory Management",
  "Topic 5: Structures & File Handling",
];

const LANGUAGES = ["C", "PYTHON", "CPP", "JAVA", "JS"] as const;
type Lang = (typeof LANGUAGES)[number];

const FONT_SIZES = [12, 14, 16, 18, 20] as const;

// ─── Line-numbered Editor ────────────────────────────────────────────────────

function CodeEditor({
  value,
  onChange,
  fontSize,
}: {
  value: string;
  onChange: (v: string) => void;
  fontSize: number;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const lines = value.split("\n");

  const syncScroll = () => {
    if (textareaRef.current && linesRef.current) {
      linesRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newVal = value.substring(0, start) + "    " + value.substring(end);
      onChange(newVal);
      setTimeout(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden font-mono" style={{ fontSize }}>
      {/* Line numbers */}
      <div
        ref={linesRef}
        className="select-none bg-[#1a1d2e] text-[#4a5175] px-3 pt-4 pb-4 text-right overflow-hidden flex-shrink-0"
        style={{ minWidth: "3rem", lineHeight: "1.6", fontSize }}
      >
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        onKeyDown={handleTab}
        spellCheck={false}
        className="flex-1 bg-[#12141C] text-[#c9d1d9] outline-none resize-none p-4 leading-[1.6] w-full"
        style={{ fontSize, lineHeight: "1.6" }}
      />
    </div>
  );
}

interface LearnIDEProps {
  courseSlug?: string;
  courseTitle?: string;
}

export default function LearnIDE({ courseSlug, courseTitle }: LearnIDEProps = {}) {
  const { awardXP } = useGamification();

  // State
  const [activeTopic, setActiveTopic] = useState(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [language] = useState<Lang>("C");
  const [fontSize, setFontSize] = useState<number>(14);

  const currentGroup = TOPICS[activeTopic] ?? TOPICS[0];
  const currentChallenge: CodingChallenge =
    currentGroup.challenges[activeChallengeIdx] ??
    currentGroup.challenges[0];

  const [code, setCode] = useState(currentChallenge.starterCode);
  const [revealedHints, setRevealedHints] = useState(0);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<"cases" | "console">("cases");
  const [activeCase, setActiveCase] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [progress, setProgress] = useState(getStudentCodingProgress);
  const [copied, setCopied] = useState(false);

  const totalInTopic = currentGroup.challenges.length;
  const solvedInTopic = currentGroup.challenges.filter((c) =>
    progress.solvedProblemIds.includes(c.id)
  ).length;
  const isSolved = progress.solvedProblemIds.includes(currentChallenge.id);

  // Load saved draft when challenge changes
  useEffect(() => {
    const draft = getSavedDraftCode(currentChallenge.id);
    setCode(draft ?? currentChallenge.starterCode);
    setResult(null);
    setRevealedHints(0);
    setShowSolution(false);
    setActiveCase(0);
  }, [currentChallenge.id]);

  // Auto-save draft on code change
  useEffect(() => {
    const t = setTimeout(() => saveDraftCode(currentChallenge.id, code), 600);
    return () => clearTimeout(t);
  }, [code, currentChallenge.id]);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setActiveTab("console");
    await new Promise((r) => setTimeout(r, 400));
    const res = evaluateCodeAgainstChallenge(code, currentChallenge.testCases);
    setResult(res);
    setIsRunning(false);
    saveProblemAttempt(currentChallenge.id);

    if (res.passRate === 100) {
      saveProblemSolved(
        currentChallenge.id,
        currentChallenge.topicIndex,
        currentChallenge.xpReward
      );
      awardXP?.(currentChallenge.xpReward, "code-challenge");
      setProgress(getStudentCodingProgress());
      setActiveTab("cases");
    }
  }, [code, currentChallenge, awardXP]);

  const handleReset = () => {
    setCode(currentChallenge.starterCode);
    setResult(null);
    saveDraftCode(currentChallenge.id, currentChallenge.starterCode);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleRevealHint = () => {
    if (revealedHints < currentChallenge.hints.length) {
      setRevealedHints((n) => n + 1);
    }
  };

  const switchChallenge = (idx: number) => {
    setActiveChallengeIdx(idx);
  };

  const switchTopic = (idx: number) => {
    setActiveTopic(idx);
    setActiveChallengeIdx(0);
  };

  const visibleTestCases = currentChallenge.testCases;
  const activeTestCase = visibleTestCases[activeCase] ?? visibleTestCases[0];
  const activeTestResult = result?.testResults?.find(
    (r) => r.id === activeTestCase?.id
  );

  const diffColor =
    currentChallenge.difficulty === "Easy"
      ? "text-emerald-400 bg-emerald-900/30 border-emerald-700"
      : currentChallenge.difficulty === "Medium"
      ? "text-yellow-400 bg-yellow-900/30 border-yellow-700"
      : "text-rose-400 bg-rose-900/30 border-rose-700";

  return (
    <div className="flex flex-col h-screen bg-[#0d0f1a] text-white overflow-hidden">
      {/* ── TOP NAVBAR ── */}
      <header className="flex items-center gap-3 px-4 py-2 bg-[#12141C] border-b border-[#252836] z-20 flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            <Code2 size={14} className="text-white" />
          </div>
          <div className="leading-none">
            <span className="text-[11px] font-black text-white tracking-wide block">
              SLRJ LEARN
            </span>
            <span className="text-[9px] text-cyan-400 font-semibold block">
              IDE
            </span>
          </div>
          <span className="text-[10px] text-slate-500 ml-1 hidden sm:block">
            Learn. Practice. Build.
          </span>
        </div>

        {/* Back to All 21 Courses */}
        <Link
          href="/practice"
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1a1d2e] hover:bg-[#252836] border border-[#252836] hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
          title="Back to All 21 Courses Practice Catalog"
        >
          <ChevronLeft size={14} className="text-cyan-400" />
          <span className="hidden sm:inline">All 21 Courses</span>
          <span className="sm:hidden">Courses</span>
        </Link>

        {/* Course Title Badge if present */}
        {courseTitle && (
          <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-900/30 border border-blue-700/50 text-cyan-300 text-[11px] font-bold truncate max-w-xs">
            {courseTitle}
          </span>
        )}

        {/* Solved badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-900/30 border border-emerald-700/50 text-emerald-400 text-[11px] font-bold flex-shrink-0">
          <CheckCircle2 size={12} />
          <span>
            {solvedInTopic}/{totalInTopic} Solved
          </span>
        </div>

        {/* Stats */}
        <button className="ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1d2e] border border-[#252836] hover:border-[#3a3d4e] text-slate-300 text-[11px] font-semibold cursor-pointer transition-all">
          <BarChart2 size={13} />
          <span>Stats</span>
        </button>

        <Link
          href="/practice"
          title="Exit to All 21 Courses"
          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-900/20 cursor-pointer transition-all flex items-center justify-center"
        >
          <X size={14} />
        </Link>
      </header>

      {/* ── BODY ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ═══════════════ LEFT PANEL ═══════════════ */}
        <div className="w-[320px] flex-shrink-0 border-r border-[#252836] flex flex-col overflow-hidden bg-[#12141C]">
          {/* Challenge tabs */}
          <div className="px-3 pt-3 pb-2 border-b border-[#252836]">
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              <Trophy size={11} className="text-yellow-500" />
              <span>
                Topic {activeTopic + 1} Exercises ({totalInTopic})
              </span>
              <span className="ml-auto text-yellow-400">
                +{currentGroup.challenges.reduce((s, c) => s + c.xpReward, 0)}{" "}
                XP
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 w-full">
              {currentGroup.challenges.map((c, idx) => {
                const solved = progress.solvedProblemIds.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => switchChallenge(idx)}
                    className={`w-full px-2 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer border flex items-center gap-1 min-w-0 ${
                      idx === activeChallengeIdx
                        ? "bg-[#0b69ff] text-white border-blue-500 shadow-sm"
                        : solved
                        ? "bg-emerald-900/30 text-emerald-400 border-emerald-700/50 hover:border-emerald-500"
                        : "bg-[#1a1d2e] text-slate-300 border-[#252836] hover:border-[#3a3d4e]"
                    }`}
                  >
                    <span className="font-mono text-[9px] opacity-75 shrink-0">{idx + 1}.</span>
                    <span className="truncate text-left">{c.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable problem content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#252836]">
            {/* Difficulty + category */}
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${diffColor}`}
              >
                {currentChallenge.difficulty}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">
                {courseTitle || "C Programming"}
              </span>
              {isSolved && (
                <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                  <CheckCircle2 size={11} />
                  Solved
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-lg font-extrabold text-white leading-tight">
              {currentChallenge.title}
            </h2>

            {/* Description */}
            <p className="text-[13px] text-slate-300 leading-relaxed">
              {currentChallenge.description}
            </p>

            {/* Objective */}
            <div className="p-3 rounded-xl bg-blue-900/20 border border-blue-700/40">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-wider block mb-1">
                Objective
              </span>
              <p className="text-[12px] text-slate-200 font-semibold leading-relaxed">
                {currentChallenge.objective}
              </p>
            </div>



            {/* Sample I/O */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Sample I/O Case
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">
                  CASE #1
                </span>
              </div>
              <div className="rounded-xl bg-[#0d0f1a] border border-[#252836] overflow-hidden">
                <div className="px-3 pt-2 pb-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    Input
                  </span>
                  <p className="text-[12px] font-mono text-slate-300">
                    {currentChallenge.sampleInput || "(no input)"}
                  </p>
                </div>
                <div className="h-px bg-[#252836]" />
                <div className="px-3 pt-2 pb-3">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase block mb-1">
                    Expected Output
                  </span>
                  <p className="text-[12px] font-mono text-emerald-300 font-bold">
                    {currentChallenge.sampleOutput}
                  </p>
                </div>
              </div>
            </div>

            {/* Hints */}
            {currentChallenge.hints.length > 0 && (
              <div className="rounded-xl border border-[#252836] overflow-hidden">
                <button
                  onClick={() => setHintsOpen((o) => !o)}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-[#0d0f1a] hover:bg-[#1a1d2e] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb size={13} className="text-yellow-400" />
                    <span className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider">
                      Problem Solving Hints ({currentChallenge.hints.length})
                    </span>
                  </div>
                  {hintsOpen ? (
                    <ChevronUp size={13} className="text-slate-500" />
                  ) : (
                    <ChevronDown size={13} className="text-slate-500" />
                  )}
                </button>

                {hintsOpen && (
                  <div className="divide-y divide-[#252836]">
                    {currentChallenge.hints.map((hint, i) => (
                      <div
                        key={i}
                        className="px-3 py-2.5 bg-[#12141C]"
                      >
                        <button
                          onClick={() =>
                            setRevealedHints((n) => Math.max(n, i + 1))
                          }
                          className="w-full flex items-center justify-between cursor-pointer group"
                        >
                          <span className="text-[11px] font-bold text-slate-300">
                            Hint {i + 1}
                          </span>
                          {revealedHints > i ? (
                            <EyeOff
                              size={12}
                              className="text-slate-500 group-hover:text-slate-300 transition-colors"
                            />
                          ) : (
                            <ChevronDown
                              size={12}
                              className="text-slate-500 group-hover:text-slate-300 transition-colors"
                            />
                          )}
                        </button>
                        {revealedHints > i && (
                          <p className="text-[12px] text-yellow-300 mt-1.5 leading-relaxed">
                            {hint}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>


        </div>

        {/* ═══════════════ RIGHT PANEL ═══════════════ */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Editor toolbar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#12141C] border-b border-[#252836] flex-shrink-0">
            {/* File tab */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-t-lg bg-[#0d0f1a] border border-[#252836] border-b-[#0d0f1a] -mb-px text-[11px] font-mono text-slate-200">
              <Code2 size={11} className="text-cyan-400" />
              <span>main.c</span>
            </div>



            <div className="ml-auto flex items-center gap-2">
              {/* Solution overlay toggle */}
              <button
                onClick={() => setShowSolution((s) => !s)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1d2e] hover:bg-[#252836] text-slate-300 text-[11px] font-semibold border border-[#252836] hover:border-[#3a3d4e] transition-all cursor-pointer"
              >
                <Eye size={12} />
                <span>Show Solution</span>
              </button>
              {/* Copy */}
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-[#252836] cursor-pointer transition-all"
                title="Copy code"
              >
                {copied ? (
                  <Check size={13} className="text-emerald-400" />
                ) : (
                  <Copy size={13} />
                )}
              </button>
              {/* Reset */}
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1d2e] hover:bg-[#252836] text-slate-300 text-[11px] font-semibold border border-[#252836] hover:border-[#3a3d4e] transition-all cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Code Editor area */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-0 relative">
            {/* Solution overlay */}
            {showSolution && (
              <div className="absolute inset-0 z-10 bg-[#12141C]/95 backdrop-blur-sm flex flex-col overflow-auto">
                <div className="flex items-center justify-between px-4 py-2 border-b border-[#252836]">
                  <div className="flex items-center gap-2">
                    <Eye size={13} className="text-cyan-400" />
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                      Solution Code
                    </span>
                  </div>
                  <button
                    onClick={() => setShowSolution(false)}
                    className="p-1 rounded text-slate-500 hover:text-white cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                </div>
                <div className="flex flex-1 font-mono overflow-auto" style={{ fontSize }}>
                  <div className="select-none bg-[#1a1d2e] text-[#4a5175] px-3 pt-4 text-right flex-shrink-0" style={{ minWidth: "3rem", lineHeight: "1.6", fontSize }}>
                    {currentChallenge.solutionCode.split("\n").map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <pre className="flex-1 p-4 text-emerald-300 leading-[1.6] whitespace-pre overflow-auto" style={{ fontSize }}>
                    {currentChallenge.solutionCode}
                  </pre>
                </div>
              </div>
            )}

            {/* Editor */}
            <div className="flex flex-col flex-1 overflow-hidden min-h-0">
              <CodeEditor value={code} onChange={setCode} fontSize={fontSize} />
            </div>
          </div>

          {/* ── BOTTOM: Output Console Only ── */}
          <div
            className="flex-shrink-0 border-t border-[#252836] flex flex-col bg-[#0d0f1a]"
            style={{ height: "240px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#252836] flex-shrink-0">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Terminal size={14} />
                <span>Output</span>
              </div>
              {result && (
                <span className="text-[10px] text-slate-500 font-mono">
                  Time: {result.executionTimeMs}ms &nbsp;·&nbsp; Mem: 1.2MB
                </span>
              )}
            </div>

            {/* Output Body */}
            <div className="flex-1 p-4 font-mono text-xs overflow-auto">
              {isRunning ? (
                <div className="flex items-center gap-2 text-cyan-400">
                  <Loader2 size={14} className="animate-spin" />
                  <span>Compiling and executing...</span>
                </div>
              ) : result ? (
                <div className="space-y-2">
                  {result.compilationError ? (
                    <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-300">
                      <span className="text-slate-500">$ </span>
                      {result.compilationError}
                    </div>
                  ) : (
                    <>
                      {result.stdout && (
                        <div className="p-3 rounded-lg bg-[#12141C] border border-[#252836] text-emerald-300 whitespace-pre leading-relaxed">
                          {result.stdout}
                        </div>
                      )}
                      {result.stderr && (
                        <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-300 whitespace-pre leading-relaxed">
                          {result.stderr}
                        </div>
                      )}
                      {!result.stdout && !result.stderr && (
                        <div className="text-slate-500 italic">
                          Program exited successfully with code 0 (no output printed).
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="text-slate-500 italic flex items-center gap-2">
                  <span>Click &apos;Run Code&apos; to execute program and view output here.</span>
                </div>
              )}
            </div>
          </div>

          {/* ── BOTTOM ACTION BAR ── */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[#12141C] border-t border-[#252836] flex-shrink-0">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[12px] font-black shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              {isRunning ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Play size={14} fill="white" />
              )}
              <span>Run Code</span>
            </button>



            <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white text-[12px] font-bold shadow-lg shadow-purple-500/20 transition-all cursor-pointer">
              <Bot size={13} />
              <span>Samy AI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
