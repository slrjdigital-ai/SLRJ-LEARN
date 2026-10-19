export interface ProjectStep {
  stepNumber: number;
  title: string;
  description: string;
  codeSnippet?: string;
  tip?: string;
}

export interface ProjectTask {
  id: string;
  milestoneId: string;
  title: string;
  instructions: string;
  acceptanceCriteria: string;
  estimatedMinutes: number;
  resourceIds?: string[];
  displayOrder: number;
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  displayOrder: number;
  tasks: ProjectTask[];
}

export interface ProblemStatement {
  goal: string;
  targetUsers: string;
  functionalRequirements: string[];
  nonFunctionalRequirements?: string[];
  acceptanceCriteria: string[];
  expectedResult: string;
}

export interface PracticalProject {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category:
    | "Web Development"
    | "Mobile App Development"
    | "AI & Machine Learning"
    | "Data Analytics"
    | "UI/UX Design"
    | "Cybersecurity"
    | "Backend Development"
    | "Full-Stack Development"
    | "Frontend"
    | "Full-Stack"
    | "AI & APIs"
    | "Productivity"
    | string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  estimatedEffortMinutes: number;
  xpReward: number;
  skillsRequired: string[];
  tools: string[];
  prerequisites: string[];
  learningObjectives: string[];
  deliverables: string[];
  description: string;
  problemStatement: ProblemStatement;
  features: string[];
  roadmapIds: string[];
  roadmapStageIds?: (number | string)[];
  relatedCourseIds?: string[];
  starterTemplateId?: "web" | "python" | "react" | "sql" | "none";
  starterFiles: {
    filename: string;
    language: string;
    content: string;
  }[];
  milestones: ProjectMilestone[];
  steps: ProjectStep[];
  demoOutputPreview: string;
  sampleGithubUrl: string;
  isPublished?: boolean;
}

export const PRACTICAL_PROJECTS: PracticalProject[] = [
  // ── 1. FRONTEND DEVELOPER ──
  {
    id: "proj-portfolio",
    slug: "responsive-personal-portfolio",
    title: "Responsive Personal Portfolio",
    tagline: "Build a high-performance personal developer portfolio with dark mode, responsive grid, and accessible contact form.",
    category: "Web Development",
    difficulty: "Beginner",
    estimatedTime: "4 Hours",
    estimatedEffortMinutes: 240,
    xpReward: 350,
    skillsRequired: ["HTML5 Semantics", "CSS3 Flexbox & Grid", "Responsive Design", "JavaScript DOM", "Accessibility (a11y)"],
    tools: ["VS Code", "Chrome DevTools", "Git & GitHub", "Vercel"],
    prerequisites: ["Basic HTML & CSS knowledge"],
    learningObjectives: [
      "Structure semantic, SEO-friendly HTML5 pages",
      "Implement responsive mobile-first layouts with Flexbox and CSS Grid",
      "Build dynamic theme toggling (Dark/Light) using JavaScript",
      "Deploy a live production portfolio to Vercel or GitHub Pages"
    ],
    deliverables: ["Responsive source code repository", "Working contact form", "Live deployed URL", "Lighthouse audit score >= 90"],
    description: "Create an impressive developer portfolio to showcase your learning journey, live projects, GitHub links, and skills to potential employers and clients.",
    problemStatement: {
      goal: "Design and build a fast, accessible personal developer portfolio website that adapts gracefully to mobile, tablet, and desktop viewports.",
      targetUsers: "Recruiters, engineering managers, and freelance clients looking for proof of frontend coding skills.",
      functionalRequirements: [
        "Hero section with headline, bio, and resume download action",
        "Projects section with interactive cards, tech stack pills, and live demo links",
        "Skills section grouped by category",
        "Validated contact form with feedback alert",
        "Dark mode toggle with localStorage persistence"
      ],
      nonFunctionalRequirements: ["Lighthouse performance > 90", "WCAG 2.1 AA accessible contrast"],
      acceptanceCriteria: [
        "All links are functional and navigate correctly",
        "Page does not overflow horizontally on screen widths >= 320px",
        "Form validates email format before submit"
      ],
      expectedResult: "A clean, live personal website ready to share on resumes and LinkedIn."
    },
    features: [
      "Responsive hero section with personal bio and resume download",
      "Interactive project grid with hover effects and external links",
      "Skills showcase with categorized badges",
      "Validated contact form with success feedback notification"
    ],
    roadmapIds: ["frontend", "fullstack"],
    roadmapStageIds: [1, 2, 8],
    relatedCourseIds: ["web-development-foundations", "modern-javascript-typescript"],
    starterTemplateId: "web",
    starterFiles: [
      {
        filename: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Portfolio | SLRJ Learn</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar">
    <div class="logo">Kouluri Shahid</div>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button id="theme-btn" class="btn-theme">Toggle Dark Mode</button>
  </nav>

  <header class="hero">
    <h1>Building Fast, Scalable Web Applications</h1>
    <p>Software Engineering Student & Frontend Developer</p>
    <a href="#projects" class="btn-primary">View My Work</a>
  </header>
  <script src="script.js"></script>
</body>
</html>`
      },
      {
        filename: "style.css",
        language: "css",
        content: `:root {
  --bg-dark: #0f172a;
  --surface: #1e293b;
  --text-primary: #f8fafc;
  --accent: #38bdf8;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--bg-dark);
  color: var(--text-primary);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  background: var(--surface);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.nav-links a {
  color: #94a3b8;
  text-decoration: none;
}

.nav-links a:hover {
  color: var(--accent);
}

.hero {
  text-align: center;
  padding: 6rem 1.5rem;
}

.btn-primary {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.75rem;
  background: var(--accent);
  color: #000;
  text-decoration: none;
  font-weight: bold;
  border-radius: 0.5rem;
}`
      },
      {
        filename: "script.js",
        language: "javascript",
        content: `document.getElementById('theme-btn')?.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  console.log("Theme toggled!");
});`
      }
    ],
    milestones: [
      {
        id: "m1-planning",
        projectId: "proj-portfolio",
        title: "Milestone 1: Structure & Planning",
        description: "Organize layout wireframes and author semantic HTML5 document skeleton.",
        displayOrder: 1,
        tasks: [
          {
            id: "t1-1",
            milestoneId: "m1-planning",
            title: "Draft wireframe and determine sections",
            instructions: "Sketch the portfolio layout including Navbar, Hero, About, Projects Grid, and Contact.",
            acceptanceCriteria: "Clear layout plan with all 5 core sections documented.",
            estimatedMinutes: 30,
            displayOrder: 1
          },
          {
            id: "t1-2",
            milestoneId: "m1-planning",
            title: "Write semantic HTML5 tags",
            instructions: "Use header, nav, main, section, article, and footer tags with proper heading hierarchy.",
            acceptanceCriteria: "Valid semantic HTML structure with zero validation errors.",
            estimatedMinutes: 45,
            displayOrder: 2
          }
        ]
      },
      {
        id: "m2-implementation",
        projectId: "proj-portfolio",
        title: "Milestone 2: Styling & Responsive Grid",
        description: "Apply CSS styles, Flexbox navigation, and responsive CSS Grid for project cards.",
        displayOrder: 2,
        tasks: [
          {
            id: "t2-1",
            milestoneId: "m2-implementation",
            title: "Style navigation and hero with Flexbox",
            instructions: "Create a modern sticky navigation bar and centered hero container.",
            acceptanceCriteria: "Navbar aligns cleanly and collapses on mobile.",
            estimatedMinutes: 60,
            displayOrder: 1
          },
          {
            id: "t2-2",
            milestoneId: "m2-implementation",
            title: "Implement responsive CSS Grid",
            instructions: "Create a 3-column project card grid that shifts to 2 columns on tablet and 1 column on mobile.",
            acceptanceCriteria: "Cards resize fluidly without horizontal scrollbars.",
            estimatedMinutes: 60,
            displayOrder: 2
          }
        ]
      },
      {
        id: "m3-testing",
        projectId: "proj-portfolio",
        title: "Milestone 3: Interactivity & Testing",
        description: "Add JavaScript for theme toggling, form validation, and Lighthouse testing.",
        displayOrder: 3,
        tasks: [
          {
            id: "t3-1",
            milestoneId: "m3-testing",
            title: "Implement dark/light mode toggle",
            instructions: "Use JavaScript to toggle a CSS class and persist preference in localStorage.",
            acceptanceCriteria: "Theme preference persists across browser refreshes.",
            estimatedMinutes: 45,
            displayOrder: 1
          }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Structure Semantic HTML", description: "Author semantic header, nav, section, and footer elements." },
      { stepNumber: 2, title: "Apply CSS Grid & Media Queries", description: "Create responsive mobile-first card layouts." },
      { stepNumber: 3, title: "Add Interactivity & Deploy", description: "Add theme toggle, validate contact form, and deploy to Vercel." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-fe-todo",
    slug: "interactive-todo-application",
    title: "Interactive To-Do Application",
    tagline: "Build a feature-rich task manager with local storage, drag-and-drop filtering, and keyboard navigation.",
    category: "Web Development",
    difficulty: "Beginner",
    estimatedTime: "3.5 Hours",
    estimatedEffortMinutes: 210,
    xpReward: 300,
    skillsRequired: ["JavaScript ES6+", "DOM Manipulation", "Web Storage API", "Event Delegation", "CSS Animations"],
    tools: ["VS Code", "Browser Developer Tools"],
    prerequisites: ["JavaScript fundamentals (arrays, objects, functions)"],
    learningObjectives: [
      "Manage client-side state using JavaScript arrays and objects",
      "Persist task collections with the browser localStorage API",
      "Implement event delegation for dynamic list rendering",
      "Add filter views for Active, Completed, and All tasks"
    ],
    deliverables: ["Interactive web application", "Live demo link", "Zero memory leak code"],
    description: "Construct an interactive task manager enabling users to create, complete, edit, filter, and delete tasks with instant persistence in browser storage.",
    problemStatement: {
      goal: "Develop an offline-capable task management web application that helps learners organize their daily coding goals.",
      targetUsers: "Students and knowledge workers looking for a lightweight, instant-loading task manager.",
      functionalRequirements: [
        "Add task with title and priority tag",
        "Mark task complete/incomplete with strikethrough animation",
        "Filter tasks by All, Active, and Completed",
        "Persist all updates immediately in localStorage",
        "Clear all completed tasks with one click"
      ],
      acceptanceCriteria: ["Page retains all tasks after browser reload", "Empty inputs are prevented"],
      expectedResult: "A robust browser task manager."
    },
    features: ["Add, edit, and delete tasks", "Filter by status", "localStorage persistence", "Counter of pending tasks"],
    roadmapIds: ["frontend", "fullstack"],
    roadmapStageIds: [3, 4],
    relatedCourseIds: ["modern-javascript-typescript"],
    starterTemplateId: "web",
    starterFiles: [
      {
        filename: "index.html",
        language: "html",
        content: `<div id="app" class="todo-app">
  <h1>My Tasks</h1>
  <form id="todo-form">
    <input type="text" id="todo-input" placeholder="What needs to be done?" required />
    <button type="submit">Add</button>
  </form>
  <ul id="todo-list"></ul>
  <div class="footer">
    <span id="items-left">0 items left</span>
    <div class="filters">
      <button class="active" data-filter="all">All</button>
      <button data-filter="active">Active</button>
      <button data-filter="completed">Completed</button>
    </div>
  </div>
</div>`
      },
      {
        filename: "style.css",
        language: "css",
        content: `.todo-app { max-width: 500px; margin: 3rem auto; padding: 2rem; background: #fff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); font-family: sans-serif; }
.todo-app h1 { color: #1e293b; margin-top: 0; }
#todo-form { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
#todo-input { flex: 1; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 8px; }
#todo-list { list-style: none; padding: 0; margin: 0 0 1.5rem 0; }
.footer { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: #64748b; }`
      },
      {
        filename: "script.js",
        language: "javascript",
        content: `let todos = JSON.parse(localStorage.getItem('todos') || '[]');
console.log('To-Do App initialized with', todos.length, 'tasks');`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-fe-todo",
        title: "Milestone 1: State & DOM Rendering",
        description: "Initialize task array, render list items, and attach submission handlers.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Render initial todos", instructions: "Write a render function that loops over tasks and injects list items.", acceptanceCriteria: "Array items display properly on page load.", estimatedMinutes: 45, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Initialize Data Model", description: "Design task objects and localStorage helper functions." },
      { stepNumber: 2, title: "Render & Event Delegation", description: "Add dynamic list rendering and toggle handlers." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-weather",
    slug: "weather-forecast-dashboard",
    title: "Weather Forecast Dashboard",
    tagline: "Fetch and display real-time global weather conditions, 5-day forecasts, and temperature graphs using REST APIs.",
    category: "Web Development",
    difficulty: "Beginner",
    estimatedTime: "4.5 Hours",
    estimatedEffortMinutes: 270,
    xpReward: 380,
    skillsRequired: ["Fetch API", "Async/Await", "JSON Parsing", "Error Handling", "CSS Grid"],
    tools: ["OpenWeather API", "VS Code", "Browser DevTools"],
    prerequisites: ["JavaScript promises and async/await"],
    learningObjectives: [
      "Fetch live JSON payloads from 3rd-party REST APIs",
      "Gracefully handle loading states and network HTTP errors",
      "Display dynamic weather icons and format temperature readings",
      "Implement city search with debounced autocomplete"
    ],
    deliverables: ["Live web app fetching OpenWeather API", "Repository with clean README", "Handling for 404 city not found"],
    description: "Build an interactive weather application that allows users to search any city worldwide and receive current weather conditions, humidity, wind speeds, and a 5-day outlook.",
    problemStatement: {
      goal: "Create a responsive weather dashboard that connects to a public weather API, caches recent queries, and provides real-time meteorological forecasts.",
      targetUsers: "Everyday users needing accurate, localized weather data on mobile or desktop.",
      functionalRequirements: [
        "Search city by name",
        "Display current temperature, humidity, wind speed, and conditions",
        "Render 5-day forecast cards",
        "Handle invalid city names with user-friendly error banners"
      ],
      acceptanceCriteria: ["Valid API key configuration", "Proper HTTP status error handling"],
      expectedResult: "A live, dynamic forecast application."
    },
    features: ["Live city search", "5-day forecast cards", "Metric/Imperial toggle", "Cached recent cities"],
    roadmapIds: ["frontend", "fullstack"],
    roadmapStageIds: [3, 4],
    relatedCourseIds: ["modern-javascript-typescript"],
    starterTemplateId: "web",
    starterFiles: [
      {
        filename: "index.html",
        language: "html",
        content: `<div class="weather-box">
  <h2>Global Weather</h2>
  <div class="search-bar">
    <input type="text" id="city-input" placeholder="Enter city (e.g., London, Tokyo)" />
    <button id="search-btn">Search</button>
  </div>
  <div id="weather-card" class="weather-card">
    <h3 id="city-name">Search a city to begin</h3>
    <div id="temp" class="temp">--°C</div>
    <div id="condition" class="condition">--</div>
  </div>
</div>`
      },
      {
        filename: "style.css",
        language: "css",
        content: `.weather-box { max-width: 500px; margin: 2rem auto; font-family: sans-serif; text-align: center; }
.search-bar { display: flex; gap: 0.5rem; margin-bottom: 2rem; }
.search-bar input { flex: 1; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 8px; }
.weather-card { padding: 2rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; }
.temp { font-size: 3rem; font-weight: bold; color: #1e293b; }`
      },
      {
        filename: "script.js",
        language: "javascript",
        content: `async function fetchWeather(city) {
  console.log("Fetching weather for:", city);
}`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-weather",
        title: "Milestone 1: Connect API & Display Data",
        description: "Configure API credentials and parse response objects.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Implement fetch call", instructions: "Use fetch with async/await to call the weather API.", acceptanceCriteria: "Returns 200 OK and logs JSON data.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Register API Key & Setup UI", description: "Obtain free API credentials and build search layout." },
      { stepNumber: 2, title: "Execute Fetch & Handle Errors", description: "Connect search submit to API and render forecast metrics." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-fe-landing",
    slug: "product-landing-page",
    title: "Product Landing Page",
    tagline: "Engineer a high-converting SaaS product landing page with interactive pricing tiers, feature tabs, and customer testimonials.",
    category: "Web Development",
    difficulty: "Beginner",
    estimatedTime: "4 Hours",
    estimatedEffortMinutes: 240,
    xpReward: 320,
    skillsRequired: ["HTML5", "Modern CSS", "Micro-Interactions", "Responsive Design", "Conversion Rate Optimization"],
    tools: ["VS Code", "Figma", "Tailwind CSS or Vanilla CSS"],
    prerequisites: ["HTML & CSS foundations"],
    learningObjectives: [
      "Craft modern hero sections with compelling CTA buttons",
      "Build interactive pricing toggle (Monthly vs Annual with discount)",
      "Create accessible testimonial slider and FAQ accordion",
      "Optimize page load performance for high conversion"
    ],
    deliverables: ["Landing page source code", "Interactive pricing switch", "Live deployment"],
    description: "Build a modern, conversion-focused product marketing page with compelling visual hierarchy, interactive pricing toggle, features tabs, and customer reviews.",
    problemStatement: {
      goal: "Create a responsive marketing landing page that guides prospective customers through problem explanation, key features, pricing, and sign-up.",
      targetUsers: "Prospective customers evaluating software products on desktop and mobile.",
      functionalRequirements: [
        "Sticky navigation bar with jump links",
        "Hero section with conversion CTA",
        "Feature showcase with interactive tabs",
        "Monthly/Annual pricing toggle calculation",
        "FAQ accordion"
      ],
      acceptanceCriteria: ["All jump links scroll smoothly", "Pricing updates dynamically when toggled"],
      expectedResult: "A sleek marketing page."
    },
    features: ["Hero with video/product demo", "Pricing switch", "FAQ accordion", "Mobile navigation drawer"],
    roadmapIds: ["frontend"],
    roadmapStageIds: [2, 4],
    relatedCourseIds: ["web-development-foundations"],
    starterTemplateId: "web",
    starterFiles: [
      {
        filename: "index.html",
        language: "html",
        content: `<header class="hero">
  <h1>Next-Gen Cloud Workflow</h1>
  <p>Ship faster with automated code reviews and instant deployments.</p>
  <button class="btn-cta">Start Free Trial</button>
</header>`
      },
      {
        filename: "style.css",
        language: "css",
        content: `.hero { text-align: center; padding: 5rem 1rem; font-family: sans-serif; }
.btn-cta { padding: 1rem 2rem; background: #0284c7; color: #fff; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-fe-landing",
        title: "Milestone 1: Hero & Features Layout",
        description: "Build semantic sections and responsive layout grid.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Build hero and features", instructions: "Design hero container with CTA buttons.", acceptanceCriteria: "Hero displays cleanly across viewports.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Wireframe & Markup", description: "Structure sections for Hero, Features, Pricing, and FAQs." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },

  // ── 2. BACKEND DEVELOPER ──
  {
    id: "proj-be-task-api",
    slug: "rest-api-task-manager",
    title: "REST API for a Task Manager",
    tagline: "Build a scalable RESTful backend service with Node.js/Express, CRUD route handlers, input validation, and PostgreSQL.",
    category: "Backend Development",
    difficulty: "Intermediate",
    estimatedTime: "5 Hours",
    estimatedEffortMinutes: 300,
    xpReward: 420,
    skillsRequired: ["Node.js / Express", "RESTful Architecture", "CRUD Operations", "Input Validation (Zod/Joi)", "SQL Database"],
    tools: ["Node.js", "Express", "PostgreSQL / SQLite", "Postman / Thunder Client"],
    prerequisites: ["JavaScript fundamentals and basic terminal commands"],
    learningObjectives: [
      "Architect clean RESTful endpoints adhering to HTTP verb conventions",
      "Implement robust request body validation with error responses",
      "Connect routes to relational database queries with parameterized SQL",
      "Write automated API integration tests"
    ],
    deliverables: ["Express REST API service", "Postman collection / OpenAPI spec", "Database migration script"],
    description: "Design and implement a production-ready REST API for task tracking. Support pagination, filtering by status, search, and validation middleware.",
    problemStatement: {
      goal: "Provide a backend API service that handles task creation, updates, status transitions, deletion, and search with structured HTTP status codes.",
      targetUsers: "Frontend web and mobile clients requiring task management backend services.",
      functionalRequirements: [
        "GET /api/tasks with pagination and query filtering",
        "POST /api/tasks with payload validation",
        "GET /api/tasks/:id for single task lookup",
        "PATCH /api/tasks/:id for partial updates",
        "DELETE /api/tasks/:id with cascading cleanup"
      ],
      acceptanceCriteria: ["Returns proper 400, 404, 500 error responses", "SQL queries are parameterized"],
      expectedResult: "A resilient backend microservice."
    },
    features: ["Pagination support", "Strict payload schema validation", "Structured JSON error objects", "CORS & Helmet security"],
    roadmapIds: ["backend", "fullstack"],
    roadmapStageIds: [2, 5],
    relatedCourseIds: ["python-programming-mastery"],
    starterTemplateId: "web",
    starterFiles: [
      {
        filename: "server.js",
        language: "javascript",
        content: `const express = require('express');
const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: "Design database schema", completed: false }
];

app.get('/api/tasks', (req, res) => {
  res.json({ success: true, count: tasks.length, data: tasks });
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on port', PORT));`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-be-task-api",
        title: "Milestone 1: Endpoint Design & Validation",
        description: "Configure Express app, routes, and middleware validation.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Set up Express server", instructions: "Initialize package.json and create route handlers.", acceptanceCriteria: "Server responds to GET /api/tasks with 200 OK.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Initialize Express Project", description: "Configure router and middleware." },
      { stepNumber: 2, title: "Implement CRUD & Validation", description: "Write handlers for GET, POST, PUT, DELETE with validation." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-be-auth",
    slug: "user-authentication-service",
    title: "User Authentication Service",
    tagline: "Build a secure user authentication microservice with password hashing (bcrypt), JSON Web Tokens (JWT), and refresh tokens.",
    category: "Backend Development",
    difficulty: "Intermediate",
    estimatedTime: "5.5 Hours",
    estimatedEffortMinutes: 330,
    xpReward: 460,
    skillsRequired: ["Authentication & Authorization", "Password Hashing (bcrypt)", "JWT & Refresh Tokens", "Security Best Practices", "HTTP Cookies"],
    tools: ["Node.js / Express", "PostgreSQL / MongoDB", "Postman"],
    prerequisites: ["REST API fundamentals and Express routing"],
    learningObjectives: [
      "Hash and salt passwords before persistence",
      "Sign and verify JSON Web Tokens (JWT) for stateless authorization",
      "Implement role-based access control (RBAC) middleware",
      "Protect against common attacks (timing attacks, brute force rate limiting)"
    ],
    deliverables: ["Auth service codebase", "Postman environment testing auth tokens", "Rate limiting security middleware"],
    description: "Engineer an authentication and authorization backend service. Handle user signup, login, password hashing, JWT issue, token refresh, and protected route middleware.",
    problemStatement: {
      goal: "Implement a secure authentication subsystem that protects user credentials, generates verifiable tokens, and validates access permissions.",
      targetUsers: "Web applications requiring user identity management and role authorization.",
      functionalRequirements: [
        "POST /api/auth/register with password complexity checks",
        "POST /api/auth/login with bcrypt verification",
        "POST /api/auth/refresh to rotate expired access tokens",
        "GET /api/auth/me protected by JWT bearer middleware",
        "Rate limiter to throttle failed login attempts"
      ],
      acceptanceCriteria: ["Passwords are never stored in plain text", "Unauthorized requests return 401"],
      expectedResult: "A secure auth backend microservice."
    },
    features: ["Bcrypt password hashing", "Short-lived JWT + Refresh tokens", "Express middleware protection", "Brute-force protection"],
    roadmapIds: ["backend", "fullstack", "cybersecurity"],
    roadmapStageIds: [3, 4],
    relatedCourseIds: ["modern-javascript-typescript"],
    starterTemplateId: "web",
    starterFiles: [
      {
        filename: "auth.js",
        language: "javascript",
        content: `// Authentication Middleware & Token Verification
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'secret_key', (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
}`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-be-auth",
        title: "Milestone 1: Password Security & Token Issuance",
        description: "Implement bcrypt hashing and JWT generation.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Hash passwords with bcrypt", instructions: "Salt and hash passwords before saving.", acceptanceCriteria: "Hashes stored with minimum 10 rounds.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Setup Database & Model", description: "Design user schema with hashed password column." },
      { stepNumber: 2, title: "Register & Login Handlers", description: "Generate JWTs and set HTTP-only cookies." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-be-blog-api",
    slug: "database-driven-blog-api",
    title: "Database-Driven Blog API",
    tagline: "Architect a relational database backend with PostgreSQL, Prisma/TypeORM, full-text search, and tagging.",
    category: "Backend Development",
    difficulty: "Intermediate",
    estimatedTime: "6 Hours",
    estimatedEffortMinutes: 360,
    xpReward: 480,
    skillsRequired: ["PostgreSQL / SQL", "Database Modeling", "ORM / Query Builders", "Relational Joins", "Full-Text Search"],
    tools: ["PostgreSQL", "Prisma ORM", "Node.js", "Docker"],
    prerequisites: ["SQL query basics and REST APIs"],
    learningObjectives: [
      "Design 1-to-many and many-to-many relational schemas",
      "Execute database migrations safely",
      "Optimize query performance with indexes",
      "Implement post tagging and author relationships"
    ],
    deliverables: ["SQL Schema migration file", "REST API with relational queries", "Full-text search endpoint"],
    description: "Design a complete database-backed content API. Model users, articles, categories, comments, and tags with relational constraints.",
    problemStatement: {
      goal: "Build a database service capable of handling publishing workflows, comment threads, and categorization with optimized queries.",
      targetUsers: "Content management systems, mobile reading apps, and publishing portals.",
      functionalRequirements: [
        "Database schema with Users, Posts, Tags, and Comments",
        "Many-to-many relationship linking Posts and Tags",
        "Full-text search querying titles and markdown body content",
        "Pagination with cursor-based or offset queries"
      ],
      acceptanceCriteria: ["Zero N+1 query problems using JOINs", "Foreign key cascades handled"],
      expectedResult: "A scalable relational content API."
    },
    features: ["Relational Prisma ORM schemas", "Tagging and category filters", "Comment hierarchy", "Full-text indexing"],
    roadmapIds: ["backend", "fullstack"],
    roadmapStageIds: [5, 6],
    relatedCourseIds: ["python-programming-mastery"],
    starterTemplateId: "sql",
    starterFiles: [
      {
        filename: "schema.sql",
        language: "sql",
        content: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  author_id INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-be-blog-api",
        title: "Milestone 1: Database Schema & Migrations",
        description: "Author SQL DDL schemas and define relational integrity.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Write SQL DDL tables", instructions: "Create users, posts, and comments tables.", acceptanceCriteria: "Foreign keys validate properly.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Model Relational Schema", description: "Design tables, foreign keys, and indexes." },
      { stepNumber: 2, title: "Build Query Handlers", description: "Write JOIN queries and search endpoints." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },

  // ── 3. FULL-STACK DEVELOPER ──
  {
    id: "proj-task-manager",
    slug: "fullstack-task-manager-app",
    title: "Full-Stack Task Management Application",
    tagline: "Build a production-grade Kanban productivity application with Next.js, React 19, server actions, PostgreSQL, and drag-and-drop.",
    category: "Full-Stack Development",
    difficulty: "Intermediate",
    estimatedTime: "6.5 Hours",
    estimatedEffortMinutes: 390,
    xpReward: 520,
    skillsRequired: ["Next.js App Router", "React 19 & TypeScript", "PostgreSQL & Prisma", "Server Actions", "Tailwind CSS"],
    tools: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Vercel"],
    prerequisites: ["React components and basic backend APIs"],
    learningObjectives: [
      "Connect Next.js frontend with server actions and PostgreSQL",
      "Build drag-and-drop Kanban columns (To Do, In Progress, Done)",
      "Implement optimistic UI updates for instant interaction response",
      "Deploy full-stack web application with automated database migrations"
    ],
    deliverables: ["Full-stack repository", "Working database connection", "Deployed web application URL"],
    description: "Engineer an end-to-end task and project management application featuring column status tracking, task reordering, priority tags, and responsive layouts.",
    problemStatement: {
      goal: "Develop a full-stack task management dashboard where users can create, categorize, prioritize, and reorganize tasks across agile boards.",
      targetUsers: "Software developers and teams tracking sprint items and personal learning goals.",
      functionalRequirements: [
        "Create task cards with title, description, priority, and due date",
        "Move cards between board columns (Backlog, In Progress, Review, Completed)",
        "Search and filter cards by priority and assignee",
        "Optimistic UI updates with server synchronization",
        "Responsive layout on mobile and desktop"
      ],
      acceptanceCriteria: ["Card updates persist in database", "Drag-and-drop works seamlessly"],
      expectedResult: "A production-grade productivity SaaS app."
    },
    features: ["Kanban board columns", "Optimistic UI", "Server Actions", "PostgreSQL persistence", "Priority labels"],
    roadmapIds: ["fullstack", "frontend", "backend"],
    roadmapStageIds: [4, 5, 6, 7],
    relatedCourseIds: ["web-development-foundations", "modern-javascript-typescript"],
    starterTemplateId: "react",
    starterFiles: [
      {
        filename: "App.tsx",
        language: "javascript",
        content: `// React 19 Kanban Task Manager Component
import React, { useState } from 'react';

export default function KanbanBoard() {
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'To Do', items: ['Design UI', 'Setup DB'] },
    { id: 'in_progress', title: 'In Progress', items: ['Auth API'] },
    { id: 'done', title: 'Done', items: ['Project Planning'] }
  ]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map(col => (
        <div key={col.id} className="bg-slate-100 p-4 rounded-xl">
          <h3 className="font-bold text-slate-800 mb-3">{col.title} ({col.items.length})</h3>
          <div className="space-y-2">
            {col.items.map((item, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-task-manager",
        title: "Milestone 1: Backend Database & Server Actions",
        description: "Set up Prisma database schema and server actions for tasks.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Create Task schema", instructions: "Define Task model in schema.prisma.", acceptanceCriteria: "Prisma client compiles without error.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Database & API Setup", description: "Configure PostgreSQL and Prisma data layer." },
      { stepNumber: 2, title: "Build UI & Drag-and-Drop", description: "Render responsive Kanban columns and optimistic state." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-fs-lms",
    slug: "student-learning-management-system",
    title: "Student Learning Management System",
    tagline: "Build a mini LMS platform with course catalogs, student enrollment, lesson progress tracking, and certificates.",
    category: "Full-Stack Development",
    difficulty: "Advanced",
    estimatedTime: "8 Hours",
    estimatedEffortMinutes: 480,
    xpReward: 600,
    skillsRequired: ["Next.js", "PostgreSQL", "Auth & RBAC", "PDF Reader Integration", "State Management"],
    tools: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    prerequisites: ["Full-stack fundamentals and authentication"],
    learningObjectives: [
      "Manage course curriculum and lesson progress",
      "Track lesson completions per enrolled student",
      "Generate dynamic completion certificates with verification IDs",
      "Architect role-based views for Students and Instructors"
    ],
    deliverables: ["Full-stack LMS repository", "Course & lesson progression API", "Verifiable certificate preview"],
    description: "Build an end-to-end e-learning platform with course enrollment, PDF lesson viewing, interactive quizzes, progress meters, and certificate generation.",
    problemStatement: {
      goal: "Create a complete online learning portal where students can browse courses, read educational materials, track progress, and earn certificates.",
      targetUsers: "Online students, educators, and enterprise training teams.",
      functionalRequirements: [
        "Course catalog with category and difficulty filters",
        "Student enrollment with course progression state",
        "Interactive lesson viewer with completion checkoffs",
        "Certificate generation upon 100% completion"
      ],
      acceptanceCriteria: ["Progress updates immediately", "Certificates have verifiable IDs"],
      expectedResult: "A functional online academy."
    },
    features: ["Course catalog", "Student enrollment", "PDF viewer integration", "Dynamic certificates"],
    roadmapIds: ["fullstack"],
    roadmapStageIds: [6, 7, 8],
    relatedCourseIds: ["web-development-foundations"],
    starterTemplateId: "react",
    starterFiles: [
      {
        filename: "LMSOverview.tsx",
        language: "javascript",
        content: `export default function LMSOverview() {
  return <div>Student Learning Platform</div>;
}`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-fs-lms",
        title: "Milestone 1: Course & Student Schemas",
        description: "Design relational enrollment database schema.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Design enrollment table", instructions: "Create enrollments and completions tables.", acceptanceCriteria: "Enrollment queries run efficiently.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Database Architecture", description: "Model courses, modules, lessons, and student progress." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-expense-tracker",
    slug: "personal-finance-tracker",
    title: "Personal Finance & Expense Tracker",
    tagline: "Track income and expenses, compute monthly budget savings rates, and visualize spending distributions.",
    category: "Full-Stack Development",
    difficulty: "Intermediate",
    estimatedTime: "5 Hours",
    estimatedEffortMinutes: 300,
    xpReward: 420,
    skillsRequired: ["React", "State Management", "Chart.js / Recharts", "Budget Calculations", "Local / Cloud DB"],
    tools: ["React / Next.js", "Chart.js", "Tailwind CSS"],
    prerequisites: ["JavaScript array reduction and React state"],
    learningObjectives: [
      "Calculate cash flow totals, category breakdowns, and savings rates",
      "Render responsive donut charts and time-series spending graphs",
      "Support recurring transactions and custom expense categories",
      "Export transaction summaries to CSV"
    ],
    deliverables: ["Personal finance web app", "Interactive spending charts", "CSV export functionality"],
    description: "Build an intuitive personal finance tracker with category budgets, visual income/expense summaries, and cash flow forecasts.",
    problemStatement: {
      goal: "Help users budget finances by visualizing daily expenses against monthly limits.",
      targetUsers: "Individuals and freelancers managing income and expenditures.",
      functionalRequirements: [
        "Add transaction with amount, category, date, and description",
        "Category breakdown donut chart",
        "Monthly budget progress bar with warning alerts",
        "CSV export"
      ],
      acceptanceCriteria: ["Totals update synchronously on every addition", "Values formatted as currency"],
      expectedResult: "A clean budgeting tool."
    },
    features: ["Live balance calculation", "Interactive Chart.js breakdowns", "Category filters", "CSV export"],
    roadmapIds: ["fullstack", "mobile"],
    roadmapStageIds: [4, 6],
    relatedCourseIds: ["modern-javascript-typescript"],
    starterTemplateId: "react",
    starterFiles: [
      {
        filename: "FinanceApp.tsx",
        language: "javascript",
        content: `import React, { useState } from 'react';

export default function FinanceTracker() {
  const [balance, setBalance] = useState(2500);
  return <div>Current Balance: \${balance}</div>;
}`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-expense-tracker",
        title: "Milestone 1: Transaction State & Charting",
        description: "Set up budget model and category aggregation.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Calculate category sums", instructions: "Aggregate expenses by category tag.", acceptanceCriteria: "Category totals sum to overall total.", estimatedMinutes: 45, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Model Transaction Data", description: "Create transaction state and calculation helpers." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },

  // ── 4. MOBILE APP DEVELOPER ──
  {
    id: "proj-mob-notes",
    slug: "notes-reminders-mobile-app",
    title: "Notes & Reminders Mobile App",
    tagline: "Build a cross-platform mobile notes app with React Native / Expo, offline storage, search, and local push reminders.",
    category: "Mobile App Development",
    difficulty: "Intermediate",
    estimatedTime: "5 Hours",
    estimatedEffortMinutes: 300,
    xpReward: 440,
    skillsRequired: ["React Native", "Expo SDK", "AsyncStorage", "Mobile Navigation", "Local Notifications"],
    tools: ["React Native", "Expo", "VS Code"],
    prerequisites: ["React fundamentals and component lifecycle"],
    learningObjectives: [
      "Build native mobile user interfaces with React Native core components",
      "Persist notes locally on iOS and Android devices with AsyncStorage",
      "Implement Stack and Tab navigation using React Navigation",
      "Schedule local reminder notifications"
    ],
    deliverables: ["React Native / Expo mobile app codebase", "Offline notes storage implementation", "App preview screenshots"],
    description: "Construct a sleek, offline-first mobile notes application with rich text notes, color labels, search, and reminder notifications.",
    problemStatement: {
      goal: "Provide a distraction-free mobile notes app that works reliably offline on iOS and Android.",
      targetUsers: "Mobile users needing quick capture of notes, checklists, and timed reminders.",
      functionalRequirements: [
        "Create, edit, and pin notes with color tags",
        "Instant text search across all notes",
        "Schedule local push reminder notification",
        "Offline storage with zero cloud dependency"
      ],
      acceptanceCriteria: ["App loads in < 1 second", "Notes persist across app restarts"],
      expectedResult: "A polished cross-platform mobile app."
    },
    features: ["Offline-first storage", "Color-coded tags", "Search filter", "Push notifications"],
    roadmapIds: ["mobile"],
    roadmapStageIds: [2, 3, 4],
    relatedCourseIds: ["modern-javascript-typescript"],
    starterTemplateId: "react",
    starterFiles: [
      {
        filename: "App.js",
        language: "javascript",
        content: `// React Native / Expo Notes Component
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function NotesApp() {
  const [notes, setNotes] = useState([
    { id: '1', title: 'React Native Basics', body: 'Components, state, props' }
  ]);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f8fafc' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15 }}>My Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 15, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text style={{ color: '#64748b' }}>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-mob-notes",
        title: "Milestone 1: Navigation & Offline Store",
        description: "Configure React Navigation and AsyncStorage handlers.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Set up AsyncStorage", instructions: "Implement save and load methods for notes array.", acceptanceCriteria: "Notes survive device reload.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Setup Expo Project", description: "Initialize Expo app and configure navigation." },
      { stepNumber: 2, title: "Persist Notes & Reminders", description: "Implement AsyncStorage and local notifications." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-mob-expense",
    slug: "expense-tracker-mobile-app",
    title: "Expense Tracker Mobile App",
    tagline: "Build a cross-platform mobile budgeting application with interactive charts, camera receipt uploads, and category tracking.",
    category: "Mobile App Development",
    difficulty: "Intermediate",
    estimatedTime: "6 Hours",
    estimatedEffortMinutes: 360,
    xpReward: 480,
    skillsRequired: ["React Native", "Expo Camera / ImagePicker", "Mobile Charts", "AsyncStorage", "Touch Gestures"],
    tools: ["React Native", "Expo SDK", "VS Code"],
    prerequisites: ["React Native basics"],
    learningObjectives: [
      "Access device hardware camera and photo gallery",
      "Render touch-optimized charts on mobile screens",
      "Implement swipe-to-delete gesture interactions",
      "Structure multi-screen tabs with bottom navigation"
    ],
    deliverables: ["Mobile app bundle / repository", "Receipt capture flow", "Monthly expense summary screen"],
    description: "Design an intuitive mobile expense tracking app with camera receipt attachment, category breakdown charts, and monthly budget limits.",
    problemStatement: {
      goal: "Allow users to record expenses on the go with receipt photos, category tags, and real-time budget limits.",
      targetUsers: "Mobile users tracking personal spending on iOS and Android.",
      functionalRequirements: [
        "Quick-add transaction modal with category icons",
        "Camera integration for receipt capture",
        "Monthly breakdown pie chart",
        "Swipe-to-delete item gesture"
      ],
      acceptanceCriteria: ["Receipts display properly in transaction history", "Gesture animations are smooth"],
      expectedResult: "A production-grade mobile budgeting app."
    },
    features: ["Camera receipt capture", "Monthly spending charts", "Swipe gestures", "Offline persistence"],
    roadmapIds: ["mobile"],
    roadmapStageIds: [4, 5, 6],
    relatedCourseIds: ["modern-javascript-typescript"],
    starterTemplateId: "react",
    starterFiles: [
      {
        filename: "ExpenseScreen.js",
        language: "javascript",
        content: `// Expense Tracker Mobile Screen
import React from 'react';
import { View, Text } from 'react-native';

export default function ExpenseScreen() {
  return <View><Text>Expense Tracker Mobile</Text></View>;
}`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-mob-expense",
        title: "Milestone 1: Camera & Transaction Feed",
        description: "Integrate Expo Camera and transaction listing.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Configure Camera permissions", instructions: "Request camera permissions and save photos locally.", acceptanceCriteria: "Photos capture and attach to expense items.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Setup UI & Bottom Tabs", description: "Create Dashboard, Add, and History screens." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-mob-weather",
    slug: "weather-forecast-mobile-app",
    title: "Weather Forecast Native App",
    tagline: "Build a cross-platform mobile weather app with GPS location detection, animated weather icons, and hourly forecasts.",
    category: "Mobile App Development",
    difficulty: "Beginner",
    estimatedTime: "4 Hours",
    estimatedEffortMinutes: 240,
    xpReward: 350,
    skillsRequired: ["React Native", "Expo Location API", "REST API Integration", "Animated Icons", "Responsive Mobile Layouts"],
    tools: ["Expo", "OpenWeather API", "React Native"],
    prerequisites: ["JavaScript async/await"],
    learningObjectives: [
      "Access device geolocation via Expo Location API",
      "Fetch weather data based on current GPS coordinates",
      "Render animated weather illustrations matching conditions",
      "Create pull-to-refresh list interactions"
    ],
    deliverables: ["Working mobile app codebase", "GPS weather fetching logic", "Clean UI layout"],
    description: "Create an attractive native mobile weather app with automatic GPS coordinate detection, temperature toggle, and hourly radar forecasts.",
    problemStatement: {
      goal: "Deliver instant localized weather data directly to users on mobile based on current GPS location.",
      targetUsers: "Smartphone users checking weather forecasts on the move.",
      functionalRequirements: [
        "Detect GPS coordinates automatically",
        "Fetch localized current conditions and 24-hour forecast",
        "Pull-to-refresh to fetch updated radar data"
      ],
      acceptanceCriteria: ["Handles location permission denied gracefully", "Shows loading spinner during fetch"],
      expectedResult: "A sleek native mobile app."
    },
    features: ["GPS geolocation", "Animated weather states", "Pull-to-refresh", "Metric/Imperial toggle"],
    roadmapIds: ["mobile"],
    roadmapStageIds: [3, 4],
    relatedCourseIds: ["modern-javascript-typescript"],
    starterTemplateId: "react",
    starterFiles: [
      {
        filename: "WeatherApp.js",
        language: "javascript",
        content: `// React Native Weather App
import React from 'react';
import { View, Text } from 'react-native';

export default function MobileWeather() {
  return <View><Text>GPS Mobile Weather</Text></View>;
}`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-mob-weather",
        title: "Milestone 1: Geolocation & API Call",
        description: "Connect device GPS to weather API.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Request GPS Location", instructions: "Use Expo Location to get latitude and longitude.", acceptanceCriteria: "Returns coordinates accurately.", estimatedMinutes: 45, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Configure Geolocation", description: "Request GPS permission and fetch forecast." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },

  // ── 5. AI / MACHINE LEARNING ENGINEER ──
  {
    id: "proj-ai-eda",
    slug: "exploratory-data-analysis-project",
    title: "Exploratory Data Analysis Project",
    tagline: "Analyze real-world datasets with Python, Pandas, Matplotlib, and Seaborn to discover distributions, outliers, and correlations.",
    category: "AI & Machine Learning",
    difficulty: "Beginner",
    estimatedTime: "4 Hours",
    estimatedEffortMinutes: 240,
    xpReward: 360,
    skillsRequired: ["Python", "Pandas", "Matplotlib & Seaborn", "Statistical Summaries", "Data Cleaning"],
    tools: ["Jupyter Notebook", "Python 3.12", "Pandas", "VS Code"],
    prerequisites: ["Python syntax and basic mathematics"],
    learningObjectives: [
      "Load, inspect, and clean raw tabular datasets using Pandas",
      "Compute descriptive statistics (mean, median, variance, skewness)",
      "Identify and impute missing data and statistical outliers",
      "Generate correlation heatmaps and bivariate scatter plots"
    ],
    deliverables: ["Jupyter notebook (.ipynb)", "Cleaned dataset CSV", "Executive summary of findings"],
    description: "Conduct comprehensive exploratory data analysis on a real-world dataset. Discover underlying patterns, validate hypotheses, and communicate statistical findings.",
    problemStatement: {
      goal: "Extract actionable statistical insights from messy tabular data to guide machine learning model development.",
      targetUsers: "Data science teams, product managers, and executive decision-makers.",
      functionalRequirements: [
        "Inspect data types, null values, and duplicate rows",
        "Generate summary distributions for numeric features",
        "Plot correlation matrix heatmap",
        "Identify anomalous outliers using IQR and Z-scores"
      ],
      acceptanceCriteria: ["Notebook executes without errors", "Visualizations include clear labels and titles"],
      expectedResult: "A rigorous data analysis report."
    },
    features: ["Missing value imputation", "Correlation heatmap", "Outlier detection", "Key statistical metrics"],
    roadmapIds: ["ai-ml", "data-analyst"],
    roadmapStageIds: [2, 3],
    relatedCourseIds: ["python-programming-mastery"],
    starterTemplateId: "python",
    starterFiles: [
      {
        filename: "eda.py",
        language: "python",
        content: `import pandas as pd
import numpy as np

# Sample Data Analysis Script
data = {
    'Student_ID': range(1, 11),
    'Study_Hours': [2.5, 5.1, 3.2, 8.5, 3.5, 1.5, 9.2, 5.5, 8.3, 2.7],
    'Exam_Score': [55, 78, 62, 95, 68, 48, 98, 80, 92, 59]
}

df = pd.DataFrame(data)
print("Dataset Summary:")
print(df.describe())
print("\\nCorrelation Matrix:")
print(df.corr())`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-ai-eda",
        title: "Milestone 1: Data Ingestion & Summary",
        description: "Inspect data shapes and calculate central tendencies.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Calculate summary statistics", instructions: "Compute mean, median, std deviation with Pandas.", acceptanceCriteria: "Accurate summary table generated.", estimatedMinutes: 45, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Data Cleaning", description: "Handle nulls, duplicates, and cast types." },
      { stepNumber: 2, title: "Visualization & Insights", description: "Generate distribution plots and correlation heatmaps." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-ai-student-perf",
    slug: "student-performance-prediction-ml",
    title: "Student Performance Prediction",
    tagline: "Train and evaluate supervised regression and classification models using Scikit-Learn to predict academic success.",
    category: "AI & Machine Learning",
    difficulty: "Intermediate",
    estimatedTime: "5.5 Hours",
    estimatedEffortMinutes: 330,
    xpReward: 460,
    skillsRequired: ["Scikit-Learn", "Regression & Classification", "Feature Engineering", "Model Evaluation (RMSE, R2, F1)", "Cross-Validation"],
    tools: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
    prerequisites: ["Python fundamentals and linear algebra basics"],
    learningObjectives: [
      "Prepare training and test splits with stratified sampling",
      "Engineer predictive features and apply scaling (StandardScaler)",
      "Train Multiple Linear Regression, Random Forest, and Gradient Boosting models",
      "Evaluate performance with RMSE, MAE, and R-squared metrics"
    ],
    deliverables: ["Python model training pipeline", "Evaluated metrics report", "Saved model artifact (.pkl)"],
    description: "Build an end-to-end machine learning pipeline predicting student exam performance based on study habits, attendance, and demographics.",
    problemStatement: {
      goal: "Predict student performance early in the semester to enable timely academic intervention.",
      targetUsers: "Academic counselors, universities, and online learning platforms.",
      functionalRequirements: [
        "Feature scaling and one-hot encoding",
        "Train baseline vs advanced ensemble models",
        "Hyperparameter tuning with GridSearchCV",
        "Feature importance visualization"
      ],
      acceptanceCriteria: ["Model achieves R2 > 0.82 on test split", "No data leakage during preprocessing"],
      expectedResult: "A trained ML prediction model."
    },
    features: ["Automated pipeline", "Random Forest regression", "Feature importance chart", "Cross-validation"],
    roadmapIds: ["ai-ml"],
    roadmapStageIds: [4, 5],
    relatedCourseIds: ["python-programming-mastery"],
    starterTemplateId: "python",
    starterFiles: [
      {
        filename: "train_model.py",
        language: "python",
        content: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Synthetic Training Data
X = np.array([[2, 80], [4, 85], [6, 90], [8, 95], [10, 98]])
y = np.array([60, 70, 80, 90, 99])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

preds = model.predict(X_test)
print("Model trained. Predictions:", preds)`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-ai-student-perf",
        title: "Milestone 1: Model Training & Evaluation",
        description: "Fit regression algorithms and compute evaluation scores.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Train Regression Pipeline", instructions: "Train LinearRegression and evaluate RMSE.", acceptanceCriteria: "RMSE calculated on unseen test set.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Feature Preprocessing", description: "Scale features and split dataset." },
      { stepNumber: 2, title: "Model Training & Scoring", description: "Evaluate accuracy and save model weights." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-ai-doc-qa",
    slug: "document-question-answering-prototype",
    title: "Document Question-Answering Prototype",
    tagline: "Build a modern Retrieval-Augmented Generation (RAG) prototype using Python, vector embeddings, and LangChain.",
    category: "AI & Machine Learning",
    difficulty: "Advanced",
    estimatedTime: "7 Hours",
    estimatedEffortMinutes: 420,
    xpReward: 550,
    skillsRequired: ["Python", "Vector Embeddings", "RAG Architecture", "ChromaDB / FAISS", "Prompt Engineering"],
    tools: ["Python", "LangChain / LlamaIndex", "ChromaDB", "OpenAI / HuggingFace API"],
    prerequisites: ["Python and API request handling"],
    learningObjectives: [
      "Chunk long PDF documents into semantic text blocks",
      "Generate dense vector embeddings using embedding models",
      "Store and query embeddings in a local vector database",
      "Synthesize accurate factual answers with LLM grounding"
    ],
    deliverables: ["RAG question-answering prototype", "Document ingestion script", "Sample Q&A test queries"],
    description: "Engineer an AI-powered document research assistant that ingests PDF documents, creates semantic vector embeddings, and answers user questions with citations.",
    problemStatement: {
      goal: "Allow users to ask natural-language questions across complex PDF handbooks and receive instant, grounded answers.",
      targetUsers: "Researchers, legal teams, students, and corporate analysts reviewing lengthy documentation.",
      functionalRequirements: [
        "Ingest and chunk PDF text into 500-token windows",
        "Generate embeddings and store in ChromaDB vector store",
        "Perform similarity search on user query",
        "Prompt LLM with retrieved context for answer synthesis"
      ],
      acceptanceCriteria: ["Answers cite source page numbers", "Hallucinations prevented by strict prompt grounding"],
      expectedResult: "A functional RAG AI prototype."
    },
    features: ["Semantic chunking", "Local vector database", "Source citations", "CLI / Web Q&A interface"],
    roadmapIds: ["ai-ml"],
    roadmapStageIds: [6, 7],
    relatedCourseIds: ["python-programming-mastery"],
    starterTemplateId: "python",
    starterFiles: [
      {
        filename: "rag_pipeline.py",
        language: "python",
        content: `import numpy as np

def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

print("RAG Prototype Pipeline ready for document embedding ingestion.")`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-ai-doc-qa",
        title: "Milestone 1: Chunking & Similarity Search",
        description: "Parse documents and implement cosine similarity.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Implement document chunking", instructions: "Split text into overlapping token windows.", acceptanceCriteria: "Chunks maintain semantic context.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Document Ingestion", description: "Parse text and generate vector embeddings." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },

  // ── 6. DATA ANALYST ──
  {
    id: "proj-da-sales",
    slug: "executive-sales-analysis-dashboard",
    title: "Executive Sales Analysis Dashboard",
    tagline: "Transform multi-year retail transactions into an interactive business dashboard measuring MRR, LTV, and cohort churn.",
    category: "Data Analytics",
    difficulty: "Beginner",
    estimatedTime: "4.5 Hours",
    estimatedEffortMinutes: 270,
    xpReward: 380,
    skillsRequired: ["SQL Queries (CTEs & Joins)", "Excel / Power BI", "Cohort Analysis", "Data Storytelling", "KPI Modeling"],
    tools: ["PostgreSQL / SQL Server", "Excel / Tableau", "Power BI"],
    prerequisites: ["Basic spreadsheets and arithmetic"],
    learningObjectives: [
      "Extract and clean raw e-commerce transaction tables with SQL",
      "Compute executive metrics: Monthly Recurring Revenue, ARPU, Customer Churn",
      "Build dynamic KPI cards and interactive revenue breakdown visuals",
      "Present executive data stories with business recommendations"
    ],
    deliverables: ["SQL query script with CTEs", "Interactive Power BI / Tableau dashboard", "Executive presentation deck"],
    description: "Analyze retail sales records to uncover regional revenue trends, product performance, and customer retention metrics for C-level leadership.",
    problemStatement: {
      goal: "Consolidate fragmented retail transaction data into an automated sales intelligence dashboard.",
      targetUsers: "Chief Revenue Officers, sales leaders, and regional category managers.",
      functionalRequirements: [
        "Monthly revenue growth and average order value (AOV) metrics",
        "Top-performing product categories by margin",
        "Geographic sales heatmaps",
        "Customer retention cohorts"
      ],
      acceptanceCriteria: ["SQL queries reconcile exactly with balance sheets", "Filters update all visuals"],
      expectedResult: "An executive KPI dashboard."
    },
    features: ["Cohort retention heatmap", "Interactive date slicers", "SQL CTE aggregation", "Category margins"],
    roadmapIds: ["data-analyst"],
    roadmapStageIds: [2, 3, 5],
    relatedCourseIds: ["python-programming-mastery"],
    starterTemplateId: "sql",
    starterFiles: [
      {
        filename: "sales_kpis.sql",
        language: "sql",
        content: `-- Executive Sales KPIs
SELECT 
    DATE_TRUNC('month', order_date) AS sales_month,
    COUNT(order_id) AS total_orders,
    SUM(total_amount) AS total_revenue,
    ROUND(AVG(total_amount), 2) AS average_order_value
FROM orders
WHERE status = 'completed'
GROUP BY sales_month
ORDER BY sales_month DESC;`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-da-sales",
        title: "Milestone 1: SQL Extraction & Transformation",
        description: "Write aggregation queries for monthly sales cohorts.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Write monthly KPI query", instructions: "Aggregate revenue, orders, and average order value.", acceptanceCriteria: "Returns valid monthly rollup table.", estimatedMinutes: 45, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "SQL Data Modeling", description: "Join orders, customers, and product tables." },
      { stepNumber: 2, title: "Build Executive Dashboard", description: "Design visual layout and interactive filters." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-da-student-perf",
    slug: "student-performance-analytics-dashboard",
    title: "Student Performance Dashboard",
    tagline: "Build an interactive education analytics dashboard tracking student assessment scores, completion rates, and learning pace.",
    category: "Data Analytics",
    difficulty: "Beginner",
    estimatedTime: "4 Hours",
    estimatedEffortMinutes: 240,
    xpReward: 350,
    skillsRequired: ["SQL", "Data Cleaning", "Data Visualization", "Spreadsheets", "Descriptive Statistics"],
    tools: ["SQL", "Excel / Google Sheets", "Looker Studio"],
    prerequisites: ["Spreadsheet basics"],
    learningObjectives: [
      "Consolidate quiz and assessment logs into clean student scorecards",
      "Identify at-risk learners lagging behind target deadlines",
      "Visualize passing rates across courses and subject topics",
      "Automate periodic metric summaries"
    ],
    deliverables: ["Cleaned dataset", "Interactive education dashboard", "Insights report"],
    description: "Design an academic analytics dashboard helping course instructors identify struggling students, optimize quiz difficulty, and monitor lesson completions.",
    problemStatement: {
      goal: "Provide educators with real-time analytics to monitor cohort completion rates and pinpoint difficult curriculum modules.",
      targetUsers: "Online course instructors, university administrators, and curriculum designers.",
      functionalRequirements: [
        "Cohort pass/fail distribution curves",
        "Lesson completion drop-off funnel",
        "Filter by course topic, date range, and student level"
      ],
      acceptanceCriteria: ["Data updates dynamically on filter change", "Metrics clearly labeled with units"],
      expectedResult: "An actionable academic dashboard."
    },
    features: ["Scorecard distributions", "Drop-off funnels", "At-risk alerts", "Topic breakdowns"],
    roadmapIds: ["data-analyst"],
    roadmapStageIds: [3, 4],
    relatedCourseIds: ["python-programming-mastery"],
    starterTemplateId: "sql",
    starterFiles: [
      {
        filename: "student_kpis.sql",
        language: "sql",
        content: `SELECT 
    course_id,
    COUNT(DISTINCT student_id) AS enrolled_students,
    AVG(assessment_score) AS average_score,
    SUM(CASE WHEN passed THEN 1 ELSE 0 END)::FLOAT / COUNT(*) * 100 AS pass_rate
FROM exam_submissions
GROUP BY course_id;`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-da-student-perf",
        title: "Milestone 1: Assessment Aggregation",
        description: "Write SQL queries measuring pass rates and average scores.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Calculate pass rate", instructions: "Compute percentage of passing students per course.", acceptanceCriteria: "Returns percentage between 0 and 100.", estimatedMinutes: 45, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Aggregate Scores", description: "Compute averages and completion ratios." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-da-churn",
    slug: "customer-churn-retention-analysis",
    title: "Customer Churn & Retention Analysis",
    tagline: "Perform exploratory cohort analysis and logistic regressions to identify customer cancellation risk factors.",
    category: "Data Analytics",
    difficulty: "Intermediate",
    estimatedTime: "5.5 Hours",
    estimatedEffortMinutes: 330,
    xpReward: 450,
    skillsRequired: ["Python / SQL", "Statistical Hypothesis Testing", "Cohort Retention Analysis", "Data Storytelling", "Seaborn"],
    tools: ["Python", "Jupyter", "SQL", "Tableau"],
    prerequisites: ["SQL joins and basic statistical tests"],
    learningObjectives: [
      "Calculate monthly customer churn and survival rates",
      "Run statistical t-tests on usage differences between churned and active users",
      "Build retention cohort heatmaps tracking user lifecycles",
      "Formulate retention recommendations for customer success teams"
    ],
    deliverables: ["Cohort analysis Jupyter notebook", "Retention heatmap visualization", "Actionable retention strategy brief"],
    description: "Investigate subscription cancellation patterns. Determine the leading indicators of customer dissatisfaction and quantify churn drivers.",
    problemStatement: {
      goal: "Analyze user engagement signals preceding subscription cancellations to create proactive retention alerts.",
      targetUsers: "Subscription SaaS businesses, telecom operators, and product growth teams.",
      functionalRequirements: [
        "Calculate monthly churn percentage and Net Revenue Retention (NRR)",
        "Segment churn by customer tenure, contract tier, and ticket volume",
        "Visualize customer survival curve",
        "Document 3 actionable retention initiatives"
      ],
      acceptanceCriteria: ["Cohorts accurately tracked across 12 billing periods", "Statistical claims backed by p-values"],
      expectedResult: "A comprehensive churn analysis study."
    },
    features: ["Cohort retention heatmap", "Survival curve", "Support ticket correlation", "Executive recommendations"],
    roadmapIds: ["data-analyst"],
    roadmapStageIds: [5, 6],
    relatedCourseIds: ["python-programming-mastery"],
    starterTemplateId: "python",
    starterFiles: [
      {
        filename: "churn_analysis.py",
        language: "python",
        content: `import pandas as pd

# Load subscription customer dataset
print("Customer Churn & Cohort Analysis Engine initialized.")`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-da-churn",
        title: "Milestone 1: Cohort Table & Matrix",
        description: "Calculate retention percentages across monthly sign-up cohorts.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Build monthly cohort matrix", instructions: "Group users by signup month and count activity over 12 months.", acceptanceCriteria: "Generates NxM retention matrix.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Cohort Aggregation", description: "Compute customer survival and churn metrics." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },

  // ── 7. UI/UX DESIGNER ──
  {
    id: "proj-ux-banking",
    slug: "mobile-banking-app-redesign",
    title: "Mobile Banking App Redesign",
    tagline: "Redesign an outdated fintech mobile application with user research, persona creation, wireframing, and Figma prototypes.",
    category: "UI/UX Design",
    difficulty: "Intermediate",
    estimatedTime: "5.5 Hours",
    estimatedEffortMinutes: 330,
    xpReward: 450,
    skillsRequired: ["User Research", "Wireframing", "Figma High-Fidelity Prototyping", "Design Systems", "Usability Testing"],
    tools: ["Figma", "FigJam", "Miro", "Notion"],
    prerequisites: ["Visual design principles and Figma fundamentals"],
    learningObjectives: [
      "Conduct user interviews and identify pain points in money transfer flows",
      "Build low-fidelity wireframe user flows addressing cognitive friction",
      "Develop a cohesive design token system (Colors, Typography, Spacing)",
      "Create high-fidelity interactive Figma prototypes with micro-interactions"
    ],
    deliverables: ["Figma prototype link", "Complete UX Case Study article", "Usability testing report"],
    description: "Execute an end-to-end UX case study redesigning a mobile banking app. Simplify the money transfer flow, improve accessibility, and modernize visual aesthetics.",
    problemStatement: {
      goal: "Redesign a complex mobile banking experience to reduce money transfer errors and increase user confidence.",
      targetUsers: "Everyday banking customers sending peer-to-peer transfers and bill payments.",
      functionalRequirements: [
        "Frictionless 3-step money transfer flow",
        "Account balance security privacy mask toggle",
        "Recent payees carousel and search",
        "Dark mode fintech palette with accessible contrast"
      ],
      acceptanceCriteria: ["WCAG 2.1 AA color contrast compliance", "Clickable prototype with animated screen transitions"],
      expectedResult: "A professional Figma UX case study."
    },
    features: ["Interactive Figma prototype", "Design token library", "Wireframes and persona maps", "Usability test insights"],
    roadmapIds: ["ui-ux"],
    roadmapStageIds: [2, 3, 4, 7],
    relatedCourseIds: ["web-development-foundations"],
    starterTemplateId: "none",
    starterFiles: [
      {
        filename: "case-study-outline.md",
        language: "markdown",
        content: `# Mobile Banking UX Case Study
## 1. Problem Statement
Users report high anxiety during peer-to-peer transfers due to cramped confirmation modals.

## 2. Research & Personas
- Persona 1: Maya (Busy professional, 28)
- Persona 2: Robert (Senior citizen, 62)

## 3. Wireframes & Iterations
Low-fidelity sketches and paper prototypes testing thumb zone accessibility.

## 4. Final Prototype
Interactive Figma prototype with 3-step confirmation.`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-ux-banking",
        title: "Milestone 1: User Research & Journey Mapping",
        description: "Map user journeys and identify transfer friction points.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Map user transfer journey", instructions: "Map emotional highs and lows through payment flow.", acceptanceCriteria: "Journey map includes at least 3 critical friction points.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "User Research & Personas", description: "Interview users and define journey friction." },
      { stepNumber: 2, title: "Figma Prototyping", description: "Design high-fidelity interactive component screens." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-ux-case-study",
    slug: "learning-platform-ux-case-study",
    title: "Learning Platform UX Case Study",
    tagline: "Design an engaging, distraction-free online course exploration and learning interface with student usability audits.",
    category: "UI/UX Design",
    difficulty: "Beginner",
    estimatedTime: "4.5 Hours",
    estimatedEffortMinutes: 270,
    xpReward: 360,
    skillsRequired: ["Information Architecture", "UX Audit", "Heuristic Evaluation", "Figma Components", "Responsive Design"],
    tools: ["Figma", "FigJam"],
    prerequisites: ["Basic digital design awareness"],
    learningObjectives: [
      "Conduct heuristic usability audits on existing learning platforms",
      "Re-architect course catalog navigation and progressive filtering",
      "Design accessible reading interfaces for PDF courses",
      "Document case study rationale with before/after comparisons"
    ],
    deliverables: ["Figma design files", "Heuristic audit scorecard", "Published UX case study"],
    description: "Conduct a UX audit and redesign of an e-learning platform. Enhance course discoverability, reading immersion, and progress tracking satisfaction.",
    problemStatement: {
      goal: "Eliminate visual clutter in online learning interfaces so learners can focus on course content.",
      targetUsers: "Self-paced students studying coding, data, and design courses.",
      functionalRequirements: [
        "Uncluttered course reader with sidebar collapse",
        "Clear progress milestones and estimated remaining time",
        "Integrated note-taking drawer",
        "Accessible contrast and font scale controls"
      ],
      acceptanceCriteria: ["Heuristic evaluation validates 10 Nielsen Norman heuristics", "Responsive design across devices"],
      expectedResult: "An inspiring education UX case study."
    },
    features: ["Heuristic evaluation", "Distraction-free course view", "Figma design system", "Interactive prototype"],
    roadmapIds: ["ui-ux"],
    roadmapStageIds: [2, 5, 8],
    relatedCourseIds: ["web-development-foundations"],
    starterTemplateId: "none",
    starterFiles: [
      {
        filename: "audit.md",
        language: "markdown",
        content: `# E-Learning Platform Usability Audit
Heuristic Evaluation across 10 Nielsen Norman principles.`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-ux-case-study",
        title: "Milestone 1: Heuristic Audit & Wireframes",
        description: "Audit current interface and sketch cleaner layouts.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Complete Heuristic Scorecard", instructions: "Evaluate current LMS UI across 10 heuristics.", acceptanceCriteria: "Scores and recommendations documented.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Heuristic Audit", description: "Audit current UI and score usability violations." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-ux-checkout",
    slug: "ecommerce-checkout-ux-improvement",
    title: "E-commerce Checkout Improvement",
    tagline: "Audit and optimize an e-commerce checkout flow to reduce cart abandonment, enhance micro-copy, and streamline payments.",
    category: "UI/UX Design",
    difficulty: "Intermediate",
    estimatedTime: "5 Hours",
    estimatedEffortMinutes: 300,
    xpReward: 420,
    skillsRequired: ["Conversion UX", "Form Design", "Micro-copy", "A/B Test Design", "Figma Prototyping"],
    tools: ["Figma", "UserTesting"],
    prerequisites: ["Figma component architecture"],
    learningObjectives: [
      "Analyze checkout cart abandonment triggers",
      "Design one-page checkout vs progressive 3-step checkout models",
      "Formulate accessible, inline error feedback micro-copy",
      "Design trust badges, shipping estimators, and mobile wallets"
    ],
    deliverables: ["Optimized checkout prototype in Figma", "Form usability checklist", "A/B test hypothesis document"],
    description: "Redesign an e-commerce checkout flow to reduce cart abandonment. Streamline form inputs, provide transparent order totals, and integrate Apple/Google Pay.",
    problemStatement: {
      goal: "Eliminate friction and unexpected costs in online checkout to boost purchase completion rates.",
      targetUsers: "Online shoppers purchasing apparel and tech products on mobile devices.",
      functionalRequirements: [
        "Guest checkout without mandatory account creation",
        "Clear shipping and tax estimation before final step",
        "Inline real-time input validation for credit cards",
        "One-click mobile wallet payment options"
      ],
      acceptanceCriteria: ["Form inputs reduced by at least 30%", "Error states are explicit and helpful"],
      expectedResult: "A high-conversion checkout UX study."
    },
    features: ["One-page checkout prototype", "Inline validation states", "Mobile wallet integration", "Trust indicators"],
    roadmapIds: ["ui-ux"],
    roadmapStageIds: [4, 6],
    relatedCourseIds: ["web-development-foundations"],
    starterTemplateId: "none",
    starterFiles: [
      {
        filename: "checkout-ux.md",
        language: "markdown",
        content: `# Checkout Flow Improvement
Figma prototype testing frictionless payments.`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-ux-checkout",
        title: "Milestone 1: Checkout Form Optimization",
        description: "Simplify input fields and design clear feedback states.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Audit checkout form fields", instructions: "Eliminate redundant inputs and group address fields.", acceptanceCriteria: "Input count reduced to essential fields.", estimatedMinutes: 45, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Form Field Audit", description: "Audit inputs and draft simplified checkout flow." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1556742049-0a67e557224e?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },

  // ── 8. CYBERSECURITY ANALYST ──
  {
    id: "proj-sec-logs",
    slug: "security-log-analysis-dashboard",
    title: "Security Log Analysis Dashboard",
    tagline: "Ingest and analyze server authentication logs with Python to detect brute-force attacks, port scans, and suspicious IPs.",
    category: "Cybersecurity",
    difficulty: "Intermediate",
    estimatedTime: "5.5 Hours",
    estimatedEffortMinutes: 330,
    xpReward: 460,
    skillsRequired: ["Python", "Log Parsing (Regex)", "Threat Detection", "IP Geolocation", "SIEM Fundamentals"],
    tools: ["Python 3.12", "Linux / Bash", "VS Code"],
    prerequisites: ["Python basics and basic networking concepts"],
    learningObjectives: [
      "Parse unstructured Nginx, Apache, and SSH auth logs using regex",
      "Detect failed password brute-force patterns and threshold spikes",
      "Map attacker IP addresses to geographic origins and threat feeds",
      "Generate automated incident alerts and CSV forensics reports"
    ],
    deliverables: ["Python log analyzer script", "Threat report with flagged malicious IPs", "Automated alert notification rule"],
    description: "Build an automated log parser and security monitoring tool that processes server authentication logs, identifies suspicious anomalies, and flags attacker IPs.",
    problemStatement: {
      goal: "Analyze thousands of server log lines to identify unauthorized access attempts and automated brute-force attacks.",
      targetUsers: "Security Operations Center (SOC) analysts and systems administrators.",
      functionalRequirements: [
        "Regex extraction of timestamps, IPs, HTTP status, and user agents",
        "Threshold rule: flag IPs with >= 5 failed logins within 60 seconds",
        "Top 10 attacking IPs and target usernames summary table",
        "Export incident report to JSON/CSV"
      ],
      acceptanceCriteria: ["Correctly flags 100% of simulated attacks in sample log", "Generates clean forensic summary"],
      expectedResult: "A functional threat detection tool."
    },
    features: ["Regex log parser", "Brute-force detection engine", "Summary charts", "Incident export"],
    roadmapIds: ["cybersecurity"],
    roadmapStageIds: [3, 4, 6],
    relatedCourseIds: ["python-programming-mastery"],
    starterTemplateId: "python",
    starterFiles: [
      {
        filename: "analyze_logs.py",
        language: "python",
        content: `import re
from collections import Counter

# Simulated Auth Log Sample
log_data = """
Oct 16 14:01:10 web01 sshd[1234]: Failed password for root from 192.168.1.105 port 44322 ssh2
Oct 16 14:01:12 web01 sshd[1234]: Failed password for root from 192.168.1.105 port 44323 ssh2
Oct 16 14:01:15 web01 sshd[1234]: Failed password for admin from 192.168.1.105 port 44324 ssh2
Oct 16 14:01:18 web01 sshd[1234]: Failed password for root from 192.168.1.105 port 44325 ssh2
Oct 16 14:01:21 web01 sshd[1234]: Failed password for user from 192.168.1.105 port 44326 ssh2
Oct 16 14:02:00 web01 sshd[1235]: Accepted password for deploy from 10.0.0.50 port 51200 ssh2
"""

# Regex to extract failed login IP addresses
pattern = r"Failed password for .* from ([0-9.]+) port"
failed_ips = re.findall(pattern, log_data)

counts = Counter(failed_ips)
print("=== Security Log Threat Analysis ===")
for ip, count in counts.items():
    if count >= 3:
        print(f"[ALERT - Potential Brute-Force] IP: {ip} -> {count} failed attempts")`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-sec-logs",
        title: "Milestone 1: Log Parsing & Threat Extraction",
        description: "Parse log lines and count failed access attempts.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Write regex parser", instructions: "Extract timestamp, status, and IP from logs.", acceptanceCriteria: "Parses log entries into clean dictionary objects.", estimatedMinutes: 45, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Parse Log Strings", description: "Extract timestamps, IPs, and status codes." },
      { stepNumber: 2, title: "Threat Rules & Alerts", description: "Flag brute-force spikes and export report." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-sec-password",
    slug: "password-strength-assessment-tool",
    title: "Password Strength Assessment Tool",
    tagline: "Build a client-side and CLI password auditing tool calculating Shannon entropy, dictionary checks, and breach lookups.",
    category: "Cybersecurity",
    difficulty: "Beginner",
    estimatedTime: "3.5 Hours",
    estimatedEffortMinutes: 210,
    xpReward: 320,
    skillsRequired: ["Cryptography Basics", "Shannon Entropy Calculation", "Common Password Dictionaries", "JavaScript / Python", "Input Security"],
    tools: ["Python or JavaScript", "VS Code"],
    prerequisites: ["Basic programming logic"],
    learningObjectives: [
      "Calculate mathematical Shannon entropy in bits for input strings",
      "Check candidates against common leaked password lists (rockyou.txt)",
      "Evaluate time-to-crack estimates across different hardware hashing rates",
      "Provide constructive security recommendations to users"
    ],
    deliverables: ["Password assessment tool", "Entropy calculation logic", "Unit tests validating score accuracy"],
    description: "Develop a password strength assessment utility that calculates information entropy, detects common dictionary patterns, and educates users on passphrase security.",
    problemStatement: {
      goal: "Help users and system administrators identify weak passwords before they are deployed in production systems.",
      targetUsers: "System administrators, security-conscious individuals, and enterprise employees.",
      functionalRequirements: [
        "Calculate Shannon entropy in bits based on character pool",
        "Check against 1,000 most common passwords",
        "Detect keyboard walks (qwerty, 123456) and character repetitions",
        "Estimate brute-force cracking time across GPU rigs"
      ],
      acceptanceCriteria: ["Zero transmission of password over network", "Entropy scores match NIST guidelines"],
      expectedResult: "A secure, privacy-preserving password auditor."
    },
    features: ["Shannon entropy score", "Common dictionary check", "Cracking time estimate", "Zero network leakage"],
    roadmapIds: ["cybersecurity"],
    roadmapStageIds: [2, 3],
    relatedCourseIds: ["modern-javascript-typescript"],
    starterTemplateId: "web",
    starterFiles: [
      {
        filename: "entropy.js",
        language: "javascript",
        content: `// Shannon Entropy Calculator
function calculateEntropy(password) {
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(password)) pool += 32;

  if (pool === 0 || password.length === 0) return 0;
  const entropy = password.length * Math.log2(pool);
  return Math.round(entropy);
}

console.log("Entropy of 'correct-horse-battery-staple':", calculateEntropy('correct-horse-battery-staple'), "bits");`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-sec-password",
        title: "Milestone 1: Mathematical Entropy & Rule Engine",
        description: "Implement character pool detection and bits calculation.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Calculate bits of entropy", instructions: "Compute length * log2(pool).", acceptanceCriteria: "Returns correct bit count for sample strings.", estimatedMinutes: 45, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Character Pool & Entropy", description: "Identify character sets and calculate bits." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  },
  {
    id: "proj-sec-network",
    slug: "defensive-network-monitoring-lab",
    title: "Defensive Network Monitoring Lab",
    tagline: "Configure simulated network traffic capture with Python Scapy, detect ARP spoofing, and identify port scanning anomalies.",
    category: "Cybersecurity",
    difficulty: "Advanced",
    estimatedTime: "7 Hours",
    estimatedEffortMinutes: 420,
    xpReward: 560,
    skillsRequired: ["Network Protocols (TCP/IP, ARP, DNS)", "Packet Analysis", "Python Scapy", "Intrusion Detection (IDS)", "Firewall Rules"],
    tools: ["Python", "Scapy", "Wireshark", "Linux"],
    prerequisites: ["Networking fundamentals (OSI layers, TCP handshake)"],
    learningObjectives: [
      "Capture and inspect raw packet headers (IP, TCP, UDP, ARP) with Python Scapy",
      "Detect ARP cache poisoning and man-in-the-middle attempts",
      "Identify SYN flood denial-of-service and horizontal port scanning",
      "Formulate defensive iptables firewall rules to mitigate threats"
    ],
    deliverables: ["Python packet monitor script", "Simulated intrusion capture report (.pcap)", "Defensive firewall configuration"],
    description: "Build a defensive intrusion detection prototype that inspects network traffic, identifies anomalous packet rates, and alerts on network attacks.",
    problemStatement: {
      goal: "Monitor local network packets in real time to detect active reconnaissance scans and spoofing attacks.",
      targetUsers: "Security engineers, network administrators, and defensive blue-team defenders.",
      functionalRequirements: [
        "Sniff network interfaces for incoming ARP and TCP packets",
        "Detect duplicate IP-to-MAC associations (ARP poisoning)",
        "Flag rapid sequential SYN packets to multiple ports from one IP",
        "Log incident details to syslog format"
      ],
      acceptanceCriteria: ["Captures test packets without dropped buffers", "Correctly differentiates legitimate traffic"],
      expectedResult: "A lightweight defensive network monitor."
    },
    features: ["Packet header inspection", "ARP spoof detection", "Port scan alerts", "Automated iptables rule generation"],
    roadmapIds: ["cybersecurity"],
    roadmapStageIds: [5, 7, 8],
    relatedCourseIds: ["python-programming-mastery"],
    starterTemplateId: "python",
    starterFiles: [
      {
        filename: "sniff_packets.py",
        language: "python",
        content: `print("=== Defensive Network Monitoring Lab ===")
print("Inspect raw packet headers and detect anomalies.")`
      }
    ],
    milestones: [
      {
        id: "m1",
        projectId: "proj-sec-network",
        title: "Milestone 1: Packet Header Parsing & IDS Rules",
        description: "Inspect IP and TCP headers and count SYN flags.",
        displayOrder: 1,
        tasks: [
          { id: "t1", milestoneId: "m1", title: "Parse TCP headers", instructions: "Extract source IP, destination port, and TCP flags.", acceptanceCriteria: "Identifies SYN, ACK, and FIN flags accurately.", estimatedMinutes: 60, displayOrder: 1 }
        ]
      }
    ],
    steps: [
      { stepNumber: 1, title: "Packet Sniffing Setup", description: "Inspect packet layers with Scapy." }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
    isPublished: true
  }
];

export function getAllPracticalProjects(): PracticalProject[] {
  return PRACTICAL_PROJECTS;
}

export function getPracticalProjectBySlug(slug: string): PracticalProject | undefined {
  return PRACTICAL_PROJECTS.find((p) => p.slug === slug || p.id === slug);
}

export function getPracticalProjectById(id: string): PracticalProject | undefined {
  return PRACTICAL_PROJECTS.find((p) => p.id === id || p.slug === id);
}

export function getProjectsByRoadmap(roadmapId: string): PracticalProject[] {
  return PRACTICAL_PROJECTS.filter((p) => p.roadmapIds.includes(roadmapId));
}

export function getRecommendedProjects(userTrack?: string, userSkills: string[] = []): PracticalProject[] {
  if (!userTrack && userSkills.length === 0) {
    // Return beginner-friendly projects as general suggestions
    return PRACTICAL_PROJECTS.filter((p) => p.difficulty === "Beginner").slice(0, 3);
  }

  // Filter based on matched roadmap
  const trackNormalized = (userTrack || "").toLowerCase();
  const matched = PRACTICAL_PROJECTS.filter((p) => {
    return p.roadmapIds.some((r) => trackNormalized.includes(r.toLowerCase())) ||
      p.skillsRequired.some((s) => userSkills.map((us) => us.toLowerCase()).includes(s.toLowerCase()));
  });

  if (matched.length > 0) {
    return matched.slice(0, 3);
  }

  return PRACTICAL_PROJECTS.filter((p) => p.difficulty === "Beginner").slice(0, 3);
}
