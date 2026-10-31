"use client";

import { useState } from "react";
import Link from "next/link";
import { RoadmapStep, getRequiredCoursesForStep, getRelatedProjectsForStep } from "@/data/roadmap";
import { Course, PdfLesson } from "@/data/courses";
import { PracticalProject } from "@/data/projectsData";
import {
  CheckCircle2,
  Clock,
  BookOpen,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  Sparkles,
  Award,
  ArrowRight,
} from "lucide-react";

interface RoadmapStageCardProps {
  step: RoadmapStep;
  stageNumber: number;
  totalStages: number;
  isCompleted: boolean;
  isCurrent: boolean;
  onToggleComplete?: () => void;
  onOpenPdf: (course: Course, lesson: PdfLesson) => void;
  defaultExpanded?: boolean;
}

export default function RoadmapStageCard({
  step,
  stageNumber,
  totalStages,
  isCompleted,
  isCurrent,
  onToggleComplete,
  onOpenPdf,
  defaultExpanded = true,
}: RoadmapStageCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Get real courses and projects linked to this step
  const linkedCourses = getRequiredCoursesForStep(step);
  const linkedProjects = getRelatedProjectsForStep(step);

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 ${
        isCompleted
          ? "bg-white border-emerald-300 shadow-sm"
          : isCurrent
          ? "bg-white border-[#12316B] shadow-md ring-2 ring-[#12316B]/15"
          : "bg-white border-slate-200/90 hover:border-slate-300 shadow-xs"
      }`}
    >
      {/* ─── Card Header / Collapsible Trigger ─── */}
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          {/* Stage Number Badge */}
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-base shrink-0 font-mono transition-colors ${
              isCompleted
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : isCurrent
                ? "bg-[#12316B] text-white shadow-sm"
                : "bg-slate-100 text-slate-800 border border-slate-200"
            }`}
          >
            {isCompleted ? <CheckCircle2 className="w-6 h-6 text-emerald-600" /> : stageNumber}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs sm:text-sm font-extrabold text-[#12316B] uppercase tracking-wider font-mono">
                Stage {stageNumber} of {totalStages}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {step.duration}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              {isCompleted ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  Completed
                </span>
              ) : isCurrent ? (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                  Current Stage
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                  {step.difficulty}
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-950 leading-snug">
              {step.title}
            </h3>
          </div>
        </div>

        {/* Right Header Controls: Collapse Toggle */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse stage" : "Expand stage"}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ─── Expanded Stage Content ─── */}
      {isExpanded && (
        <div className="p-5 sm:p-7 space-y-6 animate-in fade-in duration-150">
          {/* Summary */}
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            {step.summary}
          </p>

          {/* Learning Objectives & Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Learning Objectives */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2.5">
              <span className="text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#12316B]" />
                Curriculum Topics &amp; Modules
              </span>
              <ul className="space-y-2 text-sm text-slate-800 font-medium">
                {(step.learningObjectives && step.learningObjectives.length > 0
                  ? step.learningObjectives
                  : step.keyTopics
                ).map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#12316B] mt-1.5 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Acquired & Milestone */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  Key Skills Mastered
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(step.skills && step.skills.length > 0 ? step.skills : step.keyTopics).map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-white text-slate-800 text-xs sm:text-sm font-semibold border border-slate-200/80 shadow-2xs"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              {step.practicalMilestone && (
                <div className="pt-3 border-t border-slate-200/80">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider block font-mono">
                    Practical Milestone Deliverable
                  </span>
                  <p className="text-sm sm:text-base text-slate-950 font-bold mt-1 leading-snug">
                    {step.practicalMilestone}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ─── Integrated PDF Courses Section ─── */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#12316B]" />
                Full Interactive Course Aligned With This Stage
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-600">
                {linkedCourses.length} course{linkedCourses.length !== 1 ? "s" : ""}
              </span>
            </div>

            {linkedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {linkedCourses.map((course) => {
                  const firstLesson = course.pdfLessons?.[0] || null;

                  return (
                    <div
                      key={course.id}
                      className="flex flex-col justify-between p-4 rounded-xl bg-slate-50/90 hover:bg-white border border-slate-200/90 transition-all shadow-2xs hover:shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
                          <span className="font-extrabold text-[#12316B]">{course.category}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-200/70 text-slate-800">{course.difficulty}</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-slate-950 line-clamp-1 mt-1">
                          {course.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 mt-1 leading-relaxed">
                          {course.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                          <FileText className="w-4 h-4 text-slate-500" />
                          <span>{course.pdfLessons?.length || 0} PDF learning guides</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-slate-200/70">
                        {firstLesson ? (
                          <button
                            type="button"
                            onClick={() => onOpenPdf(course, firstLesson)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#12316B] hover:bg-[#173B70] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Read PDF</span>
                          </button>
                        ) : null}

                        <Link
                          href={`/courses/${course.slug || course.id}`}
                          className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold transition-colors"
                        >
                          <span>View Course</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center">
                <p className="text-sm text-slate-600">
                  Supplementary reading notes and PDF guides for this stage are aligned.
                </p>
              </div>
            )}
          </div>

          {/* ─── Integrated Practical Projects Section ─── */}
          {linkedProjects.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-emerald-600" />
                  Recommended Portfolio Project
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-600">Practical hands-on lab</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {linkedProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 rounded-xl bg-emerald-50/50 border border-emerald-200"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-white text-emerald-900 text-xs font-bold border border-emerald-200">
                          {proj.difficulty}
                        </span>
                        <span className="text-sm sm:text-base font-black text-slate-950">{proj.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 line-clamp-1">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {proj.skillsRequired.slice(0, 4).map((skill: string) => (
                          <span
                            key={skill}
                            className="text-xs text-slate-800 font-semibold px-2 py-0.5 rounded bg-white border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/practice"
                      className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold transition-colors shadow-2xs"
                    >
                      <span>Code Playground</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
