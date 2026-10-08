"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Lock,
  Layers,
  Globe,
  HeartHandshake,
  Flame,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SpotlightCard from "@/components/SpotlightCard";
import ScrollReveal from "@/components/ScrollReveal";
import ContactCTA from "@/components/ContactCTA";

export default function AboutContent() {
  // ── 4 Foundational Pillars (SLRJ) ──────────────────────────────────
  const values = [
    {
      letter: "S",
      name: "SANKALP",
      sanskrit: "सङ्कल्प",
      subtitle: "Uncompromising Vision & Determination",
      desc: "We commit to the ultimate outcome before the first line of code is written. No half-measures, no shortcuts. Every architectural decision is engineered to scale seamlessly for years.",
      traits: ["Clear Strategic Roadmap", "Zero Technical Debt", "Architectural Integrity"],
      accent: "#A855F7",
      gradient: "from-purple-600 to-indigo-600",
    },
    {
      letter: "L",
      name: "LAKSHYA",
      sanskrit: "लक्ष्य",
      subtitle: "Goal-Oriented & Revenue-Driven Impact",
      desc: "A stunning website is meaningless if it fails to convert. Every button, interaction, and database query is aligned with your core business KPIs and customer acquisition goals.",
      traits: ["High-Conversion Funnels", "Core Web Vitals #1 Ranking", "Measurable ROI"],
      accent: "#06B6D4",
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      letter: "R",
      name: "RACHNA",
      sanskrit: "रचना",
      subtitle: "Artisanal Craftsmanship & Futuristic UI/UX",
      desc: "We reject cookie-cutter templates. Every interface is handcrafted with custom design tokens, fluid micro-interactions, and a dark cyber aesthetic that commands instant market authority.",
      traits: ["Bespoke Visual Identity", "Fluid Framer Motion Physics", "Tailored Component Libraries"],
      accent: "#EC4899",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      letter: "J",
      name: "JOSH",
      sanskrit: "जोष",
      subtitle: "Unrelenting Energy & Engineering Velocity",
      desc: "We operate with electric passion and high execution speed. With direct engineer communication and agile sprints, we ship modern digital products weeks ahead of traditional agencies.",
      traits: ["Agile 2-Week Sprints", "Direct Engineer Access", "Continuous Delivery SLA"],
      accent: "#10B981",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  // ── Operational Milestones ─────────────────────────────────────────
  const metrics = [
    { label: "Core Web Vitals", value: "100/100", desc: "Sub-second speed & Google SEO priority", accent: "#06B6D4" },
    { label: "Client Satisfaction", value: "99.8%", desc: "Milestone-verified delivery rating", accent: "#A855F7" },
    { label: "Modern Stack Native", value: "Next 16", desc: "React 19 & Turbopack architecture", accent: "#EC4899" },
    { label: "Support & Uptime SLA", value: "99.9%", desc: "Continuous edge monitoring & support", accent: "#10B981" },
  ];

  // ── 5-Phase Precision Delivery Framework ───────────────────────────
  const processSteps = [
    {
      step: "01",
      title: "Discovery & Architectural Blueprint",
      desc: "We dissect your business goals, target audience, and feature scope. We establish database schemas, route hierarchies, and technological constraints before writing code.",
      tags: ["Requirements Analysis", "Tech Stack Selection", "Information Architecture"],
      icon: CompassIcon,
    },
    {
      step: "02",
      title: "Futuristic UI/UX & Design Systems",
      desc: "Crafting a bespoke design language with dark cyberpunk aesthetics, interactive micro-states, fluid motion choreography, and high-fidelity interactive prototypes.",
      tags: ["Figma Wireframes", "Design Tokens", "Micro-Interactions"],
      icon: Layers,
    },
    {
      step: "03",
      title: "Full-Stack Engineering & API Integration",
      desc: "Production development using Next.js 16 App Router, React 19 Server Components, TypeScript, and high-performance serverless endpoints with bulletproof security.",
      tags: ["TypeScript Strict", "Server Actions", "Rest & GraphQL APIs"],
      icon: Code2,
    },
    {
      step: "04",
      title: "Rigorous QA & Core Web Vitals Auditing",
      desc: "Cross-device responsiveness testing, accessibility compliance, database indexing, and optimization to ensure sub-second global load times and perfect 100/100 scores.",
      tags: ["Lighthouse Benchmark", "Cross-Browser QA", "Security Penetration"],
      icon: Zap,
    },
    {
      step: "05",
      title: "Edge Deployment & 30-Day Hypercare",
      desc: "Global CDN rollout on Vercel Edge Network, custom domain SSL verification, complete source code transfer to your GitHub, and 30 days of active post-launch monitoring.",
      tags: ["Global Edge CDN", "Full IP Transfer", "30-Day Hypercare"],
      icon: Globe,
    },
  ];

  // ── Technology Stack Ecosystem ─────────────────────────────────────
  const techStack = [
    { name: "Next.js 16", category: "Framework", desc: "Turbopack, App Router & SSR Streaming" },
    { name: "React 19", category: "Library", desc: "Server Components & Concurrent UI" },
    { name: "TypeScript", category: "Language", desc: "Type-safe, clean architecture" },
    { name: "Tailwind CSS v4", category: "Styling", desc: "Modern utility-first responsive styling" },
    { name: "Framer Motion", category: "Animation", desc: "60 FPS spring physics & micro-animations" },
    { name: "Vercel Edge", category: "Cloud Infrastructure", desc: "Sub-50ms global content distribution" },
    { name: "PostgreSQL & Supabase", category: "Database", desc: "Relational persistence & real-time sync" },
    { name: "Stripe & Razorpay", category: "Payments", desc: "PCI-compliant checkout integrations" },
  ];

  // ── Client Guarantees & Charter ────────────────────────────────────
  const guarantees = [
    {
      icon: ShieldCheck,
      title: "100% Milestone-Based Protection",
      desc: "You never pay everything upfront. Scope is broken down into structured deliverables with client sign-off at each milestone.",
    },
    {
      icon: Lock,
      title: "Complete IP & Code Ownership",
      desc: "100% of the source code, design assets, and intellectual property are handed over to your repository upon project completion.",
    },
    {
      icon: Zap,
      title: "Performance SLA Guarantee",
      desc: "We guarantee 90+ Lighthouse mobile and desktop scores. Sub-second load times that keep visitors engaged and ranking high.",
    },
    {
      icon: HeartHandshake,
      title: "30-Day Complimentary Hypercare",
      desc: "Every project includes 30 days of post-launch technical support, maintenance, and bug fixes to ensure complete peace of mind.",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#020108] text-white">
      {/* ── Ambient Background Glows ─────────────────────────────────── */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-[radial-gradient(circle,_rgba(168,85,247,0.12)_0%,_transparent_70%)] blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[500px] bg-[radial-gradient(circle,_rgba(6,182,212,0.08)_0%,_transparent_70%)] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[500px] bg-[radial-gradient(circle,_rgba(236,72,153,0.07)_0%,_transparent_70%)] blur-[140px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION: THE SLRJ MANIFESTO
         ══════════════════════════════════════════════════════════════ */}
      <section className="pt-32 sm:pt-40 pb-20 relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-bold tracking-[0.25em] uppercase mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Architecture &bull; Craftsmanship &bull; Est. 2026</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight font-brand leading-[1.1] mb-6">
              Engineering The Next Era Of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">
                High-Performance Web
              </span>
            </h1>

            {/* Authoritative Subtitle */}
            <p className="text-base sm:text-xl text-gray-300 leading-relaxed font-sans mb-10 max-w-3xl mx-auto">
              SLRJ Digital is a premier digital engineering studio built on four timeless foundational pillars:{" "}
              <strong className="text-purple-300 font-semibold">Sankalp</strong>,{" "}
              <strong className="text-cyan-300 font-semibold">Lakshya</strong>,{" "}
              <strong className="text-pink-300 font-semibold">Rachna</strong>, and{" "}
              <strong className="text-emerald-300 font-semibold">Josh</strong>. We fuse cutting-edge Next.js architecture with bespoke cyberpunk aesthetics to deliver digital platforms that command authority and generate real business revenue.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/projects"
                className="px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] transition-all duration-300 flex items-center gap-2 active:scale-98"
              >
                <span>Explore Client Portfolio</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href="https://wa.me/918466974408?text=Hi%20SLRJ%20Digital,%20I%20would%20like%20to%20learn%20more%20about%20your%20agency%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full font-bold text-sm text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 hover:text-emerald-300 transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
              >
                <FaWhatsapp size={16} className="text-emerald-400" />
                <span>Direct WhatsApp Inquiries</span>
              </a>
            </div>
          </motion.div>

          {/* ── Key Metrics Bar Grid ─────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20">
            {metrics.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between group hover:border-purple-500/40 transition-all duration-300"
              >
                <span className="text-2xl sm:text-4xl font-black font-brand tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 group-hover:from-purple-300 group-hover:to-cyan-300 transition-all">
                  {item.value}
                </span>
                <div className="mt-3">
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase font-mono">{item.label}</h4>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-snug">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          THE 4 PILLARS (DEEP DIVE INTO S - L - R - J)
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <span className="text-xs font-mono font-bold text-cyan-400 tracking-[0.25em] uppercase mb-3 inline-block">
                {"// FOUNDATIONAL DNA //"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-brand mb-4">
                What SLRJ Truly Stands For
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Four Sanskrit values fused with modern digital engineering. These principles govern every architectural choice, design sprint, and line of code we write.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((val, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <SpotlightCard
                  spotlightColor={`${val.accent}25`}
                  className="p-8 sm:p-10 relative overflow-hidden group h-full flex flex-col justify-between border border-white/10 bg-[#080618]/90 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-500"
                >
                  {/* Giant Watermark Letter */}
                  <span className="absolute -bottom-6 -right-3 text-[180px] sm:text-[220px] font-black text-white/[0.025] group-hover:text-purple-400/[0.05] transition-colors duration-500 pointer-events-none select-none font-brand leading-none">
                    {val.letter}
                  </span>

                  <div>
                    {/* Header: Monogram + Name + Sanskrit */}
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl font-brand shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${val.accent}20, ${val.accent}40)`,
                            border: `1px solid ${val.accent}60`,
                            color: val.accent,
                          }}
                        >
                          {val.letter}
                        </div>
                        <div>
                          <div className="font-brand font-black text-xl tracking-wider text-white flex items-center gap-2">
                            <span>{val.name}</span>
                            <span className="text-xs font-normal text-gray-500 font-sans">({val.sanskrit})</span>
                          </div>
                          <span className="text-[11px] font-mono tracking-widest uppercase font-semibold" style={{ color: val.accent }}>
                            {val.subtitle}
                          </span>
                        </div>
                      </div>

                      <Flame size={18} style={{ color: val.accent }} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
                      {val.desc}
                    </p>
                  </div>

                  {/* Core Traits Badges */}
                  <div className="pt-4 border-t border-white/5 relative z-10 flex flex-wrap gap-2">
                    {val.traits.map((trait, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-gray-300 group-hover:border-white/20 transition-colors"
                      >
                        <CheckCircle2 size={12} style={{ color: val.accent }} />
                        <span>{trait}</span>
                      </span>
                    ))}
                  </div>

                  {/* Bottom Accent Glow Line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left"
                    style={{ background: `linear-gradient(to right, ${val.accent}, transparent)` }}
                  />
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          THE SLRJ ADVANTAGE VS TRADITIONAL AGENCIES
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative z-10 bg-[#040212] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold text-purple-400 tracking-[0.25em] uppercase mb-2 inline-block">
                {"// THE PERFORMANCE GAP //"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-brand mb-4">
                Why Visionaries Choose SLRJ Digital
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                The web has evolved past bloated WordPress templates and sluggish drag-and-drop builders. See how our bespoke engineering approach sets new industry benchmarks.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Traditional Agency Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold uppercase mb-6">
                  <span>Traditional Web Agencies</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  Legacy Architecture &amp; Bloated Overhead
                </h3>

                <ul className="space-y-4 text-sm text-gray-400">
                  {[
                    "Bloated WordPress plugins causing security vulnerabilities and sluggish load times.",
                    "Weeks lost in bureaucratic account manager meetings before code is ever written.",
                    "Hidden maintenance fees, license renewals, and surprise revision costs.",
                    "Subcontracting and outsourcing client work to unvetted junior offshore freelancers.",
                    "Mobile performance scores lingering in the sluggish 40–60 range.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                        &times;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-xs font-mono text-gray-500">
                RESULT: Fragile codebase, high technical debt, slow ROI.
              </div>
            </div>

            {/* The SLRJ Standard Card */}
            <SpotlightCard
              spotlightColor="rgba(168, 85, 247, 0.25)"
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0e0928] via-[#09061d] to-[#040212] border border-purple-500/30 flex flex-col justify-between shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-6">
                  <Sparkles size={12} className="text-emerald-400" />
                  <span>The SLRJ Digital Standard</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-brand mb-6 tracking-tight">
                  Next.js 16 Native &bull; Sub-Second Performance
                </h3>

                <ul className="space-y-4 text-sm text-gray-200">
                  {[
                    "Handcrafted Next.js 16 App Router & React 19 Server Components for instant responsiveness.",
                    "Direct communication with the lead engineer and product architect — zero middleman delays.",
                    "100% transparent milestone-based escrow billing with zero hidden charges.",
                    "Full intellectual property and clean GitHub repository transfer on launch day.",
                    "Guaranteed 90–100/100 Core Web Vitals speed scores and rigorous SEO structure.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                        <CheckCircle2 size={13} />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-purple-500/20 text-xs font-mono text-cyan-300 flex items-center justify-between">
                <span>RESULT: Scalable flagship digital platform ready for scale.</span>
                <Award size={16} className="text-purple-400 flex-shrink-0" />
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRECISION LIFECYCLE: OUR 5-STEP DELIVERY METHODOLOGY
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <span className="text-xs font-mono font-bold text-cyan-400 tracking-[0.25em] uppercase mb-2 inline-block">
                {"// SYSTEMATIZED EXECUTION //"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-brand mb-4">
                Our 5-Phase Precision Delivery Framework
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                We eliminate guesswork through a disciplined, milestone-verified engineering pipeline designed to launch on schedule and without surprises.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {processSteps.map((phase, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <SpotlightCard
                  spotlightColor="rgba(6, 182, 212, 0.15)"
                  className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
                >
                  <div className="flex items-start sm:items-center gap-5">
                    {/* Phase Number Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono font-black text-xl text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400/50 transition-all duration-300 flex-shrink-0 shadow-inner">
                      {phase.step}
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white font-brand group-hover:text-cyan-300 transition-colors">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1.5 max-w-3xl leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 self-start md:self-center flex-shrink-0">
                    {phase.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════
          CLIENT CHARTER & GUARANTEES
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold text-emerald-400 tracking-[0.25em] uppercase mb-2 inline-block">
                {"// RISK-FREE COMMITMENT //"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-brand mb-4">
                Our Client Trust Charter
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                We believe in total transparency. Every partnership is protected by explicit operational guarantees.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((item, idx) => (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(16, 185, 129, 0.15)"
                className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={22} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-brand mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 size={12} />
                  <span>Guaranteed by Contract</span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TECHNOLOGY STACK
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative z-10 bg-[#040210] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold text-cyan-400 tracking-[0.25em] uppercase mb-2 inline-block">
                {"// MODERN TECH STACK //"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-brand mb-4">
                Enterprise Tooling &amp; Infrastructure
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Zero legacy debt. Built exclusively with the most advanced, stable, and battle-tested modern web technologies.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-widest block mb-1">
                  {tech.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-brand group-hover:text-cyan-300 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-snug">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CALL TO ACTION
         ══════════════════════════════════════════════════════════════ */}
      <ContactCTA />
    </div>
  );
}

// Minimal internal icon helper
function CompassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
