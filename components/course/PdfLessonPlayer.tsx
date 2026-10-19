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
  Layers,
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

  // Active module & initial subtopic
  const initialLesson = useMemo(() => {
    return allLessons.find((l) => l.id === initialLessonId) || allLessons[0];
  }, [allLessons, initialLessonId]);

  const initialModule = useMemo(() => {
    return (
      course.modules.find((m) => m.lessons.some((l) => l.id === initialLesson?.id)) ||
      course.modules[0]
    );
  }, [course, initialLesson]);

  const [activeModuleId, setActiveModuleId] = useState<string>(
    initialModule?.id || course.modules[0]?.id || ""
  );

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [curriculumSearch, setCurriculumSearch] = useState("");

  // PDF Reader Modal state
  const [selectedPdfLesson, setSelectedPdfLesson] = useState<PdfLesson | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Expanded modules state in sidebar
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.modules[0]?.id || ""]: true,
    [initialModule?.id || ""]: true,
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

  // Current active Module (Main Topic)
  const currentModule = useMemo(() => {
    return (
      course.modules.find((m) => m.id === activeModuleId) ||
      course.modules[0]
    );
  }, [course, activeModuleId]);

  const currentModuleIndex = useMemo(() => {
    return course.modules.findIndex((m) => m.id === currentModule?.id);
  }, [course, currentModule]);

  // Next Module in sequence
  const nextModule = useMemo(() => {
    return currentModuleIndex < course.modules.length - 1
      ? course.modules[currentModuleIndex + 1]
      : null;
  }, [course, currentModuleIndex]);

  // Active PDF for current module / course
  const activePdf = useMemo<PdfLesson>(() => {
    if (course.pdfLessons && course.pdfLessons.length > 0) {
      const matched = course.pdfLessons.find((p) =>
        p.moduleTitle?.toLowerCase().includes(currentModule?.title?.toLowerCase() || "") ||
        p.title?.toLowerCase().includes(currentModule?.title?.toLowerCase() || "")
      );
      if (matched) return matched;
      return course.pdfLessons[currentModuleIndex] || course.pdfLessons[0];
    }
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

  // Main Topic Capstone Data (Final Quiz & Final Code)
  const mainTopicCapstone = useMemo<MainTopicCapstone>(() => {
    return getMainTopicCapstone(
      currentModule?.id || "mod-1",
      currentModule?.title || "Foundations",
      course.title,
      course.category
    );
  }, [currentModule, course]);

  // Subtopic interactive state (mapped per lesson.id)
  const [subtopicSelectedOptions, setSubtopicSelectedOptions] = useState<Record<string, number | null>>({});
  const [subtopicCheckedAnswers, setSubtopicCheckedAnswers] = useState<Record<string, boolean>>({});
  const [subtopicIsCorrect, setSubtopicIsCorrect] = useState<Record<string, boolean>>({});
  const [subtopicShowHints, setSubtopicShowHints] = useState<Record<string, boolean>>({});
  const [subtopicCopiedCodes, setSubtopicCopiedCodes] = useState<Record<string, boolean>>({});

  // Main Topic Final Capstone state
  const [topicQuizAnswers, setTopicQuizAnswers] = useState<Record<string, number>>({});
  const [hasSubmittedTopicQuiz, setHasSubmittedTopicQuiz] = useState(false);
  const [topicQuizScore, setTopicQuizScore] = useState(0);
  const [showMainSolution, setShowMainSolution] = useState(false);
  const [copiedMainStarter, setCopiedMainStarter] = useState(false);
  const [copiedMainSolution, setCopiedMainSolution] = useState(false);

  // Auto-scroll to initial subtopic if specified
  useEffect(() => {
    if (initialLessonId) {
      const elem = document.getElementById(`subtopic-${initialLessonId}`);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, [initialLessonId]);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const scrollToSubtopic = (lessonId: string) => {
    const elem = document.getElementById(`subtopic-${lessonId}`);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToFinal = () => {
    const elem = document.getElementById("main-topic-final");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Subtopic code copier
  const handleCopySubtopicCode = (lessonId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setSubtopicCopiedCodes((prev) => ({ ...prev, [lessonId]: true }));
    setTimeout(() => {
      setSubtopicCopiedCodes((prev) => ({ ...prev, [lessonId]: false }));
    }, 2000);
  };

  // Subtopic quiz checking
  const handleCheckSubtopicAnswer = (lesson: Lesson, exercise: any) => {
    const selected = subtopicSelectedOptions[lesson.id];
    if (selected === undefined || selected === null) return;
    const isCorrect = selected === exercise.correctAnswer;

    setSubtopicIsCorrect((prev) => ({ ...prev, [lesson.id]: isCorrect }));
    setSubtopicCheckedAnswers((prev) => ({ ...prev, [lesson.id]: true }));

    if (isCorrect) {
      awardXP(30, `Solved quiz for: ${lesson.title}`);
      if (!completedLessonIds.includes(lesson.id)) {
        const updated = [...completedLessonIds, lesson.id];
        setCompletedLessonIds(updated);
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  // Mark a subtopic complete directly
  const handleMarkSubtopicDone = (lessonId: string) => {
    if (!completedLessonIds.includes(lessonId)) {
      const updated = [...completedLessonIds, lessonId];
      setCompletedLessonIds(updated);
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      awardXP(50, `Completed subtopic`);
    }
  };

  // Main topic final quiz
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
      awardXP(150, `Passed Main Topic Final Quiz: ${currentModule.title}`);
    }
  };

  // Main topic final code
  const handleMarkMainCodeSolved = () => {
    const capId = `${currentModule.id}-code`;
    if (!completedCapstoneIds.includes(capId)) {
      const updated = [...completedCapstoneIds, capId];
      setCompletedCapstoneIds(updated);
      try {
        localStorage.setItem(capstoneStorageKey, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      awardXP(100, `Solved Main Topic Final Code: ${currentModule.title}`);
    }
  };

  // Helper for subtopic code guarantee
  const getSubtopicCode = (lesson: Lesson) => {
    if (lesson.codeExample) return lesson.codeExample;
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
      code: `// ${lesson.title}\n// Implementation and core pattern demonstration\nfunction execute_${lesson.slug.replace(/-/g, "_")}() {\n    console.log("Mastering ${lesson.title}");\n    return { success: true, timestamp: Date.now() };\n}\nexecute_${lesson.slug.replace(/-/g, "_")}();`,
      output: `Mastering ${lesson.title}`,
      explanation: `Demonstration code snippet illustrating the foundational syntax and algorithmic flow for ${lesson.title}.`,
    };
  };

  // Helper for subtopic quiz guarantee
  const getSubtopicExercise = (lesson: Lesson) => {
    if (lesson.exercise) return lesson.exercise;
    return {
      id: `ex-${lesson.id}`,
      type: "multiple-choice" as const,
      prompt: `Which engineering principle is most critical when implementing "${lesson.title}"?`,
      options: [
        `Strictly adhering to modular architecture, type safety, and defensive error handling`,
        "Omitting input validation to maximize execution speed",
        "Writing monolithic logic in a single global variable scope",
        "Ignoring boundary constraints and buffer limitations",
      ],
      correctAnswer: 0,
      explanation: `Adhering to structured modular architecture and rigorous error handling ensures production reliability for ${lesson.title}.`,
      hint: "Look for best-practice engineering standards and maintainability.",
    };
  };

  const progressPercentage = Math.round(
    (completedLessonIds.length / (allLessons.length || 1)) * 100
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex flex-col">
      {/* ── Top App Bar ── */}
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

      {/* ── Main Layout: Sidebar + Main Stream ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Backdrop */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* ══════════════════════════════════════════════════════════════
            SIDEBAR: Main Topics & Subtopics Selector
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

          {/* Module List Accordion (Main Topics) */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
            {course.modules.map((mod, modIdx) => {
              const isOpen = !!expandedModules[mod.id];
              const isCurrentModule = mod.id === currentModule?.id;
              const modCompletedCount = mod.lessons.filter((l) =>
                completedLessonIds.includes(l.id)
              ).length;
              const isModComplete =
                modCompletedCount === mod.lessons.length && mod.lessons.length > 0;

              return (
                <div
                  key={mod.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isCurrentModule
                      ? "border-[#12316B] ring-2 ring-[#12316B]/15 bg-white shadow-xs"
                      : "border-[#CBD5E1] bg-white shadow-2xs"
                  }`}
                >
                  {/* Main Topic Click Header */}
                  <button
                    onClick={() => {
                      setActiveModuleId(mod.id);
                      toggleModule(mod.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
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

                  {/* Subtopics Listed under this Main Topic */}
                  {isOpen && (
                    <div className="p-2 space-y-1 bg-white border-t border-[#E2E8F0]">
                      {mod.lessons.map((lesson, lessonIdx) => {
                        const isDone = completedLessonIds.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setActiveModuleId(mod.id);
                              setMobileSidebarOpen(false);
                              scrollToSubtopic(lesson.id);
                            }}
                            className="w-full p-2.5 rounded-xl text-left flex items-center justify-between text-xs transition-all cursor-pointer text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {isDone ? (
                                <CheckCircle2 size={14} className="text-[#16865C]" />
                              ) : (
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 font-bold">
                                  {modIdx + 1}.{lessonIdx + 1}
                                </span>
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <span className="text-[10px] font-mono ml-2 flex-shrink-0 text-slate-400">
                              {lesson.duration}
                            </span>
                          </button>
                        );
                      })}

                      {/* Main Topic Final Jump Button */}
                      <button
                        onClick={() => {
                          setActiveModuleId(mod.id);
                          setMobileSidebarOpen(false);
                          scrollToFinal();
                        }}
                        className="w-full p-2.5 rounded-xl text-left flex items-center justify-between text-xs transition-all cursor-pointer bg-amber-50 hover:bg-amber-100/90 text-amber-900 border border-amber-200/80 font-bold"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Trophy size={14} className="text-amber-600" />
                          <span className="truncate">Final: Quiz &amp; Code Challenge</span>
                        </div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/60">
                          +250 XP
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar Footer: Course PDF Handbooks */}
          {course.pdfLessons && course.pdfLessons.length > 0 && (
            <div className="p-3 border-t border-[#E2E8F0] bg-slate-50 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#12316B] uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <FileText size={13} className="text-[#0b69ff]" />
                  <span>Curriculum PDF Handbooks</span>
                </span>
                <span className="font-mono text-slate-500">{course.pdfLessons.length}</span>
              </div>
              <div className="space-y-1 max-h-28 overflow-y-auto no-scrollbar">
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
            MAIN LEARNING FLOW (ARRANGED IN ORDER ONE BY ONE):
            1. First: PDF Tag
            2. Second: Skills Outcome
            3. Third: Divided Subtopics (according to PDF)
               -> For every subtopic: Code and Quiz Questions
            4. Fourth: At the Final based on Main Topic: Final Quiz and Final Code
           ══════════════════════════════════════════════════════════════ */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
          {/* ──────────────────────────────────────────────────────────
              1. FIRST: PDF TAG (Prominent at top)
             ────────────────────────────────────────────────────────── */}
          <section className="bg-gradient-to-r from-red-500/10 via-rose-500/5 to-slate-50 border-2 border-red-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                    Official Syllabus Document
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

            {/* PDF Action Buttons */}
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
                  <span className="hidden sm:inline">Download PDF</span>
                </a>
              )}
            </div>
          </section>

          {/* ──────────────────────────────────────────────────────────
              2. SECOND: SKILLS OUTCOME SECTION
             ────────────────────────────────────────────────────────── */}
          <section className="p-5 sm:p-6 bg-gradient-to-br from-white via-blue-50/25 to-indigo-50/20 border border-blue-100 rounded-2xl shadow-2xs space-y-4">
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
                    What you will design, engineer, and architect after mastering this topic and its subtopics:
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
              3. THIRD: SUBTOPICS DIVIDED ACCORDING TO THE PDF
                 FOR EVERY SUBTOPIC: CONTENT -> CODE -> QUIZ QUESTIONS
             ────────────────────────────────────────────────────────── */}
          <section className="space-y-6">
            {/* Subtopics Section Header */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#12316B] text-white text-[10px] font-black uppercase tracking-wider">
                    Main Topic {currentModuleIndex + 1}
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    {currentModule?.title}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  According to the syllabus PDF, this main topic is divided into {currentModule?.lessons.length} subtopics.
                  Each subtopic includes complete theory, interactive code, and a knowledge quiz.
                </p>
              </div>

              {/* Quick Jump Pills for this Main Topic */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {currentModule?.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => scrollToSubtopic(lesson.id)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors"
                  >
                    Subtopic {idx + 1}
                  </button>
                ))}
                <button
                  onClick={scrollToFinal}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 cursor-pointer transition-colors"
                >
                  Final Quiz &amp; Code 🏆
                </button>
              </div>
            </div>

            {/* ── Subtopics Listed One by One in Order ── */}
            {currentModule?.lessons.map((lesson, lessonIdx) => {
              const code = getSubtopicCode(lesson);
              const exercise = getSubtopicExercise(lesson);
              const isDone = completedLessonIds.includes(lesson.id);
              const selectedOpt = subtopicSelectedOptions[lesson.id];
              const hasChecked = subtopicCheckedAnswers[lesson.id];
              const isCorrect = subtopicIsCorrect[lesson.id];
              const isCodeCopied = subtopicCopiedCodes[lesson.id];
              const showHint = subtopicShowHints[lesson.id];

              return (
                <div
                  key={lesson.id}
                  id={`subtopic-${lesson.id}`}
                  className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-20 transition-all hover:border-[#12316B]/40"
                >
                  {/* 3.A: Subtopic Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#12316B] text-white flex items-center justify-center text-xs font-black shadow-2xs">
                        {currentModuleIndex + 1}.{lessonIdx + 1}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Subtopic {lessonIdx + 1} of {currentModule.lessons.length}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 font-brand">
                          {lesson.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {lesson.duration || "25 min"}
                      </span>
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16865C] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                          <CheckCircle2 size={13} /> Completed
                        </span>
                      ) : (
                        <button
                          onClick={() => handleMarkSubtopicDone(lesson.id)}
                          className="text-xs font-bold text-[#12316B] hover:text-[#2456A6] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md cursor-pointer transition-colors"
                        >
                          Mark Complete (+50 XP)
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 3.B: Subtopic Theoretical & Architectural Content */}
                  <div className="text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line">
                    {lesson.content}
                  </div>

                  {/* 3.C: Subtopic Key Takeaways & Traps */}
                  {(lesson.keyTakeaways?.length || lesson.commonMistakes?.length) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                      {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
                        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                          <h4 className="font-extrabold text-[11px] text-[#16865C] uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 size={14} />
                            <span>Key Architectural Takeaways</span>
                          </h4>
                          <ul className="space-y-1 text-xs text-slate-800">
                            {lesson.keyTakeaways.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-1.5">
                                <span className="text-[#16865C] font-bold">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                        <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-2">
                          <h4 className="font-extrabold text-[11px] text-[#C83C4A] uppercase tracking-wider flex items-center gap-1.5">
                            <AlertCircle size={14} />
                            <span>Common Traps to Avoid</span>
                          </h4>
                          <div className="space-y-1.5 text-xs">
                            {lesson.commonMistakes.map((m, mIdx) => (
                              <div key={mIdx} className="space-y-0.5">
                                <div className="text-[#C83C4A] font-semibold">❌ {m.wrong}</div>
                                <div className="text-[#16865C] font-semibold">✅ {m.correct}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3.D: SUBTOPIC CODE */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1.5">
                        <Code size={15} className="text-[#12316B]" />
                        <span>Subtopic Code Example:</span>
                      </span>
                    </div>

                    <div className="clean-card overflow-hidden rounded-2xl border border-slate-800 shadow-md bg-slate-950">
                      <div className="bg-[#12316B] px-4 py-2.5 flex items-center justify-between text-white text-xs border-b border-white/10">
                        <div className="flex items-center gap-2 font-mono">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                          <span className="ml-2 font-black uppercase tracking-wider text-cyan-300">
                            {code.language}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCopySubtopicCode(lesson.id, code.code)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors font-bold cursor-pointer text-xs"
                        >
                          {isCodeCopied ? <Check size={12} className="text-cyan-300" /> : <Copy size={12} />}
                          <span>{isCodeCopied ? "Copied" : "Copy Code"}</span>
                        </button>
                      </div>

                      <pre className="p-4 sm:p-5 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed bg-slate-900">
                        <code>{code.code}</code>
                      </pre>

                      {code.output && (
                        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 font-mono text-xs text-emerald-400 flex items-center gap-2">
                          <Terminal size={14} className="text-slate-400 flex-shrink-0" />
                          <span className="text-slate-400">Execution Output:</span>
                          <span>{code.output}</span>
                        </div>
                      )}

                      {code.explanation && (
                        <div className="p-3.5 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                          <Lightbulb size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{code.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3.E: SUBTOPIC QUIZ QUESTIONS */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award size={16} className="text-[#18B6D2]" />
                        <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#182230]">
                          Subtopic Practice Quiz: Knowledge Check
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold text-[#12316B] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        +30 Practice XP
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {exercise.prompt}
                      </p>

                      {/* Options */}
                      <div className="space-y-2">
                        {exercise.options?.map((opt: string, optIdx: number) => {
                          const isSelected = selectedOpt === optIdx;
                          let style = "border-slate-200 bg-white hover:bg-slate-100 text-slate-800";
                          if (hasChecked) {
                            if (optIdx === exercise.correctAnswer) {
                              style = "bg-emerald-50 border-[#16865C] text-[#16865C] font-bold";
                            } else if (isSelected) {
                              style = "bg-rose-50 border-[#C83C4A] text-[#C83C4A]";
                            }
                          } else if (isSelected) {
                            style = "border-[#12316B] bg-blue-50/80 text-[#12316B] font-bold";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                if (!hasChecked) {
                                  setSubtopicSelectedOptions((prev) => ({
                                    ...prev,
                                    [lesson.id]: optIdx,
                                  }));
                                }
                              }}
                              className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${style}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-md border text-[11px] flex items-center justify-center font-mono font-bold">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                              {hasChecked && optIdx === exercise.correctAnswer && (
                                <CheckCircle2 size={16} className="text-[#16865C] flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback */}
                      {hasChecked && (
                        <div
                          className={`p-3.5 rounded-xl text-xs ${
                            isCorrect
                              ? "bg-emerald-50 border border-emerald-200 text-[#16865C]"
                              : "bg-rose-50 border border-rose-200 text-[#C83C4A]"
                          }`}
                        >
                          <p className="font-bold flex items-center gap-1.5">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 size={15} /> Correct! Well done.
                              </>
                            ) : (
                              <>
                                <AlertCircle size={15} /> Not quite right.
                              </>
                            )}
                          </p>
                          <p className="mt-1 text-slate-800">{exercise.explanation}</p>
                        </div>
                      )}

                      {/* Quiz Buttons */}
                      <div className="flex items-center gap-3 pt-1">
                        {!hasChecked ? (
                          <button
                            onClick={() => handleCheckSubtopicAnswer(lesson, exercise)}
                            disabled={selectedOpt === undefined || selectedOpt === null}
                            className="px-4 py-2 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white font-bold text-xs uppercase tracking-wider disabled:opacity-50 transition-colors cursor-pointer"
                          >
                            Check Answer
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSubtopicCheckedAnswers((prev) => ({ ...prev, [lesson.id]: false }));
                              setSubtopicSelectedOptions((prev) => ({ ...prev, [lesson.id]: null }));
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <RotateCcw size={12} />
                            <span>Try Again</span>
                          </button>
                        )}

                        {exercise.hint && !showHint && (
                          <button
                            onClick={() =>
                              setSubtopicShowHints((prev) => ({ ...prev, [lesson.id]: true }))
                            }
                            className="text-xs text-[#64748B] hover:text-[#12316B] font-medium cursor-pointer"
                          >
                            Need a hint?
                          </button>
                        )}
                        {showHint && (
                          <span className="text-xs text-[#18B6D2] italic">
                            Hint: {exercise.hint}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* ──────────────────────────────────────────────────────────
              4. FOURTH: AT THE FINAL BASED ON MAIN TOPIC
                 -> MAIN TOPIC COMPREHENSIVE QUIZ
                 -> MAIN TOPIC FINAL CODING CHALLENGE
             ────────────────────────────────────────────────────────── */}
          <section id="main-topic-final" className="space-y-6 pt-4 scroll-mt-20">
            {/* Final Section Title Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white shadow-xl space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-black text-amber-300 uppercase tracking-wider">
                  <Trophy size={16} />
                  <span>Main Topic Final Assessment &amp; Code</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold border border-white/20">
                  Main Topic {currentModuleIndex + 1} Final
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black font-brand">
                {currentModule?.title}: Final Comprehensive Evaluation
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Validate your end-to-end understanding across all {currentModule?.lessons.length} subtopics.
                First complete the Main Topic Comprehensive Quiz, then solve the practical Main Topic Coding Challenge.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-blue-200">
                <div className="flex items-center gap-1.5">
                  <HelpCircle size={14} className="text-emerald-300" />
                  <span>1. Main Topic Comprehensive Quiz (+150 XP)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Code size={14} className="text-amber-400" />
                  <span>2. Main Topic Final Coding Challenge (+100 XP)</span>
                </div>
              </div>
            </div>

            {/* ── 4.A: MAIN TOPIC FINAL COMPREHENSIVE QUIZ ── */}
            <div className="clean-card p-6 sm:p-8 space-y-6 bg-white rounded-3xl border-2 border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900">
                      Main Topic Comprehensive Final Quiz
                    </h3>
                    <span className="text-xs text-slate-500">
                      Multi-question assessment testing all subtopics in {currentModule?.title}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 self-start sm:self-auto">
                  +150 Assessment XP
                </span>
              </div>

              {/* Questions List */}
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
                          Quiz Question {qIdx + 1} of {mainTopicCapstone.finalQuiz.length}
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
                          let style = "border-slate-200 bg-white hover:bg-slate-100 text-slate-800";
                          if (isSubmitted) {
                            if (optIdx === q.correctAnswer) {
                              style = "bg-emerald-50 border-[#16865C] text-[#16865C] font-bold";
                            } else if (isOptionSelected) {
                              style = "bg-rose-50 border-[#C83C4A] text-[#C83C4A]";
                            }
                          } else if (isOptionSelected) {
                            style = "border-[#12316B] bg-blue-50/80 text-[#12316B] font-bold";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectTopicQuizAnswer(q.id, optIdx)}
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

                      {/* Explanation */}
                      {isSubmitted && (
                        <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-800">
                          <strong>Rationale:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Submit Actions */}
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
                    Submit Main Topic Final Quiz
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
              </div>
            </div>

            {/* ── 4.B: MAIN TOPIC FINAL CODING CHALLENGE ── */}
            <div className="clean-card p-6 sm:p-8 space-y-5 bg-white rounded-3xl border-2 border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#12316B] flex items-center justify-center font-bold">
                    <Code size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900">
                      Main Topic Final Coding Challenge
                    </h3>
                    <span className="text-xs text-slate-500">
                      {mainTopicCapstone.codeChallenge.title}
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

              {/* Acceptance Criteria */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                  Requirements &amp; Acceptance Criteria:
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
                    onClick={() => {
                      navigator.clipboard.writeText(mainTopicCapstone.codeChallenge.starterCode);
                      setCopiedMainStarter(true);
                      setTimeout(() => setCopiedMainStarter(false), 2000);
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedMainStarter ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    <span>{copiedMainStarter ? "Copied" : "Copy Starter Code"}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                  <code>{mainTopicCapstone.codeChallenge.starterCode}</code>
                </pre>
              </div>

              {/* Master Solution Reveal */}
              <div className="pt-2">
                <button
                  onClick={() => setShowMainSolution(!showMainSolution)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-[#12316B] text-[#12316B] text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>{showMainSolution ? "Hide Master Solution" : "Reveal Master Architecture & Solution"}</span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${
                      showMainSolution ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showMainSolution && (
                  <div className="mt-4 p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-cyan-300">
                          Production Reference Solution
                        </span>
                        {mainTopicCapstone.codeChallenge.complexity && (
                          <span className="text-[10px] font-mono text-slate-400">
                            Time: {mainTopicCapstone.codeChallenge.complexity.time} • Space: {mainTopicCapstone.codeChallenge.complexity.space}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(mainTopicCapstone.codeChallenge.solutionCode);
                          setCopiedMainSolution(true);
                          setTimeout(() => setCopiedMainSolution(false), 2000);
                        }}
                        className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedMainSolution ? <Check size={12} className="text-cyan-300" /> : <Copy size={12} />}
                        <span>{copiedMainSolution ? "Copied" : "Copy Solution"}</span>
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

              {/* Mark Code Challenge Solved */}
              <div className="pt-3 flex items-center gap-3">
                <button
                  onClick={handleMarkMainCodeSolved}
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

            {/* Advance to Next Main Topic Button */}
            <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Topic Status
                </span>
                <span className="text-sm font-black text-slate-800">
                  Finished {currentModule?.title}
                </span>
              </div>

              {nextModule ? (
                <button
                  onClick={() => {
                    setActiveModuleId(nextModule.id);
                    setExpandedModules((prev) => ({ ...prev, [nextModule.id]: true }));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#173B70] to-[#12316B] hover:from-[#12316B] hover:to-[#0b69ff] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Proceed to Next Main Topic: {nextModule.title}</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <Link
                  href={`/courses/${course.slug}`}
                  className="px-6 py-3 rounded-xl bg-[#16865C] hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <ShieldCheck size={16} />
                  <span>All Main Topics Completed! View Course Certificate</span>
                </Link>
              )}
            </div>
          </section>
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
