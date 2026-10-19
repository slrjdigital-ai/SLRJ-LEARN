"use client";

import { PracticalProject } from "@/data/projectsData";
import { LearnerProjectRecord } from "@/lib/projectProgress";
import ProjectCard from "./ProjectCard";
import { SearchX, RotateCcw } from "lucide-react";

interface ProjectGridProps {
  projects: PracticalProject[];
  records: Record<string, LearnerProjectRecord>;
  onToggleSave: (projectId: string) => void;
  onResetFilters: () => void;
}

export default function ProjectGrid({
  projects,
  records,
  onToggleSave,
  onResetFilters,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center space-y-3">
        <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No practical projects match your criteria</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Try clearing your search query or selecting a different career path or difficulty filter.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#173B70] text-white text-xs font-semibold hover:bg-[#122e57] transition-all shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          record={records[project.id] || null}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}
