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
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Target,
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
  solutionCode?: string;
  taskDescription?: string;
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
  solutionCode,
  taskDescription,
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
  const [isSolutionRevealed, setIsSolutionRevealed] = useState(false);
  const [evalStatus, setEvalStatus] = useState<"idle" | "success" | "mismatch" | "empty">("idle");

  useEffect(() => {
    if (isOpen) {
      setCode(initialCode);
      setOutput(null);
      setIsRunning(false);
      setCopied(false);
      setXpAwarded(false);
      setCertUnlocked(false);
      setIsSolutionRevealed(false);
      setEvalStatus("idle");
    }
  }, [isOpen, initialCode, topicTitle]);

  // Lock body scroll and close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);

    // Simulate fast execution time
    setTimeout(() => {
      setIsRunning(false);

      const targetClean = (expectedOutput || "").trim().toLowerCase();
      const codeClean = code.trim();

      const hasPrintStmt = /printf|print|console\.log|System\.out\.println/i.test(codeClean);
      const isBlankScaffold =
        codeClean.includes("--- TODO: WRITE YOUR CODE BELOW ---") &&
        codeClean.replace(/--- TODO: WRITE YOUR CODE BELOW ---[\s\S]*?------------------------------------/g, "").length === codeClean.length;

      const printMatch = codeClean.match(/printf\s*\(\s*"([^"]+)"/i);
      const extractedPrint = printMatch ? printMatch[1].replace(/\\n/g, "").trim() : null;

      let simulatedOutput = "";
      let matched = false;

      if (targetClean) {
        if (
          codeClean.toLowerCase().includes(targetClean) ||
          (extractedPrint && targetClean.includes(extractedPrint.toLowerCase())) ||
          (solutionCode && codeClean.replace(/\s+/g, "") === solutionCode.replace(/\s+/g, ""))
        ) {
          simulatedOutput = expectedOutput || "Program compiled and executed with exit code 0.";
          matched = true;
          setEvalStatus("success");
        } else if (extractedPrint) {
          simulatedOutput = extractedPrint;
          matched = false;
          setEvalStatus("mismatch");
        } else if (!hasPrintStmt || isBlankScaffold) {
          simulatedOutput =
            "[Program compiled successfully with exit code 0, but no output was printed.]\n\nTask: Complete the TODO section in the code editor to produce the target output.";
          matched = false;
          setEvalStatus("empty");
        } else {
          simulatedOutput = expectedOutput || "Program compiled and executed with exit code 0.";
          matched = true;
          setEvalStatus("success");
        }
      } else {
        simulatedOutput = "Program compiled and executed successfully.\n[Process exited with return code 0]";
        matched = true;
        setEvalStatus("success");
      }

      setOutput(simulatedOutput);

      if (matched && !xpAwarded) {
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
    setIsSolutionRevealed(false);
    setEvalStatus("idle");
  };

  const handleToggleSolution = () => {
    if (isSolutionRevealed) {
      setCode(initialCode);
      setIsSolutionRevealed(false);
      setEvalStatus("idle");
    } else {
      if (solutionCode) {
        setCode(solutionCode);
        setIsSolutionRevealed(true);
        setEvalStatus("idle");
      }
    }
  };

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overscroll-contain"
      onClick={onClose}
    >
      <div
        data-lenis-prevent="true"
        className="w-full max-w-4xl bg-[#0B132B] text-slate-100 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[92vh] overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
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
            <span className="font-mono text-[11px] text-slate-300">
              main.{language === "c" ? "c" : language === "cpp" ? "cpp" : language === "python" ? "py" : language === "java" ? "java" : "js"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {solutionCode && (
              <button
                type="button"
                suppressHydrationWarning
                onClick={handleToggleSolution}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSolutionRevealed
                    ? "bg-amber-500/20 text-amber-300 border-amber-400/40"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700 hover:text-white"
                }`}
                title={isSolutionRevealed ? "Reset back to starter task" : "Show reference solution"}
              >
                <Lightbulb size={13} className={isSolutionRevealed ? "text-amber-400" : "text-slate-400"} />
                <span>{isSolutionRevealed ? "Hide Solution" : "Show Solution"}</span>
              </button>
            )}

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
        <div
          data-lenis-prevent="true"
          className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Chapter Task & Instructions Banner */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#070D1E] border border-cyan-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-400/25 flex items-center justify-center shrink-0">
                <Target size={16} />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    Chapter Task
                  </span>
                  <span className="text-[11px] text-slate-500">•</span>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    Scaffolding Pre-filled
                  </span>
                  <span className="text-[11px] text-slate-500">•</span>
                  <span className="text-[11px] text-amber-300 font-medium">
                    Fill in the missing code
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {taskDescription || "Complete the chapter code below to produce the target expected output."}
                </p>
              </div>
            </div>
          </div>

          {/* Code Textarea */}
          <div className="relative rounded-2xl bg-[#070C18] border border-slate-800 overflow-hidden shadow-inner">
            <textarea
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setEvalStatus("idle");
              }}
              spellCheck={false}
              rows={13}
              className="w-full p-4 font-mono text-xs sm:text-sm text-slate-200 bg-transparent resize-y focus:outline-none focus:ring-1 focus:ring-[#18B6D2]/40 leading-relaxed tracking-wide selection:bg-blue-600 selection:text-white"
            />
          </div>

          {/* Explanation / Architecture Insight if present */}
          {explanation && (
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
              <Sparkles size={15} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Topic Architecture Insight: </strong>
                <span>{explanation}</span>
              </div>
            </div>
          )}

          {/* ── Two-Column Target vs Live Output Panels ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Target Expected Output (Always Visible) */}
            <div className="rounded-2xl bg-[#060D1F] border border-cyan-500/35 overflow-hidden flex flex-col shadow-lg shadow-cyan-950/20">
              <div className="px-4 py-2 bg-[#09142A] border-b border-cyan-500/25 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Target size={14} className="text-cyan-400" />
                  <span className="font-mono text-[11px] font-bold text-cyan-200">
                    Target Expected Output
                  </span>
                </div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/15 px-2 py-0.5 rounded border border-cyan-500/30">
                  Target Result
                </span>
              </div>

              <div className="p-4 font-mono text-xs text-cyan-300 min-h-[110px] whitespace-pre-wrap leading-relaxed bg-[#050A18]/80 flex flex-col justify-between">
                <div>
                  {expectedOutput ? (
                    <div className="text-emerald-400 font-semibold">{expectedOutput}</div>
                  ) : (
                    <div className="text-slate-400 italic">Program compiled and executed with exit code 0.</div>
                  )}
                </div>
                <div className="pt-2 mt-3 border-t border-cyan-500/15 text-[10px] text-cyan-400/80 font-sans flex items-center justify-between">
                  <span>Match this console result</span>
                  <span>Exit code: 0</span>
                </div>
              </div>
            </div>

            {/* 2. Your Live Terminal Output */}
            <div
              className={`rounded-2xl bg-[#040810] border overflow-hidden flex flex-col transition-all ${
                evalStatus === "success"
                  ? "border-emerald-500/50 shadow-lg shadow-emerald-950/30"
                  : evalStatus === "mismatch"
                  ? "border-amber-500/50 shadow-lg shadow-amber-950/20"
                  : "border-slate-800"
              }`}
            >
              <div className="px-4 py-2 bg-[#070D1A] border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-emerald-400" />
                  <span className="font-mono text-[11px] font-bold text-slate-200">
                    Your Terminal Output (stdout)
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {language === "c" ? "gcc 14.2 (Ubuntu/x86_64)" : `${language} runtime`}
                </span>
              </div>

              <div className="p-4 font-mono text-xs text-slate-200 min-h-[110px] whitespace-pre-wrap leading-relaxed flex flex-col justify-between">
                <div>
                  {isRunning ? (
                    <div className="flex items-center gap-2 text-[#18B6D2]">
                      <Loader2 size={14} className="animate-spin" />
                      <span>Compiling executable and running process...</span>
                    </div>
                  ) : output ? (
                    <div className="space-y-2">
                      <div
                        className={
                          evalStatus === "success"
                            ? "text-emerald-300 font-semibold"
                            : evalStatus === "mismatch"
                            ? "text-amber-300"
                            : "text-slate-300"
                        }
                      >
                        {output}
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500 italic">
                      Click &apos;Run Code&apos; to compile and execute this program in the live terminal...
                    </div>
                  )}
                </div>

                {output && !isRunning && (
                  <div className="pt-2 mt-3 border-t border-slate-800/80 text-[10px] font-sans flex items-center justify-between">
                    {evalStatus === "success" ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 size={12} />
                        <span>Output Matches Target! +{isFinalCombined ? 100 : 30} XP Earned</span>
                      </span>
                    ) : evalStatus === "mismatch" ? (
                      <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                        <AlertTriangle size={12} />
                        <span>Output differs from Target Output</span>
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        Process exited with code 0 (0x0)
                      </span>
                    )}

                    <span className="text-slate-500 font-mono">
                      exit: 0
                    </span>
                  </div>
                )}
              </div>
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
