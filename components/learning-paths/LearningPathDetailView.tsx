"use client";

import { useState, useMemo, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { RoadmapTrack, RoadmapStep } from "@/data/roadmap";
import { getLessonContentForStep } from "@/data/roadmapLessons";
import { useAuth } from "@/context/AuthContext";
import {
  CheckCircle2,
  Circle,
  Clock,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  Sparkles,
  Search,
  Bot,
  Rocket,
  Zap,
  Copy,
  Check,
  AlertTriangle,
  Lightbulb,
  Award,
  Terminal,
  Trophy,
  ExternalLink,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "slrj_webdev_roadmap_progress";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem(STORAGE_KEY) || "[]";
}

function getServerSnapshot(): string {
  return "[]";
}

interface LearningPathDetailViewProps {
  track: RoadmapTrack;
  steps: RoadmapStep[];
}

export default function LearningPathDetailView({ track, steps }: LearningPathDetailViewProps) {
  const { user, toggleRoadmapStep } = useAuth();
  const [activeStepId, setActiveStepId] = useState<number>(steps[0]?.id || 1);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);

  const rawCompleted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const localCompletedSteps: number[] = useMemo(() => {
    try {
      return JSON.parse(rawCompleted);
    } catch {
      return [];
    }
  }, [rawCompleted]);

  const completedSteps = user ? user.completedRoadmapSteps : localCompletedSteps;
  const isClient = typeof window !== "undefined";

  // Active step and lesson content
  const currentStep = useMemo(() => {
    return steps.find((s) => s.id === activeStepId) || steps[0];
  }, [steps, activeStepId]);

  const currentLesson = useMemo(() => {
    return getLessonContentForStep(currentStep.id, currentStep.title, currentStep.summary);
  }, [currentStep]);

  // Track progress stats
  const completedCount = steps.filter((s) => completedSteps.includes(s.id)).length;
  const progressPercent = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;
  const earnedXP = completedCount * 50;

  // Navigation
  const currentIndex = steps.findIndex((s) => s.id === currentStep.id);
  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;

  // Reset quiz on step change
  useEffect(() => {
    setSelectedOption(null);
    setHasCheckedAnswer(false);
    setCopiedCode(false);
  }, [activeStepId]);

  const toggleStep = (stepId: number) => {
    if (user) {
      toggleRoadmapStep(stepId);
    }
    const next = completedSteps.includes(stepId)
      ? completedSteps.filter((id) => id !== stepId)
      : [...completedSteps, stepId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("storage"));
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAskLumio = () => {
    if (typeof window !== "undefined") {
      const prompt = `I am studying "${currentStep.title}" in the ${track.name} path.
Can you explain the main concepts simply, clarify common beginner mistakes, and guide me on completing the milestone: "${currentStep.practicalMilestone}"?`;
      window.dispatchEvent(
        new CustomEvent("open-lumio", {
          detail: {
            prompt,
            mode: "explain",
          },
        })
      );
    }
  };

  // Filter sidebar steps
  const filteredSteps = useMemo(() => {
    if (!sidebarSearch.trim()) return steps;
    const q = sidebarSearch.toLowerCase();
    return steps.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.keyTopics.some((t) => t.toLowerCase().includes(q))
    );
  }, [steps, sidebarSearch]);

  const isCurrentStepDone = completedSteps.includes(currentStep.id);

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20">
      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* ─── Top Nav & Breadcrumbs ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors mb-2 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Learning Paths</span>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-white font-brand">
                {track.name}
              </h1>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                {track.level}
              </span>
            </div>
          </div>

          {/* Progress & Quick Actions */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-xs font-mono">
                <span className="text-slate-400">Track Progress:</span>
                <span className="text-cyan-300 font-bold">{progressPercent}%</span>
                <span className="text-slate-500">({completedCount}/{steps.length})</span>
              </div>
              <div className="w-48 h-2 bg-white/5 rounded-full overflow-hidden mt-1.5 border border-white/10">
                <div
                  className={`h-full bg-gradient-to-r ${track.gradient} transition-all duration-300`}
                  style={{ width: `${isClient ? progressPercent : 0}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleAskLumio}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Ask Lumio AI about this stage"
            >
              <Bot size={15} className="text-cyan-300 animate-pulse" />
              <span className="hidden sm:inline">Ask Lumio</span>
            </button>
          </div>
        </div>

        {/* ─── Main Two-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Sticky Sidebar (Curriculum Stages) ── */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-28">
            <div className="p-4 rounded-3xl bg-[#060a14] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Curriculum Stages ({steps.length})
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  +{earnedXP} XP
                </span>
              </div>

              {/* Sidebar Search */}
              <div className="relative mb-3">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  placeholder="Search stages or topics..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400/50"
                />
              </div>

              {/* Stage List */}
              <div className="space-y-1.5 max-h-[65vh] overflow-y-auto pr-1 no-scrollbar">
                {filteredSteps.map((step) => {
                  const isDone = completedSteps.includes(step.id);
                  const isActive = step.id === currentStep.id;
                  const stepNum = String(step.stepNumber).padStart(2, "0");

                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStepId(step.id)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 via-teal-500/10 to-transparent border-cyan-400/50 text-white shadow-md shadow-cyan-500/10"
                          : isDone
                          ? "bg-emerald-950/20 border-emerald-500/20 text-slate-300 hover:text-white hover:bg-white/[0.04]"
                          : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded-lg border ${
                            isActive
                              ? "bg-cyan-400 text-black border-cyan-300"
                              : isDone
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : "bg-white/5 text-slate-400 border-white/10"
                          }`}
                        >
                          {stepNum}
                        </span>
                        <div className="truncate">
                          <div className={`text-xs font-bold truncate ${isActive ? "text-cyan-200" : "text-white"}`}>
                            {step.title.replace(/^\d+\.\s*/, "")}
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 block truncate">
                            {step.category} • {step.duration}
                          </span>
                        </div>
                      </div>

                      {/* Done status indicator */}
                      <div className="flex-shrink-0">
                        {isDone ? (
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        ) : (
                          <Circle size={15} className="text-slate-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Capstone Card Link */}
              <div className="mt-4 pt-3 border-t border-white/10 p-3 rounded-2xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 text-center">
                <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase block mb-1">
                  Capstone Deliverable
                </span>
                <div className="text-xs font-bold text-white line-clamp-1">{track.finalProject.title}</div>
              </div>
            </div>
          </div>

          {/* ── Right Main Content Area (In-Depth Lesson, Code & Practice) ── */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Stage Hero Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#060c1c] via-[#09152b] to-[#040812] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black px-3 py-1 rounded-xl bg-cyan-400 text-black font-bold">
                    STAGE {String(currentStep.stepNumber).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10">
                    {currentStep.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Clock size={13} className="text-slate-500" />
                    {currentStep.duration}
                  </span>
                </div>

                {/* Mark Stage Complete Toggle Button */}
                <button
                  onClick={() => toggleStep(currentStep.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-mono font-bold transition-all shadow-md cursor-pointer ${
                    isCurrentStepDone
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-emerald-500/20"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  {isCurrentStepDone ? (
                    <>
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <span>Stage Completed (+50 XP)</span>
                    </>
                  ) : (
                    <>
                      <Circle size={16} className="text-slate-400" />
                      <span>Mark Stage Complete</span>
                    </>
                  )}
                </button>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white font-brand tracking-tight mb-4">
                {currentStep.title.replace(/^\d+\.\s*/, "")}
              </h2>

              {/* In-depth Overview Paragraphs */}
              <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentLesson.overview.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </div>

            {/* ── Key Concepts Deconstruction ── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#060a14] border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-4">
                <BookOpen size={16} className="text-cyan-400" />
                <span>Key Concepts & Principles You Must Understand:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentLesson.keyConceptDetails.map((concept, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/30 transition-colors"
                  >
                    <h5 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{concept.title}</span>
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{concept.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Syntax-Highlighted Working Code Example ── */}
            <div className="rounded-3xl border border-white/10 bg-[#02050e] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-white/[0.04] border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Terminal size={14} className="text-cyan-400" />
                  <span>Interactive Code Example ({currentLesson.codeExample.language})</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/practice"
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <Code2 size={13} className="text-emerald-400" />
                    <span>Run in Playground</span>
                  </Link>

                  <button
                    onClick={() => handleCopyCode(currentLesson.codeExample.code)}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                  </button>
                </div>
              </div>

              <pre className="p-6 text-xs sm:text-sm font-mono text-cyan-100 overflow-x-auto leading-relaxed whitespace-pre">
                <code>{currentLesson.codeExample.code}</code>
              </pre>

              <div className="px-5 py-3 bg-white/[0.02] border-t border-white/5 text-xs text-slate-400 font-sans">
                💡 <strong className="text-slate-300">Explanation:</strong> {currentLesson.codeExample.explanation}
              </div>
            </div>

            {/* ── Common Mistakes & Pro Tips (Two Column Split) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Common Mistakes */}
              <div className="p-6 rounded-3xl bg-rose-950/15 border border-rose-500/25 shadow-lg">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase font-mono tracking-wider mb-3">
                  <AlertTriangle size={15} className="text-rose-400" />
                  <span>Common Beginner Pitfalls:</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {currentLesson.commonMistakes.map((mistake, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold mt-0.5">✕</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tips */}
              <div className="p-6 rounded-3xl bg-emerald-950/15 border border-emerald-500/25 shadow-lg">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase font-mono tracking-wider mb-3">
                  <Lightbulb size={15} className="text-emerald-400" />
                  <span>Senior Engineer Pro Tips:</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {currentLesson.proTips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Hands-On Milestone Project Callout ── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#08152e] to-[#040916] border border-cyan-500/40 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-cyan-300 font-mono font-bold text-xs uppercase tracking-wider">
                  <Rocket size={16} className="text-cyan-400" />
                  <span>Stage Milestone Project Assignment</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Practical Deliverable
                </span>
              </div>

              <h4 className="text-xl font-black text-white font-brand mb-2">
                {currentStep.practicalMilestone}
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                To master this stage, build this deliverable independently. Open your IDE or our Code Playground, write the code, and test edge cases.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/practice"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
                >
                  <Code2 size={15} />
                  <span>Launch Playground to Build</span>
                </Link>

                <button
                  onClick={handleAskLumio}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Bot size={15} className="text-cyan-400" />
                  <span>Ask Lumio for Starter Hints</span>
                </button>
              </div>
            </div>

            {/* ── Interactive Stage Quiz (SoloLearn Style) ── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#060a14] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  <HelpCircle size={16} className="text-amber-400" />
                  <span>Knowledge Check (Test Your Retention)</span>
                </div>
                <span className="text-xs font-mono text-slate-500">1 Question</span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white mb-4">
                {currentLesson.quiz.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5 mb-5">
                {currentLesson.quiz.options.map((opt, oIdx) => {
                  const isSelected = selectedOption === oIdx;
                  const isCorrect = oIdx === currentLesson.quiz.correctIndex;

                  let optionStyle = "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]";
                  if (hasCheckedAnswer) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "bg-rose-500/20 border-rose-400 text-rose-200";
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold";
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={hasCheckedAnswer}
                      onClick={() => setSelectedOption(oIdx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      <div className="flex-shrink-0 ml-3">
                        {hasCheckedAnswer && isCorrect ? (
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        ) : hasCheckedAnswer && isSelected && !isCorrect ? (
                          <AlertTriangle size={16} className="text-rose-400" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border ${isSelected ? "border-cyan-400 bg-cyan-400" : "border-slate-600"}`} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback box */}
              {hasCheckedAnswer && (
                <div
                  className={`p-4 rounded-2xl border mb-4 text-xs sm:text-sm leading-relaxed ${
                    selectedOption === currentLesson.quiz.correctIndex
                      ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                      : "bg-rose-950/20 border-rose-500/30 text-rose-200"
                  }`}
                >
                  <strong className="block font-bold mb-1">
                    {selectedOption === currentLesson.quiz.correctIndex ? "🎉 Correct!" : "⚠️ Not quite right."}
                  </strong>
                  <span>{currentLesson.quiz.explanation}</span>
                </div>
              )}

              {/* Submit Quiz button */}
              <div className="flex items-center justify-between">
                {!hasCheckedAnswer ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={() => setHasCheckedAnswer(true)}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-400 to-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black shadow-md cursor-pointer"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedOption(null);
                      setHasCheckedAnswer(false);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-400 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
                  >
                    Retry Quiz
                  </button>
                )}
              </div>
            </div>

            {/* ── Previous & Next Stage Controls ── */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              {prevStep ? (
                <button
                  onClick={() => setActiveStepId(prevStep.id)}
                  className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Stage {String(prevStep.stepNumber).padStart(2, "0")}: {prevStep.title.replace(/^\d+\.\s*/, "")}</span>
                </button>
              ) : (
                <div />
              )}

              {nextStep ? (
                <button
                  onClick={() => {
                    // Mark current complete if not done
                    if (!isCurrentStepDone) toggleStep(currentStep.id);
                    setActiveStepId(nextStep.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                >
                  <span>Next: Stage {String(nextStep.stepNumber).padStart(2, "0")}</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <Link
                  href="/certificates"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25"
                >
                  <Trophy size={16} />
                  <span>Claim Career Certificate</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
