"use client";

import Link from "next/link";
import { Course, getCourseLevel } from "@/data/courses";
import { useCourseProgress } from "@/lib/courseProgress";
import { Clock, FileText, ArrowRight, BookOpen, Layers } from "lucide-react";

interface CourseCardProps {
  course: Course;
  onOpenQuickRead?: (course: Course) => void;
}

export default function CourseCard({ course, onOpenQuickRead }: CourseCardProps) {
  const { getProgress } = useCourseProgress();
  const progress = getProgress(course.id);

  const hasStarted = progress && progress.progressPercentage > 0;
  const isCompleted = progress && progress.progressPercentage >= 100;
  const level = getCourseLevel(course);

  const totalModules = course.modules?.length || 0;
  const totalLessons =
    course.totalLessons ||
    course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) ||
    course.pdfLessons?.length ||
    0;

  const isPaid = course.isPaid || course.accessType === "Premium";
  const priceLabel = isPaid ? (course.price ? `$${course.price}` : "Paid") : "Free";

  return (
    <div className="flex flex-col justify-between overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xl hover:border-slate-300/90 hover:-translate-y-1.5 transition-all duration-300 ease-out group cursor-pointer relative">
      {/* ── Top Level Accent Gradient Stripe ── */}
      <div
        className={`h-1 w-full transition-all duration-300 group-hover:h-1.5 ${
          level.id === "basic"
            ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400"
            : level.id === "intermediate"
            ? "bg-gradient-to-r from-[#173B70] via-[#12316B] to-[#18B6D2]"
            : "bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-500"
        }`}
      />

      <div className="p-5 sm:p-6 space-y-4">
        {/* Top Header: Category Illustration & Access Label */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/90 border border-slate-200/90 flex items-center justify-center text-2xl flex-shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md transition-all duration-300">
              {course.icon || "📘"}
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block group-hover:text-[#12316B] transition-colors">
                {course.category}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border shadow-2xs ${level.badgeClass}`}
                >
                  {level.badgeLabel}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {course.difficulty}
                </span>
              </div>
            </div>
          </div>

          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-2xs transition-colors ${
              isPaid
                ? "bg-amber-50 text-amber-700 border-amber-200 group-hover:bg-amber-100/80"
                : "bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-100/80"
            }`}
          >
            {priceLabel}
          </span>
        </div>

        {/* Title and Short Description */}
        <div className="space-y-1.5">
          <Link
            href={`/courses/${course.slug}`}
            className="block text-base sm:text-lg font-black font-brand text-[#182230] group-hover:text-[#0b69ff] transition-colors duration-200 leading-snug line-clamp-2"
          >
            {course.title}
          </Link>
          <p className="text-xs text-slate-500 group-hover:text-slate-600 line-clamp-2 leading-relaxed transition-colors">
            {course.shortDescription}
          </p>
        </div>

        {/* Metadata Strip: Modules, Lessons, Duration, Materials */}
        <div className="pt-2 space-y-2 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5" title="Modules and lessons count">
              <Layers size={13.5} className="text-[#12316B] group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-700">
                {totalModules} Modules • {totalLessons} Lessons
              </span>
            </div>

            <div className="flex items-center gap-1.5" title="Estimated duration">
              <Clock size={13.5} className="text-[#0b69ff] group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-medium text-slate-600">{course.estimatedDuration}</span>
            </div>
          </div>

          {course.pdfLessons && course.pdfLessons.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50/70 border border-emerald-200/60 px-2.5 py-1 rounded-lg w-fit group-hover:bg-emerald-100/80 group-hover:border-emerald-300 transition-all">
              <FileText size={12} className="text-emerald-600" />
              <span>{course.pdfLessons.length} PDF Guides &amp; Notes</span>
            </div>
          )}
        </div>

        {/* Optional Progress Indicator (only if user started course) */}
        {hasStarted && (
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[11px] text-slate-500">
              <span className="font-bold text-slate-700">
                {isCompleted ? "Completed" : "In Progress"}
              </span>
              <span className="font-extrabold text-[#173B70]">{progress.progressPercentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#16865C]"
                    : "bg-gradient-to-r from-[#18B6D2] to-[#173B70]"
                }`}
                style={{ width: `${progress.progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2.5">
        <Link
          href={`/courses/${course.slug}`}
          className="flex-1 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#173B70] to-[#12316B] hover:from-[#12316B] hover:to-[#0b69ff] text-white text-xs font-black transition-all duration-200 text-center flex items-center justify-center gap-1.5 group/btn cursor-pointer shadow-xs hover:shadow-md active:scale-95"
        >
          <span>
            {isCompleted
              ? "Review Course"
              : hasStarted
              ? "Continue Learning"
              : "Start Learning"}
          </span>
          <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Link>

        {course.pdfLessons && course.pdfLessons.length > 0 && onOpenQuickRead && (
          <button
            onClick={() => onOpenQuickRead(course)}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-blue-50/80 text-slate-700 hover:text-[#12316B] text-xs font-bold border border-slate-200 hover:border-blue-200 transition-all flex items-center gap-1.5 group/notes cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
            title="Read PDF lesson notes directly"
          >
            <BookOpen size={13} className="text-[#0b69ff] group-hover/notes:scale-110 transition-transform duration-200" />
            <span className="hidden sm:inline font-bold">Notes</span>
          </button>
        )}
      </div>
    </div>
  );
}

