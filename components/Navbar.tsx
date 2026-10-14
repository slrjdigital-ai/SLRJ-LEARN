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
  Users,
} from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { name: "Home", href: "/", exact: true, icon: Home },
  { name: "Notes", href: "/notes", exact: false, icon: BookOpen },
  { name: "Roadmaps", href: "/roadmap", exact: false, icon: Compass },
  { name: "About Us", href: "/about", exact: false, icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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
    } else {
      setHidden(false);
    }
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#060713]/95 backdrop-blur-2xl border-b border-indigo-500/15 shadow-[0_8px_40px_rgba(0,0,0,0.7),0_0_80px_rgba(99,102,241,0.06)]"
          : "bg-[#070817]/85 backdrop-blur-xl border-b border-indigo-950/50"
      }`}
    >
      {/* Animated top accent line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* ─── Logo ─── */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              onClick={handleHomeClick}
              className="flex items-center gap-2.5 group"
            >
              <div className="relative">
                <Image
                  src="/logo.png?v=5"
                  alt="SLRJ Learn Logo"
                  width={42}
                  height={42}
                  priority
                  unoptimized
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                />
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-400 via-indigo-400 to-cyan-400">SL</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">RJ</span>
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-indigo-200 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase ml-1 hidden sm:inline">
                  Learn
                </span>
              </div>
            </Link>
          </div>

          {/* ─── Desktop Navigation ─── */}
          <div className="hidden lg:flex items-center">
            {/* Nav pill container */}
            <div className="flex items-center bg-white/[0.03] border border-white/[0.06] rounded-2xl p-1 mr-6">
              {NAV_ITEMS.map((link) => {
                const isActive = link.exact
                  ? pathname === link.href
                  : pathname.startsWith(link.href);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={link.exact ? handleHomeClick : undefined}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-violet-500/20 via-indigo-500/15 to-cyan-500/15 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.18)]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon size={15} className={isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"} />
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-xl border border-indigo-500/35"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Auth section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#080C16] rounded-full" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-60 p-2 rounded-2xl bg-[#0C1322] border border-cyan-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-50 text-xs backdrop-blur-xl"
                    >
                      <div className="p-3 mb-1 rounded-xl bg-gradient-to-r from-cyan-500/5 to-teal-500/5 border border-white/5">
                        <p className="font-bold text-white truncate text-sm">{user.name}</p>
                        <p className="text-[11px] text-gray-400 truncate font-mono mt-0.5">{user.email}</p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold">
                          {user.level} Track
                        </span>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <LayoutDashboard size={14} className="text-cyan-400" />
                        <span>Student Dashboard</span>
                      </Link>

                      <Link
                        href="/roadmap"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Sparkles size={14} className="text-emerald-400" />
                        <span>Roadmap Progress</span>
                      </Link>

                      <div className="my-1 border-t border-white/5" />

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-white/5 transition-all duration-300"
                >
                  <LogIn size={14} className="text-indigo-400" />
                  <span>Sign In / Log In</span>
                </Link>

                <Link
                  href="/register"
                  className="relative px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 transition-all duration-300 hover:scale-105 shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_35px_rgba(99,102,241,0.5)] active:scale-98"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* ─── Mobile Controls ─── */}
          <div className="lg:hidden flex items-center gap-2.5">
            {user ? (
              <Link
                href="/dashboard"
                className="relative p-1 rounded-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-cyan-400/50"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#080C16] rounded-full" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs font-bold px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 text-cyan-300 border border-cyan-500/25 hover:border-cyan-400/50 transition-all"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              suppressHydrationWarning
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 hover:text-white focus:outline-none transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-white/[0.06] bg-[#060A14]/98 backdrop-blur-2xl max-h-[calc(100vh-72px)] overflow-y-auto"
          >
            <div className="px-4 pt-4 pb-6 space-y-1 sm:px-6">
              {/* User card (if logged in) */}
              {user && (
                <div className="p-4 mb-3 rounded-2xl bg-gradient-to-r from-[#0D1527] to-[#0F1A30] border border-cyan-500/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400/60"
                    />
                    <div>
                      <p className="font-bold text-sm text-white">{user.name}</p>
                      <p className="text-[11px] text-gray-400 font-mono">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={toggleMenu}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-teal-400 shadow-md"
                  >
                    Dashboard
                  </Link>
                </div>
              )}

              {/* Nav links */}
              {NAV_ITEMS.map((link) => {
                const isActive = link.exact
                  ? pathname === link.href
                  : pathname.startsWith(link.href);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/10 to-teal-500/5 text-cyan-300 border border-cyan-500/20"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent"
                    }`}
                    onClick={(e) => {
                      toggleMenu();
                      if (link.exact) handleHomeClick(e);
                    }}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isActive
                        ? "bg-cyan-500/15 text-cyan-400"
                        : "bg-white/[0.04] text-slate-500"
                    }`}>
                      <Icon size={16} />
                    </div>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    )}
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="my-3 border-t border-white/[0.06]" />

              {/* Auth section */}
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold text-red-400 bg-red-500/8 border border-red-500/15 hover:bg-red-500/15 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Sign Out ({user.name.split(" ")[0]})</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold text-white bg-slate-800/80 border border-indigo-950 hover:border-indigo-500/40 transition-all"
                    onClick={toggleMenu}
                  >
                    <LogIn size={15} className="text-indigo-400" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-lg shadow-indigo-950/40"
                    onClick={toggleMenu}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
