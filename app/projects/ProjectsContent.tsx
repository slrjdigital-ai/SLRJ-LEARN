"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PRACTICAL_PROJECTS,
  PracticalProject,
  getAllPracticalProjects,
} from "@/data/projectsData";
import {
  FolderGit2,
  ExternalLink,
  Clock,
  Award,
  CheckCircle2,
  Sparkles,
  X,
  Copy,
  Check,
  Send,
  Layers,
  Code2,
  Search,
  Code,
  Flame,
  CheckCheck,
} from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";

export default function ProjectsContent() {
  const allProjects = getAllPracticalProjects();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<PracticalProject | null>(null);
  const [githubUrlInput, setGithubUrlInput] = useState("");
  const [submittedStatus, setSubmittedStatus] = useState<Record<string, string>>({});
  const [activeStarterTab, setActiveStarterTab] = useState<number>(0);
  const [copiedFile, setCopiedFile] = useState(false);

  const categories = ["All", "Frontend", "Full-Stack", "AI & APIs", "Productivity"];

  const filteredProjects = allProjects.filter((p) => {
    const matchesCategory = filter === "All" || p.category === filter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.skillsRequired.some((s) => s.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const handleSubmitProject = (projectId: string) => {
    if (!githubUrlInput.trim()) return;

    setSubmittedStatus((prev) => ({
      ...prev,
      [projectId]: githubUrlInput.trim(),
    }));

    try {
      const existing = JSON.parse(localStorage.getItem("slrj_submitted_projects") || "{}");
      existing[projectId] = githubUrlInput.trim();
      localStorage.setItem("slrj_submitted_projects", JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }

    setGithubUrlInput("");
  };

  const handleCopyStarter = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* ── Page Hero Header ── */}
      <section className="rounded-3xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#18B6D2]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B6D2] text-xs font-bold uppercase tracking-wider">
            <FolderGit2 size={14} className="text-[#18B6D2]" />
            <span>Practical Engineering Projects • 100% Free</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white">
            Build Projects That Get You Hired
          </h1>
          
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Theory without execution is quickly forgotten. Engineer complete, production-grade applications with step-by-step milestone instructions, free starter code, and verified GitHub portfolio submissions.
          </p>
        </div>
      </section>

      {/* ── Filter & Search Controls Bar ── */}
      <section className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === cat
                  ? "bg-[#12316B] text-white shadow-xs"
                  : "bg-[#F7F9FC] text-[#64748B] hover:text-[#182230] hover:bg-slate-100 border border-[#E2E8F0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick Search Input */}
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by skill, title..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F7F9FC] border border-[#E2E8F0] text-xs text-[#182230] placeholder-[#64748B] focus:outline-none focus:border-[#12316B] focus:bg-white"
          />
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => {
            const isSubmitted = Boolean(submittedStatus[project.id]);

            return (
              <div
                key={project.id}
                className="clean-card p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#12316B]/30 hover:-translate-y-1"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#12316B] uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                      <Award size={13} className="text-amber-500" />
                      <span>+{project.xpReward} XP</span>
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#182230] font-brand mb-2 hover:text-[#12316B] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {project.tagline}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.skillsRequired.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Free Tag Banner */}
                  <div className="mb-4 flex items-center justify-between text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl">
                    <span className="flex items-center gap-1 font-bold">
                      <Sparkles size={12} />
                      <span>100% Free Starter Code</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Open Source</span>
                  </div>

                  {/* Bottom Meta & Action */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <Clock size={13} className="text-cyan-400" />
                      <span>{project.estimatedTime}</span>
                      <span>•</span>
                      <span className="text-slate-300">{project.difficulty}</span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveProject(project);
                        setActiveStarterTab(0);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#12316B] hover:bg-[#2456A6] transition-all cursor-pointer shadow-xs hover:scale-102 active:scale-98"
                    >
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Full Landscape Project Details & Workspace Modal ── */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg overflow-y-auto">
          <div className="relative w-full max-w-5xl rounded-3xl bg-[#080D1A] border border-white/10 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold uppercase">
                    {activeProject.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    • {activeProject.difficulty}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Free Open Access
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-brand text-white">
                  {activeProject.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Two-Column Landscape Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              {/* Left Column: Description & Milestone Steps (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                    Project Overview
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                {/* Features List */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                    Key Features You Will Build
                  </h4>
                  <ul className="space-y-1.5">
                    {activeProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step-by-Step Instructions */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-3 flex items-center gap-1.5">
                    <Layers size={14} />
                    <span>Implementation Milestones</span>
                  </span>
                  <div className="space-y-3">
                    {activeProject.steps.map((st) => (
                      <div key={st.stepNumber} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-2 font-bold text-xs text-white mb-1">
                          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-mono">
                            {st.stepNumber}
                          </span>
                          <span>{st.title}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed pl-7">{st.description}</p>
                        {st.tip && (
                          <p className="text-[11px] text-cyan-300/80 italic mt-1 pl-7">💡 Pro-tip: {st.tip}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Starter Code & Submission (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Starter Code Viewer */}
                {activeProject.starterFiles && activeProject.starterFiles.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                        <Code2 size={14} className="text-emerald-400" />
                        <span>Starter Code</span>
                      </span>
                      <button
                        onClick={() =>
                          handleCopyStarter(activeProject.starterFiles[activeStarterTab]?.content || "")
                        }
                        className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer"
                      >
                        {copiedFile ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedFile ? "Copied!" : "Copy Code"}</span>
                      </button>
                    </div>

                    <div className="rounded-2xl bg-[#030712] border border-white/10 overflow-hidden">
                      <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 border-b border-white/5">
                        {activeProject.starterFiles.map((f, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveStarterTab(i)}
                            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                              activeStarterTab === i
                                ? "bg-white/10 text-cyan-300 font-bold"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            {f.filename}
                          </button>
                        ))}
                      </div>
                      <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-60">
                        <code>{activeProject.starterFiles[activeStarterTab]?.content}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Practice in Sandbox CTA */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">Test in Code Sandbox</div>
                    <div className="text-[11px] text-slate-400">Run and preview code directly in browser</div>
                  </div>
                  <Link
                    href="/practice"
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1"
                  >
                    <Code size={13} />
                    <span>Playground</span>
                  </Link>
                </div>

                {/* GitHub Submission Box */}
                <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/25">
                  <div className="flex items-center gap-2 mb-2 font-bold text-xs text-white">
                    <GithubIcon size={15} className="text-cyan-400" />
                    <span>Submit Completed GitHub URL</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    Submit your GitHub repo to unlock verified digital badges and earn +{activeProject.xpReward} XP.
                  </p>
                  <div className="flex flex-col gap-2">
                    <input
                      type="url"
                      value={githubUrlInput}
                      onChange={(e) => setGithubUrlInput(e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="w-full bg-[#030712] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      onClick={() => handleSubmitProject(activeProject.id)}
                      className="w-full py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-md shadow-cyan-500/20 cursor-pointer"
                    >
                      Submit Project & Earn XP
                    </button>
                  </div>

                  {submittedStatus[activeProject.id] && (
                    <div className="mt-2 text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      <span className="truncate">Saved: {submittedStatus[activeProject.id]}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
