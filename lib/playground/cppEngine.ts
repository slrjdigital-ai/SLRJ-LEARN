import { ExecutionResult } from "./types";

export function executeCpp(code: string): ExecutionResult {
  const startTime = performance.now();
  const stdout: string[] = [];
  const stderr: string[] = [];
  let exitCode = 0;

  // 1. Validation & diagnostics
  if (!code.includes("main")) {
    stderr.push("/usr/bin/ld: /usr/lib/crt1.o: in function '_start':");
    stderr.push("main.cpp:(.text+0x20): undefined reference to 'main'");
    stderr.push("collect2: error: ld returned 1 exit status");
    return {
      stdout: [],
      stderr,
      exitCode: 1,
      executionTimeMs: 14,
      engineName: "G++ 13.2.0 (C++20 ISO)",
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
      stderr.push(`main.cpp:${idx + 1}:1: error: extraneous closing brace '}'`);
      return {
        stdout: [],
        stderr,
        exitCode: 1,
        executionTimeMs: 10,
        engineName: "G++ 13.2.0 (C++20 ISO)",
        hasError: true,
      };
    }
  }

  if (openBraces > 0) {
    stderr.push(`main.cpp:${lines.length}:1: error: expected '}' at end of input`);
    return {
      stdout: [],
      stderr,
      exitCode: 1,
      executionTimeMs: 10,
      engineName: "G++ 13.2.0 (C++20 ISO)",
      hasError: true,
    };
  }

  // 2. Execution Runtime
  try {
    const variables: Record<string, any> = {};
    const stacks: Record<string, any[]> = {};
    const vectors: Record<string, any[]> = {};

    // Helper to evaluate std::cout << a << b << std::endl;
    const handleCout = (streamExpr: string) => {
      // Split by <<
      const parts = streamExpr
        .split(/<<(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map((p) => p.trim())
        .filter((p) => p && !p.startsWith("std::cout") && !p.startsWith("cout"));

      let lineBuffer = "";
      for (const part of parts) {
        if (part === "std::endl" || part === "endl") {
          stdout.push(lineBuffer);
          lineBuffer = "";
          continue;
        }

        // String literal
        if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
          lineBuffer += part.slice(1, -1).replace(/\\n/g, "\n");
          continue;
        }

        // Method calls on stack / vector
        const methodCall = part.match(/([a-zA-Z0-9_]+)\.(size|pop|empty|back)\(\)/);
        if (methodCall) {
          const objName = methodCall[1];
          const method = methodCall[2];
          const arr = stacks[objName] || vectors[objName] || [];

          if (method === "size") {
            lineBuffer += String(arr.length);
          } else if (method === "pop") {
            const popped = arr.pop();
            lineBuffer += popped !== undefined ? String(popped) : "";
          } else if (method === "empty") {
            lineBuffer += arr.length === 0 ? "true" : "false";
          } else if (method === "back") {
            lineBuffer += arr.length > 0 ? String(arr[arr.length - 1]) : "";
          }
          continue;
        }

        // Variable lookup
        if (variables[part] !== undefined) {
          lineBuffer += String(variables[part]);
          continue;
        }

        // Arithmetic expression
        try {
          const subbed = part.replace(/([a-zA-Z_]\w*)/g, (m) =>
            variables[m] !== undefined ? String(variables[m]) : m
          );
          // eslint-disable-next-line no-eval
          lineBuffer += String(eval(subbed));
        } catch {
          lineBuffer += part;
        }
      }

      if (lineBuffer) {
        const lines = lineBuffer.split("\n");
        for (const l of lines) {
          if (l) stdout.push(l);
        }
      }
    };

    // Extract main body
    const mainBodyMatch = code.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
    const body = mainBodyMatch ? mainBodyMatch[1] : code;
    const rawLines = body.split("\n");

    let i = 0;
    while (i < rawLines.length) {
      const line = rawLines[i].trim();
      i++;
      if (!line || line.startsWith("//") || line.startsWith("/*") || line.startsWith("*")) continue;

      // Handle Stack / Object declaration: SafeStack<std::string> stack; or vector<int> vec;
      const stackDecl = line.match(/(?:SafeStack|vector)<[^>]+>\s+([a-zA-Z_]\w*)/);
      if (stackDecl) {
        const objName = stackDecl[1];
        stacks[objName] = [];
        vectors[objName] = [];
        continue;
      }

      // stack.push("value") or vec.push_back(val)
      const pushMatch = line.match(/([a-zA-Z0-9_]+)\.(?:push|push_back)\s*\(\s*(.*?)\s*\);/);
      if (pushMatch) {
        const objName = pushMatch[1];
        let val: any = pushMatch[2].trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        } else if (/^\d+(\.\d+)?$/.test(val)) {
          val = Number(val);
        } else if (variables[val] !== undefined) {
          val = variables[val];
        }

        if (!stacks[objName]) stacks[objName] = [];
        stacks[objName].push(val);
        continue;
      }

      // while (!stack.empty()) loop
      const whileMatch = line.match(/while\s*\(\s*!([a-zA-Z0-9_]+)\.empty\(\)\s*\)\s*\{?/);
      if (whileMatch) {
        const objName = whileMatch[1];
        const loopStatements: string[] = [];
        let loopBraces = line.includes("{") ? 1 : 0;

        if (loopBraces === 0 && i < rawLines.length) {
          loopStatements.push(rawLines[i++].trim());
        } else {
          while (i < rawLines.length && loopBraces > 0) {
            const nextL = rawLines[i++].trim();
            if (nextL.includes("{")) loopBraces++;
            if (nextL.includes("}")) loopBraces--;
            if (loopBraces > 0) loopStatements.push(nextL);
          }
        }

        // Execute while stack not empty
        while (stacks[objName] && stacks[objName].length > 0) {
          for (const stmt of loopStatements) {
            if (stmt.includes("std::cout") || stmt.includes("cout")) {
              handleCout(stmt.replace(/;\s*$/, ""));
            }
          }
        }
        continue;
      }

      // for loop: for (int i = 0; i < n; i++)
      const forMatch = line.match(/for\s*\(\s*(?:int\s+)?([a-zA-Z_]\w*)\s*=\s*(\d+)\s*;\s*\1\s*<\s*([^;]+)\s*;\s*\1\+\+\s*\)\s*\{?/);
      if (forMatch) {
        const iterVar = forMatch[1];
        const startVal = parseInt(forMatch[2]);
        const boundToken = forMatch[3].trim();
        let boundVal = 0;

        if (boundToken.includes(".size()")) {
          const obj = boundToken.replace(".size()", "").trim();
          boundVal = (stacks[obj] || vectors[obj] || []).length;
        } else if (/^\d+$/.test(boundToken)) {
          boundVal = parseInt(boundToken);
        } else {
          boundVal = variables[boundToken] || 0;
        }

        const loopBody: string[] = [];
        let loopBraces = line.includes("{") ? 1 : 0;
        if (loopBraces === 0 && i < rawLines.length) {
          loopBody.push(rawLines[i++].trim());
        } else {
          while (i < rawLines.length && loopBraces > 0) {
            const nextL = rawLines[i++].trim();
            if (nextL.includes("{")) loopBraces++;
            if (nextL.includes("}")) loopBraces--;
            if (loopBraces > 0) loopBody.push(nextL);
          }
        }

        for (let iter = startVal; iter < boundVal; iter++) {
          variables[iterVar] = iter;
          for (const stmt of loopBody) {
            if (stmt.includes("std::cout") || stmt.includes("cout")) {
              handleCout(stmt.replace(/;\s*$/, ""));
            }
          }
        }
        continue;
      }

      // cout statement
      if (line.includes("std::cout") || line.includes("cout <<")) {
        handleCout(line.replace(/;\s*$/, ""));
        continue;
      }

      // Basic variable: int x = 10; or string s = "hello";
      const varAssign = line.match(/(?:int|double|float|auto|std::string|string)\s+([a-zA-Z_]\w*)\s*=\s*([^;]+);/);
      if (varAssign) {
        const name = varAssign[1];
        const expr = varAssign[2].trim();
        if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
          variables[name] = expr.slice(1, -1);
        } else {
          try {
            // eslint-disable-next-line no-eval
            variables[name] = eval(expr);
          } catch {
            variables[name] = expr;
          }
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
    engineName: "G++ 13.2.0 (C++20 ISO)",
    hasError: exitCode !== 0 || stderr.length > 0,
  };
}
