"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are the courses and PDF handbooks on SLRJ Learn completely free?",
      a: "Yes. All curated courses, 17 downloadable handwritten PDF handbooks, and interactive code playgrounds are completely free and open to all registered learners. There are no surprise fees or paywalled core lessons.",
    },
    {
      q: "How does the certificate verification system work?",
      a: "Every certificate issued contains a unique, non-predictable identifier (e.g. SLRJ-CERT-2026-XXXX) and a live QR code. Anyone—including hiring managers and universities—can scan the QR code or visit /verify-certificate/[certificateId] to instantly confirm the certificate's validity, learner name, completion date, and course requirements.",
    },
    {
      q: "What are the requirements to earn an SLRJ Learn certificate?",
      a: "To maintain academic credibility, certificates are only issued after a learner completes all course modules and passes the server-graded assessment with an 80% or higher score. Certificates cannot be purchased or earned merely by clicking buttons.",
    },
    {
      q: "Can I download and print the digital PDF handbooks?",
      a: "Yes. All 17 handbooks in our PDF Library are generated as high-resolution printable documents. You can view them in our in-browser reader or download them to your device for offline study.",
    },
    {
      q: "What programming languages and frameworks are covered?",
      a: "Our curriculum spans Web Development (HTML5, CSS3, JavaScript, TypeScript, React, Next.js), Python & Automation, Data Structures & Algorithms (DSA), Relational Database Design & SQL, and AI Application Engineering.",
    },
    {
      q: "How does the Coding Playground run code in the browser?",
      a: "Our Playground supports live web execution for HTML/CSS/JS and client-side Python execution, allowing you to experiment, build small tools, and solve challenges directly in your browser without local environment setup.",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#18B6D2] tracking-wider uppercase flex items-center justify-center gap-1.5">
          <HelpCircle size={14} className="text-[#18B6D2]" />
          Common Questions
        </span>
        <h2 className="text-2xl sm:text-3xl font-black font-brand text-[#182230] tracking-tight mt-1">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-[#64748B] mt-1">
          Everything you need to know about SLRJ Learn courses, assessments, and certifications.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="clean-card overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-bold text-sm text-[#182230]">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#64748B] flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#12316B]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
