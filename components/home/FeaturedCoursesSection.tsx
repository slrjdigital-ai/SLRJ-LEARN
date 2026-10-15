"use client";

import Link from "next/link";
import { COURSES_DATA } from "@/data/courses";
import { Clock, BookOpen, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function FeaturedCoursesSection() {
  const featuredCourses = COURSES_DATA.slice(0, 6);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#18B6D2] tracking-wider uppercase">
            Curated Curriculum
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-brand text-[#182230] tracking-tight mt-1">
            Featured Courses
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Industry-aligned courses featuring structured modules, handwritten digital notes, and certified assessments.
          </p>
        </div>

        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#12316B] hover:text-[#2456A6] transition-colors group"
        >
          <span>View All Courses</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCourses.map((course) => {
          const difficultyColor =
            course.difficulty === "Beginner"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : course.difficulty === "Intermediate"
              ? "bg-blue-50 text-[#12316B] border-blue-200"
              : "bg-purple-50 text-purple-700 border-purple-200";

          return (
            <div
              key={course.id}
              className="clean-card flex flex-col justify-between overflow-hidden group hover:border-[#12316B]/30 transition-all"
            >
              <div className="p-6 space-y-4">
                {/* Top Badge Strip */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{course.icon || "💻"}</span>
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#18B6D2]/10 text-[#12316B] border border-[#18B6D2]/30 uppercase tracking-wider">
                    100% Free
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-extrabold text-[#182230] group-hover:text-[#12316B] transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-2 line-clamp-3 leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                {/* Key Skills Pills */}
                {course.skillsGained && course.skillsGained.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.skillsGained.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-[#182230]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Meta & Action Bar */}
              <div className="p-4 sm:px-6 bg-[#F7F9FC] border-t border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[#64748B]">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${difficultyColor}`}>
                    {course.difficulty}
                  </span>
                  <div className="flex items-center gap-1 font-medium">
                    <Clock size={13} className="text-[#64748B]" />
                    <span>{course.estimatedDuration}</span>
                  </div>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#12316B] text-white text-xs font-bold hover:bg-[#2456A6] transition-colors shadow-2xs"
                >
                  <span>View Course</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
