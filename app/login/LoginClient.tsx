"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LogIn,
  Mail,
  KeyRound,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  RefreshCw,
  Lock,
} from "lucide-react";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";

  const { sendCode, verifyCode, user } = useAuth();

  // Authentication step: 'email' (enter email) | 'otp' (verify 6-digit code)
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  // Countdown timer for resend
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const [switchAccount, setSwitchAccount] = useState(false);

  // If already logged in and not switching, show logged-in confirmation
  if (user && !switchAccount) {
    return (
      <div className="max-w-md mx-auto p-8 rounded-3xl bg-[#0C0E23] border border-indigo-500/25 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 font-brand">Active Default Session</h2>
        <p className="text-gray-400 text-sm mb-6">
          Currently signed in as <span className="text-indigo-400 font-semibold">{user.name}</span> ({user.email})
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/40"
          >
            <span>Continue to Learning Platform</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/dashboard"
            className="w-full py-3 px-4 rounded-xl text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-center"
          >
            Go to Student Dashboard
          </Link>
          <button
            onClick={() => setSwitchAccount(true)}
            className="w-full py-2.5 px-4 rounded-xl text-xs text-indigo-400 hover:text-indigo-300 hover:bg-white/5 transition-all text-center cursor-pointer"
          >
            Switch Account / Sign In with Another Email
          </button>
        </div>
      </div>
    );
  }

  // Handle Step 1: Send OTP to user's email
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setErrorMessage("Please enter a valid student or developer email address.");
      return;
    }

    setLoading(true);
    const res = await sendCode(trimmed);
    setLoading(false);

    if (res.success) {
      setSuccessMessage(res.message || `A 6-digit access code was sent to ${trimmed}.`);
      setStep("otp");
      setResendTimer(45); // 45 seconds cooldown
    } else {
      setErrorMessage(res.error || "Failed to dispatch verification email. Please try again.");
    }
  };

  // Handle Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedOtp = otp.trim();
    if (!trimmedOtp || trimmedOtp.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);
    const res = await verifyCode(email.trim().toLowerCase(), trimmedOtp);
    setLoading(false);

    if (res.success) {
      router.push(returnTo);
    } else {
      setErrorMessage(res.error || "Verification failed. Please check the code.");
    }
  };

  // Resend code handler
  const handleResend = async () => {
    if (resendTimer > 0 || loading) return;
    setErrorMessage(null);
    setLoading(true);
    const res = await sendCode(email.trim().toLowerCase());
    setLoading(false);

    if (res.success) {
      setSuccessMessage("A fresh 6-digit verification code has been dispatched to your email.");
      setResendTimer(45);
    } else {
      setErrorMessage(res.error || "Failed to resend code.");
    }
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0C0E23] border border-indigo-500/25 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles size={12} />
            <span>Fully Protected Access</span>
          </div>
          <h1 className="text-3xl font-black text-white font-brand tracking-tight mb-2">
            Sign In / Log In
          </h1>
          <p className="text-gray-400 text-sm">
            {step === "email"
              ? "Enter your email address to receive a secure 6-digit one-time access code directly in your inbox."
              : `Enter the 6-digit verification code sent to ${email}.`}
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 relative z-10">
            <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Banner */}
        {successMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 relative z-10">
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* STEP 1: Enter Email */}
        {step === "email" ? (
          <form onSubmit={handleRequestOtp} suppressHydrationWarning className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Your Email Address
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
                  placeholder="name@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all font-sans"
                />
              </div>
              <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1.5 font-mono">
                <ShieldCheck size={12} className="text-cyan-400" />
                <span>Passwordless login &bull; Code delivered to your inbox</span>
              </p>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-300">
                <input
                  type="checkbox"
                  suppressHydrationWarning
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-0"
                />
                <span>Remember this browser</span>
              </label>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                <Lock size={12} />
                <span>Gmail SMTP Protected</span>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              suppressHydrationWarning
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/40 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2 active:scale-98"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-white" />
                  <span>Sending Security Code...</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Send Login Code to Email</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* STEP 2: Enter 6-digit OTP code received in email */
          <form onSubmit={handleVerifyOtp} suppressHydrationWarning className="space-y-4 relative z-10">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-300">
                  6-Digit Security Code
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  Change Email
                </button>
              </div>

              <div className="relative">
                <KeyRound
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  required
                  maxLength={6}
                  suppressHydrationWarning
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-lg tracking-[8px] font-mono font-bold focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-center"
                />
              </div>

              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-gray-400 text-[11px]">
                  Check inbox & spam folder
                </span>
                <button
                  type="button"
                  disabled={resendTimer > 0 || loading}
                  onClick={handleResend}
                  className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
                  <span>
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              suppressHydrationWarning
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/40 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-3 active:scale-98"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-white" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>Verify Code & Sign In</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Security Feature Highlights */}
        <div className="mt-8 pt-6 border-t border-white/10 relative z-10 grid grid-cols-2 gap-3 text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
            <span>Encrypted Session</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0" />
            <span>Strict Email Access</span>
          </div>
        </div>

        {/* Footer / Register Link */}
        <div className="mt-4 pt-4 border-t border-white/5 text-center relative z-10">
          <p className="text-gray-400 text-xs">
            New developer or student?{" "}
            <Link
              href="/register"
              className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline ml-1"
            >
              Create Account Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
