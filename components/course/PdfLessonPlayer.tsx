"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Course, CourseModule, Lesson } from "@/data/courses";
import { useGamification } from "@/context/GamificationContext";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  Search,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  Award,
  FileText,
  Download,
  AlertCircle,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

interface PdfLessonPlayerProps {
  course: Course;
  initialLessonId: string;
}

export default function PdfLessonPlayer({ course, initialLessonId }: PdfLessonPlayerProps) {
  const router = useRouter();
  const { awardXP } = useGamification();

  // Flatten lessons list
  const allLessons = useMemo(() => {
    return course.modules.flatMap((m) => m.lessons);
  }, [course]);

  const [activeLessonId, setActiveLessonId] = useState<string>(
    initialLessonId || allLessons[0]?.id || ""
  );
  const [copiedCode, setCopiedCode] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [curriculumSearch, setCurriculumSearch] = useState("");

  // Find associated PDF handbook
  const associatedPdf = useMemo(() => {
    if (course.category === "Web Development") {
      return { title: "HTML5 & Web Fundamentals Handbook", url: "/pdfs/html5-complete-notes.pdf", size: "4.8 MB" };
    } else if (course.category === "Data Structures and Algorithms") {
      return { title: "DSA Complete Handbook", url: "/pdfs/dsa-complete-handbook.pdf", size: "5.5 KB" };
    } else if (course.category === "Python Programming") {
      return { title: "Python & AI Essentials Guide", url: "/pdfs/python-ai-essentials.pdf", size: "5.5 KB" };
    } else if (course.category === "SQL and Databases") {
      return { title: "DBMS & SQL Cheatsheet", url: "/pdfs/dbms-sql-cheatsheet.pdf", size: "5.4 KB" };
    }
    return { title: "Modern JavaScript & Architecture Guide", url: "/pdfs/javascript-modern-guide.pdf", size: "5.7 KB" };
  }, [course]);

  // Expanded modules state
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.modules[0]?.id || ""]: true,
  });

  // Completed lessons stored in localStorage
  const storageKey = `slrj_completed_lessons_${course.id}`;
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompletedLessonIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, [storageKey]);

  // Current Lesson & Module
  const currentLesson = useMemo(() => {
    return allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  }, [allLessons, activeLessonId]);

  const currentModule = useMemo(() => {
    return course.modules.find((m) => m.lessons.some((l) => l.id === currentLesson?.id));
  }, [course, currentLesson]);

  // Ensure current module is expanded
  useEffect(() => {
    if (currentModule) {
      setExpandedModules((prev) => ({ ...prev, [currentModule.id]: true }));
    }
  }, [currentModule]);

  // Lesson Navigation Indices
  const currentLessonIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  // Practice state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Reset exercise state when lesson changes
  useEffect(() => {
    setSelectedOption(null);
    setHasCheckedAnswer(false);
    setIsAnswerCorrect(false);
    setShowHint(false);
  }, [activeLessonId]);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const markLessonComplete = () => {
    if (!currentLesson) return;
    if (!completedLessonIds.includes(currentLesson.id)) {
      const updated = [...completedLessonIds, currentLesson.id];
      setCompletedLessonIds(updated);
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
        // Also save to global enrolled courses record
        const enrolledKey = "slrj_enrolled_courses";
        const enrolled = JSON.parse(localStorage.getItem(enrolledKey) || "{}");
        enrolled[course.id] = {
          courseId: course.id,
          courseSlug: course.slug,
          courseTitle: course.title,
          lastLessonId: currentLesson.id,
          completedLessons: updated,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(enrolledKey, JSON.stringify(enrolled));
      } catch (err) {
        console.error(err);
      }
      awardXP(currentLesson.xpReward || 50, `Completed lesson: ${currentLesson.title}`);
    }

    if (nextLesson) {
      setActiveLessonId(nextLesson.id);
      router.push(`/learn/${course.id}/${nextLesson.id}`);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || !currentLesson?.exercise) return;
    const isCorrect = selectedOption === currentLesson.exercise.correctAnswer;
    setIsAnswerCorrect(isCorrect);
    setHasCheckedAnswer(true);

    if (isCorrect) {
      awardXP(30, "Solved practice quiz correctly");
    }
  };

  const progressPercentage = Math.round(
    (completedLessonIds.length / (allLessons.length || 1)) * 100
  );

  const isCourseComplete = completedLessonIds.length === allLessons.length && allLessons.length > 0;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col">
      {/* ── Top Header ── */}
      <header className="h-16 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-[#64748B] hover:text-[#182230] hover:bg-slate-100 cursor-pointer"
            title="Toggle Curriculum"
          >
            <Menu size={20} />
          </button>

          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12316B] hover:text-[#2456A6] transition-colors p-1.5 rounded-lg hover:bg-blue-50"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Course Overview</span>
          </Link>

          <span className="text-slate-300">|</span>

          <div className="flex items-center gap-2">
            <span className="text-xl">{course.icon || "📘"}</span>
            <span className="font-extrabold text-xs sm:text-sm text-[#182230] truncate max-w-[180px] sm:max-w-xs md:max-w-md">
              {course.title}
            </span>
          </div>
        </div>

        {/* Right Stats & Progress */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2.5 text-xs text-[#64748B]">
            <span className="font-semibold">Progress:</span>
            <div className="w-24 sm:w-32 h-2 rounded-full bg-slate-100 overflow-hidden border border-[#E2E8F0]">
              <div
                className="h-full bg-gradient-to-r from-[#18B6D2] to-[#12316B] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <strong className="text-[#12316B]">{progressPercentage}%</strong>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#12316B] text-xs font-bold">
            <Award size={14} className="text-[#18B6D2]" />
            <span>{completedLessonIds.length * 100} XP Earned</span>
          </div>
        </div>
      </header>

      {/* ── Main Layout: Sidebar + Content ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Backdrop */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* ══════════════════════════════════════════════════════════════
            1. CURRICULUM SIDEBAR (Modules & Lessons)
           ══════════════════════════════════════════════════════════════ */}
        <aside
          className={`fixed lg:static top-16 bottom-0 left-0 z-40 w-72 sm:w-80 bg-white border-r border-[#E2E8F0] flex flex-col transition-transform duration-300 select-none ${
            mobileSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Sidebar Top: Search & Header */}
          <div className="p-4 border-b border-[#E2E8F0] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-xs text-[#12316B] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={14} className="text-[#18B6D2]" />
                <span>Course Modules</span>
              </h2>
              <span className="text-[11px] font-semibold text-[#64748B]">
                {completedLessonIds.length}/{allLessons.length} Done
              </span>
            </div>

            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input
                type="text"
                value={curriculumSearch}
                onChange={(e) => setCurriculumSearch(e.target.value)}
                placeholder="Search lessons..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#F7F9FC] border border-[#E2E8F0] text-xs text-[#182230] placeholder-[#64748B] focus:outline-none focus:border-[#12316B]"
              />
            </div>
          </div>

          {/* Module List Accordion */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">
            {course.modules.map((mod, modIdx) => {
              const isOpen = !!expandedModules[mod.id];
              const modCompletedCount = mod.lessons.filter((l) =>
                completedLessonIds.includes(l.id)
              ).length;
              const isModComplete = modCompletedCount === mod.lessons.length && mod.lessons.length > 0;

              return (
                <div
                  key={mod.id}
                  className="rounded-xl border border-[#E2E8F0] overflow-hidden bg-[#F7F9FC]"
                >
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full p-3 text-left flex items-center justify-between gap-2 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {isModComplete ? (
                        <CheckCircle2 size={16} className="text-[#16865C] flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-md bg-white border border-[#E2E8F0] flex items-center justify-center text-[10px] font-bold text-[#12316B] flex-shrink-0">
                          {modIdx + 1}
                        </div>
                      )}
                      <span className="font-bold text-xs text-[#182230] truncate">
                        {mod.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] text-[#64748B] font-mono">
                        {modCompletedCount}/{mod.lessons.length}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`text-[#64748B] transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="p-1.5 space-y-1 bg-white border-t border-[#E2E8F0]">
                      {mod.lessons.map((lesson) => {
                        const isActive = lesson.id === activeLessonId;
                        const isDone = completedLessonIds.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setActiveLessonId(lesson.id);
                              router.push(`/learn/${course.id}/${lesson.id}`);
                              setMobileSidebarOpen(false);
                            }}
                            className={`w-full p-2.5 rounded-lg text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                              isActive
                                ? "bg-[#12316B] text-white font-bold shadow-xs"
                                : "text-[#64748B] hover:text-[#182230] hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {isDone ? (
                                <CheckCircle2
                                  size={14}
                                  className={isActive ? "text-[#18B6D2]" : "text-[#16865C]"}
                                />
                              ) : (
                                <Circle
                                  size={13}
                                  className={isActive ? "text-white/60" : "text-slate-300"}
                                />
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <span
                              className={`text-[10px] font-mono ml-2 flex-shrink-0 ${
                                isActive ? "text-[#18B6D2]" : "text-slate-400"
                              }`}
                            >
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

          {/* Sidebar Bottom: PDF Handbook Shortcut */}
          <div className="p-3 border-t border-[#E2E8F0] bg-[#F7F9FC]">
            <a
              href={associatedPdf.url}
              download
              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#12316B]/30 text-xs text-[#12316B] font-bold shadow-2xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-[#18B6D2]" />
                <span className="truncate">{associatedPdf.title}</span>
              </div>
              <Download size={13} className="text-[#64748B] flex-shrink-0" />
            </a>
          </div>
        </aside>

        {/* ══════════════════════════════════════════════════════════════
            2. MAIN LESSON & READING PANE
           ══════════════════════════════════════════════════════════════ */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 max-w-5xl mx-auto space-y-8">
          {/* Lesson Header Card */}
          <div className="clean-card p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748B]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#12316B] font-bold">
                  {currentModule?.title || "Module 1"}
                </span>
                <span>•</span>
                <span>{currentLesson?.duration || "15 min"}</span>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#16865C] font-bold">
                +{currentLesson?.xpReward || 100} XP on Completion
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-brand text-[#182230] tracking-tight">
              {currentLesson?.title}
            </h1>

            {/* Rich Lesson Content */}
            <div className="text-sm sm:text-base text-[#182230] leading-relaxed whitespace-pre-line pt-2">
              {currentLesson?.content}
            </div>
          </div>

          {/* Code Example Snippet */}
          {currentLesson?.codeExample && (
            <div className="clean-card overflow-hidden">
              <div className="bg-[#12316B] px-5 py-3 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-bold uppercase">{currentLesson.codeExample.language}</span>
                </div>

                <button
                  onClick={() => handleCopyCode(currentLesson.codeExample!.code)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors font-semibold cursor-pointer"
                >
                  {copiedCode ? <Check size={13} className="text-[#18B6D2]" /> : <Copy size={13} />}
                  <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                </button>
              </div>

              <pre className="p-5 bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
                <code>{currentLesson.codeExample.code}</code>
              </pre>

              {currentLesson.codeExample.explanation && (
                <div className="p-4 bg-[#F7F9FC] border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-start gap-2.5">
                  <Lightbulb size={16} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
                  <span>{currentLesson.codeExample.explanation}</span>
                </div>
              )}
            </div>
          )}

          {/* Key Takeaways & Common Mistakes Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Key Takeaways */}
            {currentLesson?.keyTakeaways && currentLesson.keyTakeaways.length > 0 && (
              <div className="clean-card p-5 space-y-3 bg-emerald-50/40 border-emerald-200">
                <h3 className="font-extrabold text-xs text-[#16865C] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>Key Architectural Takeaways</span>
                </h3>
                <ul className="space-y-2 text-xs text-[#182230]">
                  {currentLesson.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#16865C] font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Common Mistakes */}
            {currentLesson?.commonMistakes && currentLesson.commonMistakes.length > 0 && (
              <div className="clean-card p-5 space-y-3 bg-rose-50/40 border-rose-200">
                <h3 className="font-extrabold text-xs text-[#C83C4A] uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle size={15} />
                  <span>Common Traps to Avoid</span>
                </h3>
                <div className="space-y-2.5 text-xs">
                  {currentLesson.commonMistakes.map((m, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="text-[#C83C4A] font-semibold">❌ Avoid: {m.wrong}</div>
                      <div className="text-[#16865C] font-semibold">✅ Correct: {m.correct}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Practice Exercise */}
          {currentLesson?.exercise && (
            <div className="clean-card p-6 sm:p-8 space-y-5 border-l-4 border-l-[#12316B]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-[#18B6D2]" />
                  <h3 className="font-extrabold text-sm text-[#182230] uppercase tracking-wider">
                    Knowledge Check Exercise
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#12316B] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  +30 Practice XP
                </span>
              </div>

              <p className="text-sm font-semibold text-[#182230]">
                {currentLesson.exercise.prompt}
              </p>

              {/* Options */}
              {currentLesson.exercise.options && (
                <div className="space-y-2 pt-1">
                  {currentLesson.exercise.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    let optionStyle = "border-[#E2E8F0] hover:bg-slate-50 text-[#182230]";
                    if (hasCheckedAnswer) {
                      if (idx === currentLesson.exercise.correctAnswer) {
                        optionStyle = "bg-emerald-50 border-[#16865C] text-[#16865C] font-bold";
                      } else if (isSelected) {
                        optionStyle = "bg-rose-50 border-[#C83C4A] text-[#C83C4A]";
                      }
                    } else if (isSelected) {
                      optionStyle = "border-[#12316B] bg-blue-50/70 text-[#12316B] font-bold";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!hasCheckedAnswer) setSelectedOption(idx);
                        }}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {hasCheckedAnswer && idx === currentLesson.exercise.correctAnswer && (
                          <CheckCircle2 size={16} className="text-[#16865C]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Exercise Feedback */}
              {hasCheckedAnswer && (
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm ${
                    isAnswerCorrect
                      ? "bg-emerald-50 border border-emerald-200 text-[#16865C]"
                      : "bg-rose-50 border border-rose-200 text-[#C83C4A]"
                  }`}
                >
                  <p className="font-bold">
                    {isAnswerCorrect ? "Correct! Well done." : "Not quite right."}
                  </p>
                  <p className="mt-1 text-[#182230]">{currentLesson.exercise.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {!hasCheckedAnswer ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="px-5 py-2.5 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white font-bold text-xs uppercase tracking-wider disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setHasCheckedAnswer(false);
                      setSelectedOption(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#182230] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Try Again
                  </button>
                )}

                {currentLesson.exercise.hint && !showHint && (
                  <button
                    onClick={() => setShowHint(true)}
                    className="text-xs text-[#64748B] hover:text-[#12316B] font-medium"
                  >
                    Need a hint?
                  </button>
                )}
                {showHint && (
                  <span className="text-xs text-[#18B6D2] italic">
                    Hint: {currentLesson.exercise.hint}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              COURSE COMPLETION & ASSESSMENT ENTRY
             ══════════════════════════════════════════════════════════════ */}
          {isCourseComplete && (
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50 via-cyan-50 to-emerald-50 border-2 border-[#16865C] space-y-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#16865C] text-white flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#182230]">
                    All {allLessons.length} Course Lessons Completed!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    You have satisfied all lesson requirements. Take the final server-graded assessment to unlock your official verified certificate.
                  </p>
                </div>
              </div>

              <Link
                href={`/dashboard/assessments/${course.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#16865C] hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-102"
              >
                <Award size={16} />
                <span>Launch Final Assessment</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              BOTTOM NAVIGATION BAR (Prev, Mark Complete, Next)
             ══════════════════════════════════════════════════════════════ */}
          <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevLesson ? (
              <button
                onClick={() => {
                  setActiveLessonId(prevLesson.id);
                  router.push(`/learn/${course.id}/${prevLesson.id}`);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E2E8F0] hover:bg-white text-xs font-bold text-[#64748B] hover:text-[#182230] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Previous: {prevLesson.title}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={markLessonComplete}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#12316B]/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <CheckCircle2 size={16} className="text-[#18B6D2]" />
              <span>
                {completedLessonIds.includes(currentLesson?.id || "")
                  ? nextLesson
                    ? "Next Lesson"
                    : "Course Finished"
                  : "Mark Complete & Continue"}
              </span>
              {nextLesson && <ArrowRight size={14} />}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
