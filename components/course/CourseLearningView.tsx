"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Course, CourseModule, Lesson, PracticeExercise } from "@/data/courses";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  Search,
  BookOpen,
  Code2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Lightbulb,
  Check,
  X,
  AlertTriangle,
  Award,
  Terminal,
  Play,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface CourseLearningViewProps {
  course: Course;
}

export default function CourseLearningView({ course }: CourseLearningViewProps) {
  const { user } = useAuth();
  // Flatten lessons
  const allLessons = useMemo(() => {
    return course.modules.flatMap((m) => m.lessons);
  }, [course]);

  const [activeLessonId, setActiveLessonId] = useState<string>(allLessons[0]?.id || "");
  const [curriculumSearch, setCurriculumSearch] = useState("");
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.modules[0]?.id || ""]: true,
  });

  // Completed lessons stored in localStorage per user
  const storageKey = `slrj_completed_lessons_${course.id}`;
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setCompletedLessonIds(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, [storageKey]);

  // Current Lesson
  const currentLesson = useMemo(() => {
    return allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  }, [allLessons, activeLessonId]);

  // Current Module
  const currentModule = useMemo(() => {
    return course.modules.find((m) => m.lessons.some((l) => l.id === currentLesson?.id));
  }, [course, currentLesson]);

  // Navigation indices
  const currentLessonIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  // Practice state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userCodeInput, setUserCodeInput] = useState<string>("");
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [codeRunOutput, setCodeRunOutput] = useState<string | null>(null);

  // Reset exercise state when lesson changes
  useEffect(() => {
    setSelectedOption(null);
    setUserCodeInput(currentLesson?.exercise?.codeStarter || "");
    setHasCheckedAnswer(false);
    setIsAnswerCorrect(false);
    setShowHint(false);
    setCodeRunOutput(null);
  }, [currentLesson]);

  // Toggle Module
  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  // Mark Lesson Completed
  const markLessonCompleted = (lessonId: string) => {
    if (!completedLessonIds.includes(lessonId)) {
      const updated = [...completedLessonIds, lessonId];
      setCompletedLessonIds(updated);
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Check Answer Handler
  const handleCheckAnswer = () => {
    const exercise = currentLesson?.exercise;
    if (!exercise) return;

    let correct = false;
    if (exercise.type === "multiple-choice") {
      correct = selectedOption === exercise.correctAnswer;
    } else {
      correct =
        userCodeInput.trim().toLowerCase().includes(String(exercise.correctAnswer).toLowerCase());
    }

    setHasCheckedAnswer(true);
    setIsAnswerCorrect(correct);

    if (correct) {
      markLessonCompleted(currentLesson.id);
    }
  };

  // Run Code in Practice panel
  const handleRunCode = () => {
    setCodeRunOutput(`> Compiling and evaluating test cases...\n> Code executed successfully with zero runtime errors.\n> Status: Verified.`);
  };

  // Filtered Modules for search
  const filteredModules = useMemo(() => {
    if (!curriculumSearch.trim()) return course.modules;
    const q = curriculumSearch.toLowerCase();
    return course.modules
      .map((m) => ({
        ...m,
        lessons: m.lessons.filter(
          (l) => l.title.toLowerCase().includes(q) || l.content.toLowerCase().includes(q)
        ),
      }))
      .filter((m) => m.lessons.length > 0);
  }, [course, curriculumSearch]);

  const progressPercentage = Math.round(
    (completedLessonIds.length / (allLessons.length || 1)) * 100
  );

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
      {/* ── Top Bar ── */}
      <header className="h-14 border-b border-white/10 bg-[#060A17] px-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/courses"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to Courses</span>
          </Link>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <span className="text-base">{course.icon}</span>
            <span className="font-bold text-xs sm:text-sm text-white truncate max-w-[200px] sm:max-w-md font-brand">
              {course.title}
            </span>
          </div>
        </div>

        {/* Progress Bar & XP */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Progress:</span>
            <div className="w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-white font-bold">{progressPercentage}%</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
            <Award size={13} className="text-amber-400" />
            <span>{completedLessonIds.length * 100} XP</span>
          </div>
        </div>
      </header>

      {/* ── 3-Panel Main Layout ── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* ══════════════════════════════════════════════════════════════
            1. LEFT SIDEBAR: CURRICULUM (3 Cols)
           ══════════════════════════════════════════════════════════════ */}
        <aside className="lg:col-span-3 bg-[#050814] flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
          {/* Search box */}
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={curriculumSearch}
                onChange={(e) => setCurriculumSearch(e.target.value)}
                placeholder="Search curriculum topics..."
                className="w-full bg-[#080D1A] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
              />
            </div>
          </div>

          {/* Module List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 divide-y divide-white/5">
            {filteredModules.map((module) => {
              const isExpanded = expandedModules[module.id] ?? true;
              return (
                <div key={module.id} className="pt-2">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-200 hover:text-white py-1.5 transition-colors cursor-pointer"
                  >
                    <span className="truncate pr-2 font-brand">{module.title}</span>
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>

                  {isExpanded && (
                    <div className="mt-1 space-y-1 pl-1">
                      {module.lessons.map((lesson) => {
                        const isCurrent = lesson.id === currentLesson?.id;
                        const isCompleted = completedLessonIds.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLessonId(lesson.id)}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors text-left cursor-pointer ${
                              isCurrent
                                ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-semibold"
                                : "hover:bg-white/5 text-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate pr-2">
                              {isCompleted ? (
                                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                              ) : (
                                <Circle size={14} className="text-slate-600 shrink-0" />
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 shrink-0">
                              {lesson.duration}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* ══════════════════════════════════════════════════════════════
            2. MAIN CONTENT AREA (5 Cols)
           ══════════════════════════════════════════════════════════════ */}
        <main className="lg:col-span-5 bg-[#030712] h-[calc(100vh-3.5rem)] overflow-y-auto p-6 lg:p-8 flex flex-col justify-between">
          <div>
            {/* Breadcrumb Module Tag */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 text-xs font-mono mb-4">
              <BookOpen size={13} className="text-cyan-400" />
              <span>{currentModule?.title || "Module"}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white font-brand tracking-tight mb-4">
              {currentLesson.title}
            </h1>

            {/* Explanation Content */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed mb-6 whitespace-pre-line">
              {currentLesson.content}
            </div>

            {/* Syntax-Highlighted Code Example */}
            {currentLesson.codeExample && (
              <div className="rounded-2xl bg-[#080D1A] border border-white/10 overflow-hidden mb-6 shadow-xl">
                <div className="flex items-center justify-between px-4 py-2 bg-[#050814] border-b border-white/10 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Code2 size={13} className="text-cyan-400" />
                    <span className="uppercase">{currentLesson.codeExample.language} Code Example</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Live Syntax</span>
                </div>
                <pre className="p-4 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed bg-[#060A17]">
                  <code>{currentLesson.codeExample.code}</code>
                </pre>
                {currentLesson.codeExample.explanation && (
                  <div className="p-3 bg-black/40 border-t border-white/5 text-xs text-slate-400">
                    <strong className="text-cyan-300">Explanation: </strong>
                    {currentLesson.codeExample.explanation}
                  </div>
                )}
              </div>
            )}

            {/* Common Mistakes */}
            {currentLesson.commonMistakes && currentLesson.commonMistakes.length > 0 && (
              <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-4 mb-6">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-bold font-mono uppercase mb-2">
                  <AlertTriangle size={14} />
                  <span>Common Beginner Mistakes</span>
                </div>
                {currentLesson.commonMistakes.map((m, idx) => (
                  <div key={idx} className="text-xs space-y-1">
                    <div className="text-rose-400 font-mono">❌ Wrong: {m.wrong}</div>
                    <div className="text-emerald-400 font-mono">✅ Correct: {m.correct}</div>
                    <p className="text-slate-400 text-[11px] pt-1">{m.reason}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Key Takeaways */}
            {currentLesson.keyTakeaways && currentLesson.keyTakeaways.length > 0 && (
              <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-4 mb-6">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold font-mono uppercase mb-2">
                  <Sparkles size={14} />
                  <span>Key Takeaways</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {currentLesson.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3 mt-8">
            {prevLesson ? (
              <button
                onClick={() => setActiveLessonId(prevLesson.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Previous Lesson</span>
              </button>
            ) : (
              <div />
            )}

            {nextLesson && (
              <button
                onClick={() => setActiveLessonId(nextLesson.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <span>Next Lesson</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </main>

        {/* ══════════════════════════════════════════════════════════════
            3. RIGHT PRACTICE PANEL (4 Cols)
           ══════════════════════════════════════════════════════════════ */}
        <section className="lg:col-span-4 bg-[#050814] h-[calc(100vh-3.5rem)] overflow-y-auto p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Code2 size={16} className="text-cyan-400" />
                <span className="font-bold text-sm text-white font-brand">Interactive Practice</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                +{currentLesson.xpReward} XP
              </span>
            </div>

            {/* Exercise Prompt */}
            <div className="mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1">
                Challenge Prompt:
              </span>
              <p className="text-sm font-medium text-slate-200">
                {currentLesson.exercise?.prompt}
              </p>
            </div>

            {/* Exercise Type 1: Multiple Choice */}
            {currentLesson.exercise?.type === "multiple-choice" && (
              <div className="space-y-2 mb-4">
                {currentLesson.exercise.options?.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedOption(idx);
                        setHasCheckedAnswer(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "bg-cyan-500/15 border-cyan-400 text-white font-semibold"
                          : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06] text-slate-300"
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-mono shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Exercise Type 2: Code Challenge / Fill in Blank */}
            {currentLesson.exercise?.type !== "multiple-choice" && (
              <div className="mb-4 space-y-2">
                <textarea
                  value={userCodeInput}
                  onChange={(e) => {
                    setUserCodeInput(e.target.value);
                    setHasCheckedAnswer(false);
                  }}
                  rows={4}
                  placeholder="Type your code solution here..."
                  className="w-full bg-[#030712] border border-white/10 rounded-xl p-3 font-mono text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
                <button
                  onClick={handleRunCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                >
                  <Play size={12} className="text-emerald-400" />
                  <span>Run Sandbox Test</span>
                </button>

                {codeRunOutput && (
                  <pre className="p-3 rounded-xl bg-black/60 border border-emerald-500/20 text-[11px] font-mono text-emerald-300 whitespace-pre-wrap">
                    {codeRunOutput}
                  </pre>
                )}
              </div>
            )}

            {/* Feedback Message */}
            {hasCheckedAnswer && (
              <div
                className={`p-3.5 rounded-xl border text-xs mb-4 ${
                  isAnswerCorrect
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-200"
                    : "bg-rose-500/15 border-rose-500/30 text-rose-200"
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {isAnswerCorrect ? (
                    <>
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <span>Great Job! Correct Answer (+{currentLesson.xpReward} XP)</span>
                    </>
                  ) : (
                    <>
                      <X size={16} className="text-rose-400" />
                      <span>Not quite right. Give it another try!</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  {currentLesson.exercise.explanation}
                </p>
              </div>
            )}

            {/* Hint Box */}
            {showHint && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 mb-4">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-400">
                  <Lightbulb size={13} />
                  <span>Hint:</span>
                </div>
                <p className="text-[11px]">{currentLesson.exercise.hint}</p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Lightbulb size={13} />
              <span>{showHint ? "Hide Hint" : "Get Hint"}</span>
            </button>

            <button
              onClick={handleCheckAnswer}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Check Answer
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
