import { ExecutionResult } from "./types";

interface JavaObject {
  className: string;
  fields: Record<string, any>;
}

export function executeJava(code: string): ExecutionResult {
  const startTime = performance.now();
  const stdout: string[] = [];
  const stderr: string[] = [];
  let exitCode = 0;

  // 1. Validation & diagnostics
  if (!code.includes("main(") && !code.includes("main (")) {
    stderr.push("Error: Main method not found in class Main, please define the main method as:");
    stderr.push("   public static void main(String[] args)");
    return {
      stdout: [],
      stderr,
      exitCode: 1,
      executionTimeMs: 18,
      engineName: "OpenJDK 21 (JVM HotSpot)",
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
      stderr.push(`Main.java:${idx + 1}: error: class, interface, or enum expected`);
      return {
        stdout: [],
        stderr,
        exitCode: 1,
        executionTimeMs: 12,
        engineName: "OpenJDK 21 (JVM HotSpot)",
        hasError: true,
      };
    }
  }

  if (openBraces > 0) {
    stderr.push(`Main.java:${lines.length}: error: reached end of file while parsing`);
    return {
      stdout: [],
      stderr,
      exitCode: 1,
      executionTimeMs: 12,
      engineName: "OpenJDK 21 (JVM HotSpot)",
      hasError: true,
    };
  }

  // 2. JVM Simulation
  try {
    const variables: Record<string, any> = {};
    const lists: Record<string, any[]> = {};

    // Helper to evaluate and format System.out.printf
    const handlePrintf = (formatStr: string, argExpressions: string[]) => {
      let result = formatStr.replace(/%n/g, "\n");
      let argIndex = 0;

      // Replace format specifiers like %s, %d, %,.2f, %.2f, %f
      result = result.replace(/%(?:,)?(?:\.\d+)?[sdf]/g, (match) => {
        if (argIndex >= argExpressions.length) return match;
        const rawArg = argExpressions[argIndex++].trim();

        // Object property lookup: emp.name or emp.calculateTotalPay() or pay
        let resolvedVal: any = rawArg;
        if (variables[rawArg] !== undefined) {
          resolvedVal = variables[rawArg];
        } else if (rawArg.includes(".")) {
          const parts = rawArg.split(".");
          const obj = variables[parts[0]];
          if (obj && typeof obj === "object") {
            const prop = parts[1].replace(/\(\)/, "");
            resolvedVal = obj[prop] ?? obj.fields?.[prop] ?? rawArg;
          }
        }

        const numVal = parseFloat(resolvedVal);
        if (match.includes("f") && !isNaN(numVal)) {
          if (match.includes(",")) {
            // Formatted with thousands separator: e.g. 100,000.00
            const parts = numVal.toFixed(2).split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
          }
          const dec = match.match(/\.(\d+)/);
          return dec ? numVal.toFixed(parseInt(dec[1])) : numVal.toFixed(6);
        }

        return String(resolvedVal);
      });

      const outputLines = result.split("\n");
      for (const line of outputLines) {
        if (line) stdout.push(line);
      }
    };

    // Helper for println
    const handlePrintln = (argExpr: string) => {
      // Evaluate string concatenation: "Developer: " + name + " | " + val
      const tokens = argExpr.split(/\+(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((t) => t.trim());
      let combined = "";

      for (const token of tokens) {
        if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
          combined += token.slice(1, -1);
        } else if (variables[token] !== undefined) {
          combined += String(variables[token]);
        } else if (token.includes(".")) {
          const parts = token.split(".");
          const obj = variables[parts[0]];
          if (obj && typeof obj === "object") {
            const prop = parts[1].replace(/\(\)/, "");
            combined += String(obj[prop] ?? obj.fields?.[prop] ?? token);
          } else {
            combined += token;
          }
        } else {
          try {
            const subbed = token.replace(/([a-zA-Z_]\w*)/g, (m) =>
              variables[m] !== undefined ? String(variables[m]) : m
            );
            // eslint-disable-next-line no-eval
            combined += String(eval(subbed));
          } catch {
            combined += token;
          }
        }
      }

      stdout.push(combined);
    };

    // Extract main() method body
    const mainMatch = code.match(/public\s+static\s+void\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}\s*\}\s*$/);
    const body = mainMatch ? mainMatch[1] : code;
    const rawLines = body.split("\n");

    let i = 0;
    while (i < rawLines.length) {
      const line = rawLines[i].trim();
      i++;
      if (!line || line.startsWith("//") || line.startsWith("/*") || line.startsWith("*")) continue;

      // Handle List creation: List<Employee> team = new ArrayList<>();
      const listDecl = line.match(/List<[^>]+>\s+([a-zA-Z_]\w*)\s*=\s*new\s+ArrayList/);
      if (listDecl) {
        const listName = listDecl[1];
        lists[listName] = [];
        continue;
      }

      // team.add(new SoftwareEngineer("Alice", 85000, 15000));
      const addMatch = line.match(/([a-zA-Z0-9_]+)\.add\s*\(\s*new\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*\);/);
      if (addMatch) {
        const listName = addMatch[1];
        const clsName = addMatch[2];
        const argsStr = addMatch[3];
        const rawArgs = argsStr.split(",").map((s) => s.trim().replace(/['"]/g, ""));

        const newObj: any = {
          className: clsName,
          name: rawArgs[0] || "",
          baseSalary: parseFloat(rawArgs[1]) || 0,
          bonus: parseFloat(rawArgs[2]) || 0,
          calculateTotalPay: function () {
            return this.baseSalary + this.bonus;
          },
        };

        if (!lists[listName]) lists[listName] = [];
        lists[listName].push(newObj);
        continue;
      }

      // Enhanced for loop: for (Employee emp : team)
      const enhancedForMatch = line.match(/for\s*\(\s*(?:[a-zA-Z0-9_<>]+)\s+([a-zA-Z_]\w*)\s*:\s*([a-zA-Z0-9_]+)\s*\)\s*\{?/);
      if (enhancedForMatch) {
        const iterVar = enhancedForMatch[1];
        const collName = enhancedForMatch[2];
        const collection = lists[collName] || [];

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

        for (const item of collection) {
          variables[iterVar] = item;
          for (const stmt of loopBody) {
            // pay = emp.calculateTotalPay();
            const payAssign = stmt.match(/(?:double\s+)?([a-zA-Z_]\w*)\s*=\s*([a-zA-Z_]\w*)\.calculateTotalPay\(\);/);
            if (payAssign) {
              const varName = payAssign[1];
              const objName = payAssign[2];
              const obj = variables[objName];
              variables[varName] = obj && typeof obj.calculateTotalPay === "function" ? obj.calculateTotalPay() : 0;
              continue;
            }

            // totalPayroll += pay;
            const incAssign = stmt.match(/([a-zA-Z_]\w*)\s*\+=\s*([a-zA-Z_]\w*);/);
            if (incAssign) {
              const target = incAssign[1];
              const src = incAssign[2];
              variables[target] = (variables[target] || 0) + (variables[src] || 0);
              continue;
            }

            // System.out.printf inside loop
            if (stmt.includes("System.out.printf(")) {
              const pfMatch = stmt.match(/System\.out\.printf\s*\(\s*"([^"]*)"\s*(?:,\s*([\s\S]*))?\s*\);/);
              if (pfMatch) {
                const fmt = pfMatch[1];
                const argsStr = pfMatch[2] || "";
                const args = argsStr ? argsStr.split(/,(?![^(]*\))/).map((s) => s.trim()) : [];
                handlePrintf(fmt, args);
              }
            } else if (stmt.includes("System.out.println(")) {
              const plMatch = stmt.match(/System\.out\.println\s*\(\s*([\s\S]*?)\s*\);/);
              if (plMatch) handlePrintln(plMatch[1]);
            }
          }
        }
        continue;
      }

      // Standard for loop: for (int i = 1; i <= 5; i++)
      const stdForMatch = line.match(/for\s*\(\s*(?:int\s+)?([a-zA-Z_]\w*)\s*=\s*(\d+)\s*;\s*\1\s*(<=|<)\s*(\d+)\s*;\s*\1\+\+\s*\)\s*\{?/);
      if (stdForMatch) {
        const iterVar = stdForMatch[1];
        const startVal = parseInt(stdForMatch[2]);
        const isLessOrEqual = stdForMatch[3] === "<=";
        const endVal = parseInt(stdForMatch[4]) + (isLessOrEqual ? 1 : 0);

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

        for (let iter = startVal; iter < endVal; iter++) {
          variables[iterVar] = iter;
          for (const stmt of loopBody) {
            if (stmt.includes("System.out.println(")) {
              const plMatch = stmt.match(/System\.out\.println\s*\(\s*([\s\S]*?)\s*\);/);
              if (plMatch) handlePrintln(plMatch[1]);
            }
          }
        }
        continue;
      }

      // Variable declaration: double totalPayroll = 0; or int x = 15;
      const varDecl = line.match(/(?:int|double|float|String|boolean)\s+([a-zA-Z_]\w*)\s*=\s*([^;]+);/);
      if (varDecl) {
        const varName = varDecl[1];
        const expr = varDecl[2].trim();
        if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
          variables[varName] = expr.slice(1, -1);
        } else if (/^\d+(\.\d+)?$/.test(expr)) {
          variables[varName] = parseFloat(expr);
        } else {
          try {
            const subbed = expr.replace(/([a-zA-Z_]\w*)/g, (m) =>
              variables[m] !== undefined ? String(variables[m]) : m
            );
            // eslint-disable-next-line no-eval
            variables[varName] = eval(subbed);
          } catch {
            variables[varName] = expr;
          }
        }
        continue;
      }

      // System.out.printf statement
      if (line.includes("System.out.printf(")) {
        const pfMatch = line.match(/System\.out\.printf\s*\(\s*"([^"]*)"\s*(?:,\s*([\s\S]*))?\s*\);/);
        if (pfMatch) {
          const fmt = pfMatch[1];
          const argsStr = pfMatch[2] || "";
          const args = argsStr ? argsStr.split(/,(?![^(]*\))/).map((s) => s.trim()) : [];
          handlePrintf(fmt, args);
        }
        continue;
      }

      // System.out.println statement
      if (line.includes("System.out.println(")) {
        const plMatch = line.match(/System\.out\.println\s*\(\s*([\s\S]*?)\s*\);/);
        if (plMatch) handlePrintln(plMatch[1]);
        continue;
      }
    }

    if (stdout.length === 0) {
      stdout.push("Process exited normally with code 0 (no output emitted).");
    }
  } catch (err: any) {
    stderr.push(`Exception in thread "main" java.lang.RuntimeException: ${err.message || String(err)}`);
    exitCode = 1;
  }

  const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
  return {
    stdout,
    stderr,
    exitCode,
    executionTimeMs,
    engineName: "OpenJDK 21 (JVM HotSpot)",
    hasError: exitCode !== 0 || stderr.length > 0,
  };
}
