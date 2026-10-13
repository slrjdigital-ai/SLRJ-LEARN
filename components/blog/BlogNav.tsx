"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Layers, Compass, Search, LayoutDashboard, Info } from "lucide-react";

export default function BlogNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const links = [
    {
      name: "Home",
      href: "/",
      icon: BookOpen,
      exact: true,
    },
    {
      name: "Notes",
      href: "/notes",
      icon: Layers,
      exact: false,
    },
    {
      name: "Roadmaps",
      href: "/roadmap",
      icon: Compass,
      exact: false,
    },
    {
      name: "About Us",
      href: "/about",
      icon: Info,
      exact: false,
    },
  ];

  if (user) {
    links.push({
      name: "My Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: false,
    });
  }

  return (
    <div className="w-full bg-[#080C16]/90 backdrop-blur-md border-b border-slate-800 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 overflow-x-auto no-scrollbar py-1">
          {/* Main Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-2 whitespace-nowrap">
            {links.map((link) => {
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-cyan-400" : "text-slate-500"} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Quick Search Shortcut */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/notes"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white text-xs border border-slate-800 transition-colors"
            >
              <Search size={13} className="text-emerald-400" />
              <span>Search Notes & Topics...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded text-slate-400">
                /
              </kbd>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
