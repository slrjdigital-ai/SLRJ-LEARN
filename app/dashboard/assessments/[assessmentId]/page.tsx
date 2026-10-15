"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import {
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  Sparkles,
  Loader2,
} from "lucide-react";

interface QuestionItem {
  id: string;
  question: string;
  type: string;
  options: string[];
}

interface AssessmentPageProps {
  params: Promise<{
    assessmentId: string;
  }>;
}

export default function AssessmentPage({ params }: AssessmentPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { awardXP } = useGamification();
  const resolvedParams = use(params);
  const assessmentId = resolvedParams.assessmentId;

  const [loading, setLoading] = useState(true);
  const [assessmentInfo, setAssessmentInfo] = useState<{
    courseTitle: string;
    passingPercentage: number;
    timeLimitMinutes: number;
    questions: QuestionItem[];
  } | null>(null);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 mins
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    passed: boolean;
    scorePercentage: number;
    correctCount: number;
    totalQuestions: number;
    certificateId: string | null;
    review: Array<{
      questionId: string;
      question: string;
      userAnswer: number | null;
      isCorrect: boolean;
      explanation: string;
    }>;
  } | null>(null);

  // Fetch sanitized questions
  useEffect(() => {
    fetch(`/api/assessments/${assessmentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.questions) {
          setAssessmentInfo(data);
          setTimeLeft(data.timeLimitMinutes * 60);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [assessmentId]);

  // Timer Countdown
  useEffect(() => {
    if (result || loading || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [result, loading, timeLeft]);

  const handleSelectOption = (qId: string, optIndex: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/assessments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: assessmentId,
          answers,
          learnerName: user?.name || "Shahid",
          learnerEmail: user?.email,
        }),
      });

      const data = await res.json();
      if (data && data.success) {
        setResult(data);
        if (data.passed) {
          awardXP(250, `Passed assessment for ${assessmentInfo?.courseTitle || "course"}`);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-[#12316B]" />
        <p className="text-sm font-semibold text-[#64748B]">Loading secure assessment...</p>
      </div>
    );
  }

  if (!assessmentInfo || assessmentInfo.questions.length === 0) {
    return (
      <div className="p-8 clean-card text-center space-y-4 max-w-lg mx-auto mt-10">
        <AlertCircle size={36} className="text-[#C83C4A] mx-auto" />
        <h2 className="text-xl font-bold text-[#182230]">Assessment Not Found</h2>
        <p className="text-sm text-[#64748B]">
          No active evaluation found for course ID: <code className="font-mono">{assessmentId}</code>.
        </p>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#12316B] text-white text-xs font-bold"
        >
          <span>Return to Courses</span>
        </Link>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // POST-SUBMISSION RESULTS VIEW
  // ══════════════════════════════════════════════════════════════════
  if (result) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 py-6">
        <div
          className={`clean-card p-6 sm:p-10 text-center space-y-5 border-2 ${
            result.passed ? "border-[#16865C] bg-white" : "border-[#C83C4A] bg-white"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
              result.passed ? "bg-emerald-100 text-[#16865C]" : "bg-rose-100 text-[#C83C4A]"
            }`}
          >
            {result.passed ? <Award size={32} /> : <AlertCircle size={32} />}
          </div>

          <div>
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                result.passed
                  ? "bg-emerald-50 text-[#16865C] border-emerald-200"
                  : "bg-rose-50 text-[#C83C4A] border-rose-200"
              }`}
            >
              {result.passed ? "Passed & Certified" : "Assessment Not Passed"}
            </span>

            <h1 className="text-2xl sm:text-3xl font-black font-brand text-[#182230] mt-3">
              {result.passed ? "Congratulations on Your Achievement!" : "Keep Practicing"}
            </h1>

            <p className="text-sm text-[#64748B] mt-1 max-w-md mx-auto">
              {result.passed
                ? `You achieved ${result.scorePercentage}% on the evaluation, satisfying the 80% passing threshold.`
                : `You scored ${result.scorePercentage}%. An 80% score is required to unlock your certificate.`}
            </p>
          </div>

          {/* Score metrics */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-2">
            <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E2E8F0]">
              <div className="text-2xl font-black text-[#12316B]">{result.scorePercentage}%</div>
              <div className="text-xs text-[#64748B] font-semibold">Final Score</div>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E2E8F0]">
              <div className="text-2xl font-black text-[#182230]">
                {result.correctCount}/{result.totalQuestions}
              </div>
              <div className="text-xs text-[#64748B] font-semibold">Questions Correct</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {result.passed && result.certificateId ? (
              <Link
                href={`/verify-certificate/${result.certificateId}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-102"
              >
                <ShieldCheck size={16} className="text-[#18B6D2]" />
                <span>View & Verify Certificate</span>
                <ArrowRight size={14} />
              </Link>
            ) : (
              <button
                onClick={() => {
                  setResult(null);
                  setCurrentQIndex(0);
                  setAnswers({});
                  setTimeLeft(20 * 60);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <RotateCcw size={15} />
                <span>Retake Assessment</span>
              </button>
            )}

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 text-xs font-bold text-[#64748B] hover:text-[#182230] transition-colors"
            >
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="clean-card p-6 sm:p-8 space-y-5">
          <h2 className="font-extrabold text-base text-[#182230]">
            Review of Questions & Explanations
          </h2>

          <div className="space-y-4 divide-y divide-slate-100">
            {result.review.map((item, idx) => (
              <div key={item.questionId} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-bold text-xs text-[#182230]">
                    {idx + 1}. {item.question}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex-shrink-0 ${
                      item.isCorrect
                        ? "bg-emerald-50 text-[#16865C] border border-emerald-200"
                        : "bg-rose-50 text-[#C83C4A] border border-rose-200"
                    }`}
                  >
                    {item.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#F7F9FC] text-xs text-[#64748B] leading-relaxed">
                  <strong className="text-[#182230]">Explanation:</strong> {item.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // ACTIVE QUESTION TAKING VIEW
  // ══════════════════════════════════════════════════════════════════
  const currentQ = assessmentInfo.questions[currentQIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      {/* Top Meta Bar */}
      <div className="clean-card p-4 sm:p-5 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-[#18B6D2] uppercase tracking-wider">
            Official Course Assessment
          </div>
          <h1 className="text-base font-extrabold text-[#182230] truncate max-w-sm sm:max-w-md">
            {assessmentInfo.courseTitle}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-[#182230] font-mono text-xs font-bold">
            <Clock size={14} className={timeLeft < 180 ? "text-[#C83C4A] animate-pulse" : "text-[#12316B]"} />
            <span>{formatTimer(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Across Questions */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[#64748B]">
          <span>
            Question <strong>{currentQIndex + 1}</strong> of {assessmentInfo.questions.length}
          </span>
          <span>{answeredCount} of {assessmentInfo.questions.length} Answered</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-[#12316B] transition-all duration-300"
            style={{
              width: `${((currentQIndex + 1) / assessmentInfo.questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="clean-card p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#64748B] uppercase">
            Question #{currentQIndex + 1}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#182230] leading-snug">
            {currentQ.question}
          </h2>
        </div>

        {/* Option Radio Buttons */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = answers[currentQ.id] === optIdx;
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(currentQ.id, optIdx)}
                className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "border-[#12316B] bg-blue-50/70 text-[#12316B] font-bold shadow-xs"
                    : "border-[#E2E8F0] hover:bg-slate-50 text-[#182230]"
                }`}
              >
                <span>{opt}</span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? "border-[#12316B] bg-[#12316B]" : "border-slate-300"
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation & Submit Bar */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 text-xs font-bold text-[#64748B] disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} className="inline mr-1" />
            <span>Previous</span>
          </button>

          {currentQIndex < assessmentInfo.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQIndex((prev) => Math.min(assessmentInfo.questions.length - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight size={14} className="inline ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting || answeredCount === 0}
              className="px-6 py-2.5 rounded-xl bg-[#16865C] hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 size={14} className="animate-spin" />
                  <span>Grading...</span>
                </span>
              ) : (
                <span>Submit Assessment</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
