"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Menu,
  X,
  LogIn,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Home,
  BookOpen,
  Compass,
  Code,
  FolderGit2,
  Bot,
  Users,
  Search,
  Bell,
  Award,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Flame,
  Trophy,
  Zap,
} from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import GlobalSearchModal from "./GlobalSearchModal";
import { useGamification } from "@/context/GamificationContext";

interface NavItem {
  name: string;
  href: string;
  exact: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  badgeColor?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/", exact: true, icon: Home },
  { name: "Learning Paths", href: "/roadmap", exact: false, icon: Compass },
  { name: "Topics", href: "/topics", exact: false, icon: BookOpen },
  { name: "Practice", href: "/practice", exact: false, icon: Code },
  { name: "Challenges", href: "/gamification", exact: false, icon: Trophy, badge: "XP" },
  { name: "Projects", href: "/projects", exact: false, icon: FolderGit2 },
  { name: "Community", href: "/community", exact: false, icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { state: gamificationState } = useGamification();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    setScrolled(latest > 20);
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false);
      setUserMenuOpen(false);
      setNotificationsOpen(false);
    } else {
      setHidden(false);
    }
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#030712]/95 backdrop-blur-2xl border-b border-white/[0.1] shadow-[0_12px_40px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.06)]"
            : "bg-[#030712]/85 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* Shimmer laser top accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 via-emerald-400 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

        <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[84px] sm:h-[88px]">
            {/* ─── Bigger & Glowing Logo ─── */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <Link
                href="/"
                onClick={handleHomeClick}
                className="flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="relative p-1.5 rounded-2xl bg-gradient-to-br from-[#0B1528] to-[#040814] border border-cyan-500/35 shadow-[0_0_24px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400/20 group-hover:border-cyan-400/70 group-hover:shadow-[0_0_32px_rgba(6,182,212,0.55)] transition-all duration-300">
                  <Image
                    src="/logo.png"
                    alt="SLRJ Learn Logo"
                    width={42}
                    height={42}
                    className="w-10 h-10 object-contain rounded-xl drop-shadow-[0_0_12px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  {/* Subtle live radar ping */}
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors font-brand flex items-center gap-1.5 leading-none">
                    SLRJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">LEARN</span>
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
                    <span className="text-[11px] font-mono tracking-widest text-cyan-300/80 uppercase font-bold">
                      Code • Build • Excel
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* ─── Desktop Center Nav Items (Bigger Pill Island) ─── */}
            <div className="hidden xl:flex items-center bg-white/[0.03] p-1.5 rounded-2xl border border-white/[0.07] backdrop-blur-md shadow-inner space-x-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={item.href === "/" ? handleHomeClick : undefined}
                    className={`relative px-3.5 py-2.5 rounded-xl text-[13px] font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? "text-white bg-gradient-to-r from-cyan-500/20 via-teal-500/15 to-emerald-500/20 shadow-[0_0_20px_rgba(6,182,212,0.25)] border border-cyan-400/40"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.06] hover:scale-[1.02]"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={isActive ? "text-cyan-300" : "text-slate-400 group-hover:text-cyan-400"}
                    />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          item.badge === "Free"
                            ? "bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 shadow-sm shadow-emerald-500/20"
                            : "bg-purple-500/25 text-purple-300 border border-purple-400/40 shadow-sm shadow-purple-500/20"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ─── Right Controls: Streak & XP, Lumio AI, Search, Notifications & Auth ─── */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {/* Daily Streak & XP Pill */}
              <Link
                href="/gamification"
                className="hidden lg:flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer shadow-sm group"
                title="Gamification, Streak & Challenges"
              >
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-rose-400">
                  <Flame size={15} className="text-rose-400 animate-pulse" />
                  <span>{gamificationState.streak.currentStreak}d</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300">
                  <Zap size={14} className="text-amber-400" />
                  <span>{gamificationState.xp.totalXP} XP</span>
                </div>
              </Link>

              {/* Lumio AI Chatbot Launcher */}
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-lumio"));
                  }
                }}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500/15 via-cyan-500/15 to-emerald-500/15 hover:from-purple-500/25 hover:via-cyan-500/25 hover:to-emerald-500/25 border border-cyan-400/40 hover:border-cyan-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] cursor-pointer group"
                title="Chat with Lumio — AI Coding Companion"
              >
                <div className="relative">
                  <Bot size={17} className="text-cyan-300 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                </div>
                <span className="text-xs font-black font-brand tracking-wide text-white group-hover:text-cyan-200">
                  Lumio
                </span>
                <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                  AI
                </span>
              </button>

              {/* Global Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 text-slate-300 text-xs sm:text-sm font-medium transition-all shadow-sm cursor-pointer group"
                title="Search courses, notes, and topics (Ctrl+K)"
              >
                <Search size={16} className="text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all" />
                <span className="hidden md:inline text-slate-300 font-sans">Search...</span>
                <kbd className="hidden md:inline px-2 py-0.5 rounded-lg bg-black/50 text-[11px] font-mono text-cyan-300 border border-white/10 font-bold shadow-inner">
                  ⌘K
                </kbd>
              </button>

              {/* Notifications Bell */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2.5 rounded-2xl text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 transition-all relative cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] ring-2 ring-[#030712]" />
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 rounded-3xl bg-[#080D1A] border border-white/10 shadow-2xl p-4 text-xs z-50 animate-in fade-in zoom-in-95 backdrop-blur-2xl">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                      <span className="font-bold text-white font-brand text-sm">Notifications</span>
                      <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded-full">
                        2 New
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/25">
                        <div className="font-bold text-white">Daily Challenge Ready!</div>
                        <p className="text-slate-300 text-[11px] mt-0.5">Valid Palindrome algorithm challenge is live. Earn +50 XP!</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                        <div className="font-bold text-white">New Practical Project</div>
                        <p className="text-slate-400 text-[11px] mt-0.5">Explore the E-Commerce Storefront & Cart milestone project.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Controls (Bigger & High-Contrast) */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer shadow-sm"
                  >
                    <Image
                      src={user.avatar || "/icon.jpg"}
                      alt={user.name}
                      width={34}
                      height={34}
                      unoptimized
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                    />
                    <div className="hidden sm:flex flex-col text-left">
                      <span className="font-bold text-white text-xs max-w-[100px] truncate leading-none">
                        {user.name}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-300 font-semibold mt-0.5">
                        Student
                      </span>
                    </div>
                    <ChevronDown size={14} className="text-slate-400 hidden sm:inline" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-3 w-60 rounded-3xl bg-[#080D1A] border border-white/10 shadow-2xl p-2.5 text-xs z-50 backdrop-blur-2xl">
                      <div className="px-3 py-2.5 border-b border-white/10 mb-1.5">
                        <div className="font-bold text-white truncate text-sm">{user.name}</div>
                        <div className="text-slate-400 truncate text-[11px]">{user.email}</div>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                      >
                        <LayoutDashboard size={15} className="text-cyan-400" />
                        <span>Student Dashboard</span>
                      </Link>
                      <Link
                        href="/roadmap"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                      >
                        <Compass size={15} className="text-emerald-400" />
                        <span>My Roadmap Track</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors text-left font-medium"
                      >
                        <LogOut size={15} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <Link
                    href="/login"
                    className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={14} className="stroke-[3]" />
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="xl:hidden p-2.5 rounded-2xl text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden border-t border-white/10 bg-[#040814]/98 backdrop-blur-2xl px-5 py-5 space-y-1.5 shadow-2xl"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? "text-cyan-300 bg-white/10 border border-cyan-400/30 shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? "text-cyan-400" : "text-slate-400"} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Daily Streak & Gamification Mobile Pill */}
              <Link
                href="/gamification"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-mono font-bold bg-[#0A1224] border border-cyan-500/30 text-white shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Flame size={16} className="text-rose-400 animate-pulse" />
                  <span>{gamificationState.streak.currentStreak}-Day Streak</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-300">
                  <Zap size={14} className="text-amber-400" />
                  <span>{gamificationState.xp.totalXP} XP</span>
                </div>
              </Link>

              {/* Chat with Lumio AI Mobile Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-lumio"));
                  }
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-emerald-500/20 border border-cyan-400/40 text-cyan-200 shadow-md cursor-pointer hover:border-cyan-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Bot size={18} className="text-cyan-400 animate-pulse" />
                  <span>Chat with Lumio AI</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Online
                </span>
              </button>

              {!user && (
                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-3 rounded-2xl text-xs font-bold text-white bg-white/5 border border-white/10"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-3 rounded-2xl text-xs font-black text-black bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg shadow-cyan-500/25"
                  >
                    Get Started Free
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
