"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getAllCourses } from "@/data/courses";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  BookOpen,
  Compass,
  Trophy,
  Terminal,
  Search,
  PanelLeftClose,
  PanelLeft,
  ExternalLink,
  Users,
  X,
  Award,
  Bot,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Code2,
  GraduationCap,
  Layers,
  User,
  LogOut,
} from "lucide-react";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

interface SubNavItem {
  name: string;
  href: string;
  badge?: string;
}

interface NavItem {
  name: string;
  href?: string;
  action?: () => void;
  icon: any;
  iconColor: string;
  exact?: boolean;
  badge?: string;
  badgeColor?: string;
  external?: boolean;
  children?: SubNavItem[];
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
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "Role Roadmaps": false,
  });

  const toggleExpand = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const navGroups: NavGroup[] = [
    {
      label: "Main Navigation",
      items: [
        {
          name: "Home",
          href: "/",
          icon: Home,
          iconColor: "text-blue-600",
          exact: true,
        },
        {
          name: "Learn",
          href: "/courses",
          icon: BookOpen,
          iconColor: "text-[#18B6D2]",
          exact: false,
          badge: `${getAllCourses().length} Courses`,
          badgeColor: "bg-cyan-50 text-[#12316B] border border-cyan-200",
        },
        {
          name: "Roadmaps",
          href: "/roadmap",
          icon: Compass,
          iconColor: "text-[#12316B]",
          exact: false,
          badge: "10 Paths",
          badgeColor: "bg-blue-50 text-[#12316B] border border-blue-200",
        },
        {
          name: "Practice",
          href: "/practice",
          icon: Terminal,
          iconColor: "text-emerald-600",
          exact: false,
          badge: "Live",
          badgeColor: "bg-emerald-50 text-emerald-800 border border-emerald-200",
        },
        {
          name: "Events",
          href: "/events",
          icon: Trophy,
          iconColor: "text-amber-500",
          exact: false,
          badge: "Soon",
          badgeColor: "bg-amber-50 text-amber-800 border border-amber-200",
        },
        {
          name: "Certificates",
          href: "/certificates",
          icon: Award,
          iconColor: "text-teal-600",
          exact: false,
          badge: "Verify",
          badgeColor: "bg-teal-50 text-teal-800 border border-teal-200",
        },
        {
          name: "Profile",
          href: "/dashboard",
          icon: User,
          iconColor: "text-indigo-600",
          exact: false,
          badge: "Account",
          badgeColor: "bg-indigo-50 text-indigo-700 border border-indigo-200",
        },
      ],
    },
    {
      label: "Tools & Support",
      items: [
        {
          name: "Samy AI Assistant",
          action: () => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("open-lumio"));
            }
          },
          icon: Bot,
          iconColor: "text-purple-600",
          badge: "24/7 AI",
          badgeColor: "bg-purple-50 text-purple-700 border border-purple-200",
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
        items: group.items.filter((item) => {
          const matchName = item.name.toLowerCase().includes(q);
          const matchChildren = item.children?.some((c) =>
            c.name.toLowerCase().includes(q)
          );
          return matchName || matchChildren;
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery, navGroups]);

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
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 shadow-sm transition-all duration-300 flex flex-col select-none ${
          collapsed ? "w-20" : "w-80"
        } ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* ── Top Header & Official SLRJ Logo (h-20 aligned with top bar) ── */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-slate-200 flex-shrink-0 bg-white">
          {!collapsed ? (
            <Link href="/" className="flex items-center group py-1" title="SLRJ Learn">
              <Image
                src="/logo.png"
                alt="SLRJ Learn"
                width={150}
                height={44}
                className="h-9 w-auto object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </Link>
          ) : (
            <Link href="/" className="mx-auto group py-1" title="SLRJ Learn">
              <Image
                src="/logo.png"
                alt="SLRJ Learn"
                width={48}
                height={32}
                className="h-6 w-auto object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </Link>
          )}

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={onToggle}
              className="hidden md:flex p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
            </button>

            {/* Mobile Close Button */}
            <button
              type="button"
              suppressHydrationWarning
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
          <div className="p-3 border-b border-slate-100 flex-shrink-0 bg-slate-50/50">
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
                className="w-full pl-10 pr-12 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#12316B] focus:ring-2 focus:ring-[#12316B]/15 transition-all shadow-2xs"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold p-1"
                >
                  Clear
                </button>
              ) : (
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200 pointer-events-none">
                  /
                </kbd>
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
                  <div className="px-3 pt-2 pb-1 text-[11px] font-black tracking-wider text-slate-400 uppercase flex items-center justify-between">
                    <span>{group.label}</span>
                    <span className="w-8 h-px bg-slate-200" />
                  </div>
                )}

                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.href
                    ? item.exact
                      ? pathname === item.href
                      : pathname.startsWith(item.href)
                    : false;

                  const hasChildren = Boolean(item.children && item.children.length > 0);
                  const isExpanded = Boolean(expandedItems[item.name]);

                  const buttonContent = (
                    <>
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 group-hover:bg-slate-200/80 " + item.iconColor
                          }`}
                        >
                          <Icon size={18} className="flex-shrink-0" />
                        </div>
                        {!collapsed && (
                          <span className="font-semibold text-sm whitespace-nowrap">
                            {item.name}
                          </span>
                        )}
                      </div>

                      {!collapsed && (
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {item.badge && (
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider transition-colors ${
                                isActive
                                  ? "bg-white/20 text-white border border-white/30"
                                  : item.badgeColor
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          {hasChildren && (
                            <button
                              onClick={(e) => toggleExpand(item.name, e)}
                              className={`p-1 rounded-md hover:bg-black/10 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                              title={isExpanded ? "Collapse" : "Expand"}
                            >
                              <ChevronDown size={15} />
                            </button>
                          )}
                          {item.external && (
                            <ExternalLink size={13} className="text-slate-400" />
                          )}
                        </div>
                      )}
                    </>
                  );

                  return (
                    <div key={item.name} className="space-y-1">
                      {item.action ? (
                        <button
                          onClick={item.action}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all cursor-pointer group ${
                            collapsed ? "justify-center px-2" : ""
                          }`}
                          title={collapsed ? item.name : undefined}
                        >
                          {buttonContent}
                        </button>
                      ) : (
                        <Link
                          href={item.href!}
                          onClick={() => {
                            if (hasChildren) {
                              setExpandedItems((prev) => ({ ...prev, [item.name]: true }));
                            }
                          }}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all group relative ${
                            isActive
                              ? "bg-gradient-to-r from-[#12316B] to-[#1E488F] text-white font-bold shadow-md shadow-[#12316B]/15 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1.5 before:bg-[#18B6D2] before:rounded-r-md"
                              : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                          } ${collapsed ? "justify-center px-2" : ""}`}
                          title={collapsed ? item.name : undefined}
                        >
                          {buttonContent}
                        </Link>
                      )}

                      {/* Expandable Sub-items Tree */}
                      {!collapsed && hasChildren && isExpanded && (
                        <div className="ml-5 pl-4 border-l-2 border-slate-200/80 space-y-1 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                          {item.children!.map((child) => {
                            const isChildActive = pathname === child.href;

                            return (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={`flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-semibold transition-all ${
                                  isChildActive
                                    ? "bg-blue-50 text-[#12316B] font-bold border border-blue-200"
                                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                                }`}
                              >
                                <span className="truncate">{child.name}</span>
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  {child.badge && (
                                    <span
                                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                                        isChildActive
                                          ? "bg-white text-[#12316B] border-blue-200"
                                          : "bg-slate-100 text-slate-500 border-slate-200"
                                      }`}
                                    >
                                      {child.badge}
                                    </span>
                                  )}
                                  <ChevronRight
                                    size={12}
                                    className={isChildActive ? "text-[#12316B]" : "text-slate-400"}
                                  />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* ── User Profile Section at bottom of sidebar ── */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex-shrink-0 relative">
          {!collapsed ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-full flex items-center justify-between p-2 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user?.avatar || "/icon.jpg"}
                      alt={user?.name || "Student"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-slate-200 shadow-xs"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm text-slate-900 truncate">
                      {user?.name || "Shahid"}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {user?.email || "shahid@slrjlearn.in"}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 group-hover:text-slate-700 transition-transform duration-200 flex-shrink-0 ${
                    profileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileMenuOpen(false)}
                  />
                  <div className="absolute bottom-full left-0 mb-2 w-full p-2 bg-white rounded-2xl border border-slate-200 shadow-xl text-sm z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 space-y-1">
                    <div className="p-2 border-b border-slate-100 mb-1">
                      <div className="font-bold text-slate-900 truncate">{user?.name || "Shahid"}</div>
                      <div className="text-xs text-slate-500 truncate">{user?.level || "Beginner"} • Learner</div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        onMobileClose?.();
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium transition-colors"
                    >
                      <User size={16} className="text-[#12316B]" />
                      <span>Student Profile</span>
                    </Link>
                    <Link
                      href="/certificates"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        onMobileClose?.();
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium transition-colors"
                    >
                      <Award size={16} className="text-teal-600" />
                      <span>My Certificates</span>
                    </Link>
                    <div className="border-t border-slate-100 pt-1 my-1">
                      <button
                        type="button"
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
          ) : (
            <div className="relative flex justify-center">
              <button
                type="button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="relative p-1 rounded-full hover:ring-2 hover:ring-[#12316B] transition-all cursor-pointer"
                title="Profile & Settings"
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
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileMenuOpen(false)}
                  />
                  <div className="absolute bottom-full left-12 mb-2 w-56 p-2 bg-white rounded-2xl border border-slate-200 shadow-xl text-sm z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 space-y-1">
                    <div className="p-2 border-b border-slate-100 mb-1">
                      <div className="font-bold text-slate-900 truncate">{user?.name || "Shahid"}</div>
                      <div className="text-xs text-slate-500 truncate">{user?.level || "Beginner"} Learner</div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium transition-colors"
                    >
                      <User size={16} className="text-[#12316B]" />
                      <span>Student Profile</span>
                    </Link>
                    <Link
                      href="/certificates"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium transition-colors"
                    >
                      <Award size={16} className="text-teal-600" />
                      <span>My Certificates</span>
                    </Link>
                    <div className="border-t border-slate-100 pt-1 my-1">
                      <button
                        type="button"
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
          )}
        </div>
      </aside>
    </>
  );
}
