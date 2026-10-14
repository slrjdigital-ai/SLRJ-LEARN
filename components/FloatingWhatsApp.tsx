"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { X, Send, CheckCheck, Sparkles } from "lucide-react";

const emptySubscribe = () => () => {};

export default function FloatingWhatsApp() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const phoneNumber = "918466974408";

  const quickPrompts = [
    "🚀 I need a new website for my business",
    "🛒 I want to build an E-Commerce store",
    "⚡ I want to redesign my existing website",
    "💼 Let's discuss pricing and custom features",
  ];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleStartChat = (customText?: string) => {
    const textToSend = customText || "Hi SLRJ Learn, I would like to inquire about your learning resources.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div ref={popoverRef} className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 font-sans" suppressHydrationWarning>
      {/* --- POP-OVER CHAT WINDOW --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-3 w-[calc(100vw-2rem)] max-w-[340px] sm:max-w-[360px] rounded-2xl overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.85)] border border-white/10 bg-[#0b0f19] text-white backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-[#25D366] to-teal-600 p-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-black/40 border border-white/30 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt="SLRJ Learn"
                      width={28}
                      height={28}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-900 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wide leading-tight flex items-center gap-1.5">
                    SLRJ Learn
                    <Sparkles size={13} className="text-amber-200 fill-amber-200" />
                  </h4>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                    Online • Typically replies in 5m
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors text-white/80 hover:text-white"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-3.5 bg-[#080c14]/95">
              {/* Message from Agent */}
              <div className="flex items-start gap-2.5 max-w-[90%]">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaWhatsapp className="text-emerald-400" size={13} />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-3 text-xs leading-relaxed text-gray-200 shadow-sm">
                  <p className="font-semibold text-emerald-400 mb-1">Hi there! 👋</p>
                  <p>Welcome to SLRJ Learn. How can we help transform your learning journey today?</p>
                  <span className="block text-[10px] text-gray-500 text-right mt-1.5 flex items-center justify-end gap-1">
                    Just now <CheckCheck size={12} className="text-cyan-400 inline" />
                  </span>
                </div>
              </div>

              {/* Quick Prompts */}
              <div className="pt-1">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Choose a topic:
                </p>
                <div className="space-y-1.5">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleStartChat(prompt)}
                      className="w-full text-left text-xs px-3 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/15 border border-white/5 hover:border-emerald-500/40 text-gray-300 hover:text-emerald-300 transition-all duration-200 flex items-center justify-between group"
                    >
                      <span className="truncate pr-2">{prompt}</span>
                      <Send size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-emerald-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-3 bg-[#05070d] border-t border-white/5">
              <button
                onClick={() => handleStartChat()}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-emerald-500 hover:from-emerald-400 hover:to-[#25D366] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] transition-all duration-300"
              >
                <FaWhatsapp size={16} className="text-black" />
                <span>Open Direct WhatsApp Chat</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING TOGGLE BUTTON --- */}
      <div className="flex items-center gap-2.5">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#20ba59] via-[#25D366] to-emerald-400 text-white flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.6)] hover:shadow-[0_0_35px_rgba(37,211,102,0.85)] border border-emerald-300/40 transition-all duration-300 group"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulsing Ripple Effect */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-35 pointer-events-none"></span>

          {isOpen ? (
            <X size={22} className="text-white relative z-10 transition-transform group-hover:rotate-90 duration-300" />
          ) : (
            <FaWhatsapp size={26} className="text-white relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
          )}

          {/* Active Status Badge */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-[#030712] rounded-full"></span>
        </motion.button>

        {/* Floating Tooltip Pill (Desktop only) */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setIsOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0b0f19]/90 border border-emerald-500/30 backdrop-blur-md text-gray-200 text-xs font-semibold shadow-lg hover:border-emerald-500/60 cursor-pointer transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Chat on WhatsApp</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
