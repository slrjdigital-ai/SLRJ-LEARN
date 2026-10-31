"use client";

import { useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu } from "lucide-react";
import AppSidebar from "./AppSidebar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
