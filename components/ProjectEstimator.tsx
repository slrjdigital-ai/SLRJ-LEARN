"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Check, ArrowRight, MessageSquare, Sparkles, Shield, Rocket } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

interface ProjectType {
  id: string;
  name: string;
  basePrice: number;
  days: number;
  desc: string;
  icon: string;
}

interface Feature {
  id: string;
  name: string;
  price: number;
  days: number;
  category: string;
}

export default function ProjectEstimator() {
  const projectTypes: ProjectType[] = [
    {
      id: "business",
      name: "High-Performance Business Site",
      basePrice: 14999,
      days: 10,
      desc: "Custom multi-page website tailored for lead generation and brand authority.",
      icon: "🏢",
    },
    {
      id: "ecommerce",
      name: "Full E-Commerce Store",
      basePrice: 24999,
      days: 18,
      desc: "End-to-end shopping experience with payment gateways, cart & catalog.",
      icon: "🛍️",
    },
    {
      id: "webapp",
      name: "Custom Web App / SaaS MVP",
      basePrice: 39999,
      days: 25,
      desc: "Full-stack application with user authentication, database & custom logic.",
      icon: "⚡",
    },
    {
      id: "redesign",
      name: "Futuristic UI/UX Redesign",
      basePrice: 12999,
      days: 8,
      desc: "Transform your existing website into a modern, award-winning experience.",
      icon: "🎨",
    },
  ];

  const features: Feature[] = [
    { id: "seo", name: "100/100 Core Web Vitals & SEO Suite", price: 3999, days: 2, category: "Performance" },
    { id: "payments", name: "Payment Gateway Integration (Stripe / Razorpay)", price: 4999, days: 3, category: "Commerce" },
    { id: "cms", name: "Headless CMS for Easy Blog & Content Updates", price: 5999, days: 3, category: "Content" },
    { id: "animations", name: "3D Isometric Models & Custom Framer Motion", price: 6999, days: 4, category: "Design" },
    { id: "analytics", name: "Conversion Tracking & Analytics Dashboard", price: 2999, days: 1, category: "Growth" },
    { id: "whatsapp", name: "Direct WhatsApp Live Chat & AI Lead Bot", price: 2499, days: 1, category: "Support" },
  ];

  const [selectedType, setSelectedType] = useState<string>("business");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["seo", "animations"]);
  const [timelineUrgency, setTimelineUrgency] = useState<number>(1); // 1 = Standard, 0.8 = Express (+25% cost, 30% faster)

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const currentType = projectTypes.find((p) => p.id === selectedType) || projectTypes[0];
  const featuresCost = selectedFeatures.reduce((total, fId) => {
    const f = features.find((item) => item.id === fId);
    return total + (f ? f.price : 0);
  }, 0);

  const featuresDays = selectedFeatures.reduce((total, fId) => {
    const f = features.find((item) => item.id === fId);
    return total + (f ? f.days : 0);
  }, 0);

  const rawTotal = (currentType.basePrice + featuresCost) * (timelineUrgency === 0.8 ? 1.25 : 1);
  const totalDays = Math.max(7, Math.round((currentType.days + featuresDays) * (timelineUrgency === 0.8 ? 0.7 : 1)));

  // Generate WhatsApp pre-filled message link
  const featureNames = selectedFeatures
    .map((fId) => features.find((f) => f.id === fId)?.name)
    .filter(Boolean)
    .join(", ");

  const waMessage = encodeURIComponent(
    `Hello SLRJ Digital! I just calculated a project estimate on your website:\n\n• Project: ${currentType.name}\n• Add-ons: ${featureNames || "None"}\n• Est. Timeline: ~${totalDays} Days\n• Est. Investment: ₹${Math.round(rawTotal).toLocaleString()}\n\nI would love to discuss starting this project with you!`
  );

  const waUrl = `https://wa.me/918466974408?text=${waMessage}`;

  return (
    <section className="py-24 relative overflow-hidden bg-[#03020D]/90 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.1)_0%,_rgba(6,182,212,0.05)_45%,_transparent_75%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          >
            <Calculator size={13} className="text-cyan-400" />
            Transparent Pricing & Scope
          </motion.span>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight font-brand">
            Interactive Project{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4]">
              Estimator
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Configure your dream digital solution and receive an instant transparent scope, timeline, and investment estimate.
          </p>
        </div>

        {/* ── Main Interactive Layout ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Options & Feature Selectors */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
            {/* Step 1: Project Type Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                <span>01.</span>
                <span>Select Your Project Foundation</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {projectTypes.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <motion.div
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "bg-purple-950/30 border-purple-500/60 shadow-[0_0_25px_rgba(168,85,247,0.25)]"
                          : "bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{type.icon}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-purple-500 border-purple-400 text-white"
                              : "border-white/20 bg-transparent"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                      <h4 className="text-white font-bold text-sm sm:text-base mb-1">
                        {type.name}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {type.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add-on Capabilities */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                <span>02.</span>
                <span>Select Desired Capabilities & Features</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 ${
                        isChecked
                          ? "bg-cyan-950/20 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                          : "bg-white/[0.02] border-white/5 text-gray-300 hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                            isChecked
                              ? "bg-cyan-400 border-cyan-300 text-black"
                              : "border-white/20 bg-transparent"
                          }`}
                        >
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span className="text-xs font-medium leading-snug">
                          {feat.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Timeline Urgency */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-xs font-mono font-bold text-pink-400 uppercase tracking-wider">
                <span>03.</span>
                <span>Deployment Velocity</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setTimelineUrgency(1)}
                  className={`p-3.5 rounded-xl border cursor-pointer text-center transition-all ${
                    timelineUrgency === 1
                      ? "bg-pink-950/20 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                      : "bg-white/[0.02] border-white/5 hover:border-white/15"
                  }`}
                >
                  <p className="text-sm font-bold text-white mb-0.5">Standard Sprint</p>
                  <p className="text-[11px] text-gray-400">Regular milestone pace</p>
                </div>

                <div
                  onClick={() => setTimelineUrgency(0.8)}
                  className={`p-3.5 rounded-xl border cursor-pointer text-center transition-all ${
                    timelineUrgency === 0.8
                      ? "bg-pink-950/20 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                      : "bg-white/[0.02] border-white/5 hover:border-white/15"
                  }`}
                >
                  <p className="text-sm font-bold text-pink-300 mb-0.5 flex items-center justify-center gap-1">
                    <Rocket size={13} />
                    Express Sprint
                  </p>
                  <p className="text-[11px] text-gray-400">30% faster prioritized delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4-5 cols): Live Estimate Card */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
            <SpotlightCard
              spotlightColor="rgba(168, 85, 247, 0.25)"
              className="p-6 sm:p-7 rounded-3xl bg-[#080718]/95 border border-purple-500/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.2)]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-cyan-400" />
                  Live Estimation
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider">
                  Guaranteed SLA
                </span>
              </div>

              {/* Estimate Price Display */}
              <div className="mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-mono">
                  Estimated Investment
                </span>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-purple-200 font-brand mt-1">
                  ₹{Math.round(rawTotal).toLocaleString("en-IN")}{" "}
                  <span className="text-sm text-gray-400 font-normal font-sans">
                    / ~${Math.round(rawTotal / 85)} USD
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  *Transparent scope. No hidden recurring fees.
                </p>
              </div>

              {/* Scope Breakdown */}
              <div className="space-y-3 py-4 border-y border-white/10 mb-6 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Foundation</span>
                  <span className="text-white font-medium truncate max-w-[180px]">{currentType.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Selected Features</span>
                  <span className="text-cyan-300 font-bold">{selectedFeatures.length} Added</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Estimated Delivery</span>
                  <span className="text-purple-300 font-bold font-mono">~{totalDays} Business Days</span>
                </div>
              </div>

              {/* Trust highlights */}
              <div className="space-y-2 mb-6 text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield size={13} className="text-emerald-400 flex-shrink-0" />
                  <span>100% Milestone-based payment structure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={13} className="text-cyan-400 flex-shrink-0" />
                  <span>Full source code & IP ownership transferred to you</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.55)] transition-all duration-300 active:scale-98"
                >
                  <MessageSquare size={17} />
                  <span>Discuss Quote on WhatsApp</span>
                  <ArrowRight size={15} />
                </a>

                <a
                  href="/contact"
                  className="w-full py-3 px-6 rounded-xl font-semibold text-xs text-center text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Or Submit Project Brief
                </a>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
