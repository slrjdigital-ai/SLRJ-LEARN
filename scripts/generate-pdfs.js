const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const PDF_DEFINITIONS = [
  {
    filename: 'web-fundamentals-complete-handbook.pdf',
    title: 'Web Fundamentals & Internet Architecture',
    subtitle: 'A Comprehensive Developer Guide to Clients, Servers, DNS, HTTP/HTTPS, and Browsers',
    category: 'Web Fundamentals',
    version: '2026 Edition',
    pages: [
      {
        section: '1. How the Internet Operates',
        content: [
          'The Internet is a global interconnected network of physical and wireless computers communicating via TCP/IP protocols.',
          'When you enter "https://slrjdigital.in" in your browser:',
          '  1. DNS Resolution: Browser queries DNS resolvers to translate hostname to IP address (e.g., 172.67.182.25).',
          '  2. TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK ensures reliable connection establishment.',
          '  3. TLS/SSL Negotiation: Cryptographic handshake exchanges cipher suites and verifies SSL certificates.',
          '  4. HTTP Request: Client sends GET / HTTP/2 or HTTP/3 request with headers and cookies.',
          '  5. Server Processing: Web server/CDN processes the request and streams back the HTML document.'
        ],
        codeTitle: 'Typical HTTP Request & Response Headers',
        codeLines: [
          'GET /blog HTTP/2',
          'Host: slrjdigital.in',
          'User-Agent: Mozilla/5.0 Chrome/130.0',
          'Accept: text/html,application/xhtml+xml',
          '',
          'HTTP/2 200 OK',
          'Content-Type: text/html; charset=utf-8',
          'Cache-Control: public, max-age=3600, s-maxage=86400',
          'Strict-Transport-Security: max-age=31536000; includeSubDomains'
        ],
        tips: [
          'Key Takeaway: Always use HTTPS (Port 443). SSL/TLS encrypts payload data against Man-in-the-Middle (MITM) attacks.',
          'Performance Tip: Keep round-trip time (RTT) low by leveraging edge CDNs (Cloudflare, Vercel Edge Network).'
        ]
      },
      {
        section: '2. Frontend vs Backend Architecture',
        content: [
          'Modern web engineering divides responsibilities across two distinct execution environments:',
          '  - Frontend (Client-Side): HTML, CSS, JavaScript executed directly in user agents (browsers). Handles rendering, UI state, gestures, client-side routing, and DOM manipulation.',
          '  - Backend (Server-Side): Node.js, Python, Go, or databases executed in trusted environments. Handles business logic, authentication, database persistence, data validation, and secrets.',
          '  - Security Rule: Never trust client input. Always validate schemas and authenticate requests on the server.'
        ],
        codeTitle: 'Client-Server Communication Pattern',
        codeLines: [
          '// Client Request (React / Next.js):',
          'const response = await fetch("/api/notes", { method: "GET" });',
          'const data = await response.json();',
          '',
          '// Server Route Handler (Next.js App Router):',
          'export async function GET() {',
          '  const notes = await db.select().from(notesTable);',
          '  return Response.json({ success: true, notes });',
          '}'
        ],
        tips: [
          'Architecture Tip: Server Components in Next.js allow fetching data directly without exposing public API endpoints.',
          'Exam / Interview Note: Explain the difference between Stateless HTTP and Stateful Sessions (Cookies vs JWTs).'
        ]
      }
    ]
  },
  {
    filename: 'html5-complete-notes.pdf',
    title: 'HTML5 & Semantic Web Development Guide',
    subtitle: 'Modern Document Structure, Accessibility (A11y), Forms, Tables, and SEO Optimization',
    category: 'HTML',
    version: '2026 Edition',
    pages: [
      {
        section: '1. Semantic HTML & Document Architecture',
        content: [
          'Semantic HTML uses tags that convey explicit meaning to both browsers and search engines.',
          'Key semantic structural tags:',
          '  - <header>: Introductory content, site branding, primary navigation.',
          '  - <nav>: Main navigational links.',
          '  - <main>: Dominant content unique to the document (must not repeat in templates).',
          '  - <article>: Self-contained independent piece of content (blog post, news item, card).',
          '  - <section>: Thematic grouping of content, typically with its own heading.',
          '  - <aside>: Indirectly related content, sidebars, callouts, or related links.',
          '  - <footer>: Document footer, copyright, legal links, author metadata.'
        ],
        codeTitle: 'Production HTML5 Skeleton with Meta & A11y',
        codeLines: [
          '<!DOCTYPE html>',
          '<html lang="en">',
          '<head>',
          '  <meta charset="UTF-8">',
          '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
          '  <title>SLRJ Digital | Web Engineering Notes</title>',
          '  <meta name="description" content="Master modern web development.">',
          '</head>',
          '<body>',
          '  <header><nav aria-label="Main Navigation">...</nav></header>',
          '  <main id="content"><article><h1>HTML5 Mastery</h1>...</article></main>',
          '  <footer><p>&copy; 2026 SLRJ Digital</p></footer>',
          '</body>',
          '</html>'
        ],
        tips: [
          'A11y Rule: Every image MUST have an alt attribute. Use empty alt="" only for purely decorative graphics.',
          'SEO Rule: Never have more than one <h1> element per page.'
        ]
      },
      {
        section: '2. Accessible Forms, Tables, and Validation',
        content: [
          'Web forms are the primary interactive interface for collecting user input. Accessibility requires strict pairing:',
          '  - Always connect <label for="fieldId"> with <input id="fieldId">.',
          '  - Use appropriate input types (email, tel, url, number, date) for mobile keyboard optimization.',
          '  - Use aria-describedby for assistive feedback, error messages, and helper hints.',
          '  - Tables must utilize <thead>, <tbody>, <th> with scope="col" or scope="row" for screen-reader navigation.'
        ],
        codeTitle: 'Accessible Form Field Structure',
        codeLines: [
          '<div class="form-group">',
          '  <label for="user-email" class="font-medium">Work Email</label>',
          '  <input',
          '    type="email"',
          '    id="user-email"',
          '    name="email"',
          '    required',
          '    aria-required="true"',
          '    aria-describedby="email-hint"',
          '    placeholder="engineer@company.com"',
          '  />',
          '  <span id="email-hint" class="text-muted">We will send study notes to this email.</span>',
          '</div>'
        ],
        tips: [
          'Validation Tip: Combine HTML5 constraint validation (pattern, minlength, required) with JavaScript and server-side schemas.',
          'UX Tip: Ensure focus visible rings are clearly styled for keyboard tab navigation.'
        ]
      }
    ]
  },
  {
    filename: 'css-flexbox-grid-cheatsheet.pdf',
    title: 'CSS3, Flexbox & Grid Master Cheatsheet',
    subtitle: 'Layout Systems, Box Model, Responsive Design, Positioning, and Modern Transitions',
    category: 'CSS',
    version: '2026 Edition',
    pages: [
      {
        section: '1. The CSS Box Model & Flexbox Deep Dive',
        content: [
          'The CSS Box Model comprises Content -> Padding -> Border -> Margin.',
          'Always configure: * { box-sizing: border-box; } so padding and border do not inflate element width.',
          '',
          'Flexbox (1-Dimensional Layouts - Row or Column):',
          '  - display: flex; (turns container into flex context).',
          '  - flex-direction: row | column | row-reverse | column-reverse.',
          '  - justify-content: flex-start | center | flex-end | space-between | space-evenly (Main Axis).',
          '  - align-items: stretch | center | flex-start | flex-end (Cross Axis).',
          '  - gap: sets uniform spacing between flex items without margin hacks.',
          '  - flex: 1 1 auto; shorthand for (flex-grow, flex-shrink, flex-basis).'
        ],
        codeTitle: 'Perfect Flexbox Centering & Navigation Bar',
        codeLines: [
          '.nav-container {',
          '  display: flex;',
          '  align-items: center;',
          '  justify-content: space-between;',
          '  gap: 1.5rem;',
          '  padding: 1rem 2rem;',
          '}',
          '.hero-center {',
          '  display: flex;',
          '  justify-content: center;',
          '  align-items: center;',
          '  min-height: 80vh;',
          '}'
        ],
        tips: [
          'Pro Rule: Use Flexbox for component-level UI (navbars, card headers, button groups, modal actions).',
          'Avoid: Do not use negative margins when flexbox gap or justify-content can solve spacing cleanly.'
        ]
      },
      {
        section: '2. CSS Grid & Responsive Layout Architecture',
        content: [
          'CSS Grid is designed for 2-Dimensional Layouts (simultaneous control over rows and columns).',
          '  - display: grid;',
          '  - grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); (Instant Responsive Grid without media queries!)',
          '  - grid-template-areas: allows ASCII visual template mapping of page layouts.',
          '  - align-items & justify-items: align cells across block and inline axes.',
          '',
          'Responsive Breakpoints Guide:',
          '  - Mobile First: default styles target 320px - 639px.',
          '  - Tablet: @media (min-width: 640px) or 768px.',
          '  - Desktop: @media (min-width: 1024px) and 1280px.'
        ],
        codeTitle: 'Auto-Responsive Card Grid with CSS Grid',
        codeLines: [
          '.cards-grid {',
          '  display: grid;',
          '  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));',
          '  gap: 2rem;',
          '  padding: 2rem 0;',
          '}',
          '@media (min-width: 1024px) {',
          '  .page-layout {',
          '    display: grid;',
          '    grid-template-columns: 280px 1fr;',
          '    gap: 3rem;',
          '  }',
          '}'
        ],
        tips: [
          'Gold Standard: Prefer CSS Grid for page templates, dashboards, and media listings.',
          'Performance Tip: Animate transform and opacity only. Avoid animating width, height, or top/left.'
        ]
      }
    ]
  },
  {
    filename: 'javascript-modern-guide.pdf',
    title: 'Modern JavaScript (ES6+ to Async) Developer Guide',
    subtitle: 'Scope, Closures, Array Methods, Promises, Async/Await, Event Loop, and DOM APIs',
    category: 'JavaScript',
    version: '2026 Edition',
    pages: [
      {
        section: '1. ES6+ Fundamentals, Scope, and Data Structures',
        content: [
          'Modern JavaScript execution fundamentals:',
          '  - const and let provide block-scoped variable declarations. Avoid var due to function hoisting traps.',
          '  - Arrow Functions () => {} inherit this lexically from the enclosing scope.',
          '  - Destructuring: const { title, slug } = note; const [first, ...rest] = items;',
          '  - Spread & Rest: {...props, active: true}; handles immutable state updates.',
          '  - Essential Array Methods: .map(), .filter(), .reduce(), .find(), .some(), .every().',
          '  - Immutable Principles: Never mutate array inputs directly in modern React applications.'
        ],
        codeTitle: 'High-Performance Functional Data Pipeline',
        codeLines: [
          'const tutorials = [',
          '  { id: 1, title: "React 19 Guide", category: "React", views: 4200 },',
          '  { id: 2, title: "CSS Grid Mastery", category: "CSS", views: 2800 },',
          '  { id: 3, title: "Next.js App Router", category: "Next.js", views: 8900 }',
          '];',
          '',
          'const topFrameworkGuides = tutorials',
          '  .filter(item => item.views > 3000)',
          '  .map(item => ({ ...item, isTrending: true }))',
          '  .sort((a, b) => b.views - a.views);'
        ],
        tips: [
          'Best Practice: Use Optional Chaining (item?.user?.profile) and Nullish Coalescing (val ?? "default").',
          'Memory Tip: Clean up event listeners and intervals when components unmount to avoid memory leaks.'
        ]
      },
      {
        section: '2. Asynchronous JavaScript, Promises & Event Loop',
        content: [
          'JavaScript runs on a single-threaded Event Loop with a Call Stack, Microtask Queue, and Macrotask Queue.',
          '  - Microtasks (Promise.then, async/await, queueMicrotask) run IMMEDIATELY after the current execution context.',
          '  - Macrotasks (setTimeout, setInterval, I/O) run after the microtask queue is exhausted.',
          '  - Async/Await: Syntactic sugar on top of Promises that enables clean linear code structure.',
          '  - Concurrency: Use Promise.all() for parallel independent requests, Promise.allSettled() when failures should not abort.'
        ],
        codeTitle: 'Production Async Data Fetching with Error Handling',
        codeLines: [
          'async function fetchTutorialNotes(category) {',
          '  try {',
          '    const url = `/api/notes?category=${encodeURIComponent(category)}`;',
          '    const res = await fetch(url, { headers: { "Accept": "application/json" } });',
          '    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch notes`);',
          '    const data = await res.json();',
          '    return { success: true, notes: data.notes };',
          '  } catch (error) {',
          '    console.error("fetchTutorialNotes error:", error.message);',
          '    return { success: false, error: error.message };',
          '  }',
          '}'
        ],
        tips: [
          'Interview Question: Why does Promise.resolve().then() run before setTimeout(..., 0)? (Microtask priority).',
          'Bug Warning: Always await async promises inside try/catch or chain .catch() to avoid unhandled rejections.'
        ]
      }
    ]
  },
  {
    filename: 'react-hooks-architecture-handbook.pdf',
    title: 'React 19 Hooks & Component Architecture Handbook',
    subtitle: 'State, Effects, Memoization, Custom Hooks, Context, and Server Components',
    category: 'React',
    version: '2026 Edition',
    pages: [
      {
        section: '1. React Core Concepts & The Hook Rules',
        content: [
          'React builds declarative, stateful user interfaces via reusable component trees.',
          'The Rules of Hooks:',
          '  1. Only call hooks at the top level (never inside conditions, loops, or nested functions).',
          '  2. Only call hooks from React function components or custom hooks.',
          '',
          'Essential Hooks Catalog:',
          '  - useState(initialState): Declares reactive component state with an immutable setter.',
          '  - useEffect(callback, [deps]): Synchronizes with external systems (APIs, DOM, subscriptions).',
          '  - useMemo(() => compute(), [deps]): Caches expensive calculation results across re-renders.',
          '  - useCallback((e) => {}, [deps]): Returns a stable memoized function reference for child props.',
          '  - useRef(initial): Persists mutable reference without triggering component re-renders.'
        ],
        codeTitle: 'Custom Hook: useLocalStorage with Hydration Guard',
        codeLines: [
          'import { useState, useEffect } from "react";',
          '',
          'export function useLocalStorage(key, initialValue) {',
          '  const [storedValue, setStoredValue] = useState(() => {',
          '    if (typeof window === "undefined") return initialValue;',
          '    try {',
          '      const item = window.localStorage.getItem(key);',
          '      return item ? JSON.parse(item) : initialValue;',
          '    } catch { return initialValue; }',
          '  });',
          '  const setValue = (val) => {',
          '    setStoredValue(val);',
          '    window.localStorage.setItem(key, JSON.stringify(val));',
          '  };',
          '  return [storedValue, setValue];',
          '}'
        ],
        tips: [
          'React 19 Enhancement: Automatic memoization compiler minimizes boilerplate useMemo / useCallback requirements.',
          'Anti-Pattern: Never use useEffect to calculate derived state that can be computed during render.'
        ]
      },
      {
        section: '2. Component Composition & Best Practices',
        content: [
          'Clean Component Architecture Guidelines:',
          '  - Container / Presentational Separation: Keep business logic in custom hooks and UI rendering in clean components.',
          '  - Lifting State Up: When multiple components share state, elevate it to the closest common ancestor.',
          '  - Context API: Reserve React Context for truly global values (theme, authenticated user, locale).',
          '  - Key Prop Integrity: Always provide stable, unique IDs as keys in lists (never array indices when items can reorder).'
        ],
        codeTitle: 'Compound Component / Modular Card Architecture',
        codeLines: [
          'export function NoteCard({ note, onDownload }) {',
          '  return (',
          '    <div className="card glass-card p-6 flex flex-col justify-between">',
          '      <div>',
          '        <span className="badge font-mono text-xs">{note.category}</span>',
          '        <h3 className="text-xl font-bold mt-2">{note.title}</h3>',
          '        <p className="text-gray-400 text-sm mt-1">{note.description}</p>',
          '      </div>',
          '      <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">',
          '        <Link href={`/blog/${note.slug}`} className="btn-primary">Read Note</Link>',
          '        <button onClick={() => onDownload(note)} className="btn-secondary">Download PDF</button>',
          '      </div>',
          '    </div>',
          '  );',
          '}'
        ],
        tips: [
          'Best Practice: Keep components small, testable, and focused on a single responsibility.',
          'TypeScript Tip: Always type props explicitly with interfaces or type aliases.'
        ]
      }
    ]
  },
  {
    filename: 'nextjs-app-router-guide.pdf',
    title: 'Next.js App Router & Full-Stack Architecture Guide',
    subtitle: 'Server vs Client Components, Dynamic Routes, Metadata SEO, Layouts, and Data Fetching',
    category: 'Next.js',
    version: '2026 Edition',
    pages: [
      {
        section: '1. App Router Foundations & Server Components (RSC)',
        content: [
          'Next.js uses file-system based routing inside the `app/` directory.',
          'Server Components by Default:',
          '  - Render on the server, zero client bundle overhead, direct database and backend access.',
          '  - Cannot use useState, useEffect, or browser APIs (window, localStorage).',
          'Client Components ("use client"):',
          '  - Pre-rendered on server, hydrated in browser for interactive state and event handlers.',
          '',
          'Special Files in App Router:',
          '  - layout.tsx: Shared UI shell preserved across route transitions.',
          '  - page.tsx: Route view rendered at that specific segment.',
          '  - loading.tsx: Instant streaming fallback powered by React Suspense.',
          '  - error.tsx: Client-side error boundary caught gracefully.',
          '  - not-found.tsx: 404 page for unmatched segments.'
        ],
        codeTitle: 'Dynamic Route with Next.js Metadata Generation',
        codeLines: [
          '// app/blog/[slug]/page.tsx',
          'import { Metadata } from "next";',
          'import { getNoteBySlug, getAllNotes } from "@/data/notes";',
          'import { notFound } from "next/navigation";',
          '',
          'export async function generateMetadata({ params }): Promise<Metadata> {',
          '  const { slug } = await params;',
          '  const note = getNoteBySlug(slug);',
          '  if (!note) return { title: "Note Not Found" };',
          '  return {',
          '    title: `${note.title} | SLRJ Digital`,',
          '    description: note.description,',
          '    alternates: { canonical: `https://slrjdigital.in/blog/${slug}` }',
          '  };',
          '}'
        ],
        tips: [
          'Architecture Tip: Push "use client" directives to the leaves of your component tree.',
          'Static Generation: Implement generateStaticParams() for instantaneous edge CDN delivery.'
        ]
      },
      {
        section: '2. Route Handlers, Caching, and Production SEO',
        content: [
          'Route Handlers (app/api/.../route.ts):',
          '  - Build REST APIs using Web Request and Response standards.',
          '  - Support GET, POST, PUT, PATCH, DELETE, OPTIONS methods.',
          '',
          'Caching & Revalidation Strategies:',
          '  - fetch("url", { cache: "force-cache" }): Cached indefinitely until revalidated.',
          '  - fetch("url", { next: { revalidate: 3600 } }): Incremental Static Regeneration (ISR).',
          '  - fetch("url", { cache: "no-store" }): Dynamic server-rendered on every incoming request.',
          '',
          'SEO Best Practices in Next.js:',
          '  - Supply robots.ts and sitemap.ts files directly inside app/ directory.',
          '  - Include Open Graph and Twitter Card tags in metadata.',
          '  - Embed JSON-LD structured data for articles and courses.'
        ],
        codeTitle: 'Robust API Route Handler in Next.js',
        codeLines: [
          '// app/api/newsletter/route.ts',
          'import { NextResponse } from "next/server";',
          '',
          'export async function POST(req: Request) {',
          '  try {',
          '    const { email } = await req.json();',
          '    if (!email || !email.includes("@")) {',
          '      return NextResponse.json({ error: "Invalid email" }, { status: 400 });',
          '    }',
          '    // Save to persistence store / Supabase / JSON',
          '    return NextResponse.json({ success: true, message: "Subscribed" });',
          '  } catch (err) {',
          '    return NextResponse.json({ error: "Server error" }, { status: 500 });',
          '  }',
          '}'
        ],
        tips: [
          'Edge Hosting: Deploy on Vercel or Node.js Docker containers with standard environment configs.',
          'Security Tip: Protect API routes with rate-limiting and payload validation.'
        ]
      }
    ]
  },
  {
    filename: 'git-github-essential-workflow.pdf',
    title: 'Git & GitHub Essential Engineering Workflow',
    subtitle: 'Version Control, Branching Models, Merging vs Rebasing, Conflict Resolution, and PRs',
    category: 'Git & GitHub',
    version: '2026 Edition',
    pages: [
      {
        section: '1. Git Core Architecture & Daily Commands',
        content: [
          'Git is a distributed version control system tracking snapshots of code states.',
          'Three Local Stages: Working Directory -> Staging Area (Index) -> Git Repository (.git).',
          '',
          'Daily Command Flow:',
          '  - git init: Initializes a new Git repository.',
          '  - git status: Inspects modified, staged, and untracked files.',
          '  - git add <file> or git add .: Stages changes for commit.',
          '  - git commit -m "feat: add blog pdf download": Creates atomic snapshot.',
          '  - git log --oneline --graph: Visualizes commit history graph.',
          '  - git diff: Shows unstaged changes versus current repository state.'
        ],
        codeTitle: 'Standard Professional Feature Branch Workflow',
        codeLines: [
          '# 1. Ensure local main is synchronized with remote',
          'git checkout main',
          'git pull origin main',
          '',
          '# 2. Create and switch to a descriptive feature branch',
          'git checkout -b feature/blog-notes-system',
          '',
          '# 3. Work, test, stage, and commit changes',
          'git add components/ data/ app/blog/',
          'git commit -m "feat(blog): implement notes listing and PDF library"',
          '',
          '# 4. Push feature branch to GitHub',
          'git push -u origin feature/blog-notes-system'
        ],
        tips: [
          'Commit Convention: Use Conventional Commits (feat:, fix:, docs:, refactor:, test:, chore:).',
          'Safety Rule: Never commit API secrets or .env files. Always maintain a comprehensive .gitignore.'
        ]
      },
      {
        section: '2. Branching, Merging, Rebasing & Collaboration',
        content: [
          'Merge vs Rebase:',
          '  - git merge <branch>: Creates a merge commit that joins histories together. Safe and non-destructive.',
          '  - git rebase <branch>: Replays your branch commits on top of base branch. Creates a clean, linear history.',
          '  - Golden Rebase Rule: NEVER rebase a public shared branch that other engineers are working on!',
          '',
          'Resolving Merge Conflicts:',
          '  1. Identify conflict markers (<<<<<<< HEAD, =======, >>>>>>> branch).',
          '  2. Review intent of both changes with team, choose or combine code.',
          '  3. Save file, run git add <file>, and finalize with git commit.'
        ],
        codeTitle: 'Useful Git Rescue & Maintenance Commands',
        codeLines: [
          '# Stash dirty working state temporarily',
          'git stash save "WIP notes filter"',
          'git stash pop',
          '',
          '# Undo last commit while keeping modified files staged',
          'git reset --soft HEAD~1',
          '',
          '# Discard local unstaged modifications in a file',
          'git checkout -- path/to/file.tsx',
          '',
          '# Remove untracked files and directories',
          'git clean -fd'
        ],
        tips: [
          'Collaboration: Open Pull Requests (PRs) with concise descriptions and before/after screenshots.',
          'GitHub Tip: Enable branch protection rules on main to require pull request reviews and passing CI checks.'
        ]
      }
    ]
  },
  {
    filename: 'rest-apis-backend-handbook.pdf',
    title: 'REST APIs & Backend Engineering Handbook',
    subtitle: 'HTTP Methods, Status Codes, Node.js, Database Fundamentals, JWT Auth, and Security',
    category: 'Backend & Databases',
    version: '2026 Edition',
    pages: [
      {
        section: '1. REST Architectural Principles & HTTP Conventions',
        content: [
          'Representational State Transfer (REST) is a resource-oriented architectural style.',
          'Core HTTP Verbs:',
          '  - GET: Retrieve resource (Idempotent & Safe).',
          '  - POST: Create new subordinate resource.',
          '  - PUT: Completely replace an existing resource (Idempotent).',
          '  - PATCH: Partially update specific fields of a resource.',
          '  - DELETE: Remove a resource (Idempotent).',
          '',
          'Essential HTTP Status Codes:',
          '  - 200 OK, 201 Created, 204 No Content.',
          '  - 400 Bad Request, 401 Unauthorized (Missing Auth), 403 Forbidden (Insufficient Role).',
          '  - 404 Not Found, 409 Conflict, 429 Too Many Requests (Rate Limited).',
          '  - 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable.'
        ],
        codeTitle: 'RESTful Resource Endpoint Design Pattern',
        codeLines: [
          '// Resource: Notes / Study Materials',
          'GET    /api/v1/notes          -> Retrieve paginated notes list',
          'GET    /api/v1/notes/:id      -> Retrieve note detail',
          'POST   /api/v1/notes          -> Create new note (Admin only)',
          'PATCH  /api/v1/notes/:id      -> Update note fields',
          'DELETE /api/v1/notes/:id      -> Delete note (Admin only)',
          '',
          'GET    /api/v1/notes/:id/pdfs -> List PDF downloads for note'
        ],
        tips: [
          'Idempotency Tip: A request is idempotent if making it multiple times yields the same state as making it once.',
          'API Design: Always use plural nouns for collections (/users, /notes) instead of verbs (/getUsers).'
        ]
      },
      {
        section: '2. Databases, Authentication & Web Security (OWASP)',
        content: [
          'Database Architectures:',
          '  - SQL (Relational: PostgreSQL, MySQL): Structured schemas, ACID transactions, foreign keys, complex joins.',
          '  - NoSQL (Document: MongoDB, Supabase KV): Flexible JSON documents, horizontal scalability, rapid prototyping.',
          '',
          'Authentication & Authorization:',
          '  - Authentication (AuthN): "Who are you?" Verified via Passwords (bcrypt hashed), OAuth2, or Passkeys.',
          '  - Authorization (AuthZ): "What are you permitted to do?" Enforced via Roles (RBAC) and permissions.',
          '  - JWTs: Store signed claims in secure, httpOnly, sameSite="strict" cookies to mitigate XSS attacks.',
          '',
          'Critical OWASP Defenses:',
          '  - SQL Injection: Always use parameterized queries or ORMs (Prisma, Drizzle). Never concatenate raw strings.',
          '  - Cross-Site Scripting (XSS): Sanitize all untrusted HTML and render through React which escapes strings.',
          '  - CORS: Restrict Access-Control-Allow-Origin headers to trusted domain origins.'
        ],
        codeTitle: 'Secure Route Handler with Payload Validation',
        codeLines: [
          'import { z } from "zod";',
          '',
          'const NoteSchema = z.object({',
          '  title: z.string().min(5).max(120),',
          '  category: z.string(),',
          '  slug: z.string().regex(/^[a-z0-9-]+$/)',
          '});',
          '',
          'export async function handleCreateNote(req) {',
          '  const body = await req.json();',
          '  const parsed = NoteSchema.safeParse(body);',
          '  if (!parsed.success) {',
          '    return Response.json({ errors: parsed.error.issues }, { status: 400 });',
          '  }',
          '  // Persist validated data to database safely',
          '}'
        ],
        tips: [
          'Gold Standard: Never store plaintext passwords. Use Argon2id or bcrypt with cost factor >= 12.',
          'Audit Rule: Maintain structured logging for all authentication attempts and administrative modifications.'
        ]
      }
    ]
  },
  {
    filename: 'dsa-complete-handbook.pdf',
    title: 'Data Structures & Algorithms (DSA) Handbook',
    subtitle: 'Technical Interview Preparation: Big-O, Arrays, Hash Tables, Trees, Graphs & Dynamic Programming',
    category: 'Data Structures & Algorithms',
    version: '2026 Edition',
    pages: [
      {
        section: '1. Asymptotic Complexity & Two Pointer Technique',
        content: [
          'Asymptotic analysis measures algorithm runtime and memory as input size N grows toward infinity.',
          '  - Big-O (O): Upper bound / worst-case runtime guarantee.',
          '  - Omega (Omega): Lower bound / best-case performance.',
          '  - Theta (Theta): Tight bound / exact growth order.',
          'Common Time Complexities: O(1) Constant < O(log N) Logarithmic < O(N) Linear < O(N log N) Linearithmic < O(N^2) Quadratic.',
          'Two Pointer Pattern: Ideal for sorted arrays to achieve O(N) runtime and O(1) space instead of nested loops O(N^2).'
        ],
        codeTitle: 'Two Pointer: Two Sum in Sorted Array O(N)',
        codeLines: [
          'function twoSumSorted(numbers, target) {',
          '  let left = 0, right = numbers.length - 1;',
          '  while (left < right) {',
          '    const sum = numbers[left] + numbers[right];',
          '    if (sum === target) return [left + 1, right + 1];',
          '    if (sum < target) left++;',
          '    else right--;',
          '  }',
          '  return [];',
          '}'
        ],
        tips: [
          'Interview Pro-Tip: Clarify input constraints before writing code. If array is sorted, think Two Pointers or Binary Search O(log N).',
          'Space Complexity: Space allocated by recursion call stack counts toward auxiliary space complexity.'
        ]
      },
      {
        section: '2. Trees, Graphs & Traversals (BFS / DFS)',
        content: [
          'Hierarchical and non-linear data structures model real-world relationships:',
          '  - Binary Search Tree (BST): Left child < root < right child. Lookup, insertion, deletion: Average O(log N), Worst O(N).',
          '  - Breadth-First Search (BFS): Level-by-level traversal using a Queue (FIFO). Computes unweighted shortest paths.',
          '  - Depth-First Search (DFS): Deep branch exploration using Recursion / Stack (LIFO). Ideal for cycle detection and topological sorting.'
        ],
        codeTitle: 'Graph BFS Traversal with Queue O(V + E)',
        codeLines: [
          'function bfsTraversal(graph, startNode) {',
          '  const visited = new Set([startNode]);',
          '  const queue = [startNode];',
          '  const result = [];',
          '  while (queue.length > 0) {',
          '    const current = queue.shift();',
          '    result.push(current);',
          '    for (const neighbor of graph[current] || []) {',
          '      if (!visited.has(neighbor)) {',
          '        visited.add(neighbor);',
          '        queue.push(neighbor);',
          '      }',
          '    }',
          '  }',
          '  return result;',
          '}'
        ],
        tips: [
          'Graph Gotcha: Always track visited nodes in a Set to prevent infinite loops in cyclic graphs.',
          'Dynamic Programming Rule: If a problem exhibits Optimal Substructure + Overlapping Subproblems, use DP with memoization.'
        ]
      }
    ]
  },
  {
    filename: 'python-ai-essentials.pdf',
    title: 'Python, Data Science & AI Engineering Guide',
    subtitle: 'From Python Core Syntax to NumPy, Pandas, Machine Learning & Generative AI Prompt Engineering',
    category: 'Python & AI',
    version: '2026 Edition',
    pages: [
      {
        section: '1. Python Idiomatic Programming & OOP',
        content: [
          'Python is a multi-paradigm, dynamically typed language renowned for readability, clean syntax, and rich scientific ecosystem.',
          '  - List Comprehensions: Expressive inline loops: [x**2 for x in nums if x % 2 == 0].',
          '  - Generators & Yield: Memory-efficient streaming of large datasets without loading everything in RAM.',
          '  - Decorators: Higher-order wrapper functions for logging, caching, and authentication.',
          '  - OOP Design: Encapsulation with dunder methods (__init__, __repr__, __len__) and clean class inheritance.'
        ],
        codeTitle: 'Idiomatic Python Class & Decorator Pattern',
        codeLines: [
          'import time',
          'from functools import wraps',
          '',
          'def timed(func):',
          '    @wraps(func)',
          '    def wrapper(*args, **kwargs):',
          '        start = time.perf_counter()',
          '        result = func(*args, **kwargs)',
          '        print(f"{func.__name__} took {time.perf_counter()-start:.4f}s")',
          '        return result',
          '    return wrapper'
        ],
        tips: [
          'Clean Code Rule: Follow PEP 8 style guidelines. Use type hints (def process(data: list[int]) -> float:) for clarity.',
          'Virtual Environments: Always use python -m venv .venv or Poetry to isolate project dependencies.'
        ]
      },
      {
        section: '2. NumPy, Machine Learning & LLMs',
        content: [
          'The modern artificial intelligence engineering pipeline spans data wrangling, model training, and generative inference:',
          '  - NumPy & Pandas: High-performance C-backed contiguous ndarrays and tabular DataFrames.',
          '  - Supervised Learning: Training on labeled data (Regression for continuous values, Classification for discrete labels).',
          '  - Neural Networks: Layers of interconnected weights adjusted via backpropagation and gradient descent.',
          '  - Generative AI & LLMs: Pretrained Transformers computing token probabilities with self-attention mechanisms.'
        ],
        codeTitle: 'Pandas Data Wrangling & LLM Prompting Flow',
        codeLines: [
          'import pandas as pd',
          '',
          'df = pd.read_csv("dataset.csv")',
          'clean_df = df.dropna().groupby("category").agg({"score": "mean"})',
          '',
          '# Generative AI Prompt Template Pattern',
          'system_prompt = "You are a senior tech tutor. Explain concisely."',
          'user_message = f"Summarize key trends in {clean_df.to_dict()}"',
          '# Send to OpenAI / Gemini API endpoint'
        ],
        tips: [
          'Prompt Engineering Tip: Assign a precise persona, provide 2-3 few-shot examples, and constrain output format with JSON schemas.',
          'Vector Embeddings: Convert text to high-dimensional embeddings for Semantic Search & RAG architectures.'
        ]
      }
    ]
  },
  {
    filename: 'dbms-sql-cheatsheet.pdf',
    title: 'Database Management Systems & SQL Handbook',
    subtitle: 'Relational Schema Design, Normalization, ACID Transactions, Indexing & Query Optimization',
    category: 'Computer Science Core',
    version: '2026 Edition',
    pages: [
      {
        section: '1. Relational Databases, Normalization & ACID',
        content: [
          'Database systems ensure atomic, durable storage of critical application state with strict consistency guarantees:',
          '  - Atomicity: Transactions execute as all-or-nothing units.',
          '  - Consistency: Data transitions only between valid states conforming to schema constraints.',
          '  - Isolation: Concurrent transactions do not interfere (Read Committed, Repeatable Read, Serializable).',
          '  - Durability: Committed changes survive system crashes and power failures via Write-Ahead Logging (WAL).',
          'Normalization: Eliminates data redundancy and insertion/deletion anomalies: 1NF (atomic values) -> 2NF (no partial dependencies) -> 3NF (no transitive dependencies).'
        ],
        codeTitle: 'Complex SQL: JOINs, Aggregations & Window Functions',
        codeLines: [
          'SELECT',
          '  u.id, u.full_name,',
          '  COUNT(o.id) AS total_orders,',
          '  SUM(o.amount) AS total_spent,',
          '  DENSE_RANK() OVER (ORDER BY SUM(o.amount) DESC) AS rank',
          'FROM users u',
          'JOIN orders o ON u.id = o.user_id',
          'WHERE o.status = "completed"',
          'GROUP BY u.id, u.full_name',
          'HAVING COUNT(o.id) >= 5;'
        ],
        tips: [
          'Indexing Rule: Create composite B-Tree indexes matching WHERE and ORDER BY column order (Leftmost prefix rule).',
          'Avoid SELECT *: Specify explicit column names to minimize I/O bandwidth and enable covering index scans.'
        ]
      },
      {
        section: '2. B-Trees, Transactions & NoSQL Tradeoffs',
        content: [
          'Understanding storage engine internals is essential for scaling database performance:',
          '  - B-Trees / B+ Trees: Self-balancing multi-way search trees kept in memory and disk blocks. Lookups: O(log N).',
          '  - Isolation Levels: Read Uncommitted < Read Committed < Repeatable Read < Serializable (prevents dirty reads, non-repeatable reads, phantom reads).',
          '  - NoSQL Tradeoffs: MongoDB (Document/Flexible schema), Redis (In-memory caching/Key-Value), Cassandra (High-throughput writes/Columnar).'
        ],
        codeTitle: 'Atomic Database Transaction (SQL)',
        codeLines: [
          'BEGIN TRANSACTION;',
          'UPDATE accounts SET balance = balance - 500 WHERE id = 101;',
          'UPDATE accounts SET balance = balance + 500 WHERE id = 202;',
          'INSERT INTO audit_log (sender, receiver, amount) VALUES (101, 202, 500);',
          'COMMIT;',
          '-- In event of failure, ROLLBACK reverts all operations.'
        ],
        tips: [
          'CAP Theorem: A distributed system can guarantee at most two of: Consistency, Availability, Partition Tolerance.',
          'Connection Pooling: Never open a new DB connection per HTTP request. Use connection pools (pgbouncer, HikariCP).'
        ]
      }
    ]
  },
  {
    filename: 'os-networking-handbook.pdf',
    title: 'Operating Systems & Computer Networks Core',
    subtitle: 'Processes, Threads, Concurrency, Memory Paging, OSI Model, TCP/IP & Socket Architecture',
    category: 'Computer Science Core',
    version: '2026 Edition',
    pages: [
      {
        section: '1. Operating Systems: Processes, Threads & Memory',
        content: [
          'The OS acts as the resource orchestrator between physical hardware and application software:',
          '  - Process: An instance of an executing program with isolated address space, file descriptors, and memory.',
          '  - Thread: Light-weight unit of execution sharing memory space within a parent process. Faster context switching.',
          '  - CPU Scheduling: Round Robin (time slicing), Shortest Job First (SJF), Multi-Level Feedback Queues.',
          '  - Deadlock Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait (Coffman Conditions).',
          '  - Virtual Memory: Divides memory into fixed-size Pages. Translation Lookaside Buffer (TLB) speeds virtual-to-physical address mapping.'
        ],
        codeTitle: 'Thread Synchronization: Mutex vs Semaphore (C / POSIX)',
        codeLines: [
          '#include <pthread.h>',
          'pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;',
          'int counter = 0;',
          '',
          'void* safe_increment(void* arg) {',
          '    pthread_mutex_lock(&lock);',
          '    counter++; // Critical Section protected against race condition',
          '    pthread_mutex_unlock(&lock);',
          '    return NULL;',
          '}'
        ],
        tips: [
          'Race Condition: Occurs when multiple threads access shared data concurrently and output depends on timing.',
          'Thrashing: Occurs when the OS spends more time swapping pages between disk and RAM than executing instructions.'
        ]
      },
      {
        section: '2. Computer Networks: OSI, TCP/IP & Protocols',
        content: [
          'Computer networking enables reliable data exchange across heterogeneous systems worldwide:',
          '  - OSI 7-Layer Model: Physical, Data Link, Network (IP), Transport (TCP/UDP), Session, Presentation, Application (HTTP/DNS).',
          '  - TCP vs UDP: TCP provides reliable, ordered, error-checked byte streams (3-way handshake). UDP provides low-latency datagrams without ACKs (streaming, gaming).',
          '  - DNS Resolution: Hierarchical distributed database mapping hostnames to IP addresses using recursive and authoritative nameservers.'
        ],
        codeTitle: 'Basic Socket Communication Model (Node.js)',
        codeLines: [
          'const net = require("net");',
          '',
          'const server = net.createServer((socket) => {',
          '  socket.write("HTTP/1.1 200 OK\\r\\nContent-Length: 5\\r\\n\\r\\nHello");',
          '  socket.on("data", (data) => console.log("Received:", data.toString()));',
          '});',
          'server.listen(8080, () => console.log("Server listening on port 8080"));'
        ],
        tips: [
          'Network Subnetting: CIDR notation /24 denotes a 24-bit network mask leaving 8 bits (256 - 2 = 254) for assignable host IPs.',
          'TCP Flow vs Congestion Control: Flow control protects the receiving socket buffer. Congestion control protects intermediate network routers.'
        ]
      }
    ]
  },
  {
    filename: 'docker-devops-guide.pdf',
    title: 'Docker & Cloud DevOps Production Guide',
    subtitle: 'Microservice Containerization, Multi-Stage Builds, Compose Orchestration & CI/CD Workflows',
    category: 'Cloud & DevOps',
    version: '2026 Edition',
    pages: [
      {
        section: '1. Containerization Architecture & Dockerfiles',
        content: [
          'Docker packages applications and runtime dependencies into isolated, reproducible container images:',
          '  - Containers vs VMs: Containers share the host Linux kernel (cgroups & namespaces) for instant startup and negligible memory overhead.',
          '  - Docker Image Layers: Each instruction (FROM, COPY, RUN) creates an immutable, cached filesystem layer.',
          '  - Multi-Stage Builds: Separate build environment from runtime artifacts to produce tiny, secure production images (Alpine/Distroless).'
        ],
        codeTitle: 'Production Multi-Stage Dockerfile (Node.js / Next.js)',
        codeLines: [
          '# Stage 1: Dependency Installation',
          'FROM node:20-alpine AS deps',
          'WORKDIR /app',
          'COPY package.json package-lock.json ./',
          'RUN npm ci --only=production',
          '',
          '# Stage 2: Final Production Runtime',
          'FROM gcr.io/distroless/nodejs20-debian12 AS runner',
          'WORKDIR /app',
          'COPY --from=deps /app/node_modules ./node_modules',
          'COPY . .',
          'USER nonroot',
          'EXPOSE 3000',
          'CMD ["server.js"]'
        ],
        tips: [
          'Security Rule: Never run containers as root user. Specify USER nonroot or USER 1001 in production Dockerfiles.',
          '.dockerignore: Always exclude node_modules, .git, and .env files to preserve fast build cache.'
        ]
      },
      {
        section: '2. Docker Compose & CI/CD Pipelines',
        content: [
          'Multi-container applications require orchestrating databases, caches, and API services with shared networks and volumes:',
          '  - Docker Compose: Declarative YAML specification defining service dependencies, environment variables, healthchecks, and volume mounts.',
          '  - Volumes vs Bind Mounts: Volumes are managed by Docker storage driver for persistent data. Bind mounts mount host directories directly.',
          '  - CI/CD Automation: GitHub Actions workflows automate linting, unit testing, Docker image building, and pushing to container registries.'
        ],
        codeTitle: 'Multi-Service docker-compose.yml Specification',
        codeLines: [
          'version: "3.8"',
          'services:',
          '  web:',
          '    build: .',
          '    ports: ["3000:3000"]',
          '    environment:',
          '      - DATABASE_URL=postgres://user:pass@db:5432/appdb',
          '    depends_on: ["db"]',
          '  db:',
          '    image: postgres:16-alpine',
          '    volumes: ["pgdata:/var/lib/postgresql/data"]',
          'volumes:',
          '  pgdata:'
        ],
        tips: [
          'Compose Healthchecks: Use condition: service_healthy on dependent containers so web services wait for database readiness.',
          'Infrastructure as Code: Treat Dockerfiles, Compose files, and CI workflows as version-controlled code.'
        ]
      }
    ]
  }
];

async function generateAllPdfs() {
  const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Generating ${PDF_DEFINITIONS.length} high-quality study PDFs...`);

  for (const def of PDF_DEFINITIONS) {
    const doc = await PDFDocument.create();
    const helvetica = await doc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
    const courier = await doc.embedFont(StandardFonts.Courier);
    const courierBold = await doc.embedFont(StandardFonts.CourierBold);

    const totalPages = def.pages.length;

    for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
      const pageData = def.pages[pageIdx];
      const page = doc.addPage([595.28, 841.89]); // A4 dimensions
      const { width, height } = page.getSize();

      // Top Gold & Deep Space Banner
      page.drawRectangle({
        x: 0,
        y: height - 85,
        width: width,
        height: 85,
        color: rgb(0.02, 0.01, 0.06), // #04020F
      });

      // Gold Accent stripe
      page.drawRectangle({
        x: 0,
        y: height - 88,
        width: width,
        height: 3,
        color: rgb(0.96, 0.62, 0.05), // #F59E0B Gold
      });

      // Brand Header in Banner
      page.drawText('SLRJ DIGITAL', {
        x: 40,
        y: height - 36,
        size: 16,
        font: helveticaBold,
        color: rgb(1, 1, 1),
      });

      page.drawText('•  LEARNING PLATFORM & ENGINEERING NOTES', {
        x: 155,
        y: height - 35,
        size: 9,
        font: helveticaBold,
        color: rgb(0.96, 0.62, 0.05),
      });

      page.drawText('THINK. BUILD. GROW.  •  https://slrjdigital.in', {
        x: 40,
        y: height - 54,
        size: 8,
        font: helvetica,
        color: rgb(0.7, 0.7, 0.8),
      });

      page.drawText(`Category: ${def.category.toUpperCase()} | ${def.version}`, {
        x: width - 230,
        y: height - 54,
        size: 8,
        font: helveticaBold,
        color: rgb(0.6, 0.8, 1),
      });

      let currentY = height - 120;

      // Guide Title
      if (pageIdx === 0) {
        page.drawText(def.title, {
          x: 40,
          y: currentY,
          size: 18,
          font: helveticaBold,
          color: rgb(0.08, 0.08, 0.15),
        });
        currentY -= 18;

        page.drawText(def.subtitle, {
          x: 40,
          y: currentY,
          size: 9.5,
          font: helvetica,
          color: rgb(0.35, 0.35, 0.45),
        });
        currentY -= 30;
      }

      // Section Heading
      page.drawRectangle({
        x: 40,
        y: currentY - 4,
        width: 4,
        height: 18,
        color: rgb(0.96, 0.62, 0.05),
      });

      page.drawText(pageData.section, {
        x: 52,
        y: currentY,
        size: 13,
        font: helveticaBold,
        color: rgb(0.08, 0.08, 0.15),
      });
      currentY -= 22;

      // Content Lines
      for (const line of pageData.content) {
        if (line === '') {
          currentY -= 8;
          continue;
        }
        const isBullet = line.startsWith('  -') || line.startsWith('  1.') || line.startsWith('  2.') || line.startsWith('  3.') || line.startsWith('  4.') || line.startsWith('  5.');
        page.drawText(line, {
          x: isBullet ? 48 : 40,
          y: currentY,
          size: 9,
          font: isBullet ? helveticaBold : helvetica,
          color: rgb(0.15, 0.15, 0.2),
          maxWidth: width - 80,
        });
        currentY -= 13;
      }
      currentY -= 10;

      // Code Snippet Box
      if (pageData.codeLines && pageData.codeLines.length > 0) {
        const boxHeight = pageData.codeLines.length * 12 + 30;
        
        // Code box background
        page.drawRectangle({
          x: 40,
          y: currentY - boxHeight + 15,
          width: width - 80,
          height: boxHeight,
          color: rgb(0.05, 0.05, 0.1), // Dark Navy/Black
        });

        // Top bar for code box
        page.drawRectangle({
          x: 40,
          y: currentY - 8,
          width: width - 80,
          height: 23,
          color: rgb(0.1, 0.1, 0.18),
        });

        // Three window control dots
        page.drawCircle({ x: 55, y: currentY + 3.5, size: 3.5, color: rgb(0.95, 0.3, 0.3) });
        page.drawCircle({ x: 67, y: currentY + 3.5, size: 3.5, color: rgb(0.95, 0.75, 0.2) });
        page.drawCircle({ x: 79, y: currentY + 3.5, size: 3.5, color: rgb(0.2, 0.8, 0.4) });

        page.drawText(pageData.codeTitle || 'Code Example', {
          x: 95,
          y: currentY,
          size: 8.5,
          font: courierBold,
          color: rgb(0.8, 0.85, 0.95),
        });

        let codeY = currentY - 24;
        for (const cLine of pageData.codeLines) {
          page.drawText(cLine, {
            x: 52,
            y: codeY,
            size: 8,
            font: courier,
            color: cLine.startsWith('//') || cLine.startsWith('#') ? rgb(0.45, 0.65, 0.5) : rgb(0.2, 0.85, 0.9),
          });
          codeY -= 12;
        }
        currentY = currentY - boxHeight - 8;
      }

      // Pro Tips / Callouts
      if (pageData.tips && pageData.tips.length > 0) {
        for (const tip of pageData.tips) {
          const isWarning = tip.startsWith('Avoid:') || tip.startsWith('Bug Warning:') || tip.startsWith('Safety Rule:');
          
          page.drawRectangle({
            x: 40,
            y: currentY - 14,
            width: width - 80,
            height: 24,
            color: isWarning ? rgb(0.99, 0.94, 0.94) : rgb(0.98, 0.96, 0.9), // Light amber or red
          });

          page.drawRectangle({
            x: 40,
            y: currentY - 14,
            width: 4,
            height: 24,
            color: isWarning ? rgb(0.9, 0.2, 0.2) : rgb(0.85, 0.55, 0.05),
          });

          page.drawText(tip, {
            x: 52,
            y: currentY - 6,
            size: 8,
            font: helveticaBold,
            color: isWarning ? rgb(0.65, 0.1, 0.1) : rgb(0.45, 0.25, 0.02),
            maxWidth: width - 100,
          });

          currentY -= 30;
        }
      }

      // Bottom Footer Bar
      page.drawRectangle({
        x: 40,
        y: 42,
        width: width - 80,
        height: 1,
        color: rgb(0.85, 0.85, 0.9),
      });

      page.drawText(`Page ${pageIdx + 1} of ${totalPages}`, {
        x: 40,
        y: 28,
        size: 8,
        font: helvetica,
        color: rgb(0.5, 0.5, 0.6),
      });

      page.drawText('SLRJ Digital Educational Series • Free for Students & Aspiring Developers • https://slrjdigital.in', {
        x: 120,
        y: 28,
        size: 7.5,
        font: helvetica,
        color: rgb(0.4, 0.4, 0.5),
      });

      page.drawText('Think. Build. Grow.', {
        x: width - 125,
        y: 28,
        size: 8,
        font: helveticaBold,
        color: rgb(0.85, 0.55, 0.05),
      });
    }

    const pdfBytes = await doc.save();
    const filePath = path.join(outputDir, def.filename);
    fs.writeFileSync(filePath, pdfBytes);
    console.log(`✓ Created: ${def.filename} (${(pdfBytes.length / 1024).toFixed(1)} KB)`);
  }

  console.log('All PDF study materials generated successfully!');
}

generateAllPdfs().catch(err => {
  console.error('PDF Generation failed:', err);
  process.exit(1);
});
