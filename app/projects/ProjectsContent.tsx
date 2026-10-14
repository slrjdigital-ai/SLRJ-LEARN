"use client";

import { useState } from "react";
import Image from "next/image";
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
} from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";

export default function ProjectsContent() {
  const allProjects = getAllPracticalProjects();
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<PracticalProject | null>(null);
  const [githubUrlInput, setGithubUrlInput] = useState("");
  const [submittedStatus, setSubmittedStatus] = useState<Record<string, string>>({});
  const [activeStarterTab, setActiveStarterTab] = useState<number>(0);
  const [copiedFile, setCopiedFile] = useState(false);

  const categories = ["All", "Frontend", "Full-Stack", "AI & APIs", "Productivity"];

  const filteredProjects =
    filter === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === filter);

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
    <>
      {/* ── Hero Section ── */}
      <section className="pt-28 pb-12 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <FolderGit2 size={14} className="text-cyan-400" />
          <span>Real-World Engineering Projects</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white mb-4">
          Build Projects That Get You{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            Hired.
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          Theory without code is quickly forgotten. Build complete, portfolio-ready applications with starter code, milestone instructions, and GitHub submissions.
        </p>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === cat
                  ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold shadow-md shadow-cyan-500/20"
                  : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isSubmitted = Boolean(submittedStatus[project.id]);

            return (
              <div
                key={project.id}
                className="rounded-3xl bg-[#080D1A] border border-white/10 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(6,182,212,0.12)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold uppercase">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                      <Award size={13} className="text-amber-400" />
                      <span>+{project.xpReward} XP</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-brand mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {project.tagline}
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1 mb-5">
                    {project.skillsRequired.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
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
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    View Project
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Project Details & Submission Modal ── */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#080D1A] border border-white/10 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300">
                    {activeProject.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    • {activeProject.difficulty}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-brand text-white">
                  {activeProject.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {activeProject.description}
            </p>

            {/* Step-by-Step Instructions */}
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-3 flex items-center gap-1.5">
                <Layers size={14} />
                <span>Step-by-Step Implementation Guide</span>
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

            {/* Starter Files Drawer */}
            {activeProject.starterFiles && activeProject.starterFiles.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    <Code2 size={14} className="text-emerald-400" />
                    <span>Starter Code Files</span>
                  </span>
                  <button
                    onClick={() =>
                      handleCopyStarter(activeProject.starterFiles[activeStarterTab]?.content || "")
                    }
                    className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300"
                  >
                    {copiedFile ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedFile ? "Copied File" : "Copy Starter Code"}</span>
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
                  <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-56">
                    <code>{activeProject.starterFiles[activeStarterTab]?.content}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* GitHub Link Submission Field */}
            <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/25">
              <div className="flex items-center gap-2 mb-2 font-bold text-xs text-white">
                <GithubIcon size={15} className="text-cyan-400" />
                <span>Submit Your Completed GitHub Repository</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                Paste your GitHub repository link once you have completed the project to showcase it on your public student profile and earn +{activeProject.xpReward} XP!
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={githubUrlInput}
                  onChange={(e) => setGithubUrlInput(e.target.value)}
                  placeholder="https://github.com/your-username/my-project"
                  className="flex-1 bg-[#030712] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={() => handleSubmitProject(activeProject.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-md shadow-cyan-500/20"
                >
                  Submit & Earn XP
                </button>
              </div>

              {submittedStatus[activeProject.id] && (
                <div className="mt-2 text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Submitted: {submittedStatus[activeProject.id]}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
