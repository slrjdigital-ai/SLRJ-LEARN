import { NextResponse } from "next/server";
import { getAssessment } from "@/data/assessments";
import { issueCertificate } from "@/data/certificatesStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courseId, answers, learnerName, learnerEmail } = body;

    if (!courseId || !answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Invalid submission data. Course ID and answers required." },
        { status: 400 }
      );
    }

    const assessment = getAssessment(courseId);
    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found for specified course." },
        { status: 404 }
      );
    }

    const totalQuestions = assessment.questions.length;
    let correctCount = 0;
    const review: Array<{
      questionId: string;
      question: string;
      userAnswer: number | null;
      isCorrect: boolean;
      explanation: string;
    }> = [];

    // Evaluate answers strictly on the server
    for (const q of assessment.questions) {
      const userAnswer = answers[q.id];
      const isCorrect = typeof userAnswer === "number" && userAnswer === q.correctAnswer;
      if (isCorrect) {
        correctCount++;
      }

      review.push({
        questionId: q.id,
        question: q.question,
        userAnswer: typeof userAnswer === "number" ? userAnswer : null,
        isCorrect,
        explanation: q.explanation,
      });
    }

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercentage >= assessment.passingPercentage;

    let certificateRecord = null;
    if (passed) {
      certificateRecord = issueCertificate({
        learnerName: learnerName || "SLRJ Learner",
        learnerEmail: learnerEmail || undefined,
        courseId: assessment.courseId,
        courseTitle: assessment.courseTitle,
        scorePercentage,
      });
    }

    return NextResponse.json({
      success: true,
      passed,
      correctCount,
      totalQuestions,
      scorePercentage,
      passingPercentage: assessment.passingPercentage,
      certificateId: certificateRecord?.id || null,
      certificate: certificateRecord,
      review,
    });
  } catch (error) {
    console.error("Assessment scoring error:", error);
    return NextResponse.json(
      { error: "Internal error processing assessment scoring." },
      { status: 500 }
    );
  }
}
