"use client";

import Link from "next/link";
import { useCourseProgress, LearnerCourseProgress } from "@/lib/courseProgress";
import { PlayCircle, Clock, BookOpen, ChevronRight, CheckCircle2 } from "lucide-react";

interface ContinueLearningSectionProps {
  onSelectCourseToResume?: (courseSlug: string, lessonId?: string) => void;
}

export default function ContinueLearningSection({
  onSelectCourseToResume,
}: ContinueLearningSectionProps) {
  const { isLoaded, activeCourses } = useCourseProgress();

  if (!isLoaded) return null;

  // If user hasn't started any courses, hide or show a gentle empty state
  if (activeCourses.length === 0) {
    return (
      <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0b69ff] flex items-center justify-center flex-shrink-0">
            <BookOpen size={18} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#182230]">Ready to start learning?</h3>
            <p className="text-[11px] text-[#64748B]">
              Browse the catalog below, open any course, and start reading your first PDF lesson.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-[#173B70] hidden sm:inline">
          0 Courses In Progress
        </span>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16865C] animate-pulse" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-brand">
            Continue Learning
          </h2>
        </div>
        <span className="text-xs text-[#64748B]">
          {activeCourses.length} {activeCourses.length === 1 ? "course" : "courses"} in progress
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeCourses.map((progress) => (
          <div
            key={progress.courseId}
            className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between space-y-3 hover:border-[#173B70]/30 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-[10px] text-[#64748B] mb-1 font-bold uppercase tracking-wider">
                <span>{progress.category}</span>
                <span className="text-[#16865C] font-semibold flex items-center gap-1">
                  <CheckCircle2 size={11} />
                  <span>
                    {progress.completedPdfLessonIds.length}/{progress.totalPdfLessons} Completed
                  </span>
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#182230] truncate font-brand mb-1">
                {progress.courseTitle}
              </h3>

              <p className="text-xs text-[#64748B] truncate">
                Next: <strong className="text-slate-700 font-semibold">{progress.currentLessonTitle || "Next Lesson"}</strong>
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-[#64748B]">
                <span>Progress</span>
                <span className="font-bold text-[#173B70]">{progress.progressPercentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#18B6D2] to-[#173B70] rounded-full transition-all duration-300"
                  style={{ width: `${progress.progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Resume Action */}
            <Link
              href={`/courses/${progress.courseSlug}`}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-[#173B70] text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PlayCircle size={14} className="text-[#0b69ff]" />
              <span>Continue Learning</span>
              <ChevronRight size={13} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
