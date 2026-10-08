"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, MessageSquare } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors
    console.error("Global application error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#020108] text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 py-20">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={32} />
        </div>

        <span className="inline-block px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-mono font-bold tracking-[0.25em] uppercase mb-4 backdrop-blur-md">
          Runtime Exception Encountered
        </span>

        <h1 className="text-3xl sm:text-4xl font-black font-brand text-white mb-3">
          Something Interrupted Execution
        </h1>

        <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed max-w-md mx-auto">
          Our automated telemetry has captured this exception. You can re-attempt rendering or navigate safely back to the home hub.
        </p>

        {error?.digest && (
          <div className="mb-8 p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-400 max-w-sm mx-auto">
            Digest Code: {error.digest}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
          >
            <RefreshCw size={15} />
            <span>Attempt Recovery</span>
          </button>

          <Link
            href="/"
            className="px-6 py-3 rounded-full text-xs font-bold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white transition-all flex items-center gap-2"
          >
            <Home size={15} />
            <span>Return Home</span>
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-full text-xs font-bold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white transition-all flex items-center gap-2"
          >
            <MessageSquare size={15} />
            <span>Report Issue</span>
          </Link>
        </div>

        <div className="pt-8 border-t border-white/5 text-xs font-mono text-gray-500">
          STATUS: EXCEPTION_TRAPPED // SLRJ SAFETY BARRIER ACTIVE
        </div>
      </div>
    </div>
  );
}
