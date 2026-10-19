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
    <div className="clean-card flex flex-col justify-between overflow-hidden group hover:border-[#173B70]/30 transition-all bg-white rounded-2xl border border-[#E2E8F0] shadow-xs hover:shadow-md">
      <div className="p-5 sm:p-6 space-y-4">
        {/* Top Header: Category Illustration & Access Label */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
              {course.icon || "📘"}
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                {course.category}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider border ${level.badgeClass}`}
                >
                  {level.badgeLabel}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  {course.difficulty}
                </span>
              </div>
            </div>
          </div>

          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
              isPaid
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-emerald-50 text-[#16865C] border-emerald-200"
            }`}
          >
            {priceLabel}
          </span>
        </div>

        {/* Title and Short Description */}
        <div className="space-y-1.5">
          <Link
            href={`/courses/${course.slug}`}
            className="block text-base sm:text-lg font-bold font-brand text-[#182230] group-hover:text-[#173B70] transition-colors leading-snug line-clamp-2"
          >
            {course.title}
          </Link>
          <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Metadata Strip: Modules, Lessons, Duration, Materials */}
        <div className="pt-2 space-y-2 border-t border-slate-100 text-xs text-[#64748B]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5" title="Modules and lessons count">
              <Layers size={13} className="text-[#173B70]" />
              <span className="font-semibold text-slate-700">
                {totalModules} Modules • {totalLessons} Lessons
              </span>
            </div>

            <div className="flex items-center gap-1.5" title="Estimated duration">
              <Clock size={13} className="text-[#0b69ff]" />
              <span>{course.estimatedDuration}</span>
            </div>
          </div>

          {course.pdfLessons && course.pdfLessons.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
              <FileText size={12} className="text-emerald-600" />
              <span>{course.pdfLessons.length} PDF Guides &amp; Notes</span>
            </div>
          )}
        </div>

        {/* Optional Progress Indicator (only if user started course) */}
        {hasStarted && (
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[11px] text-[#64748B]">
              <span className="font-semibold text-slate-700">
                {isCompleted ? "Completed" : "In Progress"}
              </span>
              <span className="font-bold text-[#173B70]">{progress.progressPercentage}%</span>
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
      <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          href={`/courses/${course.slug}`}
          className="flex-1 py-2 px-3 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 group/btn cursor-pointer shadow-2xs"
        >
          <span>
            {isCompleted
              ? "Review Course"
              : hasStarted
              ? "Continue Learning"
              : "Start Learning"}
          </span>
          <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>

        {course.pdfLessons && course.pdfLessons.length > 0 && onOpenQuickRead && (
          <button
            onClick={() => onOpenQuickRead(course)}
            className="py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-[#182230] text-xs font-semibold border border-[#E2E8F0] transition-colors flex items-center gap-1 cursor-pointer"
            title="Read PDF lesson directly"
          >
            <BookOpen size={13} className="text-[#0b69ff]" />
            <span className="hidden sm:inline">Notes</span>
          </button>
        )}
      </div>
    </div>
  );
}

