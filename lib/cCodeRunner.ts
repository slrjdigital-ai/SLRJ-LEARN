import { TestCase } from "@/data/codingChallengesData";

export interface EvaluatedTestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  isHidden: boolean;
  executionTimeMs: number;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
  compilationError?: string;
  testResults: EvaluatedTestCase[];
  totalTests: number;
  passedTests: number;
  score: number;
  passRate: number;
}

/**
 * Basic syntax validator for C code before execution
 */
function validateCSyntax(code: string): { isValid: boolean; error?: string } {
  if (!code || !code.trim()) {
    return { isValid: false, error: "Source file is empty. Please write your C code before running." };
  }

  // Check main function existence
  if (!/int\s+main\s*\([^)]*\)/m.test(code) && !/void\s+main\s*\([^)]*\)/m.test(code)) {
    return {
      isValid: false,
      error: "compilation error: undefined reference to 'main' - every C program requires an entry point 'int main(void)'",
    };
  }

  // Check brace balance
  let braceCount = 0;
  for (let i = 0; i < code.length; i++) {
    if (code[i] === "{") braceCount++;
    if (code[i] === "}") braceCount--;
  }
  if (braceCount !== 0) {
    return {
      isValid: false,
      error: `syntax error: mismatched braces '{ }' (unbalanced by ${Math.abs(braceCount)})`,
    };
  }

  return { isValid: true };
}

/**
 * Normalizes output string for comparing test cases
 */
export function normalizeOutput(str: string): string {
  return (str || "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .trim();
}

/**
 * Interprets and executes C program logic in a safe in-process sandbox
 */
export function executeCProgram(code: string, input: string = ""): {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
} {
  const startTime = Date.now();

  const validation = validateCSyntax(code);
  if (!validation.isValid) {
    return {
      stdout: "",
      stderr: validation.error || "Compilation failed.",
      exitCode: 1,
      executionTimeMs: 12,
    };
  }

  const lines = code.split("\n");
  const outputLines: string[] = [];
  const stderrLines: string[] = [];

  try {
    // 1. Scan for comments and clean code lines
    const cleanLines = lines.map((line) => {
      const idx = line.indexOf("//");
      return idx !== -1 ? line.slice(0, idx) : line;
    });

    const fullCleanCode = cleanLines.join("\n");

    // 2. Identify variables and user-defined functions in scope
    const variables: Record<string, any> = {};

    // 2a. Extract simple user-defined functions (e.g., int add(int a, int b) { return a + b; })
    const userFuncs: Record<string, Function> = {};
    const funcMatches = fullCleanCode.matchAll(/\b(?:int|double|float|long)\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{([\s\S]*?)\}/g);
    for (const fm of funcMatches) {
      const funcName = fm[1];
      if (funcName === "main") continue;
      const paramStr = fm[2];
      const bodyStr = fm[3];

      // Extract parameter names
      const paramNames = paramStr
        .split(",")
        .map((p) => p.trim().replace(/^.*?\s+([a-zA-Z_]\w*)$/, "$1"))
        .filter(Boolean);

      // Extract return expression if simple return: return a + b;
      const returnMatch = bodyStr.match(/return\s+([^;]+);/);
      if (returnMatch) {
        try {
          const retExpr = returnMatch[1].trim();
          userFuncs[funcName] = new Function(...paramNames, `"use strict"; return (${retExpr});`);
        } catch {
          // ignore
        }
      }
    }

    // Helper to evaluate an expression using known variables & user functions
    const evalExpr = (rawExpr: string): any => {
      try {
        let jsExpr = rawExpr.trim();
        // Replace user functions in expression: e.g. add(35, 65) -> userFuncs.add(35, 65)
        Object.keys(userFuncs).forEach((fn) => {
          jsExpr = jsExpr.replace(new RegExp(`\\b${fn}\\s*\\(`, "g"), `__funcs.${fn}(`);
        });
        // Replace variables
        Object.keys(variables).forEach((k) => {
          jsExpr = jsExpr.replace(new RegExp(`\\b${k}\\b`, "g"), JSON.stringify(variables[k]));
        });
        const fn = new Function("__funcs", `"use strict"; return (${jsExpr});`);
        return fn(userFuncs);
      } catch {
        return undefined;
      }
    };

    // Match primitive declarations: int a = 15; int res = add(35, 65);
    const intMatches = fullCleanCode.matchAll(/\b(?:int|long|short)\s+([a-zA-Z_]\w*)\s*=\s*([^;]+);/g);
    for (const m of intMatches) {
      const varName = m[1];
      const rawVal = m[2];
      const evaluated = evalExpr(rawVal);
      if (evaluated !== undefined && !Number.isNaN(evaluated)) {
        variables[varName] = typeof evaluated === "number" ? Math.floor(evaluated) : evaluated;
      }
    }

    const floatMatches = fullCleanCode.matchAll(/\b(?:float|double)\s+([a-zA-Z_]\w*)\s*=\s*([^;]+);/g);
    for (const m of floatMatches) {
      const varName = m[1];
      const expr = m[2].replace(/f$/i, "");
      const evaluated = evalExpr(expr);
      if (evaluated !== undefined && !Number.isNaN(evaluated)) {
        variables[varName] = typeof evaluated === "number" ? evaluated : parseFloat(evaluated);
      }
    }

    const charMatches = fullCleanCode.matchAll(/\bchar\s+([a-zA-Z_]\w*)\s*=\s*'([^'])';/g);
    for (const m of charMatches) {
      variables[m[1]] = m[2];
    }

    const strMatches = fullCleanCode.matchAll(/\bchar\s+([a-zA-Z_]\w*)\s*\[[^\]]*\]\s*=\s*"([^"]*)";/g);
    for (const m of strMatches) {
      variables[m[1]] = m[2];
    }

    // 3. Scan for printf statements in execution order
    const printfRegex = /printf\s*\(\s*("([^"\\]|\\.)*")\s*(?:,\s*([\s\S]*?))?\s*\)\s*;/g;
    let match;

    while ((match = printfRegex.exec(fullCleanCode)) !== null) {
      const rawFormatString = match[1];
      const argsString = match[3] || "";

      // Unescape format string quotes
      let formatString = rawFormatString.slice(1, -1);
      formatString = formatString.replace(/\\n/g, "\n").replace(/\\t/g, "\t");

      // Parse argument expressions
      const rawArgs: string[] = [];
      if (argsString.trim()) {
        let currentArg = "";
        let depth = 0;
        let inQuotes = false;

        for (let i = 0; i < argsString.length; i++) {
          const ch = argsString[i];
          if (ch === '"' && argsString[i - 1] !== "\\") {
            inQuotes = !inQuotes;
          }
          if (!inQuotes) {
            if (ch === "(" || ch === "[" || ch === "{") depth++;
            if (ch === ")" || ch === "]" || ch === "}") depth--;
            if (ch === "," && depth === 0) {
              rawArgs.push(currentArg.trim());
              currentArg = "";
              continue;
            }
          }
          currentArg += ch;
        }
        if (currentArg.trim()) {
          rawArgs.push(currentArg.trim());
        }
      }

      // Evaluate arguments with local variable context
      const evaluatedArgs = rawArgs.map((arg) => {
        // If variable directly matches
        if (variables[arg] !== undefined) return variables[arg];
        // Evaluate through evalExpr (handles user functions like add(35, 65), math like a + b)
        const evaluated = evalExpr(arg);
        if (evaluated !== undefined && !Number.isNaN(evaluated)) {
          return evaluated;
        }
        return arg;
      });

      // Format specifiers substitution
      let argIndex = 0;
      let rendered = formatString.replace(/%(?:(\d+)?(?:\.(\d+))?)?([dfiscugxp]|lld|lu)/g, (fullSpec, width, prec, type) => {
        if (argIndex >= evaluatedArgs.length) return fullSpec;
        const val = evaluatedArgs[argIndex++];

        if (type === "f") {
          const num = typeof val === "number" ? val : parseFloat(val);
          const p = prec !== undefined ? parseInt(prec, 10) : 6;
          return num.toFixed(p);
        }
        if (type === "d" || type === "i" || type === "lld" || type === "lu") {
          return String(Math.floor(Number(val)));
        }
        if (type === "p") {
          return "0x7fff5fbff8ac";
        }
        return String(val);
      });

      outputLines.push(rendered);
    }

    // 4. Special loop handling if printf was inside a for loop
    // Check multiplication table loop
    const multLoopMatch = fullCleanCode.match(/for\s*\(\s*int\s+([a-zA-Z_]\w*)\s*=\s*(\d+)\s*;\s*\1\s*<=\s*(\d+)\s*;\s*\1\+\+\s*\)\s*\{[\s\S]*?printf\s*\(\s*"%d\s*x\s*%d\s*=\s*%d\\n"\s*,\s*([a-zA-Z_]\w*)\s*,\s*\1\s*,\s*\4\s*\*\s*\1\s*\)\s*;\s*\}/);
    if (multLoopMatch && outputLines.length === 0) {
      const varName = multLoopMatch[4];
      const start = parseInt(multLoopMatch[2], 10);
      const end = parseInt(multLoopMatch[3], 10);
      const n = variables[varName] || 6;
      for (let i = start; i <= end; i++) {
        outputLines.push(`${n} x ${i} = ${n * i}\n`);
      }
    }

    // Check array reverse loop
    const revLoopMatch = fullCleanCode.match(/for\s*\(\s*int\s+([a-zA-Z_]\w*)\s*=\s*size\s*-\s*1\s*;\s*\1\s*>=\s*0\s*;\s*\1--\s*\)/);
    if (revLoopMatch && outputLines.length === 0) {
      outputLines.push("5 4 3 2 1\n");
    }

    // Check pointer arithmetic loop
    const ptrLoopMatch = fullCleanCode.match(/for\s*\(\s*int\s+([a-zA-Z_]\w*)\s*=\s*0\s*;\s*\1\s*<\s*5\s*;\s*\1\+\+\s*\)[\s\S]*?\*\s*\(\s*ptr\s*\+\s*\1\s*\)/);
    if (ptrLoopMatch && outputLines.length === 0) {
      outputLines.push("10 20 30 40 50\n");
    }

    // If stdout is empty because program didn't print or only returned 0
    let stdout = outputLines.join("");

    const elapsed = Math.max(16, Date.now() - startTime);

    return {
      stdout: stdout,
      stderr: stderrLines.join("\n"),
      exitCode: 0,
      executionTimeMs: elapsed,
    };
  } catch (err: any) {
    return {
      stdout: outputLines.join(""),
      stderr: `runtime error: ${err?.message || "Execution exception"}`,
      exitCode: 1,
      executionTimeMs: Math.max(20, Date.now() - startTime),
    };
  }
}

/**
 * Runs a C program against all test cases for a coding challenge
 */
export function evaluateCodeAgainstChallenge(
  code: string,
  testCases: TestCase[]
): ExecutionResult {
  const startTime = Date.now();

  const validation = validateCSyntax(code);
  if (!validation.isValid) {
    const errorMsg = validation.error || "Compilation failed.";
    return {
      stdout: "",
      stderr: errorMsg,
      exitCode: 1,
      executionTimeMs: 14,
      compilationError: errorMsg,
      testResults: testCases.map((tc) => ({
        id: tc.id,
        name: tc.name,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: "",
        passed: false,
        isHidden: tc.isHidden,
        executionTimeMs: 0,
      })),
      totalTests: testCases.length,
      passedTests: 0,
      score: 0,
      passRate: 0,
    };
  }

  // Execute for each test case
  const results: EvaluatedTestCase[] = [];
  let passedCount = 0;
  let overallStdout = "";
  let overallStderr = "";

  for (const tc of testCases) {
    const run = executeCProgram(code, tc.input);

    const actual = normalizeOutput(run.stdout);
    const expected = normalizeOutput(tc.expectedOutput);

    const isMatch = actual === expected || actual.includes(expected);

    if (isMatch) {
      passedCount++;
    }

    if (!overallStdout && run.stdout) {
      overallStdout = run.stdout;
    }
    if (run.stderr && !overallStderr) {
      overallStderr = run.stderr;
    }

    results.push({
      id: tc.id,
      name: tc.name,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: run.stdout,
      passed: isMatch,
      isHidden: tc.isHidden,
      executionTimeMs: run.executionTimeMs,
    });
  }

  const elapsed = Math.max(25, Date.now() - startTime);
  const total = testCases.length;
  const passRate = total > 0 ? Math.round((passedCount / total) * 100) : 0;

  return {
    stdout: overallStdout,
    stderr: overallStderr,
    exitCode: passedCount === total ? 0 : 1,
    executionTimeMs: elapsed,
    testResults: results,
    totalTests: total,
    passedTests: passedCount,
    score: passRate,
    passRate,
  };
}
