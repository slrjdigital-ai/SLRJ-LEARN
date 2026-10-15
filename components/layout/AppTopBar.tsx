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
} from "lucide-react";

export default function AppTopBar() {
  const { user } = useAuth();
  const { state } = useGamification();
  const [woolfOpen, setWoolfOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 sm:px-10 flex items-center justify-between select-none sticky top-0 z-30">
      {/* ── Left Item: Role Roadmaps Tab (as in photo) ── */}
      <div className="flex items-center gap-3">
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#e8f1fd] text-[#0b69ff] text-xs font-bold transition-all hover:bg-blue-100"
        >
          <span>@ Role Roadmaps</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-[#0b69ff] text-white">
            New
          </span>
        </Link>
      </div>

      {/* ── Right Controls: Woolf Credits, Pending Units, Progress & Avatar ── */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Woolf Credits Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setWoolfOpen(!woolfOpen)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <span>Woolf Credits</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          {woolfOpen && (
            <div className="absolute right-0 mt-2 w-48 p-3 bg-white rounded-xl border border-slate-200 shadow-xl text-xs z-50">
              <span className="font-bold text-slate-900 block mb-1">Academic Credits</span>
              <p className="text-slate-500">12 of 24 Woolf Credits verified.</p>
            </div>
          )}
        </div>

        {/* Pending Units Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setPendingOpen(!pendingOpen)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <span>Pending Units</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          {pendingOpen && (
            <div className="absolute right-0 mt-2 w-48 p-3 bg-white rounded-xl border border-slate-200 shadow-xl text-xs z-50">
              <span className="font-bold text-slate-900 block mb-1">Upcoming Modules</span>
              <p className="text-slate-500">2 modules remaining in current cycle.</p>
            </div>
          )}
        </div>

        {/* Overall Progress Bar (as in photo: blue bar with 50%) */}
        <div className="flex items-center gap-3">
          <div className="w-24 sm:w-36 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0b69ff] rounded-full transition-all duration-300"
              style={{ width: "50%" }}
            />
          </div>
          <span className="text-xs font-bold text-[#0b69ff] font-mono">50%</span>
        </div>

        {/* User Avatar Circle */}
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user?.avatar || "/icon.jpg"}
            alt={user?.name || "Student"}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}
