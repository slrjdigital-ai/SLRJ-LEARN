export interface RoadmapStep {
  id: number;
  stepNumber: number;
  slug: string;
  title: string;
  trackId: string;
  category: string;
  summary: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  keyTopics: string[];
  practicalMilestone: string;
  recommendedNotes?: Array<{
    title: string;
    slug: string;
  }>;
}

export interface RoadmapTrack {
  id: string;
  name: string;
  badge: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  totalStages: number;
  totalLessons: number;
  duration: string;
  icon: string;
  skills: string[];
  gradient: string;
  accentColor: string;
  finalProject: {
    title: string;
    description: string;
  };
}

export const ROADMAP_TRACKS: RoadmapTrack[] = [
  {
    id: "frontend",
    name: "Frontend Web Developer",
    badge: "Most Popular",
    level: "Beginner",
    description: "Master modern user interfaces from Internet fundamentals and semantic HTML5 to advanced JavaScript, TypeScript, and React 19.",
    totalStages: 14,
    totalLessons: 42,
    duration: "4 - 6 Months",
    icon: "Globe",
    skills: ["HTML5 & Semantics", "CSS3 & Tailwind", "JavaScript (ES6+)", "TypeScript", "React 19", "Web APIs", "Git & GitHub", "Performance & A11y"],
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    accentColor: "text-cyan-400",
    finalProject: {
      title: "Production Portfolio & Interactive Web Platform",
      description: "Build, optimize, and deploy a responsive web application with dark mode, interactive API data fetching, and lighthouse score > 95."
    }
  },
  {
    id: "fullstack",
    name: "Full-Stack Developer",
    badge: "High Demand",
    level: "Intermediate",
    description: "Become a complete engineer. Build interactive React frontends, robust Node/Express backends, PostgreSQL databases, and secure APIs.",
    totalStages: 14,
    totalLessons: 56,
    duration: "6 - 8 Months",
    icon: "Layers",
    skills: ["React & Next.js", "Node.js & Express", "TypeScript", "PostgreSQL & SQL", "REST APIs", "JWT Authentication", "Backend Security", "Docker & CI/CD"],
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    accentColor: "text-indigo-400",
    finalProject: {
      title: "End-to-End SaaS Web Application",
      description: "Develop a full-stack SaaS platform with user authentication, database CRUD, payment integration, and cloud container deployment."
    }
  },
  {
    id: "python",
    name: "Python Developer",
    badge: "Beginner Friendly",
    level: "Beginner",
    description: "Learn Python from the ground up: syntax, data structures, object-oriented programming, automated scripting, APIs, and databases.",
    totalStages: 14,
    totalLessons: 45,
    duration: "3 - 5 Months",
    icon: "Code2",
    skills: ["Python 3", "Data Structures", "OOP Architecture", "File I/O", "Exception Handling", "FastAPI / Flask", "SQLite & PostgreSQL", "PyTest"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    accentColor: "text-emerald-400",
    finalProject: {
      title: "Practical Python Backend & Automation Tool",
      description: "Build an automated web scraping, API processing, and database persistence tool with unit tests and clean modular packaging."
    }
  },
  {
    id: "java",
    name: "Java Developer",
    badge: "Enterprise Standard",
    level: "Intermediate",
    description: "Master enterprise Java programming: object-oriented patterns, Collections, Generics, Streams, JDBC database connectivity, and JUnit.",
    totalStages: 14,
    totalLessons: 48,
    duration: "4 - 6 Months",
    icon: "Coffee",
    skills: ["Core Java 21", "OOP & Design Patterns", "Collections Framework", "Java Streams & Lambdas", "Generics", "JDBC & MySQL", "JUnit 5", "Maven & Build Tools"],
    gradient: "from-amber-500 via-orange-500 to-red-500",
    accentColor: "text-amber-400",
    finalProject: {
      title: "Enterprise Java Management Application",
      description: "Build a robust Java application with relational database persistence via JDBC, multithreaded processing, and comprehensive unit tests."
    }
  },
  {
    id: "ai-ml",
    name: "AI and Machine Learning",
    badge: "Cutting Edge",
    level: "Advanced",
    description: "Journey into artificial intelligence: linear algebra, NumPy, Pandas, supervised & unsupervised models, neural networks, and LLM APIs.",
    totalStages: 14,
    totalLessons: 52,
    duration: "5 - 7 Months",
    icon: "Sparkles",
    skills: ["Python for AI", "NumPy & Pandas", "Statistics & Probability", "Scikit-Learn", "Supervised Learning", "Deep Neural Networks", "Model Evaluation", "LLM APIs"],
    gradient: "from-violet-500 via-purple-500 to-pink-500",
    accentColor: "text-purple-400",
    finalProject: {
      title: "AI-Powered Predictive & Generative System",
      description: "Train, evaluate, and deploy an ML model combined with modern generative AI APIs to solve real-world classification or forecasting problems."
    }
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    badge: "Business Focus",
    level: "Beginner",
    description: "Transform raw data into strategic business decisions. Master Advanced Excel, SQL queries, Python data analysis, and Power BI dashboards.",
    totalStages: 13,
    totalLessons: 40,
    duration: "3 - 5 Months",
    icon: "BarChart3",
    skills: ["Advanced Excel", "SQL & Relational DBs", "Python & Pandas", "Data Cleaning", "Statistical Analysis", "Power BI / Tableau", "Exploratory Data Analysis", "Executive Storytelling"],
    gradient: "from-teal-500 via-cyan-500 to-blue-500",
    accentColor: "text-teal-400",
    finalProject: {
      title: "Interactive Business Analytics Dashboard",
      description: "Ingest messy business data, clean and model with SQL/Python, and deliver a live interactive executive KPI dashboard."
    }
  },
  {
    id: "mobile",
    name: "Mobile App Developer",
    badge: "Cross-Platform",
    level: "Intermediate",
    description: "Build and publish cross-platform iOS and Android mobile apps using modern component architecture, native device APIs, and app stores.",
    totalStages: 14,
    totalLessons: 46,
    duration: "4 - 6 Months",
    icon: "Smartphone",
    skills: ["React Native / Flutter", "Mobile UI/UX", "Component Navigation", "State Management", "Native Device APIs", "Offline Storage", "Push Notifications", "App Store & Play Store"],
    gradient: "from-rose-500 via-pink-500 to-purple-500",
    accentColor: "text-rose-400",
    finalProject: {
      title: "Cross-Platform Mobile Application",
      description: "Architect, test, and package a production-ready mobile application with offline synchronization, camera/GPS access, and app store bundles."
    }
  }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  // ══════════════════════════════════════════════════════════════════
  // PATH 1: FRONTEND WEB DEVELOPER (14 Stages)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 1,
    stepNumber: 1,
    trackId: "frontend",
    slug: "frontend-internet-web-fundamentals",
    title: "1. Internet and Web Fundamentals",
    category: "Foundations",
    summary: "Understand how the global internet works, how browsers request and render pages, and the roles of DNS, IP addresses, and HTTP/HTTPS.",
    duration: "1 - 2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["How the Internet Works (TCP/IP & Packets)", "DNS Resolution & IP Addressing", "Client-Server Request-Response Cycle", "HTTP/HTTPS Protocols & Status Codes", "Browser Rendering Engine (DOM & CSSOM Tree)"],
    practicalMilestone: "Inspect a network request in Chrome DevTools Network tab, trace DNS resolution, and analyze HTTP status codes.",
    recommendedNotes: [{ title: "How the Internet Works & Web Architecture", slug: "how-the-internet-works" }, { title: "HTTP, HTTPS, Browsers & Web Servers", slug: "http-https-browsers-servers" }]
  },
  {
    id: 2,
    stepNumber: 2,
    trackId: "frontend",
    slug: "frontend-html-fundamentals",
    title: "2. HTML Fundamentals",
    category: "Markup",
    summary: "Master HTML5 document structure, semantic tags, accessible forms, tables, media elements, and SEO metadata.",
    duration: "1 - 2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["Document Structure (<!DOCTYPE html>, <html>, <head>, <body>)", "Semantic Elements (<header>, <nav>, <main>, <article>, <footer>)", "Accessible Web Forms & Input Validation", "Images, Audio, and Video Elements", "Meta Tags & Essential SEO Guidelines"],
    practicalMilestone: "Build a multi-page semantic portfolio structure with accessible forms, tables, and valid HTML5 syntax without CSS.",
    recommendedNotes: [{ title: "HTML5 Document Structure & Best Practices", slug: "html-basics-document-structure" }, { title: "Semantic HTML & Accessibility Guide", slug: "semantic-html-complete-guide" }]
  },
  {
    id: 3,
    stepNumber: 3,
    trackId: "frontend",
    slug: "frontend-css-fundamentals",
    title: "3. CSS Fundamentals",
    category: "Styling",
    summary: "Style web pages with CSS3. Master the Box Model, selectors, specificity, colors, typography, and visual hierarchy.",
    duration: "2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["CSS Selectors, Specificity & The Cascade", "The CSS Box Model (Margin, Border, Padding, Content)", "Box-Sizing: border-box Architecture", "Typography, Google Fonts & Color Spaces", "Positioning: Static, Relative, Absolute, Fixed, Sticky"],
    practicalMilestone: "Style an elegant magazine article card layout with custom typography, clean spacing, and drop shadows.",
    recommendedNotes: [{ title: "CSS Selectors, Specificity & Box Model", slug: "css-selectors-specificity-box-model" }]
  },
  {
    id: 4,
    stepNumber: 4,
    trackId: "frontend",
    slug: "frontend-responsive-web-design",
    title: "4. Responsive Web Design",
    category: "Layouts",
    summary: "Build flexible, mobile-first websites using CSS Flexbox, CSS Grid, media queries, and fluid layout units.",
    duration: "2 - 3 Weeks",
    difficulty: "Beginner",
    keyTopics: ["Flexbox Architecture (Main Axis, Cross Axis, Alignment)", "CSS Grid Layout (grid-template, auto-fit, minmax)", "Mobile-First Media Queries & Breakpoints", "Fluid Typography & Viewport Units (vw, vh, clamp)", "Responsive Images with <picture> & srcset"],
    practicalMilestone: "Build a fully responsive e-commerce product landing page with mobile drawer navigation and CSS Grid catalog.",
    recommendedNotes: [{ title: "Mastering CSS Flexbox & Grid Layouts", slug: "css-flexbox-grid-mastery" }, { title: "Responsive Design, Media Queries & Animations", slug: "responsive-design-media-queries-animations" }]
  },
  {
    id: 5,
    stepNumber: 5,
    trackId: "frontend",
    slug: "frontend-javascript-fundamentals",
    title: "5. JavaScript Fundamentals",
    category: "Programming",
    summary: "Learn the core programming fundamentals of JavaScript: variables, data types, operators, conditionals, and loops.",
    duration: "2 - 3 Weeks",
    difficulty: "Beginner",
    keyTopics: ["Variables (const, let), Primitives & Reference Types", "Type Coercion & Strict Equality (=== vs ==)", "Conditionals (if/else, switch, ternary)", "Loops (for, while, for...of, for...in)", "Functions, Parameters, Return Values & Scope"],
    practicalMilestone: "Create a browser-based algorithmic quiz game that tracks user score and validates input logic.",
    recommendedNotes: [{ title: "JavaScript Variables, Data Types & Operators", slug: "javascript-variables-data-types-operators" }, { title: "Functions, Arrays & Object Manipulation in JS", slug: "javascript-functions-arrays-objects" }]
  },
  {
    id: 6,
    stepNumber: 6,
    trackId: "frontend",
    slug: "frontend-dom-manipulation-events",
    title: "6. DOM Manipulation and Events",
    category: "Interactivity",
    summary: "Connect JavaScript to the browser interface. Select elements, modify HTML/CSS dynamically, and handle user events.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Selecting Elements (querySelector, getElementById)", "Modifying Text, HTML, Attributes, and ClassLists", "Event Listeners, Event Object & Event Delegation", "Form Submit Handling & preventDefault()", "Browser Storage (localStorage & sessionStorage)"],
    practicalMilestone: "Build a complete interactive Task Manager app with localStorage persistence, drag reordering, and item filtering.",
    recommendedNotes: [{ title: "DOM Manipulation & Event Handling Guide", slug: "dom-manipulation-events-guide" }]
  },
  {
    id: 7,
    stepNumber: 7,
    trackId: "frontend",
    slug: "frontend-git-and-github",
    title: "7. Git and GitHub",
    category: "Developer Tools",
    summary: "Track project changes, manage branches, handle merge conflicts, and collaborate with teams using Git and GitHub.",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["Git Workflow (Working Tree, Staging Area, Local Commit)", "Daily Commands (git status, add, commit, push, pull)", "Branching, Merging & Resolving Merge Conflicts", "GitHub Pull Requests, Issues & Code Reviews", ".gitignore Best Practices for Web Projects"],
    practicalMilestone: "Create a GitHub repository for your projects, branch features, open a pull request, and merge cleanly.",
    recommendedNotes: [{ title: "Git, GitHub & Professional Collaboration", slug: "git-github-collaboration-guide" }]
  },
  {
    id: 8,
    stepNumber: 8,
    trackId: "frontend",
    slug: "frontend-advanced-javascript",
    title: "8. Advanced JavaScript",
    category: "Core JS",
    summary: "Dive deep into modern JavaScript: closures, prototypes, asynchronous programming, Promises, and the Event Loop.",
    duration: "3 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Closures, Lexical Environment & Higher-Order Functions", "Object Prototypes & ES6 Classes", "The Event Loop, Microtasks & Call Stack", "Promises, Promise Chaining & Error Handling", "ES6+ Destructuring, Rest/Spread, and Modules"],
    practicalMilestone: "Implement a custom debounce/throttle utility function and an asynchronous search autocompleter from scratch.",
    recommendedNotes: [{ title: "JavaScript Promises, Async/Await & Fetching", slug: "javascript-promises-async-await" }]
  },
  {
    id: 9,
    stepNumber: 9,
    trackId: "frontend",
    slug: "frontend-typescript",
    title: "9. TypeScript",
    category: "Type Safety",
    summary: "Add static types to JavaScript to catch bugs early, write self-documenting code, and scale enterprise applications.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["TypeScript Setup & tsconfig.json Configuration", "Basic Types, Union Types & Literal Types", "Interfaces vs Type Aliases", "Generics & Generic Functions", "Type Narrowing, Discriminated Unions & Utility Types"],
    practicalMilestone: "Refactor a vanilla JavaScript utility library into strictly-typed TypeScript with zero 'any' warnings.",
    recommendedNotes: [{ title: "Modern JavaScript & TypeScript Fundamentals", slug: "modern-javascript-typescript" }]
  },
  {
    id: 10,
    stepNumber: 10,
    trackId: "frontend",
    slug: "frontend-react",
    title: "10. React",
    category: "UI Framework",
    summary: "Master component-driven frontend development with React 19: JSX, props, state, hooks, and lifecycle management.",
    duration: "4 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["JSX Syntax & Component Decomposition", "Props & State Management with useState", "Side Effects & Lifecycle with useEffect", "Custom Hooks for Reusable Logic", "Component Composition & Context API"],
    practicalMilestone: "Build a multi-view interactive dashboard with dark mode toggle, global filter state, and custom hooks.",
    recommendedNotes: [{ title: "React Components, Props & State Mastery", slug: "react-components-props-state" }, { title: "React Hooks Deep Dive: useState, useEffect & Custom Hooks", slug: "react-hooks-deep-dive" }]
  },
  {
    id: 11,
    stepNumber: 11,
    trackId: "frontend",
    slug: "frontend-apis-and-data-fetching",
    title: "11. APIs and Data Fetching",
    category: "Data",
    summary: "Connect frontend applications to live backends: RESTful APIs, fetch, async/await, caching, loading states, and error handling.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["REST API Architecture & HTTP Verbs (GET, POST, PUT, DELETE)", "Fetch API with Async/Await & Try/Catch", "Handling Loading Spinners, Skeletons & Error Boundaries", "URL Query Parameters & Pagination Logic", "TanStack React Query or SWR for Caching"],
    practicalMilestone: "Build a real-time Crypto & Market Tracker fetching external live APIs with search, pagination, and toast alerts.",
    recommendedNotes: [{ title: "REST APIs & Backend Integration in Next.js", slug: "rest-apis-crud-handlers" }]
  },
  {
    id: 12,
    stepNumber: 12,
    trackId: "frontend",
    slug: "frontend-web-performance-accessibility",
    title: "12. Web Performance and Accessibility",
    category: "Optimization",
    summary: "Optimize Core Web Vitals (LCP, FID, CLS), asset compression, lazy loading, keyboard navigation, and WCAG accessibility.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Core Web Vitals & Lighthouse Audit Scoring", "Image Optimization (WebP/AVIF, lazy loading)", "Code Splitting & Dynamic Imports", "WCAG 2.1 AA Compliance & Screen Reader Testing", "Keyboard Accessibility & Focus Traps"],
    practicalMilestone: "Audit and optimize an existing frontend project to achieve a 95+ score on all Google Lighthouse categories.",
    recommendedNotes: [{ title: "Next.js Metadata, Dynamic SEO & Deployment", slug: "nextjs-metadata-seo-deployment" }]
  },
  {
    id: 13,
    stepNumber: 13,
    trackId: "frontend",
    slug: "frontend-deployment",
    title: "13. Deployment",
    category: "DevOps",
    summary: "Deploy frontend applications to the cloud using Vercel, Netlify, or GitHub Pages with custom domains and SSL.",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["Production Build Optimization (npm run build)", "Deploying to Vercel and Netlify", "Configuring Custom Domains & DNS CNAME records", "SSL / HTTPS Setup & Security Headers", "Environment Variables (.env.production)"],
    practicalMilestone: "Deploy a live production React application with custom domain, continuous deployment, and preview branches.",
    recommendedNotes: [{ title: "Next.js Metadata, Dynamic SEO & Deployment", slug: "nextjs-metadata-seo-deployment" }]
  },
  {
    id: 14,
    stepNumber: 14,
    trackId: "frontend",
    slug: "frontend-final-project",
    title: "14. Final Project: Build and Deploy a Professional Website",
    category: "Capstone",
    summary: "Synthesize all skills into a flagship production-grade web application to showcase to recruiters and clients.",
    duration: "3 - 4 Weeks",
    difficulty: "Advanced",
    keyTopics: ["Project Scoping, Wireframing & Design Systems", "Responsive React + TypeScript Implementation", "RESTful Data Integration & State Architecture", "Comprehensive Accessibility & Cross-Browser Testing", "Production CI/CD Deployment with Live URL & GitHub Readme"],
    practicalMilestone: "Deploy a full-fledged showcase website with responsive layouts, dark/light theme, interactive APIs, and custom domain.",
    recommendedNotes: [{ title: "Next.js App Router, Server Components & Layouts", slug: "nextjs-app-router-layouts" }]
  },

  // ══════════════════════════════════════════════════════════════════
  // PATH 2: FULL-STACK DEVELOPER (14 Stages)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 21,
    stepNumber: 1,
    trackId: "fullstack",
    slug: "fullstack-html-and-css",
    title: "1. HTML and CSS",
    category: "Frontend Basics",
    summary: "Establish strong foundations in semantic HTML5 markup, modern CSS3 layouts, Flexbox, and CSS Grid.",
    duration: "2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["Semantic HTML5 Structure", "CSS Box Model & Specificity", "Flexbox & CSS Grid Systems", "Responsive Mobile-First Design", "Modern CSS Variables"],
    practicalMilestone: "Build a responsive dashboard landing page with responsive navigation and grid cards.",
    recommendedNotes: [{ title: "Semantic HTML & Accessibility Guide", slug: "semantic-html-complete-guide" }]
  },
  {
    id: 22,
    stepNumber: 2,
    trackId: "fullstack",
    slug: "fullstack-javascript",
    title: "2. JavaScript",
    category: "Language Core",
    summary: "Master modern ECMAScript: variables, functions, closures, DOM manipulation, Promises, and asynchronous programming.",
    duration: "3 Weeks",
    difficulty: "Beginner",
    keyTopics: ["ES6+ Syntax & Array Methods", "Asynchronous JavaScript & Promises", "Async/Await & Error Handling", "DOM Events & Local Storage", "Modular Code Organization"],
    practicalMilestone: "Build a client-side note taking application with tags, search, and browser persistence.",
    recommendedNotes: [{ title: "JavaScript Promises, Async/Await & Fetching", slug: "javascript-promises-async-await" }]
  },
  {
    id: 23,
    stepNumber: 3,
    trackId: "fullstack",
    slug: "fullstack-typescript",
    title: "3. TypeScript",
    category: "Type Safety",
    summary: "Implement static typing across both frontend and backend for robust, self-documenting codebases.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Types, Interfaces & Generics", "Strict TypeScript Compiler Configuration", "Sharing Types Across Frontend & Backend", "Utility Types & Discriminated Unions"],
    practicalMilestone: "Create shared TypeScript data contracts and DTO schemas for a REST API client.",
    recommendedNotes: [{ title: "Modern JavaScript & TypeScript Fundamentals", slug: "modern-javascript-typescript" }]
  },
  {
    id: 24,
    stepNumber: 4,
    trackId: "fullstack",
    slug: "fullstack-git-and-github",
    title: "4. Git and GitHub",
    category: "Collaboration",
    summary: "Work like professional software engineering teams: branching models, code reviews, and Git workflows.",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["Feature Branching & Pull Requests", "Merge vs Rebase Strategies", "Resolving Conflicts Cleanly", "GitHub Actions Introduction"],
    practicalMilestone: "Configure a multi-branch repository with protected main branch and automated PR checks.",
    recommendedNotes: [{ title: "Git, GitHub & Professional Collaboration", slug: "git-github-collaboration-guide" }]
  },
  {
    id: 25,
    stepNumber: 5,
    trackId: "fullstack",
    slug: "fullstack-react",
    title: "5. React",
    category: "Frontend UI",
    summary: "Build component-driven single-page and server-rendered web applications with React 19.",
    duration: "3 - 4 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["React 19 Components & Hooks", "State Management & Context API", "Form Handling & Validation", "Client-side Routing & Navigation"],
    practicalMilestone: "Build an interactive e-commerce catalog with search, cart management, and checkout simulation.",
    recommendedNotes: [{ title: "React Components, Props & State Mastery", slug: "react-components-props-state" }]
  },
  {
    id: 26,
    stepNumber: 6,
    trackId: "fullstack",
    slug: "fullstack-nodejs",
    title: "6. Node.js",
    category: "Backend Runtime",
    summary: "Understand server-side JavaScript with the Node.js runtime: event-driven architecture, file system, streams, and modules.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Node.js Event Loop & Non-Blocking I/O", "CommonJS vs ES Modules", "Built-in Modules (fs, path, http, crypto)", "Package Management with npm/pnpm"],
    practicalMilestone: "Build a Node.js CLI tool that parses logs, aggregates statistics, and outputs a JSON report.",
    recommendedNotes: [{ title: "Frontend vs Backend: Roles & Architecture", slug: "frontend-vs-backend" }]
  },
  {
    id: 27,
    stepNumber: 7,
    trackId: "fullstack",
    slug: "fullstack-expressjs",
    title: "7. Express.js",
    category: "Backend Framework",
    summary: "Create scalable backend web servers and routing architecture with Express.js.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Express Server Setup & Application Architecture", "Routing & Route Parameters", "Custom & Third-Party Middleware", "Centralized Error Handling Middleware"],
    practicalMilestone: "Develop a structured Express backend with route controllers, logging middleware, and input sanitization.",
    recommendedNotes: [{ title: "REST APIs & Backend Integration in Next.js", slug: "rest-apis-crud-handlers" }]
  },
  {
    id: 28,
    stepNumber: 8,
    trackId: "fullstack",
    slug: "fullstack-rest-apis",
    title: "8. REST APIs",
    category: "API Design",
    summary: "Design and implement production RESTful APIs with proper HTTP verbs, status codes, pagination, and filtering.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["REST Principles & Resource Modeling", "HTTP Methods (GET, POST, PUT, PATCH, DELETE)", "Query Parameters, Pagination & Sorting", "API Documentation with Swagger / OpenAPI"],
    practicalMilestone: "Build and document a full CRUD REST API for a blog or project management system.",
    recommendedNotes: [{ title: "REST APIs & Backend Integration in Next.js", slug: "rest-apis-crud-handlers" }]
  },
  {
    id: 29,
    stepNumber: 9,
    trackId: "fullstack",
    slug: "fullstack-sql-and-postgresql",
    title: "9. SQL and PostgreSQL",
    category: "Databases",
    summary: "Master relational database modeling, normalization, complex SQL joins, indexing, and ORMs like Prisma.",
    duration: "3 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Relational Schema Design & Normalization", "SQL Queries (SELECT, INSERT, UPDATE, DELETE)", "JOINs (INNER, LEFT, RIGHT), Aggregations & GROUP BY", "Database Indexes & Performance Tuning", "Prisma ORM for Type-Safe Database Access"],
    practicalMilestone: "Design a relational database schema for an online marketplace with tables for users, orders, and products.",
    recommendedNotes: [{ title: "SQL & Relational Databases", slug: "sql-and-relational-databases" }]
  },
  {
    id: 30,
    stepNumber: 10,
    trackId: "fullstack",
    slug: "fullstack-authentication-and-authorization",
    title: "10. Authentication and Authorization",
    category: "Security",
    summary: "Implement secure user authentication with password hashing (bcrypt), JSON Web Tokens (JWT), sessions, and role-based access control.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Password Hashing with Bcrypt & Salts", "JSON Web Tokens (JWT) vs Cookie Sessions", "Refresh Token Rotation & Security", "Role-Based Access Control (RBAC)", "OAuth2 & Google Social Sign-In"],
    practicalMilestone: "Build a complete Auth service with user registration, email verification, JWT login, and admin guard middleware.",
    recommendedNotes: [{ title: "REST APIs & Backend Integration in Next.js", slug: "rest-apis-crud-handlers" }]
  },
  {
    id: 31,
    stepNumber: 11,
    trackId: "fullstack",
    slug: "fullstack-backend-security",
    title: "11. Backend Security",
    category: "Security",
    summary: "Defend your applications against OWASP Top 10 vulnerabilities: SQL injection, XSS, CSRF, rate limiting, and CORS.",
    duration: "1 - 2 Weeks",
    difficulty: "Advanced",
    keyTopics: ["OWASP Top 10 Vulnerabilities Overview", "SQL Injection Prevention & Parameterized Queries", "Cross-Origin Resource Sharing (CORS) Configuration", "Rate Limiting & Helmet Security Headers", "Input Validation & Sanitization with Zod"],
    practicalMilestone: "Secure an existing Express backend with Helmet headers, strict CORS rules, rate-limiting, and Zod input validation.",
    recommendedNotes: [{ title: "Frontend vs Backend: Roles & Architecture", slug: "frontend-vs-backend" }]
  },
  {
    id: 32,
    stepNumber: 12,
    trackId: "fullstack",
    slug: "fullstack-testing-and-debugging",
    title: "12. Testing and Debugging",
    category: "Quality Assurance",
    summary: "Write automated tests across the pyramid: Unit tests, Integration tests with Supertest, and End-to-End tests with Playwright.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Testing Pyramid & Test-Driven Development (TDD)", "Unit Testing with Vitest / Jest", "API Integration Testing with Supertest", "Database Mocking & Test Isolation", "Debugging Techniques with Chrome DevTools & VS Code"],
    practicalMilestone: "Write a complete test suite for your backend authentication and CRUD routes with > 80% code coverage.",
    recommendedNotes: [{ title: "Modern JavaScript & TypeScript Fundamentals", slug: "modern-javascript-typescript" }]
  },
  {
    id: 33,
    stepNumber: 13,
    trackId: "fullstack",
    slug: "fullstack-deployment-and-hosting",
    title: "13. Deployment and Hosting",
    category: "DevOps",
    summary: "Package applications in Docker containers, configure environment variables, and deploy to cloud platforms like Render or AWS.",
    duration: "2 Weeks",
    difficulty: "Advanced",
    keyTopics: ["Docker Containerization & Dockerfile Best Practices", "Docker Compose for Multi-Container Apps (App + DB)", "Cloud Hosting (Vercel, Render, Railway, AWS)", "Continuous Integration / Continuous Delivery (CI/CD) with GitHub Actions"],
    practicalMilestone: "Containerize a React + Node + PostgreSQL application with Docker Compose and deploy to a cloud server.",
    recommendedNotes: [{ title: "Next.js Metadata, Dynamic SEO & Deployment", slug: "nextjs-metadata-seo-deployment" }]
  },
  {
    id: 34,
    stepNumber: 14,
    trackId: "fullstack",
    slug: "fullstack-final-project",
    title: "14. Final Project: Build a Complete Full-Stack Application",
    category: "Capstone",
    summary: "Build and deploy a full-scale production application with React frontend, Node/Express backend, PostgreSQL database, and auth.",
    duration: "4 Weeks",
    difficulty: "Advanced",
    keyTopics: ["Full-Stack Architecture & System Design", "Interactive React UI with State Management", "Secure REST API with JWT Authentication", "Relational Database with Prisma ORM", "Live Cloud Deployment with Custom Domain"],
    practicalMilestone: "Deploy a full-stack SaaS platform (e.g. Issue Tracker or Project Workspace) with authentication and live database.",
    recommendedNotes: [{ title: "Next.js App Router, Server Components & Layouts", slug: "nextjs-app-router-layouts" }]
  },

  // ══════════════════════════════════════════════════════════════════
  // PATH 3: PYTHON DEVELOPER (14 Stages)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 41,
    stepNumber: 1,
    trackId: "python",
    slug: "python-installation-and-setup",
    title: "1. Python Installation and Setup",
    category: "Getting Started",
    summary: "Install Python 3, configure virtual environments (venv), learn the interactive REPL, and set up modern VS Code tooling.",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["Python 3 Installation on Windows/Mac/Linux", "The Interactive Python REPL & Running Scripts", "Virtual Environments (venv / poetry)", "VS Code Python Extensions, Linting & Black Formatter"],
    practicalMilestone: "Set up a clean virtual environment and write your first multi-file Python executable script.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 42,
    stepNumber: 2,
    trackId: "python",
    slug: "python-variables-and-data-types",
    title: "2. Variables and Data Types",
    category: "Syntax Basics",
    summary: "Understand Python dynamic typing: integers, floats, booleans, strings, NoneType, and type conversion.",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["Variables & Python Naming Conventions (PEP 8)", "Numeric Types: int, float, complex", "Booleans & Truthy/Falsy Evaluation", "String Basics, Indexing, Slicing & f-strings", "Type Casting (int(), str(), float())"],
    practicalMilestone: "Build a currency converter and tip calculator that safely accepts and casts user input.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 43,
    stepNumber: 3,
    trackId: "python",
    slug: "python-operators-and-expressions",
    title: "3. Operators and Expressions",
    category: "Core Logic",
    summary: "Work with arithmetic, assignment, comparison, logical, identity (is), and membership (in) operators.",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["Arithmetic Operators (+, -, *, /, //, %, **)", "Comparison Operators (==, !=, >, <, >=, <=)", "Logical Operators (and, or, not)", "Identity Operators (is, is not) vs Equality (==)", "Membership Operators (in, not in)"],
    practicalMilestone: "Implement an evaluation engine that parses math expressions and validates boundary conditions.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 44,
    stepNumber: 4,
    trackId: "python",
    slug: "python-conditions-and-loops",
    title: "4. Conditions and Loops",
    category: "Control Flow",
    summary: "Control code execution flow with if/elif/else statements, for loops, while loops, break, and continue.",
    duration: "1 - 2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["if, elif, else Conditional Branching", "for Loops with range() and Enumeration", "while Loops & Sentinel Values", "Loop Control: break, continue, pass", "Nested Loops & Algorithmic Patterns"],
    practicalMilestone: "Build a command-line Number Guessing Game with difficulty levels, hints, and guess limits.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 45,
    stepNumber: 5,
    trackId: "python",
    slug: "python-functions",
    title: "5. Functions",
    category: "Modularity",
    summary: "Write clean, reusable functions with positional arguments, keyword arguments, *args, **kwargs, and return statements.",
    duration: "2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["Function Definition & Return Values", "Positional vs Keyword Arguments", "Default Parameters & Mutable Defaults Pitfall", "*args and **kwargs for Variable Arguments", "Docstrings, Type Hints & Lambda Functions"],
    practicalMilestone: "Create a modular text formatting and validation utility package with type hints and docstrings.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 46,
    stepNumber: 6,
    trackId: "python",
    slug: "python-strings-and-collections",
    title: "6. Strings and Collections",
    category: "Data Structures",
    summary: "Master Python built-in collections: Lists, Tuples, Sets, and Dictionaries, plus powerful list comprehensions.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Lists: Methods, Slicing & List Comprehensions", "Tuples: Immutability & Tuple Unpacking", "Sets: Uniqueness & Set Operations (Union, Intersection)", "Dictionaries: Key-Value Mapping & Dict Comprehensions", "collections Module: Counter, defaultdict, namedtuple"],
    practicalMilestone: "Build an inventory management program that aggregates, filters, and reports stock items using dictionaries.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 47,
    stepNumber: 7,
    trackId: "python",
    slug: "python-object-oriented-programming",
    title: "7. Object-Oriented Programming",
    category: "OOP",
    summary: "Model real-world entities using Classes, Objects, __init__ constructors, Inheritance, Encapsulation, and Magic Methods.",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Classes, Instances & the self Keyword", "Constructors (__init__) & Instance Attributes", "Class Attributes vs Instance Attributes", "Inheritance, super() & Method Overriding", "Dunder/Magic Methods (__str__, __repr__, __len__, __eq__)"],
    practicalMilestone: "Design an Object-Oriented Banking System with accounts, interest rates, transactions, and overdraft limits.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 48,
    stepNumber: 8,
    trackId: "python",
    slug: "python-file-handling",
    title: "8. File Handling",
    category: "I/O",
    summary: "Read, write, and process text, CSV, and JSON files safely using Python context managers (with open).",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["Opening Files: 'r', 'w', 'a' Modes", "Context Managers (with open() as f:)", "Reading & Writing CSV with csv.reader / csv.DictWriter", "JSON Serialization & Deserialization (json.dump / json.load)", "pathlib Module for Cross-Platform File Paths"],
    practicalMilestone: "Build a CSV-to-JSON reporting tool that reads financial records, calculates totals, and saves output.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 49,
    stepNumber: 9,
    trackId: "python",
    slug: "python-exceptions-and-debugging",
    title: "9. Exceptions and Debugging",
    category: "Reliability",
    summary: "Handle runtime errors gracefully using try, except, else, finally, and custom exception classes.",
    duration: "1 Week",
    difficulty: "Intermediate",
    keyTopics: ["Built-in Exceptions (ValueError, KeyError, TypeError)", "try, except, else, finally Blocks", "Raising Exceptions with raise", "Defining Custom Exception Classes", "Debugging with pdb & Python Logging Module"],
    practicalMilestone: "Refactor a file-processing script to gracefully catch corrupted data, log errors, and recover without crashing.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 50,
    stepNumber: 10,
    trackId: "python",
    slug: "python-modules-and-packages",
    title: "10. Modules and Packages",
    category: "Architecture",
    summary: "Organize large codebases with modules, packages, __init__.py files, imports, and pip dependency management.",
    duration: "1 Week",
    difficulty: "Intermediate",
    keyTopics: ["Creating & Importing Custom Modules", "Packages & Package Structure (__init__.py)", "The Python Standard Library (math, random, datetime, os, sys)", "Pip, requirements.txt & pyproject.toml", "Publishing Reusable Packages"],
    practicalMilestone: "Package a modular utility library with structured folders, README, and dependency configuration.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 51,
    stepNumber: 11,
    trackId: "python",
    slug: "python-apis-and-http-requests",
    title: "11. APIs and HTTP Requests",
    category: "Networking",
    summary: "Interact with external web services using the requests library, parse JSON payloads, and handle authentication headers.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["The requests Library (GET, POST, headers, params)", "Parsing Nested JSON Responses", "Handling HTTP Status Codes & Timeouts", "API Key Authentication & Environment Variables (python-dotenv)", "Building Lightweight REST Endpoints with FastAPI"],
    practicalMilestone: "Build a Weather & News Aggregator CLI that fetches data from 2 external APIs and displays a formatted summary.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 52,
    stepNumber: 12,
    trackId: "python",
    slug: "python-testing",
    title: "12. Testing",
    category: "Quality",
    summary: "Ensure code correctness and prevent regressions using pytest, test fixtures, assertions, and mocks.",
    duration: "1 - 2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Unit Testing Fundamentals & Why Testing Matters", "Writing Test Cases with pytest", "pytest Fixtures for Setup & Teardown", "Mocking External Services with unittest.mock", "Measuring Code Coverage with pytest-cov"],
    practicalMilestone: "Write a complete pytest test suite with fixtures and mocking for an API client class.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 53,
    stepNumber: 13,
    trackId: "python",
    slug: "python-database-integration",
    title: "13. Database Integration",
    category: "Persistence",
    summary: "Connect Python to databases: SQLite, PostgreSQL, parameterized SQL execution, and SQLAlchemy ORM.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["SQLite Integration with sqlite3 Module", "Executing SQL Queries & Preventing SQL Injection", "PostgreSQL Connectivity with psycopg2", "SQLAlchemy Core & ORM Models", "Database Migrations with Alembic"],
    practicalMilestone: "Build a Persistent Contact & CRM manager in Python using SQLite and SQLAlchemy ORM.",
    recommendedNotes: [{ title: "SQL & Relational Databases", slug: "sql-and-relational-databases" }]
  },
  {
    id: 54,
    stepNumber: 14,
    trackId: "python",
    slug: "python-final-project",
    title: "14. Final Project: Build a Practical Python Application",
    category: "Capstone",
    summary: "Synthesize your Python skills into a complete application (REST API backend, web scraper, or automation suite).",
    duration: "3 - 4 Weeks",
    difficulty: "Advanced",
    keyTopics: ["Application Architecture & Code Organization", "FastAPI / Flask Backend with Database Storage", "Comprehensive Exception Handling & Logging", "Full Test Suite with pytest (> 85% coverage)", "Documentation & Deployment on Cloud"],
    practicalMilestone: "Build and deploy an automated Task & Web Analytics API with PostgreSQL storage, authentication, and tests.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },

  // ══════════════════════════════════════════════════════════════════
  // PATH 4: JAVA DEVELOPER (14 Stages)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 61,
    stepNumber: 1,
    trackId: "java",
    slug: "java-setup-and-fundamentals",
    title: "1. Java Setup and Fundamentals",
    category: "Foundations",
    summary: "Install the Java Development Kit (JDK 21), configure environment variables, understand the JVM/JRE, and compile your first class.",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["JDK, JRE & JVM Architecture", "Bytecode & the Write Once, Run Anywhere Philosophy", "Compiling & Running (javac & java)", "IntelliJ IDEA / Eclipse IDE Setup", "Structure of a Java Class & public static void main"],
    practicalMilestone: "Configure JDK 21 and run a multi-class console program demonstrating class structure and compilation.",
    recommendedNotes: [{ title: "Computer Science Core Fundamentals", slug: "cs-fundamentals-architecture" }]
  },
  {
    id: 62,
    stepNumber: 2,
    trackId: "java",
    slug: "java-variables-and-data-types",
    title: "2. Variables and Data Types",
    category: "Syntax Basics",
    summary: "Master Java's strong, static type system: primitives (int, double, boolean, char), reference types, and type casting.",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["Primitive Types (byte, short, int, long, float, double, boolean, char)", "Reference Types vs Primitives & Memory Layout", "Variable Declaration, Initialization & Scope", "Type Casting: Widening (Implicit) vs Narrowing (Explicit)", "Constants with the final Keyword"],
    practicalMilestone: "Build a financial interest calculator with strict type casting and overflow validation.",
    recommendedNotes: [{ title: "Computer Science Core Fundamentals", slug: "cs-fundamentals-architecture" }]
  },
  {
    id: 63,
    stepNumber: 3,
    trackId: "java",
    slug: "java-conditions-and-loops",
    title: "3. Conditions and Loops",
    category: "Control Flow",
    summary: "Implement logical decision-making with if/else, switch statements, for, while, and do-while loops.",
    duration: "1 - 2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["if, else if, else Conditional Logic", "Modern switch Expressions & Pattern Matching", "for Loops & Enhanced for-each Loop", "while and do-while Loops", "Control Statements: break, continue, return"],
    practicalMilestone: "Implement an interactive ATM simulation with menu loops, pin validation, and balance tracking.",
    recommendedNotes: [{ title: "Data Structures & Algorithms Mastery", slug: "data-structures-and-algorithms" }]
  },
  {
    id: 64,
    stepNumber: 4,
    trackId: "java",
    slug: "java-methods-and-arrays",
    title: "4. Methods and Arrays",
    category: "Structure",
    summary: "Structure clean code with reusable methods, method overloading, 1D and 2D arrays, and varargs.",
    duration: "2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["Method Definition, Return Types & Parameters", "Pass-by-Value Semantics in Java", "Method Overloading (Same name, different signature)", "Single & Multi-Dimensional Arrays", "The java.util.Arrays Utility Class"],
    practicalMilestone: "Build a Matrix math calculator that performs addition, transposition, and multiplication using 2D arrays.",
    recommendedNotes: [{ title: "Data Structures & Algorithms Mastery", slug: "data-structures-and-algorithms" }]
  },
  {
    id: 65,
    stepNumber: 5,
    trackId: "java",
    slug: "java-strings",
    title: "5. Strings",
    category: "Text Processing",
    summary: "Understand the Java String Pool, string immutability, StringBuilder, StringBuffer, and regular expressions.",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["String Immutability & The String Constant Pool", "String Comparison (equals() vs ==)", "Essential String Methods (substring, split, indexOf, trim)", "StringBuilder vs StringBuffer for High-Performance Manipulation", "Regular Expressions (Regex) in Java"],
    practicalMilestone: "Create a text analyzer that cleans input, counts frequencies, and validates email/phone regex patterns.",
    recommendedNotes: [{ title: "Data Structures & Algorithms Mastery", slug: "data-structures-and-algorithms" }]
  },
  {
    id: 66,
    stepNumber: 6,
    trackId: "java",
    slug: "java-object-oriented-programming",
    title: "6. Object-Oriented Programming",
    category: "OOP Core",
    summary: "Master Java OOP: Classes, Objects, Constructors, Encapsulation, getters/setters, and access modifiers.",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Classes, Instances & the this Keyword", "Constructors & Constructor Chaining", "Access Modifiers: private, default, protected, public", "Encapsulation: Getters, Setters & Validation", "static Fields, static Methods & static Initializers"],
    practicalMilestone: "Build an Object-Oriented Library Catalog System with Book, Member, and Loan classes.",
    recommendedNotes: [{ title: "Computer Science Core Fundamentals", slug: "cs-fundamentals-architecture" }]
  },
  {
    id: 67,
    stepNumber: 7,
    trackId: "java",
    slug: "java-inheritance-and-polymorphism",
    title: "7. Inheritance and Polymorphism",
    category: "OOP Advanced",
    summary: "Create extensible hierarchies with class inheritance (extends), interfaces (implements), abstract classes, and polymorphism.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Class Inheritance with extends & super Keyword", "Method Overriding & the @Override Annotation", "Compile-time vs Runtime Polymorphism", "Abstract Classes vs Interfaces", "Default & Static Methods in Interfaces"],
    practicalMilestone: "Design an Employee Payroll hierarchy with FullTime, Contractor, and Executive polymorphic classes.",
    recommendedNotes: [{ title: "Computer Science Core Fundamentals", slug: "cs-fundamentals-architecture" }]
  },
  {
    id: 68,
    stepNumber: 8,
    trackId: "java",
    slug: "java-collections-framework",
    title: "8. Collections Framework",
    category: "Data Structures",
    summary: "Master Java's standard collections: List (ArrayList, LinkedList), Set (HashSet, TreeSet), and Map (HashMap, TreeMap).",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["The Collections Hierarchy & Iterable Interface", "List: ArrayList vs LinkedList", "Set: HashSet vs LinkedHashSet vs TreeSet", "Map: HashMap vs LinkedHashMap vs TreeMap", "Comparable and Comparator Interfaces for Custom Sorting"],
    practicalMilestone: "Implement an in-memory Student Ranking and GPA Registry using HashMaps, TreeSets, and custom Comparators.",
    recommendedNotes: [{ title: "Data Structures & Algorithms Mastery", slug: "data-structures-and-algorithms" }]
  },
  {
    id: 69,
    stepNumber: 9,
    trackId: "java",
    slug: "java-exception-handling",
    title: "9. Exception Handling",
    category: "Reliability",
    summary: "Handle runtime faults safely with checked vs unchecked exceptions, try-catch-finally, try-with-resources, and custom exceptions.",
    duration: "1 Week",
    difficulty: "Intermediate",
    keyTopics: ["Throwable Hierarchy: Error vs Exception", "Checked Exceptions vs Unchecked (Runtime) Exceptions", "try, catch, finally Blocks & Multiple Catches", "try-with-resources & AutoCloseable Interface", "Creating Custom Exception Classes"],
    practicalMilestone: "Build a robust file ingestion engine that validates data and throws domain-specific custom exceptions.",
    recommendedNotes: [{ title: "Computer Science Core Fundamentals", slug: "cs-fundamentals-architecture" }]
  },
  {
    id: 70,
    stepNumber: 10,
    trackId: "java",
    slug: "java-generics-and-streams",
    title: "10. Generics and Streams",
    category: "Modern Java",
    summary: "Write type-safe generic classes and harness functional programming with the Java 8+ Stream API and Lambda expressions.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Generic Classes, Methods & Bounded Type Parameters (<T extends Number>)", "Wildcards (? extends T, ? super T)", "Functional Interfaces (@FunctionalInterface, Consumer, Predicate, Function)", "Stream Operations: filter(), map(), reduce(), collect()", "Optional<T> to Eliminate NullPointerExceptions"],
    practicalMilestone: "Refactor data processing pipelines to use Java Streams, lambdas, and Optionals for concise, bug-free logic.",
    recommendedNotes: [{ title: "Computer Science Core Fundamentals", slug: "cs-fundamentals-architecture" }]
  },
  {
    id: 71,
    stepNumber: 11,
    trackId: "java",
    slug: "java-file-handling",
    title: "11. File Handling",
    category: "I/O",
    summary: "Read and write data on the filesystem with Java standard I/O and modern NIO.2 (Path, Files, Buffers).",
    duration: "1 Week",
    difficulty: "Intermediate",
    keyTopics: ["Byte Streams vs Character Streams", "BufferedReader and BufferedWriter", "Java NIO.2 (java.nio.file.Path and Files)", "Reading, Writing & Appending Files", "Object Serialization (Serializable Interface)"],
    practicalMilestone: "Build a transaction log generator that archives and parses daily financial records in CSV and binary formats.",
    recommendedNotes: [{ title: "Computer Science Core Fundamentals", slug: "cs-fundamentals-architecture" }]
  },
  {
    id: 72,
    stepNumber: 12,
    trackId: "java",
    slug: "java-sql-and-jdbc",
    title: "12. SQL and JDBC",
    category: "Database",
    summary: "Connect Java applications to MySQL or PostgreSQL databases using JDBC, Connection Pools, and PreparedStatements.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["JDBC Architecture & Driver Managers", "Establishing Database Connections", "Executing Queries with PreparedStatement (Preventing SQLi)", "Processing ResultSet Data", "Transaction Management (commit & rollback)"],
    practicalMilestone: "Develop a Data Access Object (DAO) layer that performs complete CRUD operations against a relational database.",
    recommendedNotes: [{ title: "SQL & Relational Databases", slug: "sql-and-relational-databases" }]
  },
  {
    id: 73,
    stepNumber: 13,
    trackId: "java",
    slug: "java-unit-testing",
    title: "13. Unit Testing",
    category: "Testing",
    summary: "Write professional automated tests for Java code using JUnit 5 and mock external dependencies with Mockito.",
    duration: "1 - 2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["JUnit 5 Test Annotations (@Test, @BeforeEach, @AfterEach)", "Assertions & Exception Testing", "Parameterized Tests (@ParameterizedTest)", "Mocking Dependencies with Mockito (@Mock, when/thenReturn)", "Code Coverage Analysis"],
    practicalMilestone: "Create a comprehensive JUnit 5 and Mockito test suite for your business service classes.",
    recommendedNotes: [{ title: "Computer Science Core Fundamentals", slug: "cs-fundamentals-architecture" }]
  },
  {
    id: 74,
    stepNumber: 14,
    trackId: "java",
    slug: "java-final-project",
    title: "14. Final Project: Build a Java Application",
    category: "Capstone",
    summary: "Design and implement a complete enterprise-grade Java application with clean architecture, JDBC persistence, and unit tests.",
    duration: "3 - 4 Weeks",
    difficulty: "Advanced",
    keyTopics: ["Layered Enterprise Architecture (Controller, Service, DAO)", "Relational Database Schema & JDBC Connectivity", "Design Patterns (Singleton, Factory, Builder, Repository)", "Comprehensive JUnit 5 Test Suite", "Maven Build Lifecycle & Executable JAR Packaging"],
    practicalMilestone: "Build and package a complete Hotel Reservation or Inventory Management application with relational database and tests.",
    recommendedNotes: [{ title: "Computer Science Core Fundamentals", slug: "cs-fundamentals-architecture" }]
  },

  // ══════════════════════════════════════════════════════════════════
  // PATH 5: AI AND MACHINE LEARNING (14 Stages)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 81,
    stepNumber: 1,
    trackId: "ai-ml",
    slug: "ai-python-fundamentals",
    title: "1. Python Fundamentals",
    category: "Programming",
    summary: "Master the essential Python language skills required for AI: functions, data structures, comprehensions, and virtual environments.",
    duration: "2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["Python Syntax, Data Types & Collections", "List Comprehensions & Generator Expressions", "Functions, Lambdas & Modular Imports", "Virtual Environments & Jupyter Notebooks Setup"],
    practicalMilestone: "Set up a clean Jupyter Lab data science environment and write algorithmic data processing scripts.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 82,
    stepNumber: 2,
    trackId: "ai-ml",
    slug: "ai-mathematics-for-machine-learning",
    title: "2. Mathematics for Machine Learning",
    category: "Math Foundations",
    summary: "Understand the core mathematical pillars: Linear Algebra (vectors, matrices, dot products) and Multivariable Calculus (gradients).",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Vectors, Vector Spaces & Dot Products", "Matrix Operations, Determinants & Inverses", "Eigenvalues, Eigenvectors & Dimensionality", "Calculus: Derivatives, Partial Derivatives & The Chain Rule", "Gradient Descent Optimization Intuition"],
    practicalMilestone: "Implement basic vector dot products and gradient descent mathematical steps from scratch in Python.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 83,
    stepNumber: 3,
    trackId: "ai-ml",
    slug: "ai-numpy",
    title: "3. NumPy",
    category: "Scientific Computing",
    summary: "Perform high-performance scientific and numerical computing with multidimensional arrays, vectorization, and broadcasting.",
    duration: "1 - 2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["NumPy ndarray Creation & Data Types", "Array Indexing, Slicing & Boolean Masking", "Vectorized Operations vs Slow Python Loops", "Broadcasting Rules & Reshaping Arrays", "Linear Algebra with np.linalg"],
    practicalMilestone: "Build a vectorized matrix transformation pipeline and image filter using pure NumPy operations.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 84,
    stepNumber: 4,
    trackId: "ai-ml",
    slug: "ai-pandas",
    title: "4. Pandas",
    category: "Data Wrangling",
    summary: "Inspect, clean, and manipulate tabular data using Pandas Series, DataFrames, indexing, grouping, and aggregations.",
    duration: "2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["Series and DataFrame Structures", "Loading CSV, Excel, and SQL Data", "Filtering Data with loc and iloc", "Handling Missing Values (fillna, dropna)", "Groupby, Pivot Tables & Aggregations"],
    practicalMilestone: "Analyze a real-world Kaggle dataset (e.g. Titanic or House Prices) and generate comprehensive summary statistics.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 85,
    stepNumber: 5,
    trackId: "ai-ml",
    slug: "ai-data-visualization",
    title: "5. Data Visualization",
    category: "Visual Analysis",
    summary: "Communicate insights effectively through charts and graphs using Matplotlib and Seaborn.",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["Matplotlib Figure and Axes Anatomy", "Line Charts, Bar Charts & Histograms", "Seaborn Statistical Plots (Scatter, Box, Violin)", "Correlation Heatmaps & Pairplots", "Customizing Colors, Labels, Legends & Titles"],
    practicalMilestone: "Create an exploratory visual dashboard revealing correlations, distributions, and outliers in a sales dataset.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 86,
    stepNumber: 6,
    trackId: "ai-ml",
    slug: "ai-statistics-and-probability",
    title: "6. Statistics and Probability",
    category: "Statistical Core",
    summary: "Master the foundation of inference: descriptive statistics, probability distributions, hypothesis testing, and Bayes Theorem.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Mean, Median, Mode, Variance & Standard Deviation", "Probability Distributions (Normal, Binomial, Poisson)", "Z-Scores, Central Limit Theorem & Confidence Intervals", "Hypothesis Testing (p-values, t-tests, ANOVA)", "Bayes' Theorem & Conditional Probability"],
    practicalMilestone: "Perform an A/B test hypothesis analysis with p-value calculation to decide if a website feature increased conversions.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 87,
    stepNumber: 7,
    trackId: "ai-ml",
    slug: "ai-data-cleaning-and-preparation",
    title: "7. Data Cleaning and Preparation",
    category: "Feature Engineering",
    summary: "Prepare messy real-world data for algorithms: imputation, one-hot encoding, feature scaling, and train-test splitting.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Detecting and Handling Outliers (IQR & Z-score)", "Categorical Encoding (One-Hot, Ordinal, Label)", "Feature Scaling: Normalization vs Standardization", "Feature Selection & Dimensionality Reduction (PCA)", "Train, Validation & Test Splitting (Stratified)"],
    practicalMilestone: "Build a reusable Scikit-Learn ColumnTransformer pipeline that cleans raw incoming data automatically.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 88,
    stepNumber: 8,
    trackId: "ai-ml",
    slug: "ai-machine-learning-fundamentals",
    title: "8. Machine Learning Fundamentals",
    category: "ML Foundations",
    summary: "Understand the core concepts of machine learning: how models learn, loss functions, overfitting vs underfitting, and bias-variance tradeoff.",
    duration: "1 - 2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Types of ML: Supervised, Unsupervised, Reinforcement", "Features, Labels, Predictions & Loss Functions", "Overfitting vs Underfitting (Bias-Variance Tradeoff)", "Cross-Validation (k-fold Cross Validation)", "Hyperparameter Tuning with GridSearchCV"],
    practicalMilestone: "Train your first baseline Scikit-Learn predictor and diagnose overfitting using validation curves.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 89,
    stepNumber: 9,
    trackId: "ai-ml",
    slug: "ai-supervised-learning",
    title: "9. Supervised Learning",
    category: "Algorithms",
    summary: "Master classical predictive algorithms for regression and classification: Linear Regression, Logistic Regression, Decision Trees, and Random Forests.",
    duration: "3 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Linear & Multiple Regression (Ordinary Least Squares)", "Logistic Regression & Sigmoid Decision Boundaries", "Decision Trees, Entropy & Gini Impurity", "Ensemble Methods: Random Forests & Gradient Boosting (XGBoost)", "Support Vector Machines (SVM) & Kernel Trick"],
    practicalMilestone: "Build an end-to-end customer churn prediction classifier using Random Forest and XGBoost.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 90,
    stepNumber: 10,
    trackId: "ai-ml",
    slug: "ai-unsupervised-learning",
    title: "10. Unsupervised Learning",
    category: "Pattern Discovery",
    summary: "Discover hidden patterns in unlabeled data using K-Means clustering, hierarchical clustering, and PCA dimensionality reduction.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Clustering vs Classification", "K-Means Clustering & The Elbow Method", "Hierarchical Clustering & Dendrograms", "DBSCAN for Density-Based Outlier Detection", "Principal Component Analysis (PCA) for Visualizing High-D Data"],
    practicalMilestone: "Segment an e-commerce customer base into behavioral purchasing clusters using K-Means and PCA visualization.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 91,
    stepNumber: 11,
    trackId: "ai-ml",
    slug: "ai-model-evaluation",
    title: "11. Model Evaluation",
    category: "Validation",
    summary: "Evaluate model performance accurately with Confusion Matrices, Precision, Recall, F1-Score, ROC-AUC curves, and MAE/RMSE.",
    duration: "1 Week",
    difficulty: "Intermediate",
    keyTopics: ["Regression Metrics: MAE, MSE, RMSE, R-squared", "Classification Metrics: Accuracy, Precision, Recall, F1", "Confusion Matrix & Type I / Type II Errors", "ROC Curves & Area Under the Curve (AUC)", "Handling Imbalanced Datasets (SMOTE & Class Weights)"],
    practicalMilestone: "Evaluate a medical diagnosis model where false negatives are critical, optimizing the decision threshold for Recall.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 92,
    stepNumber: 12,
    trackId: "ai-ml",
    slug: "ai-neural-network-fundamentals",
    title: "12. Neural Network Fundamentals",
    category: "Deep Learning",
    summary: "Understand the biological inspiration and math of artificial neural networks: perceptrons, activation functions, backpropagation, and PyTorch.",
    duration: "2 - 3 Weeks",
    difficulty: "Advanced",
    keyTopics: ["Perceptrons, Weights, Biases & Feedforward Networks", "Activation Functions: ReLU, Sigmoid, Softmax", "Loss Functions: Cross-Entropy & Mean Squared Error", "Backpropagation Algorithm & The Chain Rule", "Building a Multi-Layer Perceptron (MLP) with PyTorch"],
    practicalMilestone: "Train a PyTorch neural network to classify handwritten digits from the classic MNIST dataset with > 98% accuracy.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 93,
    stepNumber: 13,
    trackId: "ai-ml",
    slug: "ai-working-with-ai-apis",
    title: "13. Working with AI APIs",
    category: "Generative AI",
    summary: "Leverage state-of-the-art LLMs and AI services: OpenAI, Google Gemini, embeddings, prompt engineering, and function calling.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["LLM Fundamentals & Foundation Models", "Prompt Engineering Techniques (Few-Shot, CoT)", "OpenAI & Google Gemini SDKs in Python", "Vector Embeddings & Semantic Search Basics", "Retrieval-Augmented Generation (RAG) Architecture"],
    practicalMilestone: "Build an AI Document Q&A assistant that ingests PDF text, generates embeddings, and answers user questions.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 94,
    stepNumber: 14,
    trackId: "ai-ml",
    slug: "ai-final-project",
    title: "14. Final Project: Build and Evaluate an AI-Powered Application",
    category: "Capstone",
    summary: "Design, train, evaluate, and deploy an intelligent application combining custom ML models or Generative AI with a live web UI.",
    duration: "4 Weeks",
    difficulty: "Advanced",
    keyTopics: ["End-to-End Problem Definition & Data Sourcing", "Data Pipeline, Preprocessing & Feature Engineering", "Model Training, Hyperparameter Tuning & Cross-Validation", "Packaging the Model with FastAPI or Streamlit", "Evaluating Performance & Documenting Results"],
    practicalMilestone: "Build, evaluate, and launch a complete web-based AI prediction or assistant platform with interactive web UI.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },

  // ══════════════════════════════════════════════════════════════════
  // PATH 6: DATA ANALYST (13 Stages)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 101,
    stepNumber: 1,
    trackId: "data-analyst",
    slug: "data-excel-fundamentals",
    title: "1. Excel Fundamentals",
    category: "Spreadsheets",
    summary: "Master essential spreadsheet data modeling: formulas, XLOOKUP, INDEX/MATCH, Pivot Tables, conditional formatting, and data validation.",
    duration: "2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["Formulas & Cell Referencing (Relative vs Absolute)", "Lookup Functions: XLOOKUP, VLOOKUP, INDEX/MATCH", "Data Cleaning with TRIM, CONCAT, TEXTSPLIT", "Pivot Tables & Pivot Charts for Data Summarization", "Data Validation & Conditional Formatting Rules"],
    practicalMilestone: "Create a dynamic sales commission and performance tracking workbook with interactive Pivot Tables.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 102,
    stepNumber: 2,
    trackId: "data-analyst",
    slug: "data-sql-fundamentals",
    title: "2. SQL Fundamentals",
    category: "Database Querying",
    summary: "Query relational databases with SQL: filtering, sorting, joins, aggregations, subqueries, and window functions.",
    duration: "3 Weeks",
    difficulty: "Beginner",
    keyTopics: ["SELECT, FROM, WHERE, ORDER BY, LIMIT", "Aggregate Functions (SUM, AVG, COUNT, MIN, MAX)", "GROUP BY and HAVING Clauses", "INNER JOIN, LEFT JOIN, FULL OUTER JOIN", "Window Functions (ROW_NUMBER, RANK, DENSE_RANK)"],
    practicalMilestone: "Query a mock retail database to calculate Monthly Recurring Revenue (MRR) and customer churn rate.",
    recommendedNotes: [{ title: "SQL & Relational Databases", slug: "sql-and-relational-databases" }]
  },
  {
    id: 103,
    stepNumber: 3,
    trackId: "data-analyst",
    slug: "data-python-for-data-analysis",
    title: "3. Python for Data Analysis",
    category: "Programming",
    summary: "Learn essential Python programming tailored specifically for data analysts: variables, lists, dictionaries, functions, and Jupyter.",
    duration: "2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["Python Data Types & Syntax for Analytics", "Iterating Lists and Dictionaries", "Writing Reusable Transformation Functions", "Jupyter Notebook Workflows & Markdown Documentation"],
    practicalMilestone: "Write a Python script that reads multiple messy CSV reports, normalizes column headers, and exports a unified table.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 104,
    stepNumber: 4,
    trackId: "data-analyst",
    slug: "data-numpy-and-pandas",
    title: "4. NumPy and Pandas",
    category: "Data Processing",
    summary: "Load, slice, filter, and transform complex datasets using Pandas Series, DataFrames, and NumPy array operations.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["DataFrames: Creating, Reading, Slicing & Subsetting", "Boolean Indexing and Multi-Condition Filtering", "Vectorized Math with NumPy Functions", "Merging, Concatenating & Joining DataFrames", "Working with Datetime Columns & Time Series"],
    practicalMilestone: "Import a 50,000-row customer transactions dataset into Pandas and compute rolling 7-day revenue averages.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 105,
    stepNumber: 5,
    trackId: "data-analyst",
    slug: "data-cleaning",
    title: "5. Data Cleaning",
    category: "Data Hygiene",
    summary: "Identify and resolve missing values, duplicate records, inconsistent naming conventions, and data type errors.",
    duration: "1 - 2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Detecting & Imputing Missing Values", "Deduplicating Records with drop_duplicates()", "String Cleansing (regex, whitespace stripping, lowercasing)", "Handling Outliers with Interquartile Range (IQR)", "Data Type Conversion (astype, pd.to_datetime)"],
    practicalMilestone: "Clean a real-world messy dataset containing typos, missing zip codes, and invalid dates into an analysis-ready table.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 106,
    stepNumber: 6,
    trackId: "data-analyst",
    slug: "data-statistics",
    title: "6. Statistics",
    category: "Core Analytics",
    summary: "Apply descriptive and inferential statistics to business problems: central tendency, variance, correlation, and confidence intervals.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Measures of Central Tendency & Spread (Mean, Median, Std Dev)", "Correlation vs Causation & Pearson Coefficient", "Probability Distributions & The Empirical Rule", "Confidence Intervals & Sample Size Estimation", "Hypothesis Testing Principles (p-values & Significance)"],
    practicalMilestone: "Calculate statistical significance for a marketing campaign test and present confidence intervals to stakeholders.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 107,
    stepNumber: 7,
    trackId: "data-analyst",
    slug: "data-visualization",
    title: "7. Data Visualization",
    category: "Visualization",
    summary: "Design compelling, easy-to-read charts using Matplotlib, Seaborn, and best practices in visual data storytelling.",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["Choosing the Right Chart for the Right Data Type", "Designing with Matplotlib and Seaborn", "Bar Charts, Line Trends, Scatter & Distribution Plots", "Avoiding Misleading Scales and Visual Clutter", "Color Palettes for Accessibility & Emphasis"],
    practicalMilestone: "Design an executive visual summary chart suite that clearly answers 3 critical business questions.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 108,
    stepNumber: 8,
    trackId: "data-analyst",
    slug: "data-power-bi-or-tableau",
    title: "8. Power BI or Tableau",
    category: "BI Tools",
    summary: "Connect to live databases, create DAX measures or Calculated Fields, and build interactive corporate BI reports.",
    duration: "3 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Power BI / Tableau Desktop Workspace Overview", "Data Modeling: Star Schema, Facts & Dimensions", "Calculated Columns vs Measures (DAX / Tableau Formulas)", "Interactive Filters, Slicers & Cross-Filtering", "Publishing & Sharing Reports on Power BI Service / Tableau Cloud"],
    practicalMilestone: "Build an interactive multi-page sales dashboard in Power BI or Tableau with dynamic date slicers and KPI cards.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 109,
    stepNumber: 9,
    trackId: "data-analyst",
    slug: "data-exploratory-data-analysis",
    title: "9. Exploratory Data Analysis",
    category: "Investigation",
    summary: "Conduct rigorous EDA on unfamiliar datasets to uncover trends, anomalies, business bottlenecks, and growth opportunities.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["The EDA Framework: Questions, Hypotheses, Evidence", "Univariate, Bivariate & Multivariate Analysis", "Detecting Seasonal Trends & Cyclical Patterns", "Documenting Findings in Executive Notebooks"],
    practicalMilestone: "Perform an end-to-end EDA on e-commerce customer cohort data, identifying the highest-LTV customer segment.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 110,
    stepNumber: 10,
    trackId: "data-analyst",
    slug: "data-dashboard-development",
    title: "10. Dashboard Development",
    category: "UI & Reporting",
    summary: "Design intuitive executive dashboards with clear visual hierarchy, drill-down capabilities, and actionable KPI metrics.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Dashboard UX Design Principles for Busy Executives", "Defining North Star & Supporting Metrics (CAC, LTV, ROAS)", "Interactive Drill-Throughs & Tooltip Cards", "Automated Data Refresh & Gateway Configuration"],
    practicalMilestone: "Build an Executive SaaS metrics dashboard displaying MRR, Net Retention Rate, and churn cohort breakdowns.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 111,
    stepNumber: 11,
    trackId: "data-analyst",
    slug: "data-business-problem-solving",
    title: "11. Business Problem Solving",
    category: "Strategy",
    summary: "Frame vague business requests into structured data inquiries: root cause analysis, cohort analysis, and actionable recommendations.",
    duration: "1 - 2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Translating Business Questions into Analytical Frameworks", "Root Cause Analysis (5 Whys & Fishbone with Data)", "Customer Lifetime Value (LTV) & Retention Cohorts", "Writing Actionable Executive Summaries & Slide Decks"],
    practicalMilestone: "Analyze a customer drop-off problem and produce a 5-slide executive presentation with data-backed recommendations.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 112,
    stepNumber: 12,
    trackId: "data-analyst",
    slug: "data-portfolio-projects",
    title: "12. Portfolio Projects",
    category: "Career Prep",
    summary: "Document analytical projects publicly on GitHub with clear business contexts, methodologies, visualizations, and takeaways.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Structuring a Professional Data Analyst GitHub Portfolio", "Writing Compelling Project READMEs for Recruiters", "Publishing Live Tableau Public / Power BI Web Links", "Preparing for Technical SQL & Analytics Interviews"],
    practicalMilestone: "Publish 2 polished end-to-end data projects on GitHub with interactive dashboards and executive summaries.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },
  {
    id: 113,
    stepNumber: 13,
    trackId: "data-analyst",
    slug: "data-final-project",
    title: "13. Final Project: Create an Interactive Business Analytics Dashboard",
    category: "Capstone",
    summary: "Build an end-to-end business intelligence project from raw database queries to a published interactive dashboard.",
    duration: "3 - 4 Weeks",
    difficulty: "Advanced",
    keyTopics: ["Raw Data Ingestion & SQL Transformation", "Advanced Cleaning & Statistical Modeling in Python", "Interactive BI Dashboard with Drill-Down Filters", "Executive Video Walkthrough & Strategic Business Recommendations"],
    practicalMilestone: "Publish a comprehensive business analytics dashboard showcasing SQL queries, Python processing, and live BI charts.",
    recommendedNotes: [{ title: "Python Programming Mastery", slug: "python-programming-mastery" }]
  },

  // ══════════════════════════════════════════════════════════════════
  // PATH 7: MOBILE APP DEVELOPER (14 Stages)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 121,
    stepNumber: 1,
    trackId: "mobile",
    slug: "mobile-programming-fundamentals",
    title: "1. Programming Fundamentals",
    category: "Foundations",
    summary: "Learn modern JavaScript/TypeScript or Dart core programming: variables, data structures, asynchronous promises, and functions.",
    duration: "2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["Variables, Data Types & Scopes", "Object-Oriented & Functional Principles", "Asynchronous Programming (Promises & Async/Await)", "Package Management for Mobile (npm / pub.dev)"],
    practicalMilestone: "Write algorithmic utility modules and asynchronous data processors in TypeScript/Dart.",
    recommendedNotes: [{ title: "Modern JavaScript & TypeScript Fundamentals", slug: "modern-javascript-typescript" }]
  },
  {
    id: 122,
    stepNumber: 2,
    trackId: "mobile",
    slug: "mobile-ui-and-ux-fundamentals",
    title: "2. UI and UX Fundamentals",
    category: "Design",
    summary: "Understand mobile touch interactions, Apple Human Interface Guidelines, Google Material Design, and responsive screen scaling.",
    duration: "1 - 2 Weeks",
    difficulty: "Beginner",
    keyTopics: ["Apple Human Interface Guidelines vs Material Design 3", "Touch Targets, Safe Area Insets & Thumb Zones", "Mobile Typography, Contrast & Dark Mode", "Mobile Wireframing & Prototyping in Figma"],
    practicalMilestone: "Design a 4-screen mobile app prototype in Figma with interactive transitions and component variants.",
    recommendedNotes: [{ title: "Responsive Design, Media Queries & Animations", slug: "responsive-design-media-queries-animations" }]
  },
  {
    id: 123,
    stepNumber: 3,
    trackId: "mobile",
    slug: "mobile-git-and-github",
    title: "3. Git and GitHub",
    category: "Version Control",
    summary: "Version-control mobile codebases, manage feature branches, and ignore platform build artifacts (.gradle, Pods).",
    duration: "1 Week",
    difficulty: "Beginner",
    keyTopics: ["Git Branching & Pull Request Workflows", ".gitignore for Mobile (Pods, build/, .gradle)", "Tagging Releases & Semantic Versioning", "Managing Mobile Environment Keys Securely"],
    practicalMilestone: "Set up a clean mobile app repository with branch protection and proper mobile gitignore rules.",
    recommendedNotes: [{ title: "Git, GitHub & Professional Collaboration", slug: "git-github-collaboration-guide" }]
  },
  {
    id: 124,
    stepNumber: 4,
    trackId: "mobile",
    slug: "mobile-framework-selection",
    title: "4. Choose a Development Track: React Native or Flutter",
    category: "Framework",
    summary: "Set up your cross-platform mobile development environment: React Native (Expo) or Flutter, Android Studio, and iOS Simulator.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["React Native (Expo) vs Flutter Architecture", "Installing Android Studio, Android SDK & Virtual Devices (AVD)", "Configuring Xcode & iOS Simulator (on macOS)", "Project Initialization, Fast Refresh & Dev Menus"],
    practicalMilestone: "Initialize a cross-platform mobile app and run it simultaneously on an Android emulator and physical device.",
    recommendedNotes: [{ title: "React Components, Props & State Mastery", slug: "react-components-props-state" }]
  },
  {
    id: 125,
    stepNumber: 5,
    trackId: "mobile",
    slug: "mobile-component-architecture-and-navigation",
    title: "5. Component Architecture & Navigation",
    category: "UI Architecture",
    summary: "Build flexible mobile screens with View/Widget components, Flexbox layouts, Stack/Tab navigation, and modal flows.",
    duration: "2 - 3 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Core Mobile Components (View, Text, Image, ScrollView, FlatList)", "Flexbox Layout on Mobile (flexDirection, alignItems)", "Stack Navigation (React Navigation / Flutter Navigator)", "Bottom Tab Navigation & Drawer Menus", "Passing Parameters Between Screens"],
    practicalMilestone: "Build a multi-screen mobile catalog with bottom tabs, nested stack navigation, and detail view modals.",
    recommendedNotes: [{ title: "React Components, Props & State Mastery", slug: "react-components-props-state" }]
  },
  {
    id: 126,
    stepNumber: 6,
    trackId: "mobile",
    slug: "mobile-state-management",
    title: "6. State Management",
    category: "App State",
    summary: "Manage complex client application state across screens using Zustand, Redux Toolkit, or Riverpod.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Local Component State vs Global Application State", "State Management Libraries (Zustand / Redux Toolkit / Riverpod)", "Optimistic UI Updates for Instant Mobile Feedback", "Persisting App State Across App Restarts"],
    practicalMilestone: "Implement an e-commerce shopping cart and user favorites system synchronized across all app screens.",
    recommendedNotes: [{ title: "React Hooks Deep Dive: useState, useEffect & Custom Hooks", slug: "react-hooks-deep-dive" }]
  },
  {
    id: 127,
    stepNumber: 7,
    trackId: "mobile",
    slug: "mobile-native-device-apis",
    title: "7. Native Device APIs (Camera, GPS, Storage)",
    category: "Device Features",
    summary: "Harness hardware capabilities: Camera, Photo Library, GPS Geolocation, Accelerometer, and Haptic Feedback.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Requesting and Handling Runtime Permissions", "Accessing Camera & Photo Gallery (Image Picker)", "Geolocation & Interactive Map Views", "Haptics & Device Vibration Feedback", "Local Notifications Scheduling"],
    practicalMilestone: "Build a Travel Journal app that captures photos with the camera and tags each entry with the user's GPS coordinates.",
    recommendedNotes: [{ title: "DOM Manipulation & Event Handling Guide", slug: "dom-manipulation-events-guide" }]
  },
  {
    id: 128,
    stepNumber: 8,
    trackId: "mobile",
    slug: "mobile-rest-apis-and-offline-sync",
    title: "8. REST APIs & Offline Sync",
    category: "Networking",
    summary: "Fetch live data over HTTP, handle network dropouts gracefully, and synchronize offline mutations when reconnected.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Mobile Network Requests with Axios / TanStack Query", "Handling No-Internet States with NetInfo", "Offline Caching with SQLite or MMKV", "Optimistic Mutations & Background Synchronization"],
    practicalMilestone: "Build an offline-first Task & Habits tracker that queues updates locally and syncs with a cloud backend once online.",
    recommendedNotes: [{ title: "REST APIs & Backend Integration in Next.js", slug: "rest-apis-crud-handlers" }]
  },
  {
    id: 129,
    stepNumber: 9,
    trackId: "mobile",
    slug: "mobile-authentication-and-secure-storage",
    title: "9. Authentication & Secure Storage",
    category: "Security",
    summary: "Secure mobile credentials with hardware Keychain/Keystore, biometric login (Face ID / Fingerprint), and JWT storage.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Secure Storage (Expo SecureStore / Flutter Secure Storage)", "Biometric Authentication (LocalAuthentication / Local Auth)", "JWT Auth Flow on Mobile: Access Tokens & Refresh Tokens", "Social Login Integration (Apple Sign In, Google Sign In)"],
    practicalMilestone: "Implement a biometric Face ID / Fingerprint lock screen for a mobile banking or notes application.",
    recommendedNotes: [{ title: "Frontend vs Backend: Roles & Architecture", slug: "frontend-vs-backend" }]
  },
  {
    id: 130,
    stepNumber: 10,
    trackId: "mobile",
    slug: "mobile-animations-and-micro-interactions",
    title: "10. Animations & Micro-Interactions",
    category: "Animation",
    summary: "Delight users with 60fps native animations using React Native Reanimated or Flutter AnimationController.",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Declarative vs Imperative Mobile Animations", "React Native Reanimated & Gesture Handler", "Shared Element Transitions Between Screens", "Lottie Vector Animations in Mobile Apps"],
    practicalMilestone: "Create a fluid swipe-to-dismiss card feed with micro-interaction feedback and bounce physics.",
    recommendedNotes: [{ title: "Responsive Design, Media Queries & Animations", slug: "responsive-design-media-queries-animations" }]
  },
  {
    id: 131,
    stepNumber: 11,
    trackId: "mobile",
    slug: "mobile-app-testing-and-debugging",
    title: "11. Mobile App Testing & Debugging",
    category: "Quality",
    summary: "Debug mobile apps with React Native Debugger / Flutter DevTools, write unit tests, and component tests with Jest.",
    duration: "1 - 2 Weeks",
    difficulty: "Intermediate",
    keyTopics: ["Flipping Dev Menus, Network Inspecting & Console Logs", "Unit Testing Component Logic with Jest", "React Native Testing Library for Component Interactions", "Catching Native Crashes with Sentry / Crashlytics"],
    practicalMilestone: "Write unit and component interaction tests for your mobile app's authentication and cart flows.",
    recommendedNotes: [{ title: "Modern JavaScript & TypeScript Fundamentals", slug: "modern-javascript-typescript" }]
  },
  {
    id: 132,
    stepNumber: 12,
    trackId: "mobile",
    slug: "mobile-performance-and-memory-optimization",
    title: "12. Performance & Memory Optimization",
    category: "Optimization",
    summary: "Eliminate frame drops and memory leaks: FlatList optimization, image caching, bundle size reduction, and Hermes engine.",
    duration: "1 - 2 Weeks",
    difficulty: "Advanced",
    keyTopics: ["Optimizing Long Lists (FlatList getItemLayout, windowSize)", "Image Caching and FastImage Libraries", "Hermes JavaScript Engine & Bytecode Compilation", "Profiling Memory Leaks with Android Profiler / Xcode Instruments"],
    practicalMilestone: "Profile and optimize an infinite-scrolling feed to maintain a stable 60 FPS under rapid scrolling.",
    recommendedNotes: [{ title: "Next.js Metadata, Dynamic SEO & Deployment", slug: "nextjs-metadata-seo-deployment" }]
  },
  {
    id: 133,
    stepNumber: 13,
    trackId: "mobile",
    slug: "mobile-app-store-and-google-play-publishing",
    title: "13. App Store & Google Play Publishing",
    category: "Publishing",
    summary: "Package release binaries, configure app icons and splash screens, generate signing certificates, and submit to app stores.",
    duration: "2 Weeks",
    difficulty: "Advanced",
    keyTopics: ["App Icons, Splash Screens & Adaptive Icons", "Android App Bundles (AAB) & Keystore Signing", "Apple Developer Account, Provisioning Profiles & TestFlight", "Google Play Console & App Store Connect Submission Guidelines", "Over-The-Air (OTA) Updates with EAS Update"],
    practicalMilestone: "Build a signed Android AAB and iOS build bundle and submit to TestFlight and Google Play Internal Testing.",
    recommendedNotes: [{ title: "Next.js Metadata, Dynamic SEO & Deployment", slug: "nextjs-metadata-seo-deployment" }]
  },
  {
    id: 134,
    stepNumber: 14,
    trackId: "mobile",
    slug: "mobile-final-project",
    title: "14. Final Project: Build and Publish a Cross-Platform Mobile App",
    category: "Capstone",
    summary: "Architect, build, test, and prepare a full-featured cross-platform mobile app for public release.",
    duration: "4 Weeks",
    difficulty: "Advanced",
    keyTopics: ["End-to-End Mobile Product Development", "Intuitive Mobile UX with 60fps Native Animations", "Cloud Backend Integration with Offline Synchronization", "Biometric Authentication & Native Hardware Usage", "Production App Store & Google Play Build Artifacts"],
    practicalMilestone: "Build and publish a complete cross-platform mobile application (e.g. Fitness Tracker or Community Marketplace).",
    recommendedNotes: [{ title: "Next.js App Router, Server Components & Layouts", slug: "nextjs-app-router-layouts" }]
  }
];

export function getAllRoadmapSteps(): RoadmapStep[] {
  return ROADMAP_STEPS;
}

export function getRoadmapStepBySlug(slug: string): RoadmapStep | undefined {
  return ROADMAP_STEPS.find((s) => s.slug === slug);
}

export function getRoadmapStepsByTrack(trackId: string): RoadmapStep[] {
  if (!trackId || trackId === "frontend" || trackId === "web-dev") {
    return ROADMAP_STEPS.filter((s) => s.trackId === "frontend" || s.trackId === "web-dev");
  }
  return ROADMAP_STEPS.filter((s) => s.trackId === trackId);
}

export function getAllTracks(): RoadmapTrack[] {
  return ROADMAP_TRACKS;
}

export const ROADMAP_STAGES = ROADMAP_STEPS;
