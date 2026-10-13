"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  UserPlus,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  GraduationCap,
} from "lucide-react";

const TRACK_OPTIONS = [
  "Full-Stack Web Development (React 19 & Next.js)",
  "Data Structures & Algorithms (DSA & LeetCode)",
  "Python, Data Science & Artificial Intelligence (AI)",
  "Computer Science Core (Operating Systems, DBMS & CN)",
  "Cloud Computing & DevOps (Docker, CI/CD & AWS)",
];

export default function RegisterClient() {
  const router = useRouter();
  const { register, user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [track, setTrack] = useState(TRACK_OPTIONS[0]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (user) {
    return (
      <div className="max-w-md mx-auto p-8 rounded-3xl bg-[#0D1527] border border-cyan-500/20 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 font-brand">Account Active</h2>
        <p className="text-gray-400 text-sm mb-6">
          Signed in as <span className="text-emerald-400 font-semibold">{user.name}</span> ({user.email})
        </p>
        <Link
          href="/dashboard"
          className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <span>Open My Learning Dashboard</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name || name.trim().length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid student or developer email.");
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const res = await register(name, email, password, track);
    setLoading(false);

    if (res.success) {
      router.push("/dashboard");
    } else {
      setErrorMessage(res.error || "Registration failed.");
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full">
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0C0E23] border border-indigo-500/25 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <GraduationCap size={14} />
            <span>Free Student & Developer Access</span>
          </div>
          <h1 className="text-3xl font-black text-white font-brand tracking-tight mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-400 text-sm">
            Save notes, track your 12-stage roadmap progress, and master full-stack tech skills.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
            <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} suppressHydrationWarning className="space-y-4 relative z-10">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <UserIcon
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                required
                suppressHydrationWarning
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Chen"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                required
                suppressHydrationWarning
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.chen@student.dev"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Password (6+ characters)
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                required
                minLength={6}
                suppressHydrationWarning
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
              />
            </div>
          </div>

          {/* Primary Track */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Select Your Learning Track
            </label>
            <select
              value={track}
              suppressHydrationWarning
              onChange={(e) => setTrack(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 font-sans cursor-pointer"
            >
              {TRACK_OPTIONS.map((t) => (
                <option key={t} value={t} className="bg-[#0D1527] text-white">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Benefit Bullets */}
          <div className="pt-2 pb-1 space-y-1.5 text-xs text-gray-400">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 size={13} />
              <span>Full access to 12 in-depth developer study guides</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <CheckCircle2 size={13} />
              <span>Interactive career roadmaps with milestone tracking</span>
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              <CheckCircle2 size={13} />
              <span>Save & bookmark notes with personal progress tracking</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            suppressHydrationWarning
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/40 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-4 active:scale-98"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin text-white" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus size={16} />
                <span>Complete Registration & Start Learning</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
          <p className="text-gray-400 text-xs">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline ml-1"
            >
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
