"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Course, PdfLesson } from "@/data/courses";
import { useCourseProgress } from "@/lib/courseProgress";
import PdfReaderModal from "@/components/courses/PdfReaderModal";
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  Layers,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Download,
  Eye,
  Check,
} from "lucide-react";

interface CourseDetailsViewProps {
  course: Course;
}

export default function CourseDetailsView({ course }: CourseDetailsViewProps) {
  const { getProgress, recordAccess, toggleCompletion } = useCourseProgress();
  const progress = getProgress(course.id);

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.modules[0]?.id || ""]: true,
  });

  // PDF Reader Modal state
  const [activePdfLesson, setActivePdfLesson] = useState<PdfLesson | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
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
      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <Link href="/courses" className="hover:text-[#173B70] transition-colors font-semibold">
          Explore Courses
        </Link>
        <span>/</span>
        <span className="text-[#173B70] font-semibold">{course.category}</span>
        <span>/</span>
        <span className="text-[#182230] font-bold truncate max-w-xs">{course.title}</span>
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
                  Follow the structured curriculum in its intended learning order. Read inline or download for offline study.
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

                    {/* Actions: Read PDF & Download */}
                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                      <button
                        onClick={() => handleOpenPdf(pdf)}
                        className="px-3 py-1.5 rounded-lg bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                        title="Read PDF in viewer"
                      >
                        <Eye size={13} />
                        <span>Read PDF</span>
                      </button>

                      {pdf.downloadAllowed && (
                        <a
                          href={pdf.fileUrl}
                          download
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-[#E2E8F0] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="Download PDF file"
                        >
                          <Download size={13} />
                          <span className="hidden sm:inline">Download</span>
                        </a>
                      )}
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

          {/* Interactive Modules Curriculum */}
          <section className="clean-card p-6 sm:p-8 space-y-5 bg-white rounded-2xl border border-[#E2E8F0]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-[#182230] font-brand flex items-center gap-2">
                  <Layers size={18} className="text-[#173B70]" />
                  <span>Interactive Curriculum Modules</span>
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  {course.modules.length} Modules • {course.totalLessons} Lessons with In-Browser Exercises
                </p>
              </div>

              <button
                onClick={() => {
                  const allExpanded = Object.keys(expandedModules).length === course.modules.length;
                  if (allExpanded) {
                    setExpandedModules({});
                  } else {
                    const all: Record<string, boolean> = {};
                    course.modules.forEach((m) => (all[m.id] = true));
                    setExpandedModules(all);
                  }
                }}
                className="text-xs font-bold text-[#173B70] hover:underline cursor-pointer"
              >
                Toggle All
              </button>
            </div>

            <div className="space-y-3">
              {course.modules.map((mod, modIdx) => {
                const isOpen = !!expandedModules[mod.id];
                return (
                  <div
                    key={mod.id}
                    className="rounded-xl border border-[#E2E8F0] overflow-hidden transition-all bg-[#F8FAFC]"
                  >
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center font-bold text-xs text-[#173B70]">
                          {modIdx + 1}
                        </span>
                        <div>
                          <h3 className="font-bold text-sm text-[#182230]">{mod.title}</h3>
                          <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">{mod.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#64748B] font-medium hidden sm:inline">
                          {mod.lessons.length} Lessons
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-[#64748B] transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-3 divide-y divide-slate-100 bg-white">
                        {mod.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="py-3 flex items-center justify-between text-xs text-slate-700"
                          >
                            <div className="flex items-center gap-3">
                              <BookOpen size={14} className="text-slate-400" />
                              <span className="font-semibold text-[#182230]">
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[#64748B]">
                              <span>{lesson.duration}</span>
                              <span className="text-[10px] font-bold text-[#18B6D2]">+{lesson.xpReward} XP</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
      </div>

      {/* ── Bottom Horizontal Section: Final Assessment, Prerequisites & Academic Authority ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
        {/* Final Assessment & Certificate Eligibility */}
        <div className="clean-card p-6 space-y-4 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 rounded-2xl border border-blue-200/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#173B70] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                <Award size={18} />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#182230] font-brand">
                  Final Assessment
                </h3>
                <span className="text-[11px] font-semibold text-emerald-700">
                  Certificate Eligible
                </span>
              </div>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Complete the rigorous 10-question evaluation with an 80%+ score to earn your verified SLRJ Learn credential with verifiable QR code.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200/60 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Passing Criteria:</span>
                <strong className="text-[#173B70] font-bold">80% or Higher</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Time Allowed:</span>
                <strong className="text-slate-800 font-bold">20 Minutes</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Assessment Format:</span>
                <strong className="text-slate-800 font-bold">Server-Evaluated MCQ</strong>
              </div>
            </div>
          </div>

          <Link
            href={`/dashboard/assessments/${course.slug}`}
            className="w-full py-2.5 px-4 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-2"
          >
            <span>Take Final Assessment</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Prerequisites */}
        <div className="clean-card p-6 space-y-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col">
          <h3 className="font-extrabold text-sm text-[#182230] font-brand flex items-center gap-2">
            <GraduationCap size={16} className="text-[#173B70]" />
            <span>Prerequisites</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-[#64748B] pt-1">
            {course.prerequisites.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Academic Authority */}
        <div className="clean-card p-6 space-y-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-[#182230] font-brand flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#16865C]" />
              <span>Academic Authority</span>
            </h3>
            <div className="space-y-1">
              <div className="font-bold text-xs text-[#182230]">SLRJ Learn Academic Team</div>
              <div className="text-xs text-[#64748B]">Curated by Kouluri Shahid & Engineering Mentors</div>
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed pt-1">
              Curriculum engineered adhering to modern industry standards, clear architectural patterns, and verified assessments.
            </p>
          </div>
        </div>
      </section>

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
    </div>
  );
}
