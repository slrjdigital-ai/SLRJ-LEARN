import { Course, getCourseById } from "@/data/courses";
import { PracticalProject, PRACTICAL_PROJECTS } from "@/data/projectsData";

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
  learningObjectives?: string[];
  skills?: string[];
  recommendedOrder?: number;
  requiredCourseIds?: string[];
  relatedProjectIds?: string[];
  recommendedNotes?: Array<{
    title: string;
    slug: string;
  }>;
}

export interface RoadmapTrack {
  id: string;
  slug?: string;
  name: string;
  badge: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Web Development" | "AI & Data Science" | "Systems & Software Engineering" | "Cloud & Cybersecurity" | "Programming & Scripting" | string;
  description: string;
  totalStages: number;
  totalLessons: number;
  duration: string;
  icon: string;
  skills: string[];
  prerequisites?: string[];
  gradient: string;
  accentColor: string;
  isFeatured?: boolean;
  finalProject: {
    title: string;
    description: string;
  };
}

export const ROADMAP_TRACKS: RoadmapTrack[] = [
  {
    "id": "fullstack",
    "slug": "fullstack",
    "name": "Full-Stack Web Developer",
    "badge": "Featured • Most In-Demand",
    "level": "Intermediate",
    "category": "Web Development",
    "description": "Master complete end-to-end web engineering. Build responsive client interfaces, robust backend APIs, relational & document databases, cloud serverless systems, and AI-accelerated workflows.",
    "totalStages": 8,
    "totalLessons": 48,
    "duration": "6 - 8 Months (Estimated)",
    "icon": "Layers",
    "skills": [
      "HTML5 & CSS3",
      "JavaScript & TypeScript",
      "React 19 & Next.js",
      "Node.js & Express",
      "PostgreSQL & MongoDB",
      "Docker & Cloud",
      "AI Developer Tools"
    ],
    "prerequisites": [
      "Basic computer literacy",
      "Logical thinking"
    ],
    "gradient": "from-blue-600 via-indigo-600 to-purple-600",
    "accentColor": "text-indigo-500",
    "isFeatured": true,
    "finalProject": {
      "title": "Production Full-Stack SaaS Platform",
      "description": "Develop a complete production web platform featuring user authentication, PostgreSQL relational database, Next.js Server Components, Docker containerization, and automated CI/CD release."
    }
  },
  {
    "id": "frontend",
    "slug": "frontend",
    "name": "Frontend Developer",
    "badge": "High Demand • Interactive UX",
    "level": "Beginner",
    "category": "Web Development",
    "description": "Craft modern, accessible, high-performance web applications. Master semantic HTML5, advanced CSS layouts (Flexbox/Grid), modern TypeScript, React 19, Next.js, and version control.",
    "totalStages": 5,
    "totalLessons": 30,
    "duration": "4 - 5 Months (Estimated)",
    "icon": "Globe",
    "skills": [
      "Semantic HTML5",
      "Modern CSS & Flexbox/Grid",
      "JavaScript (ES2024)",
      "TypeScript",
      "React 19",
      "Next.js App Router",
      "Lighthouse Optimization"
    ],
    "prerequisites": [
      "Curiosity for web design and user interfaces"
    ],
    "gradient": "from-cyan-500 via-teal-500 to-emerald-500",
    "accentColor": "text-cyan-500",
    "isFeatured": false,
    "finalProject": {
      "title": "Interactive Web Platform & Component System",
      "description": "Build an accessible, high-performance web application with custom component library, state management, dynamic API integration, and 95+ Lighthouse score."
    }
  },
  {
    "id": "backend",
    "slug": "backend",
    "name": "Backend Developer",
    "badge": "Core Engineering • Scalable Systems",
    "level": "Intermediate",
    "category": "Web Development",
    "description": "Architect scalable backend services, high-throughput REST APIs, relational and NoSQL databases, authentication security, containerization, and system resilience.",
    "totalStages": 6,
    "totalLessons": 36,
    "duration": "5 - 7 Months (Estimated)",
    "icon": "Terminal",
    "skills": [
      "TypeScript",
      "Node.js & Express",
      "PostgreSQL & MongoDB",
      "RESTful API Design",
      "Docker & Cloud",
      "OWASP Security",
      "JWT Authentication"
    ],
    "prerequisites": [
      "Basic programming familiarity"
    ],
    "gradient": "from-slate-700 via-slate-800 to-zinc-900",
    "accentColor": "text-slate-600",
    "isFeatured": false,
    "finalProject": {
      "title": "Enterprise Distributed REST API & Microservice",
      "description": "Engineer an authenticated backend service with database connection pooling, Redis caching, role-based authorization, and automated security vulnerability tests."
    }
  },
  {
    "id": "ai-ml",
    "slug": "ai-ml",
    "name": "AI & Machine Learning Engineer",
    "badge": "Cutting-Edge • Top Industry Value",
    "level": "Advanced",
    "category": "AI & Data Science",
    "description": "From Python programming and algorithmic optimization to data analytics, supervised learning, neural networks, vector databases, and production RAG pipelines.",
    "totalStages": 6,
    "totalLessons": 36,
    "duration": "6 - 8 Months (Estimated)",
    "icon": "Sparkles",
    "skills": [
      "Python 3",
      "NumPy & Pandas",
      "Scikit-Learn",
      "Machine Learning",
      "Transformers & LLMs",
      "RAG Pipelines",
      "Vector Databases"
    ],
    "prerequisites": [
      "High school mathematics",
      "Basic programming curiosity"
    ],
    "gradient": "from-purple-600 via-pink-600 to-rose-500",
    "accentColor": "text-purple-500",
    "isFeatured": false,
    "finalProject": {
      "title": "End-to-End Predictive & Generative AI System",
      "description": "Train and evaluate an ML model, generate vector embeddings in a vector database, and build a production RAG inference pipeline served via FastAPI."
    }
  },
  {
    "id": "ai-agents",
    "slug": "ai-agents",
    "name": "Generative AI & Autonomous Agent Architect",
    "badge": "Next-Gen Frontier • Agentic Systems",
    "level": "Advanced",
    "category": "AI & Data Science",
    "description": "Specialize in the frontier of AI: prompt engineering, RAG pipelines, autonomous agents, tool use, Model Context Protocol (MCP), multi-agent systems, and real-time voice AI.",
    "totalStages": 6,
    "totalLessons": 36,
    "duration": "5 - 7 Months (Estimated)",
    "icon": "Sparkles",
    "skills": [
      "Generative AI",
      "LLM APIs",
      "RAG Pipelines",
      "Autonomous Agents",
      "Model Context Protocol",
      "Multi-Agent Systems",
      "Voice AI"
    ],
    "prerequisites": [
      "Python fundamentals"
    ],
    "gradient": "from-violet-600 via-purple-600 to-fuchsia-600",
    "accentColor": "text-violet-500",
    "isFeatured": false,
    "finalProject": {
      "title": "Autonomous Multi-Agent Team Orchestration",
      "description": "Deploy an autonomous collaborative multi-agent software engineering team coordinating via Model Context Protocol (MCP) with real-time conversational voice interaction."
    }
  },
  {
    "id": "dsa",
    "slug": "dsa",
    "name": "Core Software Engineer (Systems & Algorithms)",
    "badge": "Foundations & Performance",
    "level": "Intermediate",
    "category": "Systems & Software Engineering",
    "description": "Build deep low-level system understanding and algorithmic excellence. Master explicit pointer control in C, modern C++ (STL & RAII), advanced data structures, and database engines.",
    "totalStages": 5,
    "totalLessons": 30,
    "duration": "5 - 7 Months (Estimated)",
    "icon": "Code2",
    "skills": [
      "C Programming",
      "Modern C++ (C++20)",
      "Pointers & Memory",
      "Data Structures",
      "Algorithms",
      "Git & GitHub",
      "SQL Relational Design"
    ],
    "prerequisites": [
      "Basic logic and problem solving"
    ],
    "gradient": "from-blue-600 via-indigo-600 to-cyan-500",
    "accentColor": "text-blue-500",
    "isFeatured": false,
    "finalProject": {
      "title": "High-Performance Data Engine & Algorithm Suite",
      "description": "Build a multithreaded data indexing and algorithmic graph engine in C++ with custom memory management and zero memory leaks."
    }
  },
  {
    "id": "java",
    "slug": "java",
    "name": "Enterprise Java Developer",
    "badge": "Enterprise Standard",
    "level": "Intermediate",
    "category": "Systems & Software Engineering",
    "description": "Master modern Java enterprise systems: JVM internals, object-oriented design patterns, Collections framework, algorithmic efficiency, relational SQL databases, and cloud deployment.",
    "totalStages": 5,
    "totalLessons": 30,
    "duration": "5 - 7 Months (Estimated)",
    "icon": "Layers",
    "skills": [
      "Java 21",
      "JVM Internals",
      "Collections Framework",
      "Streams & Lambdas",
      "JDBC & SQL",
      "JUnit 5",
      "Docker Deployment"
    ],
    "prerequisites": [
      "Basic programming familiarity"
    ],
    "gradient": "from-amber-500 via-orange-500 to-red-500",
    "accentColor": "text-amber-500",
    "isFeatured": false,
    "finalProject": {
      "title": "Enterprise Multi-Tier Java Service",
      "description": "Architect a robust enterprise service with relational database persistence via JDBC, unit testing via JUnit 5, and containerized deployment."
    }
  },
  {
    "id": "data-analyst",
    "slug": "data-analyst",
    "name": "AI Data Analyst & BI Specialist",
    "badge": "High Business Value",
    "level": "Beginner",
    "category": "AI & Data Science",
    "description": "Turn raw data into strategic business value: Python Pandas dataframes, advanced SQL queries and window functions, executive BI dashboards, and predictive machine learning models.",
    "totalStages": 5,
    "totalLessons": 30,
    "duration": "4 - 5 Months (Estimated)",
    "icon": "BarChart3",
    "skills": [
      "Python",
      "Pandas & NumPy",
      "SQL Window Functions",
      "Exploratory Data Analysis",
      "Dashboards & BI",
      "Machine Learning"
    ],
    "prerequisites": [
      "Curiosity for data and numbers"
    ],
    "gradient": "from-teal-500 via-emerald-500 to-cyan-500",
    "accentColor": "text-teal-500",
    "isFeatured": false,
    "finalProject": {
      "title": "Executive Business Intelligence Dashboard",
      "description": "Clean and transform complex multi-table datasets, execute advanced SQL analytics, and build an interactive executive KPI dashboard with predictive trend models."
    }
  },
  {
    "id": "cloud-devops",
    "slug": "cloud-devops",
    "name": "Cloud, DevOps & Cybersecurity Engineer",
    "badge": "Infrastructure Defense & Scale",
    "level": "Intermediate",
    "category": "Cloud & Cybersecurity",
    "description": "Protect and automate modern cloud infrastructure: Git collaboration, database administration, defensive cybersecurity (OWASP Top 10), Docker containerization, CI/CD, and AI developer tooling.",
    "totalStages": 5,
    "totalLessons": 30,
    "duration": "5 - 7 Months (Estimated)",
    "icon": "ShieldCheck",
    "skills": [
      "Git & CI/CD",
      "Docker Containers",
      "Kubernetes Basics",
      "OWASP Web Security",
      "Linux Hardening",
      "Cloud Deployment",
      "AI Developer Tools"
    ],
    "prerequisites": [
      "Basic command-line and operating systems knowledge"
    ],
    "gradient": "from-sky-600 via-indigo-600 to-cyan-500",
    "accentColor": "text-sky-500",
    "isFeatured": false,
    "finalProject": {
      "title": "Automated Cloud Deployment Pipeline & Security Audit",
      "description": "Containerize microservices with Docker Compose, build automated GitHub Actions CI/CD release pipelines, and execute comprehensive OWASP security audits."
    }
  },
  {
    "id": "python",
    "slug": "python",
    "name": "Python & Systems Automation Developer",
    "badge": "Beginner Friendly • Versatile",
    "level": "Beginner",
    "category": "Programming & Scripting",
    "description": "Learn Python from the ground up to enterprise capability: OOP design, data structures, relational and document databases, version control, and AI-assisted software acceleration.",
    "totalStages": 5,
    "totalLessons": 30,
    "duration": "3 - 5 Months (Estimated)",
    "icon": "Code2",
    "skills": [
      "Python 3",
      "OOP Architecture",
      "Data Structures",
      "SQL & MongoDB",
      "Git & GitHub",
      "AI Coding Tools"
    ],
    "prerequisites": [
      "No prior programming experience required"
    ],
    "gradient": "from-emerald-500 via-teal-500 to-cyan-500",
    "accentColor": "text-emerald-500",
    "isFeatured": false,
    "finalProject": {
      "title": "Python Automation Suite & Database Tool",
      "description": "Build an automated data collection and persistence pipeline with database integration, unit testing, and structured logging."
    }
  },
  {
    "id": "cybersecurity",
    "slug": "cybersecurity",
    "name": "Cybersecurity Defense Specialist",
    "badge": "Security Core",
    "level": "Intermediate",
    "category": "Cloud & Cybersecurity",
    "description": "Defend modern networks and web applications: networking fundamentals, cryptography, OWASP Top 10 vulnerabilities, secure system administration, and cloud container hardening.",
    "totalStages": 5,
    "totalLessons": 30,
    "duration": "5 - 7 Months (Estimated)",
    "icon": "ShieldCheck",
    "skills": [
      "Network Security",
      "Cryptography",
      "OWASP Top 10",
      "Linux Hardening",
      "Container Security",
      "Vulnerability Remediation"
    ],
    "prerequisites": [
      "Basic networking and command-line familiarity"
    ],
    "gradient": "from-rose-600 via-red-600 to-orange-500",
    "accentColor": "text-rose-500",
    "isFeatured": false,
    "finalProject": {
      "title": "Vulnerability Assessment & Defensive Lab",
      "description": "Conduct security audits on web systems, remediate SQL injection and XSS vulnerabilities, and configure firewall and container isolation."
    }
  }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    "id": 1,
    "stepNumber": 1,
    "slug": "fullstack-html-css",
    "title": "HTML & CSS: Responsive Architecture & Design Systems",
    "trackId": "fullstack",
    "category": "Web Development",
    "summary": "Master semantic HTML5 architecture, modern CSS layout systems (Flexbox, CSS Grid), responsive design patterns, accessible forms, and CSS variable design systems.",
    "duration": "3 - 4 Weeks (18 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Semantic HTML5 & Document Outline",
      "CSS Box Model, Specificity & The Cascade",
      "CSS Flexbox 1D & CSS Grid 2D Systems",
      "Mobile-First Responsive Layouts & Media Queries",
      "WCAG 2.1 Web Accessibility & Color Contrast"
    ],
    "practicalMilestone": "Build a responsive multi-page marketing landing page and accessible contact form scoring 98+ on Lighthouse.",
    "learningObjectives": [
      "Semantic HTML5 & Document Outline",
      "CSS Box Model, Specificity & The Cascade",
      "CSS Flexbox 1D & CSS Grid 2D Systems",
      "Mobile-First Responsive Layouts & Media Queries",
      "WCAG 2.1 Web Accessibility & Color Contrast"
    ],
    "skills": [
      "HTML5 Semantics",
      "CSS Grid",
      "Flexbox",
      "Responsive Design",
      "Web Accessibility",
      "Design Systems"
    ],
    "requiredCourseIds": [
      "course-html-css"
    ],
    "relatedProjectIds": [
      "proj-portfolio"
    ],
    "recommendedNotes": [
      {
        "title": "HTML5 Document Structure & Best Practices",
        "slug": "html-basics-document-structure"
      },
      {
        "title": "CSS Selectors, Specificity & Box Model",
        "slug": "css-selectors-specificity-box-model"
      }
    ]
  },
  {
    "id": 2,
    "stepNumber": 2,
    "slug": "fullstack-javascript-typescript",
    "title": "JavaScript & Modern TypeScript: Foundations to Full-Stack",
    "trackId": "fullstack",
    "category": "Programming Languages",
    "summary": "From core JavaScript mechanics (Closures, Prototypes, Event Loop, Promises, Async/Await) to enterprise TypeScript static typing, generics, interfaces, and strict type safety.",
    "duration": "4 - 6 Weeks (24 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "JavaScript Execution Context, Scopes & Closures",
      "Asynchronous JS: Event Loop, Microtasks & Promises",
      "DOM Manipulation, Browser APIs & Local Storage",
      "TypeScript Type System: Interfaces, Unions & Generics",
      "Strict Compiler Configuration & Utility Types"
    ],
    "practicalMilestone": "Develop an interactive data-driven task and Kanban platform with localStorage sync and zero TypeScript warnings.",
    "learningObjectives": [
      "JavaScript Execution Context, Scopes & Closures",
      "Asynchronous JS: Event Loop, Microtasks & Promises",
      "DOM Manipulation, Browser APIs & Local Storage",
      "TypeScript Type System: Interfaces, Unions & Generics",
      "Strict Compiler Configuration & Utility Types"
    ],
    "skills": [
      "JavaScript (ES2024)",
      "TypeScript",
      "Async Programming",
      "DOM APIs",
      "Generics",
      "Type Narrowing"
    ],
    "requiredCourseIds": [
      "course-javascript-typescript"
    ],
    "relatedProjectIds": [
      "proj-task-manager"
    ],
    "recommendedNotes": [
      {
        "title": "JavaScript Promises, Async/Await & Fetching",
        "slug": "javascript-promises-async-await"
      }
    ]
  },
  {
    "id": 3,
    "stepNumber": 3,
    "slug": "fullstack-git-github",
    "title": "Git & GitHub: Professional Version Control & Collaboration",
    "trackId": "fullstack",
    "category": "Data Structures & Developer Tools",
    "summary": "Master industry version control: Git internal object model (Blobs, Trees, Commits), interactive rebasing, branch management, merge conflict resolution, pull request workflows, and GitHub Actions.",
    "duration": "2 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "practicalMilestone": "Initialize a multi-branch repository, execute feature development with interactive rebasing, and open a clean PR with CI checks.",
    "learningObjectives": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "skills": [
      "Git CLI",
      "GitHub",
      "Branch Management",
      "Rebase & Cherry-Pick",
      "Code Review",
      "CI/CD Workflows"
    ],
    "requiredCourseIds": [
      "course-git-github"
    ],
    "relatedProjectIds": [
      "proj-portfolio"
    ],
    "recommendedNotes": [
      {
        "title": "Git, GitHub & Professional Collaboration",
        "slug": "git-fundamentals-commands-guide"
      }
    ]
  },
  {
    "id": 4,
    "stepNumber": 4,
    "slug": "fullstack-react-nextjs",
    "title": "React & Next.js: Full-Stack Enterprise Architecture",
    "trackId": "fullstack",
    "category": "Web Development",
    "summary": "Build full-stack web applications with React 19 and Next.js App Router: Server Components, Server Actions, state management, streaming Suspense, dynamic routing, and caching layers.",
    "duration": "6 - 8 Weeks (30 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "React 19 Core: Virtual DOM, State, Hooks & Custom Hooks",
      "Next.js App Router: Server vs Client Components",
      "Server Actions, Mutations & Optimistic UI Updates",
      "Streaming with Suspense & Partial Prerendering",
      "SEO Metadata, Open Graph & Image Optimization"
    ],
    "practicalMilestone": "Architect an end-to-end full-stack portal with dynamic server-rendered pages, server actions for data persistence, and optimistic state.",
    "learningObjectives": [
      "React 19 Core: Virtual DOM, State, Hooks & Custom Hooks",
      "Next.js App Router: Server vs Client Components",
      "Server Actions, Mutations & Optimistic UI Updates",
      "Streaming with Suspense & Partial Prerendering",
      "SEO Metadata, Open Graph & Image Optimization"
    ],
    "skills": [
      "React 19",
      "Next.js App Router",
      "Server Components",
      "Server Actions",
      "Streaming SSR",
      "State Management"
    ],
    "requiredCourseIds": [
      "course-react-nextjs"
    ],
    "relatedProjectIds": [
      "proj-task-manager"
    ],
    "recommendedNotes": [
      {
        "title": "React Components, Props & State Architecture",
        "slug": "react-components-props-state"
      },
      {
        "title": "Next.js App Router, Server Components & Layouts",
        "slug": "nextjs-app-router-layouts"
      }
    ]
  },
  {
    "id": 5,
    "stepNumber": 5,
    "slug": "fullstack-nodejs-express",
    "title": "Node.js & Express: Scalable Backend Services & APIs",
    "trackId": "fullstack",
    "category": "Web Development",
    "summary": "Design scalable RESTful APIs and backend microservices: Node.js V8 runtime, non-blocking I/O, middleware pipelines, JWT/OAuth2 authentication, error handling, rate limiting, and database connectivity.",
    "duration": "4 - 6 Weeks (22 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Node.js Event Loop, Streams, Buffers & File System",
      "Express.js Routing, Middleware Pipeline & Controllers",
      "RESTful API Design & HTTP Status Architecture",
      "User Authentication with JWT & Bcrypt Password Hashing",
      "Input Validation, CORS, Rate Limiting & Security Headers"
    ],
    "practicalMilestone": "Build a production-ready REST API with authenticated endpoints, role-based access control, input validation, and automated error logging.",
    "learningObjectives": [
      "Node.js Event Loop, Streams, Buffers & File System",
      "Express.js Routing, Middleware Pipeline & Controllers",
      "RESTful API Design & HTTP Status Architecture",
      "User Authentication with JWT & Bcrypt Password Hashing",
      "Input Validation, CORS, Rate Limiting & Security Headers"
    ],
    "skills": [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Middleware",
      "API Security"
    ],
    "requiredCourseIds": [
      "course-nodejs-express"
    ],
    "relatedProjectIds": [
      "proj-snippet-vault"
    ],
    "recommendedNotes": [
      {
        "title": "RESTful API Design, Express & Microservices",
        "slug": "rest-apis-design-architecture"
      }
    ]
  },
  {
    "id": 6,
    "stepNumber": 6,
    "slug": "fullstack-sql-mongodb",
    "title": "SQL & MongoDB: Relational & Document Data Architecture",
    "trackId": "fullstack",
    "category": "Databases & Infrastructure",
    "summary": "Master both relational and NoSQL database paradigms: PostgreSQL/MySQL complex joins, indexes, transactions, schema normalization, and MongoDB aggregation pipelines and flexible document models.",
    "duration": "4 - 5 Weeks (20 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "practicalMilestone": "Design a dual-database schema for an e-commerce platform using PostgreSQL for financial transactions and MongoDB for catalog data.",
    "learningObjectives": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "skills": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQL Joins",
      "Indexing",
      "Aggregation Pipelines",
      "ACID Transactions"
    ],
    "requiredCourseIds": [
      "course-sql-mongodb"
    ],
    "relatedProjectIds": [
      "proj-data-analytics"
    ],
    "recommendedNotes": [
      {
        "title": "DBMS, SQL Queries & Relational Database Design",
        "slug": "dbms-sql-relational-design"
      }
    ]
  },
  {
    "id": 7,
    "stepNumber": 7,
    "slug": "fullstack-cloud-native-serverless",
    "title": "Cloud-Native & Serverless Development: Scalable Distributed Systems",
    "trackId": "fullstack",
    "category": "Databases & Infrastructure",
    "summary": "Containerize applications and deploy resilient cloud services: Docker multi-stage builds, Kubernetes orchestration concepts, serverless functions, CI/CD automated release pipelines, and cloud monitoring.",
    "duration": "4 - 6 Weeks (20 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Docker Multi-Stage Builds & Container Optimization",
      "Docker Compose for Multi-Container Environments",
      "Cloud Architectures (AWS/GCP), Serverless & Edge Compute",
      "Kubernetes Pods, Services, Deployments & Ingress",
      "CI/CD Pipelines with GitHub Actions & Cloud Deployment"
    ],
    "practicalMilestone": "Containerize a full-stack web application with Docker Compose, configure automated GitHub Actions CI/CD, and deploy to cloud hosting.",
    "learningObjectives": [
      "Docker Multi-Stage Builds & Container Optimization",
      "Docker Compose for Multi-Container Environments",
      "Cloud Architectures (AWS/GCP), Serverless & Edge Compute",
      "Kubernetes Pods, Services, Deployments & Ingress",
      "CI/CD Pipelines with GitHub Actions & Cloud Deployment"
    ],
    "skills": [
      "Docker",
      "Kubernetes",
      "Serverless",
      "CI/CD",
      "AWS/Cloud",
      "Containerization"
    ],
    "requiredCourseIds": [
      "course-cloud-native-serverless"
    ],
    "relatedProjectIds": [
      "proj-ecommerce"
    ],
    "recommendedNotes": [
      {
        "title": "Cloud Computing, Docker & Containerization",
        "slug": "cloud-docker-containerization"
      }
    ]
  },
  {
    "id": 8,
    "stepNumber": 8,
    "slug": "fullstack-ai-assisted-coding",
    "title": "AI-Assisted Coding & Developer Tools: Accelerated Software Engineering",
    "trackId": "fullstack",
    "category": "Data Structures & Developer Tools",
    "summary": "10x your software engineering velocity: leverage modern AI coding assistants (Claude Code, GitHub Copilot, Cursor), prompt engineering for code generation, test synthesis, automated refactoring, and AI code review.",
    "duration": "2 - 3 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "AI Coding Assistant Mechanics & Context Windows",
      "Effective Prompt Engineering for Code Generation",
      "Automated Test Generation (Unit & Integration)",
      "AI-Assisted Code Refactoring & Security Auditing",
      "Multi-Agent Coding Workflows & Terminal Integration"
    ],
    "practicalMilestone": "Build a feature module end-to-end using AI coding assistants for architecture planning, test writing, implementation, and documentation.",
    "learningObjectives": [
      "AI Coding Assistant Mechanics & Context Windows",
      "Effective Prompt Engineering for Code Generation",
      "Automated Test Generation (Unit & Integration)",
      "AI-Assisted Code Refactoring & Security Auditing",
      "Multi-Agent Coding Workflows & Terminal Integration"
    ],
    "skills": [
      "AI Developer Tools",
      "Code Prompting",
      "Automated Testing",
      "Code Refactoring",
      "Developer Velocity"
    ],
    "requiredCourseIds": [
      "course-ai-assisted-coding"
    ],
    "relatedProjectIds": [
      "proj-task-manager"
    ],
    "recommendedNotes": [
      {
        "title": "Modern JavaScript & TypeScript Fundamentals",
        "slug": "javascript-promises-async-await"
      }
    ]
  },
  {
    "id": 9,
    "stepNumber": 1,
    "slug": "frontend-html-css",
    "title": "HTML & CSS: Responsive Architecture & Design Systems",
    "trackId": "frontend",
    "category": "Web Development",
    "summary": "Master semantic HTML5 architecture, modern CSS layout systems (Flexbox, CSS Grid), responsive design patterns, accessible forms, and CSS variable design systems.",
    "duration": "3 - 4 Weeks (18 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Semantic HTML5 & Document Outline",
      "CSS Box Model, Specificity & The Cascade",
      "CSS Flexbox 1D & CSS Grid 2D Systems",
      "Mobile-First Responsive Layouts & Media Queries",
      "WCAG 2.1 Web Accessibility & Color Contrast"
    ],
    "practicalMilestone": "Build a responsive multi-page marketing landing page and accessible contact form scoring 98+ on Lighthouse.",
    "learningObjectives": [
      "Semantic HTML5 & Document Outline",
      "CSS Box Model, Specificity & The Cascade",
      "CSS Flexbox 1D & CSS Grid 2D Systems",
      "Mobile-First Responsive Layouts & Media Queries",
      "WCAG 2.1 Web Accessibility & Color Contrast"
    ],
    "skills": [
      "HTML5 Semantics",
      "CSS Grid",
      "Flexbox",
      "Responsive Design",
      "Web Accessibility",
      "Design Systems"
    ],
    "requiredCourseIds": [
      "course-html-css"
    ],
    "relatedProjectIds": [
      "proj-portfolio"
    ],
    "recommendedNotes": [
      {
        "title": "HTML5 Document Structure & Best Practices",
        "slug": "html-basics-document-structure"
      },
      {
        "title": "CSS Selectors, Specificity & Box Model",
        "slug": "css-selectors-specificity-box-model"
      }
    ]
  },
  {
    "id": 10,
    "stepNumber": 2,
    "slug": "frontend-javascript-typescript",
    "title": "JavaScript & Modern TypeScript: Foundations to Full-Stack",
    "trackId": "frontend",
    "category": "Programming Languages",
    "summary": "From core JavaScript mechanics (Closures, Prototypes, Event Loop, Promises, Async/Await) to enterprise TypeScript static typing, generics, interfaces, and strict type safety.",
    "duration": "4 - 6 Weeks (24 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "JavaScript Execution Context, Scopes & Closures",
      "Asynchronous JS: Event Loop, Microtasks & Promises",
      "DOM Manipulation, Browser APIs & Local Storage",
      "TypeScript Type System: Interfaces, Unions & Generics",
      "Strict Compiler Configuration & Utility Types"
    ],
    "practicalMilestone": "Develop an interactive data-driven task and Kanban platform with localStorage sync and zero TypeScript warnings.",
    "learningObjectives": [
      "JavaScript Execution Context, Scopes & Closures",
      "Asynchronous JS: Event Loop, Microtasks & Promises",
      "DOM Manipulation, Browser APIs & Local Storage",
      "TypeScript Type System: Interfaces, Unions & Generics",
      "Strict Compiler Configuration & Utility Types"
    ],
    "skills": [
      "JavaScript (ES2024)",
      "TypeScript",
      "Async Programming",
      "DOM APIs",
      "Generics",
      "Type Narrowing"
    ],
    "requiredCourseIds": [
      "course-javascript-typescript"
    ],
    "relatedProjectIds": [
      "proj-task-manager"
    ],
    "recommendedNotes": [
      {
        "title": "JavaScript Promises, Async/Await & Fetching",
        "slug": "javascript-promises-async-await"
      }
    ]
  },
  {
    "id": 11,
    "stepNumber": 3,
    "slug": "frontend-git-github",
    "title": "Git & GitHub: Professional Version Control & Collaboration",
    "trackId": "frontend",
    "category": "Data Structures & Developer Tools",
    "summary": "Master industry version control: Git internal object model (Blobs, Trees, Commits), interactive rebasing, branch management, merge conflict resolution, pull request workflows, and GitHub Actions.",
    "duration": "2 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "practicalMilestone": "Initialize a multi-branch repository, execute feature development with interactive rebasing, and open a clean PR with CI checks.",
    "learningObjectives": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "skills": [
      "Git CLI",
      "GitHub",
      "Branch Management",
      "Rebase & Cherry-Pick",
      "Code Review",
      "CI/CD Workflows"
    ],
    "requiredCourseIds": [
      "course-git-github"
    ],
    "relatedProjectIds": [
      "proj-portfolio"
    ],
    "recommendedNotes": [
      {
        "title": "Git, GitHub & Professional Collaboration",
        "slug": "git-fundamentals-commands-guide"
      }
    ]
  },
  {
    "id": 12,
    "stepNumber": 4,
    "slug": "frontend-react-nextjs",
    "title": "React & Next.js: Full-Stack Enterprise Architecture",
    "trackId": "frontend",
    "category": "Web Development",
    "summary": "Build full-stack web applications with React 19 and Next.js App Router: Server Components, Server Actions, state management, streaming Suspense, dynamic routing, and caching layers.",
    "duration": "6 - 8 Weeks (30 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "React 19 Core: Virtual DOM, State, Hooks & Custom Hooks",
      "Next.js App Router: Server vs Client Components",
      "Server Actions, Mutations & Optimistic UI Updates",
      "Streaming with Suspense & Partial Prerendering",
      "SEO Metadata, Open Graph & Image Optimization"
    ],
    "practicalMilestone": "Architect an end-to-end full-stack portal with dynamic server-rendered pages, server actions for data persistence, and optimistic state.",
    "learningObjectives": [
      "React 19 Core: Virtual DOM, State, Hooks & Custom Hooks",
      "Next.js App Router: Server vs Client Components",
      "Server Actions, Mutations & Optimistic UI Updates",
      "Streaming with Suspense & Partial Prerendering",
      "SEO Metadata, Open Graph & Image Optimization"
    ],
    "skills": [
      "React 19",
      "Next.js App Router",
      "Server Components",
      "Server Actions",
      "Streaming SSR",
      "State Management"
    ],
    "requiredCourseIds": [
      "course-react-nextjs"
    ],
    "relatedProjectIds": [
      "proj-task-manager"
    ],
    "recommendedNotes": [
      {
        "title": "React Components, Props & State Architecture",
        "slug": "react-components-props-state"
      },
      {
        "title": "Next.js App Router, Server Components & Layouts",
        "slug": "nextjs-app-router-layouts"
      }
    ]
  },
  {
    "id": 13,
    "stepNumber": 5,
    "slug": "frontend-ai-assisted-coding",
    "title": "AI-Assisted Coding & Developer Tools: Accelerated Software Engineering",
    "trackId": "frontend",
    "category": "Data Structures & Developer Tools",
    "summary": "10x your software engineering velocity: leverage modern AI coding assistants (Claude Code, GitHub Copilot, Cursor), prompt engineering for code generation, test synthesis, automated refactoring, and AI code review.",
    "duration": "2 - 3 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "AI Coding Assistant Mechanics & Context Windows",
      "Effective Prompt Engineering for Code Generation",
      "Automated Test Generation (Unit & Integration)",
      "AI-Assisted Code Refactoring & Security Auditing",
      "Multi-Agent Coding Workflows & Terminal Integration"
    ],
    "practicalMilestone": "Build a feature module end-to-end using AI coding assistants for architecture planning, test writing, implementation, and documentation.",
    "learningObjectives": [
      "AI Coding Assistant Mechanics & Context Windows",
      "Effective Prompt Engineering for Code Generation",
      "Automated Test Generation (Unit & Integration)",
      "AI-Assisted Code Refactoring & Security Auditing",
      "Multi-Agent Coding Workflows & Terminal Integration"
    ],
    "skills": [
      "AI Developer Tools",
      "Code Prompting",
      "Automated Testing",
      "Code Refactoring",
      "Developer Velocity"
    ],
    "requiredCourseIds": [
      "course-ai-assisted-coding"
    ],
    "relatedProjectIds": [
      "proj-task-manager"
    ],
    "recommendedNotes": [
      {
        "title": "Modern JavaScript & TypeScript Fundamentals",
        "slug": "javascript-promises-async-await"
      }
    ]
  },
  {
    "id": 14,
    "stepNumber": 1,
    "slug": "backend-javascript-typescript",
    "title": "JavaScript & Modern TypeScript: Foundations to Full-Stack",
    "trackId": "backend",
    "category": "Programming Languages",
    "summary": "From core JavaScript mechanics (Closures, Prototypes, Event Loop, Promises, Async/Await) to enterprise TypeScript static typing, generics, interfaces, and strict type safety.",
    "duration": "4 - 6 Weeks (24 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "JavaScript Execution Context, Scopes & Closures",
      "Asynchronous JS: Event Loop, Microtasks & Promises",
      "DOM Manipulation, Browser APIs & Local Storage",
      "TypeScript Type System: Interfaces, Unions & Generics",
      "Strict Compiler Configuration & Utility Types"
    ],
    "practicalMilestone": "Develop an interactive data-driven task and Kanban platform with localStorage sync and zero TypeScript warnings.",
    "learningObjectives": [
      "JavaScript Execution Context, Scopes & Closures",
      "Asynchronous JS: Event Loop, Microtasks & Promises",
      "DOM Manipulation, Browser APIs & Local Storage",
      "TypeScript Type System: Interfaces, Unions & Generics",
      "Strict Compiler Configuration & Utility Types"
    ],
    "skills": [
      "JavaScript (ES2024)",
      "TypeScript",
      "Async Programming",
      "DOM APIs",
      "Generics",
      "Type Narrowing"
    ],
    "requiredCourseIds": [
      "course-javascript-typescript"
    ],
    "relatedProjectIds": [
      "proj-task-manager"
    ],
    "recommendedNotes": [
      {
        "title": "JavaScript Promises, Async/Await & Fetching",
        "slug": "javascript-promises-async-await"
      }
    ]
  },
  {
    "id": 15,
    "stepNumber": 2,
    "slug": "backend-nodejs-express",
    "title": "Node.js & Express: Scalable Backend Services & APIs",
    "trackId": "backend",
    "category": "Web Development",
    "summary": "Design scalable RESTful APIs and backend microservices: Node.js V8 runtime, non-blocking I/O, middleware pipelines, JWT/OAuth2 authentication, error handling, rate limiting, and database connectivity.",
    "duration": "4 - 6 Weeks (22 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Node.js Event Loop, Streams, Buffers & File System",
      "Express.js Routing, Middleware Pipeline & Controllers",
      "RESTful API Design & HTTP Status Architecture",
      "User Authentication with JWT & Bcrypt Password Hashing",
      "Input Validation, CORS, Rate Limiting & Security Headers"
    ],
    "practicalMilestone": "Build a production-ready REST API with authenticated endpoints, role-based access control, input validation, and automated error logging.",
    "learningObjectives": [
      "Node.js Event Loop, Streams, Buffers & File System",
      "Express.js Routing, Middleware Pipeline & Controllers",
      "RESTful API Design & HTTP Status Architecture",
      "User Authentication with JWT & Bcrypt Password Hashing",
      "Input Validation, CORS, Rate Limiting & Security Headers"
    ],
    "skills": [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Middleware",
      "API Security"
    ],
    "requiredCourseIds": [
      "course-nodejs-express"
    ],
    "relatedProjectIds": [
      "proj-snippet-vault"
    ],
    "recommendedNotes": [
      {
        "title": "RESTful API Design, Express & Microservices",
        "slug": "rest-apis-design-architecture"
      }
    ]
  },
  {
    "id": 16,
    "stepNumber": 3,
    "slug": "backend-sql-mongodb",
    "title": "SQL & MongoDB: Relational & Document Data Architecture",
    "trackId": "backend",
    "category": "Databases & Infrastructure",
    "summary": "Master both relational and NoSQL database paradigms: PostgreSQL/MySQL complex joins, indexes, transactions, schema normalization, and MongoDB aggregation pipelines and flexible document models.",
    "duration": "4 - 5 Weeks (20 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "practicalMilestone": "Design a dual-database schema for an e-commerce platform using PostgreSQL for financial transactions and MongoDB for catalog data.",
    "learningObjectives": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "skills": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQL Joins",
      "Indexing",
      "Aggregation Pipelines",
      "ACID Transactions"
    ],
    "requiredCourseIds": [
      "course-sql-mongodb"
    ],
    "relatedProjectIds": [
      "proj-data-analytics"
    ],
    "recommendedNotes": [
      {
        "title": "DBMS, SQL Queries & Relational Database Design",
        "slug": "dbms-sql-relational-design"
      }
    ]
  },
  {
    "id": 17,
    "stepNumber": 4,
    "slug": "backend-git-github",
    "title": "Git & GitHub: Professional Version Control & Collaboration",
    "trackId": "backend",
    "category": "Data Structures & Developer Tools",
    "summary": "Master industry version control: Git internal object model (Blobs, Trees, Commits), interactive rebasing, branch management, merge conflict resolution, pull request workflows, and GitHub Actions.",
    "duration": "2 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "practicalMilestone": "Initialize a multi-branch repository, execute feature development with interactive rebasing, and open a clean PR with CI checks.",
    "learningObjectives": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "skills": [
      "Git CLI",
      "GitHub",
      "Branch Management",
      "Rebase & Cherry-Pick",
      "Code Review",
      "CI/CD Workflows"
    ],
    "requiredCourseIds": [
      "course-git-github"
    ],
    "relatedProjectIds": [
      "proj-portfolio"
    ],
    "recommendedNotes": [
      {
        "title": "Git, GitHub & Professional Collaboration",
        "slug": "git-fundamentals-commands-guide"
      }
    ]
  },
  {
    "id": 18,
    "stepNumber": 5,
    "slug": "backend-cloud-native-serverless",
    "title": "Cloud-Native & Serverless Development: Scalable Distributed Systems",
    "trackId": "backend",
    "category": "Databases & Infrastructure",
    "summary": "Containerize applications and deploy resilient cloud services: Docker multi-stage builds, Kubernetes orchestration concepts, serverless functions, CI/CD automated release pipelines, and cloud monitoring.",
    "duration": "4 - 6 Weeks (20 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Docker Multi-Stage Builds & Container Optimization",
      "Docker Compose for Multi-Container Environments",
      "Cloud Architectures (AWS/GCP), Serverless & Edge Compute",
      "Kubernetes Pods, Services, Deployments & Ingress",
      "CI/CD Pipelines with GitHub Actions & Cloud Deployment"
    ],
    "practicalMilestone": "Containerize a full-stack web application with Docker Compose, configure automated GitHub Actions CI/CD, and deploy to cloud hosting.",
    "learningObjectives": [
      "Docker Multi-Stage Builds & Container Optimization",
      "Docker Compose for Multi-Container Environments",
      "Cloud Architectures (AWS/GCP), Serverless & Edge Compute",
      "Kubernetes Pods, Services, Deployments & Ingress",
      "CI/CD Pipelines with GitHub Actions & Cloud Deployment"
    ],
    "skills": [
      "Docker",
      "Kubernetes",
      "Serverless",
      "CI/CD",
      "AWS/Cloud",
      "Containerization"
    ],
    "requiredCourseIds": [
      "course-cloud-native-serverless"
    ],
    "relatedProjectIds": [
      "proj-ecommerce"
    ],
    "recommendedNotes": [
      {
        "title": "Cloud Computing, Docker & Containerization",
        "slug": "cloud-docker-containerization"
      }
    ]
  },
  {
    "id": 19,
    "stepNumber": 6,
    "slug": "backend-cybersecurity-fundamentals",
    "title": "Cybersecurity Fundamentals: Network Defense & Secure Systems",
    "trackId": "backend",
    "category": "Databases & Infrastructure",
    "summary": "Defend systems against real-world attacks: networking fundamentals (TCP/IP, DNS, TLS), Linux security hardening, OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, SSRF), cryptography, and defensive posture.",
    "duration": "4 - 6 Weeks (20 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Computer Networking: TCP/IP Stack, Subnets & Firewalls",
      "Cryptographic Primitives: Symmetric/Asymmetric, Hashing & TLS",
      "OWASP Top 10 Web Security Vulnerabilities & Remediation",
      "Linux System Hardening, File Permissions & SSH Keys",
      "Security Auditing, Vulnerability Scanning & Defense in Depth"
    ],
    "practicalMilestone": "Perform a security audit of a web application, remediate OWASP Top 10 vulnerabilities, and configure firewall protection.",
    "learningObjectives": [
      "Computer Networking: TCP/IP Stack, Subnets & Firewalls",
      "Cryptographic Primitives: Symmetric/Asymmetric, Hashing & TLS",
      "OWASP Top 10 Web Security Vulnerabilities & Remediation",
      "Linux System Hardening, File Permissions & SSH Keys",
      "Security Auditing, Vulnerability Scanning & Defense in Depth"
    ],
    "skills": [
      "Network Security",
      "Cryptography",
      "OWASP Top 10",
      "Linux Hardening",
      "Penetration Testing Basics",
      "Defense in Depth"
    ],
    "requiredCourseIds": [
      "course-cybersecurity-fundamentals"
    ],
    "relatedProjectIds": [
      "proj-python-automation"
    ],
    "recommendedNotes": [
      {
        "title": "Operating Systems: Process, Threads & Concurrency",
        "slug": "operating-systems-process-threads"
      }
    ]
  },
  {
    "id": 20,
    "stepNumber": 1,
    "slug": "ai-ml-python-programming",
    "title": "Python Programming: Fundamentals to Enterprise Applications",
    "trackId": "ai-ml",
    "category": "Programming Languages",
    "summary": "Master Python programming from syntax, data structures, and object-oriented programming to file I/O, error handling, package management, automated scripting, and modern Python type hinting.",
    "duration": "4 - 6 Weeks (22 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Python 3 Syntax, Dynamic Typing & Control Structures",
      "Data Structures: Lists, Tuples, Dictionaries & Sets",
      "Object-Oriented Programming (Classes, Inheritance, Polymorphism)",
      "File Operations, JSON Parsing & Exception Handling",
      "Virtual Environments, Pip, PyTest & Code Modularization"
    ],
    "practicalMilestone": "Build an automated command-line data processing tool that ingests JSON/CSV datasets, validates integrity, and generates structured summaries.",
    "learningObjectives": [
      "Python 3 Syntax, Dynamic Typing & Control Structures",
      "Data Structures: Lists, Tuples, Dictionaries & Sets",
      "Object-Oriented Programming (Classes, Inheritance, Polymorphism)",
      "File Operations, JSON Parsing & Exception Handling",
      "Virtual Environments, Pip, PyTest & Code Modularization"
    ],
    "skills": [
      "Python 3",
      "OOP",
      "Data Structures",
      "Scripting",
      "PyTest",
      "File I/O"
    ],
    "requiredCourseIds": [
      "course-python-programming"
    ],
    "relatedProjectIds": [
      "proj-python-automation"
    ],
    "recommendedNotes": [
      {
        "title": "Python Programming & Object-Oriented Principles",
        "slug": "python-fundamentals-oop"
      }
    ]
  },
  {
    "id": 21,
    "stepNumber": 2,
    "slug": "ai-ml-dsa-algorithms",
    "title": "Data Structures & Algorithms in Production",
    "trackId": "ai-ml",
    "category": "Data Structures & Developer Tools",
    "summary": "Master computer science algorithmic problem-solving: Big-O asymptotic analysis, dynamic arrays, linked lists, hash tables, trees, binary search trees, graph traversals (BFS/DFS), and dynamic programming.",
    "duration": "6 - 8 Weeks (28 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Asymptotic Analysis: Big-O, Time & Space Complexity",
      "Linear Data Structures: Dynamic Arrays, Stacks & Queues",
      "Hash Tables: Collision Resolution & Amortized O(1)",
      "Trees & Graphs: BSTs, BFS, DFS & Topological Sort",
      "Dynamic Programming, Memoization & Divide-and-Conquer"
    ],
    "practicalMilestone": "Implement an algorithmic pathfinding and network routing visualizer with optimized graph search algorithms.",
    "learningObjectives": [
      "Asymptotic Analysis: Big-O, Time & Space Complexity",
      "Linear Data Structures: Dynamic Arrays, Stacks & Queues",
      "Hash Tables: Collision Resolution & Amortized O(1)",
      "Trees & Graphs: BSTs, BFS, DFS & Topological Sort",
      "Dynamic Programming, Memoization & Divide-and-Conquer"
    ],
    "skills": [
      "Big-O Complexity",
      "Data Structures",
      "Graph Algorithms",
      "Dynamic Programming",
      "Algorithm Optimization"
    ],
    "requiredCourseIds": [
      "course-dsa-algorithms"
    ],
    "relatedProjectIds": [
      "proj-calculator"
    ],
    "recommendedNotes": [
      {
        "title": "Data Structures: Arrays, Linked Lists & Time Complexity",
        "slug": "dsa-arrays-time-complexity"
      },
      {
        "title": "Trees, Graphs & Dynamic Programming",
        "slug": "dsa-trees-graphs-algorithms"
      }
    ]
  },
  {
    "id": 22,
    "stepNumber": 3,
    "slug": "ai-ml-ai-data-analytics-bi",
    "title": "AI Data Analytics & Business Intelligence: Dashboards to Predictive Insights",
    "trackId": "ai-ml",
    "category": "Databases & Infrastructure",
    "summary": "Transform raw data into executive insights: Python Pandas dataframes, NumPy vectorization, SQL window functions, exploratory data analysis (EDA), interactive visualization (Matplotlib/Seaborn), and AI-assisted BI.",
    "duration": "4 - 5 Weeks (18 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Data Cleaning & Feature Engineering with Pandas",
      "NumPy Array Operations & Mathematical Computing",
      "Advanced SQL for Analytics: Window Functions & CTEs",
      "Exploratory Data Analysis & Statistical Hypothesis Testing",
      "Interactive KPI Dashboard Design & Data Storytelling"
    ],
    "practicalMilestone": "Ingest a multi-thousand row real-world sales dataset, perform comprehensive EDA, and build an interactive executive KPI dashboard.",
    "learningObjectives": [
      "Data Cleaning & Feature Engineering with Pandas",
      "NumPy Array Operations & Mathematical Computing",
      "Advanced SQL for Analytics: Window Functions & CTEs",
      "Exploratory Data Analysis & Statistical Hypothesis Testing",
      "Interactive KPI Dashboard Design & Data Storytelling"
    ],
    "skills": [
      "Pandas",
      "NumPy",
      "SQL Analytics",
      "Data Visualization",
      "EDA",
      "Business Intelligence"
    ],
    "requiredCourseIds": [
      "course-ai-data-analytics-bi"
    ],
    "relatedProjectIds": [
      "proj-data-analytics"
    ],
    "recommendedNotes": [
      {
        "title": "Python for AI, Data Science & Machine Learning",
        "slug": "ai-data-science-machine-learning"
      }
    ]
  },
  {
    "id": 23,
    "stepNumber": 4,
    "slug": "ai-ml-ai-machine-learning",
    "title": "AI & Machine Learning: From Mathematics to Production Models",
    "trackId": "ai-ml",
    "category": "AI & Machine Learning",
    "summary": "From machine learning theory to production models: linear algebra, gradient descent, supervised algorithms (Regression, Decision Trees, Random Forests), unsupervised clustering (K-Means), and neural network foundations.",
    "duration": "6 - 8 Weeks (26 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Machine Learning Mathematics: Linear Algebra & Gradient Descent",
      "Supervised Learning: Linear/Logistic Regression & Random Forests",
      "Model Evaluation: Precision, Recall, F1, ROC-AUC & Cross-Validation",
      "Unsupervised Learning: K-Means Clustering & PCA Dimensionality Reduction",
      "Neural Network Foundations, Backpropagation & PyTorch Basics"
    ],
    "practicalMilestone": "Train, tune hyperparameters, cross-validate, and deploy a predictive machine learning model with a RESTful inference endpoint.",
    "learningObjectives": [
      "Machine Learning Mathematics: Linear Algebra & Gradient Descent",
      "Supervised Learning: Linear/Logistic Regression & Random Forests",
      "Model Evaluation: Precision, Recall, F1, ROC-AUC & Cross-Validation",
      "Unsupervised Learning: K-Means Clustering & PCA Dimensionality Reduction",
      "Neural Network Foundations, Backpropagation & PyTorch Basics"
    ],
    "skills": [
      "Scikit-Learn",
      "Machine Learning",
      "Model Evaluation",
      "PyTorch Basics",
      "Gradient Descent",
      "Supervised Learning"
    ],
    "requiredCourseIds": [
      "course-ai-machine-learning"
    ],
    "relatedProjectIds": [
      "proj-ai-study-assistant"
    ],
    "recommendedNotes": [
      {
        "title": "Python for AI, Data Science & Machine Learning",
        "slug": "ai-data-science-machine-learning"
      }
    ]
  },
  {
    "id": 24,
    "stepNumber": 5,
    "slug": "ai-ml-generative-ai-llms",
    "title": "Generative AI & Large Language Models (LLMs): Enterprise Architectures",
    "trackId": "ai-ml",
    "category": "AI & Machine Learning",
    "summary": "Understand generative AI under the hood: Transformer architecture, self-attention mechanisms, tokenization, vector embeddings, high-dimensional cosine similarity, fine-tuning, and modern frontier models.",
    "duration": "5 - 7 Weeks (24 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Transformer Architecture: Encoder-Decoder & Self-Attention Mechanisms",
      "Tokenization, Context Windows & High-Dimensional Embeddings",
      "Vector Similarity Metrics (Cosine, Dot Product & Euclidean)",
      "Prompt Engineering Strategies (Few-Shot, Chain-of-Thought)",
      "Model Fine-Tuning Paradigms (LoRA, QLoRA) vs In-Context Learning"
    ],
    "practicalMilestone": "Build a semantic document search engine comparing multiple embedding models and evaluating retrieval accuracy.",
    "learningObjectives": [
      "Transformer Architecture: Encoder-Decoder & Self-Attention Mechanisms",
      "Tokenization, Context Windows & High-Dimensional Embeddings",
      "Vector Similarity Metrics (Cosine, Dot Product & Euclidean)",
      "Prompt Engineering Strategies (Few-Shot, Chain-of-Thought)",
      "Model Fine-Tuning Paradigms (LoRA, QLoRA) vs In-Context Learning"
    ],
    "skills": [
      "Generative AI",
      "LLMs",
      "Transformers",
      "Self-Attention",
      "Vector Embeddings",
      "Prompt Engineering"
    ],
    "requiredCourseIds": [
      "course-generative-ai-llms"
    ],
    "relatedProjectIds": [
      "proj-ai-study-assistant"
    ],
    "recommendedNotes": [
      {
        "title": "Python for AI, Data Science & Machine Learning",
        "slug": "ai-data-science-machine-learning"
      }
    ]
  },
  {
    "id": 25,
    "stepNumber": 6,
    "slug": "ai-ml-genai-llm-application-development",
    "title": "Generative AI & LLM Application Development: Production Systems",
    "trackId": "ai-ml",
    "category": "AI & Machine Learning",
    "summary": "Engineer production LLM applications: Retrieval-Augmented Generation (RAG) pipelines, vector databases (Pinecone, ChromaDB, pgvector), structured JSON outputs, chunking strategies, and LangChain orchestration.",
    "duration": "5 - 7 Weeks (24 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Production RAG Architecture: Ingestion, Chunking & Retrieval",
      "Vector Database Indexing & Hybrid Keyword-Vector Search",
      "Structured Outputs, Function Calling & JSON Schema Enforcement",
      "LangChain / LlamaIndex Pipeline Orchestration",
      "RAG Evaluation (Context Precision, Recall) & Guardrails"
    ],
    "practicalMilestone": "Develop an enterprise knowledge-base RAG application with document upload, vector storage, and hallucination guardrails.",
    "learningObjectives": [
      "Production RAG Architecture: Ingestion, Chunking & Retrieval",
      "Vector Database Indexing & Hybrid Keyword-Vector Search",
      "Structured Outputs, Function Calling & JSON Schema Enforcement",
      "LangChain / LlamaIndex Pipeline Orchestration",
      "RAG Evaluation (Context Precision, Recall) & Guardrails"
    ],
    "skills": [
      "RAG Pipelines",
      "Vector Databases",
      "LangChain",
      "Structured Outputs",
      "Hybrid Search",
      "AI Engineering"
    ],
    "requiredCourseIds": [
      "course-genai-llm-application-development"
    ],
    "relatedProjectIds": [
      "proj-ai-study-assistant"
    ],
    "recommendedNotes": [
      {
        "title": "Python for AI, Data Science & Machine Learning",
        "slug": "ai-data-science-machine-learning"
      }
    ]
  },
  {
    "id": 26,
    "stepNumber": 1,
    "slug": "ai-agents-python-programming",
    "title": "Python Programming: Fundamentals to Enterprise Applications",
    "trackId": "ai-agents",
    "category": "Programming Languages",
    "summary": "Master Python programming from syntax, data structures, and object-oriented programming to file I/O, error handling, package management, automated scripting, and modern Python type hinting.",
    "duration": "4 - 6 Weeks (22 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Python 3 Syntax, Dynamic Typing & Control Structures",
      "Data Structures: Lists, Tuples, Dictionaries & Sets",
      "Object-Oriented Programming (Classes, Inheritance, Polymorphism)",
      "File Operations, JSON Parsing & Exception Handling",
      "Virtual Environments, Pip, PyTest & Code Modularization"
    ],
    "practicalMilestone": "Build an automated command-line data processing tool that ingests JSON/CSV datasets, validates integrity, and generates structured summaries.",
    "learningObjectives": [
      "Python 3 Syntax, Dynamic Typing & Control Structures",
      "Data Structures: Lists, Tuples, Dictionaries & Sets",
      "Object-Oriented Programming (Classes, Inheritance, Polymorphism)",
      "File Operations, JSON Parsing & Exception Handling",
      "Virtual Environments, Pip, PyTest & Code Modularization"
    ],
    "skills": [
      "Python 3",
      "OOP",
      "Data Structures",
      "Scripting",
      "PyTest",
      "File I/O"
    ],
    "requiredCourseIds": [
      "course-python-programming"
    ],
    "relatedProjectIds": [
      "proj-python-automation"
    ],
    "recommendedNotes": [
      {
        "title": "Python Programming & Object-Oriented Principles",
        "slug": "python-fundamentals-oop"
      }
    ]
  },
  {
    "id": 27,
    "stepNumber": 2,
    "slug": "ai-agents-generative-ai-llms",
    "title": "Generative AI & Large Language Models (LLMs): Enterprise Architectures",
    "trackId": "ai-agents",
    "category": "AI & Machine Learning",
    "summary": "Understand generative AI under the hood: Transformer architecture, self-attention mechanisms, tokenization, vector embeddings, high-dimensional cosine similarity, fine-tuning, and modern frontier models.",
    "duration": "5 - 7 Weeks (24 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Transformer Architecture: Encoder-Decoder & Self-Attention Mechanisms",
      "Tokenization, Context Windows & High-Dimensional Embeddings",
      "Vector Similarity Metrics (Cosine, Dot Product & Euclidean)",
      "Prompt Engineering Strategies (Few-Shot, Chain-of-Thought)",
      "Model Fine-Tuning Paradigms (LoRA, QLoRA) vs In-Context Learning"
    ],
    "practicalMilestone": "Build a semantic document search engine comparing multiple embedding models and evaluating retrieval accuracy.",
    "learningObjectives": [
      "Transformer Architecture: Encoder-Decoder & Self-Attention Mechanisms",
      "Tokenization, Context Windows & High-Dimensional Embeddings",
      "Vector Similarity Metrics (Cosine, Dot Product & Euclidean)",
      "Prompt Engineering Strategies (Few-Shot, Chain-of-Thought)",
      "Model Fine-Tuning Paradigms (LoRA, QLoRA) vs In-Context Learning"
    ],
    "skills": [
      "Generative AI",
      "LLMs",
      "Transformers",
      "Self-Attention",
      "Vector Embeddings",
      "Prompt Engineering"
    ],
    "requiredCourseIds": [
      "course-generative-ai-llms"
    ],
    "relatedProjectIds": [
      "proj-ai-study-assistant"
    ],
    "recommendedNotes": [
      {
        "title": "Python for AI, Data Science & Machine Learning",
        "slug": "ai-data-science-machine-learning"
      }
    ]
  },
  {
    "id": 28,
    "stepNumber": 3,
    "slug": "ai-agents-genai-llm-application-development",
    "title": "Generative AI & LLM Application Development: Production Systems",
    "trackId": "ai-agents",
    "category": "AI & Machine Learning",
    "summary": "Engineer production LLM applications: Retrieval-Augmented Generation (RAG) pipelines, vector databases (Pinecone, ChromaDB, pgvector), structured JSON outputs, chunking strategies, and LangChain orchestration.",
    "duration": "5 - 7 Weeks (24 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Production RAG Architecture: Ingestion, Chunking & Retrieval",
      "Vector Database Indexing & Hybrid Keyword-Vector Search",
      "Structured Outputs, Function Calling & JSON Schema Enforcement",
      "LangChain / LlamaIndex Pipeline Orchestration",
      "RAG Evaluation (Context Precision, Recall) & Guardrails"
    ],
    "practicalMilestone": "Develop an enterprise knowledge-base RAG application with document upload, vector storage, and hallucination guardrails.",
    "learningObjectives": [
      "Production RAG Architecture: Ingestion, Chunking & Retrieval",
      "Vector Database Indexing & Hybrid Keyword-Vector Search",
      "Structured Outputs, Function Calling & JSON Schema Enforcement",
      "LangChain / LlamaIndex Pipeline Orchestration",
      "RAG Evaluation (Context Precision, Recall) & Guardrails"
    ],
    "skills": [
      "RAG Pipelines",
      "Vector Databases",
      "LangChain",
      "Structured Outputs",
      "Hybrid Search",
      "AI Engineering"
    ],
    "requiredCourseIds": [
      "course-genai-llm-application-development"
    ],
    "relatedProjectIds": [
      "proj-ai-study-assistant"
    ],
    "recommendedNotes": [
      {
        "title": "Python for AI, Data Science & Machine Learning",
        "slug": "ai-data-science-machine-learning"
      }
    ]
  },
  {
    "id": 29,
    "stepNumber": 4,
    "slug": "ai-agents-ai-agents-automation",
    "title": "AI Agents & Automation: Workflow Orchestration & MCP",
    "trackId": "ai-agents",
    "category": "AI & Machine Learning",
    "summary": "Build autonomous AI agents: ReAct reasoning patterns, dynamic tool calling, Model Context Protocol (MCP) integrations, stateful memory persistence, and automated business workflow execution.",
    "duration": "5 - 6 Weeks (22 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "AI Agent Fundamentals: Perception, Reasoning & Action Loops",
      "ReAct Pattern: Thought, Action, Observation & Reflection",
      "Dynamic Tool Execution & API Integration Schemas",
      "Model Context Protocol (MCP): Architecture & Tool Server Setup",
      "Stateful Workflows with LangGraph & Autonomous Recovery"
    ],
    "practicalMilestone": "Create an autonomous research agent that searches the web, queries a database via MCP, and compiles verified analysis reports.",
    "learningObjectives": [
      "AI Agent Fundamentals: Perception, Reasoning & Action Loops",
      "ReAct Pattern: Thought, Action, Observation & Reflection",
      "Dynamic Tool Execution & API Integration Schemas",
      "Model Context Protocol (MCP): Architecture & Tool Server Setup",
      "Stateful Workflows with LangGraph & Autonomous Recovery"
    ],
    "skills": [
      "AI Agents",
      "Tool Calling",
      "ReAct Pattern",
      "Model Context Protocol (MCP)",
      "LangGraph",
      "Workflow Automation"
    ],
    "requiredCourseIds": [
      "course-ai-agents-automation"
    ],
    "relatedProjectIds": [
      "proj-ai-study-assistant"
    ],
    "recommendedNotes": [
      {
        "title": "Python for AI, Data Science & Machine Learning",
        "slug": "ai-data-science-machine-learning"
      }
    ]
  },
  {
    "id": 30,
    "stepNumber": 5,
    "slug": "ai-agents-agentic-ai-autonomous-systems",
    "title": "AI Agents & Agentic AI: Autonomous Workflows & Multi-Agent Systems",
    "trackId": "ai-agents",
    "category": "AI & Machine Learning",
    "summary": "Design collaborative multi-agent architectures: agent role specialization, inter-agent communication protocols, task decomposition, supervisor-worker hierarchies, and human-in-the-loop governance.",
    "duration": "5 - 7 Weeks (24 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Multi-Agent Architectures: Hierarchical, Sequential & Broadcast",
      "Task Decomposition, Subgoal Planning & Delegation",
      "Inter-Agent Consensus, Negotiation & Conflict Resolution",
      "Human-in-the-Loop Verification & Safety Boundaries",
      "Autonomous Multi-Agent Software Development Simulation"
    ],
    "practicalMilestone": "Architect a multi-agent software engineering team (Product Manager, Coder, Reviewer, Tester) that collaboratively builds and tests software.",
    "learningObjectives": [
      "Multi-Agent Architectures: Hierarchical, Sequential & Broadcast",
      "Task Decomposition, Subgoal Planning & Delegation",
      "Inter-Agent Consensus, Negotiation & Conflict Resolution",
      "Human-in-the-Loop Verification & Safety Boundaries",
      "Autonomous Multi-Agent Software Development Simulation"
    ],
    "skills": [
      "Agentic AI",
      "Multi-Agent Systems",
      "Task Decomposition",
      "LangGraph Multi-Agent",
      "Consensus Protocols",
      "AI Safety"
    ],
    "requiredCourseIds": [
      "course-agentic-ai-autonomous-systems"
    ],
    "relatedProjectIds": [
      "proj-ai-study-assistant"
    ],
    "recommendedNotes": [
      {
        "title": "Python for AI, Data Science & Machine Learning",
        "slug": "ai-data-science-machine-learning"
      }
    ]
  },
  {
    "id": 31,
    "stepNumber": 6,
    "slug": "ai-agents-ai-chatbots-voice-ai",
    "title": "AI Chatbots & Voice AI: Conversational Intelligence & Real-Time Audio",
    "trackId": "ai-agents",
    "category": "AI & Machine Learning",
    "summary": "Build state-of-the-art conversational and voice AI: real-time streaming speech-to-text (STT), low-latency neural text-to-speech (TTS), WebSockets audio pipelines, conversational memory, and multimodal interfaces.",
    "duration": "4 - 6 Weeks (20 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Conversational Flow Design & Multi-Turn Context Memory",
      "Real-Time Speech-to-Text (STT) Streaming Pipelines",
      "Neural Text-to-Speech (TTS) & Low-Latency Voice Generation",
      "Full-Duplex WebSockets Voice Pipelines & Interruption Handling",
      "Multimodal Voice & Text Assistant Deployment"
    ],
    "practicalMilestone": "Deploy a real-time conversational voice assistant with sub-second audio response latency and contextual dialogue memory.",
    "learningObjectives": [
      "Conversational Flow Design & Multi-Turn Context Memory",
      "Real-Time Speech-to-Text (STT) Streaming Pipelines",
      "Neural Text-to-Speech (TTS) & Low-Latency Voice Generation",
      "Full-Duplex WebSockets Voice Pipelines & Interruption Handling",
      "Multimodal Voice & Text Assistant Deployment"
    ],
    "skills": [
      "Voice AI",
      "Speech-to-Text (STT)",
      "Text-to-Speech (TTS)",
      "WebSockets Audio",
      "Conversational AI",
      "Streaming AI"
    ],
    "requiredCourseIds": [
      "course-ai-chatbots-voice-ai"
    ],
    "relatedProjectIds": [
      "proj-ai-study-assistant"
    ],
    "recommendedNotes": [
      {
        "title": "Python for AI, Data Science & Machine Learning",
        "slug": "ai-data-science-machine-learning"
      }
    ]
  },
  {
    "id": 32,
    "stepNumber": 1,
    "slug": "dsa-c-programming",
    "title": "C Programming: Fundamentals to System Architecture",
    "trackId": "dsa",
    "category": "Programming Languages",
    "summary": "Understand hardware-to-software execution: GCC compilation pipeline, explicit memory management with pointers, heap vs stack memory, structs, bitwise operations, and low-level system programming.",
    "duration": "4 - 6 Weeks (20 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "The C Compilation Model (Preprocessor, Compiler, Assembler, Linker)",
      "Pointers, Pointer Arithmetic & Direct Memory Access",
      "Dynamic Memory Management with malloc, calloc & free",
      "Structs, Unions, Typedef & Memory Alignment",
      "Low-Level Bitwise Operations & File I/O Streams"
    ],
    "practicalMilestone": "Implement a dynamic memory-allocated generic data structure library (Vector and Hash Map) in pure C with zero memory leaks.",
    "learningObjectives": [
      "The C Compilation Model (Preprocessor, Compiler, Assembler, Linker)",
      "Pointers, Pointer Arithmetic & Direct Memory Access",
      "Dynamic Memory Management with malloc, calloc & free",
      "Structs, Unions, Typedef & Memory Alignment",
      "Low-Level Bitwise Operations & File I/O Streams"
    ],
    "skills": [
      "C Programming",
      "Pointers",
      "Memory Management",
      "Data Structures in C",
      "Systems Programming"
    ],
    "requiredCourseIds": [
      "course-c-programming"
    ],
    "relatedProjectIds": [
      "proj-calculator"
    ],
    "recommendedNotes": [
      {
        "title": "Operating Systems: Process, Threads & Concurrency",
        "slug": "operating-systems-process-threads"
      }
    ]
  },
  {
    "id": 33,
    "stepNumber": 2,
    "slug": "dsa-cpp-programming",
    "title": "C++ Programming & Problem Solving: STL to Modern Standards",
    "trackId": "dsa",
    "category": "Programming Languages",
    "summary": "Modern C++ (C++20): RAII memory management, smart pointers (unique_ptr, shared_ptr), Standard Template Library (STL vectors, maps, sets), templates, operator overloading, and high-performance system design.",
    "duration": "5 - 7 Weeks (24 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Modern C++20 Syntax, References & RAII Principle",
      "Smart Pointers (unique_ptr, shared_ptr) & Zero-Leak Memory",
      "Object-Oriented C++: Inheritance, Virtual Functions & Polymorphism",
      "Templates, Generic Programming & Metaprogramming",
      "STL Containers, Iterators & Algorithm Functions"
    ],
    "practicalMilestone": "Build a high-performance multithreaded financial order book simulation using modern C++ and STL algorithms.",
    "learningObjectives": [
      "Modern C++20 Syntax, References & RAII Principle",
      "Smart Pointers (unique_ptr, shared_ptr) & Zero-Leak Memory",
      "Object-Oriented C++: Inheritance, Virtual Functions & Polymorphism",
      "Templates, Generic Programming & Metaprogramming",
      "STL Containers, Iterators & Algorithm Functions"
    ],
    "skills": [
      "Modern C++",
      "RAII",
      "Smart Pointers",
      "STL Containers",
      "Templates",
      "High-Performance Computing"
    ],
    "requiredCourseIds": [
      "course-cpp-programming"
    ],
    "relatedProjectIds": [
      "proj-calculator"
    ],
    "recommendedNotes": [
      {
        "title": "Operating Systems: Process, Threads & Concurrency",
        "slug": "operating-systems-process-threads"
      }
    ]
  },
  {
    "id": 34,
    "stepNumber": 3,
    "slug": "dsa-dsa-algorithms",
    "title": "Data Structures & Algorithms in Production",
    "trackId": "dsa",
    "category": "Data Structures & Developer Tools",
    "summary": "Master computer science algorithmic problem-solving: Big-O asymptotic analysis, dynamic arrays, linked lists, hash tables, trees, binary search trees, graph traversals (BFS/DFS), and dynamic programming.",
    "duration": "6 - 8 Weeks (28 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Asymptotic Analysis: Big-O, Time & Space Complexity",
      "Linear Data Structures: Dynamic Arrays, Stacks & Queues",
      "Hash Tables: Collision Resolution & Amortized O(1)",
      "Trees & Graphs: BSTs, BFS, DFS & Topological Sort",
      "Dynamic Programming, Memoization & Divide-and-Conquer"
    ],
    "practicalMilestone": "Implement an algorithmic pathfinding and network routing visualizer with optimized graph search algorithms.",
    "learningObjectives": [
      "Asymptotic Analysis: Big-O, Time & Space Complexity",
      "Linear Data Structures: Dynamic Arrays, Stacks & Queues",
      "Hash Tables: Collision Resolution & Amortized O(1)",
      "Trees & Graphs: BSTs, BFS, DFS & Topological Sort",
      "Dynamic Programming, Memoization & Divide-and-Conquer"
    ],
    "skills": [
      "Big-O Complexity",
      "Data Structures",
      "Graph Algorithms",
      "Dynamic Programming",
      "Algorithm Optimization"
    ],
    "requiredCourseIds": [
      "course-dsa-algorithms"
    ],
    "relatedProjectIds": [
      "proj-calculator"
    ],
    "recommendedNotes": [
      {
        "title": "Data Structures: Arrays, Linked Lists & Time Complexity",
        "slug": "dsa-arrays-time-complexity"
      },
      {
        "title": "Trees, Graphs & Dynamic Programming",
        "slug": "dsa-trees-graphs-algorithms"
      }
    ]
  },
  {
    "id": 35,
    "stepNumber": 4,
    "slug": "dsa-git-github",
    "title": "Git & GitHub: Professional Version Control & Collaboration",
    "trackId": "dsa",
    "category": "Data Structures & Developer Tools",
    "summary": "Master industry version control: Git internal object model (Blobs, Trees, Commits), interactive rebasing, branch management, merge conflict resolution, pull request workflows, and GitHub Actions.",
    "duration": "2 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "practicalMilestone": "Initialize a multi-branch repository, execute feature development with interactive rebasing, and open a clean PR with CI checks.",
    "learningObjectives": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "skills": [
      "Git CLI",
      "GitHub",
      "Branch Management",
      "Rebase & Cherry-Pick",
      "Code Review",
      "CI/CD Workflows"
    ],
    "requiredCourseIds": [
      "course-git-github"
    ],
    "relatedProjectIds": [
      "proj-portfolio"
    ],
    "recommendedNotes": [
      {
        "title": "Git, GitHub & Professional Collaboration",
        "slug": "git-fundamentals-commands-guide"
      }
    ]
  },
  {
    "id": 36,
    "stepNumber": 5,
    "slug": "dsa-sql-mongodb",
    "title": "SQL & MongoDB: Relational & Document Data Architecture",
    "trackId": "dsa",
    "category": "Databases & Infrastructure",
    "summary": "Master both relational and NoSQL database paradigms: PostgreSQL/MySQL complex joins, indexes, transactions, schema normalization, and MongoDB aggregation pipelines and flexible document models.",
    "duration": "4 - 5 Weeks (20 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "practicalMilestone": "Design a dual-database schema for an e-commerce platform using PostgreSQL for financial transactions and MongoDB for catalog data.",
    "learningObjectives": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "skills": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQL Joins",
      "Indexing",
      "Aggregation Pipelines",
      "ACID Transactions"
    ],
    "requiredCourseIds": [
      "course-sql-mongodb"
    ],
    "relatedProjectIds": [
      "proj-data-analytics"
    ],
    "recommendedNotes": [
      {
        "title": "DBMS, SQL Queries & Relational Database Design",
        "slug": "dbms-sql-relational-design"
      }
    ]
  },
  {
    "id": 37,
    "stepNumber": 1,
    "slug": "java-java-programming",
    "title": "Java Programming & Enterprise Systems: Core to Advanced",
    "trackId": "java",
    "category": "Programming Languages",
    "summary": "Enterprise Java: JVM internals, Garbage Collection, robust OOP architecture, Collections Framework (List, Set, Map), Java Streams API, Lambdas, JDBC database connectivity, and JUnit 5 unit testing.",
    "duration": "5 - 7 Weeks (24 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "JVM Architecture, Bytecode Execution & Garbage Collection",
      "Enterprise OOP: Encapsulation, Abstract Classes & Interfaces",
      "Java Collections Framework: ArrayList, HashMap & TreeSet",
      "Functional Java: Lambdas, Streams & Optional API",
      "JDBC Database Persistence & JUnit 5 Automated Testing"
    ],
    "practicalMilestone": "Architect a multi-tier enterprise transaction service with relational persistence via JDBC and 90%+ JUnit 5 test coverage.",
    "learningObjectives": [
      "JVM Architecture, Bytecode Execution & Garbage Collection",
      "Enterprise OOP: Encapsulation, Abstract Classes & Interfaces",
      "Java Collections Framework: ArrayList, HashMap & TreeSet",
      "Functional Java: Lambdas, Streams & Optional API",
      "JDBC Database Persistence & JUnit 5 Automated Testing"
    ],
    "skills": [
      "Java 21",
      "JVM Internals",
      "Collections Framework",
      "Streams API",
      "JDBC",
      "JUnit 5"
    ],
    "requiredCourseIds": [
      "course-java-programming"
    ],
    "relatedProjectIds": [
      "proj-snippet-vault"
    ],
    "recommendedNotes": [
      {
        "title": "DBMS, SQL Queries & Relational Database Design",
        "slug": "dbms-sql-relational-design"
      }
    ]
  },
  {
    "id": 38,
    "stepNumber": 2,
    "slug": "java-dsa-algorithms",
    "title": "Data Structures & Algorithms in Production",
    "trackId": "java",
    "category": "Data Structures & Developer Tools",
    "summary": "Master computer science algorithmic problem-solving: Big-O asymptotic analysis, dynamic arrays, linked lists, hash tables, trees, binary search trees, graph traversals (BFS/DFS), and dynamic programming.",
    "duration": "6 - 8 Weeks (28 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Asymptotic Analysis: Big-O, Time & Space Complexity",
      "Linear Data Structures: Dynamic Arrays, Stacks & Queues",
      "Hash Tables: Collision Resolution & Amortized O(1)",
      "Trees & Graphs: BSTs, BFS, DFS & Topological Sort",
      "Dynamic Programming, Memoization & Divide-and-Conquer"
    ],
    "practicalMilestone": "Implement an algorithmic pathfinding and network routing visualizer with optimized graph search algorithms.",
    "learningObjectives": [
      "Asymptotic Analysis: Big-O, Time & Space Complexity",
      "Linear Data Structures: Dynamic Arrays, Stacks & Queues",
      "Hash Tables: Collision Resolution & Amortized O(1)",
      "Trees & Graphs: BSTs, BFS, DFS & Topological Sort",
      "Dynamic Programming, Memoization & Divide-and-Conquer"
    ],
    "skills": [
      "Big-O Complexity",
      "Data Structures",
      "Graph Algorithms",
      "Dynamic Programming",
      "Algorithm Optimization"
    ],
    "requiredCourseIds": [
      "course-dsa-algorithms"
    ],
    "relatedProjectIds": [
      "proj-calculator"
    ],
    "recommendedNotes": [
      {
        "title": "Data Structures: Arrays, Linked Lists & Time Complexity",
        "slug": "dsa-arrays-time-complexity"
      },
      {
        "title": "Trees, Graphs & Dynamic Programming",
        "slug": "dsa-trees-graphs-algorithms"
      }
    ]
  },
  {
    "id": 39,
    "stepNumber": 3,
    "slug": "java-sql-mongodb",
    "title": "SQL & MongoDB: Relational & Document Data Architecture",
    "trackId": "java",
    "category": "Databases & Infrastructure",
    "summary": "Master both relational and NoSQL database paradigms: PostgreSQL/MySQL complex joins, indexes, transactions, schema normalization, and MongoDB aggregation pipelines and flexible document models.",
    "duration": "4 - 5 Weeks (20 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "practicalMilestone": "Design a dual-database schema for an e-commerce platform using PostgreSQL for financial transactions and MongoDB for catalog data.",
    "learningObjectives": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "skills": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQL Joins",
      "Indexing",
      "Aggregation Pipelines",
      "ACID Transactions"
    ],
    "requiredCourseIds": [
      "course-sql-mongodb"
    ],
    "relatedProjectIds": [
      "proj-data-analytics"
    ],
    "recommendedNotes": [
      {
        "title": "DBMS, SQL Queries & Relational Database Design",
        "slug": "dbms-sql-relational-design"
      }
    ]
  },
  {
    "id": 40,
    "stepNumber": 4,
    "slug": "java-git-github",
    "title": "Git & GitHub: Professional Version Control & Collaboration",
    "trackId": "java",
    "category": "Data Structures & Developer Tools",
    "summary": "Master industry version control: Git internal object model (Blobs, Trees, Commits), interactive rebasing, branch management, merge conflict resolution, pull request workflows, and GitHub Actions.",
    "duration": "2 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "practicalMilestone": "Initialize a multi-branch repository, execute feature development with interactive rebasing, and open a clean PR with CI checks.",
    "learningObjectives": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "skills": [
      "Git CLI",
      "GitHub",
      "Branch Management",
      "Rebase & Cherry-Pick",
      "Code Review",
      "CI/CD Workflows"
    ],
    "requiredCourseIds": [
      "course-git-github"
    ],
    "relatedProjectIds": [
      "proj-portfolio"
    ],
    "recommendedNotes": [
      {
        "title": "Git, GitHub & Professional Collaboration",
        "slug": "git-fundamentals-commands-guide"
      }
    ]
  },
  {
    "id": 41,
    "stepNumber": 5,
    "slug": "java-cloud-native-serverless",
    "title": "Cloud-Native & Serverless Development: Scalable Distributed Systems",
    "trackId": "java",
    "category": "Databases & Infrastructure",
    "summary": "Containerize applications and deploy resilient cloud services: Docker multi-stage builds, Kubernetes orchestration concepts, serverless functions, CI/CD automated release pipelines, and cloud monitoring.",
    "duration": "4 - 6 Weeks (20 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Docker Multi-Stage Builds & Container Optimization",
      "Docker Compose for Multi-Container Environments",
      "Cloud Architectures (AWS/GCP), Serverless & Edge Compute",
      "Kubernetes Pods, Services, Deployments & Ingress",
      "CI/CD Pipelines with GitHub Actions & Cloud Deployment"
    ],
    "practicalMilestone": "Containerize a full-stack web application with Docker Compose, configure automated GitHub Actions CI/CD, and deploy to cloud hosting.",
    "learningObjectives": [
      "Docker Multi-Stage Builds & Container Optimization",
      "Docker Compose for Multi-Container Environments",
      "Cloud Architectures (AWS/GCP), Serverless & Edge Compute",
      "Kubernetes Pods, Services, Deployments & Ingress",
      "CI/CD Pipelines with GitHub Actions & Cloud Deployment"
    ],
    "skills": [
      "Docker",
      "Kubernetes",
      "Serverless",
      "CI/CD",
      "AWS/Cloud",
      "Containerization"
    ],
    "requiredCourseIds": [
      "course-cloud-native-serverless"
    ],
    "relatedProjectIds": [
      "proj-ecommerce"
    ],
    "recommendedNotes": [
      {
        "title": "Cloud Computing, Docker & Containerization",
        "slug": "cloud-docker-containerization"
      }
    ]
  },
  {
    "id": 42,
    "stepNumber": 1,
    "slug": "data-analyst-python-programming",
    "title": "Python Programming: Fundamentals to Enterprise Applications",
    "trackId": "data-analyst",
    "category": "Programming Languages",
    "summary": "Master Python programming from syntax, data structures, and object-oriented programming to file I/O, error handling, package management, automated scripting, and modern Python type hinting.",
    "duration": "4 - 6 Weeks (22 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Python 3 Syntax, Dynamic Typing & Control Structures",
      "Data Structures: Lists, Tuples, Dictionaries & Sets",
      "Object-Oriented Programming (Classes, Inheritance, Polymorphism)",
      "File Operations, JSON Parsing & Exception Handling",
      "Virtual Environments, Pip, PyTest & Code Modularization"
    ],
    "practicalMilestone": "Build an automated command-line data processing tool that ingests JSON/CSV datasets, validates integrity, and generates structured summaries.",
    "learningObjectives": [
      "Python 3 Syntax, Dynamic Typing & Control Structures",
      "Data Structures: Lists, Tuples, Dictionaries & Sets",
      "Object-Oriented Programming (Classes, Inheritance, Polymorphism)",
      "File Operations, JSON Parsing & Exception Handling",
      "Virtual Environments, Pip, PyTest & Code Modularization"
    ],
    "skills": [
      "Python 3",
      "OOP",
      "Data Structures",
      "Scripting",
      "PyTest",
      "File I/O"
    ],
    "requiredCourseIds": [
      "course-python-programming"
    ],
    "relatedProjectIds": [
      "proj-python-automation"
    ],
    "recommendedNotes": [
      {
        "title": "Python Programming & Object-Oriented Principles",
        "slug": "python-fundamentals-oop"
      }
    ]
  },
  {
    "id": 43,
    "stepNumber": 2,
    "slug": "data-analyst-sql-mongodb",
    "title": "SQL & MongoDB: Relational & Document Data Architecture",
    "trackId": "data-analyst",
    "category": "Databases & Infrastructure",
    "summary": "Master both relational and NoSQL database paradigms: PostgreSQL/MySQL complex joins, indexes, transactions, schema normalization, and MongoDB aggregation pipelines and flexible document models.",
    "duration": "4 - 5 Weeks (20 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "practicalMilestone": "Design a dual-database schema for an e-commerce platform using PostgreSQL for financial transactions and MongoDB for catalog data.",
    "learningObjectives": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "skills": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQL Joins",
      "Indexing",
      "Aggregation Pipelines",
      "ACID Transactions"
    ],
    "requiredCourseIds": [
      "course-sql-mongodb"
    ],
    "relatedProjectIds": [
      "proj-data-analytics"
    ],
    "recommendedNotes": [
      {
        "title": "DBMS, SQL Queries & Relational Database Design",
        "slug": "dbms-sql-relational-design"
      }
    ]
  },
  {
    "id": 44,
    "stepNumber": 3,
    "slug": "data-analyst-ai-data-analytics-bi",
    "title": "AI Data Analytics & Business Intelligence: Dashboards to Predictive Insights",
    "trackId": "data-analyst",
    "category": "Databases & Infrastructure",
    "summary": "Transform raw data into executive insights: Python Pandas dataframes, NumPy vectorization, SQL window functions, exploratory data analysis (EDA), interactive visualization (Matplotlib/Seaborn), and AI-assisted BI.",
    "duration": "4 - 5 Weeks (18 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Data Cleaning & Feature Engineering with Pandas",
      "NumPy Array Operations & Mathematical Computing",
      "Advanced SQL for Analytics: Window Functions & CTEs",
      "Exploratory Data Analysis & Statistical Hypothesis Testing",
      "Interactive KPI Dashboard Design & Data Storytelling"
    ],
    "practicalMilestone": "Ingest a multi-thousand row real-world sales dataset, perform comprehensive EDA, and build an interactive executive KPI dashboard.",
    "learningObjectives": [
      "Data Cleaning & Feature Engineering with Pandas",
      "NumPy Array Operations & Mathematical Computing",
      "Advanced SQL for Analytics: Window Functions & CTEs",
      "Exploratory Data Analysis & Statistical Hypothesis Testing",
      "Interactive KPI Dashboard Design & Data Storytelling"
    ],
    "skills": [
      "Pandas",
      "NumPy",
      "SQL Analytics",
      "Data Visualization",
      "EDA",
      "Business Intelligence"
    ],
    "requiredCourseIds": [
      "course-ai-data-analytics-bi"
    ],
    "relatedProjectIds": [
      "proj-data-analytics"
    ],
    "recommendedNotes": [
      {
        "title": "Python for AI, Data Science & Machine Learning",
        "slug": "ai-data-science-machine-learning"
      }
    ]
  },
  {
    "id": 45,
    "stepNumber": 4,
    "slug": "data-analyst-git-github",
    "title": "Git & GitHub: Professional Version Control & Collaboration",
    "trackId": "data-analyst",
    "category": "Data Structures & Developer Tools",
    "summary": "Master industry version control: Git internal object model (Blobs, Trees, Commits), interactive rebasing, branch management, merge conflict resolution, pull request workflows, and GitHub Actions.",
    "duration": "2 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "practicalMilestone": "Initialize a multi-branch repository, execute feature development with interactive rebasing, and open a clean PR with CI checks.",
    "learningObjectives": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "skills": [
      "Git CLI",
      "GitHub",
      "Branch Management",
      "Rebase & Cherry-Pick",
      "Code Review",
      "CI/CD Workflows"
    ],
    "requiredCourseIds": [
      "course-git-github"
    ],
    "relatedProjectIds": [
      "proj-portfolio"
    ],
    "recommendedNotes": [
      {
        "title": "Git, GitHub & Professional Collaboration",
        "slug": "git-fundamentals-commands-guide"
      }
    ]
  },
  {
    "id": 46,
    "stepNumber": 5,
    "slug": "data-analyst-ai-machine-learning",
    "title": "AI & Machine Learning: From Mathematics to Production Models",
    "trackId": "data-analyst",
    "category": "AI & Machine Learning",
    "summary": "From machine learning theory to production models: linear algebra, gradient descent, supervised algorithms (Regression, Decision Trees, Random Forests), unsupervised clustering (K-Means), and neural network foundations.",
    "duration": "6 - 8 Weeks (26 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Machine Learning Mathematics: Linear Algebra & Gradient Descent",
      "Supervised Learning: Linear/Logistic Regression & Random Forests",
      "Model Evaluation: Precision, Recall, F1, ROC-AUC & Cross-Validation",
      "Unsupervised Learning: K-Means Clustering & PCA Dimensionality Reduction",
      "Neural Network Foundations, Backpropagation & PyTorch Basics"
    ],
    "practicalMilestone": "Train, tune hyperparameters, cross-validate, and deploy a predictive machine learning model with a RESTful inference endpoint.",
    "learningObjectives": [
      "Machine Learning Mathematics: Linear Algebra & Gradient Descent",
      "Supervised Learning: Linear/Logistic Regression & Random Forests",
      "Model Evaluation: Precision, Recall, F1, ROC-AUC & Cross-Validation",
      "Unsupervised Learning: K-Means Clustering & PCA Dimensionality Reduction",
      "Neural Network Foundations, Backpropagation & PyTorch Basics"
    ],
    "skills": [
      "Scikit-Learn",
      "Machine Learning",
      "Model Evaluation",
      "PyTorch Basics",
      "Gradient Descent",
      "Supervised Learning"
    ],
    "requiredCourseIds": [
      "course-ai-machine-learning"
    ],
    "relatedProjectIds": [
      "proj-ai-study-assistant"
    ],
    "recommendedNotes": [
      {
        "title": "Python for AI, Data Science & Machine Learning",
        "slug": "ai-data-science-machine-learning"
      }
    ]
  },
  {
    "id": 47,
    "stepNumber": 1,
    "slug": "cloud-devops-git-github",
    "title": "Git & GitHub: Professional Version Control & Collaboration",
    "trackId": "cloud-devops",
    "category": "Data Structures & Developer Tools",
    "summary": "Master industry version control: Git internal object model (Blobs, Trees, Commits), interactive rebasing, branch management, merge conflict resolution, pull request workflows, and GitHub Actions.",
    "duration": "2 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "practicalMilestone": "Initialize a multi-branch repository, execute feature development with interactive rebasing, and open a clean PR with CI checks.",
    "learningObjectives": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "skills": [
      "Git CLI",
      "GitHub",
      "Branch Management",
      "Rebase & Cherry-Pick",
      "Code Review",
      "CI/CD Workflows"
    ],
    "requiredCourseIds": [
      "course-git-github"
    ],
    "relatedProjectIds": [
      "proj-portfolio"
    ],
    "recommendedNotes": [
      {
        "title": "Git, GitHub & Professional Collaboration",
        "slug": "git-fundamentals-commands-guide"
      }
    ]
  },
  {
    "id": 48,
    "stepNumber": 2,
    "slug": "cloud-devops-sql-mongodb",
    "title": "SQL & MongoDB: Relational & Document Data Architecture",
    "trackId": "cloud-devops",
    "category": "Databases & Infrastructure",
    "summary": "Master both relational and NoSQL database paradigms: PostgreSQL/MySQL complex joins, indexes, transactions, schema normalization, and MongoDB aggregation pipelines and flexible document models.",
    "duration": "4 - 5 Weeks (20 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "practicalMilestone": "Design a dual-database schema for an e-commerce platform using PostgreSQL for financial transactions and MongoDB for catalog data.",
    "learningObjectives": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "skills": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQL Joins",
      "Indexing",
      "Aggregation Pipelines",
      "ACID Transactions"
    ],
    "requiredCourseIds": [
      "course-sql-mongodb"
    ],
    "relatedProjectIds": [
      "proj-data-analytics"
    ],
    "recommendedNotes": [
      {
        "title": "DBMS, SQL Queries & Relational Database Design",
        "slug": "dbms-sql-relational-design"
      }
    ]
  },
  {
    "id": 49,
    "stepNumber": 3,
    "slug": "cloud-devops-cybersecurity-fundamentals",
    "title": "Cybersecurity Fundamentals: Network Defense & Secure Systems",
    "trackId": "cloud-devops",
    "category": "Databases & Infrastructure",
    "summary": "Defend systems against real-world attacks: networking fundamentals (TCP/IP, DNS, TLS), Linux security hardening, OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, SSRF), cryptography, and defensive posture.",
    "duration": "4 - 6 Weeks (20 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Computer Networking: TCP/IP Stack, Subnets & Firewalls",
      "Cryptographic Primitives: Symmetric/Asymmetric, Hashing & TLS",
      "OWASP Top 10 Web Security Vulnerabilities & Remediation",
      "Linux System Hardening, File Permissions & SSH Keys",
      "Security Auditing, Vulnerability Scanning & Defense in Depth"
    ],
    "practicalMilestone": "Perform a security audit of a web application, remediate OWASP Top 10 vulnerabilities, and configure firewall protection.",
    "learningObjectives": [
      "Computer Networking: TCP/IP Stack, Subnets & Firewalls",
      "Cryptographic Primitives: Symmetric/Asymmetric, Hashing & TLS",
      "OWASP Top 10 Web Security Vulnerabilities & Remediation",
      "Linux System Hardening, File Permissions & SSH Keys",
      "Security Auditing, Vulnerability Scanning & Defense in Depth"
    ],
    "skills": [
      "Network Security",
      "Cryptography",
      "OWASP Top 10",
      "Linux Hardening",
      "Penetration Testing Basics",
      "Defense in Depth"
    ],
    "requiredCourseIds": [
      "course-cybersecurity-fundamentals"
    ],
    "relatedProjectIds": [
      "proj-python-automation"
    ],
    "recommendedNotes": [
      {
        "title": "Operating Systems: Process, Threads & Concurrency",
        "slug": "operating-systems-process-threads"
      }
    ]
  },
  {
    "id": 50,
    "stepNumber": 4,
    "slug": "cloud-devops-cloud-native-serverless",
    "title": "Cloud-Native & Serverless Development: Scalable Distributed Systems",
    "trackId": "cloud-devops",
    "category": "Databases & Infrastructure",
    "summary": "Containerize applications and deploy resilient cloud services: Docker multi-stage builds, Kubernetes orchestration concepts, serverless functions, CI/CD automated release pipelines, and cloud monitoring.",
    "duration": "4 - 6 Weeks (20 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Docker Multi-Stage Builds & Container Optimization",
      "Docker Compose for Multi-Container Environments",
      "Cloud Architectures (AWS/GCP), Serverless & Edge Compute",
      "Kubernetes Pods, Services, Deployments & Ingress",
      "CI/CD Pipelines with GitHub Actions & Cloud Deployment"
    ],
    "practicalMilestone": "Containerize a full-stack web application with Docker Compose, configure automated GitHub Actions CI/CD, and deploy to cloud hosting.",
    "learningObjectives": [
      "Docker Multi-Stage Builds & Container Optimization",
      "Docker Compose for Multi-Container Environments",
      "Cloud Architectures (AWS/GCP), Serverless & Edge Compute",
      "Kubernetes Pods, Services, Deployments & Ingress",
      "CI/CD Pipelines with GitHub Actions & Cloud Deployment"
    ],
    "skills": [
      "Docker",
      "Kubernetes",
      "Serverless",
      "CI/CD",
      "AWS/Cloud",
      "Containerization"
    ],
    "requiredCourseIds": [
      "course-cloud-native-serverless"
    ],
    "relatedProjectIds": [
      "proj-ecommerce"
    ],
    "recommendedNotes": [
      {
        "title": "Cloud Computing, Docker & Containerization",
        "slug": "cloud-docker-containerization"
      }
    ]
  },
  {
    "id": 51,
    "stepNumber": 5,
    "slug": "cloud-devops-ai-assisted-coding",
    "title": "AI-Assisted Coding & Developer Tools: Accelerated Software Engineering",
    "trackId": "cloud-devops",
    "category": "Data Structures & Developer Tools",
    "summary": "10x your software engineering velocity: leverage modern AI coding assistants (Claude Code, GitHub Copilot, Cursor), prompt engineering for code generation, test synthesis, automated refactoring, and AI code review.",
    "duration": "2 - 3 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "AI Coding Assistant Mechanics & Context Windows",
      "Effective Prompt Engineering for Code Generation",
      "Automated Test Generation (Unit & Integration)",
      "AI-Assisted Code Refactoring & Security Auditing",
      "Multi-Agent Coding Workflows & Terminal Integration"
    ],
    "practicalMilestone": "Build a feature module end-to-end using AI coding assistants for architecture planning, test writing, implementation, and documentation.",
    "learningObjectives": [
      "AI Coding Assistant Mechanics & Context Windows",
      "Effective Prompt Engineering for Code Generation",
      "Automated Test Generation (Unit & Integration)",
      "AI-Assisted Code Refactoring & Security Auditing",
      "Multi-Agent Coding Workflows & Terminal Integration"
    ],
    "skills": [
      "AI Developer Tools",
      "Code Prompting",
      "Automated Testing",
      "Code Refactoring",
      "Developer Velocity"
    ],
    "requiredCourseIds": [
      "course-ai-assisted-coding"
    ],
    "relatedProjectIds": [
      "proj-task-manager"
    ],
    "recommendedNotes": [
      {
        "title": "Modern JavaScript & TypeScript Fundamentals",
        "slug": "javascript-promises-async-await"
      }
    ]
  },
  {
    "id": 52,
    "stepNumber": 1,
    "slug": "python-python-programming",
    "title": "Python Programming: Fundamentals to Enterprise Applications",
    "trackId": "python",
    "category": "Programming Languages",
    "summary": "Master Python programming from syntax, data structures, and object-oriented programming to file I/O, error handling, package management, automated scripting, and modern Python type hinting.",
    "duration": "4 - 6 Weeks (22 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Python 3 Syntax, Dynamic Typing & Control Structures",
      "Data Structures: Lists, Tuples, Dictionaries & Sets",
      "Object-Oriented Programming (Classes, Inheritance, Polymorphism)",
      "File Operations, JSON Parsing & Exception Handling",
      "Virtual Environments, Pip, PyTest & Code Modularization"
    ],
    "practicalMilestone": "Build an automated command-line data processing tool that ingests JSON/CSV datasets, validates integrity, and generates structured summaries.",
    "learningObjectives": [
      "Python 3 Syntax, Dynamic Typing & Control Structures",
      "Data Structures: Lists, Tuples, Dictionaries & Sets",
      "Object-Oriented Programming (Classes, Inheritance, Polymorphism)",
      "File Operations, JSON Parsing & Exception Handling",
      "Virtual Environments, Pip, PyTest & Code Modularization"
    ],
    "skills": [
      "Python 3",
      "OOP",
      "Data Structures",
      "Scripting",
      "PyTest",
      "File I/O"
    ],
    "requiredCourseIds": [
      "course-python-programming"
    ],
    "relatedProjectIds": [
      "proj-python-automation"
    ],
    "recommendedNotes": [
      {
        "title": "Python Programming & Object-Oriented Principles",
        "slug": "python-fundamentals-oop"
      }
    ]
  },
  {
    "id": 53,
    "stepNumber": 2,
    "slug": "python-dsa-algorithms",
    "title": "Data Structures & Algorithms in Production",
    "trackId": "python",
    "category": "Data Structures & Developer Tools",
    "summary": "Master computer science algorithmic problem-solving: Big-O asymptotic analysis, dynamic arrays, linked lists, hash tables, trees, binary search trees, graph traversals (BFS/DFS), and dynamic programming.",
    "duration": "6 - 8 Weeks (28 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Asymptotic Analysis: Big-O, Time & Space Complexity",
      "Linear Data Structures: Dynamic Arrays, Stacks & Queues",
      "Hash Tables: Collision Resolution & Amortized O(1)",
      "Trees & Graphs: BSTs, BFS, DFS & Topological Sort",
      "Dynamic Programming, Memoization & Divide-and-Conquer"
    ],
    "practicalMilestone": "Implement an algorithmic pathfinding and network routing visualizer with optimized graph search algorithms.",
    "learningObjectives": [
      "Asymptotic Analysis: Big-O, Time & Space Complexity",
      "Linear Data Structures: Dynamic Arrays, Stacks & Queues",
      "Hash Tables: Collision Resolution & Amortized O(1)",
      "Trees & Graphs: BSTs, BFS, DFS & Topological Sort",
      "Dynamic Programming, Memoization & Divide-and-Conquer"
    ],
    "skills": [
      "Big-O Complexity",
      "Data Structures",
      "Graph Algorithms",
      "Dynamic Programming",
      "Algorithm Optimization"
    ],
    "requiredCourseIds": [
      "course-dsa-algorithms"
    ],
    "relatedProjectIds": [
      "proj-calculator"
    ],
    "recommendedNotes": [
      {
        "title": "Data Structures: Arrays, Linked Lists & Time Complexity",
        "slug": "dsa-arrays-time-complexity"
      },
      {
        "title": "Trees, Graphs & Dynamic Programming",
        "slug": "dsa-trees-graphs-algorithms"
      }
    ]
  },
  {
    "id": 54,
    "stepNumber": 3,
    "slug": "python-sql-mongodb",
    "title": "SQL & MongoDB: Relational & Document Data Architecture",
    "trackId": "python",
    "category": "Databases & Infrastructure",
    "summary": "Master both relational and NoSQL database paradigms: PostgreSQL/MySQL complex joins, indexes, transactions, schema normalization, and MongoDB aggregation pipelines and flexible document models.",
    "duration": "4 - 5 Weeks (20 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "practicalMilestone": "Design a dual-database schema for an e-commerce platform using PostgreSQL for financial transactions and MongoDB for catalog data.",
    "learningObjectives": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "skills": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQL Joins",
      "Indexing",
      "Aggregation Pipelines",
      "ACID Transactions"
    ],
    "requiredCourseIds": [
      "course-sql-mongodb"
    ],
    "relatedProjectIds": [
      "proj-data-analytics"
    ],
    "recommendedNotes": [
      {
        "title": "DBMS, SQL Queries & Relational Database Design",
        "slug": "dbms-sql-relational-design"
      }
    ]
  },
  {
    "id": 55,
    "stepNumber": 4,
    "slug": "python-git-github",
    "title": "Git & GitHub: Professional Version Control & Collaboration",
    "trackId": "python",
    "category": "Data Structures & Developer Tools",
    "summary": "Master industry version control: Git internal object model (Blobs, Trees, Commits), interactive rebasing, branch management, merge conflict resolution, pull request workflows, and GitHub Actions.",
    "duration": "2 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "practicalMilestone": "Initialize a multi-branch repository, execute feature development with interactive rebasing, and open a clean PR with CI checks.",
    "learningObjectives": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "skills": [
      "Git CLI",
      "GitHub",
      "Branch Management",
      "Rebase & Cherry-Pick",
      "Code Review",
      "CI/CD Workflows"
    ],
    "requiredCourseIds": [
      "course-git-github"
    ],
    "relatedProjectIds": [
      "proj-portfolio"
    ],
    "recommendedNotes": [
      {
        "title": "Git, GitHub & Professional Collaboration",
        "slug": "git-fundamentals-commands-guide"
      }
    ]
  },
  {
    "id": 56,
    "stepNumber": 5,
    "slug": "python-ai-assisted-coding",
    "title": "AI-Assisted Coding & Developer Tools: Accelerated Software Engineering",
    "trackId": "python",
    "category": "Data Structures & Developer Tools",
    "summary": "10x your software engineering velocity: leverage modern AI coding assistants (Claude Code, GitHub Copilot, Cursor), prompt engineering for code generation, test synthesis, automated refactoring, and AI code review.",
    "duration": "2 - 3 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "AI Coding Assistant Mechanics & Context Windows",
      "Effective Prompt Engineering for Code Generation",
      "Automated Test Generation (Unit & Integration)",
      "AI-Assisted Code Refactoring & Security Auditing",
      "Multi-Agent Coding Workflows & Terminal Integration"
    ],
    "practicalMilestone": "Build a feature module end-to-end using AI coding assistants for architecture planning, test writing, implementation, and documentation.",
    "learningObjectives": [
      "AI Coding Assistant Mechanics & Context Windows",
      "Effective Prompt Engineering for Code Generation",
      "Automated Test Generation (Unit & Integration)",
      "AI-Assisted Code Refactoring & Security Auditing",
      "Multi-Agent Coding Workflows & Terminal Integration"
    ],
    "skills": [
      "AI Developer Tools",
      "Code Prompting",
      "Automated Testing",
      "Code Refactoring",
      "Developer Velocity"
    ],
    "requiredCourseIds": [
      "course-ai-assisted-coding"
    ],
    "relatedProjectIds": [
      "proj-task-manager"
    ],
    "recommendedNotes": [
      {
        "title": "Modern JavaScript & TypeScript Fundamentals",
        "slug": "javascript-promises-async-await"
      }
    ]
  },
  {
    "id": 57,
    "stepNumber": 1,
    "slug": "cybersecurity-git-github",
    "title": "Git & GitHub: Professional Version Control & Collaboration",
    "trackId": "cybersecurity",
    "category": "Data Structures & Developer Tools",
    "summary": "Master industry version control: Git internal object model (Blobs, Trees, Commits), interactive rebasing, branch management, merge conflict resolution, pull request workflows, and GitHub Actions.",
    "duration": "2 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "practicalMilestone": "Initialize a multi-branch repository, execute feature development with interactive rebasing, and open a clean PR with CI checks.",
    "learningObjectives": [
      "Git Architecture: Working Tree, Index & Commits",
      "Branching Strategies, Fast-Forward & Three-Way Merges",
      "Interactive Rebasing (git rebase -i) & Cherry-Picking",
      "Resolving Complex Merge Conflicts",
      "GitHub Pull Requests, Code Reviews & CI Workflows"
    ],
    "skills": [
      "Git CLI",
      "GitHub",
      "Branch Management",
      "Rebase & Cherry-Pick",
      "Code Review",
      "CI/CD Workflows"
    ],
    "requiredCourseIds": [
      "course-git-github"
    ],
    "relatedProjectIds": [
      "proj-portfolio"
    ],
    "recommendedNotes": [
      {
        "title": "Git, GitHub & Professional Collaboration",
        "slug": "git-fundamentals-commands-guide"
      }
    ]
  },
  {
    "id": 58,
    "stepNumber": 2,
    "slug": "cybersecurity-sql-mongodb",
    "title": "SQL & MongoDB: Relational & Document Data Architecture",
    "trackId": "cybersecurity",
    "category": "Databases & Infrastructure",
    "summary": "Master both relational and NoSQL database paradigms: PostgreSQL/MySQL complex joins, indexes, transactions, schema normalization, and MongoDB aggregation pipelines and flexible document models.",
    "duration": "4 - 5 Weeks (20 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "practicalMilestone": "Design a dual-database schema for an e-commerce platform using PostgreSQL for financial transactions and MongoDB for catalog data.",
    "learningObjectives": [
      "Relational Schema Design & Normalization (1NF to 3NF)",
      "SQL Complex Queries: INNER/LEFT Joins, Group By & Subqueries",
      "B-Tree Indexing, Query Optimization & EXPLAIN Plans",
      "ACID Transactions, Isolation Levels & Concurrency",
      "MongoDB Document Modeling & Aggregation Pipelines"
    ],
    "skills": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQL Joins",
      "Indexing",
      "Aggregation Pipelines",
      "ACID Transactions"
    ],
    "requiredCourseIds": [
      "course-sql-mongodb"
    ],
    "relatedProjectIds": [
      "proj-data-analytics"
    ],
    "recommendedNotes": [
      {
        "title": "DBMS, SQL Queries & Relational Database Design",
        "slug": "dbms-sql-relational-design"
      }
    ]
  },
  {
    "id": 59,
    "stepNumber": 3,
    "slug": "cybersecurity-cybersecurity-fundamentals",
    "title": "Cybersecurity Fundamentals: Network Defense & Secure Systems",
    "trackId": "cybersecurity",
    "category": "Databases & Infrastructure",
    "summary": "Defend systems against real-world attacks: networking fundamentals (TCP/IP, DNS, TLS), Linux security hardening, OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, SSRF), cryptography, and defensive posture.",
    "duration": "4 - 6 Weeks (20 Hours)",
    "difficulty": "Intermediate",
    "keyTopics": [
      "Computer Networking: TCP/IP Stack, Subnets & Firewalls",
      "Cryptographic Primitives: Symmetric/Asymmetric, Hashing & TLS",
      "OWASP Top 10 Web Security Vulnerabilities & Remediation",
      "Linux System Hardening, File Permissions & SSH Keys",
      "Security Auditing, Vulnerability Scanning & Defense in Depth"
    ],
    "practicalMilestone": "Perform a security audit of a web application, remediate OWASP Top 10 vulnerabilities, and configure firewall protection.",
    "learningObjectives": [
      "Computer Networking: TCP/IP Stack, Subnets & Firewalls",
      "Cryptographic Primitives: Symmetric/Asymmetric, Hashing & TLS",
      "OWASP Top 10 Web Security Vulnerabilities & Remediation",
      "Linux System Hardening, File Permissions & SSH Keys",
      "Security Auditing, Vulnerability Scanning & Defense in Depth"
    ],
    "skills": [
      "Network Security",
      "Cryptography",
      "OWASP Top 10",
      "Linux Hardening",
      "Penetration Testing Basics",
      "Defense in Depth"
    ],
    "requiredCourseIds": [
      "course-cybersecurity-fundamentals"
    ],
    "relatedProjectIds": [
      "proj-python-automation"
    ],
    "recommendedNotes": [
      {
        "title": "Operating Systems: Process, Threads & Concurrency",
        "slug": "operating-systems-process-threads"
      }
    ]
  },
  {
    "id": 60,
    "stepNumber": 4,
    "slug": "cybersecurity-cloud-native-serverless",
    "title": "Cloud-Native & Serverless Development: Scalable Distributed Systems",
    "trackId": "cybersecurity",
    "category": "Databases & Infrastructure",
    "summary": "Containerize applications and deploy resilient cloud services: Docker multi-stage builds, Kubernetes orchestration concepts, serverless functions, CI/CD automated release pipelines, and cloud monitoring.",
    "duration": "4 - 6 Weeks (20 Hours)",
    "difficulty": "Advanced",
    "keyTopics": [
      "Docker Multi-Stage Builds & Container Optimization",
      "Docker Compose for Multi-Container Environments",
      "Cloud Architectures (AWS/GCP), Serverless & Edge Compute",
      "Kubernetes Pods, Services, Deployments & Ingress",
      "CI/CD Pipelines with GitHub Actions & Cloud Deployment"
    ],
    "practicalMilestone": "Containerize a full-stack web application with Docker Compose, configure automated GitHub Actions CI/CD, and deploy to cloud hosting.",
    "learningObjectives": [
      "Docker Multi-Stage Builds & Container Optimization",
      "Docker Compose for Multi-Container Environments",
      "Cloud Architectures (AWS/GCP), Serverless & Edge Compute",
      "Kubernetes Pods, Services, Deployments & Ingress",
      "CI/CD Pipelines with GitHub Actions & Cloud Deployment"
    ],
    "skills": [
      "Docker",
      "Kubernetes",
      "Serverless",
      "CI/CD",
      "AWS/Cloud",
      "Containerization"
    ],
    "requiredCourseIds": [
      "course-cloud-native-serverless"
    ],
    "relatedProjectIds": [
      "proj-ecommerce"
    ],
    "recommendedNotes": [
      {
        "title": "Cloud Computing, Docker & Containerization",
        "slug": "cloud-docker-containerization"
      }
    ]
  },
  {
    "id": 61,
    "stepNumber": 5,
    "slug": "cybersecurity-ai-assisted-coding",
    "title": "AI-Assisted Coding & Developer Tools: Accelerated Software Engineering",
    "trackId": "cybersecurity",
    "category": "Data Structures & Developer Tools",
    "summary": "10x your software engineering velocity: leverage modern AI coding assistants (Claude Code, GitHub Copilot, Cursor), prompt engineering for code generation, test synthesis, automated refactoring, and AI code review.",
    "duration": "2 - 3 Weeks (12 Hours)",
    "difficulty": "Beginner",
    "keyTopics": [
      "AI Coding Assistant Mechanics & Context Windows",
      "Effective Prompt Engineering for Code Generation",
      "Automated Test Generation (Unit & Integration)",
      "AI-Assisted Code Refactoring & Security Auditing",
      "Multi-Agent Coding Workflows & Terminal Integration"
    ],
    "practicalMilestone": "Build a feature module end-to-end using AI coding assistants for architecture planning, test writing, implementation, and documentation.",
    "learningObjectives": [
      "AI Coding Assistant Mechanics & Context Windows",
      "Effective Prompt Engineering for Code Generation",
      "Automated Test Generation (Unit & Integration)",
      "AI-Assisted Code Refactoring & Security Auditing",
      "Multi-Agent Coding Workflows & Terminal Integration"
    ],
    "skills": [
      "AI Developer Tools",
      "Code Prompting",
      "Automated Testing",
      "Code Refactoring",
      "Developer Velocity"
    ],
    "requiredCourseIds": [
      "course-ai-assisted-coding"
    ],
    "relatedProjectIds": [
      "proj-task-manager"
    ],
    "recommendedNotes": [
      {
        "title": "Modern JavaScript & TypeScript Fundamentals",
        "slug": "javascript-promises-async-await"
      }
    ]
  }
];

export function getAllRoadmapSteps(): RoadmapStep[] {
  return ROADMAP_STEPS;
}

export function getRoadmapStepBySlug(slug: string): RoadmapStep | undefined {
  return ROADMAP_STEPS.find((s) => s.slug === slug);
}

export function getRoadmapStepsByTrack(trackId: string): RoadmapStep[] {
  return ROADMAP_STEPS.filter((s) => s.trackId === trackId);
}

export function getAllTracks(): RoadmapTrack[] {
  return ROADMAP_TRACKS;
}

export function getTrackById(id: string): RoadmapTrack | undefined {
  return ROADMAP_TRACKS.find((t) => t.id === id || t.slug === id);
}

export function getRequiredCoursesForStep(step: RoadmapStep): Course[] {
  if (step.requiredCourseIds && step.requiredCourseIds.length > 0) {
    return step.requiredCourseIds.map((id) => getCourseById(id)).filter(Boolean) as Course[];
  }
  return [];
}

export function getRelatedProjectsForStep(step: RoadmapStep): PracticalProject[] {
  if (step.relatedProjectIds && step.relatedProjectIds.length > 0) {
    return step.relatedProjectIds.map((id) => PRACTICAL_PROJECTS.find((p) => p.id === id)).filter(Boolean) as PracticalProject[];
  }
  return [];
}

export const ROADMAP_STAGES = ROADMAP_STEPS;
