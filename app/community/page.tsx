import { Metadata } from "next";
import CommunityView from "@/components/community/CommunityView";
import { Users, Sparkles, MessageSquare, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Learning Community & Discussion Forum | SLRJ Learn",
  description:
    "Join the SLRJ Learn developer community. Ask technical questions, get mentorship feedback, share project showcases, and solve daily coding challenges.",
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20">
      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Users size={14} className="text-cyan-400" />
            <span>Developer Learning Network</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white mb-3">
            Collaborate, Ask &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Grow Together.
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Connect with peers, get code reviews from experienced mentors, showcase real-world projects, and debug complex challenges together.
          </p>
        </div>

        <CommunityView />
      </div>
    </div>
  );
}
