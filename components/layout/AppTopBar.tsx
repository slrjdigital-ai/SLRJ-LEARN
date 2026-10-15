"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import {
  ChevronDown,
  Sparkles,
  Flame,
  Award,
  Bell,
  Search,
  Compass,
  GraduationCap,
  Layers,
  CheckCircle2,
  Trophy,
  Menu,
} from "lucide-react";

interface AppTopBarProps {
  onMobileMenuToggle?: () => void;
}

export default function AppTopBar({ onMobileMenuToggle }: AppTopBarProps) {
  const { user } = useAuth();
  const { state, currentLevel } = useGamification();
  const [woolfOpen, setWoolfOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-10 flex items-center justify-between select-none sticky top-0 z-30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
      {/* ── Left Item: Mobile Hamburger, Role Roadmaps Pill & Quick Search ── */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
          title="Open Menu"
        >
          <Menu size={20} />
        </button>

        <Link
          href="/roadmap"
          className="group inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/80 text-[#0b69ff] text-xs font-bold transition-all shadow-xs hover:shadow-sm"
        >
          <Compass size={16} className="text-[#0b69ff] group-hover:rotate-45 transition-transform duration-300" />
          <span className="hidden sm:inline">@ Role Roadmaps</span>
          <span className="sm:hidden">Roadmaps</span>
          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-[#0b69ff] text-white uppercase tracking-wider shadow-xs animate-pulse">
            New
          </span>
        </Link>

        {/* Quick Search Shortcut Pill */}
        <Link
          href="/topics"
          className="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200/80 text-xs text-slate-500 transition-all shadow-xs"
        >
          <Search size={14} className="text-slate-400" />
          <span className="text-slate-500 font-medium">Quick Search...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white border border-slate-200 rounded text-slate-400 shadow-xs">
            ⌘K
          </kbd>
        </Link>
      </div>

      {/* ── Right Controls: Gamification Stats, Woolf Credits, Progress & Avatar ── */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Daily Streak Pill */}
        <Link
          href="/gamification"
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-amber-800 text-xs font-bold hover:shadow-xs transition-all"
          title="Daily Learning Streak"
        >
          <Flame size={15} className="text-orange-500 fill-orange-500 animate-pulse" />
          <span>{state.streak.currentStreak} Days</span>
        </Link>

        {/* Total XP & Level Badge */}
        <Link
          href="/gamification"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/80 text-[#0b69ff] text-xs font-bold hover:shadow-xs transition-all"
          title="Total Earned XP"
        >
          <Sparkles size={14} className="text-[#0b69ff]" />
          <span>{state.xp.totalXP.toLocaleString()} XP</span>
          <span className="px-1.5 py-0.5 rounded-md bg-blue-100 text-[#0b69ff] text-[10px] font-black uppercase tracking-wider">
            Lv {currentLevel.levelNumber}
          </span>
        </Link>

        {/* Woolf Credits Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => {
              setWoolfOpen(!woolfOpen);
              setPendingOpen(false);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-xs"
          >
            <GraduationCap size={15} className="text-[#0b69ff]" />
            <span>Woolf Credits</span>
            <ChevronDown size={13} className="text-slate-400" />
          </button>
          {woolfOpen && (
            <div className="absolute right-0 mt-2 w-56 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                <Award size={15} className="text-[#0b69ff]" />
                <span>Academic Credits</span>
              </div>
              <p className="text-slate-500 leading-relaxed mb-3">
                12 of 24 Woolf European Academic Credits verified for transfer.
              </p>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0b69ff] rounded-full w-1/2" />
              </div>
            </div>
          )}
        </div>

        {/* Pending Units Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => {
              setPendingOpen(!pendingOpen);
              setWoolfOpen(false);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-xs"
          >
            <Layers size={14} className="text-indigo-500" />
            <span>Pending Units</span>
            <ChevronDown size={13} className="text-slate-400" />
          </button>
          {pendingOpen && (
            <div className="absolute right-0 mt-2 w-56 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>Upcoming Modules</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                2 practice modules remaining in current growth cycle before final milestone check.
              </p>
            </div>
          )}
        </div>

        {/* Overall Curriculum Progress Bar */}
        <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Growth Progress
            </span>
            <div className="w-24 lg:w-32 h-2 bg-slate-100 rounded-full overflow-hidden mt-1 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-[#0b69ff] to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: "50%" }}
              />
            </div>
          </div>
          <span className="text-xs font-black text-[#0b69ff] font-mono bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
            50%
          </span>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setWoolfOpen(false);
              setPendingOpen(false);
            }}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-64 p-3 bg-white rounded-2xl border border-slate-200 shadow-xl text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">
                Notifications (1)
              </div>
              <div className="p-2 rounded-xl bg-blue-50/80 border border-blue-100 text-slate-700">
                <span className="font-bold text-[#0b69ff] block mb-0.5">Growth Cycle Milestone</span>
                <span className="text-[11px] text-slate-600">You are halfway through your 24-day frontend cycle! Keep it up.</span>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar with Online Dot */}
        <Link href="/dashboard" className="relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user?.avatar || "/icon.jpg"}
            alt={user?.name || "Student"}
            className="w-9 h-9 rounded-full object-cover border-2 border-slate-200 group-hover:border-[#0b69ff] shadow-sm transition-all"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
        </Link>
      </div>
    </header>
  );
}
