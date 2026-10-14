import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Mail,
  Phone,
  ArrowLeft,
  Calendar,
  Building2,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | SLRJ Learn",
  description: "Official Privacy Policy for SLRJ Learn platform and educational services.",
  alternates: {
    canonical: "https://slrjlearn.in/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 1, 2026";

  return (
    <section className="pt-28 sm:pt-32 pb-16 sm:pb-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-purple-400 transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <ShieldCheck size={14} className="text-purple-400" />
            Official Legal Policy
          </div>

          <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
              Policy
            </span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6">
            Transparent information on how SLRJ Learn collects, protects, processes, and respects your personal and business data.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-purple-400" />
              Effective Date: <strong className="text-white">{lastUpdated}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 size={14} className="text-cyan-400" />
              Entity: <strong className="text-white">SLRJ Learn</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Lock size={14} className="text-emerald-400" />
              SSL/TLS Encrypted
            </span>
          </div>
        </div>

        {/* HIGHLIGHTED TOP NOTICE BOX */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-purple-900/30 border border-purple-500/30 backdrop-blur-md shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-purple-400 via-pink-500 to-cyan-400" />
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 shrink-0 mt-0.5">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 uppercase tracking-wider flex items-center gap-2">
                <span>Highlighted Privacy Pledge</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/40">
                  Strict Confidentiality
                </span>
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                <strong>SLRJ Learn will NEVER sell, rent, trade, or monetize your personal or project data</strong> to third-party advertisers or data brokers. All client communications, scope documentation, and proprietary code assets remain 100% confidential.
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-12 text-gray-300 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-purple-400 font-mono text-lg">01.</span>
              <span>Introduction & Scope</span>
            </h2>
            <p className="mb-4">
              Welcome to <strong>SLRJ Learn</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We operate the website <Link href="/" className="text-purple-400 hover:underline">slrjlearn.in</Link> and provide custom web development, UI/UX design, software engineering, and e-commerce solutions.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit project inquiry forms, leave feedback, or contract our digital services.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-purple-400 font-mono text-lg">02.</span>
              <span>Information We Collect</span>
            </h2>
            <p className="mb-4">
              We collect information that you voluntarily provide to us when expressing an interest in obtaining information about us or our services, when submitting contact inquiries, or when providing client feedback:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                <CheckCircle2 size={18} className="text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Identity & Contact Data:</strong> Includes your full name, business email address, phone/WhatsApp number, business entity name, and job title.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Project Scope & Specifications:</strong> Details about your target budget, desired tech stack, project goals, wireframes, and design references.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                <CheckCircle2 size={18} className="text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Technical & Usage Metadata:</strong> IP address, browser type, device specifications, operating system, and timestamp data captured strictly for rate-limiting, security logging, and spam defense.
                </div>
              </li>
            </ul>
          </div>

          {/* HIGHLIGHTED NOTICE: TRANSMISSION SECURITY */}
          <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <Lock size={20} className="text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-1">
                  Highlighted Notice: Encryption & Transmission Security
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  All messages and forms submitted through our website use <strong>256-bit SSL/TLS encryption</strong> over HTTPS. Email notifications are dispatched using <strong>TLS/STARTTLS authentication</strong> over secure ports.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-purple-400 font-mono text-lg">03.</span>
              <span>How We Use Your Data</span>
            </h2>
            <p className="mb-4">
              We process your personal information for specific business purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>To evaluate project inquiries and issue technical scope proposals.</li>
              <li>To execute software development contracts and deliver agreed deliverables.</li>
              <li>To send automated inquiry receipts and project status updates.</li>
              <li>To publish verified client ratings and testimonials (only with your express consent).</li>
              <li>To prevent fraud, honeypot spam attacks, and unauthorized system access.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-purple-400 font-mono text-lg">04.</span>
              <span>Cookies & Local Storage</span>
            </h2>
            <p className="mb-4">
              We utilize essential session cookies and browser LocalStorage solely to improve site performance (e.g. saving splash screen preferences and UI layout themes). We do not use third-party invasive tracking cookies or selling trackers.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-purple-400 font-mono text-lg">05.</span>
              <span>Data Retention & Your Privacy Rights</span>
            </h2>
            <p className="mb-4">
              Under applicable data protection frameworks (including the <strong>Digital Personal Data Protection Act - DPDP 2023</strong>), you possess the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete records.</li>
              <li><strong>Right to Erasure:</strong> Request permanent deletion of your contact records from our servers.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-purple-400 font-mono text-lg">06.</span>
              <span>Governing Law & Jurisdiction</span>
            </h2>
            <p className="mb-4">
              This Privacy Policy is governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes arising under this policy shall be subject to the exclusive jurisdiction of the competent courts in <strong>Andhra Pradesh, India</strong>.
            </p>
          </div>

          {/* OFFICIAL CONTACT INFORMATION CARD */}
          <div className="mt-12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
              <Mail className="text-purple-400" size={20} />
              <span>Official Privacy Officer Contact</span>
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              If you have any questions, data deletion requests, or privacy concerns regarding SLRJ Learn, please contact us directly:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="mailto:slrj.digital@gmail.com"
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Official Email</div>
                  <div className="text-white text-sm font-bold">slrj.digital@gmail.com</div>
                </div>
              </a>

              <a
                href="https://wa.me/918466974408"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">WhatsApp / Phone</div>
                  <div className="text-white text-sm font-bold">+91 8466974408</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
