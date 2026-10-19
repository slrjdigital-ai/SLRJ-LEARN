"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  BookOpen,
  Compass,
  Trophy,
  Terminal,
  Bot,
  Search,
  PanelLeftClose,
  PanelLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  LogOut,
  User,
  FolderGit2,
  Users,
  X,
  FileText,
  Award,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

interface NavItem {
  name: string;
  href?: string;
  action?: () => void;
  icon: any;
  exact?: boolean;
  badge?: string;
  badgeColor?: string;
  external?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export default function AppSidebar({
  collapsed,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}: AppSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navGroups: NavGroup[] = [
    {
      label: "Main Navigation",
      items: [
        { name: "Home", href: "/", icon: Home, exact: true },
        {
          name: "Explore Courses",
          href: "/courses",
          icon: BookOpen,
          exact: false,
          badge: "17 Courses",
          badgeColor: "bg-[#18B6D2]/15 text-[#12316B] border border-[#18B6D2]/35",
        },
        {
          name: "Role Roadmaps",
          href: "/roadmap",
          icon: Compass,
          exact: false,
          badge: "8 Paths",
          badgeColor: "bg-blue-50 text-[#12316B] border border-blue-200",
        },
        {
          name: "Practical Projects",
          href: "/projects",
          icon: FolderGit2,
          exact: false,
          badge: "Build",
          badgeColor: "bg-indigo-50 text-indigo-700 border border-indigo-200",
        },
      ],
    },
    {
      label: "Practice & Progress",
      items: [
        {
          name: "Coding Playground",
          href: "/practice",
          icon: Terminal,
          exact: false,
          badge: "Live",
          badgeColor: "bg-emerald-50 text-emerald-800 border border-emerald-200",
        },
        {
          name: "Events & Challenges",
          href: "/events",
          icon: Trophy,
          exact: false,
          badge: "XP",
          badgeColor: "bg-amber-50 text-amber-800 border border-amber-200",
        },
        {
          name: "My Certificates",
          href: "/certificates",
          icon: Award,
          exact: false,
          badge: "Verify",
          badgeColor: "bg-teal-50 text-teal-800 border border-teal-200",
        },
        {
          name: "Learner Community",
          href: "/community",
          icon: Users,
          exact: false,
        },
      ],
    },
    {
      label: "Tools & Support",
      items: [
        {
          name: "SAM AI Assistant",
          action: () => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("open-lumio"));
            }
          },
          icon: Bot,
          badge: "24/7 AI",
          badgeColor: "bg-purple-50 text-purple-700 border border-purple-200",
        },
        {
          name: "Student Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
          exact: false,
        },
        {
          name: "Admin Console",
          href: "/admin",
          icon: ShieldCheck,
          exact: false,
          badge: "Admin",
          badgeColor: "bg-slate-100 text-slate-800 border border-slate-300",
        },
      ],
    },
  ];

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return navGroups;
    const q = searchQuery.toLowerCase();
    return navGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.name.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery]);

  const userName = user?.name || "Shahid";
  const userRole = user?.level || "Learner";
  const userAvatar = user?.avatar || "/icon.jpg";

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 shadow-sm transition-all duration-300 flex flex-col justify-between select-none ${
          collapsed ? "w-20" : "w-72"
        } ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* ── Top Header & Official SLRJ Logo (h-20 aligned with top bar) ── */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-slate-200 flex-shrink-0">
          {!collapsed ? (
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xs flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="SLRJ Learn Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[15px] text-[#12316B] leading-none tracking-tight group-hover:text-[#2456A6] transition-colors">
                  SLRJ LEARN
                </span>
                <span className="text-xs font-bold text-[#18B6D2] tracking-wider uppercase mt-1">
                  ACADEMY
                </span>
              </div>
            </Link>
          ) : (
            <Link href="/" className="mx-auto group" title="SLRJ Learn">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xs flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="SLRJ Learn Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </Link>
          )}

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={onToggle}
              className="hidden md:flex p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={onMobileClose}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
              title="Close drawer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ── Search Input (Desktop/Open) ── */}
        {!collapsed && (
          <div className="p-3 border-b border-slate-100 flex-shrink-0">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search navigation..."
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#12316B] focus:bg-white transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Scrollable Navigation Items ── */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 no-scrollbar">
          {filteredGroups.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm font-medium text-slate-500">
              No results for &ldquo;{searchQuery}&rdquo;
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.label} className="space-y-1">
                {!collapsed && (
                  <div className="px-3 pt-2 pb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                    {group.label}
                  </div>
                )}

                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.href
                    ? item.exact
                      ? pathname === item.href
                      : pathname.startsWith(item.href)
                    : false;

                  const content = (
                    <>
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          size={20}
                          className={`flex-shrink-0 transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-slate-500 group-hover:text-slate-900"
                          }`}
                        />
                        {!collapsed && (
                          <span className="truncate text-sm tracking-normal">
                            {item.name}
                          </span>
                        )}
                      </div>

                      {!collapsed && (
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {item.badge && (
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wide transition-colors ${
                                isActive
                                  ? "bg-white/20 text-white border border-white/30"
                                  : item.badgeColor
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          {item.external && (
                            <ExternalLink size={13} className="text-slate-400" />
                          )}
                        </div>
                      )}
                    </>
                  );

                  if (item.action) {
                    return (
                      <button
                        key={item.name}
                        onClick={item.action}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all cursor-pointer group ${
                          collapsed ? "justify-center px-2" : ""
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
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                        isActive
                          ? "bg-[#12316B] text-white font-bold shadow-sm"
                          : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                      } ${collapsed ? "justify-center px-2" : ""}`}
                      title={collapsed ? item.name : undefined}
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* ── Bottom User Profile Card ── */}
        <div className="p-3 border-t border-slate-200 flex-shrink-0 relative bg-slate-50/50">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={`w-full p-2.5 rounded-xl hover:bg-white hover:shadow-xs border border-transparent hover:border-slate-200 transition-all flex items-center gap-3 cursor-pointer ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              {!collapsed && (
                <div className="text-left truncate">
                  <div className="text-sm font-bold text-slate-900 leading-tight truncate">
                    {userName}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 truncate mt-0.5">
                    {userRole}
                  </div>
                </div>
              )}
            </div>
            {!collapsed && <ChevronRight size={16} className="text-slate-400 flex-shrink-0" />}
          </button>

          {/* Profile Popover Menu */}
          {profileOpen && (
            <div className="absolute bottom-20 left-3 right-3 p-2 bg-white rounded-2xl border border-slate-200 shadow-xl text-sm space-y-1 animate-in fade-in duration-200 z-50">
              <Link
                href="/dashboard"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-50 font-medium"
              >
                <User size={16} className="text-[#12316B]" />
                <span>Student Profile</span>
              </Link>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-all cursor-pointer text-left font-medium"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
