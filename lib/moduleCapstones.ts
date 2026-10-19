/**
 * Module Capstones: Curated and Dynamic Main Topic Coding Challenges and Final Comprehensive Quizzes
 * Ensures every main topic (module) has a capstone coding challenge and a multi-question assessment quiz.
 */

export interface TopicCodeChallenge {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  language: string;
  starterCode: string;
  solutionCode: string;
  explanation: string;
  complexity?: {
    time: string;
    space: string;
  };
}

export interface TopicQuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface MainTopicCapstone {
  moduleId: string;
  moduleTitle: string;
  codeChallenge: TopicCodeChallenge;
  finalQuiz: TopicQuizQuestion[];
}

// Curated Capstones for popular modules
const CURATED_CAPSTONES: Record<string, Partial<MainTopicCapstone>> = {
  // C Programming - Module 1: Variables, Types & Memory
  "c-mod-1": {
    codeChallenge: {
      id: "c-cap-1-code",
      title: "Data Type Memory Inspector & Bitwise Flag System",
      description:
        "Build a C system utility that prints the exact memory footprints (in bytes) of all fundamental types using sizeof, and implements a bitwise flag registry for system permissions (READ = 1, WRITE = 2, EXECUTE = 4).",
      requirements: [
        "Include standard I/O and standard integers (<stdio.h>, <stdint.h>).",
        "Define bitmask constants using hexadecimal or bitshift (1 << 0, 1 << 1, 1 << 2).",
        "Implement a function to toggle and check permission flags using bitwise AND (&) and OR (|).",
        "Print formatting using proper specifiers (%zu for size_t, %u for unsigned ints).",
      ],
      language: "c",
      starterCode: `#include <stdio.h>
#include <stdint.h>

#define FLAG_READ    (1 << 0) // 0x01
#define FLAG_WRITE   (1 << 1) // 0x02
#define FLAG_EXEC    (1 << 2) // 0x04

// TODO: Implement permission checker
int has_permission(uint8_t current_perms, uint8_t required_flag) {
    // Return 1 if current_perms contains required_flag, otherwise 0
    return 0;
}

int main(void) {
    printf("=== C Memory Architecture Inspector ===\\n");
    // Print sizeof int, float, double, char, void*
    
    uint8_t user_perms = FLAG_READ | FLAG_WRITE;
    printf("Has READ: %d\\n", has_permission(user_perms, FLAG_READ));
    printf("Has EXEC: %d\\n", has_permission(user_perms, FLAG_EXEC));
    return 0;
}`,
      solutionCode: `#include <stdio.h>
#include <stdint.h>

#define FLAG_READ    (1 << 0) // 0x01
#define FLAG_WRITE   (1 << 1) // 0x02
#define FLAG_EXEC    (1 << 2) // 0x04

int has_permission(uint8_t current_perms, uint8_t required_flag) {
    return (current_perms & required_flag) == required_flag;
}

int main(void) {
    printf("=== C Memory Architecture Inspector ===\\n");
    printf("char:   %zu bytes\\n", sizeof(char));
    printf("int:    %zu bytes\\n", sizeof(int));
    printf("float:  %zu bytes\\n", sizeof(float));
    printf("double: %zu bytes\\n", sizeof(double));
    printf("void*:  %zu bytes\\n\\n", sizeof(void*));

    uint8_t user_perms = FLAG_READ | FLAG_WRITE;
    printf("Initial Permissions: 0x%02X\\n", user_perms);
    printf("Has READ:  %s\\n", has_permission(user_perms, FLAG_READ) ? "YES" : "NO");
    printf("Has WRITE: %s\\n", has_permission(user_perms, FLAG_WRITE) ? "YES" : "NO");
    printf("Has EXEC:  %s\\n", has_permission(user_perms, FLAG_EXEC) ? "YES" : "NO");

    // Grant EXEC
    user_perms |= FLAG_EXEC;
    printf("\\nAfter granting EXEC: 0x%02X\\n", user_perms);
    printf("Has EXEC:  %s\\n", has_permission(user_perms, FLAG_EXEC) ? "YES" : "NO");
    return 0;
}`,
      explanation:
        "Bitwise operations operate directly on binary registers with O(1) cycle latency. Combining flags with bitwise OR (|) and checking with bitwise AND (&) is the foundational pattern for Linux file permissions and kernel driver state machines.",
      complexity: { time: "O(1)", space: "O(1)" },
    },
    finalQuiz: [
      {
        id: "c-q1",
        prompt: "In modern standard C (C11/C17/C23), what does sizeof(char) evaluate to by language definition?",
        options: ["Always 1 byte", "System dependent (1 or 2)", "4 bytes", "Depends on Unicode encoding"],
        correctAnswer: 0,
        explanation: "By the ISO C specification, sizeof(char) is defined to be strictly 1 byte in all compliant implementations.",
      },
      {
        id: "c-q2",
        prompt: "Which phase of GCC compilation generates relocatable machine code files (.o or .obj)?",
        options: ["Preprocessor", "Assembler", "Linker", "Preprocessor Macro Expander"],
        correctAnswer: 1,
        explanation: "The Assembler (as) transforms assembly source (.s) into relocatable machine instructions (.o).",
      },
      {
        id: "c-q3",
        prompt: "If uint8_t mask = (1 << 3), what is its decimal and hexadecimal value?",
        options: ["3 (0x03)", "8 (0x08)", "6 (0x06)", "16 (0x10)"],
        correctAnswer: 1,
        explanation: "1 shifted left by 3 positions gives binary 00001000, which equals decimal 8 and hex 0x08.",
      },
    ],
  },

  // C Programming - Module 2: Pointers & Memory
  "c-mod-2": {
    codeChallenge: {
      id: "c-cap-2-code",
      title: "Dynamic Buffer Resizer & In-Place String Reversal",
      description:
        "Implement an in-place string reversal function using two-pointer dereferencing, and safely allocate, resize, and free a dynamic integer array using malloc, realloc, and free with proper NULL safety checks.",
      requirements: [
        "Use pointers (char* start, char* end) without allocating auxiliary string arrays.",
        "Verify all dynamic allocations against NULL to guard against out-of-memory errors.",
        "Always free() heap memory before exiting main to prevent memory leaks.",
      ],
      language: "c",
      starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void reverse_in_place(char* str) {
    if (!str) return;
    // TODO: Implement two-pointer swap
}

int main(void) {
    char greeting[] = "Architecture";
    printf("Original: %s\\n", greeting);
    reverse_in_place(greeting);
    printf("Reversed: %s\\n", greeting);
    return 0;
}`,
      solutionCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void reverse_in_place(char* str) {
    if (!str) return;
    char* start = str;
    char* end = str + strlen(str) - 1;
    while (start < end) {
        char temp = *start;
        *start = *end;
        *end = temp;
        start++;
        end--;
    }
}

int main(void) {
    char greeting[] = "Architecture";
    printf("Original: %s\\n", greeting);
    reverse_in_place(greeting);
    printf("Reversed: %s\\n\\n", greeting);

    // Dynamic array allocation
    int* buffer = (int*)malloc(3 * sizeof(int));
    if (!buffer) {
        perror("Memory allocation failed");
        return 1;
    }

    for (int i = 0; i < 3; i++) buffer[i] = (i + 1) * 10;
    printf("Buffer[1]: %d\\n", buffer[1]);

    free(buffer);
    buffer = NULL; // Prevent dangling pointer
    return 0;
}`,
      explanation:
        "In-place pointer reversal operates in O(N/2) swaps with zero heap overhead. Setting pointers to NULL after calling free() eliminates catastrophic use-after-free security vulnerabilities.",
      complexity: { time: "O(N)", space: "O(1)" },
    },
    finalQuiz: [
      {
        id: "c-q2-1",
        prompt: "What does the dereference operator (*) do when applied to a pointer variable?",
        options: [
          "Retrieves the address where the pointer is stored",
          "Accesses or modifies the value at the memory address the pointer holds",
          "Frees the memory pointed to",
          "Increments the pointer to the next memory address",
        ],
        correctAnswer: 1,
        explanation: "Dereferencing *ptr accesses or mutates the value located at the address stored in ptr.",
      },
      {
        id: "c-q2-2",
        prompt: "Why must you check the return value of malloc() before dereferencing it?",
        options: [
          "It returns -1 on failure",
          "It returns NULL if system memory is exhausted, causing a segfault if dereferenced",
          "It must be initialized with free() first",
          "It returns garbage values that must be cleared",
        ],
        correctAnswer: 1,
        explanation: "malloc returns NULL when the operating system cannot allocate memory; dereferencing NULL causes an immediate segmentation fault.",
      },
      {
        id: "c-q2-3",
        prompt: "If int arr[5] = {10, 20, 30, 40, 50}, what does *(arr + 2) evaluate to?",
        options: ["10", "20", "30", "The memory address of arr[2]"],
        correctAnswer: 2,
        explanation: "Pointer arithmetic scales by sizeof(int), so *(arr + 2) accesses arr[2], which is 30.",
      },
    ],
  },

  // HTML & CSS - Module 1: Semantic HTML & Accessibility
  "html-mod-1": {
    codeChallenge: {
      id: "html-cap-1-code",
      title: "Accessible Semantic Contact & Booking Form",
      description:
        "Build a semantic, accessible (WCAG 2.1 AA compliant) form containing an explicitly associated <label> for each input, field grouping with <fieldset> and <legend>, required attributes, and an accessible submit action.",
      requirements: [
        "Use semantic tags: <form>, <fieldset>, <legend>, <label>, <input>, <button>.",
        "Associate every <label for='id'> with its matching input id.",
        "Provide email validation and accessible error announcements.",
      ],
      language: "html",
      starterCode: `<!-- Accessible Semantic Booking Form -->
<form action="/api/submit" method="POST">
  <!-- TODO: Add fieldset, legend, labels and inputs -->
</form>`,
      solutionCode: `<form action="/api/submit" method="POST" class="booking-form" novalidate>
  <fieldset>
    <legend>Guest Information</legend>

    <div class="form-group">
      <label for="fullName">Full Name (Required)</label>
      <input type="text" id="fullName" name="fullName" required aria-required="true" autocomplete="name" />
    </div>

    <div class="form-group">
      <label for="emailAddr">Work Email Address</label>
      <input type="email" id="emailAddr" name="email" required aria-required="true" autocomplete="email" />
    </div>

    <div class="form-group">
      <label for="experienceLevel">Experience Level</label>
      <select id="experienceLevel" name="experience">
        <option value="beginner">Beginner (0-1 yr)</option>
        <option value="intermediate">Intermediate (2-4 yrs)</option>
        <option value="senior">Senior (5+ yrs)</option>
      </select>
    </div>
  </fieldset>

  <button type="submit" class="submit-btn">
    Confirm Registration
  </button>
</form>`,
      explanation:
        "Explicitly pairing <label for='...'> with input id ensures screen readers immediately announce input purpose to visually impaired users. <fieldset> and <legend> group related controls for assistive technology navigation trees.",
      complexity: { time: "O(1)", space: "O(1)" },
    },
    finalQuiz: [
      {
        id: "html-q1",
        prompt: "Which HTML5 element represents the primary landmark content unique to the current document?",
        options: ["<section>", "<main>", "<article>", "<div id='content'>"],
        correctAnswer: 1,
        explanation: "<main> designates the central, non-repeated content of the page, accessible via screen reader landmark shortcuts.",
      },
      {
        id: "html-q2",
        prompt: "Why should you never rely on placeholder text instead of an explicit <label> element?",
        options: [
          "Placeholders disappear when the user types, and screen readers do not consistently announce them as accessible names",
          "Placeholders slow down rendering speed",
          "Placeholders require CSS custom properties",
          "Search engines penalize pages with placeholders",
        ],
        correctAnswer: 0,
        explanation: "Placeholders lack persistent visibility and have poor contrast and unreliable screen-reader support.",
      },
      {
        id: "html-q3",
        prompt: "What is the primary role of the alt attribute on an <img> tag?",
        options: [
          "Specifies the tooltip shown on hover",
          "Provides a text equivalent for search engines and assistive screen readers",
          "Sets image dimensions",
          "Controls lazy loading",
        ],
        correctAnswer: 1,
        explanation: "The alt attribute provides crucial textual context for visually impaired users and when images fail to load.",
      },
    ],
  },
};

/**
 * Get or dynamically generate a Main Topic Capstone (Code Challenge + Final Quiz)
 */
export function getMainTopicCapstone(
  moduleId: string,
  moduleTitle: string,
  courseTitle: string,
  category: string
): MainTopicCapstone {
  // Check curated database
  if (CURATED_CAPSTONES[moduleId]) {
    const curated = CURATED_CAPSTONES[moduleId];
    return {
      moduleId,
      moduleTitle,
      codeChallenge: curated.codeChallenge!,
      finalQuiz: curated.finalQuiz!,
    };
  }

  // Derive programming language from course title or category
  const lowerTitle = (courseTitle + " " + moduleTitle + " " + category).toLowerCase();
  let lang = "javascript";
  if (lowerTitle.includes("python")) lang = "python";
  else if (lowerTitle.includes("c++") || lowerTitle.includes("cpp")) lang = "cpp";
  else if (lowerTitle.includes("c ") || lowerTitle.includes("c-programming")) lang = "c";
  else if (lowerTitle.includes("java") && !lowerTitle.includes("javascript")) lang = "java";
  else if (lowerTitle.includes("html") || lowerTitle.includes("css")) lang = "html";
  else if (lowerTitle.includes("sql") || lowerTitle.includes("database")) lang = "sql";
  else if (lowerTitle.includes("typescript")) lang = "typescript";

  // Dynamic Capstone Generator tailored to the module title
  return {
    moduleId,
    moduleTitle,
    codeChallenge: {
      id: `${moduleId}-cap-code`,
      title: `${moduleTitle}: Production Architecture Capstone`,
      description: `Synthesize your mastery of ${moduleTitle}. Implement a robust, modular solution that handles core business logic, input validation, and edge cases according to industry production standards.`,
      requirements: [
        `Implement the core algorithms and data structures taught in ${moduleTitle}.`,
        "Handle edge cases such as empty inputs, boundary bounds, and invalid state transitions.",
        "Structure code into clean, modular, documented functions with descriptive variable names.",
        "Ensure optimal computational efficiency and memory utilization.",
      ],
      language: lang,
      starterCode: getStarterCodeForLanguage(lang, moduleTitle),
      solutionCode: getSolutionCodeForLanguage(lang, moduleTitle),
      explanation: `This capstone solution demonstrates idiomatic ${lang.toUpperCase()} architecture for ${moduleTitle}. It guarantees optimal time complexity, encapsulates state cleanly, and handles edge conditions gracefully.`,
      complexity: { time: "O(N)", space: "O(1)" },
    },
    finalQuiz: [
      {
        id: `${moduleId}-fq1`,
        prompt: `Which principle is most essential when architecting solutions for ${moduleTitle}?`,
        options: [
          "Separation of concerns and modularity",
          "Writing all code in a single global scope",
          "Hardcoding configuration constants",
          "Avoiding error handling to maximize throughput",
        ],
        correctAnswer: 0,
        explanation:
          "Modular code with separated concerns enables unit testability, maintainability, and clean scalability.",
      },
      {
        id: `${moduleId}-fq2`,
        prompt: `What is the primary performance consideration when scaling systems in ${moduleTitle}?`,
        options: [
          "Minimizing asymptotic time complexity and redundant memory allocations",
          "Increasing the number of nested loops",
          "Relying entirely on client-side caching",
          "Omitting data validation checks",
        ],
        correctAnswer: 0,
        explanation:
          "Careful control of asymptotic time and spatial complexity prevents bottlenecks when data volume scales.",
      },
      {
        id: `${moduleId}-fq3`,
        prompt: `How should unexpected errors and exceptional states be handled in production ${moduleTitle} implementations?`,
        options: [
          "Graceful degradation with descriptive error reporting and safe fallbacks",
          "Silent suppression without logging",
          "Crashing the process immediately",
          "Ignoring status codes",
        ],
        correctAnswer: 0,
        explanation:
          "Defensive programming requires validating preconditions, logging context, and recovering or failing predictably.",
      },
    ],
  };
}

function getStarterCodeForLanguage(lang: string, topic: string): string {
  switch (lang) {
    case "python":
      return `"""
Main Topic Capstone: ${topic}
Implement the solution function below.
"""

def solve_topic_challenge(data: list) -> dict:
    # TODO: Process input, apply topic algorithms, return result dictionary
    pass

if __name__ == "__main__":
    sample_input = [10, 20, 30, 40]
    print("Testing solution:", solve_topic_challenge(sample_input))
`;
    case "c":
      return `/*
 * Main Topic Capstone: ${topic}
 */
#include <stdio.h>
#include <stdlib.h>

int process_data(int* arr, size_t len) {
    if (!arr || len == 0) return -1;
    // TODO: Implement core algorithm
    return 0;
}

int main(void) {
    int dataset[] = {12, 24, 36, 48};
    size_t n = sizeof(dataset) / sizeof(dataset[0]);
    int result = process_data(dataset, n);
    printf("Result: %d\\n", result);
    return 0;
}
`;
    case "cpp":
      return `// Main Topic Capstone: ${topic}
#include <iostream>
#include <vector>
#include <algorithm>

class TopicSystem {
public:
    void execute(const std::vector<int>& items) {
        // TODO: Process data efficiently
    }
};

int main() {
    TopicSystem sys;
    sys.execute({1, 2, 3, 4, 5});
    return 0;
}
`;
    case "java":
      return `// Main Topic Capstone: ${topic}
import java.util.*;

public class MainTopicChallenge {
    public static Map<String, Object> execute(List<Integer> inputs) {
        Map<String, Object> result = new HashMap<>();
        // TODO: Implement solution logic
        return result;
    }

    public static void main(String[] args) {
        System.out.println("Executing capstone challenge...");
    }
}
`;
    case "html":
      return `<!-- Main Topic Capstone: ${topic} -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${topic} Solution</title>
</head>
<body>
  <main>
    <!-- TODO: Implement semantic accessible architecture -->
  </main>
</body>
</html>
`;
    case "sql":
      return `-- Main Topic Capstone: ${topic}
-- Write an optimized SQL query with joins and indexing considerations

SELECT 
    id,
    title,
    created_at
FROM records
WHERE status = 'active'
ORDER BY created_at DESC;
`;
    default:
      return `/**
 * Main Topic Capstone: ${topic}
 */
export function executeTopicChallenge(inputs: any[]) {
  // TODO: Implement production solution logic
  return {
    success: true,
    processedCount: inputs.length,
    timestamp: Date.now(),
  };
}

// Test runner
console.log("Output:", executeTopicChallenge([1, 2, 3, 4]));
`;
  }
}

function getSolutionCodeForLanguage(lang: string, topic: string): string {
  switch (lang) {
    case "python":
      return `"""
Production Solution: ${topic}
"""
from typing import List, Dict, Any

def solve_topic_challenge(data: List[int]) -> Dict[str, Any]:
    if not data:
        return {"count": 0, "total": 0, "mean": 0.0}

    total = sum(data)
    mean = total / len(data)
    filtered = [x for x in data if x >= mean]

    return {
        "count": len(data),
        "total": total,
        "mean": round(mean, 2),
        "above_average": filtered,
        "status": "success"
    }

if __name__ == "__main__":
    sample = [10, 20, 30, 40, 50]
    result = solve_topic_challenge(sample)
    print("Execution Result:", result)
`;
    case "c":
      return `/*
 * Production Solution: ${topic}
 */
#include <stdio.h>
#include <stdlib.h>

int process_data(int* arr, size_t len) {
    if (!arr || len == 0) return -1;
    long long sum = 0;
    for (size_t i = 0; i < len; i++) {
        sum += arr[i];
    }
    return (int)(sum / len);
}

int main(void) {
    int dataset[] = {12, 24, 36, 48};
    size_t n = sizeof(dataset) / sizeof(dataset[0]);
    int avg = process_data(dataset, n);
    printf("Computed Average: %d\\n", avg);
    return 0;
}
`;
    case "cpp":
      return `// Production Solution: ${topic}
#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

class TopicSystem {
public:
    double computeAverage(const std::vector<int>& items) {
        if (items.empty()) return 0.0;
        double sum = std::accumulate(items.begin(), items.end(), 0.0);
        return sum / items.size();
    }
};

int main() {
    TopicSystem sys;
    std::vector<int> data = {10, 25, 40, 55, 70};
    std::cout << "Optimized Average: " << sys.computeAverage(data) << "\\n";
    return 0;
}
`;
    case "html":
      return `<!-- Production Solution: ${topic} -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${topic} Production Architecture</title>
</head>
<body>
  <header>
    <nav aria-label="Main Navigation">
      <a href="/">Home</a>
    </nav>
  </header>
  <main id="main-content">
    <article>
      <h1>${topic}</h1>
      <p>Semantic, accessible, and structured document landmark layout.</p>
    </article>
  </main>
</body>
</html>
`;
    default:
      return `/**
 * Production Solution: ${topic}
 */
export function executeTopicChallenge(inputs: number[]): {
  count: number;
  average: number;
  sorted: number[];
} {
  if (!inputs || inputs.length === 0) {
    return { count: 0, average: 0, sorted: [] };
  }

  const sum = inputs.reduce((acc, val) => acc + val, 0);
  const average = +(sum / inputs.length).toFixed(2);
  const sorted = [...inputs].sort((a, b) => a - b);

  return {
    count: inputs.length,
    average,
    sorted,
  };
}

// Execution verification
console.log(executeTopicChallenge([45, 12, 89, 34, 99]));
`;
  }
}
