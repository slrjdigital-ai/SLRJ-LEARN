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
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";

interface AppTopBarProps {
  onMobileMenuToggle?: () => void;
}

export default function AppTopBar({ onMobileMenuToggle }: AppTopBarProps) {
  const { user, logout } = useAuth();
  const { state, currentLevel } = useGamification();
  const [woolfOpen, setWoolfOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-10 flex items-center justify-between select-none sticky top-0 z-30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
      {/* ── Left Item: Mobile Hamburger, Role Roadmaps Pill & Quick Search ── */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all cursor-pointer"
          title="Open Menu"
        >
          <Menu size={22} />
        </button>

        <Link
          href="/roadmap"
          className="group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 via-cyan-50/50 to-blue-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-200 text-[#12316B] text-sm font-bold transition-all shadow-2xs hover:shadow-xs"
        >
          <Compass size={18} className="text-[#12316B] group-hover:rotate-45 transition-transform duration-300" />
          <span className="hidden sm:inline">Role Roadmaps</span>
          <span className="sm:hidden">Roadmaps</span>
          <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#18B6D2] text-[#12316B] uppercase tracking-wide shadow-2xs">
            8 Tracks
          </span>
        </Link>

        {/* Quick Search Shortcut Pill */}
        <Link
          href="/courses"
          className="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sm text-slate-700 transition-all shadow-2xs"
        >
          <Search size={16} className="text-slate-500" />
          <span className="text-slate-700 font-medium">Explore Courses...</span>
          <kbd className="px-2 py-0.5 text-xs font-mono font-semibold bg-white border border-slate-200 rounded text-slate-600 shadow-2xs">
            /courses
          </kbd>
        </Link>
      </div>

      {/* ── Right Controls: Gamification Stats, Woolf Credits, Progress & Avatar ── */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Daily Streak Pill */}
        <Link
          href="/gamification"
          className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-900 text-sm font-bold hover:shadow-xs transition-all"
          title="Daily Learning Streak"
        >
          <Flame size={17} className="text-orange-500 fill-orange-500 animate-pulse" />
          <span suppressHydrationWarning>{state.streak.currentStreak} Days</span>
        </Link>

        {/* Total XP & Level Badge */}
        <Link
          href="/gamification"
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-50 via-cyan-50/50 to-blue-50 border border-blue-200 text-[#12316B] text-sm font-bold hover:shadow-xs transition-all"
          title="Total Earned XP"
        >
          <Sparkles size={16} className="text-[#18B6D2]" />
          <span suppressHydrationWarning>{state.xp.totalXP.toLocaleString()} XP</span>
          <span
            suppressHydrationWarning
            className="px-2 py-0.5 rounded-md bg-[#12316B] text-white text-xs font-black uppercase tracking-wide"
          >
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
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sm font-semibold text-slate-800 transition-colors cursor-pointer shadow-2xs"
          >
            <GraduationCap size={17} className="text-[#0b69ff]" />
            <span>Woolf Credits</span>
            <ChevronDown size={15} className="text-slate-500" />
          </button>
          {woolfOpen && (
            <div className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl text-sm z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                <Award size={17} className="text-[#0b69ff]" />
                <span>Academic Credits</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed mb-3">
                12 of 24 Woolf European Academic Credits verified for transfer.
              </p>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
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
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sm font-semibold text-slate-800 transition-colors cursor-pointer shadow-2xs"
          >
            <Layers size={16} className="text-indigo-600" />
            <span>Pending Units</span>
            <ChevronDown size={15} className="text-slate-500" />
          </button>
          {pendingOpen && (
            <div className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl text-sm z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                <CheckCircle2 size={17} className="text-emerald-600" />
                <span>Upcoming Modules</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                2 practice modules remaining in current growth cycle before final milestone check.
              </p>
            </div>
          )}
        </div>

        {/* Overall Curriculum Progress Bar */}
        <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide block">
              Growth Progress
            </span>
            <div className="w-24 lg:w-32 h-2.5 bg-slate-100 rounded-full overflow-hidden mt-1 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-[#0b69ff] to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${Math.round(((user?.completedRoadmapSteps?.length || 0) / 14) * 100)}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-extrabold text-[#0b69ff] font-mono bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
            {Math.round(((user?.completedRoadmapSteps?.length || 0) / 14) * 100)}%
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
            className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-all cursor-pointer"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 p-3 bg-white rounded-2xl border border-slate-200 shadow-xl text-sm z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="font-bold text-slate-900 mb-2 pb-1.5 border-b border-slate-100">
                Notifications (1)
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 text-slate-800">
                <span className="font-bold text-[#0b69ff] block mb-1">Growth Cycle Milestone</span>
                <span className="text-xs text-slate-600 leading-relaxed block">
                  You are halfway through your 24-day frontend cycle! Keep it up.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Student Dashboard Button on Right Side Top Corner */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white text-sm font-bold shadow-xs hover:shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          title="Open Student Dashboard"
        >
          <LayoutDashboard size={16} className="text-[#18B6D2]" />
          <span className="hidden sm:inline">Student Dashboard</span>
          <span className="sm:hidden">Dashboard</span>
        </Link>

        {/* User Profile Avatar with Dropdown Menu (Profile & Keys) */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileMenuOpen(!profileMenuOpen);
              setNotificationsOpen(false);
              setWoolfOpen(false);
              setPendingOpen(false);
            }}
            className="relative p-0.5 rounded-full hover:ring-2 hover:ring-[#12316B] transition-all cursor-pointer flex-shrink-0 flex items-center"
            title="User Profile & Settings"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user?.avatar || "/icon.jpg"}
              alt={user?.name || "Student"}
              className="w-10 h-10 rounded-full object-cover border-2 border-slate-200 shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 p-3 bg-white rounded-2xl border border-slate-200 shadow-xl text-sm z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* User Identity Header */}
              <div className="flex items-center gap-3 p-2 pb-3 mb-1 border-b border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user?.avatar || "/icon.jpg"}
                  alt={user?.name || "Student"}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">
                    {user?.name || "Shahid"}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 truncate mt-0.5">
                    {user?.level || "Beginner"} • Learner
                  </div>
                </div>
              </div>

              {/* Action Keys & Links */}
              <div className="space-y-1 py-1">
                <Link
                  href="/dashboard"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium transition-colors"
                >
                  <User size={16} className="text-[#12316B]" />
                  <span>Student Profile</span>
                </Link>
              </div>

              {/* Divider & Sign Out */}
              <div className="border-t border-slate-100 pt-1 mt-1">
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold transition-colors text-left cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
