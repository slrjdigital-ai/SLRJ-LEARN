import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { evaluateCodeAgainstChallenge } from "@/lib/cCodeRunner";
import { getChallengeById } from "@/data/codingChallengesData";

const SUBMISSIONS_FILE = path.join(process.cwd(), "data", "practiceSubmissionsStore.json");

interface SubmissionRecord {
  id: string;
  problemId: string;
  topicIndex: number;
  courseSlug: string;
  code: string;
  language: string;
  status: "Passed" | "Failed";
  score: number;
  passedTests: number;
  totalTests: number;
  xpAwarded: number;
  timestamp: string;
}

function saveSubmissionToDatabase(record: SubmissionRecord) {
  try {
    let submissions: SubmissionRecord[] = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const raw = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
      submissions = JSON.parse(raw);
    } else {
      const dir = path.dirname(SUBMISSIONS_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
    submissions.push(record);
    // Keep most recent 500 submissions
    if (submissions.length > 500) {
      submissions = submissions.slice(submissions.length - 500);
    }
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write submission to disk:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { problemId, code, language = "c", courseSlug = "c-programming" } = body;

    if (!problemId || !code) {
      return NextResponse.json({ error: "Missing problemId or code" }, { status: 400 });
    }

    const challenge = getChallengeById(problemId);
    if (!challenge) {
      return NextResponse.json({ error: "Problem challenge not found" }, { status: 404 });
    }

    // Run against all test cases (both visible and hidden)
    const result = evaluateCodeAgainstChallenge(code, challenge.testCases);

    const isAllPassed = result.passedTests === result.totalTests && result.totalTests > 0;
    const xpEarned = isAllPassed ? challenge.xpReward : Math.round((challenge.xpReward * result.passRate) / 100);

    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    // Save to server database / storage file
    saveSubmissionToDatabase({
      id: submissionId,
      problemId: challenge.id,
      topicIndex: challenge.topicIndex,
      courseSlug,
      code,
      language,
      status: isAllPassed ? "Passed" : "Failed",
      score: result.score,
      passedTests: result.passedTests,
      totalTests: result.totalTests,
      xpAwarded: xpEarned,
      timestamp: new Date().toISOString(),
    });

    // Mask hidden test cases from the client response to maintain academic integrity
    const sanitizedTestResults = result.testResults.map((tc, idx) => {
      if (tc.isHidden) {
        return {
          id: tc.id,
          name: `Evaluation Test Case ${idx + 1} (Hidden)`,
          input: "[Hidden Evaluation Input]",
          expectedOutput: "[Hidden Evaluation Output]",
          actualOutput: tc.passed ? "[Hidden Result: Correct Output]" : "[Hidden Result: Output Mismatch]",
          passed: tc.passed,
          isHidden: true,
          executionTimeMs: tc.executionTimeMs,
        };
      }
      return tc;
    });

    return NextResponse.json({
      success: true,
      submissionId,
      status: isAllPassed ? "Passed" : "Failed",
      score: result.score,
      passRate: result.passRate,
      passedTests: result.passedTests,
      totalTests: result.totalTests,
      xpAwarded: xpEarned,
      testResults: sanitizedTestResults,
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      executionTimeMs: result.executionTimeMs,
    });
  } catch (error: any) {
    console.error("Submission evaluation error:", error);
    return NextResponse.json(
      { error: "Submission failed", message: error?.message },
      { status: 500 }
    );
  }
}
