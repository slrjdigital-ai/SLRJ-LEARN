"use client";

import { useState, useMemo, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { ROADMAP_TRACKS, ROADMAP_STEPS, RoadmapTrack, RoadmapStep } from "@/data/roadmap";
import { useAuth } from "@/context/AuthContext";
import {
  Globe,
  Layers,
  Code2,
  Coffee,
  Sparkles,
  BarChart3,
  Smartphone,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  ArrowRight,
  Search,
  Filter,
  Trophy,
  Bot,
  Rocket,
  Zap,
  RotateCcw,
  Check,
  Eye,
  Award,
  X,
  ChevronRight,
  GraduationCap,
  LayoutGrid,
  ListOrdered,
  BookMarked,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "slrj_webdev_roadmap_progress";
const ENROLL_KEY = "slrj_enrolled_learning_paths";

const TRACK_ICONS: Record<string, React.ElementType> = {
  frontend: Globe,
  fullstack: Layers,
  python: Code2,
  java: Coffee,
  "ai-ml": Sparkles,
  "data-analyst": BarChart3,
  mobile: Smartphone,
};

// Safe external store for localStorage to avoid React 19 hydration mismatches
function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getProgressSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem(STORAGE_KEY) || "[]";
}

function getEnrollSnapshot(): string {
  if (typeof window === "undefined") return '["frontend"]';
  return localStorage.getItem(ENROLL_KEY) || '["frontend"]';
}

function getServerSnapshot(): string {
  return "[]";
}

function getServerEnrollSnapshot(): string {
  return '["frontend"]';
}

export default function LearningPathDashboard() {
  const { user, toggleRoadmapStep } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [previewTrack, setPreviewTrack] = useState<RoadmapTrack | null>(null);

  const rawProgress = useSyncExternalStore(subscribe, getProgressSnapshot, getServerSnapshot);
  const rawEnrolled = useSyncExternalStore(subscribe, getEnrollSnapshot, getServerEnrollSnapshot);

  const localCompletedSteps: number[] = useMemo(() => {
    try {
      return JSON.parse(rawProgress);
    } catch {
      return [];
    }
  }, [rawProgress]);

  const enrolledTracks: string[] = useMemo(() => {
    try {
      return JSON.parse(rawEnrolled);
    } catch {
      return ["frontend"];
    }
  }, [rawEnrolled]);

  const completedSteps = user ? user.completedRoadmapSteps : localCompletedSteps;
  const isClient = typeof window !== "undefined";

  // Handle Enrollment
  const handleEnroll = (trackId: string) => {
    if (!enrolledTracks.includes(trackId)) {
      const next = [...enrolledTracks, trackId];
      localStorage.setItem(ENROLL_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("storage"));
    }
  };

  // Toggle Step Completion
  const toggleStep = (stepId: number) => {
    if (user) {
      toggleRoadmapStep(stepId);
    }
    const next = completedSteps.includes(stepId)
      ? completedSteps.filter((id) => id !== stepId)
      : [...completedSteps, stepId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("storage"));
  };

  // Trigger Lumio AI Chatbot
  const handleAskLumio = (step: RoadmapStep, trackName: string) => {
    if (typeof window !== "undefined") {
      const prompt = `Can you guide me through Roadmap Stage: "${step.title}" in the ${trackName} path?
Explain the core concepts clearly in simple language, what common beginner mistakes to avoid, and step-by-step guidance on how to build: "${step.practicalMilestone}".`;
      window.dispatchEvent(
        new CustomEvent("open-lumio", {
          detail: {
            prompt,
            mode: "explain",
          },
        })
      );
    }
  };

  // Calculate track progress
  const getTrackStats = (trackId: string) => {
    const trackSteps = ROADMAP_STEPS.filter((s) => s.trackId === trackId);
    const total = trackSteps.length;
    const completed = trackSteps.filter((s) => completedSteps.includes(s.id)).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent, steps: trackSteps };
  };

  // Filter paths
  const filteredTracks = useMemo(() => {
    return ROADMAP_TRACKS.filter((track) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = track.name.toLowerCase().includes(q);
        const matchesDesc = track.description.toLowerCase().includes(q);
        const matchesSkills = track.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesSkills) return false;
      }

      // Level
      if (levelFilter !== "all" && track.level.toLowerCase() !== levelFilter.toLowerCase()) {
        return false;
      }

      // Status
      const stats = getTrackStats(track.id);
      const isEnrolled = enrolledTracks.includes(track.id);
      if (statusFilter === "enrolled" && !isEnrolled) return false;
      if (statusFilter === "completed" && stats.percent !== 100) return false;
      if (statusFilter === "inprogress" && (stats.percent === 0 || stats.percent === 100)) return false;

      return true;
    });
  }, [searchQuery, levelFilter, statusFilter, enrolledTracks, completedSteps]);

  return (
    <div className="w-full space-y-12">
      {/* ─── Filter & Search Bar ─── */}
      <div className="p-4 rounded-3xl bg-[#060a14] border border-white/10 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search paths by title, skills (e.g. React, Python, SQL, Machine Learning)..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400/50 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
          {/* Level Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10">
            {["all", "beginner", "intermediate", "advanced"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl uppercase transition-all cursor-pointer ${
                  levelFilter === lvl
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-mono font-bold focus:outline-none focus:border-cyan-400/50 cursor-pointer"
          >
            <option value="all" className="bg-[#0b1222] text-white">All Paths</option>
            <option value="enrolled" className="bg-[#0b1222] text-cyan-300">My Enrolled Paths</option>
            <option value="inprogress" className="bg-[#0b1222] text-amber-300">In Progress</option>
            <option value="completed" className="bg-[#0b1222] text-emerald-300">Completed (100%)</option>
          </select>
        </div>
      </div>

      {/* ─── Learning Path Cards Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {filteredTracks.map((track) => {
          const Icon = TRACK_ICONS[track.id] || Globe;
          const stats = getTrackStats(track.id);
          const isEnrolled = enrolledTracks.includes(track.id);

          return (
            <motion.div
              key={track.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative group ${
                isEnrolled
                  ? "bg-gradient-to-b from-[#080e1e] to-[#040812] border-cyan-500/30 shadow-[0_15px_35px_rgba(6,182,212,0.15)]"
                  : "bg-gradient-to-b from-[#070b16] to-[#030610] border-white/10 hover:border-white/20 shadow-xl"
              }`}
            >
              {/* Top Laser Accent */}
              <div className={`absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r ${track.gradient}`} />

              <div className="p-6 sm:p-7">
                {/* Header: Badge, Level & Duration */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all shadow-inner">
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        {track.badge}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      track.level === "Beginner"
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                        : track.level === "Intermediate"
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        : "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                    }`}
                  >
                    {track.level}
                  </span>
                </div>

                {/* Path Title & Description */}
                <h3 className="text-xl sm:text-2xl font-black text-white font-brand mb-2 tracking-tight group-hover:text-cyan-200 transition-colors">
                  {track.name}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 min-h-[42px] line-clamp-2">
                  {track.description}
                </p>

                {/* Path Meta: Stages, Lessons, Duration */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-center mb-5">
                  <div>
                    <span className="text-slate-400 text-[10px] font-mono uppercase block">Stages</span>
                    <span className="text-white font-bold text-sm font-brand">{track.totalStages} Stages</span>
                  </div>
                  <div className="border-x border-white/5">
                    <span className="text-slate-400 text-[10px] font-mono uppercase block">Lessons</span>
                    <span className="text-white font-bold text-sm font-brand">{track.totalLessons} Lessons</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-mono uppercase block">Duration</span>
                    <span className="text-cyan-300 font-bold text-xs sm:text-sm font-mono truncate block">{track.duration}</span>
                  </div>
                </div>

                {/* Skills Acquire Chips */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Skills You Will Acquire:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {track.skills.slice(0, 5).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2.5 py-0.5 rounded-xl bg-white/[0.04] border border-white/5 text-slate-300 font-sans"
                      >
                        {skill}
                      </span>
                    ))}
                    {track.skills.length > 5 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-xl bg-white/[0.02] text-slate-400 font-mono">
                        +{track.skills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar (For Enrolled) */}
                <div className="mb-5 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">
                      {isEnrolled ? "Learning Progress" : "Not Enrolled"}
                    </span>
                    <span className={stats.percent > 0 ? "text-cyan-300 font-bold" : "text-slate-500"}>
                      {isClient ? `${stats.percent}% (${stats.completed}/${stats.total})` : `0% (0/${stats.total})`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full bg-gradient-to-r ${track.gradient} transition-all duration-500`}
                      style={{ width: `${isClient && isEnrolled ? stats.percent : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons: Enroll/Continue & Preview */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
                <Link
                  href={`/roadmap/${track.id}`}
                  onClick={() => handleEnroll(track.id)}
                  className={`w-full py-3 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    isEnrolled
                      ? "bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-extrabold shadow-cyan-500/20"
                      : "bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-cyan-400/40"
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <span>Continue Learning</span>
                      <ArrowRight size={15} />
                    </>
                  ) : (
                    <>
                      <span>Enroll Free</span>
                      <Sparkles size={14} className="text-amber-300" />
                    </>
                  )}
                </Link>

                <button
                  onClick={() => setPreviewTrack(track)}
                  className="w-full py-3 px-3 rounded-2xl font-bold text-xs sm:text-sm bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 hover:border-cyan-400/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye size={15} className="text-cyan-400" />
                  <span>Preview</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── ROADMAP PREVIEW MODAL ─── */}
      <AnimatePresence>
        {previewTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl max-h-[85vh] bg-[#070b16] border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
            >
              {/* Header */}
              <div className="p-6 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                      Roadmap Curriculum Preview
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {previewTrack.totalStages} Stages
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-brand">
                    {previewTrack.name}
                  </h3>
                </div>

                <button
                  onClick={() => setPreviewTrack(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Curriculum List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3.5 divide-y divide-white/5">
                {ROADMAP_STEPS.filter((s) => s.trackId === previewTrack.id).map((step) => {
                  const stepNum = String(step.stepNumber).padStart(2, "0");
                  return (
                    <div key={step.id} className="pt-3.5 first:pt-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          STAGE {stepNum} • {step.category}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">{step.duration}</span>
                      </div>
                      <h5 className="font-bold text-white text-sm mb-1">{step.title.replace(/^\d+\.\s*/, "")}</h5>
                      <p className="text-xs text-slate-400 mb-2">{step.summary}</p>
                      <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-cyan-200">
                        <strong className="text-cyan-400">Milestone:</strong> {step.practicalMilestone}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-5 bg-white/[0.03] border-t border-white/10 flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-slate-400">
                  Ready to start this career track?
                </span>
                <Link
                  href={`/roadmap/${previewTrack.id}`}
                  onClick={() => {
                    handleEnroll(previewTrack.id);
                    setPreviewTrack(null);
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Start Curriculum Now</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
