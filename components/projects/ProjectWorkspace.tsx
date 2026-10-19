"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PracticalProject, ProjectMilestone, ProjectTask } from "@/data/projectsData";
import { useProjectProgress, usePortfolio } from "@/lib/projectProgress";
import { getCourseById, Course, PdfLesson } from "@/data/courses";
import { getTrackById } from "@/data/roadmap";
import PdfReaderModal from "@/components/courses/PdfReaderModal";
import {
  ArrowLeft,
  Clock,
  Award,
  Compass,
  Code2,
  Terminal,
  Bookmark,
  BookmarkCheck,
  Play,
  CheckCircle2,
  Send,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  BookOpen,
  Sparkles,
  Wrench,
  Check,
  AlertCircle,
  Share2,
  Globe,
  Upload,
} from "lucide-react";

interface ProjectWorkspaceProps {
  project: PracticalProject;
}

export default function ProjectWorkspace({ project }: ProjectWorkspaceProps) {
  const {
    getRecord,
    startOrContinue,
    toggleSave,
    toggleTask,
    submitDeliverables,
    markComplete,
  } = useProjectProgress();

  const { portfolio, toggleProjectSelection } = usePortfolio();

  const record = getRecord(project.id);
  const isSaved = record?.status === "Saved";
  const isStarted = record && (record.status === "In Progress" || record.completedTaskIds?.length > 0);
  const isCompleted = record?.status === "Completed";
  const isSubmitted = record?.status === "Submitted";

  // Calculate task counts and percent
  const allTasks: ProjectTask[] = project.milestones?.flatMap((m) => m.tasks) || [];
  const totalTasksCount = allTasks.length;
  const completedTaskIds = record?.completedTaskIds || [];
  const completedCount = completedTaskIds.length;
  const percent = totalTasksCount > 0 ? Math.round((completedCount / totalTasksCount) * 100) : (isCompleted ? 100 : 0);

  // Submission Form State
  const [repoUrl, setRepoUrl] = useState(record?.submission?.repositoryUrl || "");
  const [demoUrl, setDemoUrl] = useState(record?.submission?.liveDemoUrl || "");
  const [submissionNotes, setSubmissionNotes] = useState(record?.submission?.description || "");
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // PDF Reader Modal State
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<PdfLesson | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Expanded Milestones state
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    project.milestones?.forEach((m, idx) => {
      initial[m.id] = idx === 0 || idx === 1;
    });
    return initial;
  });

  const toggleMilestone = (mId: string) => {
    setExpandedMilestones((prev) => ({ ...prev, [mId]: !prev[mId] }));
  };

  const handleStart = () => {
    startOrContinue(project.id);
  };

  const handleToggleTask = (taskId: string) => {
    toggleTask(project.id, taskId, totalTasksCount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!repoUrl.trim()) {
      setSubmissionError("Please provide a valid GitHub, GitLab, or source repository URL.");
      return;
    }

    try {
      new URL(repoUrl.trim());
      if (demoUrl.trim()) new URL(demoUrl.trim());
    } catch {
      setSubmissionError("Please enter valid full URLs including http:// or https://");
      return;
    }

    submitDeliverables(project.id, {
      repositoryUrl: repoUrl,
      liveDemoUrl: demoUrl,
      description: submissionNotes,
    });

    setSubmissionFeedback("Project submitted successfully! It is now recorded in your active submissions.");
    setTimeout(() => setSubmissionFeedback(null), 5000);
  };

  const handleOpenPdf = (courseId: string) => {
    const c = getCourseById(courseId);
    if (c && c.pdfLessons && c.pdfLessons.length > 0) {
      setActiveCourse(c);
      setActiveLesson(c.pdfLessons[0]);
      setIsPdfModalOpen(true);
    }
  };

  const primaryRoadmap = project.roadmapIds[0] ? getTrackById(project.roadmapIds[0]) : null;
  const isShowcasedInPortfolio = portfolio.selectedProjectIds?.includes(project.id);

  return (
    <div className="space-y-8 sm:space-y-10 pb-16">
      {/* ─── Top Breadcrumbs Navigation ─── */}
      <div className="flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#173B70] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        <div className="flex items-center gap-2">
          {primaryRoadmap && (
            <Link
              href={`/roadmap/${primaryRoadmap.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>View {primaryRoadmap.name} Roadmap</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => toggleSave(project.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save Project</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─── Hero Overview Card ─── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/50 border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-50 text-[#173B70] border border-blue-200/70 text-xs font-semibold">
                {project.category}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                Level: {project.difficulty}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/70 text-xs font-semibold">
                +{project.xpReward} XP Reward
              </span>
              {primaryRoadmap && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                  <Compass className="w-3 h-3" />
                  <span>{primaryRoadmap.name} Track</span>
                </span>
              )}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-brand">
                {project.title}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2">
                {project.description}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 pt-2">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#173B70]" />
                <span>Estimated Effort: {project.estimatedTime}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#173B70]" />
                <span>{project.milestones?.length || 0} Structured Milestones</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5 font-medium">
                <Terminal className="w-4 h-4 text-[#173B70]" />
                <span>Sandbox: {project.starterTemplateId ? project.starterTemplateId.toUpperCase() : "Configured"}</span>
              </div>
            </div>

            {/* Prerequisites */}
            {project.prerequisites && project.prerequisites.length > 0 && (
              <div className="text-xs text-slate-500 pt-1">
                <span className="font-semibold text-slate-700">Recommended Prerequisites: </span>
                {project.prerequisites.join(" • ")}
              </div>
            )}
          </div>

          {/* Right Column: Progress Card & Playground Action */}
          <div className="w-full lg:w-80 rounded-xl bg-white border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Project Status
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#173B70]">
                {record?.status || "Not Started"}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">Task Completion</span>
                <span className={isCompleted ? "text-emerald-700" : "text-[#173B70]"}>
                  {percent}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isCompleted ? "bg-emerald-500" : "bg-[#173B70]"
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{completedCount} of {totalTasksCount} tasks done</span>
                <span>{totalTasksCount - completedCount} remaining</span>
              </div>
            </div>

            {/* Primary Action Button */}
            {!isStarted ? (
              <button
                type="button"
                onClick={handleStart}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#173B70] hover:bg-[#122e57] text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Start Project Workspace</span>
              </button>
            ) : (
              <div className="space-y-2">
                <Link
                  href={`/practice?project=${project.slug}&template=${project.starterTemplateId || "web"}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-[0.98]"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Open in Playground</span>
                </Link>

                {isCompleted && (
                  <button
                    type="button"
                    onClick={() => toggleProjectSelection(project.id)}
                    className={`w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      isShowcasedInPortfolio
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-purple-600" />
                    <span>{isShowcasedInPortfolio ? "Showcased in Portfolio" : "Add to My Portfolio"}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Skills & Tools Footer */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 space-y-3">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Core Skills Practiced
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.skillsRequired.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md bg-white text-slate-700 text-xs font-medium border border-slate-200 shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {project.tools && project.tools.length > 0 && (
            <div className="text-xs text-slate-500 flex items-center gap-2 pt-1">
              <Wrench className="w-3.5 h-3.5 text-slate-400" />
              <span>Recommended Tooling: <strong>{project.tools.join(" • ")}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* ─── Problem Statement & Expected Results ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Problem Statement & Objectives</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {project.problemStatement.goal}
          </p>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 block">Target Audience:</span>
            <span>{project.problemStatement.targetUsers}</span>
          </div>

          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Functional Requirements:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {project.problemStatement.functionalRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Acceptance Criteria & Deliverables</span>
          </h2>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Acceptance Criteria:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {project.problemStatement.acceptanceCriteria.map((crit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{crit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Expected Deliverables:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.deliverables?.map((deliv, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200"
                >
                  {deliv}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-blue-900 space-y-0.5 mt-2">
            <span className="font-bold block">Expected Outcome:</span>
            <span>{project.problemStatement.expectedResult}</span>
          </div>
        </div>
      </div>

      {/* ─── Step-by-Step Implementation Milestones & Tasks ─── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-brand">
              Step-by-Step Implementation Plan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Check off each task as you complete it. Progress is saved automatically in your browser profile.
            </p>
          </div>

          <span className="text-xs font-bold text-blue-700">
            {completedCount} / {totalTasksCount} Tasks Completed
          </span>
        </div>

        <div className="space-y-4">
          {project.milestones?.map((milestone, idx) => {
            const isExpanded = expandedMilestones[milestone.id] ?? true;
            const milestoneDone = milestone.tasks.every((t) => completedTaskIds.includes(t.id));

            return (
              <div
                key={milestone.id}
                className={`rounded-xl border transition-all ${
                  milestoneDone
                    ? "bg-white border-emerald-200 shadow-2xs"
                    : "bg-white border-slate-200 shadow-2xs"
                }`}
              >
                {/* Milestone Header */}
                <div
                  onClick={() => toggleMilestone(milestone.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        milestoneDone
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {milestoneDone ? <Check className="w-4 h-4 text-emerald-700" /> : idx + 1}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {milestone.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 hidden sm:inline-block">
                      {milestone.tasks.length} task{milestone.tasks.length !== 1 ? "s" : ""}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Milestone Tasks */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 space-y-3 border-t border-slate-100">
                    {milestone.tasks.map((task) => {
                      const isTaskDone = completedTaskIds.includes(task.id);

                      return (
                        <div
                          key={task.id}
                          className={`flex items-start justify-between gap-3 p-3.5 rounded-lg border transition-all ${
                            isTaskDone
                              ? "bg-emerald-50/40 border-emerald-200 text-slate-700"
                              : "bg-slate-50/60 border-slate-200 hover:bg-white"
                          }`}
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <input
                              type="checkbox"
                              checked={isTaskDone}
                              onChange={() => handleToggleTask(task.id)}
                              className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <div className="min-w-0">
                              <h4
                                className={`text-xs sm:text-sm font-bold ${
                                  isTaskDone ? "line-through text-slate-500" : "text-slate-900"
                                }`}
                              >
                                {task.title}
                              </h4>
                              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                                {task.instructions}
                              </p>
                              {task.acceptanceCriteria && (
                                <p className="text-[11px] text-slate-500 mt-1">
                                  <strong>Criteria: </strong> {task.acceptanceCriteria}
                                </p>
                              )}
                            </div>
                          </div>

                          <span className="shrink-0 text-[11px] font-mono text-slate-400">
                            ~{task.estimatedMinutes}m
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Resources & PDF Handbooks Section ─── */}
      {project.relatedCourseIds && project.relatedCourseIds.length > 0 && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#173B70]" />
              <span>Related Curriculum Courses & PDF Lessons</span>
            </h3>
            <span className="text-xs text-slate-500">Explore Courses integration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.relatedCourseIds.map((cId) => {
              const course = getCourseById(cId);
              if (!course) return null;

              return (
                <div
                  key={course.id}
                  className="flex flex-col justify-between p-4 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <div>
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                      {course.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">{course.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-1">{course.description}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => handleOpenPdf(course.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#173B70] text-white text-xs font-semibold hover:bg-[#122e57] transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Read PDF</span>
                    </button>

                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100"
                    >
                      <span>Course Page</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Project Submission & Delivery Form ─── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-600" />
              <span>Submit Project Deliverables</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Submit your GitHub repository and live deployment link to verify this project and publish it to your portfolio.
            </p>
          </div>

          {record?.submission && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{record.submission.reviewStatus}</span>
            </span>
          )}
        </div>

        {submissionFeedback && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{submissionFeedback}</span>
          </div>
        )}

        {submissionError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{submissionError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                GitHub Repository URL <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                required
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/your-username/my-project"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#173B70] shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Live Demo / Deployment URL (Optional)
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://my-app.vercel.app"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#173B70] shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Project Description & Key Outcomes (What did you build and learn?)
            </label>
            <textarea
              rows={3}
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              placeholder="Describe your architecture decisions, challenges solved, and skills demonstrated..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#173B70] shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-slate-400">
              Submitted URLs are validated and recorded in your local browser profile.
            </span>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>{record?.submission ? "Update Submission" : "Submit Project"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* ─── Integrated PDF Reader Modal ─── */}
      {activeCourse && activeLesson && (
        <PdfReaderModal
          course={activeCourse}
          lesson={activeLesson}
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
        />
      )}
    </div>
  );
}
