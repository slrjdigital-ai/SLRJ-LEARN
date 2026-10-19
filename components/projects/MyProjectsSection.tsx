"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PracticalProject } from "@/data/projectsData";
import { LearnerProjectRecord, ProjectStatus } from "@/lib/projectProgress";
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  ArrowRight,
  Bookmark,
  Send,
  Archive,
  Compass,
  Play,
  Sparkles,
  Layers,
} from "lucide-react";

interface MyProjectsSectionProps {
  records: Record<string, LearnerProjectRecord>;
  allProjects: PracticalProject[];
  onExploreClick: () => void;
  onRoadmapsClick: () => void;
}

export default function MyProjectsSection({
  records,
  allProjects,
  onExploreClick,
  onRoadmapsClick,
}: MyProjectsSectionProps) {
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const projectItems = useMemo(() => {
    return Object.values(records)
      .map((rec) => {
        const project = allProjects.find((p) => p.id === rec.projectId);
        if (!project) return null;

        // Calculate progress percentage from tasks
        const totalTasks = project.milestones?.reduce(
          (acc, m) => acc + (m.tasks?.length || 0),
          0
        ) || 0;
        const completedTasksCount = rec.completedTaskIds?.length || 0;
        const percent = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : (rec.status === "Completed" ? 100 : 0);

        // Find next task
        let nextTaskTitle = "Complete implementation tasks";
        if (project.milestones) {
          for (const m of project.milestones) {
            const pendingTask = m.tasks.find((t) => !rec.completedTaskIds?.includes(t.id));
            if (pendingTask) {
              nextTaskTitle = pendingTask.title;
              break;
            }
          }
        }

        return {
          record: rec,
          project,
          percent,
          totalTasks,
          completedTasksCount,
          nextTaskTitle,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [records, allProjects]);

  // Filtered items
  const filteredItems = useMemo(() => {
    if (statusFilter === "All") return projectItems;
    return projectItems.filter((i) => i.record.status === statusFilter);
  }, [projectItems, statusFilter]);

  if (projectItems.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 sm:p-10 text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-50 text-[#173B70] flex items-center justify-center">
          <FolderGit2 className="w-6 h-6 text-blue-600" />
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            You haven&apos;t started any projects yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Pick a practical project to apply what you learn. Complete milestones, code in the Playground, and publish to your portfolio.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onExploreClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#173B70] hover:bg-[#122e57] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onRoadmapsClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-all shadow-2xs"
          >
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Choose a Career Roadmap</span>
          </button>
        </div>
      </div>
    );
  }

  const statusList = ["All", "In Progress", "Saved", "Submitted", "Completed", "Archived"];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#173B70]" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            My Projects ({projectItems.length})
          </h2>
        </div>

        {/* Status Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {statusList.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                statusFilter === st
                  ? "bg-[#173B70] text-white border-[#173B70]"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="p-6 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
          No projects found with status: <strong>{statusFilter}</strong>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(({ record, project, percent, completedTasksCount, totalTasks, nextTaskTitle }) => {
            const isCompleted = record.status === "Completed" || percent >= 100;
            const isSubmitted = record.status === "Submitted";

            return (
              <div
                key={project.id}
                className="flex flex-col justify-between rounded-xl bg-white border border-slate-200 hover:border-slate-300 p-5 shadow-2xs hover:shadow-xs transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-100">
                      {project.category}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        isCompleted
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : isSubmitted
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : record.status === "Saved"
                          ? "bg-slate-100 text-slate-700 border-slate-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : isSubmitted ? (
                        <Send className="w-3 h-3 text-amber-600" />
                      ) : (
                        <Play className="w-3 h-3 text-blue-600" />
                      )}
                      <span>{record.status}</span>
                    </span>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="block text-base font-bold text-slate-900 hover:text-[#173B70] transition-colors leading-snug"
                  >
                    {project.title}
                  </Link>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Progress Statistics */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
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

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{completedTasksCount} of {totalTasks} tasks done</span>
                      {record.updatedAt && (
                        <span>Updated {new Date(record.updatedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>

                  {/* Next Step / Milestone */}
                  {!isCompleted && (
                    <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-800 block">Next Milestone Task:</span>
                      <span className="truncate block mt-0.5">{nextTaskTitle}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Button */}
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-[#173B70] text-slate-700 hover:text-white border border-slate-200 hover:border-transparent text-xs font-semibold transition-all duration-150"
                  >
                    <span>{isCompleted ? "Review Completed Project" : "Continue Project"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
