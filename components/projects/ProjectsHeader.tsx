"use client";

import { FolderGit2, CheckCircle2, Clock, Globe, Sparkles, ArrowRight, BookOpen } from "lucide-react";

interface ProjectsHeaderProps {
  totalAvailable: number;
  inProgressCount: number;
  completedCount: number;
  portfolioPublishedCount: number;
  onBuildClick: () => void;
  onViewPortfolioClick: () => void;
}

export default function ProjectsHeader({
  totalAvailable,
  inProgressCount,
  completedCount,
  portfolioPublishedCount,
  onBuildClick,
  onViewPortfolioClick,
}: ProjectsHeaderProps) {
  const hasStartedAny = inProgressCount > 0 || completedCount > 0;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 border border-slate-200/90 shadow-sm p-6 sm:p-8">
      {/* Soft Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#173B70]/5 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Title, Subtitle, & Stats */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#173B70] border border-blue-200/70 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Practical Engineering & Portfolio</span>
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            <span>8 Career Tracks</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-brand">
            Projects & Portfolio
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Turn your skills into real projects. Build, document, and showcase what you can do.
            Step-by-step milestones, interactive Playground coding, and a professional public portfolio.
          </p>

          {/* Real Statistics Chips */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-[#173B70]" />
              <span>Available Projects:</span>
              <span className="font-bold text-slate-900">{totalAvailable}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>In Progress:</span>
              <span className="font-bold text-slate-900">{inProgressCount}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Completed:</span>
              <span className="font-bold text-slate-900">{completedCount}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-xs font-medium text-purple-800 shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-purple-600" />
              <span>Portfolio Published:</span>
              <span className="font-bold text-purple-900">{portfolioPublishedCount}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Primary & Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={onBuildClick}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#122e57] text-white text-sm font-bold shadow-xs transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Build a Project</span>
          </button>

          <button
            type="button"
            onClick={onViewPortfolioClick}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-semibold transition-all shadow-2xs"
          >
            <Globe className="w-4 h-4 text-purple-600" />
            <span>View My Portfolio</span>
          </button>
        </div>
      </div>

      {/* Encouraging Onboarding State if learner hasn't started any project yet */}
      {!hasStartedAny && (
        <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>
              <strong>New to project-based learning?</strong> Pick a beginner-friendly project below to start your verified portfolio.
            </span>
          </div>
          <span className="text-slate-400 font-medium">All starter code & testing guides are 100% free</span>
        </div>
      )}
    </div>
  );
}
