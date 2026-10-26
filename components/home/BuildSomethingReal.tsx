"use client";

import { useState } from "react";
import Link from "next/link";
import { useGamification } from "@/context/GamificationContext";
import { PRACTICAL_PROJECTS, PracticalProject } from "@/data/projectsData";
import {
  FolderGit2,
  ExternalLink,
  Code2,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Send,
  X,
  ArrowRight,
  BookOpen,
  Award,
} from "lucide-react";

export default function BuildSomethingReal() {
  const { recordActivity } = useGamification();
  const [selectedProject, setSelectedProject] = useState<PracticalProject | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Submission form state
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [submittedProjects, setSubmittedProjects] = useState<string[]>([]);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !githubUrl.trim()) return;

    // Record activity and award real XP
    const result = recordActivity("project", `project-${selectedProject.id}`, {
      xp: selectedProject.xpReward,
      title: selectedProject.title,
    });

    setSubmittedProjects((prev) => [...prev, selectedProject.id]);
    setSubmissionFeedback(`🎉 Project submitted successfully! You earned +${selectedProject.xpReward} XP. It has been added to your portfolio.`);

    setTimeout(() => {
      setGithubUrl("");
      setDemoUrl("");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b69ff] uppercase tracking-wider mb-1">
            <FolderGit2 size={14} className="text-[#0b69ff]" />
            <span>Project-Based Learning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-brand">
            Build Something Real
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Turn theory into working production software. Complete real deliverables, submit your code, and build a verified portfolio.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0b69ff] text-xs font-bold border border-blue-200 transition-all self-start sm:self-auto cursor-pointer"
        >
          <span>Explore All Projects</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* ── 8 Project Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PRACTICAL_PROJECTS.slice(0, 8).map((project) => {
          const isSubmitted = submittedProjects.includes(project.id);

          return (
            <div
              key={project.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#0b69ff] border border-blue-200 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-xs font-bold text-[#0b69ff] flex items-center gap-1">
                    <Zap size={13} />
                    +{project.xpReward} XP
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-[#0b69ff] transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-slate-400" />
                    {project.estimatedTime}
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-slate-700">{project.difficulty}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.skillsRequired.slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skillsRequired.length > 3 && (
                    <span className="px-1 py-0.5 text-slate-400 text-[10px]">
                      +{project.skillsRequired.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {isSubmitted ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <CheckCircle2 size={14} />
                    <span>Completed & In Portfolio</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => {
                      setSelectedProject(project);
                      setSubmissionFeedback(null);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#0b69ff] text-slate-700 hover:text-white border border-slate-200 hover:border-[#0b69ff] text-xs font-bold transition-all text-center cursor-pointer shadow-xs"
                  >
                    View Project & Build →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Project Details & Submission Modal ── */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0b69ff] border border-blue-200 uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-bold text-[#0b69ff] flex items-center gap-1">
                    <Zap size={13} />
                    +{selectedProject.xpReward} XP Reward
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-brand">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {selectedProject.tagline}
                </p>
              </div>

              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Steps & Instructions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Milestone Steps to Complete
              </h4>
              <div className="space-y-2">
                {selectedProject.steps.map((st) => (
                  <div key={st.stepNumber} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-xs font-bold text-slate-900 mb-0.5">
                      Step {st.stepNumber}: {st.title}
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed">
                      {st.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Starter Files */}
            {selectedProject.starterFiles && selectedProject.starterFiles.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span>Starter Template ({selectedProject.starterFiles[0].filename})</span>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => handleCopy(selectedProject.starterFiles[0].content, 0)}
                    className="flex items-center gap-1 text-[#0b69ff] hover:text-blue-700 cursor-pointer"
                  >
                    {copiedIndex === 0 ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedIndex === 0 ? "Copied!" : "Copy Code"}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto max-h-48 leading-relaxed">
                  <code>{selectedProject.starterFiles[0].content}</code>
                </pre>
              </div>
            )}

            {/* Project Submission Flow */}
            <form onSubmit={handleSubmit} className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Send size={14} className="text-[#0b69ff]" />
                <span>Submit Your Work & Claim +{selectedProject.xpReward} XP</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    GitHub Repository URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b69ff]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://my-project.vercel.app"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b69ff]"
                  />
                </div>
              </div>

              {submissionFeedback && (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold leading-relaxed">
                  {submissionFeedback}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0b69ff] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Submit Deliverable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
