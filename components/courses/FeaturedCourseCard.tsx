"use client";

import Link from "next/link";
import { Course, getCourseLevel } from "@/data/courses";
import { Sparkles, Clock, FileText, ArrowRight, BookOpen, Award } from "lucide-react";

interface FeaturedCourseCardProps {
  course: Course;
}

export default function FeaturedCourseCard({ course }: FeaturedCourseCardProps) {
  const level = getCourseLevel(course);

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-amber-500 fill-amber-500" />
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-brand">
          Featured Course
        </h2>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white via-slate-50/60 to-blue-50/30 border border-[#E2E8F0] shadow-sm relative overflow-hidden transition-all hover:border-[#173B70]/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Thumbnail & Details */}
          <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
            {/* Category Icon Thumbnail */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#173B70]/5 border border-[#173B70]/10 flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0 shadow-2xs">
              {course.icon || "💻"}
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                  <Sparkles size={11} className="fill-amber-500 text-amber-500" />
                  <span>Featured</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                  {course.category}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider border ${level.badgeClass}`}>
                  {level.badgeLabel}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black font-brand text-[#182230] truncate">
                {course.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#64748B] line-clamp-2 leading-relaxed">
                {course.shortDescription}
              </p>

              {/* Meta indicators */}
              <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-[#64748B]">
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-[#0b69ff]" />
                  <span>{course.estimatedDuration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText size={13} className="text-emerald-600" />
                  <span>{course.pdfLessons?.length || 0} PDF Lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award size={13} className="text-amber-500" />
                  <span>+{course.totalXp} XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: CTA Action */}
          <div className="flex sm:flex-row lg:flex-col items-center justify-end gap-2 flex-shrink-0">
            <Link
              href={`/courses/${course.slug}`}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 group cursor-pointer"
            >
              <span>View Course</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
