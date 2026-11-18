"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu } from "lucide-react";
import AppSidebar from "./AppSidebar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isIDEPage = pathname.startsWith("/practice/") && pathname !== "/practice";

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Automatically purge old test session artifacts once so the user starts with clean slate
    const PURGE_KEY = "slrj_activity_reset_v4";
    if (typeof window !== "undefined") {
      const isAlreadyPurged = localStorage.getItem(PURGE_KEY);
      if (!isAlreadyPurged || window.location.search.includes("reset=true")) {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (
            key &&
            (key.startsWith("slrj_") ||
              key.startsWith("todos") ||
              key.startsWith("course_") ||
              key === "bookmarkedNotes" ||
              key === "completedRoadmapSteps")
          ) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
        localStorage.setItem(PURGE_KEY, "true");
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("slrj_course_progress_updated"));
        window.dispatchEvent(new Event("slrj_roadmap_progress_updated"));
        window.dispatchEvent(new Event("gamification-update"));
        window.dispatchEvent(new CustomEvent("slrj-certificates-updated"));
      }
    }
  }, []);

  // Full-screen IDE mode — no sidebar, no padding
  if (isIDEPage) {
    return (
      <div className="h-screen w-screen overflow-hidden">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex">
      {/* ── Left Sidebar ── */}
      <Suspense fallback={<div className="w-80 h-screen bg-white hidden md:block" />}>
        <AppSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
      </Suspense>

      {/* ── Main Area ── */}
      <div
        className={`flex-1 transition-all duration-300 flex flex-col min-w-0 ${
          collapsed ? "md:ml-20" : "md:ml-80"
        } ml-0`}
      >
        {/* Minimal Mobile Header (Mobile Only, Hidden on Desktop) */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
            title="Open Menu"
          >
            <Menu size={20} />
            <span className="text-xs font-bold text-slate-700">Menu</span>
          </button>
          <Image src="/logo.png" alt="SLRJ Learn" width={100} height={30} priority className="h-7 w-auto object-contain" />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1780px] w-full mx-auto">
          {children}
        </main>

        {/* Site Footer - Only rendered on Home Page */}
        {isHomePage && <Footer />}
      </div>
    </div>
  );
}
