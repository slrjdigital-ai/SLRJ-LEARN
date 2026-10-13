export interface RoadmapStep {
  id: number;
  slug: string;
  title: string;
  trackId?: string;
  category: string;
  summary: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  prerequisites: string[];
  keyTopics: string[];
  recommendedNotes: Array<{
    title: string;
    slug: string;
  }>;
  recommendedPdf?: {
    title: string;
    filename: string;
    fileUrl: string;
  };
  practicalMilestone: string;
}

export interface RoadmapTrack {
  id: string;
  name: string;
  badge: string;
  description: string;
  totalStages: number;
  duration: string;
  icon: string;
}

export const ROADMAP_TRACKS: RoadmapTrack[] = [
  {
    id: "web-dev",
    name: "Full-Stack Web Development",
    badge: "Core Engineering",
    description: "Complete path from Internet fundamentals to HTML, CSS, JavaScript, React 19, Next.js, APIs, Databases, and Production Deployment.",
    totalStages: 12,
    duration: "6 - 9 Months",
    icon: "Globe"
  },
  {
    id: "dsa",
    name: "Data Structures & Algorithms (DSA)",
    badge: "Coding Interviews",
    description: "Master Asymptotic Big-O, Arrays, Hash Tables, Binary Trees, Graphs (BFS/DFS), and Dynamic Programming for technical interviews.",
    totalStages: 6,
    duration: "4 - 6 Months",
    icon: "Code2"
  },
  {
    id: "python-ai",
    name: "Python, Data Science & AI",
    badge: "Future of Tech",
    description: "Step-by-step roadmap from Python fundamentals and OOP to NumPy, Pandas, Machine Learning, Neural Networks, and Generative AI LLMs.",
    totalStages: 5,
    duration: "5 - 7 Months",
    icon: "Sparkles"
  },
  {
    id: "cs-core",
    name: "Computer Science Core (CS Fundamentals)",
    badge: "Campus & Placements",
    description: "Academic & interview fundamentals: Operating Systems, DBMS & Normalization, Advanced SQL, and Computer Networks Architecture.",
    totalStages: 5,
    duration: "4 - 5 Months",
    icon: "Cpu"
  },
  {
    id: "cloud-devops",
    name: "Cloud Computing & DevOps",
    badge: "High Demand",
    description: "Master Linux terminal workflows, Git collaboration, Docker containerization, Compose orchestration, and automated CI/CD pipelines.",
    totalStages: 5,
    duration: "4 - 6 Months",
    icon: "Cloud"
  }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    slug: "web-fundamentals",
    title: "1. Programming & Web Fundamentals",
    category: "Web Fundamentals",
    summary: "Understand how the global internet works, how browsers fetch and parse web pages, and the architectural roles of clients, servers, DNS, and HTTP/HTTPS.",
    duration: "1 - 2 Weeks",
    difficulty: "Beginner",
    prerequisites: ["Curiosity & Basic Computer Literacy"],
    keyTopics: [
      "How the Internet works (TCP/IP, Routers, Packets)",
      "DNS Resolution & IP Addressing",
      "Client-Server Model & Request-Response Cycle",
      "HTTP/HTTPS Protocols & Status Codes (200, 404, 500)",
      "Browser Critical Rendering Path (DOM, CSSOM, Render Tree)",
      "Frontend vs Backend separation"
    ],
    recommendedNotes: [
      { title: "How the Internet Works & Web Architecture", slug: "how-the-internet-works" },
      { title: "Frontend vs Backend: Roles & Architecture", slug: "frontend-vs-backend" },
      { title: "HTTP, HTTPS, Browsers & Web Servers", slug: "http-https-browsers-servers" }
    ],
    recommendedPdf: {
      title: "Web Fundamentals Handbook",
      filename: "web-fundamentals-complete-handbook.pdf",
      fileUrl: "/pdfs/web-fundamentals-complete-handbook.pdf"
    },
    practicalMilestone: "Trace a network request in Chrome DevTools Network tab, inspect response headers, and explain the TCP/DNS flow."
  },
  {
    id: 2,
    slug: "html5-semantics",
    title: "2. HTML5 & Web Semantics",
    category: "HTML",
    summary: "Learn the backbone of every web page. Master semantic structure, forms with validation, accessibility (WCAG), and modern SEO metadata.",
    duration: "1 - 2 Weeks",
    difficulty: "Beginner",
    prerequisites: ["Step 1: Web Fundamentals"],
    keyTopics: [
      "Document Structure (<!DOCTYPE>, <html>, <head>, <body>)",
      "Semantic Elements (<header>, <nav>, <main>, <article>, <section>, <footer>)",
      "Accessible Forms (<label>, <input>, <fieldset>, ARIA attributes)",
      "Lists, Tables & Clean Data Presentation",
      "Audio, Video, and Responsive Images (<picture>, srcset)",
      "Web Accessibility (A11y) & WCAG Guidelines"
    ],
    recommendedNotes: [
      { title: "HTML5 Document Structure & Best Practices", slug: "html-basics-document-structure" },
      { title: "Semantic HTML & Accessibility (A11y) Guide", slug: "semantic-html-complete-guide" },
      { title: "Accessible Web Forms & Input Validation", slug: "forms-tables-lists-accessibility" }
    ],
    recommendedPdf: {
      title: "HTML5 Complete Study Notes",
      filename: "html5-complete-notes.pdf",
      fileUrl: "/pdfs/html5-complete-notes.pdf"
    },
    practicalMilestone: "Build a multi-page semantic, accessible portfolio profile and contact form with zero CSS, passing HTML5 validation."
  },
  {
    id: 3,
    slug: "css-responsive-design",
    title: "3. CSS3, Responsive Design & Layouts",
    category: "CSS",
    summary: "Transform static markup into responsive, visually captivating digital interfaces using the Box Model, Flexbox, CSS Grid, and fluid typography.",
    duration: "2 - 3 Weeks",
    difficulty: "Beginner",
    prerequisites: ["Step 2: HTML5 Semantics"],
    keyTopics: [
      "CSS Selectors, Specificity & The Cascade",
      "Box Model (Content, Padding, Border, Margin, Box-Sizing)",
      "Flexbox Deep Dive (Main Axis, Cross Axis, Alignment)",
      "CSS Grid (repeat, minmax, auto-fit, grid-template-areas)",
      "Positioning (Static, Relative, Absolute, Fixed, Sticky)",
      "Responsive Media Queries & Mobile-First Design",
      "Modern CSS Variables, Transitions & Keyframe Animations"
    ],
    recommendedNotes: [
      { title: "CSS Selectors, Specificity & Box Model", slug: "css-selectors-specificity-box-model" },
      { title: "Mastering CSS Flexbox & Grid Layouts", slug: "css-flexbox-grid-mastery" },
      { title: "Responsive Design, Media Queries & Animations", slug: "responsive-design-media-queries-animations" }
    ],
    recommendedPdf: {
      title: "CSS Flexbox & Grid Master Cheatsheet",
      filename: "css-flexbox-grid-cheatsheet.pdf",
      fileUrl: "/pdfs/css-flexbox-grid-cheatsheet.pdf"
    },
    practicalMilestone: "Build a fully responsive product landing page with mobile hamburger drawer, CSS Grid card showcase, and dark mode accents."
  },
  {
    id: 4,
    slug: "javascript-fundamentals-async",
    title: "4. Modern JavaScript (ES6+ & Async)",
    category: "JavaScript",
    summary: "Master the programming language of the web. Learn core logic, data manipulation, DOM events, and asynchronous programming.",
    duration: "3 - 4 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Step 2: HTML5", "Step 3: CSS3"],
    keyTopics: [
      "Variables (const, let), Primitive Data Types & Scope",
      "Functions, Arrow Functions & Lexical 'this'",
      "Arrays & Essential Methods (map, filter, reduce, find)",
      "Objects, Destructuring, Spread/Rest Operators",
      "DOM Manipulation, Event Listeners & Event Delegation",
      "Asynchronous JS: Event Loop, Microtasks & Macrotasks",
      "Promises, Async/Await & Fetching REST APIs",
      "ES Modules (import / export) & Error Handling (try/catch)"
    ],
    recommendedNotes: [
      { title: "JavaScript Variables, Data Types & Operators", slug: "javascript-variables-data-types-operators" },
      { title: "Functions, Arrays & Object Manipulation in JS", slug: "javascript-functions-arrays-objects" },
      { title: "DOM Manipulation & Event Handling Guide", slug: "dom-manipulation-events-guide" },
      { title: "JavaScript Promises, Async/Await & Fetching", slug: "javascript-promises-async-await" }
    ],
    recommendedPdf: {
      title: "Modern JavaScript Developer Guide",
      filename: "javascript-modern-guide.pdf",
      fileUrl: "/pdfs/javascript-modern-guide.pdf"
    },
    practicalMilestone: "Develop an interactive Weather or Movie Search App fetching a live REST API with search debounce, loading spinners, and error alerts."
  },
  {
    id: 5,
    slug: "git-github-collaboration",
    title: "5. Version Control with Git & GitHub",
    category: "Git & GitHub",
    summary: "Learn industry-standard version control. Track code history, manage feature branches, resolve merge conflicts, and collaborate using GitHub.",
    duration: "1 Week",
    difficulty: "Beginner",
    prerequisites: ["Basic Terminal / Command Line"],
    keyTopics: [
      "Git Architecture (Working Tree, Staging Area, Local/Remote Repository)",
      "Daily Commands (git init, add, commit, status, log, diff)",
      "Branching Strategies & Feature Branch Workflows",
      "Merging vs Rebasing (When to use which)",
      "Resolving Merge Conflicts step-by-step",
      "GitHub: Repositories, Forking, Pull Requests & Code Reviews",
      "Git Stash, Reset, Revert & Clean Worktrees"
    ],
    recommendedNotes: [
      { title: "Git Fundamentals & Essential Commands", slug: "git-fundamentals-commands-guide" },
      { title: "Branching, Merging & Team GitHub Collaboration", slug: "git-branching-merging-collaboration" }
    ],
    recommendedPdf: {
      title: "Git & GitHub Workflow Handbook",
      filename: "git-github-essential-workflow.pdf",
      fileUrl: "/pdfs/git-github-essential-workflow.pdf"
    },
    practicalMilestone: "Create a GitHub repository, push code on a feature branch, open a Pull Request, merge it, and link an issue."
  },
  {
    id: 6,
    slug: "react-core-hooks",
    title: "6. Modern React (Components & Hooks)",
    category: "React",
    summary: "Master component-based UI engineering. Build reactive apps using JSX, state, props, lifecycle effects, custom hooks, and state lifting.",
    duration: "3 - 4 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Step 4: Modern JavaScript"],
    keyTopics: [
      "Declarative UI Paradigm & Virtual DOM",
      "Functional Components, JSX & Props",
      "State Management with useState",
      "Side Effects & Lifecycles with useEffect",
      "Controlled Forms & Input Handling",
      "Conditional Rendering & Dynamic Lists (Keys)",
      "Custom Hooks for Reusable Business Logic",
      "Context API for Application State",
      "Performance: React.memo, useMemo, useCallback"
    ],
    recommendedNotes: [
      { title: "React Components, Props & State Mastery", slug: "react-components-props-state" },
      { title: "React Hooks & Event Handling Deep Dive", slug: "react-hooks-event-handling" },
      { title: "Forms, Conditional Rendering & API Integration", slug: "react-forms-conditional-rendering-apis" }
    ],
    recommendedPdf: {
      title: "React 19 Hooks & Architecture Handbook",
      filename: "react-hooks-architecture-handbook.pdf",
      fileUrl: "/pdfs/react-hooks-architecture-handbook.pdf"
    },
    practicalMilestone: "Build a full-featured E-Commerce Cart or Task Management Dashboard with filters, search, and persistent local state."
  },
  {
    id: 7,
    slug: "nextjs-app-router",
    title: "7. Next.js & Full-Stack React Architecture",
    category: "Next.js",
    summary: "Build production-ready, lightning-fast web applications with Next.js App Router, React Server Components (RSC), SSR, and ISR.",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Step 6: React Core & Hooks"],
    keyTopics: [
      "Next.js App Router Structure (layout, page, loading, error)",
      "Server Components (RSC) vs Client Components ('use client')",
      "Dynamic Route Segments ([slug]) & Static Generation",
      "Data Fetching, Caching & Revalidation (ISR)",
      "Route Handlers (Building REST APIs)",
      "Next.js Image, Font & Script Optimization",
      "Dynamic Metadata, Open Graph & SEO Architecture"
    ],
    recommendedNotes: [
      { title: "Next.js App Router & Layout Architecture", slug: "nextjs-app-router-layouts" },
      { title: "Server vs Client Components & Data Fetching", slug: "nextjs-server-client-components-fetching" },
      { title: "Metadata, Dynamic SEO & Deployment in Next.js", slug: "nextjs-metadata-seo-deployment" }
    ],
    recommendedPdf: {
      title: "Next.js App Router & Architecture Guide",
      filename: "nextjs-app-router-guide.pdf",
      fileUrl: "/pdfs/nextjs-app-router-guide.pdf"
    },
    practicalMilestone: "Create an SEO-optimized educational blog with dynamic routes, static generation, search filtering, and Open Graph previews."
  },
  {
    id: 8,
    slug: "apis-backend-fundamentals",
    title: "8. APIs & Backend Fundamentals (Node.js)",
    category: "Backend & Databases",
    summary: "Learn server-side fundamentals. Create secure RESTful APIs with Node.js, Express, or Next.js route handlers, handling request validation and middleware.",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Step 4: JavaScript", "Step 7: Next.js"],
    keyTopics: [
      "Node.js Runtime & Asynchronous I/O Model",
      "RESTful API Architecture & URI Design Patterns",
      "HTTP Headers, CORS, Rate Limiting & Cookies",
      "Request Payload Validation (Zod / Joi)",
      "Error Handling Middleware & Structured Logging",
      "Handling File Uploads & Multipart Form Data",
      "Environment Variables & Secrets Management"
    ],
    recommendedNotes: [
      { title: "RESTful API Design & Best Practices", slug: "rest-apis-design-architecture" },
      { title: "Node.js Backend & API Handler Fundamentals", slug: "nodejs-backend-fundamentals" }
    ],
    recommendedPdf: {
      title: "REST APIs & Backend Engineering Handbook",
      filename: "rest-apis-backend-handbook.pdf",
      fileUrl: "/pdfs/rest-apis-backend-handbook.pdf"
    },
    practicalMilestone: "Develop an authenticated feedback or notes API endpoint with payload validation, rate-limiting, and error responses."
  },
  {
    id: 9,
    slug: "databases-sql-nosql",
    title: "9. Databases (SQL, NoSQL & ORMs)",
    category: "Backend & Databases",
    summary: "Design and manage persistent data storage. Understand relational databases (PostgreSQL), document stores (MongoDB), migrations, and ORMs.",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Step 8: APIs & Backend Fundamentals"],
    keyTopics: [
      "Relational (SQL) vs Document (NoSQL) Databases",
      "PostgreSQL Fundamentals (Tables, Foreign Keys, Indexes, Constraints)",
      "ACID Transactions & Data Integrity",
      "ORMs & Query Builders (Prisma, Drizzle)",
      "Database Migrations & Schema Versioning",
      "Database Connection Pooling & Serverless Drivers"
    ],
    recommendedNotes: [
      { title: "Databases: SQL vs NoSQL & Data Security", slug: "databases-sql-nosql-security" }
    ],
    recommendedPdf: {
      title: "REST APIs & Backend Engineering Handbook",
      filename: "rest-apis-backend-handbook.pdf",
      fileUrl: "/pdfs/rest-apis-backend-handbook.pdf"
    },
    practicalMilestone: "Design a relational schema with users, notes, categories, and bookmarks using PostgreSQL and an ORM."
  },
  {
    id: 10,
    slug: "auth-web-security",
    title: "10. Authentication & Web Security (OWASP)",
    category: "Backend & Databases",
    summary: "Safeguard user data and web applications. Implement session-based and token-based authentication, password hashing, and OWASP security practices.",
    duration: "1 - 2 Weeks",
    difficulty: "Advanced",
    prerequisites: ["Step 8: Backend APIs", "Step 9: Databases"],
    keyTopics: [
      "Authentication vs Authorization (RBAC)",
      "Password Hashing (bcrypt, Argon2id) & Salting",
      "JSON Web Tokens (JWT) vs httpOnly Session Cookies",
      "OAuth 2.0 & Social Login Flows (Google, GitHub)",
      "OWASP Top 10 Web Vulnerabilities (SQLi, XSS, CSRF)",
      "Content Security Policy (CSP) & CORS Configuration"
    ],
    recommendedNotes: [
      { title: "Databases: SQL vs NoSQL & Data Security", slug: "databases-sql-nosql-security" }
    ],
    recommendedPdf: {
      title: "REST APIs & Backend Engineering Handbook",
      filename: "rest-apis-backend-handbook.pdf",
      fileUrl: "/pdfs/rest-apis-backend-handbook.pdf"
    },
    practicalMilestone: "Implement a secure login & signup system with hashed passwords and protected routes in Next.js."
  },
  {
    id: 11,
    slug: "deployment-devops",
    title: "11. Deployment, Hosting, Domains & DNS",
    category: "Deployment",
    summary: "Deploy applications to global edge infrastructure. Configure custom domains, DNS records, SSL certificates, CI/CD pipelines, and monitoring.",
    duration: "1 Week",
    difficulty: "Intermediate",
    prerequisites: ["Step 5: Git & GitHub", "Step 7: Next.js"],
    keyTopics: [
      "Cloud Hosting Platforms (Vercel, AWS, Cloudflare)",
      "CI/CD Workflows (GitHub Actions, Automated Builds)",
      "Custom Domains, A Records, CNAME & DNS Propagation",
      "SSL/TLS Certificate Provisioning",
      "Production Environment Variables & Secrets",
      "Error Tracking, Uptime Monitoring & Performance Audits (Lighthouse)"
    ],
    recommendedNotes: [
      { title: "Production Deployment on Vercel & Custom DNS", slug: "vercel-deployment-domains-dns" },
      { title: "Production Environment Troubleshooting", slug: "production-environment-troubleshooting" }
    ],
    practicalMilestone: "Deploy a production Next.js website connected to a custom domain with SSL, environment secrets, and automated GitHub CI/CD."
  },
  {
    id: 12,
    slug: "real-world-projects",
    title: "12. Real-World Projects & Portfolio Building",
    category: "Web Fundamentals",
    summary: "Synthesize your full-stack engineering skills. Build end-to-end portfolio projects, write clean technical documentation, and prepare for interviews.",
    duration: "Ongoing",
    difficulty: "Advanced",
    prerequisites: ["All Previous Steps (1 - 11)"],
    keyTopics: [
      "Full-Stack Architecture Planning & Design Systems",
      "Project 1: SaaS Subscription Dashboard with Auth & Payments",
      "Project 2: Educational Platform with PDF Downloads & Roadmaps",
      "Project 3: Interactive Real-Time Collaborative Workspace",
      "Writing Technical Documentation & README Files",
      "Engineering Interview Prep: Coding Challenges & System Design"
    ],
    recommendedNotes: [
      { title: "Next.js Metadata, Dynamic SEO & Deployment", slug: "nextjs-metadata-seo-deployment" },
      { title: "RESTful API Design & Best Practices", slug: "rest-apis-design-architecture" }
    ],
    practicalMilestone: "Launch a live, public, multi-feature web application with an impressive README, live demo link, and clean GitHub repository."
  },

  // ═════════════════════════════════════════════════════════════
  // TRACK: Data Structures & Algorithms (DSA)
  // ═════════════════════════════════════════════════════════════
  {
    id: 101,
    slug: "dsa-time-complexity-arrays",
    title: "1. Asymptotic Complexity & Array Mechanics",
    trackId: "dsa",
    category: "Data Structures & Algorithms",
    summary: "Master Big-O upper bounds, space complexity analysis, contiguous memory layout, dynamic array resizing, and the Two-Pointer pattern.",
    duration: "2 - 3 Weeks",
    difficulty: "Beginner",
    prerequisites: ["Basic Programming in JS, Python, or C++"],
    keyTopics: [
      "Big-O, Big-Omega, Big-Theta Definitions",
      "Time Complexity vs Space Complexity Analysis",
      "Static vs Dynamic Arrays (Amortized O(1) Appends)",
      "Two Pointers & Sliding Window Interview Patterns",
      "Prefix Sums & Range Queries"
    ],
    recommendedNotes: [
      { title: "Data Structures: Arrays, Hash Maps & Time Complexity (Big-O)", slug: "dsa-arrays-time-complexity" }
    ],
    recommendedPdf: {
      title: "DSA Interview Handbook",
      filename: "dsa-complete-handbook.pdf",
      fileUrl: "/pdfs/dsa-complete-handbook.pdf"
    },
    practicalMilestone: "Solve 15 LeetCode Two-Pointer and Sliding Window problems with optimal O(N) runtime and O(1) space."
  },
  {
    id: 102,
    slug: "dsa-hashing-strings",
    title: "2. Hash Tables & String Algorithms",
    trackId: "dsa",
    category: "Data Structures & Algorithms",
    summary: "Deep dive into hash functions, separate chaining vs open addressing collision resolution, frequency maps, and string matching.",
    duration: "2 - 3 Weeks",
    difficulty: "Beginner",
    prerequisites: ["Asymptotic Complexity & Arrays"],
    keyTopics: [
      "Hash Function Mechanics & Uniform Distribution",
      "Collision Resolution: Separate Chaining & Probing",
      "Hash Sets & Frequency Count Dictionaries",
      "String Immutability & StringBuilder / Array Joins",
      "Anagrams & Palindrome Permutations"
    ],
    recommendedNotes: [
      { title: "Data Structures: Arrays, Hash Maps & Time Complexity (Big-O)", slug: "dsa-arrays-time-complexity" }
    ],
    recommendedPdf: {
      title: "DSA Interview Handbook",
      filename: "dsa-complete-handbook.pdf",
      fileUrl: "/pdfs/dsa-complete-handbook.pdf"
    },
    practicalMilestone: "Implement a custom Hash Map class from scratch handling collisions with separate chaining."
  },
  {
    id: 103,
    slug: "dsa-linked-lists-stacks-queues",
    title: "3. Linked Lists, Stacks & Queues",
    trackId: "dsa",
    category: "Data Structures & Algorithms",
    summary: "Pointer-based structures: Singly and Doubly Linked Lists, Fast & Slow pointer cycle detection (Floyd's algorithm), Stacks (LIFO), and Monotonic Stacks.",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Pointers & Basic Object References"],
    keyTopics: [
      "Singly vs Doubly Linked Lists & Dummy Head Technique",
      "Fast & Slow Pointers (Floyd's Cycle-Finding Algorithm)",
      "Stack (LIFO) & Valid Parentheses Parsing",
      "Monotonic Stack for Next Greater Element",
      "Queue (FIFO) & Double-Ended Queues (Deque)"
    ],
    recommendedNotes: [
      { title: "Trees, Binary Search Trees & Graph Traversals (BFS / DFS)", slug: "dsa-trees-graphs-algorithms" }
    ],
    practicalMilestone: "Reverse a linked list iteratively and recursively in O(N) time and O(1) auxiliary space."
  },
  {
    id: 104,
    slug: "dsa-trees-bst",
    title: "4. Binary Trees & Binary Search Trees (BST)",
    trackId: "dsa",
    category: "Data Structures & Algorithms",
    summary: "Hierarchical data structures: In-order, Pre-order, Post-order, Level-order traversals, BST invariants, LCA, and balanced AVL/Red-Black tree concepts.",
    duration: "3 - 4 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Recursion & Stack Frames"],
    keyTopics: [
      "Binary Tree Node Structure & Height/Depth",
      "Tree Traversals (Inorder, Preorder, Postorder)",
      "Level-Order Traversal with Queue (BFS)",
      "BST Invariant & O(log N) Search/Insert/Delete",
      "Lowest Common Ancestor (LCA) in BST & Binary Tree"
    ],
    recommendedNotes: [
      { title: "Trees, Binary Search Trees & Graph Traversals (BFS / DFS)", slug: "dsa-trees-graphs-algorithms" }
    ],
    recommendedPdf: {
      title: "DSA Interview Handbook",
      filename: "dsa-complete-handbook.pdf",
      fileUrl: "/pdfs/dsa-complete-handbook.pdf"
    },
    practicalMilestone: "Build a validated Binary Search Tree and serialize/deserialize it to and from a string."
  },
  {
    id: 105,
    slug: "dsa-graphs-bfs-dfs",
    title: "5. Graphs, BFS, DFS & Shortest Paths",
    trackId: "dsa",
    category: "Data Structures & Algorithms",
    summary: "Master graph representations (Adjacency List vs Matrix), Breadth-First Search (shortest path in unweighted graphs), DFS, cycle detection, and Topological Sort.",
    duration: "3 - 4 Weeks",
    difficulty: "Advanced",
    prerequisites: ["Trees & Queue/Stack Data Structures"],
    keyTopics: [
      "Adjacency List vs Adjacency Matrix",
      "Breadth-First Search (BFS) with Visited Set",
      "Depth-First Search (DFS) & Connected Components",
      "Topological Sorting (Kahn's Algorithm & DFS)",
      "Dijkstra's Algorithm for Weighted Shortest Paths"
    ],
    recommendedNotes: [
      { title: "Trees, Binary Search Trees & Graph Traversals (BFS / DFS)", slug: "dsa-trees-graphs-algorithms" }
    ],
    practicalMilestone: "Implement cycle detection in both directed and undirected graphs using DFS and Kahn's algorithm."
  },
  {
    id: 106,
    slug: "dsa-dynamic-programming",
    title: "6. Dynamic Programming & Memoization",
    trackId: "dsa",
    category: "Data Structures & Algorithms",
    summary: "Break down complex optimization problems with Optimal Substructure and Overlapping Subproblems: Top-Down Memoization vs Bottom-Up Tabulation.",
    duration: "3 - 4 Weeks",
    difficulty: "Advanced",
    prerequisites: ["Recursion, Backtracking & Time Complexity"],
    keyTopics: [
      "Overlapping Subproblems & Optimal Substructure",
      "Top-Down Memoization with Hash Map / Array",
      "Bottom-Up Tabulation & Space Optimization",
      "Classic Problems: 0/1 Knapsack, Coin Change, LIS",
      "Grid DP & Matrix Path Optimization"
    ],
    recommendedNotes: [
      { title: "Data Structures: Arrays, Hash Maps & Time Complexity (Big-O)", slug: "dsa-arrays-time-complexity" }
    ],
    practicalMilestone: "Solve 0/1 Knapsack and Longest Increasing Subsequence with space-optimized bottom-up DP."
  },

  // ═════════════════════════════════════════════════════════════
  // TRACK: Python, Data Science & AI
  // ═════════════════════════════════════════════════════════════
  {
    id: 201,
    slug: "ai-python-core-oop",
    title: "1. Python Core, Data Structures & Idiomatic OOP",
    trackId: "python-ai",
    category: "Python & AI",
    summary: "Master modern Python: syntax, list/dict comprehensions, decorators, generators with yield, dunder methods (__init__, __repr__), and type hints.",
    duration: "2 - 3 Weeks",
    difficulty: "Beginner",
    prerequisites: ["Basic Computer Literacy"],
    keyTopics: [
      "Python Idioms, PEP 8 & Virtual Environments (.venv)",
      "List, Set, and Dictionary Comprehensions",
      "Generators & Memory-Efficient Iterators (yield)",
      "Higher-Order Functions & Custom Decorators",
      "Classes, Inheritance & Dunder Methods"
    ],
    recommendedNotes: [
      { title: "Python Core Programming & Object-Oriented Design (OOP)", slug: "python-fundamentals-oop" }
    ],
    recommendedPdf: {
      title: "Python, Data Science & AI Engineering Guide",
      filename: "python-ai-essentials.pdf",
      fileUrl: "/pdfs/python-ai-essentials.pdf"
    },
    practicalMilestone: "Write a command-line data processing pipeline using custom Python decorators and memory-efficient generators."
  },
  {
    id: 202,
    slug: "ai-numpy-pandas-analysis",
    title: "2. Data Analysis with NumPy & Pandas",
    trackId: "python-ai",
    category: "Python & AI",
    summary: "Wrangle tabular and numerical data with NumPy multi-dimensional arrays, vectorized broadcasting, Pandas DataFrames, filtering, and missing data imputation.",
    duration: "3 - 4 Weeks",
    difficulty: "Beginner",
    prerequisites: ["Python Core Syntax"],
    keyTopics: [
      "NumPy ndarray Memory Contiguity & Vectorized Math",
      "Pandas Series & DataFrames Indexing (.loc / .iloc)",
      "Handling Missing Values (NaN dropna / fillna)",
      "Grouping & Aggregations (.groupby / .agg)",
      "Merging, Joining & Reshaping Data"
    ],
    recommendedNotes: [
      { title: "Introduction to Machine Learning, Pandas & Generative AI", slug: "ai-data-science-machine-learning" }
    ],
    practicalMilestone: "Clean, analyze, and aggregate a real-world dataset of 100,000+ rows using Pandas and export summary insights."
  },
  {
    id: 203,
    slug: "ai-machine-learning-algorithms",
    title: "3. Supervised & Unsupervised Machine Learning",
    trackId: "python-ai",
    category: "Python & AI",
    summary: "Learn core ML theory and practical modeling with Scikit-Learn: Linear/Logistic Regression, Decision Trees, Random Forests, K-Means Clustering, and Evaluation Metrics.",
    duration: "4 - 5 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Pandas, NumPy & Linear Algebra Basics"],
    keyTopics: [
      "Supervised vs Unsupervised vs Reinforcement Learning",
      "Linear Regression & Gradient Descent Optimization",
      "Logistic Regression, ROC-AUC, Precision & Recall",
      "Decision Trees & Random Forest Ensembles",
      "Train/Test Splits, K-Fold Cross-Validation & Overfitting"
    ],
    recommendedNotes: [
      { title: "Introduction to Machine Learning, Pandas & Generative AI", slug: "ai-data-science-machine-learning" }
    ],
    practicalMilestone: "Train, tune, and evaluate an end-to-end classification pipeline with Scikit-Learn achieving >85% F1-score."
  },
  {
    id: 204,
    slug: "ai-deep-learning-neural-nets",
    title: "4. Deep Learning & Neural Network Foundations",
    trackId: "python-ai",
    category: "Python & AI",
    summary: "Understand Artificial Neural Networks (ANN): forward propagation, activation functions (ReLU, Sigmoid, Softmax), loss functions, backpropagation, and PyTorch.",
    duration: "4 - 5 Weeks",
    difficulty: "Advanced",
    prerequisites: ["Calculus, Matrix Operations & ML Concepts"],
    keyTopics: [
      "Perceptrons & Multi-Layer Perceptrons (MLP)",
      "Activation Functions: ReLU, GELU, Sigmoid, Softmax",
      "Loss Functions: Cross-Entropy & Mean Squared Error",
      "Backpropagation & Adam Optimizer",
      "PyTorch Tensor Operations & Autograd Engine"
    ],
    recommendedNotes: [
      { title: "Introduction to Machine Learning, Pandas & Generative AI", slug: "ai-data-science-machine-learning" }
    ],
    practicalMilestone: "Train a custom image or text classifier neural network using PyTorch with GPU acceleration."
  },
  {
    id: 205,
    slug: "ai-llms-generative-ai",
    title: "5. Large Language Models (LLMs) & Generative AI",
    trackId: "python-ai",
    category: "Python & AI",
    summary: "Step into modern AI engineering: Transformer architecture, Self-Attention, Tokenization, Prompt Engineering, Vector Embeddings, RAG, and LangChain/LlamaIndex.",
    duration: "4 - 5 Weeks",
    difficulty: "Advanced",
    prerequisites: ["Deep Learning & Python API Integration"],
    keyTopics: [
      "Transformer Architecture & Multi-Head Self-Attention",
      "Tokenization, Context Windows & Temperature",
      "Advanced Prompt Engineering (Few-Shot, Chain-of-Thought)",
      "Vector Embeddings & Semantic Search (Pinecone / ChromaDB)",
      "Retrieval-Augmented Generation (RAG) Architecture"
    ],
    recommendedNotes: [
      { title: "Introduction to Machine Learning, Pandas & Generative AI", slug: "ai-data-science-machine-learning" }
    ],
    recommendedPdf: {
      title: "Python, Data Science & AI Engineering Guide",
      filename: "python-ai-essentials.pdf",
      fileUrl: "/pdfs/python-ai-essentials.pdf"
    },
    practicalMilestone: "Build a production RAG application that answers questions grounded in custom technical documents."
  },

  // ═════════════════════════════════════════════════════════════
  // TRACK: Computer Science Core (CS Fundamentals)
  // ═════════════════════════════════════════════════════════════
  {
    id: 301,
    slug: "cs-operating-systems-internals",
    title: "1. Operating Systems: Processes, Threads & CPU Scheduling",
    trackId: "cs-core",
    category: "Computer Science Core",
    summary: "Study OS kernels, process state lifecycles, multithreading, context switching overhead, and scheduling algorithms (Round Robin, SJF, Priority).",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Basic Programming & Computer Architecture"],
    keyTopics: [
      "Process Control Block (PCB) & Process States",
      "User Mode vs Kernel Mode & System Calls",
      "Multithreading, TCB & Thread Pool Architecture",
      "Context Switching Mechanics & CPU Overhead",
      "CPU Scheduling: Round Robin, SJF, Multilevel Queues"
    ],
    recommendedNotes: [
      { title: "Operating Systems: Processes, Threads, Scheduling & Memory", slug: "operating-systems-process-threads" }
    ],
    recommendedPdf: {
      title: "Operating Systems & Computer Networks Core Handbook",
      filename: "os-networking-handbook.pdf",
      fileUrl: "/pdfs/os-networking-handbook.pdf"
    },
    practicalMilestone: "Simulate Round Robin and SJF CPU scheduling algorithms in code and compare average turnaround times."
  },
  {
    id: 302,
    slug: "cs-concurrency-memory-paging",
    title: "2. Concurrency, Deadlocks & Virtual Memory",
    trackId: "cs-core",
    category: "Computer Science Core",
    summary: "Prevent race conditions with Mutexes & Semaphores, analyze the 4 Coffman deadlock conditions, and understand Virtual Memory, Paging, and Page Faults.",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Processes and Threads"],
    keyTopics: [
      "Critical Sections & Race Conditions",
      "Mutex Locks vs Counting Semaphores",
      "Deadlock: 4 Coffman Conditions & Banker's Algorithm",
      "Virtual Memory & Memory Management Unit (MMU)",
      "Paging, Page Tables, TLB & Page Replacement (LRU)"
    ],
    recommendedNotes: [
      { title: "Operating Systems: Processes, Threads, Scheduling & Memory", slug: "operating-systems-process-threads" }
    ],
    practicalMilestone: "Implement the Producer-Consumer synchronization problem using semaphores to eliminate race conditions."
  },
  {
    id: 303,
    slug: "cs-dbms-relational-normalization",
    title: "3. DBMS: Relational Schemas & Normalization",
    trackId: "cs-core",
    category: "Computer Science Core",
    summary: "Relational schema design, entity relationships (1:1, 1:N, N:M), foreign key integrity, and 1NF to BCNF normalization rules to prevent anomalies.",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Basic Set Theory & Logic"],
    keyTopics: [
      "Entity-Relationship (ER) Modeling",
      "Relational Model & Referential Integrity Constraints",
      "Functional Dependencies & Candidate Keys",
      "Normalization: 1NF, 2NF, 3NF & Boyce-Codd (BCNF)",
      "Insertion, Deletion, and Update Anomalies"
    ],
    recommendedNotes: [
      { title: "Database Management Systems (DBMS), SQL & Normalization", slug: "dbms-sql-relational-design" }
    ],
    recommendedPdf: {
      title: "Database Management Systems & SQL Handbook",
      filename: "dbms-sql-cheatsheet.pdf",
      fileUrl: "/pdfs/dbms-sql-cheatsheet.pdf"
    },
    practicalMilestone: "Normalize an unnormalized real-world e-commerce schema from unnormalized flat data up to 3NF."
  },
  {
    id: 304,
    slug: "cs-advanced-sql-indexing",
    title: "4. Advanced SQL, ACID & B-Tree Indexing",
    trackId: "cs-core",
    category: "Computer Science Core",
    summary: "Write production SQL with JOINs, Window Functions, and CTEs. Understand ACID guarantees, isolation levels, and B-Tree database indexing.",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Relational Database Basics"],
    keyTopics: [
      "Complex SQL JOINs, GROUP BY, HAVING & Subqueries",
      "Window Functions: ROW_NUMBER(), DENSE_RANK(), OVER",
      "ACID Transactions & Write-Ahead Logging (WAL)",
      "Transaction Isolation Levels (Dirty Read vs Phantom Read)",
      "B-Tree and B+ Tree Index Architecture & EXPLAIN Plans"
    ],
    recommendedNotes: [
      { title: "Database Management Systems (DBMS), SQL & Normalization", slug: "dbms-sql-relational-design" }
    ],
    practicalMilestone: "Analyze query execution using EXPLAIN ANALYZE and optimize a slow query from O(N) to O(log N) with composite indexing."
  },
  {
    id: 305,
    slug: "cs-networking-osi-tcp-sockets",
    title: "5. Computer Networks: OSI, TCP/IP & Socket Programming",
    trackId: "cs-core",
    category: "Computer Science Core",
    summary: "Understand the OSI 7-layer and TCP/IP models, TCP 3-way handshake vs UDP, IP subnetting, DNS resolution, and raw socket communication.",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Basic Operating System Principles"],
    keyTopics: [
      "OSI 7-Layer Model vs TCP/IP Protocol Suite",
      "TCP Handshake, Flow Control & Congestion Control",
      "UDP Datagrams for Low-Latency Streaming",
      "IPv4/IPv6 Addressing, Subnetting & CIDR Notation",
      "DNS Resolution Flow, Ports & TCP Socket Programming"
    ],
    recommendedNotes: [
      { title: "HTTP, HTTPS, Browsers & Web Servers", slug: "http-https-browsers-servers" },
      { title: "How the Internet Works & Web Architecture", slug: "how-the-internet-works" }
    ],
    recommendedPdf: {
      title: "Operating Systems & Computer Networks Core Handbook",
      filename: "os-networking-handbook.pdf",
      fileUrl: "/pdfs/os-networking-handbook.pdf"
    },
    practicalMilestone: "Write a client-server chat program using raw TCP sockets and inspect packets with Wireshark."
  },

  // ═════════════════════════════════════════════════════════════
  // TRACK: Cloud Computing & DevOps
  // ═════════════════════════════════════════════════════════════
  {
    id: 401,
    slug: "cloud-linux-terminal-bash",
    title: "1. Linux System Administration & Shell Scripting",
    trackId: "cloud-devops",
    category: "Cloud & DevOps",
    summary: "Command line fluency: file hierarchies, permissions (chmod/chown), processes (ps, kill, top), package managers, SSH keys, and Bash scripting.",
    duration: "2 - 3 Weeks",
    difficulty: "Beginner",
    prerequisites: ["Terminal Access"],
    keyTopics: [
      "Linux Filesystem Hierarchy (/etc, /var, /bin, /home)",
      "File Permissions, Users & Groups (chmod, chown)",
      "Process Management (ps, top, systemctl, kill)",
      "SSH Key Pairs & Secure Remote Server Access",
      "Bash Automation: Loops, Conditions, Variables & Crons"
    ],
    recommendedNotes: [
      { title: "Git & GitHub Essential Engineering Workflow", slug: "git-github-fundamentals" }
    ],
    practicalMilestone: "Write an automated Bash backup script that compresses log files and uploads them via SSH with cron scheduling."
  },
  {
    id: 402,
    slug: "cloud-docker-containerization-stage",
    title: "2. Docker & Containerization Architecture",
    trackId: "cloud-devops",
    category: "Cloud & DevOps",
    summary: "Package applications with Docker: image layers, multi-stage Dockerfiles, caching strategies, container lifecycles, and security best practices.",
    duration: "3 - 4 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Linux Command Line"],
    keyTopics: [
      "Containers vs Virtual Machines (Namespaces & cgroups)",
      "Docker Image Layers & Cache Optimization",
      "Writing Production Multi-Stage Dockerfiles",
      "Non-Root Users, Alpine/Distroless Security",
      "Docker Network Drivers (bridge, host, overlay)"
    ],
    recommendedNotes: [
      { title: "Docker & Containerization for Cloud DevOps Engineers", slug: "cloud-docker-containerization" }
    ],
    recommendedPdf: {
      title: "Docker & Cloud DevOps Production Guide",
      filename: "docker-devops-guide.pdf",
      fileUrl: "/pdfs/docker-devops-guide.pdf"
    },
    practicalMilestone: "Containerize a full-stack Next.js and Node.js application reducing image size from 1.2 GB to under 95 MB."
  },
  {
    id: 403,
    slug: "cloud-docker-compose-orchestration",
    title: "3. Multi-Container Orchestration with Docker Compose",
    trackId: "cloud-devops",
    category: "Cloud & DevOps",
    summary: "Coordinate microservices, PostgreSQL databases, and Redis caches using declarative docker-compose.yml files, healthchecks, and volume persistence.",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Docker Containerization"],
    keyTopics: [
      "Docker Compose YAML Syntax & Service Declarations",
      "Named Volumes for Persistent Database Storage",
      "Internal Network Bridges & Service Discovery",
      "Container Healthchecks & depend_on Conditions",
      "Environment Variable Management (.env files)"
    ],
    recommendedNotes: [
      { title: "Docker & Containerization for Cloud DevOps Engineers", slug: "cloud-docker-containerization" },
      { title: "Database Management Systems (DBMS), SQL & Normalization", slug: "dbms-sql-relational-design" }
    ],
    practicalMilestone: "Orchestrate an app service, PostgreSQL database, and Redis cache with zero manual network configuration."
  },
  {
    id: 404,
    slug: "cloud-cicd-github-actions",
    title: "4. Continuous Integration & Deployment (CI/CD)",
    trackId: "cloud-devops",
    category: "Cloud & DevOps",
    summary: "Automate code quality checks, unit tests, Docker builds, and deployment pipelines using GitHub Actions workflows and secret management.",
    duration: "3 - 4 Weeks",
    difficulty: "Intermediate",
    prerequisites: ["Git Workflows & Docker"],
    keyTopics: [
      "CI/CD Principles & Continuous Feedback Loops",
      "GitHub Actions Workflows, Jobs, Steps & Runners",
      "Automated Linting, Unit Testing & Static Analysis",
      "Building & Pushing Images to Docker Hub / GitHub Container Registry",
      "Secrets Management & Environment Secrets"
    ],
    recommendedNotes: [
      { title: "Git & GitHub Essential Engineering Workflow", slug: "git-github-fundamentals" },
      { title: "Docker & Containerization for Cloud DevOps Engineers", slug: "cloud-docker-containerization" }
    ],
    practicalMilestone: "Create a GitHub Actions CI/CD pipeline that automatically lints, tests, builds a Docker image, and triggers production deployment on git push."
  },
  {
    id: 405,
    slug: "cloud-aws-infrastructure",
    title: "5. Cloud Architecture (AWS) & Production Hosting",
    trackId: "cloud-devops",
    category: "Cloud & DevOps",
    summary: "Deploy scalable cloud systems on AWS: EC2 virtual servers, S3 object storage, RDS managed databases, VPC networking, CloudFront CDNs, and domains.",
    duration: "4 - 5 Weeks",
    difficulty: "Advanced",
    prerequisites: ["Networking Basics & Containerization"],
    keyTopics: [
      "AWS Core Infrastructure: Regions & Availability Zones",
      "Amazon EC2 Virtual Servers & Security Groups",
      "Amazon S3 Object Storage & Static Asset Hosting",
      "Amazon RDS Managed PostgreSQL & Read Replicas",
      "Virtual Private Cloud (VPC), Subnets & Route 53 DNS"
    ],
    recommendedNotes: [
      { title: "Next.js Metadata, Dynamic SEO & Deployment", slug: "nextjs-metadata-seo-deployment" },
      { title: "Docker & Containerization for Cloud DevOps Engineers", slug: "cloud-docker-containerization" }
    ],
    practicalMilestone: "Deploy a production application on cloud infrastructure with custom SSL certificates, CDN caching, and automated database backups."
  }
];

export function getAllRoadmapSteps(): RoadmapStep[] {
  return ROADMAP_STEPS;
}

export function getRoadmapStepBySlug(slug: string): RoadmapStep | undefined {
  return ROADMAP_STEPS.find((s) => s.slug === slug);
}

export function getRoadmapStepsByTrack(trackId: string): RoadmapStep[] {
  if (!trackId || trackId === "web-dev") {
    return ROADMAP_STEPS.filter((s) => !s.trackId || s.trackId === "web-dev");
  }
  return ROADMAP_STEPS.filter((s) => s.trackId === trackId);
}

export function getAllTracks(): RoadmapTrack[] {
  return ROADMAP_TRACKS;
}

export const ROADMAP_STAGES = ROADMAP_STEPS;


