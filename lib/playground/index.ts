import { PlaygroundLanguage, ExecutionResult } from "./types";
import { executePython, preloadPyodide } from "./pythonEngine";
import { executeSQL } from "./sqlEngine";

export * from "./types";
export { preloadPyodide };

export async function executePlaygroundCode(
  language: PlaygroundLanguage,
  code: string,
  stdin: string = "",
  signal?: AbortSignal
): Promise<ExecutionResult> {
  const startTime = performance.now();

  if (language === "web") {
    return {
      stdout: ["Web client-side sandbox initialized."],
      stderr: [],
      exitCode: 0,
      executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
      engineName: "Chromium Web Browser Engine (HTML/CSS/JS)",
      hasError: false,
    };
  }

  if (language === "sql") {
    return executeSQL(code);
  }

  // ── Real Native / Cloud Compiler Execution via API ──
  try {
    const res = await fetch("/api/playground/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, code, stdin }),
      signal,
    });

    if (res.ok) {
      const data: ExecutionResult = await res.json();
      return data;
    } else {
      const errData = await res.json().catch(() => ({}));
      return {
        stdout: [],
        stderr: errData.stderr || [`Compiler service error: HTTP ${res.status}`],
        exitCode: 1,
        executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
        engineName: `${language.toUpperCase()} Compiler Service`,
        hasError: true,
      };
    }
  } catch (apiErr: any) {
    if (signal?.aborted || apiErr.name === "AbortError") {
      return {
        stdout: [],
        stderr: ["[Execution aborted by user]"],
        exitCode: 130,
        executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
        engineName: "Process Monitor",
        hasError: true,
      };
    }

    // Python WebAssembly fallback (Pyodide in browser)
    if (language === "python") {
      try {
        return await executePython(code);
      } catch (pyErr: any) {
        return {
          stdout: [],
          stderr: [`Python runtime error: ${pyErr.message || String(pyErr)}`],
          exitCode: 1,
          executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
          engineName: "Pyodide WASM Engine",
          hasError: true,
        };
      }
    }

    // Honest message when native backend is unreachable (no fake regex simulation)
    return {
      stdout: [],
      stderr: [
        `Unable to reach ${language.toUpperCase()} execution service.`,
        `Details: ${apiErr.message || String(apiErr)}`,
        "Please verify your network connection or server status.",
      ],
      exitCode: 1,
      executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
      engineName: `${language.toUpperCase()} Execution Gateway`,
      hasError: true,
    };
  }
}
