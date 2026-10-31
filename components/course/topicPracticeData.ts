import { Course, CourseModule } from "@/data/courses";
import { getAssessment } from "@/data/assessments";
import {
  C_PROGRAMMING_TOPIC_BANKS,
  generateTwentyQuestionsForTopic,
} from "./topicQuestionBanks";

export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint?: string;
}

export interface TopicCodeData {
  language: string;
  code: string;
  solutionCode?: string;
  taskDescription?: string;
  output: string;
  explanation: string;
}

export const C_PROGRAMMING_CHALLENGES: Record<
  number,
  {
    taskDescription: string;
    starterCode: string;
    solutionCode: string;
    output: string;
    explanation: string;
  }
> = {
  0: {
    taskDescription:
      "Print the welcome message 'Welcome to SLRJ Learn C Architecture!' to standard output using printf.",
    starterCode: `#include <stdio.h>

int main(void) {
    // CHAPTER 1 TASK: Introduction, Variables & Data Types
    // Objective: Print "Welcome to SLRJ Learn C Architecture!" to the console.
    
    // --- TODO: WRITE YOUR CODE BELOW ---
    
    
    // ------------------------------------
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    // CHAPTER 1 TASK: Introduction, Variables & Data Types
    // Objective: Print "Welcome to SLRJ Learn C Architecture!" to the console.
    
    // --- TODO: WRITE YOUR CODE BELOW ---
    printf("Welcome to SLRJ Learn C Architecture!\\n");
    // ------------------------------------
    return 0;
}`,
    output: "Welcome to SLRJ Learn C Architecture!",
    explanation:
      "#include <stdio.h> links standard I/O functions. main() is the program entry point returning exit code 0 to the OS.",
  },
  1: {
    taskDescription:
      "Given score = 88, write if / else-if conditions: if score >= 90 print 'Grade: A', else if score >= 80 print 'Grade: B', else print 'Grade: C'.",
    starterCode: `#include <stdio.h>

int main(void) {
    int score = 88;

    // CHAPTER 2 TASK: Operators, Conditions & Loops
    // Objective: Evaluate 'score' and print the appropriate grade.
    
    // --- TODO: WRITE YOUR IF-ELSE STATEMENT BELOW ---
    
    
    // -----------------------------------------------
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int score = 88;

    // CHAPTER 2 TASK: Operators, Conditions & Loops
    // Objective: Evaluate 'score' and print the appropriate grade.
    
    // --- TODO: WRITE YOUR IF-ELSE STATEMENT BELOW ---
    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else {
        printf("Grade: C\\n");
    }
    // -----------------------------------------------
    return 0;
}`,
    output: "Grade: B",
    explanation:
      "Branch evaluations execute top-down until a condition tests true, printing Grade: B.",
  },
  2: {
    taskDescription:
      "Implement calculate_power(int base, int exp) using a loop to compute and return base raised to power exp.",
    starterCode: `#include <stdio.h>

// CHAPTER 3 TASK: Functions, Arrays & Strings
// Objective: Implement calculate_power using a loop to return base^exp
int calculate_power(int base, int exp) {
    int result = 1;

    // --- TODO: WRITE YOUR FOR LOOP BELOW ---
    
    
    // ---------------------------------------
    return result;
}

int main(void) {
    printf("2^5 = %d\\n", calculate_power(2, 5));
    return 0;
}`,
    solutionCode: `#include <stdio.h>

// CHAPTER 3 TASK: Functions, Arrays & Strings
// Objective: Implement calculate_power using a loop to return base^exp
int calculate_power(int base, int exp) {
    int result = 1;

    // --- TODO: WRITE YOUR FOR LOOP BELOW ---
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    // ---------------------------------------
    return result;
}

int main(void) {
    printf("2^5 = %d\\n", calculate_power(2, 5));
    return 0;
}`,
    output: "2^5 = 32",
    explanation:
      "Functions isolate local state in stack frames and return values cleanly across calls.",
  },
  3: {
    taskDescription:
      "Implement swap(int *a, int *b) using pointer dereferencing (*a and *b) to swap two integer values in place.",
    starterCode: `#include <stdio.h>

// CHAPTER 4 TASK: Pointers & Dynamic Memory
// Objective: Use pointer dereferencing to swap the values of *a and *b
void swap(int *a, int *b) {
    // --- TODO: DEREFERENCE AND SWAP VALUES BELOW ---
    
    
    // -----------------------------------------------
}

int main(void) {
    int x = 10, y = 20;
    swap(&x, &y);
    printf("x=%d, y=%d\\n", x, y);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

// CHAPTER 4 TASK: Pointers & Dynamic Memory
// Objective: Use pointer dereferencing to swap the values of *a and *b
void swap(int *a, int *b) {
    // --- TODO: DEREFERENCE AND SWAP VALUES BELOW ---
    int temp = *a;
    *a = *b;
    *b = temp;
    // -----------------------------------------------
}

int main(void) {
    int x = 10, y = 20;
    swap(&x, &y);
    printf("x=%d, y=%d\\n", x, y);
    return 0;
}`,
    output: "x=20, y=10",
    explanation:
      "Passing pointer addresses (&x, &y) allows swap() to mutate variables in main's stack frame.",
  },
  4: {
    taskDescription:
      "Initialize Student s with id=101, name='Shahid', gpa=3.95 and print 'Student #101: Shahid (GPA: 3.95)'.",
    starterCode: `#include <stdio.h>

typedef struct {
    int id;
    char name[32];
    float gpa;
} Student;

int main(void) {
    // CHAPTER 5 TASK: Structures & File Handling
    // Objective: Instantiate Student s and print formatted profile details.

    // --- TODO: INITIALIZE STUDENT AND PRINT BELOW ---
    
    
    // ------------------------------------------------
    return 0;
}`,
    solutionCode: `#include <stdio.h>

typedef struct {
    int id;
    char name[32];
    float gpa;
} Student;

int main(void) {
    // CHAPTER 5 TASK: Structures & File Handling
    // Objective: Instantiate Student s and print formatted profile details.

    // --- TODO: INITIALIZE STUDENT AND PRINT BELOW ---
    Student s = {101, "Shahid", 3.95f};
    printf("Student #%d: %s (GPA: %.2f)\\n", s.id, s.name, s.gpa);
    // ------------------------------------------------
    return 0;
}`,
    output: "Student #101: Shahid (GPA: 3.95)",
    explanation:
      "typedef struct models heterogeneous data attributes contiguously in memory.",
  },
};

/**
 * Normalizes course language for syntax highlighting & execution
 */
export function getCourseLanguage(course: Course): string {
  const cat = (course.category || "").toLowerCase();
  const slug = (course.slug || "").toLowerCase();

  if (slug.includes("c-programming") || slug.includes("c-lang")) return "c";
  if (slug.includes("cpp") || slug.includes("c++")) return "cpp";
  if (slug.includes("python") || cat.includes("machine learning") || cat.includes("ai")) return "python";
  if (slug.includes("java-")) return "java";
  if (slug.includes("react") || slug.includes("next")) return "typescript";
  if (slug.includes("javascript") || slug.includes("node")) return "javascript";
  if (slug.includes("html") || slug.includes("css")) return "html";
  if (slug.includes("sql") || slug.includes("mongo") || cat.includes("database")) return "sql";
  if (slug.includes("git")) return "bash";
  return "c";
}

/**
 * Extracts or generates exactly 20 quiz questions for a specific topic module
 */
export function getTopicQuizQuestions(course: Course, moduleIndex: number): QuizQuestionItem[] {
  const targetModule = course.modules[moduleIndex];
  if (!targetModule) return [];

  const slug = (course.slug || "").toLowerCase();
  const id = (course.id || "").toLowerCase();

  // 1. If C Programming course, return dedicated 20 handcrafted questions for this topic
  if (slug.includes("c-programming") || slug.includes("c-lang") || id.includes("c-programming")) {
    if (C_PROGRAMMING_TOPIC_BANKS[moduleIndex]) {
      return C_PROGRAMMING_TOPIC_BANKS[moduleIndex];
    }
  }

  // 2. Otherwise gather any module lesson exercises
  const baseQuestions: QuizQuestionItem[] = [];
  targetModule.lessons?.forEach((lesson, lIdx) => {
    if (lesson.exercise) {
      const ex = lesson.exercise;
      let correctIdx = 0;
      if (typeof ex.correctAnswer === "number") {
        correctIdx = ex.correctAnswer;
      } else if (ex.options && typeof ex.correctAnswer === "string") {
        const found = ex.options.indexOf(ex.correctAnswer);
        correctIdx = found !== -1 ? found : 0;
      }

      baseQuestions.push({
        id: ex.id || `topic-${moduleIndex}-ex-${lIdx}`,
        question: ex.prompt,
        options: ex.options && ex.options.length > 0 ? ex.options : ["True", "False"],
        correctAnswer: correctIdx,
        explanation: ex.explanation || "Review the lesson concepts for full comprehension.",
        hint: ex.hint,
      });
    }
  });

  // 3. Add questions from the course assessment
  const assessment = getAssessment(course.slug) || getAssessment(course.id);
  if (assessment && assessment.questions?.length > 0) {
    const totalMods = Math.max(1, course.modules.length);
    const questionsPerMod = Math.ceil(assessment.questions.length / totalMods);
    const startIdx = moduleIndex * questionsPerMod;
    const endIdx = Math.min(assessment.questions.length, startIdx + questionsPerMod);

    const mapped = assessment.questions.slice(startIdx, endIdx);
    mapped.forEach((q, qIdx) => {
      if (!baseQuestions.some((b) => b.question === q.question)) {
        baseQuestions.push({
          id: q.id || `assess-${moduleIndex}-${qIdx}`,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || "Official curriculum assessment item.",
        });
      }
    });
  }

  // 4. Guarantee exactly 20 questions using the curriculum topic generator
  return generateTwentyQuestionsForTopic(
    targetModule.title,
    moduleIndex,
    course.category,
    course.title,
    baseQuestions
  );
}

/**
 * Extracts 20 comprehensive questions across all topics for the combined final quiz
 */
export function getCombinedQuizQuestions(course: Course): QuizQuestionItem[] {
  const slug = (course.slug || "").toLowerCase();
  const id = (course.id || "").toLowerCase();
  const combined: QuizQuestionItem[] = [];

  // For C Programming, sample 4 questions from each of the 5 modules to get 20 comprehensive questions
  if (slug.includes("c-programming") || slug.includes("c-lang") || id.includes("c-programming")) {
    for (let m = 0; m < 5; m++) {
      const bank = C_PROGRAMMING_TOPIC_BANKS[m] || [];
      // Pick 4 distinct representative questions from each module
      const sample = [bank[0], bank[4], bank[9], bank[14]].filter(Boolean);
      sample.forEach((q) => {
        if (!combined.some((item) => item.question === q.question)) {
          combined.push(q);
        }
      });
    }
    if (combined.length >= 20) {
      return combined.slice(0, 20);
    }
  }

  // 1. Pull the comprehensive assessment questions first
  const assessment = getAssessment(course.slug) || getAssessment(course.id);
  if (assessment && assessment.questions?.length > 0) {
    assessment.questions.forEach((q) => {
      combined.push({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      });
    });
  }

  // 2. Also append module exercises
  course.modules?.forEach((mod, modIdx) => {
    mod.lessons?.forEach((l, lIdx) => {
      if (l.exercise) {
        const ex = l.exercise;
        let cIdx = 0;
        if (typeof ex.correctAnswer === "number") {
          cIdx = ex.correctAnswer;
        } else if (ex.options && typeof ex.correctAnswer === "string") {
          const f = ex.options.indexOf(ex.correctAnswer);
          cIdx = f !== -1 ? f : 0;
        }

        if (!combined.some((item) => item.question === ex.prompt)) {
          combined.push({
            id: ex.id || `comb-${modIdx}-${lIdx}`,
            question: ex.prompt,
            options: ex.options && ex.options.length > 0 ? ex.options : ["True", "False"],
            correctAnswer: cIdx,
            explanation: ex.explanation,
            hint: ex.hint,
          });
        }
      }
    });
  });

  return generateTwentyQuestionsForTopic(
    "All Topics Comprehensive Final Exam",
    99,
    course.category,
    course.title,
    combined
  );
}

/**
 * Retrieves starter code for a specific topic module
 */
export function getTopicCodeData(course: Course, moduleIndex: number): TopicCodeData {
  const targetModule = course.modules[moduleIndex];
  const lang = getCourseLanguage(course);
  const slug = (course.slug || "").toLowerCase();
  const id = (course.id || "").toLowerCase();

  // 1. Dedicated handcrafted challenges for C Programming
  if (slug.includes("c-programming") || slug.includes("c-lang") || id.includes("c-programming")) {
    if (C_PROGRAMMING_CHALLENGES[moduleIndex]) {
      const ch = C_PROGRAMMING_CHALLENGES[moduleIndex];
      return {
        language: "c",
        code: ch.starterCode,
        solutionCode: ch.solutionCode,
        taskDescription: ch.taskDescription,
        output: ch.output,
        explanation: ch.explanation,
      };
    }
  }

  // 2. Check if any lesson in the module has a code example
  for (const lesson of targetModule?.lessons || []) {
    if (lesson.codeExample?.code) {
      const fullCode = lesson.codeExample.code;
      const expectedOut = lesson.codeExample.output || "Program compiled and executed with exit code 0.";
      const desc = `Complete the chapter code for "${targetModule.title}" to achieve the target output.`;

      // Scaffold the code by inserting a clear TODO block
      let scaffold = fullCode;
      if (fullCode.includes("main") && fullCode.includes("return")) {
        scaffold = fullCode.replace(/int\s+main\s*\([^)]*\)\s*\{[\s\S]*?\n\s*return/m, () => {
          return `int main(void) {\n    // CHAPTER TASK: ${targetModule.title}\n    // Objective: Produce the target output below\n    \n    // --- TODO: WRITE YOUR CODE BELOW ---\n    \n    \n    // ------------------------------------\n    return`;
        });
      }

      return {
        language: lesson.codeExample.language || lang,
        code: scaffold,
        solutionCode: fullCode,
        taskDescription: desc,
        output: expectedOut,
        explanation: lesson.codeExample.explanation || `Hands-on example for ${targetModule.title}.`,
      };
    }
  }

  // 3. Default fallback code based on topic & language
  return {
    language: lang,
    code: `// Topic: ${targetModule?.title || "Foundations"}
// Course: ${course.title}
#include <stdio.h>

int main(void) {
    // CHAPTER TASK: ${targetModule?.title || "Architecture"}
    // Objective: Print the message to console.
    
    // --- TODO: WRITE YOUR CODE BELOW ---
    
    
    // ------------------------------------
    return 0;
}`,
    solutionCode: `// Topic: ${targetModule?.title || "Foundations"}
// Course: ${course.title}
#include <stdio.h>

int main(void) {
    printf("Exploring ${targetModule?.title || "Architecture"} in ${course.title}!\\n");
    printf("Status: Ready to practice and compile.\\n");
    return 0;
}`,
    taskDescription: `Complete the code for ${targetModule?.title || "this chapter"} to produce the target output.`,
    output: `Exploring ${targetModule?.title || "Architecture"} in ${course.title}!\nStatus: Ready to practice and compile.`,
    explanation: `Interactive starter environment for ${targetModule?.title || "Topic"}.`,
  };
}

/**
 * Retrieves the comprehensive capstone code combining all topics
 */
export function getCombinedCodeData(course: Course): TopicCodeData {
  const lang = getCourseLanguage(course);

  // If C Programming
  if (lang === "c") {
    return {
      language: "c",
      code: `// ============================================================================
// SLRJ LEARN: FULL COMBINED CAPSTONE SYSTEM
// Course: C Programming: Fundamentals to System Architecture
// Topics Combined: Variables, Flow Control, Functions, Pointers, Structs, File I/O
// ============================================================================

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 1. Data Model & Struct Definition
typedef struct {
    int id;
    char name[32];
    float assessmentScore;
    int streakDays;
} LearnerProfile;

// 2. Modular Function with Pointer Passing
void evaluateLearner(LearnerProfile *p) {
    if (p->assessmentScore >= 80.0f) {
        printf("-> [PASS] Learner #%d (%s) qualified with %.1f%% (Streak: %d days)\n",
               p->id, p->name, p->assessmentScore, p->streakDays);
    } else {
        printf("-> [REVIEW] Learner #%d (%s) needs revision (Score: %.1f%%)\n",
               p->id, p->name, p->assessmentScore);
    }
}

int main(void) {
    printf("====================================================\n");
    printf("  SLRJ Learn C Architecture: Comprehensive Capstone  \n");
    printf("====================================================\n\n");

    // 3. Dynamic Heap Memory Allocation
    int cohortSize = 3;
    LearnerProfile *cohort = (LearnerProfile *)malloc(cohortSize * sizeof(LearnerProfile));
    if (!cohort) {
        fprintf(stderr, "Heap memory allocation failed!\\n");
        return 1;
    }

    // 4. Record Population (Variables & Structs)
    cohort[0] = (LearnerProfile){101, "Shahid", 96.5f, 14};
    cohort[1] = (LearnerProfile){102, "Aarav", 88.0f, 9};
    cohort[2] = (LearnerProfile){103, "Meera", 92.5f, 21};

    printf("[1/3] Evaluating cohort performance via pointers:\\n");
    for (int i = 0; i < cohortSize; i++) {
        evaluateLearner(&cohort[i]);
    }

    // 5. File I/O Persistence Simulation
    printf("\\n[2/3] Persisting verified cohort records to disk...\\n");
    FILE *fp = fopen("cohort_certified.txt", "w");
    if (fp) {
        fprintf(fp, "=== SLRJ Learn Certified Cohort Registry ===\\n");
        for (int i = 0; i < cohortSize; i++) {
            fprintf(fp, "ID=%d | Name=%s | Score=%.2f | Streak=%d\\n",
                    cohort[i].id, cohort[i].name, cohort[i].assessmentScore, cohort[i].streakDays);
        }
        fclose(fp);
        printf("-> Success: 'cohort_certified.txt' written successfully.\\n");
    }

    // 6. Explicit Memory Deallocation (Heap Hygiene)
    printf("\\n[3/3] Deallocating heap memory safely...\\n");
    free(cohort);
    cohort = NULL;
    printf("-> Heap buffer freed and pointer safely set to NULL.\\n");

    printf("\\n*** ALL 5 CURRICULUM TOPICS VERIFIED AND MASTERED! ***\\n");
    return 0;
}`,
      output: `====================================================
  SLRJ Learn C Architecture: Comprehensive Capstone  
====================================================

[1/3] Evaluating cohort performance via pointers:
-> [PASS] Learner #101 (Shahid) qualified with 96.5% (Streak: 14 days)
-> [PASS] Learner #102 (Aarav) qualified with 88.0% (Streak: 9 days)
-> [PASS] Learner #103 (Meera) qualified with 92.5% (Streak: 21 days)

[2/3] Persisting verified cohort records to disk...
-> Success: 'cohort_certified.txt' written successfully.

[3/3] Deallocating heap memory safely...
-> Heap buffer freed and pointer safely set to NULL.

*** ALL 5 CURRICULUM TOPICS VERIFIED AND MASTERED! ***`,
      explanation:
        "This comprehensive capstone combines all 5 course modules: primitive types & variables, loops & control flow, functions, pointer arithmetic & heap allocation, struct data modeling, and file persistence.",
    };
  }

  // Fallback for Python / Web / JavaScript / General
  return {
    language: lang,
    code: `// ============================================================================
// SLRJ LEARN: FULL COMBINED CAPSTONE SYSTEM
// Course: ${course.title}
// Combining All Modules & Hands-on Architecture
// ============================================================================

console.log("=== SLRJ Learn Comprehensive Capstone System ===");
console.log("Course: ${course.title}");
console.log("Status: Synthesizing concepts from all ${course.modules.length} topics...");

const topics = ${JSON.stringify(course.modules.map((m) => m.title), null, 2)};

console.log("\\nActive Curriculum Topics Loaded:");
topics.forEach((topic, idx) => {
  console.log(\` [\${idx + 1}] \${topic} - Certified Integration Verified\`);
});

console.log("\\n*** ALL TOPICS COMBINED AND EXECUTED WITH FULL MASTERY! ***");`,
    output: `=== SLRJ Learn Comprehensive Capstone System ===
Course: ${course.title}
Status: Synthesizing concepts from all ${course.modules.length} topics...

Active Curriculum Topics Loaded:
${course.modules.map((m, i) => ` [${i + 1}] ${m.title} - Certified Integration Verified`).join("\n")}

*** ALL TOPICS COMBINED AND EXECUTED WITH FULL MASTERY! ***`,
    explanation: `Full capstone integration uniting all curriculum modules of ${course.title}.`,
  };
}
