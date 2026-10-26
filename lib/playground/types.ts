export type PlaygroundLanguage = "web" | "python" | "c" | "cpp" | "java" | "sql";

export interface ExecutionResult {
  stdout: string[];
  stderr: string[];
  exitCode: number;
  executionTimeMs: number;
  engineName: string;
  hasError: boolean;
}

export interface SamplePreset {
  name: string;
  language: PlaygroundLanguage;
  html?: string;
  css?: string;
  js?: string;
  code?: string;
  expectedOutput: string;
  hints: string[];
  solutionCode?: string;
  description?: string;
}
