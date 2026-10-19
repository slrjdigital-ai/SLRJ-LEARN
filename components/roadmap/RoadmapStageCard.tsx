"use client";

import { useState } from "react";
import Link from "next/link";
import { RoadmapStep, getRequiredCoursesForStep, getRelatedProjectsForStep } from "@/data/roadmap";
import { Course, PdfLesson } from "@/data/courses";
import { PracticalProject } from "@/data/projectsData";
import {
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  Play,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
} from "lucide-react";

interface RoadmapStageCardProps {
  step: RoadmapStep;
  stageNumber: number;
  totalStages: number;
  isCompleted: boolean;
  isCurrent: boolean;
  onToggleComplete: () => void;
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
      className={`rounded-xl border transition-all duration-200 ${
        isCompleted
          ? "bg-white border-emerald-200 shadow-2xs"
          : isCurrent
          ? "bg-white border-[#173B70]/40 shadow-xs ring-1 ring-[#173B70]/10"
          : "bg-white border-slate-200 shadow-2xs"
      }`}
    >
      {/* ─── Card Header / Collapsible Trigger ─── */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          {/* Stage Number Badge */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
              isCompleted
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : isCurrent
                ? "bg-[#173B70] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 border border-slate-200"
            }`}
          >
            {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : stageNumber}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Stage {stageNumber} of {totalStages}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {step.duration}
              </span>
              {isCompleted ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                  Completed
                </span>
              ) : isCurrent ? (
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
                  Current Stage
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 text-[11px] font-medium border border-slate-200">
                  Available
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {step.title}
            </h3>
          </div>
        </div>

        {/* Right Header Controls: Mark Complete & Collapse Toggle */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={onToggleComplete}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isCompleted
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            <CheckCircle2
              className={`w-3.5 h-3.5 ${
                isCompleted ? "text-emerald-600" : "text-slate-400"
              }`}
            />
            <span>{isCompleted ? "Completed" : "Mark Complete"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse stage" : "Expand stage"}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ─── Expanded Stage Content ─── */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-6 animate-in fade-in duration-150">
          {/* Summary */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {step.summary}
          </p>

          {/* Learning Objectives & Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Learning Objectives */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Learning Objectives
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {(step.learningObjectives && step.learningObjectives.length > 0
                  ? step.learningObjectives
                  : step.keyTopics
                ).map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Acquired & Milestone */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  Skills to Acquire
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(step.skills && step.skills.length > 0 ? step.skills : step.keyTopics).map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-white text-slate-700 text-[11px] font-medium border border-slate-200 shadow-2xs"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              {step.practicalMilestone && (
                <div className="pt-2 border-t border-slate-200/60 text-xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Practical Milestone
                  </span>
                  <p className="text-slate-700 font-medium mt-0.5">
                    {step.practicalMilestone}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ─── Integrated PDF Courses Section ─── */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#173B70]" />
                Related Curriculum Courses & PDF Lessons
              </span>
              <span className="text-[11px] text-slate-500">
                {linkedCourses.length} course{linkedCourses.length !== 1 ? "s" : ""} aligned
              </span>
            </div>

            {linkedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {linkedCourses.map((course) => {
                  const firstLesson = course.pdfLessons?.[0] || null;

                  return (
                    <div
                      key={course.id}
                      className="flex flex-col justify-between p-3.5 rounded-xl bg-slate-50/80 hover:bg-white border border-slate-200 transition-all shadow-2xs hover:shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-semibold text-blue-700">{course.category}</span>
                          <span>{course.difficulty}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                          {course.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {course.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span>{course.pdfLessons?.length || 0} PDF learning guides</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-200/60">
                        {firstLesson ? (
                          <button
                            type="button"
                            onClick={() => onOpenPdf(course, firstLesson)}
                            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg bg-[#173B70] hover:bg-[#122e57] text-white text-[11px] font-semibold transition-colors"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Read PDF</span>
                          </button>
                        ) : null}

                        <Link
                          href={`/courses/${course.id}`}
                          className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold transition-colors"
                        >
                          <span>View Course</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center">
                <p className="text-xs text-slate-500">
                  Supplementary reading notes and PDF guides for this specialized stage are being compiled.
                </p>
              </div>
            )}
          </div>

          {/* ─── Integrated Practical Projects Section ─── */}
          {linkedProjects.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderGit2 className="w-4 h-4 text-emerald-600" />
                  Recommended Portfolio Project
                </span>
                <span className="text-[11px] text-slate-500">Practical hands-on lab</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {linkedProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200/70"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-white text-emerald-800 text-[11px] font-bold border border-emerald-200">
                          {proj.difficulty}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {proj.skillsRequired.slice(0, 4).map((skill: string) => (
                          <span
                            key={skill}
                            className="text-[10px] text-slate-600 px-1.5 py-0.5 rounded bg-white border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/projects"
                      className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors shadow-2xs"
                    >
                      <span>View Project Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
