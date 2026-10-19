"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Course, CourseModule, Lesson, PdfLesson } from "@/data/courses";
import { useGamification } from "@/context/GamificationContext";
import PdfReaderModal from "@/components/courses/PdfReaderModal";
import { getMainTopicCapstone, MainTopicCapstone } from "@/lib/moduleCapstones";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
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
  Sparkles,
  Menu,
  Terminal,
  Trophy,
  RotateCcw,
  ShieldCheck,
  Code,
  HelpCircle,
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
  const [activeView, setActiveView] = useState<"subtopic" | "capstone">("subtopic");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedStarterCode, setCopiedStarterCode] = useState(false);
  const [copiedSolutionCode, setCopiedSolutionCode] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [curriculumSearch, setCurriculumSearch] = useState("");

  // PDF Reader Modal state
  const [selectedPdfLesson, setSelectedPdfLesson] = useState<PdfLesson | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Expanded modules state
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.modules[0]?.id || ""]: true,
  });

  // Completed lessons & capstones stored in localStorage
  const storageKey = `slrj_completed_lessons_${course.id}`;
  const capstoneStorageKey = `slrj_completed_capstones_${course.id}`;
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [completedCapstoneIds, setCompletedCapstoneIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setCompletedLessonIds(JSON.parse(saved));
      const savedCapstones = localStorage.getItem(capstoneStorageKey);
      if (savedCapstones) setCompletedCapstoneIds(JSON.parse(savedCapstones));
    } catch (e) {
      console.error(e);
    }
  }, [storageKey, capstoneStorageKey]);

  // Current Lesson & Module
  const currentLesson = useMemo(() => {
    return allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  }, [allLessons, activeLessonId]);

  const currentModule = useMemo(() => {
    return (
      course.modules.find((m) => m.lessons.some((l) => l.id === currentLesson?.id)) ||
      course.modules[0]
    );
  }, [course, currentLesson]);

  const currentModuleIndex = useMemo(() => {
    return course.modules.findIndex((m) => m.id === currentModule?.id);
  }, [course, currentModule]);

  const currentLessonIndexInModule = useMemo(() => {
    return currentModule?.lessons.findIndex((l) => l.id === currentLesson?.id) ?? 0;
  }, [currentModule, currentLesson]);

  const isLastLessonInModule =
    currentLessonIndexInModule === (currentModule?.lessons.length ?? 1) - 1;

  // Active PDF for current module / course
  const activePdf = useMemo<PdfLesson>(() => {
    if (course.pdfLessons && course.pdfLessons.length > 0) {
      // Look for a PDF matching the current module title
      const matched = course.pdfLessons.find((p) =>
        p.moduleTitle?.toLowerCase().includes(currentModule?.title?.toLowerCase() || "") ||
        p.title?.toLowerCase().includes(currentModule?.title?.toLowerCase() || "")
      );
      if (matched) return matched;
      // Fallback to module index or first PDF
      return course.pdfLessons[currentModuleIndex] || course.pdfLessons[0];
    }
    // Generated default PDF guide descriptor
    return {
      id: `${currentModule?.id || "mod"}-pdf-guide`,
      title: `${course.title}: ${currentModule?.title || "Complete"} Study Guide.pdf`,
      description: `Official comprehensive syllabus, architectural diagrams, and study guide.`,
      moduleTitle: currentModule?.title || "Curriculum Guide",
      fileUrl: "/pdfs/c-programming-guide.pdf",
      fileSize: "4.8 MB",
      pageCount: 38,
      displayOrder: currentModuleIndex + 1,
      downloadAllowed: true,
    };
  }, [course, currentModule, currentModuleIndex]);

  // Main Topic Capstone Data
  const mainTopicCapstone = useMemo<MainTopicCapstone>(() => {
    return getMainTopicCapstone(
      currentModule?.id || "mod-1",
      currentModule?.title || "Foundations",
      course.title,
      course.category
    );
  }, [currentModule, course]);

  // Ensure current module is expanded
  useEffect(() => {
    if (currentModule) {
      setExpandedModules((prev) => ({ ...prev, [currentModule.id]: true }));
    }
  }, [currentModule]);

  // Lesson Navigation Indices
  const currentLessonIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  // Next Module navigation
  const nextModule =
    currentModuleIndex < course.modules.length - 1
      ? course.modules[currentModuleIndex + 1]
      : null;

  // Subtopic Practice Exercise state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Main Topic Capstone State
  const [showSolution, setShowSolution] = useState(false);
  const [topicQuizAnswers, setTopicQuizAnswers] = useState<Record<string, number>>({});
  const [hasSubmittedTopicQuiz, setHasSubmittedTopicQuiz] = useState(false);
  const [topicQuizScore, setTopicQuizScore] = useState(0);

  // Reset exercise state when lesson changes
  useEffect(() => {
    setSelectedOption(null);
    setHasCheckedAnswer(false);
    setIsAnswerCorrect(false);
    setShowHint(false);
  }, [activeLessonId]);

  // Reset capstone quiz state when module changes
  useEffect(() => {
    setShowSolution(false);
    setTopicQuizAnswers({});
    setHasSubmittedTopicQuiz(false);
    setTopicQuizScore(0);
  }, [currentModule?.id]);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyStarter = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedStarterCode(true);
    setTimeout(() => setCopiedStarterCode(false), 2000);
  };

  const handleCopySolution = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSolutionCode(true);
    setTimeout(() => setCopiedSolutionCode(false), 2000);
  };

  const markLessonComplete = () => {
    if (!currentLesson) return;
    if (!completedLessonIds.includes(currentLesson.id)) {
      const updated = [...completedLessonIds, currentLesson.id];
      setCompletedLessonIds(updated);
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
        // Also update enrolled course record
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
      awardXP(currentLesson.xpReward || 50, `Completed subtopic: ${currentLesson.title}`);
    }

    if (isLastLessonInModule) {
      // If last subtopic, prompt to take the Main Topic Capstone
      setActiveView("capstone");
    } else if (nextLesson) {
      setActiveLessonId(nextLesson.id);
      router.push(`/learn/${course.id}/${nextLesson.id}`);
    }
  };

  const markCapstoneCodeSolved = () => {
    const capId = `${currentModule.id}-code`;
    if (!completedCapstoneIds.includes(capId)) {
      const updated = [...completedCapstoneIds, capId];
      setCompletedCapstoneIds(updated);
      try {
        localStorage.setItem(capstoneStorageKey, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      awardXP(100, `Solved Main Topic Code Challenge: ${currentModule.title}`);
    }
  };

  // Subtopic Code Fallback Guarantee
  const subtopicCode = useMemo(() => {
    if (currentLesson?.codeExample) return currentLesson.codeExample;
    const lower = course.title.toLowerCase();
    const lang = lower.includes("python")
      ? "python"
      : lower.includes("c++") || lower.includes("cpp")
      ? "cpp"
      : lower.includes("c ") || lower.includes("c-programming")
      ? "c"
      : lower.includes("html") || lower.includes("css")
      ? "html"
      : lower.includes("sql")
      ? "sql"
      : lower.includes("java") && !lower.includes("javascript")
      ? "java"
      : "javascript";

    return {
      language: lang,
      code: `// ${currentLesson?.title || "Subtopic"}\n// Architecture and core mechanics implementation\nfunction execute_${(currentLesson?.slug || "lesson").replace(/-/g, "_")}() {\n    console.log("Mastering ${currentLesson?.title || "Subtopic"}");\n    return { success: true, timestamp: Date.now() };\n}\nexecute_${(currentLesson?.slug || "lesson").replace(/-/g, "_")}();`,
      output: `Mastering ${currentLesson?.title || "Subtopic"}`,
      explanation: `Demonstration code snippet illustrating the foundational syntax, algorithmic flow, and pattern for ${currentLesson?.title}.`,
    };
  }, [currentLesson, course]);

  // Subtopic Exercise Fallback Guarantee
  const subtopicExercise = useMemo(() => {
    if (currentLesson?.exercise) return currentLesson.exercise;
    return {
      id: `ex-${currentLesson?.id || "fallback"}`,
      type: "multiple-choice" as const,
      prompt: `Which engineering principle is most critical when implementing "${currentLesson?.title || "this subtopic"}"?`,
      options: [
        `Strictly adhering to modular architecture, type safety, and error handling`,
        "Omitting parameter validation to speed up execution",
        "Writing monolithic logic in a single global variable scope",
        "Ignoring boundary constraints and buffer limitations",
      ],
      correctAnswer: 0,
      explanation: `Adhering to structured modular architecture and rigorous error handling ensures production reliability for ${currentLesson?.title}.`,
      hint: "Look for best-practice engineering standards and maintainability.",
    };
  }, [currentLesson]);

  const handleCheckAnswer = () => {
    if (selectedOption === null || !subtopicExercise) return;
    const isCorrect = selectedOption === subtopicExercise.correctAnswer;
    setIsAnswerCorrect(isCorrect);
    setHasCheckedAnswer(true);

    if (isCorrect) {
      awardXP(30, "Solved subtopic practice quiz correctly");
    }
  };

  const handleSelectTopicQuizAnswer = (qId: string, optIdx: number) => {
    if (hasSubmittedTopicQuiz) return;
    setTopicQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitTopicQuiz = () => {
    const questions = mainTopicCapstone.finalQuiz;
    let correctCount = 0;
    questions.forEach((q) => {
      if (topicQuizAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    setTopicQuizScore(correctCount);
    setHasSubmittedTopicQuiz(true);

    const capQuizId = `${currentModule.id}-quiz`;
    if (!completedCapstoneIds.includes(capQuizId)) {
      const updated = [...completedCapstoneIds, capQuizId];
      setCompletedCapstoneIds(updated);
      try {
        localStorage.setItem(capstoneStorageKey, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      awardXP(150, `Passed Main Topic Final Assessment Quiz: ${currentModule.title}`);
    }
  };

  const progressPercentage = Math.round(
    (completedLessonIds.length / (allLessons.length || 1)) * 100
  );

  const modCompletedLessonsCount = useMemo(() => {
    return (
      currentModule?.lessons.filter((l) => completedLessonIds.includes(l.id)).length || 0
    );
  }, [currentModule, completedLessonIds]);

  const isModuleFullyComplete =
    modCompletedLessonsCount === (currentModule?.lessons.length || 0);

  const isCourseComplete =
    completedLessonIds.length === allLessons.length && allLessons.length > 0;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col">
      {/* ── Top Header Bar ── */}
      <header className="h-16 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          {/* Mobile Curriculum Toggle */}
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
            <div className="flex flex-col">
              <span className="font-extrabold text-xs sm:text-sm text-[#182230] truncate max-w-[160px] sm:max-w-xs md:max-w-md">
                {course.title}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {course.category}
              </span>
            </div>
          </div>
        </div>

        {/* Right Stats & Progress */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2.5 text-xs text-[#64748B]">
            <span className="font-semibold">Course Progress:</span>
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
            <span>{completedLessonIds.length * 100 + completedCapstoneIds.length * 150} XP</span>
          </div>
        </div>
      </header>

      {/* ── Main Layout: Sidebar + Main Content ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Backdrop */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* ══════════════════════════════════════════════════════════════
            1. CURRICULUM SIDEBAR: Main Topics & Subtopics
           ══════════════════════════════════════════════════════════════ */}
        <aside
          className={`fixed lg:static top-16 bottom-0 left-0 z-40 w-72 sm:w-84 bg-white border-r border-[#E2E8F0] flex flex-col transition-transform duration-300 select-none ${
            mobileSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Sidebar Top: Search & Header */}
          <div className="p-4 border-b border-[#E2E8F0] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-xs uppercase tracking-wider text-[#12316B] flex items-center gap-2">
                <BookOpen size={15} className="text-[#18B6D2]" />
                <span>PDF Curriculum Syllabus</span>
              </h2>
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                {completedLessonIds.length}/{allLessons.length} Done
              </span>
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={curriculumSearch}
                onChange={(e) => setCurriculumSearch(e.target.value)}
                placeholder="Search subtopics..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F7F9FC] border border-[#CBD5E1] text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#12316B] focus:bg-white transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Module List Accordion (Main Topics -> Subtopics) */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
            {course.modules.map((mod, modIdx) => {
              const isOpen = !!expandedModules[mod.id];
              const modCompletedCount = mod.lessons.filter((l) =>
                completedLessonIds.includes(l.id)
              ).length;
              const isModComplete =
                modCompletedCount === mod.lessons.length && mod.lessons.length > 0;
              const isCurrentModule = mod.id === currentModule?.id;

              return (
                <div
                  key={mod.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isCurrentModule
                      ? "border-[#12316B]/60 shadow-xs ring-1 ring-[#12316B]/10"
                      : "border-[#CBD5E1] bg-white shadow-2xs"
                  }`}
                >
                  {/* Main Topic Header */}
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full p-3 text-left flex items-center justify-between gap-2.5 hover:bg-slate-50 transition-colors cursor-pointer bg-slate-50/80"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isModComplete ? (
                        <CheckCircle2 size={17} className="text-[#16865C] flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-md bg-white border border-slate-300 flex items-center justify-center text-[10px] font-black text-[#12316B] flex-shrink-0 shadow-2xs">
                          {modIdx + 1}
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Main Topic {modIdx + 1}
                        </span>
                        <span className="font-bold text-xs text-slate-900 truncate block">
                          {mod.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[11px] text-slate-600 font-mono font-semibold">
                        {modCompletedCount}/{mod.lessons.length}
                      </span>
                      <ChevronDown
                        size={15}
                        className={`text-slate-500 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Subtopics Under This Main Topic */}
                  {isOpen && (
                    <div className="p-2 space-y-1 bg-white border-t border-[#E2E8F0]">
                      {mod.lessons.map((lesson, lessonIdx) => {
                        const isActive =
                          lesson.id === activeLessonId && activeView === "subtopic";
                        const isDone = completedLessonIds.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setActiveView("subtopic");
                              setActiveLessonId(lesson.id);
                              router.push(`/learn/${course.id}/${lesson.id}`);
                              setMobileSidebarOpen(false);
                            }}
                            className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                              isActive
                                ? "bg-[#12316B] text-white font-bold shadow-xs"
                                : "text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {isDone ? (
                                <CheckCircle2
                                  size={14}
                                  className={isActive ? "text-[#18B6D2]" : "text-[#16865C]"}
                                />
                              ) : (
                                <span
                                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                                    isActive
                                      ? "bg-white/20 text-white"
                                      : "bg-slate-100 text-slate-500"
                                  }`}
                                >
                                  {modIdx + 1}.{lessonIdx + 1}
                                </span>
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

                      {/* Main Topic Final Capstone Entry in Sidebar */}
                      <button
                        onClick={() => {
                          setActiveView("capstone");
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between text-xs transition-all cursor-pointer border ${
                          activeView === "capstone" && isCurrentModule
                            ? "bg-amber-500 text-white font-extrabold border-amber-600 shadow-xs"
                            : "bg-amber-50/70 hover:bg-amber-100/80 text-amber-900 border-amber-200/70 font-semibold"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Trophy size={14} className={activeView === "capstone" && isCurrentModule ? "text-white" : "text-amber-600"} />
                          <span className="truncate">Final: Quiz &amp; Code Challenge</span>
                        </div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20">
                          +250 XP
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar Footer: Course PDF Study Materials */}
          {course.pdfLessons && course.pdfLessons.length > 0 && (
            <div className="p-3 border-t border-[#E2E8F0] bg-slate-50 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#12316B] uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <FileText size={13} className="text-[#0b69ff]" />
                  <span>Curriculum PDF Handbooks</span>
                </span>
                <span className="font-mono text-slate-500">{course.pdfLessons.length}</span>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto no-scrollbar">
                {course.pdfLessons.map((pdf) => (
                  <button
                    key={pdf.id}
                    onClick={() => {
                      setSelectedPdfLesson(pdf);
                      setIsPdfModalOpen(true);
                    }}
                    className="w-full text-left p-2 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#12316B]/40 hover:bg-blue-50/40 transition-colors flex items-center justify-between gap-2 text-xs group cursor-pointer"
                  >
                    <span className="truncate font-semibold text-[#182230] group-hover:text-[#12316B]">
                      {pdf.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                      {pdf.fileSize}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* ══════════════════════════════════════════════════════════════
            2. MAIN LEARNING VIEW (PDF Tag -> Skills Outcome -> Subtopics)
           ══════════════════════════════════════════════════════════════ */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
          {/* ──────────────────────────────────────────────────────────
              SECTION 1: PROMINENT PDF TAG & RESOURCE BAR (Top of Page)
             ────────────────────────────────────────────────────────── */}
          <section className="bg-gradient-to-r from-red-500/10 via-rose-500/5 to-slate-50 border border-red-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <FileText size={24} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                    PDF Curriculum Guide
                  </span>
                  <span className="text-[11px] font-bold text-slate-600">
                    {activePdf.pageCount} Pages • {activePdf.fileSize}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified Syllabus Document
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 line-clamp-1">
                  {activePdf.title}
                </h2>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {activePdf.description ||
                    `Follow the syllabus order for ${currentModule?.title}. Read inline with interactive controls or download for offline study.`}
                </p>
              </div>
            </div>

            {/* Actions: Read PDF Inline & Download */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                onClick={() => {
                  setSelectedPdfLesson(activePdf);
                  setIsPdfModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black flex items-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <BookOpen size={14} />
                <span>Read PDF Inline</span>
              </button>

              {activePdf.fileUrl && (
                <a
                  href={activePdf.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Download</span>
                </a>
              )}
            </div>
          </section>

          {/* ──────────────────────────────────────────────────────────
              SECTION 2: SKILLS OUTCOME SECTION (Below PDF Tag)
             ────────────────────────────────────────────────────────── */}
          <section className="clean-card p-5 sm:p-6 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/15 border border-blue-100/90 rounded-2xl shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#12316B]/10 text-[#12316B] flex items-center justify-center font-bold text-base">
                  🎯
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-[#12316B] flex items-center gap-1.5">
                    <span>Skills Outcome &amp; Target Competencies</span>
                    <Sparkles size={14} className="text-amber-500" />
                  </h3>
                  <p className="text-xs text-slate-500">
                    What you will be able to design, code, and architect after mastering this topic and its subtopics:
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-[#12316B] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                {course.skillsGained?.length || 6} Target Outcomes
              </span>
            </div>

            {/* Grid of Outcome Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {(course.skillsGained && course.skillsGained.length > 0
                ? course.skillsGained
                : [
                    "Understand core syntax, compilation pipeline, and memory layout",
                    "Master modular architecture and clean algorithmic patterns",
                    "Implement robust error handling and guard edge conditions",
                    "Design defensive routines against state and memory vulnerabilities",
                    "Optimize asymptotic computational throughput and memory footprint",
                    "Build production-grade systems ready for technical interviews",
                  ]
              ).map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 transition-colors flex items-start gap-2.5 shadow-2xs group"
                >
                  <CheckCircle2
                    size={16}
                    className="text-[#16865C] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs font-semibold text-slate-800 leading-snug">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ──────────────────────────────────────────────────────────
              SECTION 3: DIVIDED SUBTOPICS (According to the PDF Syllabus)
             ────────────────────────────────────────────────────────── */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#12316B] text-white text-[10px] font-black uppercase tracking-wider">
                    Main Topic {currentModuleIndex + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-900">
                    {currentModule?.title}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Divided into {currentModule?.lessons.length || 0} structured subtopics + 1 Final Capstone (Quiz &amp; Code Challenge)
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <span>Subtopic Mastery:</span>
                <span className="text-[#12316B] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100 font-mono">
                  {modCompletedLessonsCount} / {currentModule?.lessons.length} Completed
                </span>
              </div>
            </div>

            {/* Subtopics Pipeline Navigation Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-1 no-scrollbar">
              {currentModule?.lessons.map((lesson, idx) => {
                const isActive = lesson.id === activeLessonId && activeView === "subtopic";
                const isDone = completedLessonIds.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setActiveView("subtopic");
                      setActiveLessonId(lesson.id);
                      router.push(`/learn/${course.id}/${lesson.id}`);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 flex-shrink-0 transition-all cursor-pointer border ${
                      isActive
                        ? "bg-[#12316B] text-white border-[#12316B] shadow-xs"
                        : isDone
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/70"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2
                        size={14}
                        className={isActive ? "text-cyan-300" : "text-emerald-600"}
                      />
                    ) : (
                      <span
                        className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {idx + 1}
                      </span>
                    )}
                    <span className="truncate max-w-[150px] sm:max-w-[190px]">
                      {lesson.title}
                    </span>
                  </button>
                );
              })}

              {/* Final Main Topic Capstone Pill */}
              <button
                onClick={() => setActiveView("capstone")}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 flex-shrink-0 transition-all cursor-pointer border ${
                  activeView === "capstone"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600 shadow-md scale-102"
                    : "bg-amber-50 text-amber-900 border-amber-300/80 hover:bg-amber-100"
                }`}
              >
                <span>🏆</span>
                <span>Main Topic Final (Quiz + Code)</span>
              </button>
            </div>
          </section>

          {/* ──────────────────────────────────────────────────────────
              VIEW MODE A: ACTIVE SUBTOPIC (With Code & Quiz)
             ────────────────────────────────────────────────────────── */}
          {activeView === "subtopic" && (
            <div className="space-y-6">
              {/* Subtopic Header & Content */}
              <div className="clean-card p-6 sm:p-8 space-y-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#12316B] font-bold">
                      Subtopic {currentLessonIndexInModule + 1} of {currentModule?.lessons.length}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-slate-600">{currentLesson?.duration || "25 min"}</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#16865C] font-bold">
                    +{currentLesson?.xpReward || 100} XP on Completion
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-brand text-[#182230] tracking-tight">
                  {currentLesson?.title}
                </h1>

                {/* Subtopic Content */}
                <div className="text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line pt-2">
                  {currentLesson?.content}
                </div>
              </div>

              {/* ── Subtopic Code Section ── */}
              <div className="clean-card overflow-hidden rounded-2xl border border-slate-800 shadow-md bg-slate-950">
                <div className="bg-[#12316B] px-5 py-3 flex items-center justify-between text-white text-xs border-b border-white/10">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 font-black uppercase tracking-wider text-cyan-300">
                      {subtopicCode.language}
                    </span>
                    <span className="text-slate-300 font-sans text-[11px] hidden sm:inline">
                      • Subtopic Implementation Snippet
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(subtopicCode.code)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-bold cursor-pointer"
                  >
                    {copiedCode ? <Check size={13} className="text-[#18B6D2]" /> : <Copy size={13} />}
                    <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                  </button>
                </div>

                <pre className="p-5 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed bg-slate-900">
                  <code>{subtopicCode.code}</code>
                </pre>

                {subtopicCode.output && (
                  <div className="px-5 py-3 bg-slate-950 border-t border-slate-800/80 font-mono text-xs text-emerald-400 flex items-center gap-2">
                    <Terminal size={14} className="text-slate-400 flex-shrink-0" />
                    <span className="text-slate-400">Output:</span>
                    <span>{subtopicCode.output}</span>
                  </div>
                )}

                {subtopicCode.explanation && (
                  <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                    <Lightbulb size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{subtopicCode.explanation}</span>
                  </div>
                )}
              </div>

              {/* Subtopic Takeaways & Traps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentLesson?.keyTakeaways && currentLesson.keyTakeaways.length > 0 && (
                  <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2.5">
                    <h3 className="font-extrabold text-xs text-[#16865C] uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 size={15} />
                      <span>Key Architectural Takeaways</span>
                    </h3>
                    <ul className="space-y-1.5 text-xs text-slate-800">
                      {currentLesson.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#16865C] font-black">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentLesson?.commonMistakes && currentLesson.commonMistakes.length > 0 && (
                  <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-2.5">
                    <h3 className="font-extrabold text-xs text-[#C83C4A] uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle size={15} />
                      <span>Common Traps to Avoid</span>
                    </h3>
                    <div className="space-y-2 text-xs">
                      {currentLesson.commonMistakes.map((m, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="text-[#C83C4A] font-semibold">❌ {m.wrong}</div>
                          <div className="text-[#16865C] font-semibold">✅ {m.correct}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ── Subtopic Practice Quiz Section ── */}
              <div className="clean-card p-6 sm:p-7 space-y-5 rounded-2xl border-l-4 border-l-[#12316B] bg-white border border-slate-200/90 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-[#18B6D2]" />
                    <h3 className="font-extrabold text-sm text-[#182230] uppercase tracking-wider">
                      Subtopic Practice Quiz: Knowledge Check
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#12316B] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    +30 Practice XP
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-900 leading-snug">
                  {subtopicExercise.prompt}
                </p>

                {/* Subtopic Options */}
                {subtopicExercise.options && (
                  <div className="space-y-2 pt-1">
                    {subtopicExercise.options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      let optionStyle =
                        "border-slate-200 hover:bg-slate-50 text-slate-800";
                      if (hasCheckedAnswer) {
                        if (idx === subtopicExercise.correctAnswer) {
                          optionStyle =
                            "bg-emerald-50 border-[#16865C] text-[#16865C] font-bold";
                        } else if (isSelected) {
                          optionStyle = "bg-rose-50 border-[#C83C4A] text-[#C83C4A]";
                        }
                      } else if (isSelected) {
                        optionStyle =
                          "border-[#12316B] bg-blue-50/80 text-[#12316B] font-bold";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (!hasCheckedAnswer) setSelectedOption(idx);
                          }}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-md border text-[11px] flex items-center justify-center font-bold font-mono">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {hasCheckedAnswer && idx === subtopicExercise.correctAnswer && (
                            <CheckCircle2 size={16} className="text-[#16865C] flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Subtopic Quiz Feedback */}
                {hasCheckedAnswer && (
                  <div
                    className={`p-4 rounded-xl text-xs sm:text-sm ${
                      isAnswerCorrect
                        ? "bg-emerald-50 border border-emerald-200 text-[#16865C]"
                        : "bg-rose-50 border border-rose-200 text-[#C83C4A]"
                    }`}
                  >
                    <p className="font-bold flex items-center gap-1.5">
                      {isAnswerCorrect ? (
                        <>
                          <CheckCircle2 size={16} /> Correct! Well done.
                        </>
                      ) : (
                        <>
                          <AlertCircle size={16} /> Not quite right.
                        </>
                      )}
                    </p>
                    <p className="mt-1 text-slate-800">{subtopicExercise.explanation}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-1">
                  {!hasCheckedAnswer ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={selectedOption === null}
                      className="px-5 py-2.5 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white font-bold text-xs uppercase tracking-wider disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setHasCheckedAnswer(false);
                        setSelectedOption(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#182230] text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw size={13} />
                      <span>Try Again</span>
                    </button>
                  )}

                  {subtopicExercise.hint && !showHint && (
                    <button
                      onClick={() => setShowHint(true)}
                      className="text-xs text-[#64748B] hover:text-[#12316B] font-medium cursor-pointer"
                    >
                      Need a hint?
                    </button>
                  )}
                  {showHint && (
                    <span className="text-xs text-[#18B6D2] italic">
                      Hint: {subtopicExercise.hint}
                    </span>
                  )}
                </div>
              </div>

              {/* ── Subtopic Bottom Navigation ── */}
              <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
                {prevLesson ? (
                  <button
                    onClick={() => {
                      setActiveLessonId(prevLesson.id);
                      router.push(`/learn/${course.id}/${prevLesson.id}`);
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E2E8F0] hover:bg-white text-xs font-bold text-[#64748B] hover:text-[#182230] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={14} />
                    <span>Previous Subtopic</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {isLastLessonInModule ? (
                    <button
                      onClick={() => {
                        markLessonComplete();
                        setActiveView("capstone");
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <Trophy size={16} />
                      <span>Take Main Topic Final Assessment 🏆</span>
                    </button>
                  ) : (
                    <button
                      onClick={markLessonComplete}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#12316B]/20 transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <CheckCircle2 size={16} className="text-[#18B6D2]" />
                      <span>
                        {completedLessonIds.includes(currentLesson?.id || "")
                          ? "Next Subtopic"
                          : "Mark Complete & Continue"}
                      </span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────
              VIEW MODE B: MAIN TOPIC CAPSTONE (Final Code & Final Quiz)
             ────────────────────────────────────────────────────────── */}
          {activeView === "capstone" && (
            <div className="space-y-6">
              {/* Capstone Header Banner */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white shadow-xl space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <Trophy size={16} />
                    <span>MAIN TOPIC CAPSTONE EVALUATION</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold border border-white/20">
                    Main Topic {currentModuleIndex + 1} of {course.modules.length}
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl font-black font-brand">
                  {currentModule?.title}: Capstone Mastery
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Synthesize your learning across all {currentModule?.lessons.length} subtopics.
                  Complete the hands-on coding challenge and pass the comprehensive final quiz to validate topic mastery.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-blue-200">
                  <div className="flex items-center gap-1.5">
                    <Code size={14} className="text-amber-400" />
                    <span>1 Main Topic Coding Challenge (+100 XP)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HelpCircle size={14} className="text-emerald-300" />
                    <span>3 Comprehensive Quiz Questions (+150 XP)</span>
                  </div>
                </div>
              </div>

              {/* ── Component 1: Main Topic Final Code Challenge ── */}
              <div className="clean-card p-6 sm:p-8 space-y-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#12316B] flex items-center justify-center font-bold">
                      <Code size={20} />
                    </div>
                    <div>
                      <h3 className="font-black text-base text-slate-900">
                        {mainTopicCapstone.codeChallenge.title}
                      </h3>
                      <span className="text-xs text-slate-500">
                        Synthesizes all subtopic algorithms and concepts
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                    +100 Challenge XP
                  </span>
                </div>

                {/* Challenge Description */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {mainTopicCapstone.codeChallenge.description}
                </p>

                {/* Requirements */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                    Acceptance Criteria &amp; Requirements:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {mainTopicCapstone.codeChallenge.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-[#12316B] flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Starter Code Block */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-700 flex items-center gap-1.5">
                      <Terminal size={14} className="text-[#12316B]" />
                      <span>Starter Code Template:</span>
                    </span>
                    <button
                      onClick={() =>
                        handleCopyStarter(mainTopicCapstone.codeChallenge.starterCode)
                      }
                      className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedStarterCode ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      <span>{copiedStarterCode ? "Copied" : "Copy Starter"}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                    <code>{mainTopicCapstone.codeChallenge.starterCode}</code>
                  </pre>
                </div>

                {/* Master Solution Accordion */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-[#12316B] text-[#12316B] text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>{showSolution ? "Hide Master Solution" : "Reveal Master Architecture & Solution"}</span>
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        showSolution ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showSolution && (
                    <div className="mt-4 p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-cyan-300">
                            Production-Grade Reference Implementation
                          </span>
                          {mainTopicCapstone.codeChallenge.complexity && (
                            <span className="text-[10px] font-mono text-slate-400">
                              Time: {mainTopicCapstone.codeChallenge.complexity.time} • Space: {mainTopicCapstone.codeChallenge.complexity.space}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() =>
                            handleCopySolution(mainTopicCapstone.codeChallenge.solutionCode)
                          }
                          className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedSolutionCode ? <Check size={12} className="text-cyan-300" /> : <Copy size={12} />}
                          <span>{copiedSolutionCode ? "Copied" : "Copy Solution"}</span>
                        </button>
                      </div>

                      <pre className="text-xs font-mono overflow-x-auto leading-relaxed text-emerald-300">
                        <code>{mainTopicCapstone.codeChallenge.solutionCode}</code>
                      </pre>

                      <p className="text-xs text-slate-300 pt-2 border-t border-slate-800 leading-relaxed">
                        {mainTopicCapstone.codeChallenge.explanation}
                      </p>
                    </div>
                  )}
                </div>

                {/* Mark Solved Action */}
                <div className="pt-3 flex items-center gap-3">
                  <button
                    onClick={markCapstoneCodeSolved}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <CheckCircle2 size={15} />
                    <span>
                      {completedCapstoneIds.includes(`${currentModule.id}-code`)
                        ? "Challenge Completed ✓"
                        : "Mark Code Challenge as Solved (+100 XP)"}
                    </span>
                  </button>
                </div>
              </div>

              {/* ── Component 2: Main Topic Comprehensive Assessment Quiz ── */}
              <div className="clean-card p-6 sm:p-8 space-y-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      <HelpCircle size={20} />
                    </div>
                    <div>
                      <h3 className="font-black text-base text-slate-900">
                        Main Topic Final Comprehensive Assessment
                      </h3>
                      <span className="text-xs text-slate-500">
                        Testing core concepts across all {currentModule?.lessons.length} subtopics
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 self-start sm:self-auto">
                    +150 Assessment XP
                  </span>
                </div>

                {/* Question List */}
                <div className="space-y-5">
                  {mainTopicCapstone.finalQuiz.map((q, qIdx) => {
                    const selected = topicQuizAnswers[q.id];
                    const isSubmitted = hasSubmittedTopicQuiz;
                    const isCorrect = selected === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-3 bg-slate-50/50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#12316B] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            Question {qIdx + 1} of {mainTopicCapstone.finalQuiz.length}
                          </span>
                          {isSubmitted && (
                            <span
                              className={`text-xs font-bold flex items-center gap-1 ${
                                isCorrect ? "text-[#16865C]" : "text-[#C83C4A]"
                              }`}
                            >
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 size={14} /> Correct
                                </>
                              ) : (
                                <>
                                  <AlertCircle size={14} /> Incorrect
                                </>
                              )}
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {q.prompt}
                        </p>

                        <div className="space-y-2 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isOptionSelected = selected === optIdx;
                            let style =
                              "border-slate-200 bg-white hover:bg-slate-100 text-slate-800";
                            if (isSubmitted) {
                              if (optIdx === q.correctAnswer) {
                                style =
                                  "bg-emerald-50 border-[#16865C] text-[#16865C] font-bold";
                              } else if (isOptionSelected) {
                                style =
                                  "bg-rose-50 border-[#C83C4A] text-[#C83C4A]";
                              }
                            } else if (isOptionSelected) {
                              style =
                                "border-[#12316B] bg-blue-50/80 text-[#12316B] font-bold";
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() =>
                                  handleSelectTopicQuizAnswer(q.id, optIdx)
                                }
                                disabled={isSubmitted}
                                className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${style}`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="w-5 h-5 rounded-md border text-[11px] flex items-center justify-center font-mono font-bold">
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </div>
                                {isSubmitted && optIdx === q.correctAnswer && (
                                  <CheckCircle2 size={16} className="text-[#16865C]" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation after submission */}
                        {isSubmitted && (
                          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-800">
                            <strong>Rationale:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit Quiz Actions */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {!hasSubmittedTopicQuiz ? (
                    <button
                      onClick={handleSubmitTopicQuiz}
                      disabled={
                        Object.keys(topicQuizAnswers).length <
                        mainTopicCapstone.finalQuiz.length
                      }
                      className="px-6 py-3 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white font-black text-xs uppercase tracking-wider disabled:opacity-50 transition-all cursor-pointer shadow-md"
                    >
                      Submit Main Topic Quiz
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-bold text-slate-800">
                        Score:{" "}
                        <strong className="text-[#12316B] text-sm font-black">
                          {topicQuizScore} / {mainTopicCapstone.finalQuiz.length}
                        </strong>{" "}
                        ({Math.round(
                          (topicQuizScore / mainTopicCapstone.finalQuiz.length) * 100
                        )}
                        %)
                      </div>

                      <button
                        onClick={() => {
                          setHasSubmittedTopicQuiz(false);
                          setTopicQuizAnswers({});
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw size={12} />
                        <span>Retake Quiz</span>
                      </button>
                    </div>
                  )}

                  {/* Proceed to Next Main Topic button */}
                  {nextModule ? (
                    <button
                      onClick={() => {
                        const firstLessonOfNext = nextModule.lessons[0];
                        if (firstLessonOfNext) {
                          setActiveView("subtopic");
                          setActiveLessonId(firstLessonOfNext.id);
                          router.push(`/learn/${course.id}/${firstLessonOfNext.id}`);
                        }
                      }}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#173B70] to-[#12316B] hover:from-[#12316B] hover:to-[#0b69ff] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <span>Proceed to Next Main Topic ({nextModule.title})</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <Link
                      href={`/courses/${course.slug}`}
                      className="px-5 py-3 rounded-xl bg-[#16865C] hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <ShieldCheck size={16} />
                      <span>Finish Course &amp; View Certificate</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────
              COURSE ALL-LESSONS COMPLETED CELEBRATION
             ────────────────────────────────────────────────────────── */}
          {isCourseComplete && (
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50 via-cyan-50 to-emerald-50 border-2 border-[#16865C] space-y-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#16865C] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#182230]">
                    All {allLessons.length} Course Subtopics Completed!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    You have satisfied all lesson requirements across all main topics. You can launch the final server-graded assessment or claim your verified certificate.
                  </p>
                </div>
              </div>

              <Link
                href={`/dashboard/assessments/${course.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#16865C] hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-102"
              >
                <Award size={16} />
                <span>Launch Final Comprehensive Exam</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </main>
      </div>

      {/* ── Accessible In-App PDF Reader Modal ── */}
      {selectedPdfLesson && (
        <PdfReaderModal
          course={course}
          lesson={selectedPdfLesson}
          isOpen={isPdfModalOpen}
          onClose={() => {
            setIsPdfModalOpen(false);
            setSelectedPdfLesson(null);
          }}
        />
      )}
    </div>
  );
}
