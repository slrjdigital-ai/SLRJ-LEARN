"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MicroTopicSeries, MicroLesson } from "@/data/microTopics";
import { useGamification } from "@/context/GamificationContext";
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Award,
  Zap,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Code2,
  Copy,
  Check,
  Play,
  RotateCcw,
  Target,
  HelpCircle,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MicroLessonViewProps {
  series: MicroTopicSeries;
}

export default function MicroLessonView({ series }: MicroLessonViewProps) {
  const router = useRouter();
  const { state, recordActivity, isActivityCompleted } = useGamification();

  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const currentLesson: MicroLesson = series.lessons[activeLessonIdx] || series.lessons[0];

  // Practical code copy state
  const [copiedCode, setCopiedCode] = useState(false);

  // Interactive activity states
  const [userCode, setUserCode] = useState(currentLesson.interactiveActivity.starterCode || "");
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [selectedPredictIdx, setSelectedPredictIdx] = useState<number | null>(null);
  const [showPredictResult, setShowPredictResult] = useState(false);

  // Quiz state
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);
  const [hasCheckedQuiz, setHasCheckedQuiz] = useState(false);

  // Completion & Reward Modal state
  const [rewardModal, setRewardModal] = useState<{
    show: boolean;
    xpGained: number;
    message: string;
    badgeName?: string;
  } | null>(null);

  const lessonCompleted = isActivityCompleted(`lesson-${currentLesson.id}`);

  // Handle Code Playground Execution simulation
  const handleRunCode = () => {
    if (currentLesson.interactiveActivity.type === "code") {
      setCodeOutput(currentLesson.interactiveActivity.expectedOutput || "Program executed successfully (exit code 0)");
    }
  };

  // Handle Predict Output Selection
  const handleSelectPredict = (index: number) => {
    if (showPredictResult) return;
    setSelectedPredictIdx(index);
    setShowPredictResult(true);
  };

  // Handle Quiz Verification & XP Award
  const handleCheckQuiz = () => {
    if (selectedQuizIdx === null || hasCheckedQuiz) return;
    setHasCheckedQuiz(true);

    const isCorrect = selectedQuizIdx === currentLesson.quiz.correctIndex;
    if (isCorrect) {
      // Award XP via Gamification Context with anti-cheat protection
      const result = recordActivity("lesson", `lesson-${currentLesson.id}`, {
        xp: currentLesson.xpReward,
        title: currentLesson.title,
      });

      if (result.awarded) {
        setRewardModal({
          show: true,
          xpGained: result.xpGained,
          message: result.message,
          badgeName: result.unlockedBadge?.name,
        });
      }
    }
  };

  const handleNextLesson = () => {
    if (activeLessonIdx < series.lessons.length - 1) {
      setActiveLessonIdx(activeLessonIdx + 1);
      resetStateForLesson(series.lessons[activeLessonIdx + 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/topics");
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIdx > 0) {
      setActiveLessonIdx(activeLessonIdx - 1);
      resetStateForLesson(series.lessons[activeLessonIdx - 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetStateForLesson = (lesson: MicroLesson) => {
    setUserCode(lesson.interactiveActivity.starterCode || "");
    setCodeOutput(null);
    setSelectedPredictIdx(null);
    setShowPredictResult(false);
    setSelectedQuizIdx(null);
    setHasCheckedQuiz(false);
    setRewardModal(null);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const progressPercent = Math.round(((activeLessonIdx + 1) / series.lessons.length) * 100);

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20 selection:bg-cyan-500/30">
      {/* ─── Top Sticky Stepper Header ─── */}
      <div className="sticky top-20 z-40 bg-[#030712]/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/topics"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer border border-white/10"
              title="Return to Explore Topics"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                {series.seriesTitle}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {series.title} • {currentLesson.title}
              </h2>
            </div>
          </div>

          {/* Gamification Bar: Streak & Lesson Progress */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-mono font-bold shadow-sm">
              <Flame size={15} className="text-rose-400 animate-pulse" />
              <span>{state.streak.currentStreak} Day Streak</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">
                  Lesson {activeLessonIdx + 1} of {series.lessons.length}
                </span>
                <div className="w-24 sm:w-36 h-2 bg-white/10 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        {/* Lesson Badge & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              Lesson {currentLesson.lessonNumber}
            </span>
            <span className="text-xs font-mono text-slate-400">
              ⏱️ ~{currentLesson.estimatedMinutes} mins
            </span>
            <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
              <Award size={13} className="text-amber-400" />
              +{currentLesson.xpReward} XP
            </span>
            {lessonCompleted && (
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 size={13} />
                Completed
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white font-brand tracking-tight mb-3">
            {currentLesson.title}
          </h1>

          {/* 1. Introduction */}
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-slate-300 text-sm leading-relaxed mb-6">
            <p className="font-sans">{currentLesson.intro}</p>
          </div>

          {/* 2. Single Learning Objective */}
          <div className="p-4 rounded-2xl bg-[#080D1A] border border-white/10 shadow-md mb-8 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 flex-shrink-0 mt-0.5">
              <Target size={18} />
            </div>
            <div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                Learning Objective
              </span>
              <p className="text-white text-sm font-medium mt-0.5">
                {currentLesson.learningObjective}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Simple Explanation */}
        <div className="mb-8 p-6 sm:p-7 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <BookOpen size={15} />
            <span>Core Explanation</span>
          </div>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
            {currentLesson.explanation}
          </p>

          <div className="space-y-2 pt-3 border-t border-white/5">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Key Takeaways:
            </span>
            {currentLesson.keyTakeaways.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-2" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Practical Example */}
        <div className="mb-8 p-6 sm:p-7 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Code2 size={15} />
              <span>Practical Example ({currentLesson.practicalExample.language})</span>
            </div>
            <button
              onClick={() => handleCopy(currentLesson.practicalExample.code)}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copiedCode ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="rounded-2xl bg-[#030712] border border-white/10 p-4 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto shadow-inner leading-relaxed">
            <pre>
              <code>{currentLesson.practicalExample.code}</code>
            </pre>
          </div>
          <p className="text-xs text-slate-400 mt-3 font-mono">
            💡 {currentLesson.practicalExample.notes}
          </p>
        </div>

        {/* 5. Interactive Activity */}
        <div className="mb-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0A1224] to-[#080D1A] border border-cyan-500/30 shadow-2xl">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Zap size={15} className="text-cyan-400" />
            <span>Interactive SoloLearn Challenge</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-3">
            {currentLesson.interactiveActivity.prompt}
          </h3>

          {currentLesson.interactiveActivity.type === "code" ? (
            <div className="space-y-3">
              <div className="rounded-2xl bg-[#030712] border border-white/10 overflow-hidden">
                <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Interactive Editor</span>
                  <button
                    onClick={handleRunCode}
                    className="px-3 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <Play size={13} />
                    <span>Run Simulation</span>
                  </button>
                </div>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={4}
                  className="w-full p-4 bg-transparent font-mono text-xs sm:text-sm text-cyan-200 outline-none resize-none leading-relaxed"
                />
              </div>

              {codeOutput && (
                <div className="p-4 rounded-xl bg-[#02050D] border border-emerald-500/30">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1">
                    Output Terminal:
                  </span>
                  <div className="text-xs font-mono text-white flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                    <span>{codeOutput}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Predict the Output or Drill Options */
            <div className="space-y-2.5">
              {currentLesson.interactiveActivity.options?.map((opt, idx) => {
                const isSelected = selectedPredictIdx === idx;
                const isCorrect = idx === currentLesson.interactiveActivity.correctOptionIndex;

                let btnStyle = "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-cyan-400/40";
                if (showPredictResult) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectPredict(idx)}
                    disabled={showPredictResult}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer font-mono ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {showPredictResult && isCorrect && (
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    )}
                  </button>
                );
              })}

              {showPredictResult && (
                <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 mt-3 font-sans">
                  <strong>Explanation:</strong> {currentLesson.interactiveActivity.explanation}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 6. Short Knowledge Check Quiz */}
        <div className="mb-12 p-6 sm:p-7 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <HelpCircle size={15} />
            <span>Knowledge Check & XP Unlock</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white mb-4">
            {currentLesson.quiz.question}
          </h3>

          <div className="space-y-3 mb-6">
            {currentLesson.quiz.options.map((option, idx) => {
              const isSelected = selectedQuizIdx === idx;
              const isCorrect = idx === currentLesson.quiz.correctIndex;

              let choiceStyle = "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/5 hover:border-cyan-400/30";

              if (hasCheckedQuiz) {
                if (isCorrect) {
                  choiceStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-md shadow-emerald-500/10";
                } else if (isSelected && !isCorrect) {
                  choiceStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                }
              } else if (isSelected) {
                choiceStyle = "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold";
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (!hasCheckedQuiz) setSelectedQuizIdx(idx);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${choiceStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {hasCheckedQuiz && isCorrect && (
                    <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {!hasCheckedQuiz ? (
            <button
              onClick={handleCheckQuiz}
              disabled={selectedQuizIdx === null}
              className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold font-mono transition-all flex items-center justify-center gap-2 ${
                selectedQuizIdx !== null
                  ? "bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black shadow-lg shadow-cyan-500/20 cursor-pointer"
                  : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/10"
              }`}
            >
              <Award size={16} />
              <span>Submit Answer & Claim +{currentLesson.xpReward} XP</span>
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs sm:text-sm text-slate-300">
              <strong className="text-white block mb-1">
                {selectedQuizIdx === currentLesson.quiz.correctIndex ? "🎉 Correct!" : "💡 Solution Review:"}
              </strong>
              <p>{currentLesson.quiz.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
          <button
            onClick={handlePrevLesson}
            disabled={activeLessonIdx === 0}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-2 ${
              activeLessonIdx > 0
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-white cursor-pointer"
                : "opacity-30 cursor-not-allowed border-white/5 text-slate-600"
            }`}
          >
            <ArrowLeft size={14} />
            <span>Previous Lesson</span>
          </button>

          <button
            onClick={handleNextLesson}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <span>{activeLessonIdx < series.lessons.length - 1 ? "Next Lesson" : "Finish Series"}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Gamification Reward Celebration Modal */}
      <AnimatePresence>
        {rewardModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-[#080D1A] border border-cyan-500/40 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 mx-auto mb-4 shadow-lg shadow-amber-500/20">
                <Trophy size={32} />
              </div>

              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                Lesson Complete!
              </span>
              <h3 className="text-2xl font-black text-white font-brand mb-2">
                +{rewardModal.xpGained} XP Earned!
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                {rewardModal.message}
              </p>

              {rewardModal.badgeName && (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 to-emerald-500/15 border border-amber-500/30 text-xs font-mono text-amber-200 mb-6 flex items-center justify-center gap-2">
                  <Sparkles size={15} className="text-amber-400" />
                  <span>New Badge Unlocked: <strong>{rewardModal.badgeName}</strong>!</span>
                </div>
              )}

              <button
                onClick={() => setRewardModal(null)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-bold font-mono text-xs sm:text-sm transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Continue Learning
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
