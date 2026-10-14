"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  CheckCircle2,
  X,
  Sparkles,
  Send,
  Loader2,
} from "lucide-react";
import {
  FeedbackItem,
  FeedbackStats,
} from "@/data/feedback";

const emptySubscribe = () => () => {};

const ratingLabels: Record<number, string> = {
  1: "Needs Improvement 😞",
  2: "Fair / Average 😐",
  3: "Good & Satisfactory 🙂",
  4: "Very Good Work! 😊",
  5: "Outstanding / Exceptional! 🚀🌟",
};

const serviceOptions = [
  "General Experience",
  "Business Websites",
  "E-Commerce",
  "Web Applications",
  "UI/UX Design",
  "Maintenance & Support",
];

// Helper to trigger the modal from anywhere in the application
export function openFeedbackModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-feedback-modal"));
  }
}

export default function FeedbackModal() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isOpen, setIsOpen] = useState(false);

  // Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("Business Websites");
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState(true);
  const [honeypot, setHoneypot] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Listen for global open requests
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-feedback-modal", handleOpen);
    return () => window.removeEventListener("open-feedback-modal", handleOpen);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!rating) {
      setErrorMsg("Please select a star rating.");
      return;
    }

    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg("Please enter your name (at least 2 characters).");
      return;
    }

    if (!comment.trim() || comment.trim().length < 5) {
      setErrorMsg("Please write a detailed review (at least 5 characters).");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          name: name.trim(),
          email: email.trim(),
          role: role.trim(),
          company: company.trim(),
          service,
          comment: comment.trim(),
          recommend,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Failed to submit feedback. Please try again.");
        return;
      }

      setSuccessMsg(data.message || "Thank you! Your feedback has been published.");

      // Dispatch event to update local lists if FeedbackSection is mounted
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent<{ feedback: FeedbackItem; stats: FeedbackStats }>(
            "feedback-submitted",
            {
              detail: {
                feedback: data.feedback,
                stats: data.stats,
              },
            }
          )
        );
      }

      // Reset form fields
      setName("");
      setEmail("");
      setRole("");
      setCompany("");
      setComment("");
      setRating(5);

      setTimeout(() => {
        setIsOpen(false);
        setSuccessMsg("");
      }, 2000);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please check your network connection."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          suppressHydrationWarning
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-xl bg-[#0d111d] border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
            suppressHydrationWarning
          >
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400" />

            {/* Close Button */}
            <button
              suppressHydrationWarning
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Title */}
            <div className="mb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1 mb-2">
                <Sparkles size={14} /> SLRJ Learn Review
              </span>
              <h3 className="text-2xl font-black text-white">Rate & Submit Feedback</h3>
              <p className="text-gray-400 text-xs mt-1">
                Your feedback helps us continuously elevate our service standards and design quality.
              </p>
            </div>

            {/* Alerts */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
              {/* Spam Honeypot */}
              <input
                suppressHydrationWarning
                type="text"
                name="honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Star Rating Picker */}
              <div suppressHydrationWarning>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Overall Rating <span className="text-pink-500">*</span>
                </label>

                <div className="flex items-center gap-2 mb-2" suppressHydrationWarning>
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isActive = starVal <= (hoverRating || rating);
                    return (
                      <button
                        key={starVal}
                        suppressHydrationWarning
                        type="button"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                        aria-label={`Rate ${starVal} star${starVal > 1 ? "s" : ""}`}
                      >
                        <Star
                          size={28}
                          className={`transition-all duration-200 ${
                            isActive
                              ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                              : "text-gray-600 hover:text-gray-400"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs font-medium text-amber-400 h-4">
                  {ratingLabels[hoverRating || rating]}
                </p>
              </div>

              {/* Grid Inputs */}
              <div className="grid sm:grid-cols-2 gap-4" suppressHydrationWarning>
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-pink-500">*</span>
                  </label>
                  <input
                    suppressHydrationWarning
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    suppressHydrationWarning
                    type="email"
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                {/* Role / Job Title */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Your Role / Designation
                  </label>
                  <input
                    suppressHydrationWarning
                    type="text"
                    placeholder="e.g. Founder, Director"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    suppressHydrationWarning
                    type="text"
                    placeholder="e.g. TechCorp"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Service Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Service Rated
                </label>
                <select
                  suppressHydrationWarning
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-gray-900 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Comment Text Area */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Feedback / Detailed Review <span className="text-pink-500">*</span>
                  </label>
                  <span className="text-[11px] text-gray-500">{comment.length} / 500</span>
                </div>
                <textarea
                  suppressHydrationWarning
                  rows={4}
                  required
                  maxLength={500}
                  placeholder="Tell us about your experience with SLRJ Learn..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>

              {/* Recommend Checkbox */}
              <div className="flex items-center gap-3 pt-1">
                <input
                  suppressHydrationWarning
                  type="checkbox"
                  id="modal-recommend"
                  checked={recommend}
                  onChange={(e) => setRecommend(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-700 text-purple-600 focus:ring-purple-500 accent-purple-600 cursor-pointer"
                />
                <label htmlFor="modal-recommend" className="text-xs text-gray-300 cursor-pointer select-none">
                  I would recommend SLRJ Learn to others.
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10" suppressHydrationWarning>
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 text-xs font-semibold hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  suppressHydrationWarning
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitting}
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
