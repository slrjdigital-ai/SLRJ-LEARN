"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Bell } from "lucide-react";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data?.success) {
        if (data.alreadySubscribed) {
          setStatus("already");
          setMessage("You are already subscribed to developer updates!");
        } else {
          setStatus("success");
          setMessage("Welcome! You will receive new web dev notes and tutorials.");
          setEmail("");
        }
      } else {
        setStatus("error");
        setMessage(data?.error || "Subscription failed. Please check your email.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }

    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 7000);
  };

  return (
    <div className="my-14 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0C0E23] via-[#12163B] to-[#0C0E23] border border-indigo-500/25 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Bell size={13} className="text-indigo-400" />
          <span>Never Miss a New Study Guide</span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-brand tracking-tight mb-3">
          Get New Engineering Notes Directly to Your Inbox
        </h3>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
          Join aspiring developers receiving weekly engineering notes, Next.js architecture breakdowns, interview prep questions, and cheatsheets.
        </p>

        <form onSubmit={handleSubmit} suppressHydrationWarning className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            suppressHydrationWarning
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your student or developer email..."
            required
            disabled={status === "loading"}
            className="flex-1 px-4 py-3.5 rounded-xl bg-white/[0.05] border border-indigo-950 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all backdrop-blur-md disabled:opacity-60 font-sans"
          />

          <button
            type="submit"
            suppressHydrationWarning
            disabled={status === "loading"}
            className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin text-white" />
                <span>Subscribing...</span>
              </>
            ) : status === "success" || status === "already" ? (
              <>
                <CheckCircle2 size={16} className="text-white" />
                <span>Joined!</span>
              </>
            ) : (
              <>
                <span>Get Free Notes</span>
                <Send size={15} />
              </>
            )}
          </button>
        </form>

        {/* Status Feedback Messages */}
        {message && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono">
            {status === "error" ? (
              <>
                <AlertCircle size={14} className="text-red-400" />
                <span className="text-red-300">{message}</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span className="text-emerald-300">{message}</span>
              </>
            )}
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-gray-500">
          <span>✓ No spam guarantee</span>
          <span>✓ 100% Free educational notes</span>
          <span>✓ Unsubscribe anytime</span>
        </div>
      </div>
    </div>
  );
}
