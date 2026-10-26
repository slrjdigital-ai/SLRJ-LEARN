"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ROADMAP_TRACKS, ROADMAP_STEPS, RoadmapTrack } from "@/data/roadmap";
import { useCourseProgress } from "@/lib/courseProgress";
import { useRoadmapProgress } from "@/lib/roadmapProgress";
import { useRoadmapDetailedProgress } from "@/lib/courseProgressMetrics";
import {
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Award,
  Bookmark,
  BookmarkCheck,
  Code2,
  Search,
  Terminal,
  Globe,
  BarChart3,
  Check,
  Cpu,
  ShieldCheck,
  FolderGit2,
} from "lucide-react";

export const PRIMARY_ROLE_IDS = [
  "fullstack",
  "frontend",
  "backend",
  "ai-ml",
  "ai-agents",
  "dsa",
  "java",
  "data-analyst",
  "cloud-devops",
  "python",
];

const DOMAIN_CATEGORIES = [
  "All Roles",
  "Web Development",
  "AI & Data Science",
  "Systems & Software Engineering",
  "Cloud & Cybersecurity",
  "Programming & Scripting",
] as const;

type DomainCategory = (typeof DOMAIN_CATEGORIES)[number];

function getTrackIcon(iconName: string, className = "w-6 h-6") {
  switch (iconName) {
    case "Globe":
      return <Globe className={className} />;
    case "Terminal":
      return <Terminal className={className} />;
    case "Layers":
      return <Layers className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "BarChart3":
      return <BarChart3 className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    case "Cpu":
      return <Cpu className={className} />;
    default:
      return <Code2 className={className} />;
  }
}

interface RoadmapHubCardItemProps {
  track: RoadmapTrack;
  isSaved?: boolean;
  onToggleSave: (trackId: string) => void;
}

function RoadmapHubCardItem({ track, isSaved, onToggleSave }: RoadmapHubCardItemProps) {
  const detailedProgress = useRoadmapDetailedProgress(track.id);
  const steps = useMemo(() => ROADMAP_STEPS.filter((s) => s.trackId === track.id), [track.id]);

  // Circular progress calculations (consistent with CourseCard)
  const radius = 18;
  const circumference = 2 * Math.PI * radius; // ~113.1
  const strokeDashoffset =
    circumference - (circumference * Math.min(100, Math.max(0, detailedProgress.overallPercentage))) / 100;

  return (
    <div className="flex flex-col justify-between overflow-hidden bg-white rounded-3xl border-2 border-slate-200/90 hover:border-[#12316B] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out group cursor-pointer relative">
      {/* ── Top Level Accent Gradient Stripe ── */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#173B70] via-[#12316B] to-[#18B6D2] group-hover:h-2 transition-all duration-300" />

      <div className="p-6 sm:p-7 space-y-4">
        {/* Top Header: Badge & Level on Left, Progress Circle & Save on Right */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#12316B]/10 text-[#12316B] border border-[#12316B]/20 font-mono shadow-2xs">
              {track.badge}
            </span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100">
              {track.level}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* ── Circular Progress Ring (Processes according to inside topics) ── */}
            <div
              className="flex flex-col items-center shrink-0"
              suppressHydrationWarning
              title={`Roadmap Progress: ${detailedProgress.overallPercentage}% (Topics: ${detailedProgress.completedTopics}/${detailedProgress.totalTopics}, Notes: ${detailedProgress.completedNotes}/${detailedProgress.totalNotes}, Quizzes: ${detailedProgress.completedQuizzes}/${detailedProgress.totalQuizzes}, Code: ${detailedProgress.completedCode}/${detailedProgress.totalCode})`}
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 44 44">
                  {/* Background track circle */}
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    strokeWidth="3.5"
                    fill="transparent"
                    className="stroke-slate-200"
                  />
                  {/* Animated progress circle */}
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    strokeWidth="3.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className={`transition-all duration-500 ease-out ${
                      detailedProgress.isCompleted
                        ? "stroke-emerald-600"
                        : detailedProgress.overallPercentage > 0
                        ? "stroke-[#12316B]"
                        : "stroke-slate-300"
                    }`}
                  />
                </svg>

                {/* Center value */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {detailedProgress.isCompleted ? (
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  ) : (
                    <span
                      suppressHydrationWarning
                      className={`text-[11px] font-black font-mono ${
                        detailedProgress.overallPercentage > 0 ? "text-[#12316B]" : "text-slate-500"
                      }`}
                    >
                      {detailedProgress.overallPercentage}%
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono mt-0.5">
                Progress
              </span>
            </div>

            {/* Bookmark button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleSave(track.id);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#12316B] hover:bg-slate-100 transition-colors cursor-pointer self-start mt-0.5"
              title={isSaved ? "Saved to your list" : "Save this career roadmap"}
            >
              {isSaved ? (
                <BookmarkCheck size={18} className="text-[#12316B]" />
              ) : (
                <Bookmark size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Role Title with Icon */}
        <Link href={`/roadmap/${track.id}`} className="block">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-[#12316B] group-hover:text-white text-[#12316B] flex items-center justify-center shrink-0 transition-colors shadow-2xs group-hover:scale-105">
              {getTrackIcon(track.icon, "w-6 h-6")}
            </div>
            <div>
              <h3 className="font-black text-xl sm:text-2xl text-slate-950 group-hover:text-[#12316B] transition-colors leading-snug">
                {track.name}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 mt-1 font-semibold">
                <span className="flex items-center gap-1">
                  <Clock size={13} className="text-slate-500" />
                  {track.duration.replace(" (Estimated)", "")}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="font-mono font-bold text-[#12316B]">
                  {steps.length} Courses
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
          {track.description}
        </p>

        {/* Real-time Inside Topics Progress Breakdown */}
        <div suppressHydrationWarning className="p-3 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-4 gap-1.5 text-center text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase text-slate-500 block font-mono">
              Topics
            </span>
            <span suppressHydrationWarning className="font-mono font-bold text-slate-900 text-xs">
              {detailedProgress.completedTopics}/{detailedProgress.totalTopics}
            </span>
          </div>
          <div className="space-y-0.5 border-l border-slate-200">
            <span className="text-[10px] font-black uppercase text-slate-500 block font-mono">
              Notes
            </span>
            <span suppressHydrationWarning className="font-mono font-bold text-slate-900 text-xs">
              {detailedProgress.completedNotes}/{detailedProgress.totalNotes}
            </span>
          </div>
          <div className="space-y-0.5 border-l border-slate-200">
            <span className="text-[10px] font-black uppercase text-slate-500 block font-mono">
              Quizzes
            </span>
            <span suppressHydrationWarning className="font-mono font-bold text-slate-900 text-xs">
              {detailedProgress.completedQuizzes}/{detailedProgress.totalQuizzes}
            </span>
          </div>
          <div className="space-y-0.5 border-l border-slate-200">
            <span className="text-[10px] font-black uppercase text-slate-500 block font-mono">
              Coding
            </span>
            <span suppressHydrationWarning className="font-mono font-bold text-slate-900 text-xs">
              {detailedProgress.completedCode}/{detailedProgress.totalCode}
            </span>
          </div>
        </div>

        {/* List of Actual Provided Course Names in this Pathway */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="text-xs font-black text-slate-700 uppercase tracking-wider font-mono">
            Curriculum Courses ({steps.length}):
          </div>
          <div className="space-y-1.5">
            {steps.slice(0, 3).map((st, sIdx) => (
              <div
                key={st.id}
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-bold truncate"
              >
                <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px] flex items-center justify-center shrink-0 font-extrabold border border-slate-200">
                  {sIdx + 1}
                </span>
                <span className="truncate group-hover:text-[#12316B] transition-colors">
                  {st.title}
                </span>
              </div>
            ))}
            {steps.length > 3 && (
              <div className="text-xs text-[#12316B] font-extrabold pl-7">
                + {steps.length - 3} more sequenced courses →
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Area: Progress & Big CTA Button */}
      <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 space-y-3 mt-auto">
        <div className="flex items-center justify-between text-xs sm:text-sm pt-3">
          <span className="font-bold text-slate-600">Roadmap Progress</span>
          {detailedProgress.isCompleted ? (
            <span className="font-extrabold text-emerald-800 flex items-center gap-1 font-mono">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>100% Completed</span>
            </span>
          ) : detailedProgress.overallPercentage > 0 ? (
            <span className="font-extrabold text-[#12316B] flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#18B6D2] animate-pulse" />
              <span>{detailedProgress.overallPercentage}% In Progress</span>
            </span>
          ) : (
            <span className="text-slate-500 font-medium">Ready to Start</span>
          )}
        </div>

        <Link
          href={`/roadmap/${track.id}`}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#12316B] group-hover:bg-[#173B70] text-white text-sm sm:text-base font-extrabold shadow-sm transition-all duration-150"
        >
          <span>Explore Roadmap Pathway</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function MyLearningRoadmapHub() {
  const { allProgress } = useCourseProgress();
  const { progressMap, toggleSave } = useRoadmapProgress();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<DomainCategory>("All Roles");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Primary Career Tracks (10 industry roles)
  const primaryTracks = useMemo(() => {
    return ROADMAP_TRACKS.filter((t) => PRIMARY_ROLE_IDS.includes(t.id));
  }, []);

  // Filtered tracks based on domain category and search query
  const filteredTracks = useMemo(() => {
    return primaryTracks.filter((track) => {
      if (selectedCategory !== "All Roles" && track.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = track.name.toLowerCase().includes(q);
        const matchDesc = track.description.toLowerCase().includes(q);
        const matchSkills = track.skills.some((s) => s.toLowerCase().includes(q));
        const matchCourses = ROADMAP_STEPS.filter((s) => s.trackId === track.id).some((s) =>
          s.title.toLowerCase().includes(q)
        );
        return matchTitle || matchDesc || matchSkills || matchCourses;
      }
      return true;
    });
  }, [primaryTracks, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 sm:space-y-10 pb-20">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO HEADER: SLRJ Learn Role-Based Roadmaps (Compact & Sleek)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1e40] via-[#12316B] to-[#173B70] text-white p-6 sm:p-8 lg:p-9 shadow-lg border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#18B6D2]/20 via-blue-400/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -mb-20" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#18B6D2] border border-white/20 text-xs font-bold uppercase tracking-wider font-mono">
              <Sparkles size={14} className="text-[#18B6D2]" />
              <span>SLRJ Learn • Structured Career Roadmaps</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-blue-200">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
                21 Courses
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold">
                10 Pathways
              </span>
            </div>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-brand tracking-tight text-white leading-tight">
              Role-Based Career Roadmaps
            </h1>
            <p className="text-blue-100/95 text-base sm:text-lg leading-relaxed font-normal">
              Step-by-step career pathways engineered directly from our <strong className="text-white font-bold">21 comprehensive courses</strong>. Click any role roadmap to open its dedicated stage-by-stage curriculum with interactive code exercises, verified PDF study guides, and milestone projects.
            </p>
          </div>

          {/* Compact Platform Value Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-white/15">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-[#18B6D2] flex items-center justify-center shrink-0">
                <BookOpen size={15} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white truncate">21 Courses</div>
                <p className="text-[11px] text-blue-200/80 truncate">Industry curriculum</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-[#18B6D2] flex items-center justify-center shrink-0">
                <Layers size={15} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white truncate">Sequenced Stages</div>
                <p className="text-[11px] text-blue-200/80 truncate">Step-by-step roadmap</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-[#18B6D2] flex items-center justify-center shrink-0">
                <FolderGit2 size={15} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white truncate">Hands-on Labs</div>
                <p className="text-[11px] text-blue-200/80 truncate">Portfolio deliverables</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-[#18B6D2] flex items-center justify-center shrink-0">
                <Award size={15} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white truncate">Certificates</div>
                <p className="text-[11px] text-blue-200/80 truncate">Verified credentials</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. SEARCH & DOMAIN CATEGORY FILTER BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-brand">
              Choose Your Career Roadmap
            </h2>
            <p className="text-sm sm:text-base text-slate-700 mt-0.5">
              Showing {filteredTracks.length} comprehensive career pathways. Click any card to open its full dedicated roadmap.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-88">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search role, course name, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50/70 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-hidden focus:border-[#12316B] focus:bg-white transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          {DOMAIN_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#12316B] text-white shadow-xs ring-2 ring-[#12316B]/20"
                    : "bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200/90"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. CAREER ROLES GRID (Direct Link to Dedicated Page)
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTracks.map((track) => (
            <RoadmapHubCardItem
              key={track.id}
              track={track}
              isSaved={progressMap[track.id]?.isSaved}
              onToggleSave={toggleSave}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
