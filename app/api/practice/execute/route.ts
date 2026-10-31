import { NextRequest, NextResponse } from "next/server";
import { executeCProgram, normalizeOutput } from "@/lib/cCodeRunner";
import { getChallengeById } from "@/data/codingChallengesData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, problemId, language = "c" } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const challenge = problemId ? getChallengeById(problemId) : null;
    const testCases = challenge?.testCases || [];

    // Filter to visible test cases for quick run
    const visibleTests = testCases.filter((tc) => !tc.isHidden);

    const testResults = visibleTests.map((tc) => {
      const run = executeCProgram(code, tc.input);
      const actual = normalizeOutput(run.stdout);
      const expected = normalizeOutput(tc.expectedOutput);
      const isMatch = actual === expected || actual.includes(expected);

      return {
        id: tc.id,
        name: tc.name,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: run.stdout,
        passed: isMatch,
        isHidden: false,
        executionTimeMs: run.executionTimeMs,
      };
    });

    // Also run standard execution
    const run = executeCProgram(code, visibleTests[0]?.input || "");

    return NextResponse.json({
      stdout: run.stdout,
      stderr: run.stderr,
      exitCode: run.exitCode,
      executionTimeMs: run.executionTimeMs,
      testResults,
      totalVisibleTests: visibleTests.length,
      passedVisibleTests: testResults.filter((t) => t.passed).length,
    });
  } catch (error: any) {
    console.error("Code execution API error:", error);
    return NextResponse.json(
      { error: "Server execution failed", message: error?.message },
      { status: 500 }
    );
  }
}
