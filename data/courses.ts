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

export interface PdfLesson {
  id: string;
  title: string;
  description: string;
  moduleTitle: string;
  fileUrl: string;
  fileSizeBytes?: number;
  fileSize: string;
  pageCount: number;
  displayOrder: number;
  downloadAllowed: boolean;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnailUrl: string;
  category:
    | "Web Development"
    | "Programming"
    | "Mobile Development"
    | "Artificial Intelligence"
    | "Data Science"
    | "UI/UX Design"
    | "Cybersecurity"
    | "Career Development"
    | string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedDuration: string;
  estimatedDurationMinutes: number;
  totalLessons: number;
  totalXp: number;
  icon: string;
  color: string;
  skills: string[];
  skillsGained: string[];
  prerequisites: string[];
  accessType: "Free" | "Premium";
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  modules: CourseModule[];
  pdfLessons: PdfLesson[];
}

export const COURSES_DATA: Course[] = [
  // 1. Web Development Foundations (Featured)
  {
    id: "course-web-dev-101",
    slug: "web-development-foundations",
    title: "Web Development Foundations: HTML5, CSS3 & JavaScript",
    description: "Build modern, responsive, accessible websites from scratch using semantic HTML5, modern CSS layouts (Flexbox & Grid), and interactive JavaScript.",
    shortDescription: "Build modern, responsive, accessible websites from scratch using semantic HTML5, modern CSS layouts (Flexbox & Grid), and interactive JavaScript.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Web Development",
    difficulty: "Beginner",
    estimatedDuration: "18 Hours",
    estimatedDurationMinutes: 1080,
    totalLessons: 12,
    totalXp: 1200,
    icon: "🌐",
    color: "cyan",
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    skills: ["HTML5 Semantics", "CSS3 Flexbox & Grid", "Responsive Design", "DOM Manipulation", "JavaScript ES6"],
    skillsGained: ["HTML5 Semantic Structure", "CSS3 Flexbox & Grid", "Responsive Design", "DOM Manipulation", "Event Handling"],
    prerequisites: ["No prior programming experience required", "A modern web browser"],
    pdfLessons: [
      {
        id: "pdf-web-fund",
        title: "Web Fundamentals & Internet Architecture",
        description: "DNS resolution, TCP 3-way handshake, HTTP/HTTPS protocols, and critical rendering path.",
        moduleTitle: "Module 1: Internet Architecture",
        fileUrl: "/pdfs/web-fundamentals-complete-handbook.pdf",
        fileSizeBytes: 5599,
        fileSize: "5.6 KB",
        pageCount: 8,
        displayOrder: 1,
        downloadAllowed: true,
      },
      {
        id: "pdf-html5-notes",
        title: "HTML5 Handwritten Master Reference",
        description: "Comprehensive 40-topic handwritten notes covering document structure, accessible forms, audio/video, and SEO.",
        moduleTitle: "Module 2: Semantic HTML5",
        fileUrl: "/pdfs/html5-complete-notes.pdf",
        fileSizeBytes: 4848417,
        fileSize: "4.7 MB",
        pageCount: 27,
        displayOrder: 2,
        downloadAllowed: true,
      },
      {
        id: "pdf-css-flexbox",
        title: "CSS3 Flexbox & CSS Grid Visual Cheatsheet",
        description: "Visual alignment, auto-fit/auto-fill grid patterns, and modern responsive mobile breakpoints.",
        moduleTitle: "Module 3: Modern CSS Layouts",
        fileUrl: "/pdfs/css-flexbox-grid-cheatsheet.pdf",
        fileSizeBytes: 5498,
        fileSize: "5.5 KB",
        pageCount: 6,
        displayOrder: 3,
        downloadAllowed: true,
      },
      {
        id: "pdf-js-guide",
        title: "Modern JavaScript (ES6+) Core Guide",
        description: "Closures, promises, arrow functions, DOM event delegation, and asynchronous fetch APIs.",
        moduleTitle: "Module 4: Client-Side Scripting",
        fileUrl: "/pdfs/javascript-modern-guide.pdf",
        fileSizeBytes: 5695,
        fileSize: "5.7 KB",
        pageCount: 10,
        displayOrder: 4,
        downloadAllowed: true,
      },
    ],
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
              explanation: "The DOCTYPE declaration triggers HTML5 parsing. The viewport meta tag ensures responsive rendering across mobile and desktop devices.",
            },
            commonMistakes: [
              {
                wrong: `<meta name="viewport"> omitted or hardcoded width=1024`,
                correct: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
                reason: "Without proper viewport tags, mobile devices render desktop-width pages and shrink them down, ruining usability.",
              },
            ],
            keyTakeaways: [
              "Always include <!DOCTYPE html> at the first line.",
              "Set <meta charset='UTF-8'> for universal character support.",
              "Use semantic tags (<header>, <main>, <footer>) instead of generic <div> containers.",
            ],
            exercise: {
              id: "ex-html-1",
              type: "multiple-choice",
              prompt: "Which HTML5 tag is meant to hold the primary unique content of a document?",
              options: ["<header>", "<main>", "<aside>", "<section>"],
              correctAnswer: 1,
              explanation: "The <main> tag designates the central, non-repeating content of a web page.",
              hint: "Think about which tag represents the main body of the document.",
            },
          },
          {
            id: "les-html-forms",
            slug: "accessible-html5-forms",
            title: "Accessible Forms, Validations & Inputs",
            duration: "20 min",
            xpReward: 100,
            content: `HTML forms capture user data securely and accessibly. Every input must have an associated \`<label for="id">\` to ensure screen readers announce input purposes correctly. Built-in HTML5 validation attributes like \`required\`, \`pattern\`, and \`type="email"\` catch invalid submissions before network roundtrips.`,
            codeExample: {
              language: "html",
              code: `<form action="/api/submit" method="POST">
  <div>
    <label for="learner-email">Email Address:</label>
    <input type="email" id="learner-email" name="email" required placeholder="you@domain.com">
  </div>
  <button type="submit">Enroll Now</button>
</form>`,
              output: "[ Form ready for accessible user input ]",
              explanation: "The explicit label-for binding connects assistive technologies directly to the input field.",
            },
            keyTakeaways: [
              "Always connect input fields with <label for='...'> tags.",
              "Use specific input types (email, tel, number) to activate appropriate mobile keyboards.",
            ],
            exercise: {
              id: "ex-html-2",
              type: "multiple-choice",
              prompt: "Why should an <input> always be linked to a <label> with the 'for' attribute?",
              options: [
                "It makes the page render faster",
                "It ensures screen readers pair the description with the input",
                "It automatically encrypts input data",
                "It styles the input with rounded corners"
              ],
              correctAnswer: 1,
              explanation: "The 'for' attribute ties labels to inputs for assistive technology.",
              hint: "Consider how visually impaired users navigate inputs.",
            },
          },
        ],
      },
    ],
  },

  // 2. Python Programming Mastery (Featured)
  {
    id: "course-python-101",
    slug: "python-programming-mastery",
    title: "Python Programming: Zero to Production",
    description: "Master Python programming from core data structures to object-oriented architecture, functional paradigms, automated scripting, and production backend development.",
    shortDescription: "Master Python programming from core data structures to object-oriented architecture, functional paradigms, automated scripting, and production backend development.",
    thumbnailUrl: "/course-python.jpg",
    category: "Programming",
    difficulty: "Beginner",
    estimatedDuration: "20 Hours",
    estimatedDurationMinutes: 1200,
    totalLessons: 14,
    totalXp: 1400,
    icon: "🐍",
    color: "emerald",
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-10-14T00:00:00Z",
    skills: ["Python 3.12+", "Data Structures", "OOP & Classes", "REST APIs", "Error Handling", "File I/O"],
    skillsGained: ["Python 3.12 Syntax", "Object-Oriented Design", "File I/O and JSON", "Decorators & Generators", "Virtual Environments"],
    prerequisites: ["Curiosity to learn programming logic", "A computer capable of running Python 3"],
    pdfLessons: [
      {
        id: "pdf-py-syntax",
        title: "Python Core Syntax & Computational Thinking",
        description: "Variables, immutable vs mutable types, list comprehensions, dictionary operations, and generator expressions.",
        moduleTitle: "Module 1: Language Foundations",
        fileUrl: "/pdfs/python-ai-essentials.pdf",
        fileSizeBytes: 5540,
        fileSize: "5.5 KB",
        pageCount: 10,
        displayOrder: 1,
        downloadAllowed: true,
      },
      {
        id: "pdf-py-apis",
        title: "Building RESTful APIs & Backend Architecture with Python",
        description: "HTTP endpoints, JSON request parsing, database connectors, and JWT authorization.",
        moduleTitle: "Module 2: Production Web Services",
        fileUrl: "/pdfs/rest-apis-backend-handbook.pdf",
        fileSizeBytes: 6241,
        fileSize: "6.2 KB",
        pageCount: 12,
        displayOrder: 2,
        downloadAllowed: true,
      },
    ],
    modules: [
      {
        id: "mod-py-core",
        title: "Module 1: Language Fundamentals & Memory Model",
        description: "Understand variables, memory pointers, type mutability, and flow control.",
        lessons: [
          {
            id: "les-py-vars",
            slug: "variables-and-data-types",
            title: "Variables, Dynamic Typing & Mutability",
            duration: "20 min",
            xpReward: 100,
            content: `Python is dynamically yet strongly typed. Everything in Python is an object, and variables are references pointing to memory addresses. Understanding the difference between mutable objects (lists, dictionaries, sets) and immutable objects (integers, strings, tuples) is crucial to avoid unintended side effects.`,
            codeExample: {
              language: "python",
              code: `# Demonstrating object mutability vs immutability
numbers = [1, 2, 3]
alias = numbers  # alias points to the exact same list in memory
alias.append(4)

print(f"Original: {numbers}")  # [1, 2, 3, 4]
print(f"Memory ID Match: {id(numbers) == id(alias)}")  # True`,
              output: "Original: [1, 2, 3, 4]\nMemory ID Match: True",
              explanation: "Modifying mutable collections through one reference impacts all aliases pointing to that same heap address.",
            },
            commonMistakes: [
              {
                wrong: `def add_item(item, list_target=[]): list_target.append(item)`,
                correct: `def add_item(item, list_target=None): if list_target is None: list_target = []`,
                reason: "Default arguments are evaluated once at function definition time, making default mutable lists persistent across calls.",
              },
            ],
            keyTakeaways: [
              "Variables are references pointing to objects in memory.",
              "Lists, dictionaries, and sets are mutable; tuples, strings, and numbers are immutable.",
            ],
            exercise: {
              id: "ex-py-1",
              type: "multiple-choice",
              prompt: "Which of the following data structures in Python is immutable?",
              options: ["List", "Dictionary", "Tuple", "Set"],
              correctAnswer: 2,
              explanation: "Tuples cannot be altered after creation, making them immutable.",
              hint: "Think about which collection uses parentheses and cannot append elements.",
            },
          },
        ],
      },
    ],
  },

  // 3. Modern JavaScript & TypeScript (Featured)
  {
    id: "course-js-ts-101",
    slug: "modern-javascript-typescript",
    title: "Modern JavaScript & TypeScript Enterprise",
    description: "Deep dive into the modern JavaScript runtime, asynchronous event loops, closures, functional patterns, and type-safe TypeScript architectures.",
    shortDescription: "Deep dive into the modern JavaScript runtime, asynchronous event loops, closures, functional patterns, and type-safe TypeScript architectures.",
    thumbnailUrl: "/course-js-ts.jpg",
    category: "Programming",
    difficulty: "Intermediate",
    estimatedDuration: "16 Hours",
    estimatedDurationMinutes: 960,
    totalLessons: 10,
    totalXp: 1000,
    icon: "⚡",
    color: "amber",
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-02-01T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    skills: ["TypeScript 5+", "Async / Await", "Closures & Prototypes", "Generics", "Module Systems"],
    skillsGained: ["Type Guards and Unions", "Generics and Utility Types", "Event Loop Mechanics", "Promise Chaining", "Strict Null Checks"],
    prerequisites: ["Basic familiarity with programming concepts"],
    pdfLessons: [
      {
        id: "pdf-js-modern",
        title: "Modern JavaScript & Async Architecture Guide",
        description: "Event loop microtask/macrotask queues, prototype chains, and closures in production codebases.",
        moduleTitle: "Module 1: JavaScript Engine Internals",
        fileUrl: "/pdfs/javascript-modern-guide.pdf",
        fileSizeBytes: 5695,
        fileSize: "5.7 KB",
        pageCount: 10,
        displayOrder: 1,
        downloadAllowed: true,
      },
      {
        id: "pdf-git-workflow",
        title: "Git & GitHub Essential Workflow Guide",
        description: "Branching strategies, pull requests, semantic commit conventions, and team conflict resolution.",
        moduleTitle: "Module 2: Enterprise Team Collaboration",
        fileUrl: "/pdfs/git-github-essential-workflow.pdf",
        fileSizeBytes: 5737,
        fileSize: "5.7 KB",
        pageCount: 8,
        displayOrder: 2,
        downloadAllowed: true,
      },
    ],
    modules: [
      {
        id: "mod-js-async",
        title: "Module 1: Asynchronous Engine & Microtasks",
        description: "Master promises, async/await, call stack execution, and event loop priority.",
        lessons: [
          {
            id: "les-js-promises",
            slug: "promises-and-async-await",
            title: "Promises, Async/Await & Microtask Queue",
            duration: "20 min",
            xpReward: 100,
            content: `The JavaScript engine executes synchronous code on a single call stack. Asynchronous operations return Promises representing eventual completion or failure. Microtasks (like Promise callbacks) take precedence over Macrotasks (like \`setTimeout\`), executing immediately after the current call stack clears.`,
            codeExample: {
              language: "typescript",
              code: `async function fetchLearnerStats(learnerId: string): Promise<{ xp: number }> {
  try {
    const res = await fetch(\`/api/learners/\${learnerId}\`);
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (err) {
    console.error("Failed to load statistics:", err);
    return { xp: 0 };
  }
}`,
              output: "[ Promise resolving to typed learner stats ]",
              explanation: "async/await flattens asynchronous promises into readable sequential syntax with standardized try/catch error handling.",
            },
            keyTakeaways: [
              "Async functions always return a Promise.",
              "Promise microtasks run before setTimeout macrotasks.",
              "Always wrap async network requests in try/catch blocks.",
            ],
            exercise: {
              id: "ex-js-1",
              type: "multiple-choice",
              prompt: "Which takes priority in the JavaScript event loop when the call stack clears?",
              options: ["Microtask queue (Promises)", "Macrotask queue (setTimeout)", "requestIdleCallback", "Garbage collection"],
              correctAnswer: 0,
              explanation: "Promise microtasks are flushed immediately before any macrotask runs.",
              hint: "Promises run at higher priority than timer callbacks.",
            },
          },
        ],
      },
    ],
  },

  // 4. Next.js 15 & React Full-Stack Architecture
  {
    id: "course-nextjs-101",
    slug: "nextjs-react-fullstack",
    title: "Next.js 15 & React Full-Stack Architecture",
    description: "Build cutting-edge full-stack web applications using Next.js 15 App Router, React 19 Server Components, Server Actions, streaming SSR, and edge deployment.",
    shortDescription: "Build cutting-edge full-stack web applications using Next.js 15 App Router, React 19 Server Components, Server Actions, streaming SSR, and edge deployment.",
    thumbnailUrl: "/course-nextjs.jpg",
    category: "Web Development",
    difficulty: "Advanced",
    estimatedDuration: "24 Hours",
    estimatedDurationMinutes: 1440,
    totalLessons: 16,
    totalXp: 1600,
    icon: "⚛️",
    color: "blue",
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-01T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    skills: ["Next.js 15", "React Server Components", "Server Actions", "Streaming SSR", "Turbopack"],
    skillsGained: ["App Router File Conventions", "Server vs Client Component Boundaries", "Streaming UI with Suspense", "Optimistic Updates"],
    prerequisites: ["Solid understanding of modern JavaScript and React basics"],
    pdfLessons: [
      {
        id: "pdf-react-hooks",
        title: "React Hooks & Component Architecture Handbook",
        description: "State management, custom hooks, memoization patterns, and declarative component architecture.",
        moduleTitle: "Module 1: React 19 Foundations",
        fileUrl: "/pdfs/react-hooks-architecture-handbook.pdf",
        fileSizeBytes: 5971,
        fileSize: "6.0 KB",
        pageCount: 12,
        displayOrder: 1,
        downloadAllowed: true,
      },
      {
        id: "pdf-nextjs-guide",
        title: "Next.js App Router Architecture Guide",
        description: "Layouts, loading states, error boundaries, server components, and route handlers.",
        moduleTitle: "Module 2: Next.js App Router Deep Dive",
        fileUrl: "/pdfs/nextjs-app-router-guide.pdf",
        fileSizeBytes: 6247,
        fileSize: "6.2 KB",
        pageCount: 14,
        displayOrder: 2,
        downloadAllowed: true,
      },
    ],
    modules: [
      {
        id: "mod-next-core",
        title: "Module 1: Server Components & Streaming",
        description: "Understand React Server Components and parallel route streaming.",
        lessons: [
          {
            id: "les-rsc-stream",
            slug: "react-server-components",
            title: "React Server Components & Zero-Bundle Cost",
            duration: "30 min",
            xpReward: 100,
            content: `Server Components render exclusively on the server, sending pre-rendered HTML to the client with zero JavaScript footprint for those components. This enables direct database access, secure secret handling, and blazing-fast initial load times.`,
            codeExample: {
              language: "typescript",
              code: `// App Router Server Component
export default async function CoursesCatalog() {
  const courses = await fetchCoursesFromDb();
  return (
    <div className="grid grid-cols-3 gap-6">
      {courses.map(course => <CourseCard key={course.id} course={course} />)}
    </div>
  );
}`,
              output: "[ Server rendered HTML streamed to browser ]",
              explanation: "No client JS is downloaded for rendering this data display component.",
            },
            keyTakeaways: [
              "Server Components do not ship JavaScript to the browser.",
              "Use 'use client' only when state or event listeners are required.",
            ],
            exercise: {
              id: "ex-rsc-1",
              type: "multiple-choice",
              prompt: "What is the primary benefit of React Server Components?",
              options: ["Zero client bundle size for server components", "Built-in database drivers", "Faster client typing", "Removes CSS"],
              correctAnswer: 0,
              explanation: "RSCs execute entirely on the server and do not increase the client JS bundle.",
              hint: "Think about what downloads into the user's browser.",
            },
          },
        ],
      },
    ],
  },

  // 5. Data Structures & Algorithms (Featured)
  {
    id: "course-dsa-101",
    slug: "data-structures-and-algorithms",
    title: "Data Structures & Algorithms in Production",
    description: "Master algorithmic problem solving, time and space complexity, dynamic programming, tree traversals, and graph algorithms required for top software engineering interviews.",
    shortDescription: "Master algorithmic problem solving, time and space complexity, dynamic programming, tree traversals, and graph algorithms required for top software engineering interviews.",
    thumbnailUrl: "/course-dsa.jpg",
    category: "Data Science",
    difficulty: "Intermediate",
    estimatedDuration: "28 Hours",
    estimatedDurationMinutes: 1680,
    totalLessons: 18,
    totalXp: 1800,
    icon: "🧩",
    color: "purple",
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-02-10T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    skills: ["Big-O Complexity", "Binary Trees & BSTs", "Dynamic Programming", "Graph Traversals (BFS/DFS)", "Heaps & Hash Tables"],
    skillsGained: ["Asymptotic Big-O Analysis", "Recursion & Memoization", "Binary Search Patterns", "Breadth-First and Depth-First Search"],
    prerequisites: ["Working knowledge of at least one programming language (Python, JS, Java)"],
    pdfLessons: [
      {
        id: "pdf-dsa-handbook",
        title: "Complete DSA Handbook: Arrays to Graphs & Big-O",
        description: "Comprehensive guide to all core data structures, visual complexity charts, and interview-proven algorithms.",
        moduleTitle: "Module 1: Foundations & Algorithmic Patterns",
        fileUrl: "/pdfs/dsa-complete-handbook.pdf",
        fileSizeBytes: 5492,
        fileSize: "5.5 KB",
        pageCount: 16,
        displayOrder: 1,
        downloadAllowed: true,
      },
    ],
    modules: [
      {
        id: "mod-dsa-complexity",
        title: "Module 1: Algorithmic Complexity & Big-O",
        description: "Analyze runtime behavior, memory consumption, and asymptotic performance.",
        lessons: [
          {
            id: "les-big-o",
            slug: "big-o-notation-analysis",
            title: "Asymptotic Notation: Time & Space Complexity",
            duration: "25 min",
            xpReward: 100,
            content: `Big-O notation describes the upper bound of an algorithm's growth rate as input size N scales towards infinity. An algorithm with O(1) constant time performs identically whether processing 10 items or 10 million items. Conversely, O(N²) quadratic algorithms become unworkably slow on large datasets.`,
            codeExample: {
              language: "typescript",
              code: `// O(1) Constant Time vs O(N) Linear Time
function getFirstElement<T>(arr: T[]): T {
  return arr[0]; // O(1) - immediate index pointer access
}

function findElement<T>(arr: T[], target: T): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i; // O(N) - worst-case scans entire array
  }
  return -1;
}`,
              output: "[ Constant vs Linear runtime demonstration ]",
              explanation: "Array indexing uses memory offsets directly, making lookups instant.",
            },
            keyTakeaways: [
              "O(1) is constant time; O(log N) is logarithmic (e.g. Binary Search).",
              "O(N) is linear; O(N log N) is standard for efficient sorting (Merge/Quick sort).",
              "Always prioritize worst-case time and auxiliary space constraints.",
            ],
            exercise: {
              id: "ex-dsa-1",
              type: "multiple-choice",
              prompt: "What is the worst-case time complexity of Binary Search on a sorted array of size N?",
              options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
              correctAnswer: 1,
              explanation: "Binary search cuts the search space in half at each step, yielding logarithmic O(log N) time.",
              hint: "Halving the search space each iteration produces a logarithmic growth rate.",
            },
          },
        ],
      },
    ],
  },

  // 6. SQL & Relational Databases (Data Science)
  {
    id: "course-sql-101",
    slug: "sql-and-relational-databases",
    title: "SQL & Relational Database Architecture",
    description: "Master PostgreSQL, relational schemas, ACID transactions, complex JOINs, indexing strategies, normalization, and query performance optimization.",
    shortDescription: "Master PostgreSQL, relational schemas, ACID transactions, complex JOINs, indexing strategies, normalization, and query performance optimization.",
    thumbnailUrl: "/course-sql.jpg",
    category: "Data Science",
    difficulty: "Beginner",
    estimatedDuration: "14 Hours",
    estimatedDurationMinutes: 840,
    totalLessons: 10,
    totalXp: 1000,
    icon: "🗄️",
    color: "indigo",
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-02-15T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    skills: ["PostgreSQL", "Relational Modeling", "JOINs & Subqueries", "B-Tree Indexes", "ACID Compliance"],
    skillsGained: ["Relational Database Modeling", "Complex SQL Queries & Subqueries", "Inner & Outer JOINs", "B-Tree Indexing", "ACID Transactions"],
    prerequisites: ["Basic logic and analytical understanding"],
    pdfLessons: [
      {
        id: "pdf-sql-cheatsheet",
        title: "DBMS Architecture, Normalization & SQL Cheatsheet",
        description: "1NF to 3NF schema design, foreign key constraints, indexing techniques, and execution planning.",
        moduleTitle: "Module 1: Relational Schema & Optimization",
        fileUrl: "/pdfs/dbms-sql-cheatsheet.pdf",
        fileSizeBytes: 5433,
        fileSize: "5.4 KB",
        pageCount: 8,
        displayOrder: 1,
        downloadAllowed: true,
      },
    ],
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
              code: `SELECT u.id, u.name, COUNT(e.course_id) AS total_enrolled
FROM users u
LEFT JOIN enrollments e ON u.id = e.user_id
GROUP BY u.id, u.name
ORDER BY total_enrolled DESC;`,
              output: "[ Query plan executing hash aggregate over indexed foreign keys ]",
              explanation: "The LEFT JOIN preserves users with zero enrollments while aggregating totals.",
            },
            keyTakeaways: [
              "Always define Foreign Keys with ON DELETE CASCADE or RESTRICT.",
              "Add indexes to columns frequently used in JOIN and WHERE conditions.",
            ],
            exercise: {
              id: "ex-sql-1",
              type: "multiple-choice",
              prompt: "Which JOIN returns all rows from the left table even if there is no match in the right table?",
              options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"],
              correctAnswer: 1,
              explanation: "LEFT JOIN retains all rows from the left table, filling missing right-side columns with NULL.",
              hint: "The name indicates which side of the relationship is preserved.",
            },
          },
        ],
      },
    ],
  },

  // 7. Artificial Intelligence & Machine Learning (Featured)
  {
    id: "course-ai-ml-101",
    slug: "ai-machine-learning-engineering",
    title: "AI & Machine Learning Engineering: Models to Agents",
    description: "Design end-to-end AI applications using large language models, retrieval-augmented generation (RAG), vector databases, prompt engineering, and autonomous agents.",
    shortDescription: "Design end-to-end AI applications using large language models, retrieval-augmented generation (RAG), vector databases, prompt engineering, and autonomous agents.",
    thumbnailUrl: "/course-ai.jpg",
    category: "Artificial Intelligence",
    difficulty: "Advanced",
    estimatedDuration: "32 Hours",
    estimatedDurationMinutes: 1920,
    totalLessons: 15,
    totalXp: 1500,
    icon: "🤖",
    color: "pink",
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-02-20T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    skills: ["RAG Pipelines", "Vector Databases", "Embeddings & Similarity", "Prompt Engineering", "Autonomous Agents"],
    skillsGained: ["Vector Embeddings", "RAG Pipeline Engineering", "Prompt Chaining", "Model Fine-Tuning Principles"],
    prerequisites: ["Working knowledge of Python and basic linear algebra"],
    pdfLessons: [
      {
        id: "pdf-ai-essentials",
        title: "Python for AI, Embeddings & RAG Architectures",
        description: "Vector similarity calculations, chunking strategies, embedding models, and LLM orchestration.",
        moduleTitle: "Module 1: Vector Search & Embeddings",
        fileUrl: "/pdfs/python-ai-essentials.pdf",
        fileSizeBytes: 5540,
        fileSize: "5.5 KB",
        pageCount: 10,
        displayOrder: 1,
        downloadAllowed: true,
      },
    ],
    modules: [
      {
        id: "mod-ai-rag",
        title: "Module 1: Vector Embeddings & Semantic Retrieval",
        description: "Transform textual data into vector embeddings and build semantic RAG pipelines.",
        lessons: [
          {
            id: "les-rag-arch",
            slug: "rag-architecture-and-embeddings",
            title: "Vector Embeddings & Cosine Similarity in Practice",
            duration: "30 min",
            xpReward: 100,
            content: `Retrieval-Augmented Generation (RAG) augments large language models with dynamic private data. Embeddings convert text into high-dimensional numerical vectors where semantic similarity is calculated using mathematical distance metrics like Cosine Similarity.`,
            codeExample: {
              language: "python",
              code: `import numpy as np

def cosine_similarity(v1, v2):
    dot = np.dot(v1, v2)
    norm = np.linalg.norm(v1) * np.linalg.norm(v2)
    return dot / norm

query_vec = np.array([0.15, 0.82, -0.31])
doc_vec = np.array([0.18, 0.79, -0.28])
print(f"Similarity Score: {cosine_similarity(query_vec, doc_vec):.4f}")`,
              output: "Similarity Score: 0.9984",
              explanation: "A cosine similarity close to 1.0 confirms the document is highly relevant to the query.",
            },
            keyTakeaways: [
              "Embeddings capture semantic meaning as multi-dimensional coordinates.",
              "Cosine similarity identifies contextually related documents.",
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
              hint: "It retrieves external context to augment the generated answer.",
            },
          },
        ],
      },
    ],
  },

  // 8. Cross-Platform Mobile App Development (Mobile Development)
  {
    id: "course-mobile-dev-101",
    slug: "react-native-mobile-development",
    title: "Cross-Platform Mobile Apps with React Native & Expo",
    description: "Build, debug, and publish high-performance native iOS and Android mobile apps from a single codebase using React Native, Expo, and native device APIs.",
    shortDescription: "Build, debug, and publish high-performance native iOS and Android mobile apps from a single codebase using React Native, Expo, and native device APIs.",
    thumbnailUrl: "/course-mobile.jpg",
    category: "Mobile Development",
    difficulty: "Intermediate",
    estimatedDuration: "22 Hours",
    estimatedDurationMinutes: 1320,
    totalLessons: 12,
    totalXp: 1200,
    icon: "📱",
    color: "sky",
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-05T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    skills: ["React Native", "Expo SDK", "Native Device APIs", "Offline Storage", "Navigation 6+"],
    skillsGained: ["Native Flexbox Layouts", "Camera & Geolocation Access", "AsyncStorage & SQLite", "App Store Submission"],
    prerequisites: ["Understanding of JavaScript and React concepts"],
    pdfLessons: [
      {
        id: "pdf-mobile-hooks",
        title: "React Native Core Architecture, State & Hooks",
        description: "Mobile component lifecycle, re-render avoidance, virtualized lists, and native bridge communications.",
        moduleTitle: "Module 1: Native Mobile Fundamentals",
        fileUrl: "/pdfs/react-hooks-architecture-handbook.pdf",
        fileSizeBytes: 5971,
        fileSize: "6.0 KB",
        pageCount: 12,
        displayOrder: 1,
        downloadAllowed: true,
      },
      {
        id: "pdf-mobile-js",
        title: "Modern Mobile JavaScript & API Integration",
        description: "Network resilience, offline caching, push notifications, and biometric authentication.",
        moduleTitle: "Module 2: Device Services & Storage",
        fileUrl: "/pdfs/javascript-modern-guide.pdf",
        fileSizeBytes: 5695,
        fileSize: "5.7 KB",
        pageCount: 10,
        displayOrder: 2,
        downloadAllowed: true,
      },
    ],
    modules: [
      {
        id: "mod-mobile-core",
        title: "Module 1: Native Components & Flexbox",
        description: "Learn how React Native translates JSX into actual native iOS UIViews and Android Views.",
        lessons: [
          {
            id: "les-mobile-views",
            slug: "react-native-views",
            title: "Native Layouts with View, Text & Flexbox",
            duration: "20 min",
            xpReward: 100,
            content: `Unlike the browser where flex-direction defaults to 'row', React Native defaults to 'column'. Every text snippet must be wrapped inside a <Text> component, and styles are applied using the StyleSheet API.`,
            codeExample: {
              language: "typescript",
              code: `import { StyleSheet, View, Text } from "react-native";

export default function MobileCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Mobile Native App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, padding: 16, backgroundColor: "#ffffff" },
  title: { fontSize: 18, fontWeight: "bold", color: "#182230" },
});`,
              output: "[ Renders native UIView on iOS and android.view.View on Android ]",
              explanation: "React Native components map directly to operating system native widgets.",
            },
            keyTakeaways: [
              "React Native flex-direction defaults to column.",
              "All text must be inside <Text> components.",
            ],
            exercise: {
              id: "ex-mob-1",
              type: "multiple-choice",
              prompt: "What is the default flex-direction in React Native?",
              options: ["row", "column", "row-reverse", "column-reverse"],
              correctAnswer: 1,
              explanation: "React Native defaults flex-direction to column to match vertical mobile phone screens.",
              hint: "Think about the vertical orientation of mobile devices.",
            },
          },
        ],
      },
    ],
  },

  // 9. Cybersecurity Foundations (Cybersecurity)
  {
    id: "course-cybersecurity-101",
    slug: "cybersecurity-os-networking",
    title: "Cybersecurity Foundations & Operating Systems Defense",
    description: "Understand network security architecture, vulnerability scanning, Linux system hardening, cryptographic protocols, TLS handshakes, and defense-in-depth security principles.",
    shortDescription: "Understand network security architecture, vulnerability scanning, Linux system hardening, cryptographic protocols, TLS handshakes, and defense-in-depth security principles.",
    thumbnailUrl: "/course-cyber.jpg",
    category: "Cybersecurity",
    difficulty: "Intermediate",
    estimatedDuration: "18 Hours",
    estimatedDurationMinutes: 1080,
    totalLessons: 10,
    totalXp: 1000,
    icon: "🛡️",
    color: "rose",
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-10T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    skills: ["Network Security", "Linux System Hardening", "TLS/SSL Cryptography", "Firewalls & IPTables", "Threat Modeling"],
    skillsGained: ["Threat Surface Modeling", "Public Key Cryptography & PKI", "Network Packet Inspection", "OWASP Top 10 Mitigations"],
    prerequisites: ["Familiarity with basic computer networking and command-line interfaces"],
    pdfLessons: [
      {
        id: "pdf-os-net",
        title: "Operating Systems Internals & Network Security Handbook",
        description: "Process memory management, file permissions, TCP/IP attacks, and defensive countermeasures.",
        moduleTitle: "Module 1: Systems & Network Defense",
        fileUrl: "/pdfs/os-networking-handbook.pdf",
        fileSizeBytes: 5525,
        fileSize: "5.5 KB",
        pageCount: 10,
        displayOrder: 1,
        downloadAllowed: true,
      },
      {
        id: "pdf-docker-security",
        title: "Docker Container Isolation & DevOps Hardening",
        description: "Rootless containers, network policies, vulnerability scanning, and secure build pipelines.",
        moduleTitle: "Module 2: Container Security",
        fileUrl: "/pdfs/docker-devops-guide.pdf",
        fileSizeBytes: 5427,
        fileSize: "5.4 KB",
        pageCount: 10,
        displayOrder: 2,
        downloadAllowed: true,
      },
    ],
    modules: [
      {
        id: "mod-sec-core",
        title: "Module 1: Cryptography & Network Security",
        description: "Master symmetric/asymmetric encryption, hashing, and digital signatures.",
        lessons: [
          {
            id: "les-crypto-tls",
            slug: "tls-handshake-defense",
            title: "TLS 1.3 Handshake & Asymmetric Encryption",
            duration: "25 min",
            xpReward: 100,
            content: `Transport Layer Security (TLS 1.3) protects Internet communications against eavesdropping and tampering. Modern handshakes negotiate ephemeral Diffie-Hellman keys to provide Perfect Forward Secrecy (PFS), guaranteeing that even if a private key is later compromised, historical traffic cannot be decrypted.`,
            codeExample: {
              language: "bash",
              code: `# Inspecting TLS Certificate Chain & Protocol Version
openssl s_client -connect slrjlearn.in:443 -tls1_3`,
              output: "CONNECTED(00000003)\nTLSv1.3 Cipher is TLS_AES_256_GCM_SHA384",
              explanation: "Openssl initiates a secure handshake and displays the cipher suite and negotiated security parameters.",
            },
            keyTakeaways: [
              "TLS 1.3 reduces handshake latency to a single round trip (1-RTT).",
              "Perfect Forward Secrecy ensures past sessions remain secure.",
            ],
            exercise: {
              id: "ex-sec-1",
              type: "multiple-choice",
              prompt: "What security guarantee prevents historical sessions from being decrypted if a server private key is leaked in the future?",
              options: ["Two-Factor Auth", "Perfect Forward Secrecy (PFS)", "MD5 Hashing", "DNSSEC"],
              correctAnswer: 1,
              explanation: "Perfect Forward Secrecy generates unique ephemeral session keys so past sessions cannot be decoded retroactively.",
              hint: "Focus on the term that refers to keeping forward sessions protected.",
            },
          },
        ],
      },
    ],
  },

  // 10. UI/UX Design Systems & Interface Engineering (UI/UX Design)
  {
    id: "course-uiux-101",
    slug: "ui-ux-design-systems",
    title: "UI/UX Design Systems & Interface Engineering",
    description: "Design accessible, scalable, visually cohesive design systems. Master typography scales, color harmony, WCAG AAA compliance, component tokens, and responsive UI engineering.",
    shortDescription: "Design accessible, scalable, visually cohesive design systems. Master typography scales, color harmony, WCAG AAA compliance, component tokens, and responsive UI engineering.",
    thumbnailUrl: "/course-uiux.jpg",
    category: "UI/UX Design",
    difficulty: "Beginner",
    estimatedDuration: "12 Hours",
    estimatedDurationMinutes: 720,
    totalLessons: 8,
    totalXp: 800,
    icon: "🎨",
    color: "purple",
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-12T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    skills: ["Design Systems", "Figma to Code", "WCAG Accessibility", "Design Tokens", "Micro-interactions"],
    skillsGained: ["Color Contrast Optimization (WCAG 2.2)", "Fluid Typography Math", "Atomic Component Architecture", "Keyboard Navigable Interfaces"],
    prerequisites: ["Curiosity for visual aesthetics and user-centric problem solving"],
    pdfLessons: [
      {
        id: "pdf-ui-css",
        title: "CSS Flexbox, CSS Grid & Responsive Typography Blueprint",
        description: "Layout alignment, modular scales, spacing rhythms, and accessible component states.",
        moduleTitle: "Module 1: Layout & Component Systems",
        fileUrl: "/pdfs/css-flexbox-grid-cheatsheet.pdf",
        fileSizeBytes: 5498,
        fileSize: "5.5 KB",
        pageCount: 6,
        displayOrder: 1,
        downloadAllowed: true,
      },
      {
        id: "pdf-ui-html-basic",
        title: "Semantic HTML5 Accessibility & Component Design",
        description: "ARIA roles, screen reader announce patterns, focus traps, and modal accessibility.",
        moduleTitle: "Module 2: Accessible Interface Systems",
        fileUrl: "/pdfs/html-level-1-basic.pdf",
        fileSizeBytes: 4412251,
        fileSize: "4.4 MB",
        pageCount: 24,
        displayOrder: 2,
        downloadAllowed: true,
      },
    ],
    modules: [
      {
        id: "mod-ui-tokens",
        title: "Module 1: Design Tokens & Visual Hierarchy",
        description: "Establish semantic tokens for color, spacing, and typographic rhythm.",
        lessons: [
          {
            id: "les-ui-tokens",
            slug: "design-tokens-and-scales",
            title: "Design Tokens, Spacing Rhythms & Contrast",
            duration: "20 min",
            xpReward: 100,
            content: `A scalable design system is founded on design tokens—atomic variables defining brand colors, surface elevations, border radii, and typographic scales. Adhering to a base-4 or base-8 spacing scale prevents arbitrary margin decisions and ensures consistent visual balance.`,
            codeExample: {
              language: "css",
              code: `:root {
  --color-primary: #173b70;
  --color-surface: #f8fafc;
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem;  /* 8px */
  --space-4: 1rem;    /* 16px */
  --radius-md: 0.75rem; /* 12px */
}`,
              output: "[ Semantic CSS variables ready for system-wide consumption ]",
              explanation: "Tokens decouple design intent from raw values, making themes and dark mode effortless.",
            },
            keyTakeaways: [
              "Use 4px/8px incremental grids for consistent layout rhythm.",
              "Verify minimum 4.5:1 contrast ratios for standard text under WCAG AA.",
            ],
            exercise: {
              id: "ex-ui-1",
              type: "multiple-choice",
              prompt: "What is the minimum WCAG 2.1 AA color contrast ratio required for regular body text?",
              options: ["2.5:1", "3:1", "4.5:1", "7:1"],
              correctAnswer: 2,
              explanation: "WCAG AA requires at least 4.5:1 contrast for regular text (3:1 for large text).",
              hint: "Think about standard accessibility compliance thresholds.",
            },
          },
        ],
      },
    ],
  },

  // 11. Software Engineering Career & DevOps (Career Development)
  {
    id: "course-devops-career-101",
    slug: "software-engineering-career-devops",
    title: "Software Engineering Career: Git, DevOps & Production",
    description: "Launch and accelerate your tech career. Master professional Git workflows, Docker containerization, CI/CD pipelines, technical resume building, and production deployment.",
    shortDescription: "Launch and accelerate your tech career. Master professional Git workflows, Docker containerization, CI/CD pipelines, technical resume building, and production deployment.",
    thumbnailUrl: "/course-career.jpg",
    category: "Career Development",
    difficulty: "Beginner",
    estimatedDuration: "15 Hours",
    estimatedDurationMinutes: 900,
    totalLessons: 10,
    totalXp: 1000,
    icon: "🚀",
    color: "emerald",
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-14T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    skills: ["Git Workflow", "Docker & Containers", "CI/CD Pipelines", "Resume Engineering", "System Deployment"],
    skillsGained: ["Interactive Rebase & Cherry-Picking", "Multi-stage Docker Builds", "GitHub Actions Automation", "Technical Portfolio Storytelling"],
    prerequisites: ["Desire to transition into professional software engineering"],
    pdfLessons: [
      {
        id: "pdf-career-git",
        title: "Git & GitHub Essential Workflow for High-Performing Teams",
        description: "Branching strategies, interactive rebase, pull request etiquette, and conflict mitigation.",
        moduleTitle: "Module 1: Version Control Mastery",
        fileUrl: "/pdfs/git-github-essential-workflow.pdf",
        fileSizeBytes: 5737,
        fileSize: "5.7 KB",
        pageCount: 8,
        displayOrder: 1,
        downloadAllowed: true,
      },
      {
        id: "pdf-career-docker",
        title: "Docker, Containers & Production DevOps Guide",
        description: "Dockerfile syntax, layer caching, compose configurations, and zero-downtime deployments.",
        moduleTitle: "Module 2: Modern Deployment Pipelines",
        fileUrl: "/pdfs/docker-devops-guide.pdf",
        fileSizeBytes: 5427,
        fileSize: "5.4 KB",
        pageCount: 10,
        displayOrder: 2,
        downloadAllowed: true,
      },
    ],
    modules: [
      {
        id: "mod-career-git",
        title: "Module 1: Professional Git & GitHub Workflows",
        description: "Master team collaboration, rebasing, and automated pipelines.",
        lessons: [
          {
            id: "les-career-rebase",
            slug: "git-rebase-and-workflows",
            title: "Linear Git History with Interactive Rebase",
            duration: "25 min",
            xpReward: 100,
            content: `Clean Git history makes tracking bugs and reading changelogs straightforward. While 'git merge' creates non-linear merge commits, 'git rebase' rewrites commit history on top of the target branch, keeping git logs clean and linear.`,
            codeExample: {
              language: "bash",
              code: `# Updating your feature branch with main without creating a merge commit
git checkout feature/learner-profile
git fetch origin
git rebase origin/main`,
              output: "Successfully rebased and updated refs/heads/feature/learner-profile.",
              explanation: "Rebase applies your feature commits on top of the latest main branch.",
            },
            keyTakeaways: [
              "Never rebase public shared branches.",
              "Squash small checkpoint commits before merging pull requests.",
            ],
            exercise: {
              id: "ex-career-1",
              type: "multiple-choice",
              prompt: "Why do engineering teams prefer git rebase for feature branches?",
              options: [
                "It automatically deploys the website",
                "It produces a clean, linear commit history without redundant merge commits",
                "It makes Git run faster on disk",
                "It prevents team members from pushing code"
              ],
              correctAnswer: 1,
              explanation: "Rebasing creates a tidy, readable linear timeline of commits.",
              hint: "Think about the appearance and readability of git log.",
            },
          },
        ],
      },
    ],
  },
];

export const LEARNING_CATEGORIES = [
  {
    title: "Web Development",
    shortDescription: "Build dynamic websites & web applications with HTML5, CSS3, modern JavaScript, React, and Next.js.",
    difficulty: "Beginner to Pro",
    icon: "🌐",
    slug: "web-development-foundations",
    badge: "Most Popular",
    color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    title: "Programming",
    shortDescription: "Master Python, modern JavaScript, and strict TypeScript with solid computer science fundamentals.",
    difficulty: "Beginner Friendly",
    icon: "💻",
    slug: "python-programming-mastery",
    badge: "Core Skills",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    title: "Data Science",
    shortDescription: "Turn raw datasets into actionable insights using SQL, PostgreSQL, algorithmic structures, and relational databases.",
    difficulty: "Beginner to Intermediate",
    icon: "📊",
    slug: "data-structures-and-algorithms",
    badge: "High Growth",
    color: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400",
  },
  {
    title: "Artificial Intelligence",
    shortDescription: "Prompt engineering, RAG pipelines, vector embeddings, LLM agent workflows, and machine learning models.",
    difficulty: "Advanced",
    icon: "🤖",
    slug: "ai-machine-learning-engineering",
    badge: "Cutting-Edge",
    color: "from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-400",
  },
  {
    title: "Mobile Development",
    shortDescription: "Build cross-platform iOS and Android mobile apps using React Native, native device APIs, and performant state management.",
    difficulty: "Intermediate",
    icon: "📱",
    slug: "react-native-mobile-development",
    badge: "Mobile Apps",
    color: "from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-sky-400",
  },
  {
    title: "Cybersecurity",
    shortDescription: "Defend networks, understand cryptographic handshakes, harden Linux distributions, and containerize safely.",
    difficulty: "Intermediate",
    icon: "🛡️",
    slug: "cybersecurity-os-networking",
    badge: "Security Core",
    color: "from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400",
  },
  {
    title: "UI/UX Design",
    shortDescription: "Design scalable design systems, master WCAG accessibility, Figma tokens, and responsive interface ergonomics.",
    difficulty: "Beginner",
    icon: "🎨",
    slug: "ui-ux-design-systems",
    badge: "Design Core",
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
  },
  {
    title: "Career Development",
    shortDescription: "Master version control, interactive rebase, pull requests, containerization, and technical career growth.",
    difficulty: "Essential",
    icon: "🚀",
    slug: "software-engineering-career-devops",
    badge: "Career Track",
    color: "from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-400",
  },
];

export function getAllCourses(): Course[] {
  return COURSES_DATA;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES_DATA.find((c) => c.slug === slug);
}

export function getCourseById(id: string): Course | undefined {
  return COURSES_DATA.find((c) => c.id === id || c.slug === id);
}
