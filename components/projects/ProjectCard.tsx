"use client";

import Link from "next/link";
import { PracticalProject } from "@/data/projectsData";
import { LearnerProjectRecord } from "@/lib/projectProgress";
import {
  Clock,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Play,
  Send,
  Award,
  Compass,
  Code2,
  Terminal,
} from "lucide-react";

interface ProjectCardProps {
  project: PracticalProject;
  record: LearnerProjectRecord | null;
  onToggleSave: (projectId: string) => void;
}

export default function ProjectCard({ project, record, onToggleSave }: ProjectCardProps) {
  const isSaved = record?.status === "Saved";
  const isStarted = record && (record.status === "In Progress" || record.completedTaskIds?.length > 0);
  const isCompleted = record?.status === "Completed";
  const isSubmitted = record?.status === "Submitted";

  // Calculate percentage if milestones exist
  const totalTasks = project.milestones?.reduce((acc, m) => acc + (m.tasks?.length || 0), 0) || 0;
  const doneTasks = record?.completedTaskIds?.length || 0;
  const percent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : (isCompleted ? 100 : 0);

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 p-5 shadow-2xs hover:shadow-xs transition-all duration-200">
      <div>
        {/* Top Badges & Save Toggle */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              {project.category}
            </span>

            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-medium border border-blue-100">
              {project.difficulty}
            </span>

            {/* Linked Roadmap Badge */}
            {project.roadmapIds && project.roadmapIds.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100">
                <Compass className="w-3 h-3 text-indigo-600" />
                <span className="capitalize">{project.roadmapIds[0]}</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onToggleSave(project.id)}
            title={isSaved ? "Saved project" : "Save project"}
            className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-colors"
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-blue-600" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Title & Tagline */}
        <Link
          href={`/projects/${project.slug}`}
          className="block text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#173B70] transition-colors leading-snug"
        >
          {project.title}
        </Link>

        <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
          {project.tagline}
        </p>

        {/* Effort & XP Reward */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Estimated Effort</span>
            <span className="font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {project.estimatedTime}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">XP Reward</span>
            <span className="font-semibold text-amber-600 flex items-center gap-1 mt-0.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              +{project.xpReward} XP
            </span>
          </div>
        </div>

        {/* Core Skills Chips */}
        <div className="mt-3.5 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Skills Practiced
          </span>
          <div className="flex flex-wrap gap-1">
            {project.skillsRequired.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium"
              >
                {skill}
              </span>
            ))}
            {project.skillsRequired.length > 3 && (
              <span className="px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 text-[10px]">
                +{project.skillsRequired.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Conditional Progress Bar (Render only if started!) */}
        {isStarted && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 flex items-center gap-1">
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : isSubmitted ? (
                  <Send className="w-3.5 h-3.5 text-amber-600" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-blue-600" />
                )}
                <span>{isCompleted ? "Completed" : isSubmitted ? "Submitted" : `${percent}% Completed`}</span>
              </span>
              <span className={isCompleted ? "text-emerald-700" : "text-[#173B70]"}>
                {doneTasks}/{totalTasks} tasks
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isCompleted ? "bg-emerald-500" : "bg-[#173B70]"
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA Button */}
      <div className="mt-5 pt-3 border-t border-slate-100">
        <Link
          href={`/projects/${project.slug}`}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-50 group-hover:bg-[#173B70] text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-transparent text-xs font-semibold transition-all duration-150"
        >
          <span>{isStarted ? "Continue Project" : "View Project Workspace"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
