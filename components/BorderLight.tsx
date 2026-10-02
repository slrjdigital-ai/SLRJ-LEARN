"use client";

import React from "react";

export default function BorderLight() {
  return (
    <>
      <style>{`
        @keyframes spin-center {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .global-border-light-mask {
          padding: 2px; /* Thinner border width */
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>
      <div 
        className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden global-border-light-mask"
      >
        <div 
          className="absolute top-1/2 left-1/2 w-[200vmax] h-[200vmax]"
          style={{
            background: "conic-gradient(from 0deg, transparent 0%, transparent 85%, #A855F7 88%, #06B6D4 92%, #EC4899 96%, transparent 100%)",
            animation: "spin-center 6s linear infinite"
          }}
        />
      </div>
    </>
  );
}
