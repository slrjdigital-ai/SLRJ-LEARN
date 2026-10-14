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
  CreditCard,
  Search,
  Bell,
  Award,
  ChevronDown,
} from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import GlobalSearchModal from "./GlobalSearchModal";

const NAV_ITEMS = [
  { name: "Home", href: "/", exact: true, icon: Home },
  { name: "Courses", href: "/courses", exact: false, icon: BookOpen },
  { name: "Learning Paths", href: "/roadmap", exact: false, icon: Compass },
  { name: "Practice", href: "/practice", exact: false, icon: Code },
  { name: "Projects", href: "/projects", exact: false, icon: FolderGit2 },
  { name: "AI Tutor", href: "/ai-tutor", exact: false, icon: Bot, badge: "AI" },
  { name: "Community", href: "/community", exact: false, icon: Users },
  { name: "Free Access", href: "/pricing", exact: false, icon: Sparkles, badge: "Free" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
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
            ? "bg-[#030712]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            : "bg-[#030712]/75 backdrop-blur-xl border-b border-white/[0.05]"
        }`}
      >
        {/* Subtle laser top accent */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[70px]">
            {/* ─── Logo ─── */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <Link
                href="/"
                onClick={handleHomeClick}
                className="flex items-center gap-2.5 group"
              >
                <div className="relative">
                  <Image
                    src="/logo.png"
                    alt="SLRJ Learn Logo"
                    width={38}
                    height={38}
                    className="w-9 h-9 object-contain rounded-xl drop-shadow-[0_0_12px_rgba(6,182,212,0.35)] group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors font-brand flex items-center gap-1.5">
                    SLRJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">LEARN</span>
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase -mt-1 hidden sm:inline">
                    Code • Build • Excel
                  </span>
                </div>
              </Link>
            </div>

            {/* ─── Desktop Center Nav Items ─── */}
            <div className="hidden xl:flex items-center space-x-1">
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
                    className={`relative px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "text-cyan-300 bg-white/[0.06] shadow-sm shadow-cyan-500/10 border border-cyan-500/20"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon size={14} className={isActive ? "text-cyan-400" : "text-slate-400"} />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ─── Right Controls: Search, Notifications & Auth ─── */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Global Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                title="Search courses, notes, and topics (Ctrl+K)"
              >
                <Search size={14} className="text-cyan-400" />
                <span className="hidden md:inline text-slate-400">Search...</span>
                <kbd className="hidden md:inline px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono text-slate-500 border border-white/5">
                  ⌘K
                </kbd>
              </button>

              {/* Notifications Bell */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-colors relative cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell size={16} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-[#030712]" />
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#080D1A] border border-white/10 shadow-2xl p-4 text-xs z-50 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                      <span className="font-bold text-white font-brand">Notifications</span>
                      <span className="text-[10px] font-mono text-cyan-400">2 New</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                        <div className="font-semibold text-white">Daily Challenge Ready!</div>
                        <p className="text-slate-300 text-[11px] mt-0.5">Valid Palindrome algorithm challenge is live. Earn +50 XP!</p>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                        <div className="font-semibold text-white">New Project Added</div>
                        <p className="text-slate-400 text-[11px] mt-0.5">Explore the Kanban Sprint Manager practical project.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Controls */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-white/5 border border-white/10 transition-all cursor-pointer"
                  >
                    <Image
                      src={user.avatar || "/icon.jpg"}
                      alt={user.name}
                      width={30}
                      height={30}
                      unoptimized
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-cyan-500/40"
                    />
                    <ChevronDown size={14} className="text-slate-400 mr-1 hidden sm:inline" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#080D1A] border border-white/10 shadow-2xl p-2 text-xs z-50">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <div className="font-bold text-white truncate">{user.name}</div>
                        <div className="text-slate-400 truncate text-[11px]">{user.email}</div>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <LayoutDashboard size={14} className="text-cyan-400" />
                        <span>Student Dashboard</span>
                      </Link>
                      <Link
                        href="/roadmap"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Compass size={14} className="text-emerald-400" />
                        <span>My Roadmap Track</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-1.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-md shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="xl:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
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
              className="xl:hidden border-t border-white/10 bg-[#040814]/98 backdrop-blur-2xl px-4 py-4 space-y-1 shadow-2xl"
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
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "text-cyan-300 bg-white/10 font-bold"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={17} className={isActive ? "text-cyan-400" : "text-slate-400"} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {!user && (
                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl text-xs font-semibold text-white bg-white/5 border border-white/10"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400"
                  >
                    Get Started
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
