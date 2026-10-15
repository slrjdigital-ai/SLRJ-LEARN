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
  ChevronRight,
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
    <div className="space-y-6 text-slate-800 max-w-[1600px] mx-auto pb-16">
      <div>
        {/* ─── Top Nav & Breadcrumbs ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
          <div>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#0b69ff] hover:text-blue-700 transition-colors mb-2 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Learning Paths</span>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand">
                {track.name}
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0b69ff] border border-blue-200">
                {track.level}
              </span>
            </div>
          </div>

          {/* Current Stage Position & Quick Actions */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-xs font-mono">
                <span className="text-slate-500">Current Stage:</span>
                <span className="text-[#0b69ff] font-bold">{currentIndex + 1} of {steps.length}</span>
              </div>
              <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden mt-1.5 border border-slate-200">
                <div
                  className="h-full bg-[#0b69ff] transition-all duration-300"
                  style={{ width: `${Math.round(((currentIndex + 1) / steps.length) * 100)}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleAskLumio}
              className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Ask Lumio AI about this stage"
            >
              <Bot size={15} className="text-purple-600 animate-pulse" />
              <span className="hidden sm:inline">Ask Lumio</span>
            </button>
          </div>
        </div>

        {/* ─── Main Two-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ── Left Sticky Sidebar (Curriculum Stages) ── */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-24">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Curriculum Stages ({steps.length})
                </span>
                <span className="text-xs font-mono text-[#0b69ff] font-bold">
                  +{earnedXP} XP
                </span>
              </div>

              {/* Sidebar Search */}
              <div className="relative mb-3">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  placeholder="Search stages or topics..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:border-[#0b69ff]"
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
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isActive
                          ? "bg-blue-50/80 border-[#0b69ff] text-[#0b69ff] shadow-sm"
                          : "bg-white border-slate-100 text-slate-700 hover:bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${
                            isActive
                              ? "bg-[#0b69ff] text-white border-[#0b69ff]"
                              : "bg-slate-100 text-slate-500 border-slate-200"
                          }`}
                        >
                          {stepNum}
                        </span>
                        <div className="truncate">
                          <div className={`text-xs font-bold truncate ${isActive ? "text-[#0b69ff]" : "text-slate-800"}`}>
                            {step.title.replace(/^\d+\.\s*/, "")}
                          </div>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {step.category} • {step.duration}
                          </span>
                        </div>
                      </div>

                      {/* Selection chevron */}
                      <div className="flex-shrink-0">
                        <ChevronRight
                          size={15}
                          className={isActive ? "text-[#0b69ff] translate-x-0.5 transition-transform" : "text-slate-400"}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Capstone Card Link */}
              <div className="mt-4 pt-3 border-t border-slate-100 p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-center">
                <span className="text-[10px] font-mono font-bold text-[#0b69ff] uppercase block mb-1">
                  Capstone Deliverable
                </span>
                <div className="text-xs font-bold text-slate-800 line-clamp-1">{track.finalProject.title}</div>
              </div>
            </div>
          </div>

          {/* ── Right Main Content Area (In-Depth Lesson, Code & Practice) ── */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Stage Hero Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black px-3 py-1 rounded-lg bg-[#0b69ff] text-white">
                    STAGE {String(currentStep.stepNumber).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold text-[#0b69ff] px-3 py-1 rounded-lg bg-blue-50 border border-blue-200">
                    {currentStep.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                    <Clock size={13} className="text-slate-400" />
                    {currentStep.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAskLumio}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Bot size={13} className="text-purple-600" />
                    <span>Ask Lumio</span>
                  </button>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand tracking-tight mb-4">
                {currentStep.title.replace(/^\d+\.\s*/, "")}
              </h2>

              {/* In-depth Overview Paragraphs */}
              <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                {currentLesson.overview.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </div>

            {/* ── Key Concepts Deconstruction ── */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                <BookOpen size={16} className="text-[#0b69ff]" />
                <span>Key Concepts & Principles You Must Understand:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentLesson.keyConceptDetails.map((concept, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 transition-colors"
                  >
                    <h5 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b69ff]" />
                      <span>{concept.title}</span>
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{concept.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Syntax-Highlighted Working Code Example ── */}
            <div className="rounded-2xl border border-slate-700 bg-slate-950 text-slate-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Terminal size={14} className="text-cyan-400" />
                  <span>Interactive Code Example ({currentLesson.codeExample.language})</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/practice"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                  >
                    <Code2 size={13} className="text-emerald-400" />
                    <span>Run in Playground</span>
                  </Link>

                  <button
                    onClick={() => handleCopyCode(currentLesson.codeExample.code)}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                  </button>
                </div>
              </div>

              <pre className="p-6 text-xs sm:text-sm font-mono text-cyan-100 overflow-x-auto leading-relaxed whitespace-pre">
                <code>{currentLesson.codeExample.code}</code>
              </pre>

              <div className="px-5 py-3 bg-slate-900/60 border-t border-slate-800 text-xs text-slate-300 font-sans">
                💡 <strong className="text-slate-100">Explanation:</strong> {currentLesson.codeExample.explanation}
              </div>
            </div>

            {/* ── Common Mistakes & Pro Tips (Two Column Split) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Common Mistakes */}
              <div className="p-6 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-sm">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-3">
                  <AlertTriangle size={15} className="text-rose-600" />
                  <span>Common Beginner Pitfalls:</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {currentLesson.commonMistakes.map((mistake, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold mt-0.5">✕</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tips */}
              <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-3">
                  <Lightbulb size={15} className="text-emerald-600" />
                  <span>Senior Engineer Pro Tips:</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {currentLesson.proTips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Hands-On Milestone Project Callout ── */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-[#0b69ff] font-bold text-xs uppercase tracking-wider">
                  <Rocket size={16} className="text-[#0b69ff]" />
                  <span>Stage Milestone Project Assignment</span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0b69ff] border border-blue-200">
                  Practical Deliverable
                </span>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-2">
                {currentStep.practicalMilestone}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                To master this stage, build this deliverable independently. Open your IDE or our Code Playground, write the code, and test edge cases.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/practice"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#0b69ff] hover:bg-blue-600 text-white shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Code2 size={15} />
                  <span>Launch Playground to Build</span>
                </Link>

                <button
                  onClick={handleAskLumio}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Bot size={15} className="text-[#0b69ff]" />
                  <span>Ask Lumio for Starter Hints</span>
                </button>
              </div>
            </div>

            {/* ── Interactive Stage Quiz (SoloLearn Style) ── */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
                  <HelpCircle size={16} className="text-amber-500" />
                  <span>Knowledge Check (Test Your Retention)</span>
                </div>
                <span className="text-xs font-mono text-slate-500">1 Question</span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                {currentLesson.quiz.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5 mb-5">
                {currentLesson.quiz.options.map((opt, oIdx) => {
                  const isSelected = selectedOption === oIdx;
                  const isCorrect = oIdx === currentLesson.quiz.correctIndex;

                  let optionStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                  if (hasCheckedAnswer) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "bg-rose-50 border-rose-400 text-rose-900";
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-blue-50 border-[#0b69ff] text-[#0b69ff] font-semibold";
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={hasCheckedAnswer}
                      onClick={() => setSelectedOption(oIdx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      <div className="flex-shrink-0 ml-3">
                        {hasCheckedAnswer && isCorrect ? (
                          <CheckCircle2 size={16} className="text-emerald-600" />
                        ) : hasCheckedAnswer && isSelected && !isCorrect ? (
                          <AlertTriangle size={16} className="text-rose-600" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border ${isSelected ? "border-[#0b69ff] bg-[#0b69ff]" : "border-slate-400"}`} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback box */}
              {hasCheckedAnswer && (
                <div
                  className={`p-4 rounded-xl border mb-4 text-xs sm:text-sm leading-relaxed ${
                    selectedOption === currentLesson.quiz.correctIndex
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : "bg-rose-50 border-rose-200 text-rose-900"
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
                    className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#0b69ff] hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-sm cursor-pointer"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedOption(null);
                      setHasCheckedAnswer(false);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                  >
                    Retry Quiz
                  </button>
                )}
              </div>
            </div>

            {/* ── Previous & Next Stage Controls ── */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
              {prevStep ? (
                <button
                  onClick={() => setActiveStepId(prevStep.id)}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
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
                    setActiveStepId(nextStep.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-6 py-3 rounded-xl bg-[#0b69ff] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Next: Stage {String(nextStep.stepNumber).padStart(2, "0")}</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <Link
                  href="/certificates"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm"
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
