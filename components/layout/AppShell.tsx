"use client";

import { useState } from "react";
import AppSidebar from "./AppSidebar";
import AppTopBar from "./AppTopBar";
import Footer from "@/components/Footer";
import { MessageSquare, Bot } from "lucide-react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenSAM = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-lumio"));
    }
  };

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
          collapsed ? "md:ml-20" : "md:ml-72"
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

      {/* ── Floating SAM / AI Assistant Button (exact as in photo bottom right) ── */}
      <button
        onClick={handleOpenSAM}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-sm shadow-[0_8px_25px_rgba(124,58,237,0.45)] hover:shadow-[0_12px_32px_rgba(124,58,237,0.65)] hover:scale-105 transition-all cursor-pointer group"
        title="Chat with SAM / Lumio AI Assistant"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <MessageSquare size={14} className="fill-white" />
        </div>
        <span className="font-brand tracking-wider uppercase text-xs">SAM</span>
      </button>
    </div>
  );
}
