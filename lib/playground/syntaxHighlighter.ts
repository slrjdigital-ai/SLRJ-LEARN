export type EditorTheme = "vs-dark" | "night-owl" | "monokai" | "github-light";

export interface ThemeColors {
  name: string;
  id: EditorTheme;
  bg: string;
  gutterBg: string;
  gutterText: string;
  activeLineGutter: string;
  text: string;
  selection: string;
  activeLine: string;
  keyword: string;
  type: string;
  string: string;
  number: string;
  comment: string;
  function: string;
  operator: string;
  punctuation: string;
  variable: string;
  tag: string;
  attribute: string;
}

export const THEMES: Record<EditorTheme, ThemeColors> = {
  "vs-dark": {
    name: "VS Code Dark+",
    id: "vs-dark",
    bg: "#1E1E1E",
    gutterBg: "#1E1E1E",
    gutterText: "#858585",
    activeLineGutter: "#C6C6C6",
    text: "#D4D4D4",
    selection: "#264F78",
    activeLine: "#282828",
    keyword: "#569CD6",
    type: "#4EC9B0",
    string: "#CE9178",
    number: "#B5CEA8",
    comment: "#6A9955",
    function: "#DCDCAA",
    operator: "#D4D4D4",
    punctuation: "#D4D4D4",
    variable: "#9CDCFE",
    tag: "#569CD6",
    attribute: "#9CDCFE",
  },
  "night-owl": {
    name: "Night Owl",
    id: "night-owl",
    bg: "#011627",
    gutterBg: "#011627",
    gutterText: "#4B6479",
    activeLineGutter: "#C5E4FD",
    text: "#d6deeb",
    selection: "#1d3b53",
    activeLine: "#0b253a",
    keyword: "#c792ea",
    type: "#22daec",
    string: "#ecc48d",
    number: "#f78c6c",
    comment: "#637777",
    function: "#82aaff",
    operator: "#7fdbca",
    punctuation: "#c5e4fd",
    variable: "#d6deeb",
    tag: "#7fdbca",
    attribute: "#addb67",
  },
  monokai: {
    name: "Monokai",
    id: "monokai",
    bg: "#272822",
    gutterBg: "#272822",
    gutterText: "#75715E",
    activeLineGutter: "#F8F8F2",
    text: "#F8F8F2",
    selection: "#49483E",
    activeLine: "#3E3D32",
    keyword: "#F92672",
    type: "#66D9EF",
    string: "#E6DB74",
    number: "#AE81FF",
    comment: "#75715E",
    function: "#A6E22E",
    operator: "#F92672",
    punctuation: "#F8F8F2",
    variable: "#FD971F",
    tag: "#F92672",
    attribute: "#A6E22E",
  },
  "github-light": {
    name: "GitHub Light",
    id: "github-light",
    bg: "#FFFFFF",
    gutterBg: "#F6F8FA",
    gutterText: "#8C959F",
    activeLineGutter: "#24292F",
    text: "#24292F",
    selection: "#B6E3FF",
    activeLine: "#F6F8FA",
    keyword: "#CF222E",
    type: "#953800",
    string: "#0A3069",
    number: "#0550AE",
    comment: "#6E7781",
    function: "#8250DF",
    operator: "#CF222E",
    punctuation: "#24292F",
    variable: "#24292F",
    tag: "#116329",
    attribute: "#0550AE",
  },
};

// ── Tokenizer for Languages ──
interface Token {
  type: keyof ThemeColors;
  text: string;
}

export function tokenizeCode(code: string, language: string): Token[] {
  if (!code) return [];

  const lang = (language || "").toLowerCase();

  // Escape HTML helper
  const tokens: Token[] = [];
  let remaining = code;

  // Keyword sets
  const pythonKeywords = new Set([
    "def", "class", "return", "if", "elif", "else", "for", "while", "import", "from",
    "as", "try", "except", "finally", "with", "lambda", "yield", "pass", "break", "continue",
    "in", "is", "not", "and", "or", "True", "False", "None", "async", "await", "global", "nonlocal"
  ]);

  const cppKeywords = new Set([
    "int", "float", "double", "char", "void", "bool", "long", "short", "unsigned", "signed",
    "auto", "const", "static", "constexpr", "class", "struct", "template", "typename",
    "namespace", "using", "public", "private", "protected", "virtual", "override",
    "return", "if", "else", "for", "while", "do", "switch", "case", "default", "break",
    "continue", "new", "delete", "this", "nullptr", "include", "std", "vector", "string", "cout", "cin", "endl"
  ]);

  const javaKeywords = new Set([
    "public", "private", "protected", "class", "interface", "record", "extends", "implements",
    "static", "final", "void", "int", "boolean", "double", "float", "char", "long", "short", "byte",
    "return", "if", "else", "for", "while", "do", "switch", "case", "default", "break", "continue",
    "new", "this", "super", "try", "catch", "finally", "throw", "throws", "import", "package",
    "true", "false", "null", "instanceof"
  ]);

  const sqlKeywords = new Set([
    "select", "from", "where", "insert", "into", "values", "update", "set", "delete",
    "create", "table", "drop", "alter", "join", "inner", "left", "right", "outer", "on",
    "group", "by", "order", "asc", "desc", "having", "limit", "as", "and", "or", "not",
    "primary", "key", "foreign", "references", "null", "is", "count", "avg", "sum", "min", "max"
  ]);

  const jsKeywords = new Set([
    "function", "const", "let", "var", "return", "if", "else", "for", "while", "do",
    "switch", "case", "default", "break", "continue", "new", "this", "class", "extends",
    "import", "export", "from", "async", "await", "try", "catch", "finally", "throw",
    "typeof", "instanceof", "true", "false", "null", "undefined", "yield"
  ]);

  // Regex patterns
  while (remaining.length > 0) {
    // 1. Whitespace
    const ws = remaining.match(/^(\s+)/);
    if (ws) {
      tokens.push({ type: "text", text: ws[0] });
      remaining = remaining.slice(ws[0].length);
      continue;
    }

    // 2. Line Comments
    if (
      (lang === "python" && remaining.startsWith("#")) ||
      (lang !== "python" && lang !== "sql" && remaining.startsWith("//")) ||
      (lang === "sql" && remaining.startsWith("--"))
    ) {
      const idx = remaining.indexOf("\n");
      const commentText = idx === -1 ? remaining : remaining.slice(0, idx);
      tokens.push({ type: "comment", text: commentText });
      remaining = remaining.slice(commentText.length);
      continue;
    }

    // 3. Block Comments
    if (remaining.startsWith("/*")) {
      const idx = remaining.indexOf("*/");
      const commentText = idx === -1 ? remaining : remaining.slice(0, idx + 2);
      tokens.push({ type: "comment", text: commentText });
      remaining = remaining.slice(commentText.length);
      continue;
    }

    // 4. HTML Comments
    if (lang === "web" && remaining.startsWith("<!--")) {
      const idx = remaining.indexOf("-->");
      const commentText = idx === -1 ? remaining : remaining.slice(0, idx + 3);
      tokens.push({ type: "comment", text: commentText });
      remaining = remaining.slice(commentText.length);
      continue;
    }

    // 5. Strings (double, single, backtick)
    if (remaining[0] === '"' || remaining[0] === "'" || remaining[0] === "`") {
      const quote = remaining[0];
      let str = quote;
      let escaped = false;
      let i = 1;
      while (i < remaining.length) {
        const ch = remaining[i];
        str += ch;
        if (ch === "\\" && !escaped) {
          escaped = true;
        } else {
          if (ch === quote && !escaped) {
            i++;
            break;
          }
          escaped = false;
        }
        i++;
      }
      tokens.push({ type: "string", text: str });
      remaining = remaining.slice(str.length);
      continue;
    }

    // 6. Preprocessor (#include, #define in C/C++)
    if ((lang === "c" || lang === "cpp") && remaining.startsWith("#")) {
      const prep = remaining.match(/^#[a-zA-Z_]+/);
      if (prep) {
        tokens.push({ type: "keyword", text: prep[0] });
        remaining = remaining.slice(prep[0].length);
        continue;
      }
    }

    // 7. Numbers
    const num = remaining.match(/^(\b\d+(\.\d+)?([eE][+-]?\d+)?\b)/);
    if (num) {
      tokens.push({ type: "number", text: num[0] });
      remaining = remaining.slice(num[0].length);
      continue;
    }

    // 8. HTML Tags (<div, </span>)
    if (lang === "web" && remaining.startsWith("<")) {
      const tagMatch = remaining.match(/^<\/?([a-zA-Z0-9\-]+)/);
      if (tagMatch) {
        tokens.push({ type: "tag", text: tagMatch[0] });
        remaining = remaining.slice(tagMatch[0].length);
        continue;
      }
    }

    // 9. Identifiers & Words
    const word = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)/);
    if (word) {
      const w = word[0];
      const lower = w.toLowerCase();

      let matchedType: keyof ThemeColors = "variable";

      if (lang === "python" && pythonKeywords.has(w)) matchedType = "keyword";
      else if ((lang === "c" || lang === "cpp") && cppKeywords.has(w)) matchedType = "keyword";
      else if (lang === "java" && javaKeywords.has(w)) matchedType = "keyword";
      else if (lang === "sql" && sqlKeywords.has(lower)) matchedType = "keyword";
      else if ((lang === "web" || lang === "js" || lang === "javascript") && jsKeywords.has(w)) matchedType = "keyword";
      else if (/^[A-Z][a-zA-Z0-9_]*$/.test(w)) matchedType = "type"; // PascalCase = Class/Type
      else if (remaining.slice(w.length).trim().startsWith("(")) matchedType = "function";

      tokens.push({ type: matchedType, text: w });
      remaining = remaining.slice(w.length);
      continue;
    }

    // 10. Operators & Punctuation
    const op = remaining.match(/^([+\-*/%=<>!&|^~?:;.,()[\]{}]+)/);
    if (op) {
      tokens.push({ type: "operator", text: op[0] });
      remaining = remaining.slice(op[0].length);
      continue;
    }

    // Fallback single character
    tokens.push({ type: "text", text: remaining[0] });
    remaining = remaining.slice(1);
  }

  return tokens;
}
