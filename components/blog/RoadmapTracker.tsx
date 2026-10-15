"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { ROADMAP_TRACKS, getRoadmapStepsByTrack, RoadmapStep } from "@/data/roadmap";
import { useAuth } from "@/context/AuthContext";
import {
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
  Globe,
  Code2,
  Cpu,
  Cloud,
  Layers,
  Coffee,
  BarChart3,
  Smartphone,
  Search,
  Filter,
  Check,
  Bot,
  BookOpen,
  Rocket,
  Zap,
  RotateCcw,
  LayoutList,
  LayoutGrid,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "slrj_webdev_roadmap_progress";

const TRACK_ICONS: Record<string, React.ElementType> = {
  frontend: Globe,
  fullstack: Layers,
  python: Code2,
  java: Coffee,
  "ai-ml": Sparkles,
  "data-analyst": BarChart3,
  mobile: Smartphone,
  "web-dev": Globe,
};

const TRACK_THEMES: Record<
  string,
  {
    border: string;
    activeBorder: string;
    bgGradient: string;
    accent: string;
    accentBg: string;
    glow: string;
    progressGrad: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  frontend: {
    border: "border-cyan-500/20",
    activeBorder: "border-cyan-400",
    bgGradient: "from-cyan-950/40 via-[#070e1c] to-[#040814]",
    accent: "text-cyan-400",
    accentBg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
    glow: "shadow-[0_0_30px_rgba(6,182,212,0.25)]",
    progressGrad: "from-cyan-400 via-teal-400 to-emerald-400",
    badgeBg: "bg-cyan-500/20",
    badgeText: "text-cyan-300",
  },
  fullstack: {
    border: "border-indigo-500/20",
    activeBorder: "border-indigo-400",
    bgGradient: "from-indigo-950/40 via-[#0a0c1a] to-[#040814]",
    accent: "text-indigo-400",
    accentBg: "bg-indigo-500/15 border-indigo-500/30 text-indigo-300",
    glow: "shadow-[0_0_30px_rgba(99,102,241,0.25)]",
    progressGrad: "from-indigo-400 via-violet-400 to-purple-400",
    badgeBg: "bg-indigo-500/20",
    badgeText: "text-indigo-300",
  },
  python: {
    border: "border-emerald-500/20",
    activeBorder: "border-emerald-400",
    bgGradient: "from-emerald-950/40 via-[#06140e] to-[#040814]",
    accent: "text-emerald-400",
    accentBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    progressGrad: "from-emerald-400 via-teal-400 to-lime-400",
    badgeBg: "bg-emerald-500/20",
    badgeText: "text-emerald-300",
  },
  java: {
    border: "border-amber-500/20",
    activeBorder: "border-amber-400",
    bgGradient: "from-amber-950/40 via-[#140e07] to-[#040814]",
    accent: "text-amber-400",
    accentBg: "bg-amber-500/15 border-amber-500/30 text-amber-300",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    progressGrad: "from-amber-400 via-orange-400 to-yellow-400",
    badgeBg: "bg-amber-500/20",
    badgeText: "text-amber-300",
  },
  "ai-ml": {
    border: "border-purple-500/20",
    activeBorder: "border-purple-400",
    bgGradient: "from-purple-950/40 via-[#120a1c] to-[#040814]",
    accent: "text-purple-400",
    accentBg: "bg-purple-500/15 border-purple-500/30 text-purple-300",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    progressGrad: "from-purple-400 via-violet-400 to-pink-400",
    badgeBg: "bg-purple-500/20",
    badgeText: "text-purple-300",
  },
  "data-analyst": {
    border: "border-teal-500/20",
    activeBorder: "border-teal-400",
    bgGradient: "from-teal-950/40 via-[#07151a] to-[#040814]",
    accent: "text-teal-400",
    accentBg: "bg-teal-500/15 border-teal-500/30 text-teal-300",
    glow: "shadow-[0_0_30px_rgba(20,184,166,0.25)]",
    progressGrad: "from-teal-400 via-cyan-400 to-blue-400",
    badgeBg: "bg-teal-500/20",
    badgeText: "text-teal-300",
  },
  mobile: {
    border: "border-rose-500/20",
    activeBorder: "border-rose-400",
    bgGradient: "from-rose-950/40 via-[#170810] to-[#040814]",
    accent: "text-rose-400",
    accentBg: "bg-rose-500/15 border-rose-500/30 text-rose-300",
    glow: "shadow-[0_0_30px_rgba(244,63,94,0.25)]",
    progressGrad: "from-rose-400 via-pink-400 to-orange-400",
    badgeBg: "bg-rose-500/20",
    badgeText: "text-rose-300",
  },
};

// Safe external store for localStorage to avoid React 19 hydration mismatches
function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem(STORAGE_KEY) || "[]";
}

function getServerSnapshot(): string {
  return "[]";
}

export default function RoadmapTracker() {
  const { user, toggleRoadmapStep } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState<string>("frontend");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline");

  const rawCompleted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const localCompletedSteps: number[] = useMemo(() => {
    try {
      return JSON.parse(rawCompleted);
    } catch {
      return [];
    }
  }, [rawCompleted]);

  const completedSteps = user ? user.completedRoadmapSteps : localCompletedSteps;
  const isClient = typeof window !== "undefined";

  const allStagesInTrack = useMemo(() => getRoadmapStepsByTrack(selectedTrack), [selectedTrack]);
  const activeTrackMeta = ROADMAP_TRACKS.find((t) => t.id === selectedTrack) || ROADMAP_TRACKS[0];
  const activeTheme = TRACK_THEMES[selectedTrack] || TRACK_THEMES["web-dev"];

  const totalStepsInTrack = allStagesInTrack.length;
  const completedCountInTrack = allStagesInTrack.filter((s) => completedSteps.includes(s.id)).length;
  const progressPercent = totalStepsInTrack > 0 ? Math.round((completedCountInTrack / totalStepsInTrack) * 100) : 0;
  const totalXPEarned = completedCountInTrack * 50;

  // Filtered steps
  const filteredStages = useMemo(() => {
    return allStagesInTrack.filter((step) => {
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = step.title.toLowerCase().includes(query);
        const matchesCategory = step.category.toLowerCase().includes(query);
        const matchesTopics = step.keyTopics.some((t) => t.toLowerCase().includes(query));
        const matchesMilestone = step.practicalMilestone.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCategory && !matchesTopics && !matchesMilestone) {
          return false;
        }
      }

      // Difficulty match
      if (difficultyFilter !== "all" && step.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) {
        return false;
      }

      // Status match
      const isDone = completedSteps.includes(step.id);
      if (statusFilter === "completed" && !isDone) return false;
      if (statusFilter === "todo" && isDone) return false;

      return true;
    });
  }, [allStagesInTrack, searchQuery, difficultyFilter, statusFilter, completedSteps]);

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

  const handleAskLumio = (step: RoadmapStep) => {
    if (typeof window !== "undefined") {
      const prompt = `Can you guide me through Roadmap Stage: "${step.title}" (${activeTrackMeta.name})? 
Explain the core concepts simply, what common mistakes to avoid, and how to build the milestone project: "${step.practicalMilestone}".`;
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

  const resetProgress = () => {
    if (confirm(`Reset progress for ${activeTrackMeta.name}? All checks for this track will be cleared.`)) {
      const stepIdsToRemove = new Set(allStagesInTrack.map((s) => s.id));
      const next = completedSteps.filter((id) => !stepIdsToRemove.has(id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* ─── 1. TRACK SELECTOR TABS ─────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            <Sparkles size={14} className={activeTheme.accent} />
            <span>Select Learning Track ({ROADMAP_TRACKS.length} Paths)</span>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {isClient ? `${completedSteps.length} stages completed globally` : "0 completed"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ROADMAP_TRACKS.map((track) => {
            const isSelected = selectedTrack === track.id;
            const Icon = TRACK_ICONS[track.id] || Globe;
            const trackTheme = TRACK_THEMES[track.id] || TRACK_THEMES["web-dev"];
            const trackStages = getRoadmapStepsByTrack(track.id);
            const doneCount = trackStages.filter((s) => completedSteps.includes(s.id)).length;
            const trackPercent = trackStages.length > 0 ? Math.round((doneCount / trackStages.length) * 100) : 0;

            return (
              <button
                key={track.id}
                onClick={() => {
                  setSelectedTrack(track.id);
                  setSearchQuery("");
                }}
                className={`relative p-4 rounded-2xl text-left border transition-all cursor-pointer group flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-b ${trackTheme.bgGradient} ${trackTheme.activeBorder} ${trackTheme.glow} ring-1 ring-white/10`
                    : "bg-[#070b15]/90 border-white/[0.08] hover:border-white/20 hover:bg-[#0b1222]/80"
                }`}
              >
                {/* Top laser accent for active tab */}
                {isSelected && (
                  <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${trackTheme.progressGrad}`} />
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`p-2 rounded-xl transition-all ${
                        isSelected
                          ? trackTheme.accentBg
                          : "bg-white/[0.05] text-slate-400 group-hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isSelected
                          ? trackTheme.accentBg
                          : "bg-white/[0.04] text-slate-400 border border-white/5"
                      }`}
                    >
                      {track.badge}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-tight line-clamp-1 group-hover:text-cyan-200 transition-colors">
                    {track.name}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">
                    {track.totalStages} Stages • {track.duration}
                  </p>
                </div>

                {/* Progress bar inside card */}
                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                    <span className="text-slate-400">Progress</span>
                    <span className={doneCount > 0 ? `${trackTheme.accent} font-bold` : "text-slate-500"}>
                      {isClient ? `${doneCount}/${track.totalStages} (${trackPercent}%)` : `0/${track.totalStages}`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${trackTheme.progressGrad} transition-all duration-300`}
                      style={{ width: `${isClient ? trackPercent : 0}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 2. TRACK HERO & PROGRESS DASHBOARD ──────────────────────── */}
      <div className={`relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${activeTheme.bgGradient} border ${activeTheme.border} shadow-2xl overflow-hidden`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono font-bold mb-3">
              <span className={`w-2 h-2 rounded-full animate-pulse ${activeTheme.accent === "text-cyan-400" ? "bg-cyan-400" : "bg-emerald-400"}`} />
              <span className="text-slate-300 uppercase tracking-wider">{activeTrackMeta.badge}</span>
              <span className="text-slate-500">•</span>
              <span className={activeTheme.accent}>{activeTrackMeta.duration}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white font-brand tracking-tight mb-2">
              {activeTrackMeta.name}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {activeTrackMeta.description} Follow each stage step-by-step, check off skills, and build production-grade projects.
            </p>
          </div>

          {/* Gamified Progress Circle / Pill */}
          <div className="flex-shrink-0 flex items-center gap-6 p-4 rounded-2xl bg-[#030611]/80 border border-white/10 backdrop-blur-md">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-white font-brand">
                {isClient ? `${progressPercent}%` : "0%"}
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                Track Completion
              </div>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div className="text-center">
              <div className={`text-2xl sm:text-3xl font-black font-brand ${activeTheme.accent} flex items-center justify-center gap-1`}>
                <Zap size={20} className="fill-current" />
                <span>+{totalXPEarned}</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                XP Earned
              </div>
            </div>

            {completedCountInTrack > 0 && (
              <button
                onClick={resetProgress}
                title="Reset track progress"
                className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
            <span>
              Stage {completedCountInTrack} of {totalStepsInTrack} Mastered
            </span>
            <span className={activeTheme.accent}>
              {totalStepsInTrack - completedCountInTrack === 0
                ? "🎉 All stages completed! You are industry-ready."
                : `${totalStepsInTrack - completedCountInTrack} stages remaining`}
            </span>
          </div>
          <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
            <div
              className={`h-full bg-gradient-to-r ${activeTheme.progressGrad} transition-all duration-500`}
              style={{ width: `${isClient ? progressPercent : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── 3. FILTER, SEARCH & VIEW TOOLBAR ──────────────────────── */}
      <div className="p-3 sm:p-4 rounded-2xl bg-[#060a14] border border-white/[0.08] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-lg">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTrackMeta.name} stages, skills, or projects...`}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400/50 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {/* Difficulty Dropdown */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-mono font-medium focus:outline-none focus:border-cyan-400/50 cursor-pointer"
          >
            <option value="all" className="bg-[#0b1222] text-white">All Difficulties</option>
            <option value="beginner" className="bg-[#0b1222] text-emerald-400">Beginner</option>
            <option value="intermediate" className="bg-[#0b1222] text-amber-400">Intermediate</option>
            <option value="advanced" className="bg-[#0b1222] text-purple-400">Advanced</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-mono font-medium focus:outline-none focus:border-cyan-400/50 cursor-pointer"
          >
            <option value="all" className="bg-[#0b1222] text-white">All Statuses</option>
            <option value="todo" className="bg-[#0b1222] text-slate-300">To Do</option>
            <option value="completed" className="bg-[#0b1222] text-cyan-300">Completed</option>
          </select>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10">
            <button
              onClick={() => setViewMode("timeline")}
              title="Sequential Path View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "timeline"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutList size={16} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="Card Grid View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── 4. STAGES DISPLAY (EASY TO UNDERSTAND & CLEAN UI) ──────── */}
      {filteredStages.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-[#060a14] border border-white/5">
          <Search size={36} className="text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No matching stages found</h3>
          <p className="text-xs text-slate-400 mb-4">
            Try adjusting your search query or reset the difficulty and status filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setDifficultyFilter("all");
              setStatusFilter("all");
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "timeline" ? (
        /* ─── Clean Linear Sequential Pathway ─── */
        <div className="space-y-4">
          {filteredStages.map((step, idx) => {
            const isCompleted = isClient && completedSteps.includes(step.id);
            const stepNum = String(idx + 1).padStart(2, "0");

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                className={`relative rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isCompleted
                    ? "bg-gradient-to-r from-emerald-950/20 via-[#07131b] to-[#040814] border-emerald-500/30 shadow-[0_4px_25px_rgba(16,185,129,0.1)]"
                    : "bg-[#060a14] border-white/[0.08] hover:border-cyan-400/40 hover:bg-[#080e1c] shadow-md"
                }`}
              >
                {/* Accent line on left */}
                <div
                  className={`absolute left-0 inset-y-0 w-1.5 transition-all ${
                    isCompleted
                      ? "bg-gradient-to-b from-emerald-400 to-teal-400"
                      : "bg-slate-800 group-hover:bg-cyan-400"
                  }`}
                />

                <div className="p-5 sm:p-7 pl-6 sm:pl-8">
                  {/* Top Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-xs font-mono font-black px-2.5 py-1 rounded-xl border ${
                          isCompleted
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            : "bg-white/5 text-slate-300 border-white/10"
                        }`}
                      >
                        STAGE {stepNum}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400 px-2.5 py-1 rounded-xl bg-white/[0.03] border border-white/5">
                        {step.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-500" />
                        {step.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {/* Difficulty Badge */}
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          step.difficulty === "Beginner"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : step.difficulty === "Intermediate"
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                        }`}
                      >
                        {step.difficulty}
                      </span>

                      {/* Interactive Complete Toggle */}
                      <button
                        onClick={() => toggleStep(step.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          isCompleted
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20"
                            : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 size={14} className="text-emerald-400" />
                            <span>Done (+50 XP)</span>
                          </>
                        ) : (
                          <>
                            <Circle size={14} className="text-slate-400" />
                            <span>Mark Complete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Step Title & Simple Summary */}
                  <h3 className="text-lg sm:text-xl font-black text-white font-brand mb-2">
                    {step.title.replace(/^\d+\.\s*/, "")}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {step.summary}
                  </p>

                  {/* Skills / Key Concepts Tags (Clean & Compact) */}
                  <div className="mb-4">
                    <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Core Skills You Will Master:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {step.keyTopics.map((topic, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/5 text-slate-300 font-sans"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Milestone Project Card (Clear Deliverable) */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/25 text-slate-200 mb-4">
                    <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase font-mono tracking-wider mb-1">
                      <Rocket size={14} className="text-cyan-400" />
                      <span>Hands-On Milestone Project:</span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-200 font-medium">
                      {step.practicalMilestone}
                    </p>
                  </div>

                  {/* Action Bar: Ask Lumio AI & Linked Notes */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {/* Ask Lumio Button */}
                      <button
                        onClick={() => handleAskLumio(step)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-bold transition-all cursor-pointer shadow-sm"
                        title="Get Lumio AI guidance on this topic"
                      >
                        <Bot size={14} className="text-cyan-300 animate-pulse" />
                        <span>Ask Lumio to Explain</span>
                      </button>

                      {/* Practice link */}
                      <Link
                        href="/practice"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all"
                      >
                        <Code2 size={13} className="text-emerald-400" />
                        <span>Code in Playground</span>
                      </Link>
                    </div>

                    {/* Related Notes */}
                    {step.recommendedNotes && step.recommendedNotes.length > 0 && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-500 font-mono hidden sm:inline">Notes:</span>
                        {step.recommendedNotes.slice(0, 2).map((note, nIdx) => (
                          <Link
                            key={nIdx}
                            href={`/notes/${note.slug}`}
                            className="inline-flex items-center gap-1 text-cyan-300 hover:text-white hover:underline text-xs font-medium transition-colors"
                          >
                            <BookOpen size={12} />
                            <span className="truncate max-w-[140px] sm:max-w-[200px]">{note.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* ─── Compact Card Grid View ─── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStages.map((step, idx) => {
            const isCompleted = isClient && completedSteps.includes(step.id);
            const stepNum = String(idx + 1).padStart(2, "0");

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-5 rounded-3xl border flex flex-col justify-between transition-all ${
                  isCompleted
                    ? "bg-gradient-to-b from-emerald-950/20 to-[#050a14] border-emerald-500/30 shadow-md"
                    : "bg-[#060a14] border-white/10 hover:border-cyan-400/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-black text-cyan-300 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10">
                      STAGE {stepNum}
                    </span>
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        isCompleted ? "text-emerald-400 bg-emerald-500/20" : "text-slate-500 hover:text-white"
                      }`}
                      title={isCompleted ? "Mark incomplete" : "Mark complete"}
                    >
                      {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5 line-clamp-1">
                    {step.title.replace(/^\d+\.\s*/, "")}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                    {step.summary}
                  </p>

                  <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-slate-300 mb-3">
                    <div className="font-bold text-cyan-300 flex items-center gap-1 mb-0.5">
                      <Rocket size={12} />
                      Milestone:
                    </div>
                    <p className="line-clamp-2">{step.practicalMilestone}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleAskLumio(step)}
                    className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-200 font-bold cursor-pointer"
                  >
                    <Bot size={13} />
                    <span>Ask Lumio</span>
                  </button>
                  <span className="text-[11px] font-mono text-slate-500">{step.duration}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
