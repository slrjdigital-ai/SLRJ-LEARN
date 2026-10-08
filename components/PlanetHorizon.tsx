"use client";

import { motion } from "framer-motion";

export default function PlanetHorizon() {
  return (
    <div className="absolute -bottom-24 sm:-bottom-32 md:-bottom-44 left-1/2 -translate-x-1/2 w-[160vw] max-w-[2200px] h-[320px] sm:h-[420px] md:h-[500px] pointer-events-none select-none z-0 overflow-hidden">
      {/* ── Atmospheric Glow Halo (Cyber Purple & Cyan Theme) ───────── */}
      <div className="absolute inset-0 rounded-[100%_100%_0_0] bg-gradient-to-b from-[#0F0C24] via-[#080614] to-[#04020F] border-t-2 border-cyan-400/80 shadow-[0_-15px_70px_15px_rgba(168,85,247,0.5),inset_0_25px_60px_rgba(6,182,212,0.25)]">
        {/* Soft atmospheric radial bloom */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[85%] h-64 bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.32)_0%,_rgba(6,182,212,0.18)_45%,_transparent_75%)] blur-3xl pointer-events-none" />

        {/* Fine cyan/purple horizon line shimmer */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent blur-[0.5px]"
        />

        {/* Earth Surface City Lights & Continent Veins */}
        <svg
          viewBox="0 0 1600 400"
          className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="cityGlowBrand" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#A855F7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="networkLineBrand" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Network Arcs on Earth surface */}
          <path
            d="M 300,120 Q 550,50 800,110 T 1300,100"
            fill="none"
            stroke="url(#networkLineBrand)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d="M 450,160 Q 750,90 1050,140"
            fill="none"
            stroke="url(#networkLineBrand)"
            strokeWidth="0.8"
          />
          <path
            d="M 600,200 Q 850,130 1150,190"
            fill="none"
            stroke="url(#networkLineBrand)"
            strokeWidth="1"
            strokeDasharray="6 3"
          />

          {/* Brand City Light Clusters */}
          {/* Cluster 1: West (Cyan/Purple) */}
          <circle cx="420" cy="130" r="16" fill="url(#cityGlowBrand)" />
          <circle cx="420" cy="130" r="2.5" fill="#E0F2FE" />
          <circle cx="450" cy="145" r="10" fill="url(#cityGlowBrand)" />
          <circle cx="450" cy="145" r="1.8" fill="#E0F2FE" />
          <circle cx="390" cy="150" r="8" fill="url(#cityGlowBrand)" />
          <circle cx="480" cy="125" r="12" fill="url(#cityGlowBrand)" />

          {/* Cluster 2: Center (Dense Metropolis lights) */}
          <circle cx="750" cy="95" r="24" fill="url(#cityGlowBrand)" />
          <circle cx="750" cy="95" r="3.5" fill="#FFFFFF" />
          <circle cx="790" cy="110" r="18" fill="url(#cityGlowBrand)" />
          <circle cx="790" cy="110" r="2.8" fill="#E0F2FE" />
          <circle cx="840" cy="105" r="20" fill="url(#cityGlowBrand)" />
          <circle cx="840" cy="105" r="3" fill="#FFFFFF" />
          <circle cx="710" cy="120" r="14" fill="url(#cityGlowBrand)" />
          <circle cx="880" cy="125" r="12" fill="url(#cityGlowBrand)" />
          <circle cx="810" cy="135" r="15" fill="url(#cityGlowBrand)" />

          {/* Cluster 3: East */}
          <circle cx="1120" cy="125" r="20" fill="url(#cityGlowBrand)" />
          <circle cx="1120" cy="125" r="3" fill="#FFFFFF" />
          <circle cx="1180" cy="110" r="16" fill="url(#cityGlowBrand)" />
          <circle cx="1180" cy="110" r="2.5" fill="#E0F2FE" />
          <circle cx="1070" cy="150" r="12" fill="url(#cityGlowBrand)" />
          <circle cx="1230" cy="135" r="14" fill="url(#cityGlowBrand)" />

          {/* Stippled cyan/purple city speckles across the globe */}
          {[
            [350, 160], [380, 180], [520, 140], [560, 170], [620, 130],
            [660, 160], [690, 110], [920, 140], [960, 120], [1000, 165],
            [1040, 135], [1280, 150], [1320, 130], [1360, 160],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={1.2}
              fill={i % 2 === 0 ? "#38BDF8" : "#C084FC"}
              opacity={0.75}
            />
          ))}
        </svg>

        {/* Ambient bottom darkness gradient to seamlessly fade into next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04020F] via-transparent to-transparent" />
      </div>
    </div>
  );
}
