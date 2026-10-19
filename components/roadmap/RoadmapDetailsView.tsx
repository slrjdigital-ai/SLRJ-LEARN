"use client";

import { useState } from "react";
import Link from "next/link";
import { RoadmapTrack, RoadmapStep } from "@/data/roadmap";
import { useRoadmapProgress } from "@/lib/roadmapProgress";
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
  RotateCcw,
  Share2,
  Check,
  Trophy,
  FolderGit2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface RoadmapDetailsViewProps {
  track: RoadmapTrack;
  steps: RoadmapStep[];
}

export default function RoadmapDetailsView({ track, steps }: RoadmapDetailsViewProps) {
  const { progressMap, startOrContinue, toggleStage, toggleSave } = useRoadmapProgress();

  const progress = progressMap[track.id] || null;
  const isStarted = !!progress && (progress.completedStageIds.length > 0 || progress.status === "in_progress");
  const completedIds = progress?.completedStageIds || [];
  const completedCount = completedIds.length;
  const totalStages = steps.length || track.totalStages;
  const percent = totalStages > 0 ? Math.round((completedCount / totalStages) * 100) : 0;
  const isSaved = progress?.isSaved ?? false;
  const currentStageId = progress?.currentStageId || steps[0]?.id || 1;

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
      description: "Complete your first stage",
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
      description: "Complete hands-on stage project",
      isReached: completedCount >= 2,
    },
    {
      id: "job_ready",
      label: "Career Roadmap Graduate",
      description: "Finish all 8 career stages",
      isReached: percent >= 100,
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-10 pb-16">
      {/* ─── Top Breadcrumb Navigation ─── */}
      <div className="flex items-center justify-between">
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#173B70] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Role Roadmaps</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleSave(track.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Saved to My Roadmaps</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save Roadmap</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─── Hero Overview Header Card ─── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/50 border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#173B70] border border-blue-200/70 text-xs font-semibold">
                {track.category}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                Level: {track.level}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/70 text-xs font-semibold">
                {track.badge}
              </span>
            </div>

            <div className="flex items-start gap-4 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#173B70] to-blue-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                {getCareerIcon(track.icon, "w-6 h-6 text-white")}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-brand">
                  {track.name} Roadmap
                </h1>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-1.5">
                  {track.description}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 pt-2">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#173B70]" />
                <span>{track.duration}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5 font-medium">
                <Layers className="w-4 h-4 text-[#173B70]" />
                <span>{totalStages} Structured Stages</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5 font-medium">
                <BookOpen className="w-4 h-4 text-[#173B70]" />
                <span>{track.totalLessons} PDF Lessons Aligned</span>
              </div>
            </div>

            {/* Prerequisites */}
            {track.prerequisites && track.prerequisites.length > 0 && (
              <div className="text-xs text-slate-500 pt-1">
                <span className="font-semibold text-slate-700">Recommended Prerequisites: </span>
                {track.prerequisites.join(" • ")}
              </div>
            )}
          </div>

          {/* Right Column: Progress Card & CTA */}
          <div className="w-full lg:w-80 rounded-xl bg-white border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Roadmap Progress
              </span>
              <span className="text-xs font-extrabold text-[#173B70]">{percent}%</span>
            </div>

            <div className="space-y-1.5">
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    percent >= 100 ? "bg-emerald-500" : "bg-[#173B70]"
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{completedCount} of {totalStages} stages completed</span>
                <span>{totalStages - completedCount} remaining</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartOrContinue}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#173B70] hover:bg-[#122e57] text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>{isStarted ? "Continue Current Stage" : "Start This Roadmap"}</span>
            </button>

            {progress?.startedAt && (
              <p className="text-[11px] text-center text-slate-400">
                Started on {new Date(progress.startedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Core Skills Preview */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Core Technical Skills Covered in This Track
          </span>
          <div className="flex flex-wrap gap-1.5">
            {track.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md bg-white text-slate-700 text-xs font-medium border border-slate-200 shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Milestones Progress Strip ─── */}
      <div className="rounded-xl bg-white border border-slate-200/90 p-5 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
            Career Milestones & Achievements
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`p-3 rounded-lg border transition-colors ${
                milestone.isReached
                  ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                  : "bg-slate-50/70 border-slate-200 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    milestone.isReached
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs font-bold truncate">{milestone.label}</span>
              </div>
              <p className="text-[11px] mt-1 pl-7 opacity-80 leading-tight">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Step-by-Step Interactive Roadmap Timeline ─── */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-brand">
              Structured Learning Stages
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Follow stages sequentially. Study the attached PDF learning guides, complete hands-on projects, and check off each stage.
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500 hidden sm:inline-block">
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
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Capstone Graduation Project
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {track.finalProject.title}
                </h3>
              </div>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-[0.98]"
            >
              <span>Explore Project Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4 max-w-3xl">
            {track.finalProject.description}
          </p>
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
