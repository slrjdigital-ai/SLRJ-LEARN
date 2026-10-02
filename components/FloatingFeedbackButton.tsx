"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function FloatingFeedbackButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    const section = document.getElementById("feedback");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#feedback";
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40" suppressHydrationWarning>
      <motion.button
        suppressHydrationWarning
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="group relative flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7)] transition-all duration-300 font-bold text-xs"
        aria-label="Give Feedback"
      >
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-full w-full bg-amber-400"></span>
        </span>
        <Star size={16} className="fill-amber-300 text-amber-300 group-hover:rotate-45 transition-transform duration-300" />
        <span className="hidden sm:inline tracking-wider uppercase font-extrabold text-[11px]">
          Rate Us & Feedback
        </span>
      </motion.button>
    </div>
  );
}
