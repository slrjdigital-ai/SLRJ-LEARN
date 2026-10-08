"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  Search,
  PlusCircle,
  ShieldCheck,
  TrendingUp,
  Crown,
  Flame,
  Sparkles,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import ScrollReveal from "./ScrollReveal";
import { openFeedbackModal } from "./FeedbackModal";
import {
  FeedbackItem,
  FeedbackStats,
  initialFeedbackList,
  calculateFeedbackStats,
  getTopRatedFeedbacks,
} from "@/data/feedback";

const serviceOptions = [
  "General Experience",
  "Business Websites",
  "E-Commerce",
  "Web Applications",
  "UI/UX Design",
  "Maintenance & Support",
];

export default function FeedbackSection() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(initialFeedbackList);
  const [stats, setStats] = useState<FeedbackStats>(calculateFeedbackStats(initialFeedbackList));

  // View mode state: 'top5' by default as requested!
  const [viewMode, setViewMode] = useState<"top5" | "all">("top5");

  // Filters State
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | "all">("all");
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Track liked items locally
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  // Listen for newly submitted feedback to update local list and stats in real-time
  useEffect(() => {
    const handleFeedbackSubmitted = (e: Event) => {
      const customEvent = e as CustomEvent<{ feedback?: FeedbackItem; stats?: FeedbackStats }>;
      if (customEvent.detail?.feedback) {
        setFeedbackList((prev) => [customEvent.detail.feedback!, ...prev]);
      }
      if (customEvent.detail?.stats) {
        setStats(customEvent.detail.stats);
      }
    };
    window.addEventListener("feedback-submitted", handleFeedbackSubmitted);
    return () => window.removeEventListener("feedback-submitted", handleFeedbackSubmitted);
  }, []);

  // Fetch live feedback from API on mount
  useEffect(() => {
    async function fetchFeedback() {
      try {
        const res = await fetch("/api/feedback");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.feedback) {
            setFeedbackList(data.feedback);
            setStats(data.stats);
          }
        }
      } catch (err) {
        console.error("Failed to load feedback API:", err);
      }
    }

    fetchFeedback();
  }, []);

  const handleLike = async (id: string) => {
    if (likedIds.has(id)) return;

    // Optimistic UI update
    setLikedIds((prev) => new Set(prev).add(id));
    setFeedbackList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", feedbackId: id }),
      });
    } catch (err) {
      console.error("Failed to record like:", err);
    }
  };

  // Base list depending on viewMode (Top 5 vs All)
  const baseList = viewMode === "top5" ? getTopRatedFeedbacks(feedbackList, 5) : feedbackList;

  // Filtered List
  const displayedFeedback = baseList.filter((item) => {
    if (selectedRatingFilter !== "all" && Math.round(item.rating) !== selectedRatingFilter) {
      return false;
    }
    if (selectedServiceFilter !== "all" && item.service !== selectedServiceFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchComment = item.comment.toLowerCase().includes(q);
      const matchCompany = (item.company || "").toLowerCase().includes(q);
      const matchRole = (item.role || "").toLowerCase().includes(q);
      return matchName || matchComment || matchCompany || matchRole;
    }
    return true;
  });

  // Top 5 IDs set for badge check
  const top5Ids = new Set(getTopRatedFeedbacks(feedbackList, 5).map((item) => item.id));

  return (
    <section id="feedback" className="py-32 relative overflow-hidden" suppressHydrationWarning>
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" suppressHydrationWarning>
        {feedbackList.length === 0 ? (
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
              >
                <Sparkles size={14} className="text-purple-400" />
                Client Feedback &amp; Integrity
              </motion.span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight font-brand">
                Client Reviews{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
                  Coming Soon
                </span>
              </h2>

              <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-12">
                We&apos;re building meaningful digital experiences and collecting feedback from our clients as we grow.
              </p>

              {/* Attractive empty state showcase card */}
              <SpotlightCard
                spotlightColor="rgba(168, 85, 247, 0.25)"
                className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-6 text-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <MessageSquare size={30} />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-brand">
                  Authentic Partnerships &amp; Real Reviews
                </h3>

                <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
                  We prioritize transparent relationships and genuine feedback over inflated metrics. If you have partnered with SLRJ Digital on a project, we welcome your direct feedback.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => openFeedbackModal()}
                    className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlusCircle size={17} />
                    <span>Share Client Feedback</span>
                  </motion.button>

                  <Link
                    href="/contact"
                    className="py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all hover:border-purple-500/40"
                  >
                    Start a Project
                  </Link>
                </div>
              </SpotlightCard>
            </div>
          </ScrollReveal>
        ) : (
          <>
            {/* Section Header */}
            <ScrollReveal>
              <div className="text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
                >
                  <Crown size={14} className="text-amber-400" />
                  Client Ratings &amp; Reviews
                </motion.span>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  Verified by{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
                    Our Clients
                  </span>
                </h2>

                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                  Authentic reviews from clients who have partnered with SLRJ Digital.
                </p>
              </div>
            </ScrollReveal>

            {/* Rating Summary & Score System Card */}
            <ScrollReveal delay={0.1}>
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  {/* Score Highlight */}
                  <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-6xl font-black text-white tracking-tight">
                        {stats.averageRating}
                      </span>
                      <span className="text-gray-400 text-2xl font-bold">/ 5.0</span>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1.5 mb-3 text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={24}
                          className={
                            s <= Math.floor(stats.averageRating)
                              ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                              : s - 0.5 <= stats.averageRating
                              ? "fill-amber-400/50 text-amber-400"
                              : "text-gray-600"
                          }
                        />
                      ))}
                    </div>

                    <p className="text-gray-300 font-medium text-sm mb-4">
                      Based on <span className="text-white font-bold">{stats.totalReviews}</span> client feedback submissions
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                      <TrendingUp size={14} />
                      <span>{stats.recommendPercentage}% Recommend SLRJ</span>
                    </div>
                  </div>

                  {/* Progress Bars Breakdown */}
                  <div className="md:col-span-5 space-y-2.5">
                    {[5, 4, 3, 2, 1].map((starKey) => {
                      const count = stats.distribution[starKey as keyof typeof stats.distribution] || 0;
                      const pct = stats.totalReviews > 0 ? Math.round((count / stats.totalReviews) * 100) : 0;
                      return (
                        <div key={starKey} className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1 w-12 text-gray-300 font-semibold">
                            <span>{starKey}</span>
                            <Star size={12} className="fill-amber-400 text-amber-400" />
                          </div>
                          <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 rounded-full"
                            />
                          </div>
                          <span className="w-10 text-right text-xs text-gray-400 font-medium">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Action */}
                  <div className="md:col-span-3 flex flex-col items-center justify-center text-center pl-0 md:pl-4" suppressHydrationWarning>
                    <p className="text-gray-300 text-sm mb-5 font-medium">
                      Have you worked with SLRJ Digital? Add your rating &amp; review!
                    </p>

                    <motion.button
                      suppressHydrationWarning
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openFeedbackModal()}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                      <span>Rate Us &amp; Give Feedback</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </ScrollReveal>

        {/* View Mode Switcher (Top 5 Rated vs All Feedbacks) */}
        <ScrollReveal delay={0.12}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8" suppressHydrationWarning>
            <div className="flex flex-wrap items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl w-full sm:w-auto" suppressHydrationWarning>
              <button
                suppressHydrationWarning
                onClick={() => setViewMode("top5")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === "top5"
                    ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-lg shadow-amber-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Crown size={14} className={viewMode === "top5" ? "fill-white text-white" : "text-amber-400"} />
                <span>Top 5 Rated Feedbacks</span>
              </button>

              <button
                suppressHydrationWarning
                onClick={() => setViewMode("all")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === "all"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <MessageSquare size={14} />
                <span>All Feedbacks ({feedbackList.length})</span>
              </button>
            </div>

            {viewMode === "top5" && (
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
                <Flame size={14} /> Showing top 5 highest-rated client reviews
              </span>
            )}
          </div>
        </ScrollReveal>

        {/* Filter Controls Bar */}
        <ScrollReveal delay={0.15}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white/[0.03] border border-white/10 rounded-2xl p-4 backdrop-blur-md" suppressHydrationWarning>
            {/* Rating Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto" suppressHydrationWarning>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2 hidden sm:inline">
                Stars:
              </span>
              <button
                suppressHydrationWarning
                onClick={() => setSelectedRatingFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedRatingFilter === "all"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                All
              </button>
              {[5, 4, 3].map((r) => (
                <button
                  key={r}
                  suppressHydrationWarning
                  onClick={() => setSelectedRatingFilter(r)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                    selectedRatingFilter === r
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{r}</span>
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                </button>
              ))}
            </div>

            {/* Service & Search Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto" suppressHydrationWarning>
              <select
                suppressHydrationWarning
                value={selectedServiceFilter}
                onChange={(e) => setSelectedServiceFilter(e.target.value)}
                className="w-full sm:w-auto bg-black/40 border border-white/10 text-gray-300 text-xs rounded-xl px-3.5 py-2 focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Services</option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-gray-900 text-white">
                    {opt}
                  </option>
                ))}
              </select>

              <div className="relative w-full sm:w-64" suppressHydrationWarning>
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  suppressHydrationWarning
                  type="text"
                  placeholder="Search feedback..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-gray-200 text-xs rounded-xl pl-9 pr-3.5 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Feedback Cards Grid */}
        {displayedFeedback.length === 0 ? (
          <div className="text-center py-20 px-6 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl backdrop-blur-md max-w-2xl mx-auto shadow-xl" suppressHydrationWarning>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-5 text-purple-400">
              <MessageSquare size={32} />
            </div>

            {feedbackList.length === 0 ? (
              <>
                <h3 className="text-2xl font-black text-white mb-2">No Client Reviews Yet</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                  Be the very first client to share your feedback and rating for SLRJ Digital!
                </p>
                <motion.button
                  suppressHydrationWarning
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openFeedbackModal()}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <PlusCircle size={16} />
                  <span>Be the First to Rate Us</span>
                </motion.button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-200 mb-2">No reviews match your search or filter</h3>
                <p className="text-gray-400 text-sm mb-6">Try clearing active search keywords or resetting star filters.</p>
                <button
                  suppressHydrationWarning
                  onClick={() => {
                    setSelectedRatingFilter("all");
                    setSelectedServiceFilter("all");
                    setSearchQuery("");
                    setViewMode("all");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-purple-600/20 text-purple-300 text-xs font-semibold hover:bg-purple-600/30 border border-purple-500/30 transition-colors"
                >
                  Reset All Filters
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedFeedback.map((item, idx) => {
              const isLiked = likedIds.has(item.id);
              const isTop5 = top5Ids.has(item.id);
              const initials = item.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <ScrollReveal key={item.id} delay={idx * 0.05}>
                  <SpotlightCard
                    spotlightColor={isTop5 ? "rgba(245, 158, 11, 0.2)" : "rgba(168, 85, 247, 0.15)"}
                    className={`h-full p-6 md:p-8 rounded-3xl flex flex-col justify-between group transition-all duration-300 relative ${
                      isTop5 ? "border-amber-500/30 hover:border-amber-400/60" : "hover:border-purple-500/40"
                    }`}
                  >
                    <div>
                      {/* Top Badge Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={16}
                              className={
                                s <= item.rating
                                  ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                                  : "text-gray-600"
                              }
                            />
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          {isTop5 && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 uppercase tracking-widest flex items-center gap-1">
                              <Crown size={10} className="fill-amber-300 text-amber-300" /> Top Rated
                            </span>
                          )}

                          {item.service && (
                            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
                              {item.service}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Comment */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 italic group-hover:text-white transition-colors">
                        &quot;{item.comment}&quot;
                      </p>
                    </div>

                    {/* Bottom Author & Actions */}
                    <div className="border-t border-white/10 pt-4 mt-auto">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Avatar Circle */}
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                            {initials}
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-white text-sm">{item.name}</h4>
                              {item.verified && (
                                <span title="Verified Client">
                                  <ShieldCheck size={14} className="text-cyan-400" />
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400">
                              {item.role} {item.company ? `@ ${item.company}` : ""}
                            </p>
                          </div>
                        </div>

                        {/* Like Button */}
                        <motion.button
                          suppressHydrationWarning
                          whileTap={{ scale: 0.85 }}
                          onClick={() => handleLike(item.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                            isLiked
                              ? "bg-pink-500/20 border-pink-500/40 text-pink-400"
                              : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <ThumbsUp size={13} className={isLiked ? "fill-pink-400 text-pink-400" : ""} />
                          <span>{item.likes}</span>
                        </motion.button>
                      </div>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </>
    )}
  </div>
</section>
  );
}
