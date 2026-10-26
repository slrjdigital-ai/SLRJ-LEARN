import { ExecutionResult } from "./types";

interface CVariable {
  type: string;
  value: any;
  address: string;
}

export function executeC(code: string): ExecutionResult {
  const startTime = performance.now();
  const stdout: string[] = [];
  const stderr: string[] = [];
  let exitCode = 0;

  // 1. Syntax & Structural Diagnostics
  if (!code.includes("main")) {
    stderr.push("/usr/bin/ld: /usr/lib/crt1.o: in function '_start':");
    stderr.push("main.c:(.text+0x20): undefined reference to 'main'");
    stderr.push("collect2: error: ld returned 1 exit status");
    return {
      stdout: [],
      stderr,
      exitCode: 1,
      executionTimeMs: 12,
      engineName: "GCC 13.2.0 (C17 Standard)",
      hasError: true,
    };
  }

  // Check balanced braces
  let openBraces = 0;
  const lines = code.split("\n");
  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx];
    const opens = (l.match(/\{/g) || []).length;
    const closes = (l.match(/\}/g) || []).length;
    openBraces += opens - closes;
    if (openBraces < 0) {
      stderr.push(`main.c:${idx + 1}:1: error: extraneous closing brace '}'`);
      return {
        stdout: [],
        stderr,
        exitCode: 1,
        executionTimeMs: 8,
        engineName: "GCC 13.2.0 (C17 Standard)",
        hasError: true,
      };
    }
  }

  if (openBraces > 0) {
    stderr.push(`main.c:${lines.length}:1: error: expected '}' at end of input`);
    return {
      stdout: [],
      stderr,
      exitCode: 1,
      executionTimeMs: 8,
      engineName: "GCC 13.2.0 (C17 Standard)",
      hasError: true,
    };
  }

  // 2. Simulated C Runtime VM
  try {
    const memory: Record<string, CVariable> = {};
    const heapPointers: Record<string, any[]> = {};
    let baseAddress = 0x7fff0000;

    // Helper to evaluate printf format string with variable arguments
    const handlePrintf = (formatStr: string, argExpressions: string[]) => {
      let result = formatStr;
      let argIndex = 0;

      // Handle escape characters
      result = result.replace(/\\n/g, "\n").replace(/\\t/g, "\t");

      // Replace specifiers
      result = result.replace(/%(\.?\d*)?[discfpu]/g, (match) => {
        if (argIndex >= argExpressions.length) return match;
        const rawArg = argExpressions[argIndex++].trim();

        // Check if address-of: (void*)&arr[i] or &x
        if (rawArg.includes("&")) {
          const matchAddr = rawArg.match(/&([a-zA-Z0-9_]+)(?:\[(\d+)\])?/);
          if (matchAddr) {
            const varName = matchAddr[1];
            const arrIndex = matchAddr[2] ? parseInt(matchAddr[2]) : 0;
            const offset = arrIndex * 4;
            const addrHex = "0x" + (baseAddress + offset).toString(16);
            return addrHex;
          }
          return "0x" + baseAddress.toString(16);
        }

        // Pointer dereference: *(arr + i)
        const ptrDeref = rawArg.match(/\*\(([a-zA-Z0-9_]+)\s*\+\s*([a-zA-Z0-9_]+)\)/);
        if (ptrDeref) {
          const ptrName = ptrDeref[1];
          const offsetVar = ptrDeref[2];
          const offset = /^\d+$/.test(offsetVar) ? parseInt(offsetVar) : memory[offsetVar]?.value || 0;
          if (heapPointers[ptrName] && heapPointers[ptrName][offset] !== undefined) {
            return String(heapPointers[ptrName][offset]);
          }
        }

        // Array indexing: arr[i]
        const arrIdxMatch = rawArg.match(/([a-zA-Z0-9_]+)\[([^\]]+)\]/);
        if (arrIdxMatch) {
          const arrName = arrIdxMatch[1];
          const indexExpr = arrIdxMatch[2].trim();
          const idxVal = /^\d+$/.test(indexExpr) ? parseInt(indexExpr) : memory[indexExpr]?.value || 0;
          if (heapPointers[arrName] && heapPointers[arrName][idxVal] !== undefined) {
            return String(heapPointers[arrName][idxVal]);
          }
        }

        // Variable lookup
        if (memory[rawArg] !== undefined) {
          const val = memory[rawArg].value;
          if (match.includes("f") && typeof val === "number") {
            const dec = match.match(/\.(\d+)/);
            return dec ? val.toFixed(parseInt(dec[1])) : val.toFixed(6);
          }
          return String(val);
        }

        // Numeric or arithmetic expression
        try {
          const subbed = rawArg.replace(/([a-zA-Z_]\w*)/g, (m) =>
            memory[m] !== undefined ? String(memory[m].value) : m
          );
          // eslint-disable-next-line no-eval
          const evalVal = eval(subbed);
          return String(evalVal);
        } catch {
          return rawArg;
        }
      });

      // Split into stdout lines
      const outputLines = result.split("\n");
      for (const line of outputLines) {
        if (line) stdout.push(line);
      }
    };

    // Extract body of main()
    const mainBodyMatch = code.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
    const body = mainBodyMatch ? mainBodyMatch[1] : code;

    // Tokenize into statements
    // We execute statements including for loops and printf
    const rawStatements = body.split("\n");

    let i = 0;
    while (i < rawStatements.length) {
      let line = rawStatements[i].trim();
      i++;
      if (!line || line.startsWith("//") || line.startsWith("/*") || line.startsWith("*")) continue;

      // Handle for loop: for (int i = 0; i < n; i++)
      const forMatch = line.match(/for\s*\(\s*(?:int\s+)?([a-zA-Z_]\w*)\s*=\s*(\d+)\s*;\s*\1\s*<\s*([a-zA-Z0-9_]+)\s*;\s*\1\+\+\s*\)\s*\{?/);
      if (forMatch) {
        const iterVar = forMatch[1];
        const startVal = parseInt(forMatch[2]);
        const boundToken = forMatch[3];
        const boundVal = /^\d+$/.test(boundToken) ? parseInt(boundToken) : memory[boundToken]?.value || 0;

        // Collect body lines of this loop
        const loopBodyLines: string[] = [];
        let loopBraces = line.includes("{") ? 1 : 0;

        if (loopBraces === 0) {
          // Single statement loop
          if (i < rawStatements.length) {
            loopBodyLines.push(rawStatements[i++].trim());
          }
        } else {
          while (i < rawStatements.length && loopBraces > 0) {
            const nextL = rawStatements[i++].trim();
            if (nextL.includes("{")) loopBraces++;
            if (nextL.includes("}")) loopBraces--;
            if (loopBraces > 0) loopBodyLines.push(nextL);
          }
        }

        // Execute loop iterations
        for (let iter = startVal; iter < boundVal; iter++) {
          memory[iterVar] = { type: "int", value: iter, address: "0x" + (baseAddress + 0x100).toString(16) };

          for (const stmt of loopBodyLines) {
            // arr[i] = (i + 1) * 10
            const arrAssign = stmt.match(/([a-zA-Z0-9_]+)\[([^\]]+)\]\s*=\s*([^;]+);/);
            if (arrAssign) {
              const arrName = arrAssign[1];
              const idxExpr = arrAssign[2].trim();
              const valExpr = arrAssign[3].trim();
              const idxVal = /^\d+$/.test(idxExpr) ? parseInt(idxExpr) : memory[idxExpr]?.value || 0;

              const subbed = valExpr.replace(/([a-zA-Z_]\w*)/g, (m) =>
                memory[m] !== undefined ? String(memory[m].value) : m
              );
              // eslint-disable-next-line no-eval
              const calcVal = eval(subbed);
              if (!heapPointers[arrName]) heapPointers[arrName] = [];
              heapPointers[arrName][idxVal] = calcVal;
            }

            // sum += *(arr + i);
            const sumAssign = stmt.match(/([a-zA-Z0-9_]+)\s*\+=\s*\*\(([a-zA-Z0-9_]+)\s*\+\s*([a-zA-Z0-9_]+)\);/);
            if (sumAssign) {
              const targetVar = sumAssign[1];
              const arrName = sumAssign[2];
              const offsetVar = sumAssign[3];
              const offset = /^\d+$/.test(offsetVar) ? parseInt(offsetVar) : memory[offsetVar]?.value || 0;
              const val = heapPointers[arrName]?.[offset] || 0;
              if (memory[targetVar]) memory[targetVar].value += val;
            }

            // printf inside loop
            if (stmt.includes("printf(")) {
              const pfMatch = stmt.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*([\s\S]*))?\s*\);/);
              if (pfMatch) {
                const fmt = pfMatch[1];
                const argsStr = pfMatch[2] || "";
                const args = argsStr ? argsStr.split(/,(?![^(]*\))/).map((s) => s.trim()) : [];
                handlePrintf(fmt, args);
              }
            }
          }
        }
        continue;
      }

      // Variable declaration / assignment: int n = 5;
      const varDecl = line.match(/(?:int|float|double|char\*|size_t)\s+([a-zA-Z_]\w*)\s*=\s*([^;]+);/);
      if (varDecl) {
        const varName = varDecl[1];
        const valExpr = varDecl[2].trim();

        // Check if malloc
        if (valExpr.includes("malloc(")) {
          heapPointers[varName] = [];
          memory[varName] = { type: "pointer", value: "0x" + baseAddress.toString(16), address: "0x" + baseAddress.toString(16) };
          baseAddress += 0x20;
        } else {
          try {
            const subbed = valExpr.replace(/([a-zA-Z_]\w*)/g, (m) =>
              memory[m] !== undefined ? String(memory[m].value) : m
            );
            // eslint-disable-next-line no-eval
            const evalVal = eval(subbed);
            memory[varName] = { type: "number", value: evalVal, address: "0x" + baseAddress.toString(16) };
            baseAddress += 4;
          } catch {
            memory[varName] = { type: "raw", value: valExpr, address: "0x" + baseAddress.toString(16) };
          }
        }
        continue;
      }

      // printf statement
      if (line.includes("printf(")) {
        const pfMatch = line.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*([\s\S]*))?\s*\);/);
        if (pfMatch) {
          const fmt = pfMatch[1];
          const argsStr = pfMatch[2] || "";
          const args = argsStr ? argsStr.split(/,(?![^(]*\))/).map((s) => s.trim()) : [];
          handlePrintf(fmt, args);
        }
        continue;
      }

      // free statement
      if (line.includes("free(")) {
        const freeMatch = line.match(/free\s*\(\s*([a-zA-Z_]\w*)\s*\);/);
        if (freeMatch && heapPointers[freeMatch[1]]) {
          delete heapPointers[freeMatch[1]];
        }
        continue;
      }
    }

    if (stdout.length === 0) {
      stdout.push("Process exited normally with code 0 (no output emitted).");
    }
  } catch (err: any) {
    stderr.push(`Runtime Exception: ${err.message || String(err)}`);
    exitCode = 1;
  }

  const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
  return {
    stdout,
    stderr,
    exitCode,
    executionTimeMs,
    engineName: "GCC 13.2.0 (C17 Standard)",
    hasError: exitCode !== 0 || stderr.length > 0,
  };
}
