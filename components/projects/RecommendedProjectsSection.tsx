"use client";

import Link from "next/link";
import { PracticalProject } from "@/data/projectsData";
import { Sparkles, Clock, Compass, ArrowRight, CheckCircle2, Wrench, BookOpen } from "lucide-react";

interface RecommendedProjectsSectionProps {
  recommendedProjects: PracticalProject[];
  isPersonalized: boolean;
  userRoadmapTitle?: string;
}

export default function RecommendedProjectsSection({
  recommendedProjects,
  isPersonalized,
  userRoadmapTitle,
}: RecommendedProjectsSectionProps) {
  if (recommendedProjects.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Recommended for You
          </h2>
          {isPersonalized && userRoadmapTitle ? (
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#173B70] text-xs font-semibold border border-blue-200">
              Matched to {userRoadmapTitle}
            </span>
          ) : (
            <span className="text-xs text-slate-500">General starter suggestions</span>
          )}
        </div>

        <span className="text-xs text-slate-400">
          Guided milestone tutorials included with starter code
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recommendedProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col justify-between rounded-xl bg-gradient-to-b from-white to-slate-50/50 border border-slate-200 hover:border-slate-300 p-5 shadow-2xs hover:shadow-xs transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
                  {project.category}
                </span>

                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-medium border border-blue-100">
                  {project.difficulty}
                </span>
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="block text-base font-bold text-slate-900 group-hover:text-[#173B70] transition-colors leading-snug"
              >
                {project.title}
              </Link>

              <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                {project.tagline}
              </p>

              {/* Effort & Roadmap Link */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-200/80 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 block">Estimated Effort</span>
                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {project.estimatedTime}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 block">Related Track</span>
                  <span className="font-semibold text-slate-700 capitalize truncate block">
                    {project.roadmapIds[0] || "General"}
                  </span>
                </div>
              </div>

              {/* Tools & Skills */}
              <div className="mt-3 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Skills Practiced
                </span>
                <div className="flex flex-wrap gap-1">
                  {project.skillsRequired.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-white text-slate-700 text-[11px] font-medium border border-slate-200 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skillsRequired.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px]">
                      +{project.skillsRequired.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Tools Preview */}
              {project.tools && project.tools.length > 0 && (
                <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-slate-400" />
                  <span className="truncate">Tools: {project.tools.slice(0, 3).join(", ")}</span>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200/80">
              <Link
                href={`/projects/${project.slug}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#173B70] hover:bg-[#122e57] text-white text-xs font-semibold transition-all duration-150 shadow-2xs"
              >
                <span>View Project Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
