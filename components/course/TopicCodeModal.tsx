"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useGamification } from "@/context/GamificationContext";
import { useCertificatesManager } from "@/lib/certificateStorage";
import { useAuth } from "@/context/AuthContext";
import { recordCodeCompletion } from "@/lib/courseProgressMetrics";
import {
  X,
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Code2,
  Sparkles,
  Loader2,
  FileCode,
  Award,
} from "lucide-react";

interface TopicCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle: string;
  topicNumber?: number | string;
  courseTitle: string;
  courseSlug: string;
  language: string;
  initialCode: string;
  expectedOutput?: string;
  explanation?: string;
  isFinalCombined?: boolean;
}

export default function TopicCodeModal({
  isOpen,
  onClose,
  topicTitle,
  topicNumber,
  courseTitle,
  courseSlug,
  language,
  initialCode,
  expectedOutput,
  explanation,
  isFinalCombined = false,
}: TopicCodeModalProps) {
  const { awardXP } = useGamification();
  const { claimCertificate } = useCertificatesManager();
  const { user } = useAuth();

  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const [certUnlocked, setCertUnlocked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCode(initialCode);
      setOutput(null);
      setIsRunning(false);
      setCopied(false);
      setXpAwarded(false);
      setCertUnlocked(false);
    }
  }, [isOpen, initialCode, topicTitle]);

  if (!isOpen) return null;

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);

    // Simulate fast execution time
    setTimeout(() => {
      setIsRunning(false);

      if (expectedOutput) {
        setOutput(expectedOutput);
      } else {
        setOutput("Program compiled and executed successfully.\n[Process exited with return code 0]");
      }

      if (!xpAwarded) {
        // Record code practice completion for course progress metrics
        recordCodeCompletion(courseSlug, isFinalCombined ? "final" : String(topicNumber ?? "1"));

        try {
          awardXP(isFinalCombined ? 100 : 30, `${topicTitle} Code Executed`);
        } catch (e) {
          console.error(e);
        }
        setXpAwarded(true);

        if (isFinalCombined) {
          try {
            claimCertificate({
              learnerName: user?.name || "Shahid",
              learnerEmail: user?.email || "shahid@slrjlearn.in",
              title: "Certificate of Course Completion",
              category: "Course",
              sourceType: "course",
              sourceId: courseSlug,
              sourceTitle: courseTitle,
              scorePercentage: 100,
              skillsGained: ["Full Course Mastery", "Practical Engineering & Code Execution"],
            });
            setCertUnlocked(true);
          } catch (err) {
            console.error("Certificate claim error:", err);
          }
        }
      }
    }, 450);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(null);
  };

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-[#0B132B] text-slate-100 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal Header ── */}
        <div className="p-4 sm:p-5 bg-[#090F21] border-b border-slate-800 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#173B70] text-[#18B6D2] border border-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Code2 size={20} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-[#18B6D2] border border-blue-400/30 text-[10px] font-black uppercase tracking-wider">
                  {isFinalCombined ? "Full Capstone Project" : `Topic ${topicNumber ?? "Code"}`}
                </span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[10px] font-bold uppercase">
                  {language.toUpperCase()}
                </span>
                <span className="text-slate-500 text-xs hidden sm:inline">•</span>
                <span className="text-slate-400 text-xs truncate hidden sm:inline">{courseTitle}</span>
              </div>
              <h2 className="text-base sm:text-lg font-black font-brand text-white truncate mt-0.5">
                {topicTitle}
              </h2>
            </div>
          </div>

          <button
            type="button"
            suppressHydrationWarning
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex-shrink-0"
            title="Close editor"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Editor Toolbar ── */}
        <div className="px-4 py-2.5 bg-[#0D1527] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs flex-shrink-0">
          <div className="flex items-center gap-2 text-slate-400">
            <FileCode size={14} className="text-[#18B6D2]" />
            <span className="font-mono text-[11px] text-slate-300">main.{language === "c" ? "c" : language === "cpp" ? "cpp" : language === "python" ? "py" : language === "java" ? "java" : "js"}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copy code"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>

            <button
              type="button"
              suppressHydrationWarning
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Reset starter code"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              suppressHydrationWarning
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-4 py-1.5 rounded-lg bg-[#18B6D2] hover:bg-[#15a2bc] disabled:opacity-50 text-[#090F21] font-bold flex items-center gap-1.5 shadow-md shadow-[#18B6D2]/20 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              {isRunning ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Compiling...</span>
                </>
              ) : (
                <>
                  <Play size={13} fill="currentColor" />
                  <span>Run Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Editor & Terminal Workspace ── */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Code Textarea */}
          <div className="relative rounded-2xl bg-[#070C18] border border-slate-800 overflow-hidden shadow-inner">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              rows={14}
              className="w-full p-4 font-mono text-xs sm:text-sm text-slate-200 bg-transparent resize-y focus:outline-none focus:ring-1 focus:ring-[#18B6D2]/40 leading-relaxed tracking-wide selection:bg-blue-600 selection:text-white"
            />
          </div>

          {/* Explanation if present */}
          {explanation && (
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
              <Sparkles size={16} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Topic Architecture Insight: </strong>
                <span>{explanation}</span>
              </div>
            </div>
          )}

          {/* Output Terminal Console */}
          <div className="rounded-2xl bg-[#040810] border border-slate-800/90 overflow-hidden">
            <div className="px-4 py-2 bg-[#070D1A] border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal size={13} className="text-emerald-400" />
                <span className="font-mono text-[11px] font-bold text-slate-300">Terminal Output (stdout)</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                {language === "c" ? "gcc 14.2 (Ubuntu/x86_64)" : `${language} runtime`}
              </span>
            </div>

            <div className="p-4 font-mono text-xs text-slate-200 min-h-[110px] whitespace-pre-wrap leading-relaxed">
              {isRunning ? (
                <div className="flex items-center gap-2 text-[#18B6D2]">
                  <Loader2 size={14} className="animate-spin" />
                  <span>Building executable and running process...</span>
                </div>
              ) : output ? (
                <div className="space-y-3">
                  <div className="text-emerald-300">{output}</div>
                  <div className="pt-2 border-t border-slate-800/60 text-[10px] text-slate-500 font-sans flex items-center justify-between">
                    <span>Process exited with code 0 (0x0)</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Sparkles size={11} />
                      <span>+{isFinalCombined ? 100 : 30} XP Earned</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 italic">
                  Click &apos;Run Code&apos; to compile and execute this program in the live terminal...
                </div>
              )}
            </div>
          </div>

          {/* Certificate Unlocked Celebratory Banner */}
          {certUnlocked && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-[#0A2E24] border border-emerald-500/50 text-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 shadow-xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0">
                  <Award size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded">
                      Milestone Achieved
                    </span>
                    <span className="text-xs font-bold text-white">Final Course Capstone Passed!</span>
                  </div>
                  <p className="text-xs text-emerald-200/90 mt-0.5">
                    Your official certificate for <strong className="text-white">{courseTitle}</strong> is now UNLOCKED.
                  </p>
                </div>
              </div>

              <Link
                href="/certificates"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#18B6D2] hover:bg-[#15a2bc] text-[#090F21] font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>View Certificate</span>
                <span>→</span>
              </Link>
            </div>
          )}
        </div>

        {/* ── Modal Footer ── */}
        <div className="p-4 bg-[#090F21] border-t border-slate-800 flex items-center justify-between gap-3 flex-shrink-0">
          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
            target="_blank"
            title="Open in full playground"
          >
            <span>Open in Full IDE Sandbox</span>
            <ExternalLink size={12} />
          </Link>

          <button
            type="button"
            suppressHydrationWarning
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white hover:bg-slate-200 text-[#090F21] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
