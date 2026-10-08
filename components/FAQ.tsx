"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Pricing & Billing",
    question: "How much does a custom digital platform typically cost?",
    answer:
      "Our projects are tailored to your strategic scope rather than one-size-fits-all packages. Flagship business websites typically start around $1,500 – $3,500 (₹50k – ₹1.5L), while high-volume headless e-commerce architectures and custom full-stack web applications range from $4,000 – $10,000+ depending on database complexity, APIs, and real-time features. We provide itemized, fixed-price milestone quotes with zero hidden fees.",
  },
  {
    category: "Delivery Timeline",
    question: "What is your typical project delivery turnaround time?",
    answer:
      "Most high-performance business websites and interactive brand experiences launch within 2 to 4 weeks using our agile sprint methodology. Complex SaaS platforms, client portals, and multi-vendor e-commerce systems typically take 6 to 8 weeks. We define hard deliverable dates in our contract and adhere strictly to them.",
  },
  {
    category: "Ownership & Code",
    question: "Do I own 100% of the source code and intellectual property?",
    answer:
      "Yes, completely and unconditionally. Upon milestone completion and final launch, we transfer full ownership of the clean GitHub repository, design system tokens, database schemas, and all production assets directly to your team. You will never experience proprietary vendor lock-in with SLRJ Digital.",
  },
  {
    category: "Payments & Terms",
    question: "How do your milestone-based payment schedules work?",
    answer:
      "To ensure zero risk and mutual alignment, projects are structured into clear milestone phases: typically 30% upon kickoff and architectural approval, 30% upon interactive prototype and design sign-off, 30% upon staging QA verification, and 10% upon successful edge deployment. You approve each stage before releasing funds.",
  },
  {
    category: "Architecture & Stack",
    question: "Why do you engineer in Next.js 16 and React 19 instead of WordPress?",
    answer:
      "Traditional CMS platforms like WordPress suffer from heavy database overhead, fragile third-party plugins, security vulnerabilities, and sluggish mobile speeds. By leveraging Next.js 16 App Router, React 19 Server Components, and edge rendering, our applications achieve 100/100 Core Web Vitals, sub-second TTFB, bank-grade serverless security, and superior organic search rankings.",
  },
  {
    category: "Support & Warranty",
    question: "What post-launch support and maintenance do you offer?",
    answer:
      "Every production launch includes 30 days of complimentary Hypercare support, covering real-time edge monitoring, bug fixes, and performance fine-tuning. Following hypercare, we offer dedicated monthly SLA maintenance retainers covering security audits, dependency upgrades, content updates, and feature additions.",
  },
  {
    category: "Getting Started",
    question: "How do we kick off a project with SLRJ Digital?",
    answer:
      "Simply fill out our project inquiry form or request a direct WhatsApp consultation. We review your requirements within 24 hours, schedule a 20-minute technical discovery call, and present an actionable architectural blueprint and itemized estimate.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 sm:py-32 relative z-10 bg-transparent border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-bold tracking-[0.2em] uppercase mb-4">
            <HelpCircle size={14} className="text-purple-400" />
            <span>Clarity &amp; Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-brand mb-4">
            Frequently Asked <span className="gold-gradient-text">Questions</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our engineering standards, milestone delivery, transparent pricing, and post-launch guarantees.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#0c0824]/90 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-mono font-bold text-cyan-400/80 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20 shrink-0 hidden sm:inline-block">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white font-brand pr-2">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-purple-500/20 text-purple-300 rotate-180 border border-purple-500/40"
                        : "bg-white/5 text-gray-400 border border-white/10"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-black/60 border border-purple-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-base sm:text-lg font-bold text-white font-brand flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-400" />
              Have a specific question not listed here?
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Speak directly with our lead architect. We respond within 24 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all flex items-center gap-2 shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            <span>Ask Us Directly</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
