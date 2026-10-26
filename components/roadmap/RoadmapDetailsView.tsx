"use client";

import { useState } from "react";
import Link from "next/link";
import { RoadmapTrack, RoadmapStep } from "@/data/roadmap";
import { useRoadmapProgress } from "@/lib/roadmapProgress";
import { useRoadmapDetailedProgress } from "@/lib/courseProgressMetrics";
import { Course, PdfLesson } from "@/data/courses";
import PdfReaderModal from "@/components/courses/PdfReaderModal";
import RoadmapTimeline from "./RoadmapTimeline";
import { getCareerIcon } from "./RoadmapCard";
import {
  ArrowLeft,
  Clock,
  Layers,
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Play,
  Check,
  Trophy,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

interface RoadmapDetailsViewProps {
  track: RoadmapTrack;
  steps: RoadmapStep[];
}

export default function RoadmapDetailsView({ track, steps }: RoadmapDetailsViewProps) {
  const { progressMap, startOrContinue, toggleStage, toggleSave } = useRoadmapProgress();
  const detailedProgress = useRoadmapDetailedProgress(track.id);

  const progress = progressMap[track.id] || null;
  const isStarted = !!progress && (progress.completedStageIds.length > 0 || progress.status === "in_progress");
  const completedIds = progress?.completedStageIds || [];
  const completedCount = completedIds.length;
  const totalStages = steps.length || track.totalStages;
  const percent = detailedProgress.overallPercentage;
  const isSaved = progress?.isSaved ?? false;
  const currentStageId = progress?.currentStageId || steps[0]?.id || 1;

  // Circular progress calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius; // ~113.1
  const strokeDashoffset =
    circumference - (circumference * Math.min(100, Math.max(0, detailedProgress.overallPercentage))) / 100;

  // PDF Reader Modal State
  const [activeModalCourse, setActiveModalCourse] = useState<Course | null>(null);
  const [activeModalLesson, setActiveModalLesson] = useState<PdfLesson | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const handleOpenPdf = (course: Course, lesson: PdfLesson) => {
    setActiveModalCourse(course);
    setActiveModalLesson(lesson);
    setIsPdfModalOpen(true);
  };

  const handleClosePdf = () => {
    setIsPdfModalOpen(false);
    setActiveModalCourse(null);
    setActiveModalLesson(null);
  };

  const handleToggleStage = (stageId: number | string) => {
    toggleStage(track.id, stageId, totalStages);
  };

  const handleStartOrContinue = () => {
    startOrContinue(track.id, steps[0]?.id || 1);
  };

  // Milestone Definitions
  const milestones = [
    {
      id: "first_step",
      label: "First Step Taken",
      description: "Complete your first course stage",
      isReached: completedCount >= 1,
    },
    {
      id: "core_skills",
      label: "Core Skills Underway",
      description: "Complete 50% of the syllabus",
      isReached: percent >= 50,
    },
    {
      id: "hands_on_project",
      label: "Practical Lab Ready",
      description: "Build hands-on milestone projects",
      isReached: completedCount >= 2,
    },
    {
      id: "job_ready",
      label: "Career Roadmap Graduate",
      description: "Finish all sequenced stages",
      isReached: percent >= 100,
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-10 pb-20">
      {/* ─── Top Breadcrumb Navigation ─── */}
      <div className="flex items-center justify-between">
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-slate-800 hover:text-[#12316B] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-[#12316B]" />
          <span>Back to All Role Roadmaps</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleSave(track.id)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-[#12316B]" />
                <span>Saved to My Roadmaps</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-slate-500" />
                <span>Save Roadmap</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─── Hero Overview Header Card ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-slate-50 to-blue-50/60 border border-slate-200 p-6 sm:p-9 shadow-sm">
        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12316B]/10 text-[#12316B] border border-[#12316B]/20 text-xs sm:text-sm font-black uppercase font-mono">
                {track.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold">
                Level: {track.level}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs sm:text-sm font-extrabold">
                {track.badge}
              </span>
            </div>

            <div className="flex items-start gap-4 pt-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#12316B] to-[#173B70] text-white flex items-center justify-center shrink-0 shadow-md">
                {getCareerIcon(track.icon, "w-7 h-7 text-white")}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-brand leading-tight">
                  {track.name} Roadmap
                </h1>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed mt-2 font-normal">
                  {track.description}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-slate-800 pt-2 font-semibold">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#12316B]" />
                <span>{track.duration}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#12316B]" />
                <span>{totalStages} Sequenced Stages</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#12316B]" />
                <span>All 21 Interactive Courses Aligned</span>
              </div>
            </div>

            {/* Prerequisites */}
            {track.prerequisites && track.prerequisites.length > 0 && (
              <div className="text-xs sm:text-sm text-slate-700 pt-1">
                <span className="font-extrabold text-slate-900">Recommended Prerequisites: </span>
                <span>{track.prerequisites.join(" • ")}</span>
              </div>
            )}
          </div>

          {/* Right Column: Progress Card & CTA */}
          <div className="w-full lg:w-96 rounded-3xl bg-white border-2 border-slate-200/90 p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
                Roadmap Completion Status
              </span>
              <span className="text-xs font-black text-[#12316B] bg-[#12316B]/10 px-2.5 py-0.5 rounded-md font-mono border border-[#12316B]/20">
                {detailedProgress.overallPercentage}%
              </span>
            </div>

            {/* Circular Progress Meter & Live Status */}
            <div className="flex items-center gap-4 bg-slate-50/90 p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 44 44">
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    strokeWidth="3.5"
                    fill="transparent"
                    className="stroke-slate-200"
                  />
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
                <div className="absolute inset-0 flex items-center justify-center">
                  {detailedProgress.isCompleted ? (
                    <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                  ) : (
                    <span
                      className={`text-xs font-black font-mono ${
                        detailedProgress.overallPercentage > 0 ? "text-[#12316B]" : "text-slate-500"
                      }`}
                    >
                      {detailedProgress.overallPercentage}%
                    </span>
                  )}
                </div>
              </div>

              <div className="min-w-0">
                <div className="text-sm font-black text-slate-950 truncate">
                  {detailedProgress.isCompleted
                    ? "Career Pathway Mastered!"
                    : detailedProgress.overallPercentage > 0
                    ? "In Active Progression"
                    : "Ready to Begin Pathway"}
                </div>
                <p className="text-xs text-slate-700 font-semibold mt-0.5">
                  {detailedProgress.completedCourses} of {totalStages} courses completed
                </p>
              </div>
            </div>

            {/* Inside Topics Progress Breakdown Grid */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-black uppercase text-slate-600 font-mono">
                <span>Inside Topics Breakdown</span>
                <span className="text-[#12316B] font-bold">
                  {detailedProgress.completedTopics}/{detailedProgress.totalTopics} Topics
                </span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-1.5 text-center text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-slate-500 block font-mono">Notes</span>
                  <span className="font-mono font-black text-slate-900 text-xs">
                    {detailedProgress.completedNotes}/{detailedProgress.totalNotes}
                  </span>
                </div>
                <div className="space-y-0.5 border-x border-slate-200">
                  <span className="text-[10px] font-black uppercase text-slate-500 block font-mono">Quizzes</span>
                  <span className="font-mono font-black text-slate-900 text-xs">
                    {detailedProgress.completedQuizzes}/{detailedProgress.totalQuizzes}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-slate-500 block font-mono">Coding</span>
                  <span className="font-mono font-black text-slate-900 text-xs">
                    {detailedProgress.completedCode}/{detailedProgress.totalCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    detailedProgress.isCompleted
                      ? "bg-emerald-500"
                      : "bg-gradient-to-r from-[#12316B] via-[#173B70] to-[#18B6D2]"
                  }`}
                  style={{ width: `${detailedProgress.overallPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Curriculum completion</span>
                <span className="font-bold text-slate-900">{detailedProgress.overallPercentage}%</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartOrContinue}
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#12316B] hover:bg-[#173B70] text-white text-sm sm:text-base font-extrabold shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>{isStarted || detailedProgress.hasStarted ? "Continue Current Stage" : "Start This Roadmap"}</span>
            </button>

            {progress?.startedAt && (
              <p className="text-xs text-center text-slate-500 font-medium">
                Started on {new Date(progress.startedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Core Skills Preview */}
        <div className="mt-6 pt-5 border-t border-slate-200 space-y-2.5">
          <span className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider block font-mono">
            Core Technologies &amp; Skills Covered in This Track:
          </span>
          <div className="flex flex-wrap gap-2">
            {track.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-lg bg-white text-slate-800 text-xs sm:text-sm font-bold border border-slate-200/90 shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Milestones Progress Strip ─── */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h2 className="text-sm sm:text-base font-extrabold text-slate-950 uppercase tracking-wider font-mono">
            Career Milestones &amp; Achievements
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-1">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`p-3.5 rounded-xl border transition-colors ${
                milestone.isReached
                  ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    milestone.isReached
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-bold truncate">{milestone.label}</span>
              </div>
              <p className="text-xs mt-1.5 pl-8 text-slate-600 leading-snug">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Step-by-Step Interactive Roadmap Timeline ─── */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-brand">
              Structured Learning Stages ({totalStages} Courses)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 leading-relaxed">
              Follow stages sequentially. Every stage directly corresponds to a full, interactive course with hands-on practice, PDF study guides, and milestone projects.
            </p>
          </div>

          <span className="text-sm font-extrabold text-[#12316B] font-mono hidden sm:inline-block">
            {totalStages} Stages Total
          </span>
        </div>

        <RoadmapTimeline
          steps={steps}
          completedStageIds={completedIds}
          currentStageId={currentStageId}
          onToggleStage={handleToggleStage}
          onOpenPdf={handleOpenPdf}
        />
      </div>

      {/* ─── Capstone Final Project Showcase ─── */}
      {track.finalProject && (
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#12316B] text-white p-7 sm:p-9 shadow-lg space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black text-[#18B6D2] uppercase tracking-wider block font-mono">
                  Capstone Graduation Project &amp; Credential
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-brand">
                  {track.finalProject.title}
                </h3>
              </div>
            </div>

            <Link
              href="/certificates"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 text-xs sm:text-sm font-extrabold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <span>View Certificate Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl font-normal">
            {track.finalProject.description}
          </p>

          <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs sm:text-sm text-blue-200">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Successful completion of all {totalStages} stages qualifies for the verified SLRJ Learn {track.name} Credential.</span>
          </div>
        </div>
      )}

      {/* ─── Integrated PDF Reader Modal ─── */}
      {activeModalCourse && (
        <PdfReaderModal
          course={activeModalCourse}
          lesson={activeModalLesson}
          isOpen={isPdfModalOpen}
          onClose={handleClosePdf}
        />
      )}
    </div>
  );
}
