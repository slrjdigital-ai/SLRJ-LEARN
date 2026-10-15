import { Metadata } from "next";
import CommunityView from "@/components/community/CommunityView";
import { Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Learning Community & Discussion Forum | SLRJ Learn",
  description:
    "Join the SLRJ Learn developer community. Ask technical questions, get mentorship feedback, share project showcases, and solve daily coding challenges.",
};

export default function CommunityPage() {
  return (
    <div className="space-y-8 pb-16">
      {/* ── Page Header ── */}
      <section className="rounded-3xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#18B6D2]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B6D2] text-xs font-bold uppercase tracking-wider">
            <Users size={14} className="text-[#18B6D2]" />
            <span>Developer Learning Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white">
            Collaborate, Ask & Grow Together
          </h1>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Connect with peers, get constructive feedback from experienced mentors, showcase real-world projects, and debug software engineering challenges together.
          </p>
        </div>
      </section>

      <CommunityView />
    </div>
  );
}
