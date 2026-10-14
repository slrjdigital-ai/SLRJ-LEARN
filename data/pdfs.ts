export interface PdfResource {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  filename: string;
  fileSize: string;
  format: string;
  language: string;
  pageCount: number;
  publishedDate: string;
  status: "published" | "coming_soon";
  topicsCovered: string[];
  topics?: string[];
  recommendedFor: string;
}

export type PdfItem = PdfResource;

export const PDF_RESOURCES: PdfResource[] = [
  {
    id: "pdf-web-fundamentals",
    slug: "web-fundamentals-complete-handbook",
    title: "Web Fundamentals & Internet Architecture Handbook",
    description: "Master DNS resolution, TCP/IP handshakes, HTTP/HTTPS protocols, browser rendering engines, client-server models, and web performance optimization.",
    category: "Web Development",
    fileUrl: "/pdfs/web-fundamentals-complete-handbook.pdf",
    filename: "web-fundamentals-complete-handbook.pdf",
    fileSize: "5.6 KB",
    format: "PDF Document",
    language: "English",
    pageCount: 2,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "DNS & IP Resolution",
      "TCP 3-Way Handshake",
      "TLS/SSL Encryption & HTTPS",
      "HTTP Request/Response Lifecycle",
      "Frontend vs Backend Separation",
      "Browser Critical Rendering Path"
    ],
    recommendedFor: "Aspiring Developers & Computer Science Students"
  },
  {
    id: "pdf-html5",
    slug: "html5-complete-notes",
    title: "HTML5 Handwritten Notebook (Basic -> Pro Complete Handbook)",
    description: "The complete 40-topic HTML Handwritten Notebook: core document structure, semantic layouts, accessible forms, audio/video, SVG/Canvas, clean architecture, 30-day plan, and 7 mini-projects.",
    category: "HTML",
    fileUrl: "/pdfs/html5-complete-notes.pdf",
    filename: "html5-complete-notes.pdf",
    fileSize: "4.7 MB",
    format: "PDF Document",
    language: "English",
    pageCount: 27,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "Level 1: Structure, Tags, Paths & Tables",
      "Level 2: Forms, Semantics, Media & Metadata",
      "Level 3: Accessibility (WCAG), SEO & Modern APIs",
      "Level 4: Architecture, Validation & Security",
      "Master Cheat Sheet & Anti-Patterns Checklist",
      "30-Day Practice Plan & 7 Mini-Projects",
      "15 Final Revision Q&As & Launch Checklist"
    ],
    recommendedFor: "Aspiring Developers, CS Students & Interview Candidates"
  },
  {
    id: "pdf-html-l1",
    slug: "html-level-1-basic",
    title: "HTML5 Level 1 — Basic Handwritten Notebook (Topics 1–10)",
    description: "Topics 1–10: Document tree skeleton, DOCTYPE, text formatting hierarchy, comments, relative/absolute links, image alt attributes, lists, and tables.",
    category: "HTML",
    fileUrl: "/pdfs/html-level-1-basic.pdf",
    filename: "html-level-1-basic.pdf",
    fileSize: "4.2 MB",
    format: "PDF Document",
    language: "English",
    pageCount: 6,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "1. What is HTML? (HyperText & Markup)",
      "2. HTML Document Structure & DOCTYPE",
      "3. Tags, Elements and Attributes",
      "4. Text Formatting Hierarchy (h1-h6, p, strong, em, mark)",
      "5. Comments & Security Note",
      "6. Links (Relative, Absolute, Mailto, Tel)",
      "7. Images & Meaningful Alt Text",
      "8. File Paths (../ and ./)",
      "9. Lists (ul, ol, dl)",
      "10. Tables (caption, thead, tbody, th, td)"
    ],
    recommendedFor: "Beginners starting web development"
  },
  {
    id: "pdf-html-l2",
    slug: "html-level-2-intermediate",
    title: "HTML5 Level 2 — Intermediate Handwritten Notebook (Topics 11–20)",
    description: "Topics 11–20: Forms architecture, validation, input types, select/textarea, semantic HTML layouts, div/span, audio/video, iframes, entities, and head metadata.",
    category: "HTML",
    fileUrl: "/pdfs/html-level-2-intermediate.pdf",
    filename: "html-level-2-intermediate.pdf",
    fileSize: "4.2 MB",
    format: "PDF Document",
    language: "English",
    pageCount: 7,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "11. Forms Architecture & Submit Pipeline",
      "12. Common Input Types & Validation",
      "13. Select, Textarea & Fieldset/Legend",
      "14. Semantic HTML Page Layout (header, nav, main, article, section)",
      "15. Containers: div vs span",
      "16. Multimedia: Native Audio & Video",
      "17. Sandboxed Embeds & <iframe>",
      "18. HTML Entities (&lt;, &gt;, &amp;, &copy;)",
      "19. Metadata & Head Elements (viewport, description)",
      "20. HTML5 Global Attributes (id, class, data-*)"
    ],
    recommendedFor: "Intermediate developers building modern web pages"
  },
  {
    id: "pdf-html-l3",
    slug: "html-level-3-advanced",
    title: "HTML5 Level 3 — Advanced Handwritten Notebook (Topics 21–28)",
    description: "Topics 21–28: Accessibility (WCAG 2.1 & ARIA), buttons vs links, technical SEO, responsive viewport, inline SVG, HTML5 Canvas, and native details/dialog.",
    category: "HTML",
    fileUrl: "/pdfs/html-level-3-advanced.pdf",
    filename: "html-level-3-advanced.pdf",
    fileSize: "4.1 MB",
    format: "PDF Document",
    language: "English",
    pageCount: 4,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "21. Accessibility Fundamentals (WCAG 2.1 & Screen Readers)",
      "22. The Golden Rule: Buttons vs Links",
      "23. SEO-Friendly HTML (title, meta description, semantics)",
      "24. Responsive-Friendly HTML Structure",
      "25. Inline SVG Basics (vectors & viewBox)",
      "26. HTML5 Canvas Basics (<canvas>)",
      "27. Expandable Native UI (<details> & <summary>)",
      "28. Native Modal Dialog (<dialog>)"
    ],
    recommendedFor: "Developers mastering accessibility, SEO and native web UI"
  },
  {
    id: "pdf-html-l4",
    slug: "html-level-4-pro",
    title: "HTML5 Level 4 — Pro Handwritten Notebook (Topics 29–40)",
    description: "Topics 29–40: Clean project architecture, BEM class naming, W3C validation, performance tuning, cybersecurity awareness, full-stack thinking, 30-day plan, and 7 mini-projects.",
    category: "HTML",
    fileUrl: "/pdfs/html-level-4-pro.pdf",
    filename: "html-level-4-pro.pdf",
    fileSize: "4.2 MB",
    format: "PDF Document",
    language: "English",
    pageCount: 8,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "29. Clean HTML Project Architecture",
      "30. Maintainable BEM Class Naming",
      "31. HTML Validation & Debug Workflow",
      "32. Performance-Aware HTML (loading='lazy')",
      "33. Cybersecurity Awareness (XSS, CSP, secrets)",
      "34. Forms + Backend Thinking (API & Database)",
      "35. Master Cheat Sheet & 10 Common Mistakes",
      "36. 30-Day HTML Practice Plan",
      "37. 7 Real-World Mini-Projects",
      "38. 15 Final Revision Q&As & Production Checklist"
    ],
    recommendedFor: "Full-stack engineers preparing for production and interviews"
  },
  {
    id: "pdf-css",
    slug: "css-flexbox-grid-cheatsheet",
    title: "CSS3, Flexbox & Grid Master Study Cheatsheet",
    description: "Quick-reference visual cheatsheet covering CSS Box Model, Flexbox main/cross axes, 2D CSS Grid layouts, responsive media queries, and performant animations.",
    category: "CSS",
    fileUrl: "/pdfs/css-flexbox-grid-cheatsheet.pdf",
    filename: "css-flexbox-grid-cheatsheet.pdf",
    fileSize: "5.5 KB",
    format: "PDF Document",
    language: "English",
    pageCount: 2,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "CSS Box Model (Border-Box)",
      "Flexbox Alignment & Justification",
      "CSS Grid auto-fit and minmax()",
      "Positioning (Relative, Absolute, Sticky, Fixed)",
      "Mobile-First Responsive Breakpoints"
    ],
    recommendedFor: "Frontend Developers & UI Designers"
  },
  {
    id: "pdf-javascript",
    slug: "javascript-modern-guide",
    title: "Modern JavaScript (ES6+ to Async) Developer Guide",
    description: "In-depth guide to modern JS execution: scope, closures, array methods, Event Loop, Promises, Async/Await, DOM manipulation, and immutability.",
    category: "JavaScript",
    fileUrl: "/pdfs/javascript-modern-guide.pdf",
    filename: "javascript-modern-guide.pdf",
    fileSize: "5.7 KB",
    format: "PDF Document",
    language: "English",
    pageCount: 2,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "ES6+ Syntax (Arrow Functions, Destructuring, Spread)",
      "Array Methods (map, filter, reduce, find)",
      "Event Loop, Microtasks & Macrotasks",
      "Promises & Async/Await Fetching",
      "Event Delegation & DOM Manipulation"
    ],
    recommendedFor: "Intermediate JavaScript Students & Interview Prep"
  },
  {
    id: "pdf-react",
    slug: "react-hooks-architecture-handbook",
    title: "React 19 Hooks & Component Architecture Handbook",
    description: "Practical guide to React component lifecycles, useState, useEffect, memoization, custom hooks, context API, and clean scalable component patterns.",
    category: "React",
    fileUrl: "/pdfs/react-hooks-architecture-handbook.pdf",
    filename: "react-hooks-architecture-handbook.pdf",
    fileSize: "6.0 KB",
    format: "PDF Document",
    language: "English",
    pageCount: 2,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "Rules of Hooks & State Immutability",
      "useState, useEffect & useRef",
      "Custom Hooks for Reusable Logic",
      "Component Composition & Lifting State",
      "React 19 Performance Optimizations"
    ],
    recommendedFor: "React Engineers & Full-Stack Developers"
  },
  {
    id: "pdf-nextjs",
    slug: "nextjs-app-router-guide",
    title: "Next.js App Router & Full-Stack Architecture Guide",
    description: "Deep dive into Next.js App Router, React Server Components vs Client Components, Route Handlers, ISR caching strategies, and dynamic metadata SEO.",
    category: "Next.js",
    fileUrl: "/pdfs/nextjs-app-router-guide.pdf",
    filename: "nextjs-app-router-guide.pdf",
    fileSize: "6.2 KB",
    format: "PDF Document",
    language: "English",
    pageCount: 2,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "App Router Directory Conventions",
      "React Server Components (RSC)",
      "Dynamic Routing & generateStaticParams",
      "Route Handlers (REST APIs)",
      "Incremental Static Regeneration (ISR)",
      "Production Metadata & OpenGraph SEO"
    ],
    recommendedFor: "Full-Stack Web Developers & Next.js Learners"
  },
  {
    id: "pdf-git",
    slug: "git-github-essential-workflow",
    title: "Git & GitHub Essential Engineering Workflow",
    description: "Master distributed version control: atomic commits, branch workflows, merge conflicts, rebasing principles, stash rescues, and GitHub pull requests.",
    category: "Git & GitHub",
    fileUrl: "/pdfs/git-github-essential-workflow.pdf",
    filename: "git-github-essential-workflow.pdf",
    fileSize: "5.7 KB",
    format: "PDF Document",
    language: "English",
    pageCount: 2,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "Working Directory, Staging & Commits",
      "Branch Management & Feature Branches",
      "Merge vs Rebase Best Practices",
      "Conflict Resolution Step-by-Step",
      "Git Stash, Reset, & Revert Recovery",
      "Pull Request Standards & Reviews"
    ],
    recommendedFor: "Developers Preparing for Team Collaboration"
  },
  {
    id: "pdf-backend",
    slug: "rest-apis-backend-handbook",
    title: "REST APIs & Backend Engineering Handbook",
    description: "Architectural handbook covering REST design, HTTP status codes, Node.js fundamentals, SQL vs NoSQL, JWT authentication, and OWASP web security.",
    category: "Backend & Databases",
    fileUrl: "/pdfs/rest-apis-backend-handbook.pdf",
    filename: "rest-apis-backend-handbook.pdf",
    fileSize: "6.2 KB",
    format: "PDF Document",
    language: "English",
    pageCount: 2,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "RESTful API Design & HTTP Verbs",
      "HTTP Status Code Taxonomy",
      "SQL vs NoSQL Database Tradeoffs",
      "Authentication (Cookies vs JWT)",
      "OWASP Top 10 Security Protections",
      "Schema Validation with Zod"
    ],
    recommendedFor: "Backend & Full-Stack Engineers"
  },
  {
    id: "pdf-dsa",
    slug: "dsa-complete-handbook",
    title: "Data Structures & Algorithms (DSA) Interview Handbook",
    description: "Master Big-O notation, arrays, hash maps, two pointers, binary trees, graph traversals (BFS/DFS), and dynamic programming for technical coding interviews.",
    category: "Data Structures & Algorithms",
    fileUrl: "/pdfs/dsa-complete-handbook.pdf",
    filename: "dsa-complete-handbook.pdf",
    fileSize: "6.8 KB",
    format: "PDF Document",
    language: "English",
    pageCount: 2,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "Time & Space Complexity (Big-O)",
      "Arrays & Hash Maps O(1) Lookups",
      "Two Pointers & Sliding Window",
      "Binary Search Trees & Traversals",
      "Graph BFS/DFS & Shortest Path",
      "Dynamic Programming Memoization"
    ],
    recommendedFor: "Software Engineers Preparing for Coding Interviews"
  },
  {
    id: "pdf-python-ai",
    slug: "python-ai-essentials",
    title: "Python, Data Science & AI Engineering Guide",
    description: "Complete reference for Python syntax, OOP patterns, data wrangling with Pandas/NumPy, machine learning concepts, and Generative AI prompt engineering.",
    category: "Python & AI",
    fileUrl: "/pdfs/python-ai-essentials.pdf",
    filename: "python-ai-essentials.pdf",
    fileSize: "6.4 KB",
    format: "PDF Document",
    language: "English",
    pageCount: 2,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "Python Idiomatic Syntax & OOP",
      "NumPy Arrays & Vectorized Math",
      "Pandas DataFrames & Transformations",
      "Supervised vs Unsupervised ML",
      "Neural Networks & Deep Learning",
      "LLMs, Prompting & Embeddings"
    ],
    recommendedFor: "Aspiring AI Engineers & Data Scientists"
  },
  {
    id: "pdf-dbms-sql",
    slug: "dbms-sql-cheatsheet",
    title: "Database Management Systems (DBMS) & SQL Handbook",
    description: "Essential database reference: relational schema design, 1NF to BCNF normalization, ACID guarantees, complex SQL queries, and B-Tree indexing.",
    category: "Computer Science Core",
    fileUrl: "/pdfs/dbms-sql-cheatsheet.pdf",
    filename: "dbms-sql-cheatsheet.pdf",
    fileSize: "6.1 KB",
    format: "PDF Document",
    language: "English",
    pageCount: 2,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "ACID Transactions & Isolation Levels",
      "Database Normalization (1NF to 3NF)",
      "Advanced SQL JOINs & Aggregations",
      "B-Tree Indexing & Query Optimization",
      "Sharding & Read Replication",
      "CAP Theorem & NoSQL Tradeoffs"
    ],
    recommendedFor: "Backend Engineers & CS Students"
  },
  {
    id: "pdf-os-networking",
    slug: "os-networking-handbook",
    title: "Operating Systems & Computer Networks Core Handbook",
    description: "Core computer science fundamentals: CPU scheduling, concurrency & deadlocks, virtual memory paging, OSI 7-layer model, and TCP/IP sockets.",
    category: "Computer Science Core",
    fileUrl: "/pdfs/os-networking-handbook.pdf",
    filename: "os-networking-handbook.pdf",
    fileSize: "6.5 KB",
    format: "PDF Document",
    language: "English",
    pageCount: 2,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "Processes vs Threads & Context Switching",
      "CPU Scheduling & Round Robin",
      "Deadlock Conditions & Prevention",
      "Virtual Memory, Paging & TLB",
      "OSI & TCP/IP Network Layers",
      "DNS, Socket APIs & TLS Handshakes"
    ],
    recommendedFor: "CS Undergrads & Placement Interview Prep"
  },
  {
    id: "pdf-docker-devops",
    slug: "docker-devops-guide",
    title: "Docker & Cloud DevOps Production Guide",
    description: "Hands-on guide to containerizing microservices, writing lean multi-stage Dockerfiles, docker-compose orchestration, and CI/CD deployment pipelines.",
    category: "Cloud & DevOps",
    fileUrl: "/pdfs/docker-devops-guide.pdf",
    filename: "docker-devops-guide.pdf",
    fileSize: "6.3 KB",
    format: "PDF Document",
    language: "English",
    pageCount: 2,
    publishedDate: "October 2026",
    status: "published",
    topicsCovered: [
      "Containers vs Virtual Machines",
      "Writing Production Dockerfiles",
      "Multi-Stage Build Optimization",
      "Docker Compose Multi-Container Orchestration",
      "Networking & Volume Persistence",
      "CI/CD Automated Deployment Flows"
    ],
    recommendedFor: "DevOps & Cloud Engineers"
  }
];

export function getAllPdfs(): PdfResource[] {
  return PDF_RESOURCES;
}

export function getPdfBySlug(slug: string): PdfResource | undefined {
  return PDF_RESOURCES.find((p) => p.slug === slug);
}

export function getPdfsByCategory(category: string): PdfResource[] {
  if (category === "All") return PDF_RESOURCES;
  if (category.toLowerCase() === "web development") {
    return PDF_RESOURCES.filter(
      (p) =>
        p.category.toLowerCase() === "web development" ||
        p.category.toLowerCase() === "web fundamentals" ||
        p.category.toLowerCase() === "html" ||
        p.category.toLowerCase() === "css"
    );
  }
  return PDF_RESOURCES.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export const PDF_CATEGORY_COLORS: Record<string, {
  badge: string;
  glow: string;
  hoverBorder: string;
  topLine: string;
  buttonGrad: string;
}> = {
  "Data Structures & Algorithms": {
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(245,158,11,0.22)]",
    hoverBorder: "hover:border-amber-400/60",
    topLine: "via-amber-400/80",
    buttonGrad: "from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-amber-500/20",
  },
  "Python & AI": {
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(16,185,129,0.22)]",
    hoverBorder: "hover:border-emerald-400/60",
    topLine: "via-emerald-400/80",
    buttonGrad: "from-emerald-400 to-lime-400 hover:from-emerald-300 hover:to-lime-300 shadow-emerald-500/20",
  },
  "Computer Science Core": {
    badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(99,102,241,0.22)]",
    hoverBorder: "hover:border-indigo-400/60",
    topLine: "via-indigo-400/80",
    buttonGrad: "from-indigo-400 to-violet-400 hover:from-indigo-300 hover:to-violet-300 shadow-indigo-500/20",
  },
  "Cloud & DevOps": {
    badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(244,63,94,0.22)]",
    hoverBorder: "hover:border-rose-400/60",
    topLine: "via-rose-400/80",
    buttonGrad: "from-rose-400 to-pink-400 hover:from-rose-300 hover:to-pink-300 shadow-rose-500/20",
  },
  "Web Development": {
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(6,182,212,0.22)]",
    hoverBorder: "hover:border-cyan-400/60",
    topLine: "via-cyan-400/80",
    buttonGrad: "from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-cyan-500/20",
  },
  "Web Fundamentals": {
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(6,182,212,0.22)]",
    hoverBorder: "hover:border-cyan-400/60",
    topLine: "via-cyan-400/80",
    buttonGrad: "from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-cyan-500/20",
  },
  "HTML": {
    badge: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(249,115,22,0.22)]",
    hoverBorder: "hover:border-orange-400/60",
    topLine: "via-orange-400/80",
    buttonGrad: "from-orange-400 to-amber-400 hover:from-orange-300 hover:to-amber-300 shadow-orange-500/20",
  },
  "CSS": {
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(59,130,246,0.22)]",
    hoverBorder: "hover:border-blue-400/60",
    topLine: "via-blue-400/80",
    buttonGrad: "from-blue-400 to-cyan-400 hover:from-blue-300 hover:to-cyan-300 shadow-blue-500/20",
  },
  "JavaScript": {
    badge: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(234,179,8,0.22)]",
    hoverBorder: "hover:border-yellow-400/60",
    topLine: "via-yellow-400/80",
    buttonGrad: "from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 shadow-yellow-500/20",
  },
  "React": {
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(14,165,233,0.22)]",
    hoverBorder: "hover:border-sky-400/60",
    topLine: "via-sky-400/80",
    buttonGrad: "from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 shadow-sky-500/20",
  },
  "Next.js": {
    badge: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(20,184,166,0.22)]",
    hoverBorder: "hover:border-teal-400/60",
    topLine: "via-teal-400/80",
    buttonGrad: "from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 shadow-teal-500/20",
  },
  "Git & GitHub": {
    badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(244,63,94,0.22)]",
    hoverBorder: "hover:border-rose-400/60",
    topLine: "via-rose-400/80",
    buttonGrad: "from-rose-400 to-pink-400 hover:from-rose-300 hover:to-pink-300 shadow-rose-500/20",
  },
  "Backend & Databases": {
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(139,92,246,0.22)]",
    hoverBorder: "hover:border-violet-400/60",
    topLine: "via-violet-400/80",
    buttonGrad: "from-violet-400 to-purple-400 hover:from-violet-300 hover:to-purple-300 shadow-violet-500/20",
  },
};

const DEFAULT_PDF_COLOR = {
  badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  glow: "hover:shadow-[0_14px_40px_rgba(6,182,212,0.18)]",
  hoverBorder: "hover:border-cyan-400/50",
  topLine: "via-cyan-400/70",
  buttonGrad: "from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-cyan-500/20",
};

export function getPdfCategoryColors(category: string) {
  return PDF_CATEGORY_COLORS[category] || DEFAULT_PDF_COLOR;
}
