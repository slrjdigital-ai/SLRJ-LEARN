import { Metadata } from "next";
import AiTutorChat from "@/components/ai/AiTutorChat";
import { Bot, Sparkles, BookOpen, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Coding Tutor | SLRJ Learn",
  description:
    "Interactive AI programming mentor. Get step-by-step code explanations, error diagnosis, progressive hints, and practice quizzes.",
};

export default function AiTutorPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20">
      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Bot size={14} className="text-cyan-400" />
            <span>24/7 Intelligent Socratic Mentor</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white mb-3">
            Your Personal AI Coding Tutor
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Never get stuck on an error again. Paste broken code, ask for conceptual explanations, or generate custom quizzes tailored to your syllabus.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          <div className="p-3.5 rounded-2xl bg-[#080D1A] border border-white/5 text-center">
            <span className="text-cyan-400 font-bold text-xs block mb-1">📖 Line-by-Line</span>
            <span className="text-slate-400 text-[11px]">Deconstruct complex algorithms</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#080D1A] border border-white/5 text-center">
            <span className="text-emerald-400 font-bold text-xs block mb-1">🐛 Bug Diagnosis</span>
            <span className="text-slate-400 text-[11px]">Identifies root cause & fix</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#080D1A] border border-white/5 text-center">
            <span className="text-purple-400 font-bold text-xs block mb-1">💡 Socratic Hints</span>
            <span className="text-slate-400 text-[11px]">Teaches you how to think</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#080D1A] border border-white/5 text-center">
            <span className="text-amber-400 font-bold text-xs block mb-1">🧩 Custom Quizzes</span>
            <span className="text-slate-400 text-[11px]">Test retention on any topic</span>
          </div>
        </div>

        {/* Main AI Chat Interface */}
        <AiTutorChat />
      </div>
    </div>
  );
}
