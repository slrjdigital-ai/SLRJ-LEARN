"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QuizQuestionItem } from "./topicPracticeData";
import { useGamification } from "@/context/GamificationContext";
import { useAuth } from "@/context/AuthContext";
import { useCertificatesManager } from "@/lib/certificateStorage";
import { recordQuizCompletion } from "@/lib/courseProgressMetrics";
import {
  X,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";

interface TopicQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle: string;
  topicNumber?: number | string;
  courseTitle: string;
  courseSlug: string;
  questions: QuizQuestionItem[];
  isFinalCombined?: boolean;
}

export default function TopicQuizModal({
  isOpen,
  onClose,
  topicTitle,
  topicNumber,
  courseTitle,
  courseSlug,
  questions,
  isFinalCombined = false,
}: TopicQuizModalProps) {
  const { awardXP } = useGamification();
  const { user } = useAuth();
  const { claimCertificate } = useCertificatesManager();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);

  // Reset state when modal opens with new questions
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setSelectedAnswers({});
      setShowHint({});
      setIsCompleted(false);
      setXpAwarded(false);
    }
  }, [isOpen, topicTitle]);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex] || questions[0];
  const hasAnsweredCurrent = selectedAnswers[currentIndex] !== undefined;
  const isCorrect = hasAnsweredCurrent && selectedAnswers[currentIndex] === currentQ?.correctAnswer;

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent) return; // Prevent re-selection
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Calculate score & award XP
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswer) {
          correctCount++;
        }
      });

      if (!xpAwarded) {
        // Record quiz completion for course progress metrics
        recordQuizCompletion(courseSlug, isFinalCombined ? "final" : String(topicNumber ?? "1"));

        const xpEarned = isFinalCombined ? 250 : 100;
        try {
          awardXP(xpEarned, `${topicTitle} Quiz Completed`);
        } catch (e) {
          console.error(e);
        }

        // Auto-unlock & issue certificate when final combined course quiz is completed
        if (isFinalCombined) {
          const finalScorePct = Math.round((correctCount / Math.max(1, questions.length)) * 100);
          if (finalScorePct >= 70) {
            try {
              claimCertificate({
                learnerName: user?.name || "Shahid",
                learnerEmail: user?.email || "shahid@slrjlearn.in",
                title: "Certificate of Course Completion",
                category: "Course",
                sourceType: "course",
                sourceId: courseSlug,
                sourceTitle: courseTitle,
                scorePercentage: finalScorePct,
                skillsGained: ["Full Course Mastery", "Algorithms & Problem Solving"],
              });
            } catch (err) {
              console.error("Certificate claim error:", err);
            }
          }
        }

        setXpAwarded(true);
      }

      setIsCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowHint({});
    setIsCompleted(false);
  };

  // Calculate final score
  const correctCount = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctAnswer ? acc + 1 : acc;
  }, 0);
  const scorePercent = Math.round((correctCount / Math.max(1, questions.length)) * 100);
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal Header ── */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#12316B] to-[#1A3D80] text-white flex items-start justify-between gap-4 flex-shrink-0">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[#18B6D2] text-[11px] font-black uppercase tracking-wider">
                {isFinalCombined ? "All Topics Combined" : `Topic ${topicNumber ?? "Module"}`}
              </span>
              <span className="text-blue-200 text-xs">•</span>
              <span className="text-blue-100 text-xs font-semibold">{courseTitle}</span>
              <span className="text-blue-200 text-xs">•</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                {questions.length} Questions
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black font-brand text-white leading-snug">
              {topicTitle}
            </h2>
          </div>

          <button
            type="button"
            suppressHydrationWarning
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer flex-shrink-0"
            title="Close quiz"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Quiz Body ── */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {!isCompleted ? (
            <>
              {/* Progress Bar & Header Counters */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <div className="flex items-center gap-2">
                    <span>
                      Question <strong className="text-[#173B70] text-sm">{currentIndex + 1}</strong> of {questions.length}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 font-medium">
                      Answered: <strong className="text-[#173B70]">{answeredCount}</strong>/{questions.length}
                    </span>
                  </div>
                  <span className="text-[#16865C] font-semibold flex items-center gap-1">
                    <Sparkles size={13} />
                    <span>+{isFinalCombined ? 250 : 100} XP</span>
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#173B70] to-[#18B6D2] rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentIndex + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* ── 20 Questions Quick Navigator Grid ── */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 px-1">
                  <span>Question Navigator (Click to Jump)</span>
                  <span className="text-slate-400 font-normal">
                    {Math.round((answeredCount / questions.length) * 100)}% Complete
                  </span>
                </div>
                <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5 sm:gap-1">
                  {questions.map((q, idx) => {
                    const isAnswered = selectedAnswers[idx] !== undefined;
                    const isQCorrect = isAnswered && selectedAnswers[idx] === q.correctAnswer;
                    const isCurrent = idx === currentIndex;

                    let pillClass = "bg-white text-slate-600 border-slate-200 hover:bg-slate-100";
                    if (isAnswered) {
                      pillClass = isQCorrect
                        ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                        : "bg-rose-500 text-white border-rose-500 font-bold";
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center border transition-all cursor-pointer ${pillClass} ${
                          isCurrent ? "ring-2 ring-[#173B70] ring-offset-1 scale-105 shadow-xs" : ""
                        }`}
                        title={`Go to question ${idx + 1}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Text */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#173B70] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-2xs">
                    {currentIndex + 1}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed pt-0.5">
                    {currentQ?.question}
                  </p>
                </div>
              </div>

              {/* Options List */}
              <div className="space-y-2.5">
                {currentQ?.options?.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  const isThisCorrect = currentQ.correctAnswer === optIdx;

                  let cardStyle =
                    "bg-white border-slate-200 hover:border-[#173B70]/50 hover:bg-slate-50 text-slate-800";
                  let badgeStyle = "bg-slate-100 text-slate-600 border-slate-200";

                  if (hasAnsweredCurrent) {
                    if (isThisCorrect) {
                      cardStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs";
                      badgeStyle = "bg-emerald-600 text-white border-emerald-600";
                    } else if (isSelected) {
                      cardStyle = "bg-rose-50 border-rose-500 text-rose-950 font-semibold";
                      badgeStyle = "bg-rose-600 text-white border-rose-600";
                    } else {
                      cardStyle = "bg-slate-50/50 border-slate-200 text-slate-400 opacity-60";
                    }
                  }

                  const optionLetters = ["A", "B", "C", "D", "E"];
                  const letter = optionLetters[optIdx] || `${optIdx + 1}`;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={hasAnsweredCurrent}
                      className={`w-full p-3.5 sm:p-4 rounded-xl border text-left flex items-center justify-between gap-3 text-xs sm:text-sm transition-all cursor-pointer ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 ${badgeStyle}`}
                        >
                          {letter}
                        </span>
                        <span className="leading-snug">{option}</span>
                      </div>

                      {hasAnsweredCurrent && isThisCorrect && (
                        <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                      )}
                      {hasAnsweredCurrent && isSelected && !isThisCorrect && (
                        <XCircle size={18} className="text-rose-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Hint Box */}
              {hasAnsweredCurrent && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 animate-in fade-in duration-200 ${
                    isCorrect
                      ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                      : "bg-amber-50/80 border-amber-200 text-amber-900"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    {isCorrect ? (
                      <CheckCircle2 size={15} className="text-emerald-700" />
                    ) : (
                      <HelpCircle size={15} className="text-amber-700" />
                    )}
                    <span>{isCorrect ? "Correct Solution!" : "Explanation:"}</span>
                  </div>
                  <p>{currentQ.explanation}</p>
                </div>
              )}

              {/* Optional Hint Button */}
              {!hasAnsweredCurrent && currentQ?.hint && (
                <div className="pt-1">
                  {!showHint[currentIndex] ? (
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={() =>
                        setShowHint((prev) => ({ ...prev, [currentIndex]: true }))
                      }
                      className="inline-flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-700 font-semibold cursor-pointer"
                    >
                      <Lightbulb size={14} />
                      <span>Need a hint?</span>
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 animate-in fade-in">
                      <Lightbulb size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>{currentQ.hint}</span>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* ── Results Screen ── */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-[#12316B] to-[#18B6D2] text-white flex items-center justify-center shadow-lg shadow-blue-900/20">
                <Trophy size={32} />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#182230] font-brand">
                  Quiz Completed!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  You answered {correctCount} of {questions.length} questions correctly.
                </p>
              </div>

              {/* Score Badges */}
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center min-w-[120px]">
                  <div className="text-2xl font-black text-[#173B70]">{scorePercent}%</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">Score</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center min-w-[120px]">
                  <div className="text-2xl font-black text-emerald-700">+{isFinalCombined ? 250 : 100}</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">XP Earned</div>
                </div>
              </div>

              {/* Performance Indicator */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                {scorePercent >= 90 ? "🏆 Mastery Rank (Outstanding!)" : scorePercent >= 70 ? "🌟 Proficient Rank (Great Job!)" : "📚 Developing Rank (Keep Practicing!)"}
              </div>

              {/* Final Course Completed — Certificate Unlocked Card */}
              {isFinalCombined && scorePercent >= 70 ? (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-300 text-left space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <Award size={18} className="text-emerald-600" />
                    <span>Final Course Completed — Certificate UNLOCKED!</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Congratulations! You have successfully completed the final evaluation for <strong>{courseTitle}</strong>. Your official verified certificate has been unlocked and is now ready in your Certificate Wallet.
                  </p>
                  <Link
                    href="/certificates"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>View Unlocked Certificate</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : isFinalCombined ? (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-left space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <Award size={16} className="text-amber-700" />
                    <span>Certificate Locked (Score below 70%)</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    A score of 70% or higher on the final quiz is required to unlock your verified course certificate. Review your answers and try again!
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* ── Modal Footer ── */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 flex-shrink-0">
          {!isCompleted ? (
            <>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <button
                type="button"
                suppressHydrationWarning
                onClick={handleNext}
                disabled={!hasAnsweredCurrent}
                className="px-5 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] disabled:opacity-40 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>{currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}</span>
                <ArrowRight size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                suppressHydrationWarning
                onClick={handleRetry}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Retake Quiz</span>
              </button>

              <button
                type="button"
                suppressHydrationWarning
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
