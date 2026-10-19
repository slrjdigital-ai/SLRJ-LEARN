"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  FolderGit2,
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
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
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
          name: "Explore Courses",
          href: "/courses",
          icon: BookOpen,
          iconColor: "text-[#18B6D2]",
          exact: false,
          badge: "11 Courses",
          badgeColor: "bg-cyan-50 text-[#12316B] border border-cyan-200",
        },
        {
          name: "Role Roadmaps",
          href: "/roadmap",
          icon: Compass,
          iconColor: "text-[#12316B]",
          exact: false,
          badge: "8 Paths",
          badgeColor: "bg-blue-50 text-[#12316B] border border-blue-200",
          children: [
            { name: "Full-Stack Developer", href: "/roadmap/fullstack" },
            { name: "Frontend Engineer", href: "/roadmap/frontend" },
            { name: "Backend Architect", href: "/roadmap/backend" },
            { name: "AI & ML Specialist", href: "/roadmap/ai" },
          ],
        },
        {
          name: "Practical Projects",
          href: "/projects",
          icon: FolderGit2,
          iconColor: "text-indigo-600",
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
          iconColor: "text-emerald-600",
          exact: false,
          badge: "Live",
          badgeColor: "bg-emerald-50 text-emerald-800 border border-emerald-200",
        },
        {
          name: "Events & Challenges",
          href: "/events",
          icon: Trophy,
          iconColor: "text-amber-600",
          exact: false,
          badge: "XP Rank",
          badgeColor: "bg-amber-50 text-amber-800 border border-amber-200",
        },
        {
          name: "My Certificates",
          href: "/certificates",
          icon: Award,
          iconColor: "text-teal-600",
          exact: false,
          badge: "Verify",
          badgeColor: "bg-teal-50 text-teal-800 border border-teal-200",
        },
        {
          name: "Learner Community",
          href: "/community",
          icon: Users,
          iconColor: "text-sky-600",
          exact: false,
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
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[15px] text-[#12316B] leading-none tracking-tight group-hover:text-[#2456A6] transition-colors">
                    SLRJ LEARN
                  </span>
                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-blue-100 text-[#12316B]">
                    PRO
                  </span>
                </div>
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
      </aside>
    </>
  );
}
