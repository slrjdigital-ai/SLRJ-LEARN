import Link from "next/link";
import { Home, Compass, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020108] text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 py-20">
        <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-bold tracking-[0.25em] uppercase mb-6 backdrop-blur-md">
          Error 404 &bull; Route Not Found
        </span>

        <h1 className="text-6xl sm:text-8xl font-black font-brand tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 mb-4">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold font-brand text-white mb-4">
          Lost in Digital Space
        </h2>

        <p className="text-gray-400 text-sm sm:text-base mb-10 leading-relaxed max-w-md mx-auto">
          The requested coordinate or URL does not exist or has been refactored into a newer architectural route.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <Link
            href="/"
            className="px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            <Home size={15} />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/services"
            className="px-6 py-3 rounded-full text-xs font-bold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white transition-all flex items-center gap-2"
          >
            <Compass size={15} />
            <span>Explore Services</span>
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-full text-xs font-bold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white transition-all flex items-center gap-2"
          >
            <MessageSquare size={15} />
            <span>Contact Support</span>
          </Link>
        </div>

        <div className="pt-8 border-t border-white/5 text-xs font-mono text-gray-500">
          SYSTEM_ID: SLRJ_CORE_404 // ALL CORE SYSTEMS NOMINAL
        </div>
      </div>
    </div>
  );
}
