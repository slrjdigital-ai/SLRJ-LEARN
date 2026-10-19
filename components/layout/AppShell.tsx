"use client";

import { useState } from "react";
import AppSidebar from "./AppSidebar";
import AppTopBar from "./AppTopBar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#182230] flex">
      {/* ── Left Sidebar ── */}
      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* ── Main Area ── */}
      <div
        className={`flex-1 transition-all duration-300 flex flex-col min-w-0 ${
          collapsed ? "md:ml-20" : "md:ml-80"
        } ml-0`}
      >
        {/* Top Header */}
        <AppTopBar onMobileMenuToggle={() => setMobileOpen(!mobileOpen)} />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1780px] w-full mx-auto">
          {children}
        </main>

        {/* Site Footer */}
        <Footer />
      </div>
    </div>
  );
}
