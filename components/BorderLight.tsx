"use client";

import React from "react";

export default function BorderLight() {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden" suppressHydrationWarning>
      {/* Top subtle glowing runner */}
      <div 
        className="absolute top-0 left-0 right-0 h-[1.5px] opacity-75"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #6366F1 25%, #8B5CF6 50%, #38BDF8 75%, transparent 100%)",
        }}
      />
      {/* Bottom subtle glowing runner */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[1.5px] opacity-60"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #38BDF8 25%, #8B5CF6 50%, #6366F1 75%, transparent 100%)",
        }}
      />
      {/* Left border */}
      <div 
        className="absolute top-0 bottom-0 left-0 w-[1px] opacity-25"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #6366F1 50%, transparent 100%)",
        }}
      />
      {/* Right border */}
      <div 
        className="absolute top-0 bottom-0 right-0 w-[1px] opacity-25"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #8B5CF6 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
