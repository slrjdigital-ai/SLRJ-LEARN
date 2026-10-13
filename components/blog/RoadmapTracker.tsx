"use client";

import { useState, useSyncExternalStore } from "react";
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
} from "lucide-react";

const STORAGE_KEY = "slrj_webdev_roadmap_progress";

const TRACK_ICONS: Record<string, React.ElementType> = {
  "web-dev": Globe,
  "dsa": Code2,
  "python-ai": Sparkles,
  "cs-core": Cpu,
  "cloud-devops": Cloud,
};

const TRACK_THEMES: Record<
  string,
  {
    selectedBorder: string;
    selectedBg: string;
    selectedGlow: string;
    iconBg: string;
    badge: string;
    progressGrad: string;
    accentText: string;
    timelineLine: string;
    completedNode: string;
    nodeHover: string;
    cardCompleted: string;
    milestoneBox: string;
    milestoneTitle: string;
  }
> = {
  "web-dev": {
    selectedBorder: "border-cyan-400",
    selectedBg: "from-[#0F1E38] to-[#0D1527]",
    selectedGlow: "shadow-[0_0_25px_rgba(6,182,212,0.25)]",
    iconBg: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
    badge: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
    progressGrad: "from-cyan-400 via-teal-400 to-emerald-400",
    accentText: "text-cyan-400",
    timelineLine: "before:from-cyan-400 before:via-teal-400 before:to-emerald-400",
    completedNode: "bg-cyan-400 border-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)]",
    nodeHover: "hover:border-cyan-400 hover:text-cyan-400",
    cardCompleted: "bg-gradient-to-br from-[#0F1E38] to-[#0B1528] border-cyan-500/40 shadow-[0_10px_30px_rgba(6,182,212,0.12)]",
    milestoneBox: "bg-cyan-500/10 border-cyan-500/20 text-cyan-200",
    milestoneTitle: "text-cyan-300",
  },
  "dsa": {
    selectedBorder: "border-amber-400",
    selectedBg: "from-[#2A1E0E] to-[#0D1527]",
    selectedGlow: "shadow-[0_0_25px_rgba(245,158,11,0.25)]",
    iconBg: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    badge: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    progressGrad: "from-amber-400 via-orange-400 to-yellow-400",
    accentText: "text-amber-400",
    timelineLine: "before:from-amber-400 before:via-orange-400 before:to-yellow-400",
    completedNode: "bg-amber-400 border-amber-300 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)]",
    nodeHover: "hover:border-amber-400 hover:text-amber-400",
    cardCompleted: "bg-gradient-to-br from-[#261B0F] to-[#0B1528] border-amber-500/40 shadow-[0_10px_30px_rgba(245,158,11,0.12)]",
    milestoneBox: "bg-amber-500/10 border-amber-500/20 text-amber-200",
    milestoneTitle: "text-amber-300",
  },
  "python-ai": {
    selectedBorder: "border-emerald-400",
    selectedBg: "from-[#0D281E] to-[#0D1527]",
    selectedGlow: "shadow-[0_0_25px_rgba(16,185,129,0.25)]",
    iconBg: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    progressGrad: "from-emerald-400 via-teal-400 to-lime-400",
    accentText: "text-emerald-400",
    timelineLine: "before:from-emerald-400 before:via-teal-400 before:to-lime-400",
    completedNode: "bg-emerald-400 border-emerald-300 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]",
    nodeHover: "hover:border-emerald-400 hover:text-emerald-400",
    cardCompleted: "bg-gradient-to-br from-[#0C241B] to-[#0B1528] border-emerald-500/40 shadow-[0_10px_30px_rgba(16,185,129,0.12)]",
    milestoneBox: "bg-emerald-500/10 border-emerald-500/20 text-emerald-200",
    milestoneTitle: "text-emerald-300",
  },
  "cs-core": {
    selectedBorder: "border-indigo-400",
    selectedBg: "from-[#171A3B] to-[#0D1527]",
    selectedGlow: "shadow-[0_0_25px_rgba(99,102,241,0.25)]",
    iconBg: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
    badge: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30",
    progressGrad: "from-indigo-400 via-violet-400 to-purple-400",
    accentText: "text-indigo-400",
    timelineLine: "before:from-indigo-400 before:via-violet-400 before:to-purple-400",
    completedNode: "bg-indigo-400 border-indigo-300 text-slate-950 shadow-[0_0_20px_rgba(99,102,241,0.5)]",
    nodeHover: "hover:border-indigo-400 hover:text-indigo-400",
    cardCompleted: "bg-gradient-to-br from-[#161838] to-[#0B1528] border-indigo-500/40 shadow-[0_10px_30px_rgba(99,102,241,0.12)]",
    milestoneBox: "bg-indigo-500/10 border-indigo-500/20 text-indigo-200",
    milestoneTitle: "text-indigo-300",
  },
  "cloud-devops": {
    selectedBorder: "border-rose-400",
    selectedBg: "from-[#2C1322] to-[#0D1527]",
    selectedGlow: "shadow-[0_0_25px_rgba(244,63,94,0.25)]",
    iconBg: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
    badge: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
    progressGrad: "from-rose-400 via-pink-400 to-orange-400",
    accentText: "text-rose-400",
    timelineLine: "before:from-rose-400 before:via-pink-400 before:to-orange-400",
    completedNode: "bg-rose-400 border-rose-300 text-slate-950 shadow-[0_0_20px_rgba(244,63,94,0.5)]",
    nodeHover: "hover:border-rose-400 hover:text-rose-400",
    cardCompleted: "bg-gradient-to-br from-[#281320] to-[#0B1528] border-rose-500/40 shadow-[0_10px_30px_rgba(244,63,94,0.12)]",
    milestoneBox: "bg-rose-500/10 border-rose-500/20 text-rose-200",
    milestoneTitle: "text-rose-300",
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
  const [selectedTrack, setSelectedTrack] = useState<string>("web-dev");
  const rawCompleted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  
  const localCompletedSteps: number[] = (() => {
    try {
      return JSON.parse(rawCompleted);
    } catch {
      return [];
    }
  })();

  // Use either authenticated user's completed steps or local completed steps
  const completedSteps = user ? user.completedRoadmapSteps : localCompletedSteps;
  const isClient = typeof window !== "undefined";

  const currentStages: RoadmapStep[] = getRoadmapStepsByTrack(selectedTrack);
  const activeTrackMeta = ROADMAP_TRACKS.find((t) => t.id === selectedTrack) || ROADMAP_TRACKS[0];
  const activeTheme = TRACK_THEMES[selectedTrack] || TRACK_THEMES["web-dev"];

  const totalStepsInTrack = currentStages.length;
  const completedCountInTrack = currentStages.filter((s) => completedSteps.includes(s.id)).length;
  const progressPercent = totalStepsInTrack > 0 ? Math.round((completedCountInTrack / totalStepsInTrack) * 100) : 0;

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

  const resetProgress = () => {
    if (confirm(`Reset your progress for ${activeTrackMeta.name} back to 0%?`)) {
      const stepIdsToRemove = new Set(currentStages.map((s) => s.id));
      const next = completedSteps.filter((id) => !stepIdsToRemove.has(id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="w-full">
      {/* ── Multi-Track Career Switcher Tabs ──────────────────────── */}
      <div className="mb-10">
        <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest mb-3 ${activeTheme.accentText}`}>
          <Sparkles size={14} />
          <span>Select Your Learning Path</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ROADMAP_TRACKS.map((track) => {
            const isSelected = selectedTrack === track.id;
            const Icon = TRACK_ICONS[track.id] || Globe;
            const trackTheme = TRACK_THEMES[track.id] || TRACK_THEMES["web-dev"];
            const trackStages = getRoadmapStepsByTrack(track.id);
            const doneCount = trackStages.filter((s) => completedSteps.includes(s.id)).length;

            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `bg-gradient-to-br ${trackTheme.selectedBg} ${trackTheme.selectedBorder} text-white ${trackTheme.selectedGlow}`
                    : "bg-[#0D1527] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected
                          ? trackTheme.iconBg
                          : "bg-white/5 text-slate-400"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isSelected
                          ? trackTheme.badge
                          : "bg-white/5 border border-white/10 text-slate-400"
                      }`}
                    >
                      {track.badge}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                    {track.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-mono">
                    {track.totalStages} Stages • {track.duration}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Progress:</span>
                  <span className={doneCount > 0 ? `${trackTheme.accentText} font-bold` : "text-slate-500"}>
                    {isClient ? `${doneCount}/${track.totalStages}` : `0/${track.totalStages}`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Progress Meter Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0C0E23] via-[#12163B] to-[#0C0E23] border border-indigo-500/25 shadow-2xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-48 bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest mb-1 ${activeTheme.accentText}`}>
              <Trophy size={14} className={activeTheme.accentText} />
              <span>{activeTrackMeta.name} Tracker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-brand">
              {activeTrackMeta.name} Roadmap
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              {activeTrackMeta.description} Click each milestone as you master the concepts and build the practical assignments.
            </p>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-start md:items-end">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-brand">
                {isClient ? progressPercent : 0}%
              </span>
              <span className="text-xs font-mono text-gray-400">
                ({isClient ? completedCountInTrack : 0} of {totalStepsInTrack} Completed)
              </span>
            </div>

            {isClient && completedCountInTrack > 0 && (
              <button
                onClick={resetProgress}
                className="text-xs text-gray-500 hover:text-red-400 transition-colors font-mono cursor-pointer"
              >
                Reset Track Progress
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mt-6 border border-slate-700">
          <div
            className={`h-full bg-gradient-to-r ${activeTheme.progressGrad} transition-all duration-500`}
            style={{ width: `${isClient ? progressPercent : 0}%` }}
          />
        </div>
      </div>

      {/* Visual Roadmap Timeline */}
      <div
        className={`relative space-y-8 before:absolute before:inset-0 before:left-6 md:before:left-1/2 before:w-0.5 before:bg-gradient-to-b ${activeTheme.timelineLine} before:-translate-x-1/2 before:hidden md:before:block`}
      >
        {currentStages.map((step, idx) => {
          const isCompleted = isClient && completedSteps.includes(step.id);
          const isEven = idx % 2 === 0;

          return (
            <div
              key={step.id}
              className={`relative flex flex-col md:flex-row items-center gap-6 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Desktop Timeline Center Node */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center">
                <button
                  onClick={() => toggleStep(step.id)}
                  aria-label={`Toggle completion of ${step.title}`}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isCompleted
                      ? activeTheme.completedNode
                      : `bg-[#0D1527] border-slate-700 text-gray-400 ${activeTheme.nodeHover}`
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={20} className="stroke-[2.5]" />
                  ) : (
                    <span className="font-mono text-xs font-bold">{step.id}</span>
                  )}
                </button>
              </div>

              {/* Step Card */}
              <div className="w-full md:w-[calc(50%-2.5rem)]">
                <div
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                    isCompleted
                      ? activeTheme.cardCompleted
                      : "bg-[#0D1527] border-slate-800 hover:border-slate-700 shadow-xl"
                  }`}
                >
                  {/* Card Header & Toggle for Mobile */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                        {step.category}
                      </span>
                      <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                        <Clock size={11} />
                        {step.duration}
                      </span>
                    </div>

                    {/* Mobile completion button */}
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                        isCompleted
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          <span>Done</span>
                        </>
                      ) : (
                        <>
                          <Circle size={13} />
                          <span>Mark Done</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-lg sm:text-xl font-bold text-white font-brand mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {step.summary}
                  </p>

                  {/* Prerequisites */}
                  <div className="mb-4 text-xs font-mono text-gray-400">
                    <span className={`${activeTheme.accentText} font-semibold mr-1.5`}>Prerequisites:</span>
                    <span>{step.prerequisites.join(", ")}</span>
                  </div>

                  {/* Key Topics List */}
                  <div className="mb-4">
                    <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider block mb-1.5">
                      Core Concepts:
                    </span>
                    <ul className="grid grid-cols-1 gap-1 text-xs text-gray-300">
                      {step.keyTopics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className={`${activeTheme.accentText} mt-0.5`}>•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practical Milestone Challenge */}
                  <div className={`p-3.5 rounded-xl border mb-4 text-xs ${activeTheme.milestoneBox}`}>
                    <div className={`flex items-center gap-1.5 font-bold mb-1 ${activeTheme.milestoneTitle}`}>
                      <Sparkles size={13} />
                      <span>Practical Project Milestone:</span>
                    </div>
                    <p className="leading-relaxed text-gray-300">
                      {step.practicalMilestone}
                    </p>
                  </div>

                  {/* Linked Study Materials (Notes & PDF) */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1 w-full sm:w-auto">
                      <span className="text-[11px] font-mono text-gray-500 uppercase block">
                        Study Notes:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {step.recommendedNotes.map((note, nIdx) => (
                          <Link
                            key={nIdx}
                            href={`/notes/${note.slug}`}
                            className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-white transition-colors underline underline-offset-4"
                          >
                            <span>{note.title}</span>
                            <ArrowRight size={11} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
