import { NextResponse } from "next/server";
import { getAssessment } from "@/data/assessments";

interface RouteParams {
  params: Promise<{
    assessmentId: string;
  }>;
}

export async function GET(req: Request, { params }: RouteParams) {
  const { assessmentId } = await params;
  const assessment = getAssessment(assessmentId);

  if (!assessment) {
    return NextResponse.json(
      { error: "Assessment not found" },
      { status: 404 }
    );
  }

  // Sanitize questions: NEVER send correctAnswer or explanation to client before submission!
  const sanitizedQuestions = assessment.questions.map((q) => ({
    id: q.id,
    question: q.question,
    type: q.type,
    options: q.options,
  }));

  return NextResponse.json({
    courseId: assessment.courseId,
    courseTitle: assessment.courseTitle,
    passingPercentage: assessment.passingPercentage,
    timeLimitMinutes: assessment.timeLimitMinutes,
    totalQuestions: sanitizedQuestions.length,
    questions: sanitizedQuestions,
  });
}
