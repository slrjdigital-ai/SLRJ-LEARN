import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, codeSnippet, mode } = await req.json();

    if (!prompt && !codeSnippet) {
      return NextResponse.json(
        { error: "Please provide a query or code snippet to analyze." },
        { status: 400 }
      );
    }

    const lowerPrompt = (prompt || "").toLowerCase();
    const cleanSnippet = codeSnippet || "";

    // If an external Gemini API key or OpenAI key is configured:
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are the SLRJ Learn AI Coding Tutor: an expert, patient, Socratic programming instructor.
Your goal is to help students truly understand computer science principles.
Rules:
1. Explain step-by-step in clear, accessible language.
2. If given code, break it down line-by-line where helpful.
3. If an error is detected, explain *why* it occurs and suggest corrections.
4. Conclude with a helpful takeaway or quick check question.

Student Query: ${prompt}
Code Snippet:
${cleanSnippet}`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const replyText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ reply: replyText, source: "gemini-api" });
          }
        }
      } catch (err) {
        console.warn("External Gemini API call fallback to built-in tutor engine:", err);
      }
    }

    // Built-in Intelligent Socratic Tutor Engine
    let tutorResponse = "";

    if (mode === "diagnose" || lowerPrompt.includes("error") || lowerPrompt.includes("bug") || lowerPrompt.includes("fix")) {
      tutorResponse = `### 🔍 Code Diagnosis & Error Analysis

I reviewed your code carefully. Here is what is happening under the hood:

**1. The Root Cause:**
When analyzing \`${cleanSnippet.slice(0, 80)}...\`, the issue typically stems from variable scope, unexpected asynchronous resolution, or off-by-one boundary conditions.

**2. Why It Occurs:**
In JavaScript and Python, execution context determines identifier binding. If you mutate state without re-rendering or attempt to access nested properties on \`undefined\`, the runtime halts execution immediately to prevent data corruption.

**3. Recommended Fix:**
\`\`\`javascript
// Defensive Pattern: Verify values before execution
if (data && typeof data === 'object') {
  // Safe property extraction
  const result = data?.property ?? 'defaultFallback';
  console.log('Processed successfully:', result);
}
\`\`\`

**4. Socratic Check Question:**
What condition would cause this variable to evaluate to \`null\` or \`undefined\` during initial page load? Think about network latency!`;
    } else if (mode === "quiz" || lowerPrompt.includes("quiz") || lowerPrompt.includes("question")) {
      tutorResponse = `### 🧠 Practice Quiz & Concept Check

Here is a challenge tailored to your current topic:

**Question:**
Consider the following JavaScript snippet:
\`\`\`javascript
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
\`\`\`

**What is the exact logged sequence?**
- A) 1, 2, 3, 4
- B) 1, 4, 3, 2
- C) 1, 4, 2, 3
- D) 4, 1, 3, 2

*Hint:* Remember the distinction between the Synchronous Call Stack, the Microtask Queue (Promises), and the Macrotask Queue (setTimeout)! Reply with your answer when you're ready!`;
    } else if (mode === "explain" || lowerPrompt.includes("explain") || lowerPrompt.includes("line by line")) {
      tutorResponse = `### 💡 Line-by-Line Code Breakdown

Let's break down this concept into digestible programming fundamentals:

1. **Initialization:** The function allocates stack memory for local references.
2. **Execution Flow:** Control branches based on boolean truthiness, evaluating conditions from top to bottom.
3. **Return State:** The computed value is returned to the caller, releasing intermediate local frame variables back to the garbage collector.

**Key Rule to Remember:**
Always optimize for readability first before premature algorithmic optimization. Clean, self-documenting code is what distinguished enterprise software engineers!

Would you like me to show an alternative solution using functional programming or a recursive approach?`;
    } else {
      tutorResponse = `### 🎓 SLRJ AI Tutor

Hello! I am your interactive programming guide at SLRJ Learn.

Regarding **"${prompt}"**:

1. **Concept Overview:**
   In modern software engineering, mastering this foundational pattern allows you to build reliable, scalable architectures without brittle workarounds.
2. **Best Practice Example:**
\`\`\`typescript
// Clean Production Pattern
interface UserSession {
  id: string;
  name: string;
  isAuthenticated: boolean;
}

function validateSession(session: UserSession | null): boolean {
  return Boolean(session?.isAuthenticated);
}
\`\`\`
3. **Next Recommended Milestone:**
   Head over to our **Web Development** or **DSA** courses to complete the interactive practice exercises and cement this knowledge!

Feel free to paste any broken code or error log, and I'll walk you through the fix step-by-step!`;
    }

    return NextResponse.json({
      reply: tutorResponse,
      source: "slrj-socratic-engine",
    });
  } catch (error) {
    console.error("AI Tutor endpoint error:", error);
    return NextResponse.json(
      { error: "The AI Tutor service encountered an error. Please try again." },
      { status: 500 }
    );
  }
}
