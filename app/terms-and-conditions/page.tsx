import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Code2,
  ShieldCheck,
  Mail,
  Phone,
  ArrowLeft,
  Calendar,
  Building2,
  Scale,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | SLRJ Digital",
  description: "Official Terms and Conditions of Service for SLRJ Digital web engineering and agency services.",
  alternates: {
    canonical: "https://slrjdigital.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <Scale size={14} className="text-cyan-400" />
            Official Terms of Service
          </div>

          <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight">
            Terms &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
              Conditions
            </span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6">
            The binding legal agreement governing client contracts, software project deliverables, intellectual property ownership, and website access for SLRJ Digital.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-purple-400" />
              Effective Date: <strong className="text-white">{lastUpdated}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 size={14} className="text-cyan-400" />
              Service Provider: <strong className="text-white">SLRJ Digital</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Code2 size={14} className="text-pink-400" />
              Software & Web Engineering
            </span>
          </div>
        </div>

        {/* HIGHLIGHTED BINDING AGREEMENT NOTICE */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 via-purple-950/30 to-amber-950/30 border border-amber-500/30 backdrop-blur-md shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 via-pink-500 to-purple-500" />
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 shrink-0 mt-0.5">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 uppercase tracking-wider flex items-center gap-2">
                <span>Binding Legal Notice</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/40">
                  Client Agreement
                </span>
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                By browsing <strong className="text-amber-300">slrjdigital.com</strong>, submitting project inquiry forms, or entering into a software development engagement with SLRJ Digital, you agree to be bound by these Terms & Conditions. If you do not agree, please refrain from accessing our site or contracting our services.
              </p>
            </div>
          </div>
        </div>

        {/* HIGHLIGHTED CODE & IP OWNERSHIP NOTICE */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 via-cyan-900/20 to-purple-900/30 border border-purple-500/30 backdrop-blur-md shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-purple-400 via-cyan-400 to-pink-500" />
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 shrink-0 mt-0.5">
              <Code2 size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 uppercase tracking-wider flex items-center gap-2">
                <span>Highlighted Notice: 100% Client Code Ownership</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/30 text-cyan-200 border border-cyan-400/40">
                  IP Transfer
                </span>
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                Upon final client approval and full settlement of agreed project fees, <strong>100% full legal ownership of final custom source code, designs, and digital assets is transferred directly to the client</strong>. SLRJ Digital retains no secret backdoors or ungranted code claims on your custom project.
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-12 text-gray-300 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-cyan-400 font-mono text-lg">01.</span>
              <span>Services Provided</span>
            </h2>
            <p className="mb-4">
              <strong>SLRJ Digital</strong> specializes in high-performance digital solutions, including:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              <li className="flex items-center gap-2.5 bg-white/[0.02] p-3 rounded-xl border border-white/5 text-gray-200 font-medium">
                <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                <span>Next.js & React Web Applications</span>
              </li>
              <li className="flex items-center gap-2.5 bg-white/[0.02] p-3 rounded-xl border border-white/5 text-gray-200 font-medium">
                <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                <span>High-Converting E-Commerce Platforms</span>
              </li>
              <li className="flex items-center gap-2.5 bg-white/[0.02] p-3 rounded-xl border border-white/5 text-gray-200 font-medium">
                <CheckCircle2 size={16} className="text-pink-400 shrink-0" />
                <span>Custom UI/UX & Interactive Design</span>
              </li>
              <li className="flex items-center gap-2.5 bg-white/[0.02] p-3 rounded-xl border border-white/5 text-gray-200 font-medium">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>SEO Optimization & Technical Maintenance</span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-cyan-400 font-mono text-lg">02.</span>
              <span>Project Milestones & Payment Terms</span>
            </h2>
            <p className="mb-4">
              All custom software and web development projects operate under defined scope documentation and milestone payments:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                <Zap size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Project Kickoff Deposit:</strong> A deposit (typically 50%) is required prior to commencing wireframing, design sprints, or code development.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Final Milestone & Deployment:</strong> The remaining balance is payable upon complete client review, staging deployment verification, and prior to transferring live domain control or master repository access.
                </div>
              </li>
            </ul>
          </div>

          {/* HIGHLIGHTED WARRANTY NOTICE */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <ShieldCheck size={20} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-1">
                  Highlighted Notice: 30-Day Post-Launch Bug Warranty
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  Every custom website or web application delivered by SLRJ Digital comes with a <strong>30-Day Post-Launch Bug Warranty</strong>. Any technical defects or functional bugs within the agreed scope identified within 30 days of launch will be resolved at zero additional cost.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-cyan-400 font-mono text-lg">03.</span>
              <span>Client Responsibilities</span>
            </h2>
            <p className="mb-4">
              To maintain agreed delivery schedules, clients agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Provide required brand logos, images, text copy, and API access tokens in a timely manner.</li>
              <li>Provide constructive feedback during designated review checkpoints.</li>
              <li>Ensure all submitted media assets do not infringe third-party copyrights.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-cyan-400 font-mono text-lg">04.</span>
              <span>Limitation of Liability</span>
            </h2>
            <p className="mb-4">
              SLRJ Digital strives for 100% technical uptime and optimal performance. However, SLRJ Digital shall not be held liable for indirect damages, third-party hosting server outages (e.g. Vercel, AWS, Cloudflare), domain Registrar failures, or client modifications made to source code after project handover.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-cyan-400 font-mono text-lg">05.</span>
              <span>Governing Law & Dispute Resolution</span>
            </h2>
            <p className="mb-4">
              These Terms & Conditions are governed by and construed in accordance with the laws of <strong>India</strong>. Any legal action or dispute arising under these terms shall be settled exclusively in the competent courts of <strong>Andhra Pradesh, India</strong>.
            </p>
          </div>

          {/* OFFICIAL CONTACT INFORMATION CARD */}
          <div className="mt-12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
              <Mail className="text-purple-400" size={20} />
              <span>Official Legal Contact</span>
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              For legal inquiries, scope clarifications, or contract inquiries regarding SLRJ Digital, please contact us directly:
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
