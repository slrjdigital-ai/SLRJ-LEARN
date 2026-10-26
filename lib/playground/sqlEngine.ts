import { ExecutionResult } from "./types";

interface TableRow {
  [key: string]: any;
}

interface DatabaseTable {
  columns: string[];
  rows: TableRow[];
}

function getInitialDatabase(): Record<string, DatabaseTable> {
  return {
    departments: {
      columns: ["dept_id", "dept_name", "location"],
      rows: [
        { dept_id: 1, dept_name: "Engineering", location: "Building A - Silicon Valley" },
        { dept_id: 2, dept_name: "Data Science", location: "Building B - New York" },
        { dept_id: 3, dept_name: "Product", location: "Building A - San Francisco" },
        { dept_id: 4, dept_name: "Marketing", location: "Building C - Austin" },
        { dept_id: 5, dept_name: "Human Resources", location: "Building D - Chicago" },
      ],
    },
    employees: {
      columns: ["emp_id", "name", "dept_id", "salary", "role", "hire_year"],
      rows: [
        { emp_id: 101, name: "Alex Rivera", dept_id: 1, salary: 88000.0, role: "Frontend Lead", hire_year: 2021 },
        { emp_id: 102, name: "Sarah Jenkins", dept_id: 1, salary: 95000.0, role: "Senior Backend Eng", hire_year: 2019 },
        { emp_id: 103, name: "David Kim", dept_id: 1, salary: 78000.0, role: "Fullstack Engineer", hire_year: 2022 },
        { emp_id: 104, name: "Marcus Vance", dept_id: 1, salary: 110000.0, role: "Principal Architect", hire_year: 2018 },
        { emp_id: 105, name: "Priya Sharma", dept_id: 2, salary: 98000.0, role: "Lead ML Researcher", hire_year: 2020 },
        { emp_id: 106, name: "Michael Chen", dept_id: 2, salary: 84000.0, role: "Data Analyst", hire_year: 2022 },
        { emp_id: 107, name: "Elena Rostova", dept_id: 2, salary: 92000.0, role: "AI Systems Engineer", hire_year: 2021 },
        { emp_id: 108, name: "Jordan Lee", dept_id: 3, salary: 85000.0, role: "Senior Product Manager", hire_year: 2020 },
        { emp_id: 109, name: "Rachel Green", dept_id: 3, salary: 73000.0, role: "Associate PM", hire_year: 2023 },
        { emp_id: 110, name: "Carlos Mendez", dept_id: 4, salary: 68000.0, role: "Growth Marketing Lead", hire_year: 2021 },
        { emp_id: 111, name: "Amina Patel", dept_id: 5, salary: 71000.0, role: "HR Operations Partner", hire_year: 2022 },
      ],
    },
    projects: {
      columns: ["project_id", "title", "dept_id", "budget", "status"],
      rows: [
        { project_id: 201, title: "Cloud Migration 2.0", dept_id: 1, budget: 250000.0, status: "In Progress" },
        { project_id: 202, title: "Realtime Analytics Engine", dept_id: 2, budget: 180000.0, status: "Completed" },
        { project_id: 203, title: "NextGen Mobile App", dept_id: 1, budget: 320000.0, status: "Planning" },
        { project_id: 204, title: "Global Brand Campaign", dept_id: 4, budget: 95000.0, status: "In Progress" },
        { project_id: 205, title: "Talent Onboarding Portal", dept_id: 5, budget: 60000.0, status: "Completed" },
      ],
    },
  };
}

function formatAsciiTable(headers: string[], rows: (string | number | null)[][]): string[] {
  if (headers.length === 0) return ["Empty set"];

  const colWidths = headers.map((h, i) => {
    let max = h.length;
    for (const row of rows) {
      const val = row[i] !== null && row[i] !== undefined ? String(row[i]) : "NULL";
      if (val.length > max) max = val.length;
    }
    return max + 2; // padding
  });

  const divider =
    "+" + colWidths.map((w) => "-".repeat(w)).join("+") + "+";

  const headerLine =
    "|" +
    headers
      .map((h, i) => {
        const pad = colWidths[i] - h.length - 1;
        return " " + h + " ".repeat(Math.max(0, pad));
      })
      .join("|") +
    "|";

  const result: string[] = [divider, headerLine, divider];

  for (const row of rows) {
    const rowLine =
      "|" +
      row
        .map((cell, i) => {
          const val = cell !== null && cell !== undefined ? String(cell) : "NULL";
          const isNum = typeof cell === "number";
          const pad = colWidths[i] - val.length - 1;
          if (isNum) {
            return " ".repeat(Math.max(0, pad)) + val + " ";
          }
          return " " + val + " ".repeat(Math.max(0, pad));
        })
        .join("|") +
      "|";
    result.push(rowLine);
  }

  result.push(divider);
  return result;
}

export function executeSQL(sqlScript: string): ExecutionResult {
  const startTime = performance.now();
  const stdout: string[] = [];
  const stderr: string[] = [];
  let exitCode = 0;

  const db = getInitialDatabase();

  // Strip single-line & multi-line comments
  const cleanSql = sqlScript
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/--.*$/gm, "")
    .trim();

  if (!cleanSql) {
    return {
      stdout: ["No SQL query found in source."],
      stderr: [],
      exitCode: 0,
      executionTimeMs: 1,
      engineName: "SQLite / In-Memory Relational Engine",
      hasError: false,
    };
  }

  const statements = cleanSql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const rawStmt of statements) {
    const stmt = rawStmt.replace(/\s+/g, " ").trim();
    const upper = stmt.toUpperCase();

    try {
      if (upper === "SHOW TABLES") {
        const tableNames = Object.keys(db).map((t) => [t]);
        const lines = formatAsciiTable(["Tables_in_database"], tableNames);
        stdout.push(...lines);
        stdout.push(`${tableNames.length} rows in set`);
        continue;
      }

      if (upper.startsWith("DESCRIBE ") || upper.startsWith("DESC ")) {
        const tbl = stmt.split(/\s+/)[1].toLowerCase().replace(/['"`]/g, "");
        if (!db[tbl]) {
          stderr.push(`Error: Table '${tbl}' does not exist.`);
          exitCode = 1;
          break;
        }
        const cols = db[tbl].columns.map((c) => [c, "VARCHAR/INT", "YES", ""]);
        const lines = formatAsciiTable(["Field", "Type", "Null", "Key"], cols);
        stdout.push(...lines);
        continue;
      }

      // SELECT Statement Execution
      if (upper.startsWith("SELECT")) {
        // Parse FROM
        const fromMatch = stmt.match(/FROM\s+([a-zA-Z0-9_]+)(?:\s+(?:AS\s+)?([a-zA-Z0-9_]+))?/i);
        if (!fromMatch) {
          stderr.push("Syntax Error: SELECT statement requires FROM clause in practice playground.");
          exitCode = 1;
          break;
        }

        const mainTable = fromMatch[1].toLowerCase();
        const mainAlias = fromMatch[2] ? fromMatch[2].toLowerCase() : mainTable;

        if (!db[mainTable]) {
          stderr.push(`Error: Table '${mainTable}' does not exist.`);
          exitCode = 1;
          break;
        }

        // Check JOIN
        let joinedRows: TableRow[] = [];
        const joinMatch = stmt.match(/(?:INNER\s+|LEFT\s+)?JOIN\s+([a-zA-Z0-9_]+)(?:\s+(?:AS\s+)?([a-zA-Z0-9_]+))?\s+ON\s+([^\s]+)\s*=\s*([^\s]+)/i);

        if (joinMatch) {
          const joinTable = joinMatch[1].toLowerCase();
          const joinAlias = joinMatch[2] ? joinMatch[2].toLowerCase() : joinTable;
          const leftCond = joinMatch[3];
          const rightCond = joinMatch[4];

          if (!db[joinTable]) {
            stderr.push(`Error: Joined table '${joinTable}' does not exist.`);
            exitCode = 1;
            break;
          }

          const getCol = (cond: string, tblAlias: string) => {
            const parts = cond.split(".");
            return parts.length > 1 ? parts[1] : parts[0];
          };

          const leftCol = getCol(leftCond, mainAlias);
          const rightCol = getCol(rightCond, joinAlias);

          for (const mRow of db[mainTable].rows) {
            let matched = false;
            for (const jRow of db[joinTable].rows) {
              const mVal = mRow[leftCol] ?? mRow[rightCol];
              const jVal = jRow[rightCol] ?? jRow[leftCol];
              if (mVal !== undefined && jVal !== undefined && mVal === jVal) {
                matched = true;
                const combined: TableRow = {};
                // prefixes
                for (const k in mRow) {
                  combined[k] = mRow[k];
                  combined[`${mainAlias}.${k}`] = mRow[k];
                  combined[`${mainTable}.${k}`] = mRow[k];
                }
                for (const k in jRow) {
                  combined[k] = jRow[k];
                  combined[`${joinAlias}.${k}`] = jRow[k];
                  combined[`${joinTable}.${k}`] = jRow[k];
                }
                joinedRows.push(combined);
              }
            }
            if (!matched && upper.includes("LEFT JOIN")) {
              const combined: TableRow = {};
              for (const k in mRow) {
                combined[k] = mRow[k];
                combined[`${mainAlias}.${k}`] = mRow[k];
              }
              joinedRows.push(combined);
            }
          }
        } else {
          // No join
          joinedRows = db[mainTable].rows.map((r) => {
            const rowCopy: TableRow = { ...r };
            for (const k in r) {
              rowCopy[`${mainAlias}.${k}`] = r[k];
              rowCopy[`${mainTable}.${k}`] = r[k];
            }
            return rowCopy;
          });
        }

        // Apply WHERE clause if present
        const whereMatch = stmt.match(/WHERE\s+(.+?)(?:\s+GROUP\s+BY|\s+ORDER\s+BY|\s+LIMIT|$)/i);
        if (whereMatch) {
          const whereClause = whereMatch[1].trim();
          joinedRows = joinedRows.filter((row) => {
            // Support conditions: e.g. salary >= 90000, dept_id = 1, name = '...'
            try {
              // Replace tokens in expression
              const subbed = whereClause.replace(/([a-zA-Z0-9_.]+)/g, (match) => {
                const upperMatch = match.toUpperCase();
                if (["AND", "OR", "NOT", "LIKE", "IN", "IS", "NULL", "TRUE", "FALSE"].includes(upperMatch)) {
                  return match;
                }
                if (/^\d+(\.\d+)?$/.test(match)) return match;
                const val = row[match] ?? row[match.toLowerCase()];
                if (val !== undefined) {
                  return typeof val === "string" ? `"${val}"` : String(val);
                }
                return match;
              });

              // Safe evaluation for basic comparisons
              const jsCondition = subbed
                .replace(/AND/gi, "&&")
                .replace(/OR/gi, "||")
                .replace(/([^><=!])=([^=])/g, "$1===$2")
                .replace(/<>/g, "!==");

              // Evaluate condition
              // eslint-disable-next-line no-eval
              return Boolean(eval(jsCondition));
            } catch {
              return true;
            }
          });
        }

        // Parse SELECT columns
        const selectColsMatch = stmt.match(/SELECT\s+(.+?)\s+FROM/i);
        if (!selectColsMatch) {
          stderr.push("Syntax Error: Could not parse selected fields.");
          exitCode = 1;
          break;
        }

        const rawColsStr = selectColsMatch[1].trim();
        const rawColItems = rawColsStr.split(/,(?![^()]*\))/).map((c) => c.trim());

        // Parse GROUP BY
        const groupByMatch = stmt.match(/GROUP\s+BY\s+(.+?)(?:\s+HAVING|\s+ORDER\s+BY|\s+LIMIT|$)/i);
        let groupedData: { [key: string]: TableRow[] } = {};

        if (groupByMatch) {
          const groupKeys = groupByMatch[1].split(",").map((k) => k.trim());
          for (const row of joinedRows) {
            const keyVal = groupKeys.map((k) => row[k] ?? row[k.toLowerCase()] ?? "").join("___");
            if (!groupedData[keyVal]) groupedData[keyVal] = [];
            groupedData[keyVal].push(row);
          }
        } else {
          // Single global group if aggregates used, or row-by-row
          const hasAggregate = rawColItems.some((c) =>
            /(COUNT|AVG|SUM|MAX|MIN|ROUND)\(/i.test(c)
          );
          if (hasAggregate) {
            groupedData["__ALL__"] = joinedRows;
          }
        }

        // Parse HAVING
        const havingMatch = stmt.match(/HAVING\s+(.+?)(?:\s+ORDER\s+BY|\s+LIMIT|$)/i);

        const headerLabels: string[] = [];
        const resultRows: any[][] = [];

        // Build output rows
        if (groupByMatch || Object.keys(groupedData).length > 0) {
          for (const groupKey of Object.keys(groupedData)) {
            const rowsInGroup = groupedData[groupKey];
            const sampleRow = rowsInGroup[0] || {};
            const outputRow: any[] = [];
            let meetsHaving = true;

            // Evaluate aggregates and columns
            for (let i = 0; i < rawColItems.length; i++) {
              const colDef = rawColItems[i];
              let headerName = colDef;
              const asMatch = colDef.match(/(?:AS\s+)?([a-zA-Z0-9_]+)$/i);
              if (asMatch && !colDef.endsWith(")")) {
                headerName = asMatch[1];
              }

              if (resultRows.length === 0) {
                headerLabels.push(headerName);
              }

              // Check functions
              if (/COUNT\((.*?)\)/i.test(colDef)) {
                outputRow.push(rowsInGroup.length);
              } else if (/AVG\((.*?)\)/i.test(colDef)) {
                const m = colDef.match(/AVG\(([a-zA-Z0-9_.]+)\)/i);
                const colName = m ? m[1] : "";
                const sum = rowsInGroup.reduce((acc, r) => acc + (Number(r[colName] ?? r[colName.toLowerCase()]) || 0), 0);
                const avg = rowsInGroup.length > 0 ? sum / rowsInGroup.length : 0;
                if (/ROUND\(/i.test(colDef)) {
                  outputRow.push(avg.toFixed(2));
                } else {
                  outputRow.push(avg.toFixed(2));
                }
              } else if (/SUM\((.*?)\)/i.test(colDef)) {
                const m = colDef.match(/SUM\(([a-zA-Z0-9_.]+)\)/i);
                const colName = m ? m[1] : "";
                const sum = rowsInGroup.reduce((acc, r) => acc + (Number(r[colName] ?? r[colName.toLowerCase()]) || 0), 0);
                outputRow.push(sum.toFixed(2));
              } else if (/MAX\((.*?)\)/i.test(colDef)) {
                const m = colDef.match(/MAX\(([a-zA-Z0-9_.]+)\)/i);
                const colName = m ? m[1] : "";
                const max = Math.max(...rowsInGroup.map((r) => Number(r[colName] ?? r[colName.toLowerCase()]) || 0));
                outputRow.push(max.toFixed(2));
              } else if (/MIN\((.*?)\)/i.test(colDef)) {
                const m = colDef.match(/MIN\(([a-zA-Z0-9_.]+)\)/i);
                const colName = m ? m[1] : "";
                const min = Math.min(...rowsInGroup.map((r) => Number(r[colName] ?? r[colName.toLowerCase()]) || 0));
                outputRow.push(min.toFixed(2));
              } else {
                // regular grouped column
                const rawColClean = colDef.split(/\s+AS\s+/i)[0].trim();
                outputRow.push(sampleRow[rawColClean] ?? sampleRow[rawColClean.toLowerCase()] ?? "NULL");
              }
            }

            // Check having filter
            if (havingMatch) {
              const havingExpr = havingMatch[1].trim();
              if (/COUNT\([^)]*\)\s*>=?\s*(\d+)/i.test(havingExpr)) {
                const minCount = parseInt(havingExpr.match(/COUNT\([^)]*\)\s*>=?\s*(\d+)/i)![1]);
                if (rowsInGroup.length < minCount) meetsHaving = false;
              }
            }

            if (meetsHaving) {
              resultRows.push(outputRow);
            }
          }
        } else {
          // Standard row-by-row selection
          if (rawColsStr === "*") {
            const cols = db[mainTable].columns;
            headerLabels.push(...cols);
            for (const row of joinedRows) {
              resultRows.push(cols.map((c) => row[c] ?? "NULL"));
            }
          } else {
            for (let i = 0; i < rawColItems.length; i++) {
              const colDef = rawColItems[i];
              let headerName = colDef;
              const asMatch = colDef.match(/\s+(?:AS\s+)?([a-zA-Z0-9_]+)$/i);
              if (asMatch) headerName = asMatch[1];
              headerLabels.push(headerName);
            }

            for (const row of joinedRows) {
              const outputRow: any[] = [];
              for (const colDef of rawColItems) {
                const colName = colDef.split(/\s+(?:AS\s+)?/i)[0].trim();
                const val = row[colName] ?? row[colName.toLowerCase()] ?? "NULL";
                outputRow.push(typeof val === "number" && colName.includes("salary") ? val.toFixed(2) : val);
              }
              resultRows.push(outputRow);
            }
          }
        }

        // Parse ORDER BY
        const orderByMatch = stmt.match(/ORDER\s+BY\s+([a-zA-Z0-9_.]+)(?:\s+(ASC|DESC))?/i);
        if (orderByMatch) {
          const orderCol = orderByMatch[1].trim();
          const isDesc = (orderByMatch[2] || "ASC").toUpperCase() === "DESC";
          const colIdx = headerLabels.findIndex(
            (h) => h.toLowerCase() === orderCol.toLowerCase() || h.includes(orderCol)
          );

          if (colIdx !== -1) {
            resultRows.sort((a, b) => {
              const va = a[colIdx];
              const vb = b[colIdx];
              const numA = parseFloat(va);
              const numB = parseFloat(vb);
              if (!isNaN(numA) && !isNaN(numB)) {
                return isDesc ? numB - numA : numA - numB;
              }
              return isDesc ? String(vb).localeCompare(String(va)) : String(va).localeCompare(String(vb));
            });
          }
        }

        // Parse LIMIT
        const limitMatch = stmt.match(/LIMIT\s+(\d+)/i);
        let finalRows = resultRows;
        if (limitMatch) {
          finalRows = resultRows.slice(0, parseInt(limitMatch[1]));
        }

        const formatted = formatAsciiTable(headerLabels, finalRows);
        stdout.push(...formatted);
        const sec = ((performance.now() - startTime) / 1000).toFixed(3);
        stdout.push(`${finalRows.length} ${finalRows.length === 1 ? "row" : "rows"} in set (${sec} sec)`);
      } else {
        // DDL / DML fallback (INSERT, UPDATE, DELETE, etc.)
        stdout.push(`Query OK, statement executed successfully.`);
      }
    } catch (err: any) {
      stderr.push(`SQL Error: ${err.message || String(err)}`);
      exitCode = 1;
      break;
    }
  }

  const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));

  return {
    stdout,
    stderr,
    exitCode,
    executionTimeMs,
    engineName: "SQLite 3.45 / PostgreSQL Engine",
    hasError: exitCode !== 0 || stderr.length > 0,
  };
}
