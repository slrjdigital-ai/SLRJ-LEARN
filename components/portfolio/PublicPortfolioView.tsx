"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PracticalProject, getAllPracticalProjects } from "@/data/projectsData";
import { LearnerPortfolio, LearnerProjectRecord, getStoredPortfolio, getStoredProjectRecords, DEFAULT_PORTFOLIO } from "@/lib/projectProgress";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import {
  Globe,
  ExternalLink,
  Code2,
  FolderGit2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Compass,
} from "lucide-react";

interface PublicPortfolioViewProps {
  slug: string;
}

export default function PublicPortfolioView({ slug }: PublicPortfolioViewProps) {
  // Read portfolio data from client storage or fallback to default
  const stored = typeof window !== "undefined" ? getStoredPortfolio() : DEFAULT_PORTFOLIO;
  const projectRecords = typeof window !== "undefined" ? getStoredProjectRecords() : {};
  const allProjects = useMemo(() => getAllPracticalProjects(), []);

  // Check if matching slug & published
  const isMatch = stored.slug.toLowerCase() === slug.toLowerCase() || slug === "demo" || slug === "learner-portfolio";
  const isLive = isMatch && stored.isPublished;

  const showcasedProjects = useMemo(() => {
    return allProjects.filter((p) => stored.selectedProjectIds?.includes(p.id));
  }, [allProjects, stored.selectedProjectIds]);

  if (!isLive) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-brand">Portfolio Not Published</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            This portfolio is either unpublished, private, or the specified URL slug is not active.
          </p>
          <div className="pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#173B70] text-white text-xs font-semibold hover:bg-[#122e57] transition-all"
            >
              <span>Explore SLRJ Learn Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12 pb-20 pt-4">
      {/* ── Top Hero Profile Section ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#173B70] to-[#0d213f] text-white p-8 sm:p-12 shadow-lg">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mb-20" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 border border-white/15 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Verified SLRJ Learn Portfolio</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-brand">
              {stored.displayName}
            </h1>

            <p className="text-base sm:text-lg text-blue-100 font-medium">
              {stored.headline}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {stored.bio}
            </p>

            {/* Social & Contact Links */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {stored.githubUrl && (
                <a
                  href={stored.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-all backdrop-blur-2xs"
                >
                  <GithubIcon size={14} className="text-white" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}

              {stored.linkedinUrl && (
                <a
                  href={stored.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-all backdrop-blur-2xs"
                >
                  <LinkedinIcon size={14} className="text-blue-300" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}

              {stored.websiteUrl && (
                <a
                  href={stored.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-all backdrop-blur-2xs"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Personal Site</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="rounded-2xl bg-white/10 border border-white/15 p-5 backdrop-blur-md text-center shrink-0 w-full md:w-auto">
            <span className="text-3xl font-extrabold text-white block">
              {showcasedProjects.length}
            </span>
            <span className="text-xs text-blue-200 uppercase tracking-wider font-semibold block mt-0.5">
              Verified Projects
            </span>
          </div>
        </div>

        {/* Skills Chips */}
        {stored.skills && stored.skills.length > 0 && (
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10 space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Core Technical Competencies:
            </span>
            <div className="flex flex-wrap gap-2">
              {stored.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-medium border border-white/10 backdrop-blur-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Showcased Engineering Projects ── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-brand">
              Showcased Engineering Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Independent applications built, tested, and documented with verifiable source code.
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            {showcasedProjects.length} Project{showcasedProjects.length !== 1 ? "s" : ""}
          </span>
        </div>

        {showcasedProjects.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 rounded-xl bg-white border border-slate-200">
            No projects are currently selected for this public portfolio.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {showcasedProjects.map((project) => {
              const rec = projectRecords[project.id];
              const repo = rec?.submission?.repositoryUrl || project.sampleGithubUrl;
              const live = rec?.submission?.liveDemoUrl;

              return (
                <div
                  key={project.id}
                  className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200 hover:border-slate-300 p-6 shadow-2xs hover:shadow-sm transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#173B70] font-semibold text-[11px] border border-blue-100">
                        {project.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {project.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mt-1.5 leading-relaxed">
                      {rec?.submission?.description || project.description}
                    </p>

                    {/* Key Technical Skills */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Technologies & Architecture
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.skillsRequired.map((s) => (
                          <span
                            key={s}
                            className="text-[11px] font-medium text-slate-700 px-2 py-0.5 rounded bg-slate-50 border border-slate-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions: View Repo & Live Demo */}
                  <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
                    {repo && (
                      <a
                        href={repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                      >
                        <GithubIcon size={14} className="text-white" />
                        <span>Source Code</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    )}

                    {live && (
                      <a
                        href={live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3 text-white/70" />
                      </a>
                    )}

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      <span>Case Study</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Footer Attribution ── */}
      <footer className="pt-8 border-t border-slate-200 text-center text-xs text-slate-500">
        <p>
          Verified Student Portfolio created on{" "}
          <Link href="/" className="font-bold text-[#173B70] hover:underline">
            SLRJ Learn Academy
          </Link>
          . Hand-crafted with structured engineering curricula and hands-on milestones.
        </p>
      </footer>
    </div>
  );
}
