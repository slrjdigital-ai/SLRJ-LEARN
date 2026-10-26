import { PlaygroundLanguage } from "./types";

export interface TestCase {
  id: string;
  name: string;
  input?: string;
  expected: string;
  description: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  language: PlaygroundLanguage;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  xp: number;
  description: string;
  instructions: string[];
  starterFiles: Record<string, string>;
  testCases: TestCase[];
  hints: string[];
  courseLink: { title: string; href: string };
  roadmapLink: { title: string; href: string };
}

export const PLAYGROUND_CHALLENGES: Record<PlaygroundLanguage, CodingChallenge[]> = {
  web: [
    {
      id: "web-counter",
      title: "Interactive Counter with Milestone Badges",
      language: "web",
      difficulty: "Beginner",
      category: "Frontend DOM",
      xp: 50,
      description: "Build an interactive counter widget that updates the count on button click and renders glowing milestone badges when reaching 5 and 10 clicks.",
      instructions: [
        "Select the button element with ID `counterBtn`.",
        "Add a click event listener that increments `count` and writes to `#val`.",
        "Update the `#badge` text to 'Awesome! 5 clicks reached!' when count hits 5.",
        "Log messages to the console for each click.",
      ],
      starterFiles: {
        "index.html": `<div class="container">
  <h1>SLRJ Learn Playground</h1>
  <p>Interactive client-side web sandbox</p>
  <button id="counterBtn" class="glow-btn">
    Clicks: <span id="val">0</span>
  </button>
  <div id="badge" class="badge">Keep clicking!</div>
</div>`,
        "style.css": `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #060B18;
  font-family: system-ui, sans-serif;
  color: #fff;
}
.container {
  text-align: center;
  background: #0F172A;
  padding: 2.5rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
}
h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #18B6D2, #38BDF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
p {
  color: #94A3B8;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}
.glow-btn {
  padding: 0.85rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 700;
  border: none;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #18B6D2, #10B981);
  color: #030712;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}
.glow-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(24, 182, 210, 0.4);
}
.badge {
  margin-top: 1.2rem;
  font-size: 0.8rem;
  color: #38BDF8;
  font-weight: 600;
}`,
        "script.js": `const btn = document.getElementById('counterBtn');
const val = document.getElementById('val');
const badge = document.getElementById('badge');

let count = 0;
btn.addEventListener('click', () => {
  count++;
  val.textContent = count;
  console.log('User clicked counter. Current count:', count);
  if (count === 5) {
    badge.textContent = 'Awesome! 5 clicks reached!';
    badge.style.color = '#10B981';
  } else if (count === 10) {
    badge.textContent = 'Milestone! 10 clicks master!';
    badge.style.color = '#F59E0B';
  }
});

console.log('SLRJ Web Sandbox initialized.');`,
      },
      testCases: [
        {
          id: "t1",
          name: "HTML Element Structure",
          expected: "Contains #counterBtn and #val elements",
          description: "Verify essential DOM button and span elements exist.",
        },
        {
          id: "t2",
          name: "Click Event Listener",
          expected: "addEventListener('click', ...) bound to button",
          description: "Verify button event listener increments count.",
        },
        {
          id: "t3",
          name: "Milestone Badge Logic",
          expected: "Badge updates on count 5 and 10",
          description: "Verify milestone text changes dynamically.",
        },
      ],
      hints: [
        "Use document.getElementById() to query DOM elements by ID.",
        "Use element.addEventListener('click', callback) to bind click handlers.",
        "Check count with if (count === 5) and update badge.textContent.",
      ],
      courseLink: { title: "Full-Stack Web Development Course", href: "/courses" },
      roadmapLink: { title: "Frontend Developer Roadmap", href: "/roadmap" },
    },
  ],

  python: [
    {
      id: "py-palindrome-anagram",
      title: "Palindrome & Frequency Analyzer",
      language: "python",
      difficulty: "Beginner",
      category: "Strings & Hash Maps",
      xp: 60,
      description: "Write an algorithm to sanitize string inputs, detect whether words/phrases are palindromes, and compute character frequencies using dictionaries.",
      instructions: [
        "Implement `is_palindrome(text)`: return True if text reads the same forwards and backwards ignoring punctuation and case.",
        "Implement `character_frequency(text)`: return a dictionary mapping each lowercase alphanumeric character to its count.",
        "Print the results for provided test cases.",
      ],
      starterFiles: {
        "main.py": `import re
from collections import Counter

def is_palindrome(s: str) -> bool:
    clean = re.sub(r'[^a-zA-Z0-9]', '', s).lower()
    return clean == clean[::-1]

def character_frequency(s: str) -> dict:
    clean = re.sub(r'[^a-zA-Z0-9]', '', s).lower()
    return dict(Counter(clean))

if __name__ == "__main__":
    phrases = ["Racecar", "A man a plan a canal Panama", "SLRJ Learn", "Level"]
    print("SLRJ Python 3.12 String Diagnostics")
    print("-----------------------------------")
    for phrase in phrases:
        pal = is_palindrome(phrase)
        print(f"Phrase: '{phrase}' -> Palindrome: {pal}")

    test_word = "Antigravity"
    print(f"\\nFrequency in '{test_word}': {character_frequency(test_word)}")
`,
      },
      testCases: [
        {
          id: "t1",
          name: "Palindrome Detection",
          expected: "Phrase: 'Racecar' -> Palindrome: True",
          description: "Detect single-word palindromes regardless of case.",
        },
        {
          id: "t2",
          name: "Punctuation & Spaces Handling",
          expected: "Phrase: 'A man a plan a canal Panama' -> Palindrome: True",
          description: "Strip spaces and punctuation before evaluating palindrome.",
        },
        {
          id: "t3",
          name: "Character Frequency Map",
          expected: "Frequency in 'Antigravity': {'a': 2, 'n': 1, 't': 2, 'i': 2, 'g': 1, 'r': 1, 'v': 1, 'y': 1}",
          description: "Accurately compute frequency counts of lowercase letters.",
        },
      ],
      hints: [
        "Use `re.sub(r'[^a-zA-Z0-9]', '', text).lower()` to keep only letters and numbers.",
        "In Python, `string[::-1]` reverses a string in O(N) time.",
        "Use `collections.Counter` to quickly count frequencies.",
      ],
      courseLink: { title: "Python Programming & DSA Course", href: "/courses" },
      roadmapLink: { title: "Python Developer Roadmap", href: "/roadmap" },
    },
  ],

  c: [
    {
      id: "c-binary-search",
      title: "Binary Search on Sorted Arrays (C17)",
      language: "c",
      difficulty: "Intermediate",
      category: "Algorithms & Pointers",
      xp: 75,
      description: "Implement binary search in C with pointer arithmetic and safe midpoint calculation to avoid 32-bit integer overflow.",
      instructions: [
        "Implement `int binary_search(const int *arr, int size, int target)`.",
        "Use `int mid = left + (right - left) / 2` to prevent overflow.",
        "Return the 0-based array index if found, or `-1` if target does not exist.",
      ],
      starterFiles: {
        "main.c": `#include <stdio.h>

int binary_search(const int *arr, int size, int target) {
    int left = 0;
    int right = size - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

int main() {
    int dataset[] = {3, 9, 14, 19, 25, 33, 42, 58, 64, 77, 89, 95};
    int size = sizeof(dataset) / sizeof(dataset[0]);
    int target = 42;
    
    printf("SLRJ C17 Systems Runtime Execution\\n");
    printf("----------------------------------\\n");
    printf("Array length: %d elements\\n", size);
    
    int index = binary_search(dataset, size, target);
    if (index != -1) {
        printf("Target %d located at array index [%d]\\n", target, index);
    } else {
        printf("Target %d was not found.\\n", target);
    }
    
    return 0;
}`,
      },
      testCases: [
        {
          id: "t1",
          name: "Middle Element Lookup",
          expected: "Target 42 located at array index [6]",
          description: "Successfully locate value 42 at index 6 in O(log N) time.",
        },
        {
          id: "t2",
          name: "Boundary Elements Check",
          expected: "Handles index 0 and index size-1",
          description: "Verify left and right boundaries evaluate correctly.",
        },
      ],
      hints: [
        "Ensure `left <= right` is used in the while loop condition.",
        "Midpoint formula: `left + (right - left) / 2` avoids integer overflow.",
        "Const pointers `const int *arr` ensure array data is not modified.",
      ],
      courseLink: { title: "C & Systems Programming Course", href: "/courses" },
      roadmapLink: { title: "Embedded & Systems Roadmap", href: "/roadmap" },
    },
  ],

  cpp: [
    {
      id: "cpp-stl-cohort",
      title: "Generic Template Vector & Sorting (C++20)",
      language: "cpp",
      difficulty: "Intermediate",
      category: "STL & Lambdas",
      xp: 75,
      description: "Sort a cohort of student records descending by score using `std::sort` with lambda comparator and compute average with `std::accumulate`.",
      instructions: [
        "Define `struct Student { std::string name; int score; };`.",
        "Sort cohort with `std::sort` using a lambda comparator.",
        "Compute class average using `std::accumulate`.",
        "Print the formatted leaderboard.",
      ],
      starterFiles: {
        "main.cpp": `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <numeric>

struct Student {
    std::string name;
    int score;
};

int main() {
    std::vector<Student> cohort = {
        {"Shahid", 96},
        {"Priya", 92},
        {"Rahul", 88},
        {"Anita", 95},
        {"David", 89}
    };
    
    std::sort(cohort.begin(), cohort.end(), [](const Student &a, const Student &b) {
        return a.score > b.score;
    });
    
    std::cout << "SLRJ C++20 Standard Template Library" << std::endl;
    std::cout << "====================================" << std::endl;
    std::cout << "Leaderboard Rank:" << std::endl;
    
    int rank = 1;
    for (const auto &student : cohort) {
        std::cout << "  #" << rank++ << " " << student.name 
                  << " - Score: " << student.score << std::endl;
    }
    
    double avg = std::accumulate(cohort.begin(), cohort.end(), 0.0,
        [](double sum, const Student &s) { return sum + s.score; }) / cohort.size();
        
    std::cout << "\\nCohort Average: " << avg << std::endl;
    return 0;
}`,
      },
      testCases: [
        {
          id: "t1",
          name: "Descending Sort by Score",
          expected: "1 Shahid (96), #2 Anita (95), #3 Priya (92)",
          description: "Verify students are ordered highest to lowest score.",
        },
        {
          id: "t2",
          name: "Accumulate Class Average",
          expected: "Cohort Average: 92",
          description: "Verify double accumulation produces exact average.",
        },
      ],
      hints: [
        "Lambda comparator: `[](const Student &a, const Student &b) { return a.score > b.score; }`.",
        "Include `<numeric>` for `std::accumulate`.",
      ],
      courseLink: { title: "C++ & Data Structures Course", href: "/courses" },
      roadmapLink: { title: "C++ Software Engineer Roadmap", href: "/roadmap" },
    },
  ],

  java: [
    {
      id: "java-streams-polymorphism",
      title: "OOP Records & Collection Streams (Java 17/21)",
      language: "java",
      difficulty: "Intermediate",
      category: "OOP & Functional Streams",
      xp: 75,
      description: "Implement Java 17 Records and Stream API to filter honor roll students with scores >= 94 and calculate class statistics.",
      instructions: [
        "Use `record Submission(String student, String codeType, int score)`.",
        "Filter submissions with score >= 94.",
        "Sort descending by score and collect to a List.",
        "Print formatted honor roll entries.",
      ],
      starterFiles: {
        "Main.java": `import java.util.*;
import java.util.stream.Collectors;

public class Main {
    record Submission(String student, String codeType, int score) {}

    public static void main(String[] args) {
        List<Submission> records = List.of(
            new Submission("Shahid", "Full-Stack Web", 98),
            new Submission("Kavya", "Python & DSA", 94),
            new Submission("Alex", "C Systems", 91),
            new Submission("Meera", "Full-Stack Web", 96)
        );

        System.out.println("SLRJ Java 17 Virtual Machine Execution");
        System.out.println("======================================");

        List<Submission> topStudents = records.stream()
            .filter(s -> s.score() >= 94)
            .sorted(Comparator.comparingInt(Submission::score).reversed())
            .collect(Collectors.toList());

        System.out.println("Top Honor Roll:");
        topStudents.forEach(s -> 
            System.out.printf("  • %-8s | %-16s | %d/100%n", s.student(), s.codeType(), s.score())
        );

        double classAvg = records.stream()
            .mapToInt(Submission::score)
            .average()
            .orElse(0.0);

        System.out.printf("%nTotal Records: %d | Class Average: %.2f%n", records.size(), classAvg);
    }
}`,
      },
      testCases: [
        {
          id: "t1",
          name: "Honor Roll Stream Filtering",
          expected: "Filters Shahid (98), Meera (96), Kavya (94)",
          description: "Excludes scores strictly below 94.",
        },
        {
          id: "t2",
          name: "Java Record Formatting",
          expected: "Total Records: 4 | Class Average: 94.75",
          description: "Verify average calculation and formatting.",
        },
      ],
      hints: [
        "Java 17 records automatically generate constructors, getters, and toString.",
        "Use `.mapToInt(Submission::score).average()` for primitive stream averages.",
      ],
      courseLink: { title: "Java Enterprise & Spring Boot Course", href: "/courses" },
      roadmapLink: { title: "Backend Java Developer Roadmap", href: "/roadmap" },
    },
  ],

  sql: [
    {
      id: "sql-student-courses",
      title: "Relational Queries & Group Aggregations",
      language: "sql",
      difficulty: "Beginner",
      category: "Relational Databases",
      xp: 50,
      description: "Create relational tables for students and course enrollments, perform inner joins, and aggregate course enrollments with COUNT and AVG.",
      instructions: [
        "Create table `students` and `courses`.",
        "Insert sample student and enrollment records.",
        "Run an aggregation query grouping by course name.",
      ],
      starterFiles: {
        "schema.sql": `-- 1. Define Students Table
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  major VARCHAR(50),
  gpa DECIMAL(3,2)
);

-- 2. Define Course Enrollments
CREATE TABLE enrollments (
  id INT PRIMARY KEY,
  student_id INT,
  course_code VARCHAR(20),
  grade VARCHAR(2)
);

-- 3. Seed Students
INSERT INTO students VALUES (1, 'Shahid', 'Computer Science', 3.92);
INSERT INTO students VALUES (2, 'Priya', 'Software Eng', 3.85);
INSERT INTO students VALUES (3, 'Rahul', 'Data Science', 3.70);
INSERT INTO students VALUES (4, 'Anita', 'Computer Science', 3.98);

-- 4. Seed Enrollments
INSERT INTO enrollments VALUES (101, 1, 'CS-101', 'A');
INSERT INTO enrollments VALUES (102, 1, 'CS-201', 'A');
INSERT INTO enrollments VALUES (103, 2, 'CS-101', 'A');
INSERT INTO enrollments VALUES (104, 3, 'DS-301', 'B');
INSERT INTO enrollments VALUES (105, 4, 'CS-101', 'A');

-- 5. Query: Top Honor Roll Students
SELECT name, major, gpa 
FROM students 
WHERE gpa >= 3.85 
ORDER BY gpa DESC;
`,
      },
      testCases: [
        {
          id: "t1",
          name: "Filtered Student Records",
          expected: "Anita (3.98), Shahid (3.92), Priya (3.85)",
          description: "Filters students where GPA >= 3.85 descending.",
        },
        {
          id: "t2",
          name: "Relational Integrity",
          expected: "Primary keys and valid foreign student_id references",
          description: "Verify SQL syntax creates valid tabular relational schemas.",
        },
      ],
      hints: [
        "Use `WHERE gpa >= 3.85` for filtering.",
        "Use `ORDER BY gpa DESC` to order from highest to lowest.",
      ],
      courseLink: { title: "SQL & Database Systems Course", href: "/courses" },
      roadmapLink: { title: "Database & Backend Roadmap", href: "/roadmap" },
    },
  ],
};
