"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Percent,
  BookOpen,
  Calendar,
  Terminal,
  MessageSquare,
  Bot,
  Search,
  PanelLeftClose,
  PanelLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  LogOut,
  User,
} from "lucide-react";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mainNav = [
    { name: "Home", href: "/", icon: Home, exact: true },
    { name: "My Journey", href: "/roadmap", icon: Percent, exact: false },
    { name: "Course Library", href: "/topics", icon: BookOpen, exact: false },
    { name: "Events", href: "/gamification", icon: Calendar, exact: false },
  ];

  const secondaryNav = [
    { name: "Playground", href: "/practice", icon: Terminal, exact: false },
    {
      name: "1:1 Doubts",
      href: "/ai-tutor",
      icon: MessageSquare,
      badge: "LIVE",
      badgeColor: "bg-rose-50 text-rose-600 border border-rose-200",
      external: true,
    },
    {
      name: "SAM",
      action: () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("open-lumio"));
        }
      },
      icon: Bot,
      badge: "New",
      badgeColor: "bg-rose-50 text-rose-500 border border-rose-200",
    },
  ];

  const userName = user?.name || "Shahid";
  const userRole = user?.level || "Smart";
  const userAvatar = user?.avatar || "/icon.jpg";

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-slate-200/90 transition-all duration-300 flex flex-col justify-between select-none ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* ── Top Header & Logo ── */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100">
          {!collapsed ? (
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0b69ff] flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
                SL
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-slate-900 leading-none tracking-tight">
                  SLRJ LEARN
                </span>
                <span className="text-[10px] font-bold text-[#0b69ff] tracking-widest uppercase">
                  ACADEMY
                </span>
              </div>
            </Link>
          ) : (
            <Link href="/" className="mx-auto">
              <div className="w-8 h-8 rounded-xl bg-[#0b69ff] flex items-center justify-center text-white font-bold text-sm shadow-md">
                SL
              </div>
            </Link>
          )}

          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {/* ── Search Input (as seen in photo) ── */}
        {!collapsed && (
          <div className="p-3">
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b69ff] focus:bg-white transition-all"
              />
            </div>
          </div>
        )}

        {/* ── Navigation Links ── */}
        <div className="px-3 py-2 space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#e8f1fd] text-[#0b69ff] font-bold shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.name : undefined}
              >
                <Icon size={18} className={isActive ? "text-[#0b69ff]" : "text-slate-500"} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-2 border-t border-slate-100 mx-3" />

        {/* ── Secondary Navigation ── */}
        <div className="px-3 space-y-1">
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-slate-500 group-hover:text-slate-800" />
                  {!collapsed && <span>{item.name}</span>}
                </div>
                {!collapsed && (
                  <div className="flex items-center gap-1">
                    {item.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.external && <ExternalLink size={12} className="text-slate-400" />}
                  </div>
                )}
              </>
            );

            if (item.action) {
              return (
                <button
                  key={item.name}
                  onClick={item.action}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer group ${
                    collapsed ? "justify-center" : ""
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href!}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all group ${
                  collapsed ? "justify-center" : ""
                }`}
                title={collapsed ? item.name : undefined}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Bottom User Profile Card (exact as in photo) ── */}
      <div className="p-3 border-t border-slate-100 relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className={`w-full p-2 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-3 cursor-pointer ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={userAvatar}
                alt={userName}
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            {!collapsed && (
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {userName}
                </div>
                <div className="text-[11px] font-medium text-slate-500">
                  {userRole}
                </div>
              </div>
            )}
          </div>
          {!collapsed && <ChevronRight size={15} className="text-slate-400" />}
        </button>

        {/* Profile Popover Menu */}
        {profileOpen && (
          <div className="absolute bottom-16 left-3 right-3 p-2 bg-white rounded-2xl border border-slate-200 shadow-xl text-xs space-y-1 animate-in fade-in duration-200">
            <Link
              href="/dashboard"
              onClick={() => setProfileOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50"
            >
              <User size={14} />
              <span>Student Profile</span>
            </Link>
            <button
              onClick={() => {
                setProfileOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-all cursor-pointer text-left font-medium"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
