import { Course } from "./types";

export const WEB_DEVELOPMENT_COURSES: Course[] = [
  // 4. HTML & CSS
  {
    id: "course-html-css",
    slug: "html-css",
    aliases: ["web-development-foundations", "html5-complete-guide"],
    title: "HTML & CSS: Responsive Architecture & Design Systems",
    description: "Build accessible, responsive, modern websites from semantic HTML5 tags and forms to CSS Flexbox, CSS Grid, media queries, animations, and production design systems.",
    shortDescription: "Master modern semantic HTML5, CSS Flexbox, Grid, accessibility (a11y), and responsive web design.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Web Development",
    difficulty: "Beginner",
    estimatedDuration: "18 Hours",
    estimatedDurationMinutes: 1080,
    totalLessons: 12,
    totalXp: 1500,
    icon: "🌐",
    color: "from-blue-600 to-cyan-800",
    skills: ["HTML5", "CSS3", "Flexbox & Grid", "Responsive Design", "Accessibility (a11y)", "Design Systems"],
    skillsGained: [
      "Structure documents with modern semantic HTML5 (<header>, <nav>, <main>, <article>)",
      "Build fully accessible web forms with client-side validation and screen reader support",
      "Master CSS specificity, inheritance, the cascade, and the Box Model",
      "Create fluid 1D layouts with Flexbox and responsive 2D layouts with CSS Grid",
      "Implement mobile-first responsive layouts with media queries and fluid clamp() typography",
      "Architect reusable CSS custom property design systems with light/dark theming"
    ],
    prerequisites: ["Basic computer usage", "A web browser and code editor"],
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-02-10T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "html-mod-1",
        title: "Semantic HTML5, Forms & Accessibility",
        description: "Semantic document outlining, accessible forms, inputs, tables, and ARIA roles.",
        lessons: [
          {
            id: "html-l1",
            slug: "html5-semantic-structure",
            title: "Semantic HTML5 Architecture & Document Outlines",
            duration: "35 mins",
            xpReward: 110,
            content: "Semantic HTML uses elements that clearly describe their meaning to both browser and developer. Rather than wrapping everything in generic <div> tags, semantic elements like <main>, <article>, <section>, and <nav> provide structure that screen readers and search engines use to navigate web documents.",
            codeExample: {
              language: "html",
              code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>SLRJ Learn</title>\n</head>\n<body>\n  <header>\n    <nav aria-label="Main Navigation">\n      <a href="/">Home</a>\n      <a href="/courses">Courses</a>\n    </nav>\n  </header>\n  <main>\n    <article>\n      <h1>HTML & CSS Engineering</h1>\n      <p>Semantic markup builds the web foundation.</p>\n    </article>\n  </main>\n</body>\n</html>`,
              output: "Semantic HTML document with navigation and article structure",
              explanation: "Semantic markup enables assistive technologies to jump directly to key landmarks."
            },
            commonMistakes: [
              {
                wrong: "Using multiple <h1> tags on a single page",
                correct: "Use exactly one primary <h1> representing the core page topic, followed by <h2> and <h3>",
                reason: "Multiple <h1> elements confuse document outline heuristics in screen readers."
              }
            ],
            keyTakeaways: [
              "Semantic tags eliminate unnecessary div nesting and improve SEO rankings.",
              "Always include lang=\"en\" on the <html> tag for screen reader pronunciation.",
              "Use alt attributes on all meaningful <img> tags."
            ],
            exercise: {
              id: "html-ex-1",
              type: "multiple-choice",
              prompt: "Which HTML5 landmark element should encapsulate the dominant, unique content of a webpage?",
              options: ["<section>", "<main>", "<content>", "<article>"],
              correctAnswer: 1,
              explanation: "<main> represents the dominant, unique content of the body, distinct from repeated headers and footers.",
              hint: "Only one per page."
            }
          }
        ]
      },
      {
        id: "css-mod-2",
        title: "The Box Model, Flexbox & CSS Grid",
        description: "CSS specificity, box-sizing, Flexbox alignment, and Grid blueprinting.",
        lessons: [
          {
            id: "css-l2",
            slug: "css-box-model-flexbox",
            title: "Box Model & Flexbox 1D Layout System",
            duration: "45 mins",
            xpReward: 130,
            content: "Every element in CSS is a rectangular box consisting of content, padding, border, and margin. Applying 'box-sizing: border-box' ensures padding and borders do not expand the declared width. Flexbox governs alignment, distribution, and wrapping along a single dimensional axis.",
            codeExample: {
              language: "css",
              code: `* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n.card-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}`,
              output: "Responsive flex layout with space-between alignment and 1.5rem gap",
              explanation: "gap: 1.5rem cleanly spaces items without negative margins."
            },
            commonMistakes: [
              {
                wrong: "Using float for multi-column layouts in modern web design",
                correct: "Use CSS Flexbox or CSS Grid",
                reason: "Floats were designed for wrapping text around images; Flexbox and Grid provide native layout engines."
              }
            ],
            keyTakeaways: [
              "Always apply box-sizing: border-box globally across all elements.",
              "justify-content controls the main axis; align-items controls the cross axis."
            ],
            exercise: {
              id: "css-ex-1",
              type: "multiple-choice",
              prompt: "Which CSS property ensures padding and border are included within an element's specified width and height?",
              options: ["box-sizing: border-box", "box-sizing: content-box", "overflow: hidden", "display: flow-root"],
              correctAnswer: 0,
              explanation: "box-sizing: border-box prevents padding and borders from ballooning outer dimensions.",
              hint: "Contains 'border-box'."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "html-pdf-1",
        title: "HTML5 & Modern CSS3 Handbook",
        description: "Complete guide to semantic tags, CSS Flexbox, Grid layouts, and responsive design systems.",
        moduleTitle: "Modern HTML/CSS",
        fileUrl: "/pdfs/html5-complete-notes.pdf",
        fileSize: "5.1 MB",
        pageCount: 48,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 10. React & Next.js
  {
    id: "course-react-nextjs",
    slug: "react-nextjs",
    aliases: ["nextjs-react-fullstack", "react-complete-guide"],
    title: "React & Next.js: Full-Stack Enterprise Architecture",
    description: "Master React 19, Server Components, Next.js App Router, Server Actions, streaming SSR, API routes, middleware, and full-stack production deployments.",
    shortDescription: "Master React 19 hooks, Next.js App Router, Server Components, Server Actions, and full-stack SaaS architecture.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Web Development",
    difficulty: "Advanced",
    estimatedDuration: "28 Hours",
    estimatedDurationMinutes: 1680,
    totalLessons: 14,
    totalXp: 2100,
    icon: "⚛️",
    color: "from-cyan-600 to-blue-900",
    skills: ["React 19", "Next.js App Router", "Server Components", "Server Actions", "Streaming SSR", "Authentication"],
    skillsGained: [
      "Understand React 19 concurrent features, Actions, useActionState, and useOptimistic",
      "Architect enterprise applications using Next.js App Router and nested layouts",
      "Differentiate Server Components (zero bundle size) from Client Components ('use client')",
      "Mutate server databases securely with Server Actions and revalidatePath()",
      "Implement route handlers, streaming with Suspense, and edge middleware",
      "Deploy full-stack web applications to Vercel and cloud platforms with automated CI/CD"
    ],
    prerequisites: ["Strong JavaScript ES6+ & TypeScript foundations", "Basic async programming"],
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-03-05T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "next-mod-1",
        title: "React 19 Core & Hooks Mastery",
        description: "Component lifecycle, state management, custom hooks, and concurrent features.",
        lessons: [
          {
            id: "next-l1",
            slug: "react-hooks-architecture",
            title: "React 19 State, Hooks & Custom Hook Architecture",
            duration: "50 mins",
            xpReward: 160,
            content: "React 19 models UI as a pure reflection of state. Hooks like useState, useEffect, useMemo, and useCallback govern component behavior. Custom hooks encapsulate reusable business logic cleanly away from presentational JSX markup.",
            codeExample: {
              language: "typescript",
              code: `"use client";\nimport { useState, useCallback } from "react";\n\nexport function useToggle(initial: boolean = false) {\n  const [value, setValue] = useState(initial);\n  const toggle = useCallback(() => setValue((v) => !v), []);\n  return [value, toggle] as const;\n}`,
              output: "Reusable toggle hook with memoized updater callback",
              explanation: "useCallback caches function instances between re-renders, preventing child re-render cascades."
            },
            commonMistakes: [
              {
                wrong: "Calling hooks conditionally inside if statements or loops",
                correct: "Always call hooks at the top level of React function components",
                reason: "React relies on the order in which Hooks are called to preserve state across renders."
              }
            ],
            keyTakeaways: [
              "Never call hooks conditionally; follow the Rules of Hooks.",
              "React 19 compiler automatically optimizes memoization in modern toolchains."
            ],
            exercise: {
              id: "react-ex-1",
              type: "multiple-choice",
              prompt: "Where must React hooks be called according to the official Rules of Hooks?",
              options: [
                "Only at the top level of React functional components or custom hooks",
                "Inside any loop or condition",
                "Within standard event listeners",
                "In class component lifecycle methods"
              ],
              correctAnswer: 0,
              explanation: "Hooks must only be invoked at the top level of function components or custom hooks to preserve hook state ordering.",
              hint: "At the very top level."
            }
          }
        ]
      },
      {
        id: "next-mod-2",
        title: "Next.js App Router, Server Components & Actions",
        description: "RSC architecture, streaming SSR, Server Actions, and data caching.",
        lessons: [
          {
            id: "next-l2",
            slug: "nextjs-rsc-server-actions",
            title: "React Server Components & Server Actions",
            duration: "55 mins",
            xpReward: 180,
            content: "Next.js App Router defaults all components to React Server Components (RSC). They render exclusively on the server, direct access databases, and emit zero JavaScript to the client bundle. Client components ('use client') add browser interactivity. Server Actions enable type-safe RPC mutations directly from client forms.",
            codeExample: {
              language: "typescript",
              code: `// app/courses/page.tsx (Server Component)\nexport default async function CoursesPage() {\n  const courses = await db.course.findMany(); // Direct DB query!\n  return (\n    <main className="p-8">\n      <h1>Available Courses ({courses.length})</h1>\n    </main>\n  );\n}`,
              output: "Server-rendered HTML with zero client JavaScript for database queries",
              explanation: "RSCs fetch data without client-side waterfalls, spinners, or exposing backend credentials."
            },
            commonMistakes: [
              {
                wrong: "Putting 'use client' at the top of every file in Next.js App Router",
                correct: "Keep pages and layouts as Server Components; push 'use client' to leaf interactive components",
                reason: "Overusing 'use client' increases client JavaScript bundles and loses RSC performance benefits."
              }
            ],
            keyTakeaways: [
              "Server Components execute on the server and send no JS to client bundles.",
              "Server Actions ('use server') eliminate the need for boilerplate API endpoints."
            ],
            exercise: {
              id: "next-ex-1",
              type: "multiple-choice",
              prompt: "What is the default component type in Next.js App Router unless marked with 'use client'?",
              options: ["Client Component", "React Server Component (RSC)", "Static Component only", "Edge worker"],
              correctAnswer: 1,
              explanation: "By default, every component in Next.js App Router is a React Server Component.",
              hint: "Server-side."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "next-pdf-1",
        title: "Next.js 15 & React 19 Full-Stack Architecture Guide",
        description: "Deep dive into React Server Components, Server Actions, streaming SSR, and edge deployment.",
        moduleTitle: "Next.js Enterprise",
        fileUrl: "/pdfs/nextjs-app-router-guide.pdf",
        fileSize: "6.8 MB",
        pageCount: 64,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 11. Node.js & Express
  {
    id: "course-nodejs-express",
    slug: "nodejs-express",
    aliases: ["backend-engineering-node", "nodejs-production"],
    title: "Node.js & Express: Scalable Backend Services & APIs",
    description: "Build robust, scalable backend services, RESTful APIs, authentication systems, rate limiters, middleware pipelines, and database integrations using Node.js and Express.",
    shortDescription: "Master Node.js asynchronous architecture, Express middleware, RESTful API design, JWT authentication, and production services.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Web Development",
    difficulty: "Intermediate",
    estimatedDuration: "20 Hours",
    estimatedDurationMinutes: 1200,
    totalLessons: 12,
    totalXp: 1650,
    icon: "🟩",
    color: "from-green-700 to-emerald-950",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Middleware", "Database Integration"],
    skillsGained: [
      "Understand the Node.js event loop, Libuv thread pool, and asynchronous non-blocking I/O",
      "Architect clean, modular Express applications with controllers, routes, and services",
      "Write custom middleware for logging, rate limiting, and global error handling",
      "Implement JWT authentication with bcrypt password hashing and refresh tokens",
      "Connect Express backends to PostgreSQL and MongoDB databases securely",
      "Containerize and deploy Node.js backend microservices"
    ],
    prerequisites: ["Strong JavaScript fundamentals (async/await, promises)"],
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-12T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "node-mod-1",
        title: "Node.js Architecture & Express Foundations",
        description: "V8 engine, Libuv event loop, Express routing, and middleware pipelines.",
        lessons: [
          {
            id: "node-l1",
            slug: "nodejs-event-loop-express",
            title: "Node.js Runtime & Express Routing Pipeline",
            duration: "45 mins",
            xpReward: 140,
            content: "Node.js brings JavaScript to server environments using Google's V8 engine and Libuv for asynchronous non-blocking I/O. Express.js is a minimalist web framework structured around middleware functions that process request and response objects in a pipeline.",
            codeExample: {
              language: "javascript",
              code: `const express = require('express');\nconst app = express();\n\napp.use(express.json()); // Built-in body parser middleware\n\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'healthy', timestamp: new Date().toISOString() });\n});\n\napp.listen(3000, () => console.log('Server online on port 3000'));`,
              output: "Server online on port 3000",
              explanation: "Express routes match HTTP verbs and paths, passing control through middleware chains."
            },
            commonMistakes: [
              {
                wrong: "Forgetting to call next() inside custom middleware",
                correct: "Always invoke next() or send a response (res.json())",
                reason: "If neither next() nor a response is returned, the HTTP client hangs indefinitely."
              }
            ],
            keyTakeaways: [
              "Middleware executes sequentially in the order defined by app.use().",
              "Never block the event loop with heavy synchronous CPU computations."
            ],
            exercise: {
              id: "node-ex-1",
              type: "multiple-choice",
              prompt: "What function must be invoked inside Express middleware to pass execution to the subsequent handler?",
              options: ["continue()", "next()", "proceed()", "forward()"],
              correctAnswer: 1,
              explanation: "Calling next() passes control to the next middleware in the execution stack.",
              hint: "Four letters: next."
            }
          }
        ]
      },
      {
        id: "node-mod-2",
        title: "REST APIs, Authentication & Database Integration",
        description: "RESTful principles, JWT tokens, bcrypt, error handling, and deployment.",
        lessons: [
          {
            id: "node-l2",
            slug: "express-jwt-rest-apis",
            title: "RESTful APIs & JWT Authentication",
            duration: "50 mins",
            xpReward: 160,
            content: "Production APIs follow RESTful resource conventions. Authentication uses stateless JSON Web Tokens (JWT) signed with HMAC-SHA256. Passwords are never stored in plaintext; bcrypt hashes with salting prevent rainbow table attacks.",
            codeExample: {
              language: "javascript",
              code: `const jwt = require('jsonwebtoken');\nconst bcrypt = require('bcryptjs');\n\nasync function authenticateUser(password, hash, user) {\n  const match = await bcrypt.compare(password, hash);\n  if (!match) throw new Error('Invalid credentials');\n  \n  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {\n    expiresIn: '2h'\n  });\n  return token;\n}`,
              output: "Signs and returns secure JWT bearer token on credential match",
              explanation: "bcrypt safely hashes passwords and jwt signs tamper-proof authorization tokens."
            },
            commonMistakes: [
              {
                wrong: "Storing sensitive secrets or passwords in JWT payloads",
                correct: "Only store non-sensitive identifiers (user ID, role); JWTs are signed, not encrypted",
                reason: "JWT payloads can be decoded easily by anyone holding the token string."
              }
            ],
            keyTakeaways: [
              "Always validate request bodies with schemas (Zod or Joi).",
              "Use central error-handling middleware (err, req, res, next) for consistent error responses."
            ],
            exercise: {
              id: "node-ex-2",
              type: "multiple-choice",
              prompt: "True or False: A standard JWT token payload is encrypted and cannot be viewed without the secret key.",
              options: ["True", "False"],
              correctAnswer: 1,
              explanation: "False! JWT payloads are Base64URL-encoded, not encrypted. They are only signed against tampering.",
              hint: "Anyone can read Base64."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "node-pdf-1",
        title: "Node.js & Express Backend Architecture Handbook",
        description: "Guide to event-loop mechanics, RESTful design, JWT security, and production Node.js servers.",
        moduleTitle: "Backend Architecture",
        fileUrl: "/pdfs/nodejs-backend-architecture.pdf",
        fileSize: "5.6 MB",
        pageCount: 50,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  }
];
