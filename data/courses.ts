export interface PracticeExercise {
  id: string;
  type: "multiple-choice" | "code-challenge" | "fill-blank";
  prompt: string;
  codeStarter?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
  xpReward: number;
  content: string;
  codeExample?: {
    language: string;
    code: string;
    output?: string;
    explanation: string;
  };
  commonMistakes?: Array<{
    wrong: string;
    correct: string;
    reason: string;
  }>;
  keyTakeaways: string[];
  exercise: PracticeExercise;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category:
    | "Web Development"
    | "Python Programming"
    | "Java Programming"
    | "JavaScript and TypeScript"
    | "Data Structures and Algorithms"
    | "Artificial Intelligence"
    | "Machine Learning"
    | "Data Analytics"
    | "SQL and Databases"
    | "App Development"
    | "Full-Stack Development"
    | "Git and Developer Tools";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedDuration: string;
  totalLessons: number;
  totalXp: number;
  icon: string;
  color: string;
  modules: CourseModule[];
  prerequisites: string[];
  skillsGained: string[];
}

export const COURSES_DATA: Course[] = [
  // 1. Web Development
  {
    id: "course-web-dev-101",
    slug: "web-development-foundations",
    title: "Web Development Foundations: HTML5, CSS3 & JavaScript",
    shortDescription: "Build modern, responsive, accessible websites from scratch using semantic HTML5, modern CSS layouts (Flexbox & Grid), and interactive JavaScript.",
    category: "Web Development",
    difficulty: "Beginner",
    estimatedDuration: "18 Hours",
    totalLessons: 12,
    totalXp: 1200,
    icon: "🌐",
    color: "cyan",
    prerequisites: ["No prior programming experience required", "A modern web browser"],
    skillsGained: ["HTML5 Semantic Structure", "CSS3 Flexbox & Grid", "Responsive Design", "DOM Manipulation", "Event Handling"],
    modules: [
      {
        id: "mod-html-core",
        title: "Module 1: Semantic HTML5 Architecture",
        description: "Master document structure, semantic tags, forms, tables, and accessibility standards.",
        lessons: [
          {
            id: "les-html-skeleton",
            slug: "html5-document-skeleton",
            title: "HTML5 Document Skeleton & Head Metadata",
            duration: "15 min",
            xpReward: 100,
            content: `Every web page begins with an HTML document skeleton. The \`<!DOCTYPE html>\` declaration tells browsers to render in standards mode. The \`<head>\` container houses non-visible metadata like charset, viewport scale, and page titles, while the \`<body>\` contains visual elements.

Semantic HTML uses tags that explain their purpose to both browser engines and assistive screen readers, boosting SEO and accessibility.`,
            codeExample: {
              language: "html",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Web Application</title>
</head>
<body>
  <header>
    <h1>Welcome to SLRJ Learn</h1>
  </header>
  <main>
    <p>Empowering the next generation of software engineers.</p>
  </main>
</body>
</html>`,
              output: "Welcome to SLRJ Learn\nEmpowering the next generation of software engineers.",
              explanation: "The DOCTYPE declaration triggers HTML5 parsing. The viewport meta tag ensures responsive rendering across mobile and desktop devices."
            },
            commonMistakes: [
              {
                wrong: `<meta name="viewport"> omitted or hardcoded width=1024`,
                correct: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
                reason: "Without proper viewport tags, mobile mobile devices render desktop-width pages and shrink them down, ruining usability."
              }
            ],
            keyTakeaways: [
              "Always include <!DOCTYPE html> at the first line.",
              "Set <meta charset='UTF-8'> for universal character support.",
              "Use semantic tags (<header>, <main>, <footer>) instead of generic <div> containers."
            ],
            exercise: {
              id: "ex-html-1",
              type: "multiple-choice",
              prompt: "Which HTML5 tag is meant to hold the primary unique content of a document?",
              options: ["<header>", "<main>", "<aside>", "<section>"],
              correctAnswer: 1,
              explanation: "The <main> tag designates the central, non-repeating content of a web page.",
              hint: "Think about the primary content that changes between different pages on a site."
            }
          },
          {
            id: "les-html-forms",
            slug: "accessible-html5-forms",
            title: "Accessible Forms, Inputs & Client Validation",
            duration: "20 min",
            xpReward: 100,
            content: `Forms are the core input mechanism on the web. A well-constructed form connects \`<label for="id">\` explicitly with its corresponding \`<input id="id">\`. Utilizing native HTML5 validation attributes like \`required\`, \`type="email"\`, and \`pattern\` allows the browser to validate input before sending network requests.`,
            codeExample: {
              language: "html",
              code: `<form action="/api/signup" method="POST">
  <label for="user-email">Email Address</label>
  <input 
    type="email" 
    id="user-email" 
    name="email" 
    required 
    placeholder="you@domain.com"
  />
  <button type="submit">Start Learning</button>
</form>`,
              output: "[ Form with validated email field & submit button ]",
              explanation: "The 'type=email' automatically enforces valid email syntax, while 'for' links the label for screen-reader accessibility."
            },
            commonMistakes: [
              {
                wrong: `<input placeholder="Enter Email"> with no <label>`,
                correct: `<label for="email">Email</label><input id="email" type="email">`,
                reason: "Placeholders disappear when typing and screen readers cannot reliably use them as field identifiers."
              }
            ],
            keyTakeaways: [
              "Always bind <label for='...'> to <input id='...'>.",
              "Use appropriate input types: email, number, tel, date for native mobile keyboards.",
              "Leverage native 'required' and 'pattern' for immediate client feedback."
            ],
            exercise: {
              id: "ex-html-2",
              type: "code-challenge",
              prompt: "Create an accessible password input with an id of 'user-pass' that is required.",
              codeStarter: `<label for="user-pass">Password</label>\n<input type="___" id="___" required />`,
              correctAnswer: "password",
              explanation: "Setting type='password' masks characters on screen for user privacy.",
              hint: "What input type hides the characters as the user types them?"
            }
          }
        ]
      },
      {
        id: "mod-css-layouts",
        title: "Module 2: Modern CSS Layouts (Flexbox & Grid)",
        description: "Master modern layout engines, responsive media queries, and box model mechanics.",
        lessons: [
          {
            id: "les-css-flexbox",
            slug: "css-flexbox-deep-dive",
            title: "CSS Flexbox: 1-Dimensional Flow Control",
            duration: "25 min",
            xpReward: 120,
            content: `CSS Flexbox (Flexible Box Layout) simplifies alignment and space distribution along a single axis (row or column). Using \`display: flex\` turns a parent into a flex container and direct children into flex items.

Key container properties include \`justify-content\` (main axis alignment), \`align-items\` (cross axis alignment), and \`flex-wrap\`.`,
            codeExample: {
              language: "css",
              code: `.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #0d1527;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}`,
              output: "[ A responsive navbar with logo pinned left and links pinned right ]",
              explanation: "space-between pushes the first child to the left edge and the last child to the right edge with equal spacing between."
            },
            commonMistakes: [
              {
                wrong: `Using float: left and clear: both for layout columns`,
                correct: `display: flex or display: grid`,
                reason: "Floats are meant for text wrapping around images; flexbox handles structured layouts cleanly without clearfix hacks."
              }
            ],
            keyTakeaways: [
              "Flexbox controls 1D layouts along a main axis.",
              "justify-content aligns along the main axis; align-items aligns on the cross axis.",
              "Use gap instead of margin tricks between flex items."
            ],
            exercise: {
              id: "ex-flex-1",
              type: "multiple-choice",
              prompt: "Which property centers flex items along the main axis?",
              options: ["align-items: center", "justify-content: center", "text-align: center", "align-content: center"],
              correctAnswer: 1,
              explanation: "justify-content controls alignment along the main axis (horizontal by default).",
              hint: "Main axis alignment uses 'justify', cross axis uses 'align'."
            }
          }
        ]
      }
    ]
  },

  // 2. Python Programming
  {
    id: "course-python-101",
    slug: "python-programming-mastery",
    title: "Python Programming: Zero to Production",
    shortDescription: "Learn Python fundamentals, object-oriented programming, data structures, file handling, and REST API integration with real-world automation projects.",
    category: "Python Programming",
    difficulty: "Beginner",
    estimatedDuration: "20 Hours",
    totalLessons: 14,
    totalXp: 1400,
    icon: "🐍",
    color: "emerald",
    prerequisites: ["Basic computer literacy", "Curiosity to solve logic puzzles"],
    skillsGained: ["Python Syntax & Types", "Control Flow & Loops", "Functions & Scope", "OOP & Classes", "File I/O & JSON APIs"],
    modules: [
      {
        id: "mod-py-basics",
        title: "Module 1: Python Fundamentals & Data Types",
        description: "Variables, dynamic typing, arithmetic, strings, and standard inputs.",
        lessons: [
          {
            id: "les-py-vars",
            slug: "variables-and-data-types",
            title: "Variables, Dynamic Typing & F-Strings",
            duration: "20 min",
            xpReward: 100,
            content: `Python is a high-level, dynamically typed language. You do not need to declare variable types explicitly—Python infers them at runtime.

Modern Python uses formatted string literals (f-strings) for fast, clean string interpolation.`,
            codeExample: {
              language: "python",
              code: `# Variables & Dynamic Typing
student_name = "Kouluri"
enrolled_courses = 4
is_active = True
gpa = 3.92

# Clean F-String Formatting
profile_summary = f"Student: {student_name} | Active: {is_active} | GPA: {gpa:.2f}"
print(profile_summary)`,
              output: "Student: Kouluri | Active: True | GPA: 3.92",
              explanation: "F-strings allow embedding Python expressions directly inside string literals by prefixing with 'f'."
            },
            commonMistakes: [
              {
                wrong: `print("Age: " + 21)`,
                correct: `print(f"Age: {21}") or print("Age: " + str(21))`,
                reason: "Python is strongly typed and will raise TypeError if you try to concatenate strings with integers directly."
              }
            ],
            keyTakeaways: [
              "Python handles type allocation automatically.",
              "Use f-strings (f'Hello {name}') for readability and performance.",
              "Check variable types using type(var)."
            ],
            exercise: {
              id: "ex-py-1",
              type: "multiple-choice",
              prompt: "What is the output of type(42.0) in Python?",
              options: ["<class 'int'>", "<class 'float'>", "<class 'number'>", "<class 'double'>"],
              correctAnswer: 1,
              explanation: "Numbers with decimal points are represented as 'float' in Python.",
              hint: "Python represents decimals as floating-point numbers."
            }
          }
        ]
      }
    ]
  },

  // 3. JavaScript and TypeScript
  {
    id: "course-js-ts-101",
    slug: "modern-javascript-typescript",
    title: "Modern JavaScript & TypeScript Architecture",
    shortDescription: "Master modern ES6+, async/await, closures, prototypes, TypeScript type systems, interfaces, and design patterns for building scalable applications.",
    category: "JavaScript and TypeScript",
    difficulty: "Intermediate",
    estimatedDuration: "24 Hours",
    totalLessons: 16,
    totalXp: 1600,
    icon: "⚡",
    color: "amber",
    prerequisites: ["Basic HTML & CSS knowledge"],
    skillsGained: ["ES6+ Features", "Async/Await & Promises", "TypeScript Generics & Types", "Functional Programming", "Module Bundling"],
    modules: [
      {
        id: "mod-js-async",
        title: "Module 1: Asynchronous Programming & Promises",
        description: "Event Loop, Callbacks, Promises, and modern Async/Await.",
        lessons: [
          {
            id: "les-js-promises",
            slug: "promises-and-async-await",
            title: "Promises, Microtasks & Async/Await",
            duration: "30 min",
            xpReward: 150,
            content: `JavaScript is single-threaded and non-blocking, managed by the Event Loop. When fetching remote data or reading files, operations run asynchronously.

Promises represent a value that may be available now, later, or never. \`async/await\` provides synchronous-looking syntax on top of Promises for cleaner error handling with \`try/catch\`.`,
            codeExample: {
              language: "javascript",
              code: `async function fetchStudentProfile(userId) {
  try {
    const response = await fetch(\`https://api.slrjlearn.in/students/\${userId}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load profile:", error.message);
    return null;
  }
}`,
              output: "[ Object containing student record or error fallback ]",
              explanation: "The 'await' keyword pauses execution inside the async function until the Promise resolves without blocking the browser thread."
            },
            commonMistakes: [
              {
                wrong: `const data = fetch('/api/user').json();`,
                correct: `const res = await fetch('/api/user'); const data = await res.json();`,
                reason: "Both fetch and res.json() return Promises; attempting synchronous access returns unresolved Promise objects."
              }
            ],
            keyTakeaways: [
              "Always wrap async/await calls in try...catch blocks.",
              "Promises have three states: Pending, Fulfilled, Rejected.",
              "Use Promise.all([p1, p2]) to fetch independent resources concurrently."
            ],
            exercise: {
              id: "ex-js-1",
              type: "multiple-choice",
              prompt: "What does an async function always return?",
              options: ["A boolean", "A callback", "A Promise", "Undefined"],
              correctAnswer: 2,
              explanation: "Any function marked with 'async' automatically wraps its return value in a Promise.",
              hint: "Async functions wrap their results so callers can 'await' them."
            }
          }
        ]
      }
    ]
  },

  // 4. Data Structures and Algorithms
  {
    id: "course-dsa-101",
    slug: "data-structures-and-algorithms",
    title: "Data Structures & Algorithms for Coding Interviews",
    shortDescription: "Master Big-O analysis, dynamic arrays, linked lists, hash maps, binary trees, heaps, graphs, two pointers, sliding windows, and dynamic programming.",
    category: "Data Structures and Algorithms",
    difficulty: "Intermediate",
    estimatedDuration: "30 Hours",
    totalLessons: 20,
    totalXp: 2000,
    icon: "🧩",
    color: "purple",
    prerequisites: ["Comfortable in any language: Python, JavaScript, Java, or C++"],
    skillsGained: ["Asymptotic Time & Space Complexity", "Hash Map Optimization", "Tree & Graph Traversals", "Sliding Window Patterns", "Dynamic Programming"],
    modules: [
      {
        id: "mod-dsa-complexity",
        title: "Module 1: Big-O Asymptotic Analysis",
        description: "Analyze time and space complexity to write optimized code.",
        lessons: [
          {
            id: "les-big-o",
            slug: "big-o-notation-analysis",
            title: "Understanding Big-O Time & Space Complexity",
            duration: "25 min",
            xpReward: 120,
            content: `Big-O notation describes the limiting behavior of a function when the argument tends towards a particular value or infinity. It allows us to evaluate algorithm efficiency regardless of hardware differences.

Common complexities: O(1) Constant, O(log N) Logarithmic, O(N) Linear, O(N log N) Linearithmic, O(N²) Quadratic.`,
            codeExample: {
              language: "typescript",
              code: `// O(1) Constant Time Lookup
function hasUser(userSet: Set<string>, id: string): boolean {
  return userSet.has(id); // Average O(1)
}

// O(N) Linear Time Search
function findItem(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
              output: "hasUser -> O(1), findItem -> O(N)",
              explanation: "Hash sets provide instant O(1) lookups via hashing functions, whereas linear arrays require scanning through N elements."
            },
            commonMistakes: [
              {
                wrong: `Using nested loops over an array for pairs without considering Hash Maps`,
                correct: `Store complements in a Hash Map for O(N) single-pass lookup`,
                reason: "Nested loops cause O(N²) quadratic time, leading to timeouts on large datasets (e.g. LeetCode Two Sum)."
              }
            ],
            keyTakeaways: [
              "Drop non-dominant terms and constants (e.g. 2N + 5 becomes O(N)).",
              "Trade space for time: Hash maps reduce O(N²) algorithms to O(N).",
              "Always analyze both worst-case and average-case complexity."
            ],
            exercise: {
              id: "ex-dsa-1",
              type: "multiple-choice",
              prompt: "What is the time complexity of searching in a balanced Binary Search Tree?",
              options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
              correctAnswer: 1,
              explanation: "In a balanced BST, each step divides the search space in half, resulting in O(log N) time.",
              hint: "Halving the search space repeatedly produces logarithmic complexity."
            }
          }
        ]
      }
    ]
  },

  // 5. Artificial Intelligence & Machine Learning
  {
    id: "course-ai-ml-101",
    slug: "ai-machine-learning-engineering",
    title: "Artificial Intelligence & LLM Application Engineering",
    shortDescription: "Build modern AI systems: prompt engineering, RAG (Retrieval-Augmented Generation), vector embeddings, LangChain, and fine-tuning open-source models.",
    category: "Artificial Intelligence",
    difficulty: "Advanced",
    estimatedDuration: "25 Hours",
    totalLessons: 15,
    totalXp: 1800,
    icon: "🤖",
    color: "pink",
    prerequisites: ["Python fundamentals", "Basic understanding of REST APIs"],
    skillsGained: ["Vector Databases & Embeddings", "RAG Pipeline Architecture", "Prompt Engineering", "OpenAI / Claude API Integration", "Agent Workflows"],
    modules: [
      {
        id: "mod-ai-rag",
        title: "Module 1: Retrieval-Augmented Generation (RAG)",
        description: "Connect LLMs to private documentation using embeddings and vector search.",
        lessons: [
          {
            id: "les-rag-architecture",
            slug: "rag-architecture-and-embeddings",
            title: "Vector Embeddings & Semantic Search Pipelines",
            duration: "30 min",
            xpReward: 150,
            content: `LLMs have knowledge cutoffs and can hallucinate when asked about domain-specific data. Retrieval-Augmented Generation (RAG) resolves this by converting documents into vector embeddings (mathematical high-dimensional arrays).

When a user asks a query, the system generates an embedding, performs cosine similarity search in a vector database, and passes the most relevant snippets to the LLM prompt as context.`,
            codeExample: {
              language: "python",
              code: `import numpy as np

def cosine_similarity(v1, v2):
    """Computes similarity between two vector embeddings."""
    dot_product = np.dot(v1, v2)
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)
    return dot_product / (norm_v1 * norm_v2)

# Vector representations of documents and queries
query_vector = np.array([0.15, 0.82, -0.31])
doc_vector = np.array([0.18, 0.79, -0.28])

similarity = cosine_similarity(query_vector, doc_vector)
print(f"Semantic Match Score: {similarity:.4f}")`,
              output: "Semantic Match Score: 0.9984",
              explanation: "A cosine similarity close to 1.0 indicates that the document is highly semantically relevant to the user's query."
            },
            commonMistakes: [
              {
                wrong: `Passing entire multi-megabyte PDFs into the prompt window`,
                correct: `Chunking text into 500-1000 token segments with vector retrieval`,
                reason: "Sending massive documents blows out token limits, increases API latency, and degrades response accuracy."
              }
            ],
            keyTakeaways: [
              "Embeddings capture semantic meaning as multi-dimensional coordinates.",
              "Cosine similarity identifies contextually related documents.",
              "RAG provides grounded, citeable answers without retraining large models."
            ],
            exercise: {
              id: "ex-ai-1",
              type: "multiple-choice",
              prompt: "What does RAG stand for in modern AI architecture?",
              options: [
                "Randomized Automated Generation",
                "Retrieval-Augmented Generation",
                "Recursive Artificial Gradient",
                "Realtime Augmented Guidance"
              ],
              correctAnswer: 1,
              explanation: "RAG stands for Retrieval-Augmented Generation.",
              hint: "It retrieves external context to augment the generated answer."
            }
          }
        ]
      }
    ]
  },

  // 6. SQL & Databases
  {
    id: "course-sql-101",
    slug: "sql-and-relational-databases",
    title: "SQL & Relational Database Design",
    shortDescription: "Master PostgreSQL, relational schemas, ACID transactions, complex JOINs, indexing strategies, normalization, and query performance optimization.",
    category: "SQL and Databases",
    difficulty: "Beginner",
    estimatedDuration: "16 Hours",
    totalLessons: 10,
    totalXp: 1000,
    icon: "🗄️",
    color: "indigo",
    prerequisites: ["Basic logic understanding"],
    skillsGained: ["Relational Database Modeling", "Complex SQL Queries & Subqueries", "Inner & Outer JOINs", "B-Tree Indexing", "ACID Transactions"],
    modules: [
      {
        id: "mod-sql-queries",
        title: "Module 1: Relational Schema & Advanced Queries",
        description: "Design normalized schemas and write performant SQL queries.",
        lessons: [
          {
            id: "les-sql-joins",
            slug: "sql-joins-and-aggregations",
            title: "Mastering INNER, LEFT, and FULL JOINs",
            duration: "25 min",
            xpReward: 100,
            content: `Relational databases organize information across normalized tables linked by Primary Keys and Foreign Keys. JOIN clauses synthesize this distributed data back into cohesive query results.

INNER JOIN returns records with matching values in both tables, whereas LEFT JOIN preserves all records from the left table regardless of right-table matches.`,
            codeExample: {
              language: "sql",
              code: `-- Retrieve student details along with their enrolled course count
SELECT 
  u.id, 
  u.name, 
  u.email, 
  COUNT(e.course_id) AS total_enrolled
FROM users u
LEFT JOIN enrollments e ON u.id = e.user_id
GROUP BY u.id, u.name, u.email
HAVING COUNT(e.course_id) > 0
ORDER BY total_enrolled DESC;`,
              output: "[ Query plan executing hash aggregate over indexed foreign keys ]",
              explanation: "The LEFT JOIN ensures students with zero enrollments are counted accurately, while GROUP BY aggregates counts per student."
            },
            commonMistakes: [
              {
                wrong: `Using WHERE instead of HAVING to filter aggregate results like COUNT(*) > 2`,
                correct: `HAVING COUNT(*) > 2`,
                reason: "WHERE filters rows before aggregation occurs; HAVING filters group results after aggregation."
              }
            ],
            keyTakeaways: [
              "Always define Foreign Keys with ON DELETE CASCADE or RESTRICT.",
              "Add indexes to columns frequently used in JOIN and WHERE conditions.",
              "Use EXPLAIN ANALYZE to verify query execution plans."
            ],
            exercise: {
              id: "ex-sql-1",
              type: "multiple-choice",
              prompt: "Which JOIN returns all rows from the left table even if there is no match in the right table?",
              options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"],
              correctAnswer: 1,
              explanation: "LEFT JOIN retains all rows from the left table, filling missing right-side columns with NULL.",
              hint: "The name indicates which side of the relationship is preserved."
            }
          }
        ]
      }
    ]
  }
];

export const LEARNING_CATEGORIES = [
  {
    title: "Web Development",
    shortDescription: "Build dynamic websites & web applications with HTML5, CSS3, modern JavaScript, and responsive design frameworks.",
    difficulty: "Beginner to Pro",
    icon: "🌐",
    slug: "web-development-foundations",
    badge: "Most Popular",
    color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400"
  },
  {
    title: "Python Programming",
    shortDescription: "Master Python syntax, object-oriented design, data manipulation, file systems, and production automation scripting.",
    difficulty: "Beginner Friendly",
    icon: "🐍",
    slug: "python-programming-mastery",
    badge: "Core Language",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400"
  },
  {
    title: "Java Programming",
    shortDescription: "Enterprise backend development, strict object-oriented programming, Spring Boot, multithreading, and memory management.",
    difficulty: "Intermediate",
    icon: "☕",
    slug: "java-enterprise-programming",
    badge: "Enterprise",
    color: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-400"
  },
  {
    title: "JavaScript and TypeScript",
    shortDescription: "The language of the web. Asynchronous event loops, closures, functional patterns, and strict TypeScript types.",
    difficulty: "Intermediate",
    icon: "⚡",
    slug: "modern-javascript-typescript",
    badge: "Industry Standard",
    color: "from-yellow-500/20 to-amber-500/10 border-yellow-500/30 text-yellow-400"
  },
  {
    title: "Data Structures and Algorithms",
    shortDescription: "Ace technical coding interviews: Arrays, Linked Lists, Trees, Graphs, Sorting, Dynamic Programming, and Big-O analysis.",
    difficulty: "Intermediate to Advanced",
    icon: "🧩",
    slug: "data-structures-and-algorithms",
    badge: "Interview Ready",
    color: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400"
  },
  {
    title: "Artificial Intelligence",
    shortDescription: "Prompt engineering, RAG pipelines, Vector embeddings, LLM agent workflows, LangChain, and OpenAI/Claude APIs.",
    difficulty: "Advanced",
    icon: "🤖",
    slug: "ai-machine-learning-engineering",
    badge: "Cutting-Edge",
    color: "from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-400"
  },
  {
    title: "Machine Learning",
    shortDescription: "Supervised and unsupervised learning, Scikit-Learn, TensorFlow, feature engineering, and neural network architectures.",
    difficulty: "Advanced",
    icon: "🧠",
    slug: "ai-machine-learning-engineering",
    badge: "Data Science",
    color: "from-fuchsia-500/20 to-purple-500/10 border-fuchsia-500/30 text-fuchsia-400"
  },
  {
    title: "Data Analytics",
    shortDescription: "Turn raw datasets into actionable insights using Pandas, NumPy, SQL, data visualization, and exploratory analysis.",
    difficulty: "Beginner",
    icon: "📊",
    slug: "python-programming-mastery",
    badge: "High Growth",
    color: "from-lime-500/20 to-emerald-500/10 border-lime-500/30 text-lime-400"
  },
  {
    title: "SQL and Databases",
    shortDescription: "Design scalable relational databases, write complex queries, optimize indexes, and understand ACID transaction guarantees.",
    difficulty: "Beginner to Intermediate",
    icon: "🗄️",
    slug: "sql-and-relational-databases",
    badge: "Backend Core",
    color: "from-indigo-500/20 to-violet-500/10 border-indigo-500/30 text-indigo-400"
  },
  {
    title: "App Development",
    shortDescription: "Build cross-platform iOS and Android mobile apps using React Native, native device APIs, and performant state management.",
    difficulty: "Intermediate",
    icon: "📱",
    slug: "modern-javascript-typescript",
    badge: "Mobile Apps",
    color: "from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-sky-400"
  },
  {
    title: "Full-Stack Development",
    shortDescription: "Connect frontend React/Next.js client applications with Node.js/Python server APIs, auth systems, and cloud deployments.",
    difficulty: "Comprehensive",
    icon: "🚀",
    slug: "web-development-foundations",
    badge: "Career Track",
    color: "from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-400"
  },
  {
    title: "Git and Developer Tools",
    shortDescription: "Master version control, branch management, pull request workflows, merge conflict resolution, and CI/CD pipelines.",
    difficulty: "Essential",
    icon: "🐙",
    slug: "web-development-foundations",
    badge: "Every Developer",
    color: "from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400"
  }
];

export function getAllCourses(): Course[] {
  return COURSES_DATA;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES_DATA.find((c) => c.slug === slug);
}
