import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import fs from "fs/promises";
import path from "path";
import os from "os";

interface ExecuteRequestBody {
  language: string;
  code: string;
  stdin?: string;
}

interface ExecuteResponseBody {
  stdout: string[];
  stderr: string[];
  exitCode: number;
  executionTimeMs: number;
  engineName: string;
  hasError: boolean;
}

// ── Wandbox Remote Compiler Engine (Free, Secure, GCC 13.2.0) ──
async function executeViaWandbox(
  compiler: string,
  code: string,
  stdin: string = "",
  options?: string
): Promise<ExecuteResponseBody> {
  const startTime = performance.now();
  const payload: any = {
    compiler,
    code,
    stdin: stdin || "",
  };
  if (options) {
    payload.options = options;
  }

  const res = await fetch("https://wandbox.org/api/compile.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`Wandbox service returned HTTP ${res.status}`);
  }

  const data = await res.json();
  const dur = Math.max(1, Math.round(performance.now() - startTime));

  const stdout: string[] = [];
  const stderr: string[] = [];

  if (data.compiler_error) {
    stderr.push(...data.compiler_error.trim().split("\n"));
  }
  if (data.program_error) {
    stderr.push(...data.program_error.trim().split("\n"));
  }
  if (data.program_output) {
    stdout.push(...data.program_output.trim().split("\n"));
  }

  const exitCode = typeof data.status === "number" ? data.status : (stderr.length > 0 ? 1 : 0);

  return {
    stdout,
    stderr,
    exitCode,
    executionTimeMs: dur,
    engineName: compiler.includes("gcc") ? "GCC 13.2.0 Engine" : "Cloud Native Compiler",
    hasError: exitCode !== 0 || stderr.length > 0,
  };
}

// ── Local Python Runner (CPython 3.12) ──
function executeLocalPython(code: string, stdin: string = ""): Promise<ExecuteResponseBody> {
  const startTime = performance.now();

  return new Promise((resolve) => {
    const child = execFile(
      "python",
      ["-u", "-c", code],
      { timeout: 7000, maxBuffer: 1024 * 1024 },
      (err, stdoutRaw, stderrRaw) => {
        const dur = Math.max(1, Math.round(performance.now() - startTime));
        const stdout = stdoutRaw ? stdoutRaw.trim().split("\n") : [];
        const stderr = stderrRaw ? stderrRaw.trim().split("\n") : [];
        const exitCode = err ? (typeof err.code === "number" ? err.code : 1) : 0;

        resolve({
          stdout,
          stderr,
          exitCode,
          executionTimeMs: dur,
          engineName: "CPython 3.12 (Native Engine)",
          hasError: exitCode !== 0 || stderr.length > 0,
        });
      }
    );

    if (stdin && child.stdin) {
      child.stdin.write(stdin);
      child.stdin.end();
    }
  });
}

// ── Local Java Runner (OpenJDK 17) ──
async function executeLocalJava(code: string, stdin: string = ""): Promise<ExecuteResponseBody> {
  const startTime = performance.now();

  // Detect class name from code (e.g. "public class Solution", "class Main")
  const classMatch = code.match(/class\s+([A-Za-z0-9_]+)/);
  const className = classMatch ? classMatch[1] : "Main";

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "slrj_java_"));
  const javaFile = path.join(tmpDir, `${className}.java`);

  try {
    await fs.writeFile(javaFile, code, "utf-8");

    // 1. Compile with javac
    const compileResult = await new Promise<{ err: any; stderr: string }>((resolve) => {
      execFile("javac", [javaFile], { timeout: 6000 }, (err, _out, stderr) => {
        resolve({ err, stderr: stderr || "" });
      });
    });

    if (compileResult.err || compileResult.stderr) {
      const dur = Math.max(1, Math.round(performance.now() - startTime));
      return {
        stdout: [],
        stderr: compileResult.stderr.trim().split("\n"),
        exitCode: 1,
        executionTimeMs: dur,
        engineName: "OpenJDK 17 (Javac Compiler)",
        hasError: true,
      };
    }

    // 2. Run with java
    return await new Promise<ExecuteResponseBody>((resolve) => {
      const child = execFile(
        "java",
        ["-cp", tmpDir, className],
        { timeout: 6000, maxBuffer: 1024 * 1024 },
        (err, stdoutRaw, stderrRaw) => {
          const dur = Math.max(1, Math.round(performance.now() - startTime));
          const stdout = stdoutRaw ? stdoutRaw.trim().split("\n") : [];
          const stderr = stderrRaw ? stderrRaw.trim().split("\n") : [];
          const exitCode = err ? (typeof err.code === "number" ? err.code : 1) : 0;

          resolve({
            stdout,
            stderr,
            exitCode,
            executionTimeMs: dur,
            engineName: "OpenJDK 17 (Temurin JVM)",
            hasError: exitCode !== 0 || stderr.length > 0,
          });
        }
      );

      if (stdin && child.stdin) {
        child.stdin.write(stdin);
        child.stdin.end();
      }
    });
  } finally {
    // Cleanup temp dir asynchronously
    fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

// ── Local Node / JavaScript Runner ──
async function executeLocalNode(code: string): Promise<ExecuteResponseBody> {
  const startTime = performance.now();
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "slrj_node_"));
  const scriptPath = path.join(tmpDir, "script.js");

  try {
    await fs.writeFile(scriptPath, code, "utf-8");

    return await new Promise<ExecuteResponseBody>((resolve) => {
      execFile(
        process.execPath,
        [scriptPath],
        { timeout: 5000, maxBuffer: 1024 * 1024 },
        (err, stdoutRaw, stderrRaw) => {
          const dur = Math.max(1, Math.round(performance.now() - startTime));
          const stdout = stdoutRaw ? stdoutRaw.trim().split("\n") : [];
          const stderr = stderrRaw ? stderrRaw.trim().split("\n") : [];
          const exitCode = err ? (typeof err.code === "number" ? err.code : 1) : 0;

          resolve({
            stdout,
            stderr,
            exitCode,
            executionTimeMs: dur,
            engineName: "Node.js v22 (V8 Engine)",
            hasError: exitCode !== 0 || stderr.length > 0,
          });
        }
      );
    });
  } finally {
    fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ExecuteRequestBody = await req.json();
    const { language, code, stdin = "" } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { stdout: [], stderr: ["No code provided to execute."], exitCode: 1, executionTimeMs: 0, engineName: "System", hasError: true },
        { status: 400 }
      );
    }

    const lang = (language || "").toLowerCase().trim();

    // 1. PYTHON
    if (lang === "python" || lang === "py") {
      try {
        const result = await executeLocalPython(code, stdin);
        return NextResponse.json(result);
      } catch (err: any) {
        // Fallback to Wandbox
        try {
          const wandboxRes = await executeViaWandbox("cpython-3.10.0", code, stdin);
          return NextResponse.json(wandboxRes);
        } catch {
          return NextResponse.json({
            stdout: [],
            stderr: [`Python runtime error: ${err.message || String(err)}`],
            exitCode: 1,
            executionTimeMs: 1,
            engineName: "Python Runtime",
            hasError: true,
          });
        }
      }
    }

    // 2. C LANGUAGE (GCC 13.2.0)
    if (lang === "c") {
      try {
        const result = await executeViaWandbox("gcc-13.2.0", code, stdin, "c17");
        return NextResponse.json(result);
      } catch (err: any) {
        return NextResponse.json({
          stdout: [],
          stderr: [`C Compilation Service Error: ${err.message || String(err)}`],
          exitCode: 1,
          executionTimeMs: 1,
          engineName: "GCC C17 Compiler",
          hasError: true,
        });
      }
    }

    // 3. C++ LANGUAGE (G++ 13.2.0)
    if (lang === "cpp" || lang === "c++") {
      try {
        const result = await executeViaWandbox("gcc-13.2.0", code, stdin, "c++20");
        return NextResponse.json(result);
      } catch (err: any) {
        return NextResponse.json({
          stdout: [],
          stderr: [`C++ Compilation Service Error: ${err.message || String(err)}`],
          exitCode: 1,
          executionTimeMs: 1,
          engineName: "G++ 13.2.0 Compiler",
          hasError: true,
        });
      }
    }

    // 4. JAVA LANGUAGE (OpenJDK 17 / Temurin)
    if (lang === "java") {
      try {
        const result = await executeLocalJava(code, stdin);
        return NextResponse.json(result);
      } catch (localErr: any) {
        // Fallback to Wandbox Java 21
        try {
          const wandboxRes = await executeViaWandbox("openjdk-jdk-21.0.2", code, stdin);
          return NextResponse.json(wandboxRes);
        } catch {
          return NextResponse.json({
            stdout: [],
            stderr: [`Java runtime error: ${localErr.message || String(localErr)}`],
            exitCode: 1,
            executionTimeMs: 1,
            engineName: "Java Runtime",
            hasError: true,
          });
        }
      }
    }

    // 5. JAVASCRIPT / NODE
    if (lang === "javascript" || lang === "js" || lang === "node") {
      const result = await executeLocalNode(code);
      return NextResponse.json(result);
    }

    return NextResponse.json(
      {
        stdout: [],
        stderr: [`Unsupported execution language: ${language}`],
        exitCode: 1,
        executionTimeMs: 1,
        engineName: "Router",
        hasError: true,
      },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        stdout: [],
        stderr: [`Server Execution Error: ${err.message || String(err)}`],
        exitCode: 1,
        executionTimeMs: 1,
        engineName: "Server",
        hasError: true,
      },
      { status: 500 }
    );
  }
}
