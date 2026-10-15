"use client";

import { useState } from "react";
import AppSidebar from "./AppSidebar";
import AppTopBar from "./AppTopBar";
import { MessageSquare, Bot } from "lucide-react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleOpenSAM = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-lumio"));
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 flex">
      {/* ── Left Sidebar ── */}
      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      {/* ── Main Area ── */}
      <div
        className={`flex-1 transition-all duration-300 flex flex-col min-w-0 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Top Header */}
        <AppTopBar />

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-10 max-w-[1780px] w-full mx-auto">
          {children}
        </main>
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
