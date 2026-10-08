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
    category: "Process",
    question: "How does the SLRJ project process work?",
    answer:
      "We follow a transparent, collaborative process: Discovery (understanding your business and goals), Design (wireframes and interactive previews), Development (clean coding using modern technology), Review & Testing (quality checks across viewports), and Launch (deployment and asset handoff). You review and sign off on key milestones along the way.",
  },
  {
    category: "Timeline",
    question: "How long does a project take?",
    answer:
      "A standard business website typically takes 2 to 3 weeks. E-commerce platforms and custom web applications usually require 3 to 6 weeks depending on feature complexity and scope. We provide an honest timeline during discovery and keep you updated at every stage.",
  },
  {
    category: "Pricing",
    question: "How much does a website cost?",
    answer:
      "Our estimated starting prices begin around ₹14,999 for focused business websites. E-commerce platforms and custom web apps vary depending on features, integrations, and design complexity. You can explore our interactive Project Estimator for starting figures, and we provide transparent, itemized quotes before starting any work.",
  },
  {
    category: "Preparation",
    question: "What information do I need to provide?",
    answer:
      "To get started, we need an overview of your business or idea, any reference websites you like, your branding assets (logo, preferred colors), and your content (text and images). If you don't have all content ready yet, we will help you organize and structure what is needed.",
  },
  {
    category: "Hosting & Domain",
    question: "Do you provide domain and hosting setup?",
    answer:
      "Yes. We assist you with domain registration and configure cloud hosting on fast, modern platforms such as Vercel. You maintain 100% direct ownership of both your domain and hosting accounts — we never hold your infrastructure hostage.",
  },
  {
    category: "Ownership",
    question: "Do I own my website after completion?",
    answer:
      "Yes, completely. Once the project is completed and handed over, you own the entire source code, GitHub repository, design assets, and content. There is no vendor lock-in.",
  },
  {
    category: "Support",
    question: "Do you provide maintenance and support?",
    answer:
      "Yes. Every launch includes post-launch support to ensure smooth operation. We also offer ongoing maintenance options for routine updates, security checks, content adjustments, and technical assistance as your business grows.",
  },
  {
    category: "AI & Innovation",
    question: "Can you build custom AI solutions?",
    answer:
      "Yes. We build practical AI integrations tailored for business needs, such as automated customer inquiry chatbots, AI-assisted lead capture, OpenAI API integrations, and smart internal search tools that fit directly into your website or application.",
  },
  {
    category: "Redesign",
    question: "Can you redesign an existing website?",
    answer:
      "Yes. We regularly help businesses modernize sluggish or outdated websites. We evaluate your current user experience, preserve what works, migrate your content, and rebuild the site with modern design and fast, responsive technology.",
  },
  {
    category: "Getting Started",
    question: "How do I start a project?",
    answer:
      "You can begin by submitting our contact form, calculating an initial scope with our Project Estimator, or messaging us directly on WhatsApp at +91 8466974408. We will review your goals and schedule a friendly discussion to plan the next steps.",
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
