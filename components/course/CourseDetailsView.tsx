"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Course, PdfLesson } from "@/data/courses";
import { useCourseProgress } from "@/lib/courseProgress";
import { useCertificatesManager } from "@/lib/certificateStorage";
import PdfReaderModal from "@/components/courses/PdfReaderModal";
import TopicQuizModal from "@/components/course/TopicQuizModal";
import TopicCodeModal from "@/components/course/TopicCodeModal";
import {
  getTopicQuizQuestions,
  getCombinedQuizQuestions,
  getTopicCodeData,
  getCombinedCodeData,
  QuizQuestionItem,
} from "@/components/course/topicPracticeData";
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  FileText,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  ExternalLink,
  Eye,
  Check,
  ArrowLeft,
  HelpCircle,
  Code2,
  Terminal,
  Trophy,
  AlertTriangle,
  Compass,
  ShieldCheck,
  FolderGit2,
} from "lucide-react";

interface CourseDetailsViewProps {
  course: Course;
}

export default function CourseDetailsView({ course }: CourseDetailsViewProps) {
  const { allProgress, getProgress, recordAccess, toggleCompletion } = useCourseProgress();
  const { certificates } = useCertificatesManager();
  const progress = getProgress(course.id);
  const courseModules = course.modules || [];

  const isCertUnlocked =
    certificates.some((cert) => {
      const cleanCert = cert.sourceId.toLowerCase().replace(/^course-/, "");
      const cleanCourse = course.id.toLowerCase().replace(/^course-/, "");
      const cleanSlug = course.slug.toLowerCase().replace(/^course-/, "");
      return (
        cleanCert === cleanCourse ||
        cleanCert === cleanSlug ||
        course.id.toLowerCase().includes(cert.sourceId.toLowerCase())
      );
    }) || (progress?.progressPercentage || 0) >= 100;

  // PDF Reader Modal state
  const [activePdfLesson, setActivePdfLesson] = useState<PdfLesson | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Topic Quiz Modal state
  const [quizModalState, setQuizModalState] = useState<{
    isOpen: boolean;
    topicTitle: string;
    topicNumber?: number | string;
    questions: QuizQuestionItem[];
    isFinalCombined?: boolean;
  }>({
    isOpen: false,
    topicTitle: "",
    questions: [],
    isFinalCombined: false,
  });

  // Topic Code Modal state
  const [codeModalState, setCodeModalState] = useState<{
    isOpen: boolean;
    topicTitle: string;
    topicNumber?: number | string;
    language: string;
    initialCode: string;
    solutionCode?: string;
    taskDescription?: string;
    expectedOutput?: string;
    explanation?: string;
    isFinalCombined?: boolean;
  }>({
    isOpen: false,
    topicTitle: "",
    language: "c",
    initialCode: "",
    isFinalCombined: false,
  });

  const handleOpenTopicQuiz = (modIdx: number) => {
    const mod = courseModules[modIdx];
    if (!mod) return;
    const questions = getTopicQuizQuestions(course, modIdx);
    setQuizModalState({
      isOpen: true,
      topicTitle: mod.title,
      topicNumber: modIdx + 1,
      questions,
      isFinalCombined: false,
    });
  };

  const handleOpenTopicCode = (modIdx: number) => {
    const mod = courseModules[modIdx];
    if (!mod) return;
    const codeData = getTopicCodeData(course, modIdx);
    setCodeModalState({
      isOpen: true,
      topicTitle: mod.title,
      topicNumber: modIdx + 1,
      language: codeData.language,
      initialCode: codeData.code,
      solutionCode: codeData.solutionCode,
      taskDescription: codeData.taskDescription,
      expectedOutput: codeData.output,
      explanation: codeData.explanation,
      isFinalCombined: false,
    });
  };

  const handleOpenCombinedQuiz = () => {
    const questions = getCombinedQuizQuestions(course);
    setQuizModalState({
      isOpen: true,
      topicTitle: "All Topics Comprehensive Quiz",
      topicNumber: "All",
      questions,
      isFinalCombined: true,
    });
  };

  const handleOpenCombinedCode = () => {
    const codeData = getCombinedCodeData(course);
    setCodeModalState({
      isOpen: true,
      topicTitle: "All Topics Combined Capstone Project",
      topicNumber: "All",
      language: codeData.language,
      initialCode: codeData.code,
      solutionCode: codeData.solutionCode,
      taskDescription: codeData.taskDescription,
      expectedOutput: codeData.output,
      explanation: codeData.explanation,
      isFinalCombined: true,
    });
  };

  const handleOpenPdf = (lesson: PdfLesson) => {
    recordAccess(course, lesson.id, lesson.title);
    setActivePdfLesson(lesson);
    setIsPdfModalOpen(true);
  };

  const handleNavigateLesson = useCallback(
    (direction: "prev" | "next") => {
      if (!activePdfLesson) return;
      const lessons = course.pdfLessons || [];
      const currentIndex = lessons.findIndex((l) => l.id === activePdfLesson.id);
      if (currentIndex === -1) return;

      if (direction === "prev" && currentIndex > 0) {
        setActivePdfLesson(lessons[currentIndex - 1]);
      } else if (direction === "next" && currentIndex < lessons.length - 1) {
        setActivePdfLesson(lessons[currentIndex + 1]);
      }
    },
    [activePdfLesson, course.pdfLessons]
  );

  const activeLessonIndex = activePdfLesson
    ? (course.pdfLessons || []).findIndex((l) => l.id === activePdfLesson.id)
    : -1;
  const hasPrevLesson = activeLessonIndex > 0;
  const hasNextLesson =
    activeLessonIndex >= 0 && activeLessonIndex < (course.pdfLessons || []).length - 1;

  const hasStarted = progress && progress.progressPercentage > 0;

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      {/* ── Breadcrumbs & Back Navigation ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          {/* Back to Courses Menu Button */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-[#173B70] border border-slate-200 text-xs sm:text-sm font-bold transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
            title="Back to Courses Menu"
          >
            <ArrowLeft size={15} className="text-slate-500 group-hover:text-[#173B70] group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back to Courses Menu</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <span className="text-slate-300 hidden sm:inline">|</span>

          {/* Breadcrumb Navigation Bar */}
          <nav aria-label="Breadcrumb navigation" className="flex items-center gap-2 text-xs sm:text-sm text-[#64748B]">
            <Link
              href="/courses"
              className="hover:text-[#173B70] hover:underline transition-colors font-medium cursor-pointer"
            >
              Explore Courses
            </Link>
            <span className="text-slate-400">/</span>
            <Link
              href={`/courses?category=${encodeURIComponent(course.category)}`}
              className="text-[#173B70] hover:text-[#12316B] hover:underline transition-colors font-semibold cursor-pointer"
              title={`View all ${course.category} courses`}
            >
              {course.category}
            </Link>
            <span className="text-slate-400">/</span>
            <span
              className="text-[#182230] font-bold truncate max-w-[180px] sm:max-w-xs md:max-w-md"
              title={course.title}
            >
              {course.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Course Hero Banner ── */}
      <section className="rounded-3xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#18B6D2]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B6D2] text-xs font-bold uppercase tracking-wider">
                {course.category}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 uppercase tracking-wider">
                {course.accessType || "Free Access"}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                +{course.totalXp} XP
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-brand tracking-tight text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl">
              {course.shortDescription}
            </p>

            {/* Quick Meta Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-blue-200">
              <div className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#18B6D2]" />
                <span>{course.estimatedDuration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText size={15} className="text-emerald-300" />
                <span>{course.pdfLessons?.length || 0} PDF Learning Materials</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award size={15} className="text-emerald-300" />
                <span>Verifiable Certificate on Completion</span>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 text-[#182230] shadow-2xl space-y-5 border border-[#E2E8F0]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-[#64748B] uppercase">Tuition</span>
                <span className="text-2xl font-black text-[#16865C]">Free</span>
              </div>

              {/* Progress if started */}
              {hasStarted && (
                <div className="space-y-1.5 p-3 rounded-xl bg-blue-50/70 border border-blue-100">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">Your Progress</span>
                    <strong className="text-[#173B70]">{progress.progressPercentage}%</strong>
                  </div>
                  <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#173B70] rounded-full transition-all"
                      style={{ width: `${progress.progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2.5 text-xs text-[#64748B]">
                <div className="flex items-center justify-between">
                  <span>Difficulty:</span>
                  <strong className="text-[#182230]">{course.difficulty}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>PDF Materials:</span>
                  <strong className="text-[#182230]">{course.pdfLessons?.length || 0} Lessons</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Certificate:</span>
                  <strong className="text-[#173B70]">Verified (QR-Linked)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Access:</span>
                  <strong className="text-[#16865C]">100% Free</strong>
                </div>
              </div>

              {/* Certificate Unlock Status */}
              {isCertUnlocked ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <Award size={15} className="text-emerald-600 shrink-0" />
                    <span>Certificate Unlocked!</span>
                  </span>
                  <Link
                    href="/certificates"
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>View</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
                  <Award size={14} className="text-amber-500 shrink-0" />
                  <span>Complete final evaluation below to unlock certificate</span>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ── Main Details (Full Width) ── */}
      <div className="space-y-8">
          {/* PDF Curriculum Lessons Section */}
          <section className="clean-card p-6 sm:p-8 space-y-5 bg-white rounded-2xl border border-[#E2E8F0]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-extrabold text-[#182230] font-brand flex items-center gap-2">
                  <FileText size={18} className="text-[#0b69ff]" />
                  <span>PDF Learning Materials & Lessons</span>
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Follow the structured curriculum in its intended learning order. Read inline with our interactive viewer.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#173B70] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 self-start sm:self-auto">
                {course.pdfLessons?.length || 0} PDF Lessons
              </span>
            </div>

            <div className="space-y-3">
              {(course.pdfLessons || []).map((pdf, idx) => {
                const isLessonDone = progress?.completedPdfLessonIds.includes(pdf.id) ?? false;

                return (
                  <div
                    key={pdf.id}
                    className="p-4 rounded-xl border border-[#E2E8F0] hover:border-[#173B70]/40 transition-all bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center font-bold text-xs text-[#173B70] flex-shrink-0 shadow-2xs">
                        {idx + 1}
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            {pdf.moduleTitle}
                          </span>
                          <span className="text-[10px] text-slate-400">•</span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {pdf.pageCount} Pages • {pdf.fileSize}
                          </span>
                          {isLessonDone && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#16865C] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <Check size={11} />
                              <span>Completed</span>
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-sm text-[#182230] truncate">
                          {pdf.title}
                        </h3>

                        <p className="text-xs text-[#64748B] line-clamp-1">
                          {pdf.description}
                        </p>
                      </div>
                    </div>

                    {/* Action: Read PDF */}
                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                      <button
                        onClick={() => handleOpenPdf(pdf)}
                        className="px-3 py-1.5 rounded-lg bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                        title="Read PDF in viewer"
                      >
                        <Eye size={13} />
                        <span>Read PDF</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="clean-card p-6 sm:p-8 space-y-4 bg-white rounded-2xl border border-[#E2E8F0]">
            <h2 className="text-lg font-extrabold text-[#182230] font-brand flex items-center gap-2">
              <Sparkles size={18} className="text-[#18B6D2]" />
              <span>Skills & Outcomes You Will Gain</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(course.skills || course.skillsGained).map((skill, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#182230]">
                  <CheckCircle2 size={16} className="text-[#16865C] flex-shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Topic Curriculum with Quiz & Code Practice ─── */}
          <section className="clean-card p-6 sm:p-8 space-y-6 bg-white rounded-2xl border border-[#E2E8F0]">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#173B70] text-xs font-bold uppercase tracking-wider">
                  <Layers size={14} className="text-[#18B6D2]" />
                  <span>Course Curriculum & Hands-On Practice</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#182230] font-brand">
                  Topics, Quizzes & In-Browser Code
                </h2>
                <p className="text-xs text-[#64748B]">
                  {courseModules.length} Core Topics • Test your mastery with topic-level quizzes and live code sandboxes.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-semibold text-[#173B70] bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
                  {courseModules.length} Topics
                </span>
              </div>
            </div>

            {/* Individual Topic Cards */}
            <div className="space-y-3.5">
              {courseModules.map((mod, modIdx) => {
                return (
                  <div
                    key={mod.id}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-[#173B70]/40 transition-all bg-[#F8FAFC] flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-2xs hover:shadow-xs group"
                  >
                    {/* Left: Topic Title & Meta */}
                    <div className="flex items-start gap-3.5 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-[#173B70] font-black text-sm flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:bg-[#173B70] group-hover:text-white transition-colors">
                        {modIdx + 1}
                      </div>

                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Topic {modIdx + 1}
                          </span>
                          <span className="text-[10px] text-slate-400">•</span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {mod.lessons.length} {mod.lessons.length === 1 ? "Lesson" : "Lessons"}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-base text-[#182230] leading-snug">
                          {mod.title}
                        </h3>

                        <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                          {mod.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Topic Action Buttons (Quiz & Code) */}
                    <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                      {/* Topic Quiz Button */}
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => handleOpenTopicQuiz(modIdx)}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#173B70] border border-blue-200 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs cursor-pointer group/btn"
                        title={`Take quiz for ${mod.title}`}
                      >
                        <HelpCircle size={15} className="text-[#173B70] group-hover/btn:scale-110 transition-transform" />
                        <span>Quiz</span>
                      </button>

                      {/* Topic Code Button */}
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => handleOpenTopicCode(modIdx)}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs cursor-pointer group/code"
                        title={`Open code playground for ${mod.title}`}
                      >
                        <Code2 size={15} className="text-[#18B6D2] group-hover/code:scale-110 transition-transform" />
                        <span>Code</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ─── Final Combined Topics Section (Quiz & Code for all topics) ─── */}
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white p-6 sm:p-7 shadow-xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#18B6D2]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[#18B6D2] text-[10px] font-black uppercase tracking-wider">
                      All Topics Combined
                    </span>
                    <span className="text-blue-200 text-xs">•</span>
                    <span className="text-amber-300 text-xs font-bold flex items-center gap-1">
                      <Trophy size={13} />
                      <span>Comprehensive Mastery</span>
                    </span>
                    {isCertUnlocked && (
                      <>
                        <span className="text-blue-200 text-xs">•</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                          <Check size={12} />
                          <span>Certificate Unlocked</span>
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-black font-brand text-white leading-tight">
                    Final Combined Evaluation & Capstone Code
                  </h3>

                  <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                    Integrate everything you learned across all {courseModules.length} topics. Take the comprehensive full-course quiz to certify your skills, and run the complete multi-topic capstone code project.
                  </p>
                </div>

                {/* Final Combined Buttons */}
                <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap flex-shrink-0">
                  {/* Combined Quiz Button */}
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={handleOpenCombinedQuiz}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-blue-50 text-[#12316B] text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer group"
                    title="Take comprehensive quiz covering all topics"
                  >
                    <Award size={16} className="text-[#173B70] group-hover:scale-110 transition-transform" />
                    <span>Final Quiz (All Topics)</span>
                  </button>

                  {/* Combined Code Button */}
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={handleOpenCombinedCode}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#18B6D2] hover:bg-[#159eb7] text-[#090F21] text-xs sm:text-sm font-black transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer group"
                    title="Run capstone code combining all topics"
                  >
                    <Terminal size={16} className="text-[#090F21] group-hover:scale-110 transition-transform" />
                    <span>Final Code (All Topics)</span>
                  </button>

                  {/* Certificate Link if unlocked */}
                  {isCertUnlocked && (
                    <Link
                      href="/certificates"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs sm:text-sm font-black transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      title="View your unlocked certificate"
                    >
                      <Award size={16} />
                      <span>View Certificate</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
      </div>

      {/* Accessible In-App PDF Reader Modal */}
      {activePdfLesson && (
        <PdfReaderModal
          course={course}
          lesson={activePdfLesson}
          isOpen={isPdfModalOpen}
          onClose={() => {
            setIsPdfModalOpen(false);
            setActivePdfLesson(null);
          }}
          onNavigateLesson={handleNavigateLesson}
          hasPrev={hasPrevLesson}
          hasNext={hasNextLesson}
        />
      )}

      {/* ── Topic Quiz Modal ── */}
      <TopicQuizModal
        isOpen={quizModalState.isOpen}
        onClose={() => setQuizModalState((prev) => ({ ...prev, isOpen: false }))}
        topicTitle={quizModalState.topicTitle}
        topicNumber={quizModalState.topicNumber}
        courseTitle={course.title}
        courseSlug={course.slug}
        questions={quizModalState.questions}
        isFinalCombined={quizModalState.isFinalCombined}
      />

      {/* ── Topic Code Modal ── */}
      <TopicCodeModal
        isOpen={codeModalState.isOpen}
        onClose={() => setCodeModalState((prev) => ({ ...prev, isOpen: false }))}
        topicTitle={codeModalState.topicTitle}
        topicNumber={codeModalState.topicNumber}
        courseTitle={course.title}
        courseSlug={course.slug}
        language={codeModalState.language}
        initialCode={codeModalState.initialCode}
        solutionCode={codeModalState.solutionCode}
        taskDescription={codeModalState.taskDescription}
        expectedOutput={codeModalState.expectedOutput}
        explanation={codeModalState.explanation}
        isFinalCombined={codeModalState.isFinalCombined}
      />
    </div>
  );
}
