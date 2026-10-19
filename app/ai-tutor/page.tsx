import { Metadata } from "next";
import AiTutorChat from "@/components/ai/AiTutorChat";
import { Bot, Sparkles, BookOpen, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Samy — AI Coding Companion | SLRJ Learn",
  description:
    "Interactive AI programming mentor. Get step-by-step code explanations, error diagnosis, progressive hints, and practice quizzes.",
};

export default function AiTutorPage() {
  return (
    <div className="space-y-8 pb-16">
      {/* ── Page Header ── */}
      <section className="rounded-3xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#18B6D2]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B6D2] text-xs font-bold uppercase tracking-wider">
            <Bot size={14} className="text-[#18B6D2]" />
            <span>24/7 Socratic Learning Assistant</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white">
            Samy AI Coding Assistant
          </h1>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Never get stuck on a bug or syntax question again. Ask Samy for instant line-by-line code breakdowns, error diagnoses, and concept practice.
          </p>
        </div>
      </section>

      {/* Feature Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
        <div className="clean-card p-3.5 text-center">
          <span className="text-[#12316B] font-bold text-xs block mb-1">📖 Line-by-Line</span>
          <span className="text-[#64748B] text-[11px]">Deconstruct complex algorithms</span>
        </div>
        <div className="clean-card p-3.5 text-center">
          <span className="text-[#16865C] font-bold text-xs block mb-1">🐛 Bug Diagnosis</span>
          <span className="text-[#64748B] text-[11px]">Identifies root cause & fix</span>
        </div>
        <div className="clean-card p-3.5 text-center">
          <span className="text-[#18B6D2] font-bold text-xs block mb-1">💡 Socratic Hints</span>
          <span className="text-[#64748B] text-[11px]">Teaches you how to think</span>
        </div>
        <div className="clean-card p-3.5 text-center">
          <span className="text-amber-700 font-bold text-xs block mb-1">🧩 Custom Quizzes</span>
          <span className="text-[#64748B] text-[11px]">Test retention on any topic</span>
        </div>
      </div>

      {/* Main AI Chat Interface */}
      <AiTutorChat />
    </div>
  );
}
