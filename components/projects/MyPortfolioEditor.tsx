"use client";

import { useState } from "react";
import Link from "next/link";
import { PracticalProject } from "@/data/projectsData";
import { LearnerPortfolio, LearnerProjectRecord } from "@/lib/projectProgress";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import {
  Globe,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  Share2,
  FolderGit2,
  Save,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";

interface MyPortfolioEditorProps {
  portfolio: LearnerPortfolio;
  onUpdatePortfolio: (updates: Partial<LearnerPortfolio>) => void;
  onToggleProjectSelection: (projectId: string) => void;
  onPublish: (slug?: string) => void;
  onUnpublish: () => void;
  allProjects: PracticalProject[];
  records: Record<string, LearnerProjectRecord>;
}

export default function MyPortfolioEditor({
  portfolio,
  onUpdatePortfolio,
  onToggleProjectSelection,
  onPublish,
  onUnpublish,
  allProjects,
  records,
}: MyPortfolioEditorProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [saveFeedback, setSaveFeedback] = useState(false);

  // Completed or submitted projects available to showcase
  const eligibleProjects = allProjects.filter((p) => {
    const rec = records[p.id];
    return rec && (rec.status === "Completed" || rec.status === "Submitted" || rec.status === "In Progress");
  });

  // Selected projects objects
  const selectedProjects = allProjects.filter((p) =>
    portfolio.selectedProjectIds?.includes(p.id)
  );

  const publicUrl = `/portfolio/${portfolio.slug}`;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin + publicUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (!portfolio.skills.includes(newSkill.trim())) {
      onUpdatePortfolio({ skills: [...portfolio.skills, newSkill.trim()] });
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdatePortfolio({ skills: portfolio.skills.filter((s) => s !== skillToRemove) });
  };

  const handleManualSave = () => {
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* ── Top Status Banner: Publish Controls & Public Link ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                portfolio.isPublished ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
              }`}
            />
            <span className="text-sm font-bold text-slate-900">
              Portfolio Status: {portfolio.isPublished ? "Published & Live" : "Draft / Unpublished"}
            </span>
          </div>

          <p className="text-xs text-slate-500">
            {portfolio.isPublished
              ? `Publicly accessible at: /portfolio/${portfolio.slug}`
              : "Only you can preview this portfolio until you publish it."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {portfolio.isPublished ? (
            <>
              <Link
                href={publicUrl}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#173B70] text-white text-xs sm:text-sm font-semibold hover:bg-[#122e57] transition-all shadow-xs"
              >
                <Eye className="w-4 h-4" />
                <span>View Live Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-all shadow-2xs"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Link Copied!" : "Copy Share Link"}</span>
              </button>

              <button
                type="button"
                onClick={onUnpublish}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-700 transition-all shadow-2xs"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Unpublish</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => onPublish()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              <Globe className="w-4 h-4" />
              <span>Publish Public Portfolio</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left 2 Columns: Profile Editor Form ── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Professional Bio & Public Info</h3>
              <button
                type="button"
                onClick={handleManualSave}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#173B70] text-xs font-semibold hover:bg-blue-100 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saveFeedback ? "Saved!" : "Auto-Saved"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  value={portfolio.displayName}
                  onChange={(e) => onUpdatePortfolio({ displayName: e.target.value })}
                  placeholder="e.g. Shahid Kouluri"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#173B70]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Public URL Slug
                </label>
                <div className="flex items-center rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-xs text-slate-500">
                  <span className="font-mono text-slate-400">/portfolio/</span>
                  <input
                    type="text"
                    value={portfolio.slug}
                    onChange={(e) =>
                      onUpdatePortfolio({
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                      })
                    }
                    className="flex-1 bg-transparent text-slate-800 font-mono focus:outline-none pl-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Professional Headline
              </label>
              <input
                type="text"
                value={portfolio.headline}
                onChange={(e) => onUpdatePortfolio({ headline: e.target.value })}
                placeholder="e.g. Full-Stack Software Engineer & Frontend Specialist"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#173B70]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Short Bio
              </label>
              <textarea
                rows={3}
                value={portfolio.bio}
                onChange={(e) => onUpdatePortfolio({ bio: e.target.value })}
                placeholder="Share your learning journey, technical focus, and engineering philosophy..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#173B70]"
              />
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <GithubIcon size={14} className="text-slate-700" />
                  <span>GitHub Profile URL</span>
                </label>
                <input
                  type="url"
                  value={portfolio.githubUrl}
                  onChange={(e) => onUpdatePortfolio({ githubUrl: e.target.value })}
                  placeholder="https://github.com/your-username"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#173B70]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <LinkedinIcon size={14} className="text-blue-600" />
                  <span>LinkedIn Profile URL</span>
                </label>
                <input
                  type="url"
                  value={portfolio.linkedinUrl}
                  onChange={(e) => onUpdatePortfolio({ linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#173B70]"
                />
              </div>
            </div>

            {/* Skills Tags */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Showcased Technical Skills
              </label>
              <div className="flex flex-wrap gap-1.5">
                {portfolio.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-rose-600 ml-1"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1 max-w-sm">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="Add skill (e.g. Next.js, Docker)..."
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#173B70]"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 rounded-lg bg-[#173B70] text-white text-xs font-semibold hover:bg-[#122e57]"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* ── Project Selection for Portfolio ── */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Showcase Projects in Portfolio</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Check the projects you want displayed on your public portfolio page.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700">
                {portfolio.selectedProjectIds?.length || 0} Selected
              </span>
            </div>

            {eligibleProjects.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 rounded-xl bg-slate-50 border border-dashed border-slate-200">
                <p>You haven&apos;t started any projects yet.</p>
                <p className="mt-1">
                  Start or complete practical projects to select them for your portfolio.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {eligibleProjects.map((p) => {
                  const isSelected = portfolio.selectedProjectIds?.includes(p.id);
                  const rec = records[p.id];

                  return (
                    <div
                      key={p.id}
                      onClick={() => onToggleProjectSelection(p.id)}
                      className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-blue-50/40 border-blue-200 shadow-2xs"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleProjectSelection(p.id)}
                          className="mt-1 w-4 h-4 rounded text-[#173B70] focus:ring-[#173B70] cursor-pointer"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-slate-900">{p.title}</span>
                            <span className="px-2 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                              {p.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">{p.tagline}</p>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {p.skillsRequired.slice(0, 3).map((s) => (
                              <span key={s} className="text-[10px] text-slate-500 px-1.5 py-0.2 rounded bg-slate-100">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="text-[11px] font-bold text-slate-600 block">
                          Status: {rec?.status || "In Progress"}
                        </span>
                        {rec?.submission?.repositoryUrl && (
                          <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                            Repo Attached
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Right Column: Live Portfolio Card Preview ── */}
        <div className="space-y-4">
          <div className="sticky top-6 p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-[#173B70] text-white shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Public Card Preview
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-slate-200">
                Responsive
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-white">
                {portfolio.displayName || "Your Name"}
              </h4>
              <p className="text-xs text-blue-200 font-medium">
                {portfolio.headline || "Your Professional Headline"}
              </p>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {portfolio.bio || "Your short bio description will appear here on your public portfolio page."}
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <span className="text-[11px] font-bold text-slate-300 block">Featured Skills:</span>
              <div className="flex flex-wrap gap-1">
                {portfolio.skills.slice(0, 5).map((skill) => (
                  <span key={skill} className="px-2 py-0.5 rounded bg-white/10 text-slate-200 text-[10px]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <span className="text-[11px] font-bold text-slate-300 block">
                Showcased Projects ({selectedProjects.length}):
              </span>
              {selectedProjects.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedProjects.map((p) => (
                    <div key={p.id} className="p-2 rounded-lg bg-white/10 text-xs text-slate-200 flex items-center justify-between">
                      <span className="font-semibold truncate">{p.title}</span>
                      <span className="text-[10px] text-blue-300 shrink-0">{p.category}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No projects selected yet.</p>
              )}
            </div>

            <div className="pt-3 border-t border-white/10">
              <Link
                href={publicUrl}
                target="_blank"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all shadow-sm"
              >
                <span>Preview Public Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
