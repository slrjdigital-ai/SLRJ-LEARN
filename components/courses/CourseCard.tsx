"use client";

import Link from "next/link";
import { Course, getCourseLevel } from "@/data/courses";
import { useCourseDetailedProgress } from "@/lib/courseProgressMetrics";
import { Clock, FileText, ArrowRight, Layers, Check, CheckCircle2 } from "lucide-react";

interface CourseCardProps {
  course: Course;
  onOpenQuickRead?: (course: Course) => void;
}

export default function CourseCard({ course }: CourseCardProps) {
  const detailedProgress = useCourseDetailedProgress(course);
  const level = getCourseLevel(course);

  const totalModules = course.modules?.length || 0;
  const totalLessons =
    course.totalLessons ||
    course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) ||
    course.pdfLessons?.length ||
    0;

  const courseHref = `/courses/${course.slug}`;

  // Circular progress calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius; // ~113.1
  const strokeDashoffset =
    circumference - (circumference * Math.min(100, Math.max(0, detailedProgress.overallPercentage))) / 100;

  return (
    <div className="flex flex-col justify-between overflow-hidden bg-white rounded-2xl border-2 border-slate-200/90 hover:border-[#12316B] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out group cursor-pointer relative">
      {/* ── Top Level Accent Gradient Stripe ── */}
      <div
        className={`h-1.5 w-full transition-all duration-300 group-hover:h-2 ${
          level.id === "basic"
            ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400"
            : level.id === "intermediate"
            ? "bg-gradient-to-r from-[#173B70] via-[#12316B] to-[#18B6D2]"
            : "bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-500"
        }`}
      />

      <div className="p-5 sm:p-6 space-y-4">
        {/* Top Header: Category & Level on Left, Progress Circle on Right */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
              {course.icon || "📘"}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-black text-[#12316B] uppercase tracking-wider block truncate">
                {course.category}
              </span>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-black uppercase tracking-wider border shadow-2xs ${level.badgeClass}`}
                >
                  {level.badgeLabel}
                </span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {course.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* ── Progress Circle (Replaces FREE badge) ── */}
          <div
            className="flex flex-col items-center shrink-0"
            title={`Course Progress: ${detailedProgress.overallPercentage}% (Notes: ${detailedProgress.notesCompleted}/${detailedProgress.totalNotes}, Quizzes: ${detailedProgress.quizzesCompleted}/${detailedProgress.totalQuizzes}, Code: ${detailedProgress.codeCompleted}/${detailedProgress.totalCode})`}
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 44 44">
                {/* Background track circle */}
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  strokeWidth="3.5"
                  fill="transparent"
                  className="stroke-slate-200"
                />
                {/* Animated progress circle */}
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  strokeWidth="3.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className={`transition-all duration-500 ease-out ${
                    detailedProgress.isCompleted
                      ? "stroke-emerald-600"
                      : detailedProgress.overallPercentage > 0
                      ? "stroke-[#12316B]"
                      : "stroke-slate-300"
                  }`}
                />
              </svg>

              {/* Center value */}
              <div className="absolute inset-0 flex items-center justify-center">
                {detailedProgress.isCompleted ? (
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                ) : (
                  <span
                    className={`text-[11px] font-black font-mono ${
                      detailedProgress.overallPercentage > 0 ? "text-[#12316B]" : "text-slate-500"
                    }`}
                  >
                    {detailedProgress.overallPercentage}%
                  </span>
                )}
              </div>
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono mt-0.5">
              Progress
            </span>
          </div>
        </div>

        {/* Title and Short Description - High Contrast & Clear Font */}
        <div className="space-y-1.5">
          <Link
            href={courseHref}
            className="block text-lg sm:text-xl font-black font-brand text-slate-950 group-hover:text-[#12316B] transition-colors duration-200 leading-snug line-clamp-2"
          >
            {course.title}
          </Link>
          <p className="text-sm text-slate-700 group-hover:text-slate-900 line-clamp-2 leading-relaxed transition-colors font-normal">
            {course.shortDescription}
          </p>
        </div>

        {/* Notes, Quizzes & Coding Real-Time Progress Breakdown */}
        <div className="p-2.5 rounded-xl bg-slate-50/90 border border-slate-200 grid grid-cols-3 gap-1.5 text-center text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase text-slate-500 block font-mono">
              Notes
            </span>
            <span className="font-mono font-bold text-slate-900 text-xs">
              {detailedProgress.notesCompleted}/{detailedProgress.totalNotes}
            </span>
          </div>
          <div className="space-y-0.5 border-x border-slate-200">
            <span className="text-[10px] font-black uppercase text-slate-500 block font-mono">
              Quizzes
            </span>
            <span className="font-mono font-bold text-slate-900 text-xs">
              {detailedProgress.quizzesCompleted}/{detailedProgress.totalQuizzes}
            </span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase text-slate-500 block font-mono">
              Coding
            </span>
            <span className="font-mono font-bold text-slate-900 text-xs">
              {detailedProgress.codeCompleted}/{detailedProgress.totalCode}
            </span>
          </div>
        </div>

        {/* Metadata Strip: Modules, Lessons, Duration, Materials */}
        <div className="pt-2 space-y-2 border-t border-slate-100 text-xs text-slate-700">
          <div className="flex items-center justify-between font-semibold">
            <div className="flex items-center gap-1.5 text-slate-900" title="Modules and lessons count">
              <Layers size={15} className="text-[#12316B]" />
              <span className="font-extrabold">
                {totalModules} Modules • {totalLessons} Lessons
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-700" title="Estimated duration">
              <Clock size={15} className="text-[#12316B]" />
              <span className="font-bold">{course.estimatedDuration}</span>
            </div>
          </div>

          {course.pdfLessons && course.pdfLessons.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-lg w-fit">
              <FileText size={13} className="text-emerald-700" />
              <span>{course.pdfLessons.length} PDF Guides &amp; Resources</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <Link
          href={courseHref}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#173B70] to-[#12316B] hover:from-[#12316B] hover:to-[#0b69ff] text-white text-xs sm:text-sm font-black transition-all duration-200 text-center flex items-center justify-center gap-2 group/btn cursor-pointer shadow-xs hover:shadow-md active:scale-98"
        >
          <span>
            {detailedProgress.isCompleted
              ? "Review Course"
              : detailedProgress.hasStarted
              ? "Continue Learning"
              : "Start Learning"}
          </span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}
