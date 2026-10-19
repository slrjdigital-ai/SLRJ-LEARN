"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Bell,
  Search,
  Menu,
  User,
  LogOut,
} from "lucide-react";
import GlobalSearchModal from "@/components/GlobalSearchModal";

interface AppTopBarProps {
  onMobileMenuToggle?: () => void;
}

export default function AppTopBar({ onMobileMenuToggle }: AppTopBarProps) {
  const { user, logout } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-10 flex items-center justify-between select-none sticky top-0 z-30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
        {/* ── Left: Mobile Hamburger & Search Bar ── */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all cursor-pointer flex-shrink-0"
            title="Open Menu"
          >
            <Menu size={22} />
          </button>

          {/* Search Bar */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 text-slate-500 hover:text-slate-800 border border-slate-200 w-full max-w-xs sm:max-w-md text-sm font-medium transition-all shadow-2xs group cursor-pointer text-left"
            title="Search courses, notes, and topics (Ctrl+K)"
          >
            <Search size={17} className="text-slate-400 group-hover:text-slate-700 transition-colors flex-shrink-0" />
            <span className="flex-1 truncate text-slate-600 font-medium">Search topics, notes, courses...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-mono font-semibold bg-white border border-slate-200 rounded-md text-slate-500 shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* ── Right: Notifications & Profile ── */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileMenuOpen(false);
              }}
              className="relative w-12 h-12 rounded-2xl text-slate-700 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer flex items-center justify-center shadow-2xs hover:shadow-xs"
              title="Notifications"
            >
              <Bell size={24} />
              <span className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 sm:w-80 p-3 bg-white rounded-2xl border border-slate-200 shadow-xl text-sm z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="font-bold text-slate-900 mb-2 pb-1.5 border-b border-slate-100 flex items-center justify-between">
                    <span>Notifications</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      1 New
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100 text-slate-800">
                    <span className="font-bold text-[#12316B] block mb-1">Growth Cycle Milestone</span>
                    <span className="text-xs text-slate-600 leading-relaxed block">
                      You are halfway through your 24-day frontend cycle! Keep it up.
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Avatar with Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileMenuOpen(!profileMenuOpen);
                setNotificationsOpen(false);
              }}
              className="relative p-1 rounded-full hover:ring-2 hover:ring-[#12316B] transition-all cursor-pointer flex-shrink-0 flex items-center"
              title="User Profile & Settings"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user?.avatar || "/icon.jpg"}
                alt={user?.name || "Student"}
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full object-cover border-2 border-slate-200 shadow-sm hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>

            {profileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileMenuOpen(false)}
                />
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
              </>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
