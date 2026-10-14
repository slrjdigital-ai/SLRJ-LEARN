export interface ProjectStep {
  stepNumber: number;
  title: string;
  description: string;
  codeSnippet?: string;
  tip?: string;
}

export interface PracticalProject {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "Frontend" | "Full-Stack" | "AI & APIs" | "Productivity";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  xpReward: number;
  skillsRequired: string[];
  description: string;
  features: string[];
  starterFiles: {
    filename: string;
    language: string;
    content: string;
  }[];
  steps: ProjectStep[];
  demoOutputPreview: string;
  sampleGithubUrl: string;
}

export const PRACTICAL_PROJECTS: PracticalProject[] = [
  {
    id: "proj-portfolio",
    slug: "developer-portfolio-website",
    title: "Modern Developer Portfolio Website",
    tagline: "Build a high-performance personal portfolio with dark mode, interactive project cards, and working contact form.",
    category: "Frontend",
    difficulty: "Beginner",
    estimatedTime: "4 Hours",
    xpReward: 350,
    skillsRequired: ["HTML5", "CSS3 Flexbox & Grid", "Responsive Design", "JavaScript DOM", "Form Validation"],
    description: "Create an impressive developer portfolio to showcase your learning journey, live projects, GitHub links, and skills to potential employers and clients.",
    features: [
      "Responsive hero section with personal bio and resume download button",
      "Interactive project grid with hover effects and modal preview",
      "Skills showcase with progress indicators",
      "Validated contact form with success feedback notification"
    ],
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
  </nav>

  <header class="hero">
    <h1>Building Fast, Scalable Web Applications</h1>
    <p>Software Engineering Student & Full-Stack Developer</p>
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
  --bg-dark: #030712;
  --surface: #0d1527;
  --text-primary: #f8fafc;
  --accent-cyan: #06b6d4;
  --accent-emerald: #10b981;
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
  padding: 1.5rem 2rem;
  background-color: var(--surface);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hero {
  text-align: center;
  padding: 6rem 2rem;
}

.btn-primary {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.85rem 1.75rem;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald));
  color: #000;
  font-weight: 700;
  text-decoration: none;
  border-radius: 9999px;
}`
      },
      {
        filename: "script.js",
        language: "javascript",
        content: `console.log("Portfolio initialized successfully!");
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});`
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Setup Document & Semantic Layout",
        description: "Create the index.html file with semantic tags: <nav>, <header>, <main>, <section id='projects'>, and <footer>.",
        tip: "Keep markup semantic for top Google Lighthouse accessibility and SEO scores."
      },
      {
        stepNumber: 2,
        title: "Implement Responsive CSS Architecture",
        description: "Define CSS custom properties (variables) for consistent colors, fonts, and dark surface tones. Style flexbox navigation and grid project cards.",
        tip: "Use minmax(280px, 1fr) with CSS Grid to make your project cards automatically stack on mobile screens."
      },
      {
        stepNumber: 3,
        title: "Add Smooth Scrolling & Contact Interactivity",
        description: "Write JavaScript event listeners to intercept navigation links for smooth scrolling and handle form submission with inline validation.",
        tip: "Always display an instant confirmation message upon form submit."
      }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN"
  },
  {
    id: "proj-weather",
    slug: "real-time-weather-dashboard",
    title: "Live Weather & Climate Forecast Dashboard",
    tagline: "Fetch and display real-time weather, humidity, UV index, and 5-day forecasts via OpenWeather REST APIs.",
    category: "Frontend",
    difficulty: "Beginner",
    estimatedTime: "5 Hours",
    xpReward: 400,
    skillsRequired: ["Fetch API", "Async/Await", "JSON Parsing", "DOM Updates", "Error Handling"],
    description: "Connect to live public weather APIs, process JSON payloads, handle geolocation lookups, and visualize changing climate conditions with dynamic UI themes.",
    features: [
      "City search with autocomplete and automatic browser geolocation lookup",
      "Dynamic weather icons (Clear, Rain, Snow, Thunderstorm)",
      "Hourly and 5-day visual forecast cards",
      "Graceful offline and invalid city name error alerts"
    ],
    starterFiles: [
      {
        filename: "app.js",
        language: "javascript",
        content: `async function fetchWeather(city) {
  const API_KEY = "DEMO_KEY";
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${encodeURIComponent(city)}&units=metric&appid=\${API_KEY}\`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    updateUI(data);
  } catch (err) {
    showError(err.message);
  }
}`
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Register for API & Test Endpoints",
        description: "Obtain an OpenWeather or WeatherAPI free token and verify endpoint requests using browser Fetch or Postman."
      },
      {
        stepNumber: 2,
        title: "Build the Search Bar & Metric Cards",
        description: "Design clean card displays for Temperature, Feels Like, Humidity, Wind Speed, and Atmospheric Pressure."
      },
      {
        stepNumber: 3,
        title: "Integrate Geolocation & Dynamic Backgrounds",
        description: "Use navigator.geolocation.getCurrentPosition to automatically load the user's local city on initial render."
      }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN"
  },
  {
    id: "proj-task-manager",
    slug: "kanban-task-manager",
    title: "Interactive Kanban Task & Sprint Manager",
    tagline: "Build a drag-and-drop productivity board with local storage persistence and priority filtering.",
    category: "Productivity",
    difficulty: "Intermediate",
    estimatedTime: "6 Hours",
    xpReward: 500,
    skillsRequired: ["HTML Drag & Drop API", "LocalStorage", "Event Delegation", "State Management"],
    description: "Create an Agile-style Kanban board with 'To Do', 'In Progress', and 'Completed' lanes. Support task prioritization, deadlines, and persistent browser storage.",
    features: [
      "Drag-and-drop tasks smoothly between workflow columns",
      "Priority badges (Low, Medium, Critical) with color tags",
      "Persistent state via window.localStorage",
      "Search filter and completion percentage analytics"
    ],
    starterFiles: [
      {
        filename: "kanban.js",
        language: "javascript",
        content: `// Drag and drop event handlers
function handleDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.target.classList.add('dragging');
}

function handleDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const card = document.getElementById(id);
  e.currentTarget.appendChild(card);
  saveBoardState();
}`
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Design the 3-Column Kanban Board",
        description: "Create structural columns with drop targets for 'To Do', 'In Progress', and 'Done'."
      },
      {
        stepNumber: 2,
        title: "Implement HTML5 Drag and Drop API",
        description: "Set draggable='true' on task cards and listen to dragstart, dragover, and drop events."
      },
      {
        stepNumber: 3,
        title: "Persist Tasks to LocalStorage",
        description: "Serialize the task array into JSON string upon each change and rehydrate on page reload."
      }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN"
  },
  {
    id: "proj-expense-tracker",
    slug: "personal-finance-expense-tracker",
    title: "Personal Finance & Expense Tracker",
    tagline: "Track income and expenses, calculate cash flow balances, and visualize category spending with interactive charts.",
    category: "Full-Stack",
    difficulty: "Intermediate",
    estimatedTime: "6 Hours",
    xpReward: 500,
    skillsRequired: ["Array Reducers", "Data Aggregation", "Canvas or SVG Charts", "Form Handling"],
    description: "Manage personal budgets with automated credit/debit calculation, category breakdowns (Food, Rent, Utilities, Investments), and monthly spending charts.",
    features: [
      "Live account balance, total income, and total expense tally",
      "Transaction history with delete and edit capabilities",
      "Visual spending breakdown chart",
      "CSV export for spreadsheet analysis"
    ],
    starterFiles: [
      {
        filename: "finance.js",
        language: "javascript",
        content: `let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function calculateTotals() {
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const balance = income - expense;
  return { income, expense, balance };
}`
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Transaction Model & Calculations",
        description: "Implement data structures to capture amount, description, category, and timestamp."
      },
      {
        stepNumber: 2,
        title: "Live Balance Calculations with Array.reduce",
        description: "Compute net balance, total revenue, and total expense dynamically as transactions are added or removed."
      },
      {
        stepNumber: 3,
        title: "Data Visualization & Export",
        description: "Draw SVG donut charts for category spending and enable one-click CSV export."
      }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN"
  },
  {
    id: "proj-ai-study-assistant",
    slug: "ai-study-assistant",
    title: "AI-Powered Coding Study Assistant",
    tagline: "Build a conversational AI coding companion that diagnoses bugs, explains syntax, and generates quiz questions.",
    category: "AI & APIs",
    difficulty: "Advanced",
    estimatedTime: "8 Hours",
    xpReward: 700,
    skillsRequired: ["Serverless API Routes", "Streaming Text Responses", "Prompt Engineering", "Stateful Chat UI"],
    description: "Connect to LLM APIs with custom system prompts to create an intelligent programming tutor that explains code line-by-line, formats markdown code blocks, and creates personalized revision quizzes.",
    features: [
      "Real-time streaming conversation interface with syntax-highlighted code blocks",
      "Custom system prompts for step-by-step Socratic teaching",
      "Error diagnosis mode: paste broken code to receive pinpoint explanations",
      "Practice quiz generator tailored to the student's selected topic"
    ],
    starterFiles: [
      {
        filename: "tutor.js",
        language: "javascript",
        content: `async function askAiTutor(prompt, codeSnippet) {
  const res = await fetch("/api/ai-tutor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, codeSnippet })
  });
  const data = await res.json();
  return data.reply;
}`
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Create the Secure Server-Side Proxy Endpoint",
        description: "Store API keys safely in environment variables and create a Next.js /api route to relay prompts without exposing secrets."
      },
      {
        stepNumber: 2,
        title: "Engineer Socratic Teaching Prompts",
        description: "Craft system instructions that teach by explaining core principles rather than just regurgitating answers."
      },
      {
        stepNumber: 3,
        title: "Build the Rich Chat UI with Code Blocks",
        description: "Implement auto-scrolling chat history, copy-code buttons, and quick prompt chips (e.g. 'Explain this error', 'Show an example')."
      }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN"
  },
  {
    id: "proj-ecommerce",
    slug: "full-stack-ecommerce-store",
    title: "Full-Stack E-Commerce Storefront",
    tagline: "Build a modern digital storefront with category filtering, cart state management, and responsive product catalog.",
    category: "Full-Stack",
    difficulty: "Intermediate",
    estimatedTime: "6 Hours",
    xpReward: 550,
    skillsRequired: ["React State & Context", "Tailwind CSS", "Cart State Management", "LocalStorage", "Checkout Simulation"],
    description: "Engineer a high-converting e-commerce web application featuring dynamic price calculations, persistent shopping cart, item quantity controls, and simulated order placement.",
    features: [
      "Dynamic product catalog with category pills and price range filters",
      "Interactive cart slider with quantity adjustments and coupon code input",
      "LocalStorage cart state persistence across page refreshes",
      "Complete checkout flow with order summary and animated confirmation modal"
    ],
    starterFiles: [
      {
        filename: "cart.js",
        language: "javascript",
        content: `export class CartManager {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart') || '[]');
  }
  addItem(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) existing.qty += 1;
    else this.items.push({ ...product, qty: 1 });
    this.save();
  }
  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}`
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Model Product & Cart Data Structures",
        description: "Design clean TypeScript or JS schemas for products, stock status, ratings, and cart items."
      },
      {
        stepNumber: 2,
        title: "Implement Responsive Product Grid & Filters",
        description: "Create fluid card components that display badges, pricing, star ratings, and instantaneous 'Add to Cart' animations."
      },
      {
        stepNumber: 3,
        title: "Build the Cart Drawer & Checkout Validation",
        description: "Code the checkout summary with subtotal, tax calculation, shipping estimates, and success modal."
      }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN"
  },
  {
    id: "proj-algo-visualizer",
    slug: "algorithm-dsa-visualizer",
    title: "Interactive Algorithm & DSA Visualizer",
    tagline: "Visualize Bubble Sort, Merge Sort, and Binary Search step-by-step with interactive animation controls.",
    category: "Frontend",
    difficulty: "Intermediate",
    estimatedTime: "5 Hours",
    xpReward: 450,
    skillsRequired: ["Algorithms & DSA", "DOM Animations", "Asynchronous Execution", "Audio Synthesizer", "State Controller"],
    description: "Build an interactive education tool that brings computer science algorithms to life. Learners can adjust array sizes, modify animation speeds, step backward and forward, and inspect time complexity.",
    features: [
      "Visual bar graphs representing array elements with color-coded comparison states",
      "Multiple sorting algorithms: Bubble Sort, Selection Sort, Insertion Sort, and Merge Sort",
      "Playback controls: Play, Pause, Step Next, Reset, and Speed Slider (1x to 10x)",
      "Real-time operation counters tracking comparisons, swaps, and Big-O theoretical metrics"
    ],
    starterFiles: [
      {
        filename: "sortVisualizer.js",
        language: "javascript",
        content: `async function bubbleSort(arr, updateBars, delay) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      updateBars(j, j + 1, 'comparing');
      await new Promise(r => setTimeout(r, delay));
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        updateBars(j, j + 1, 'swapping');
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
}`
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Generate Dynamic Randomized Array",
        description: "Create an array generator that maps values to percentage heights within a flexbox or canvas container."
      },
      {
        stepNumber: 2,
        title: "Implement Asynchronous Sorting Animations",
        description: "Use async/await with adjustable delays to highlight elements currently being evaluated and swapped."
      },
      {
        stepNumber: 3,
        title: "Add Metric Dashboards & Big-O Breakdown",
        description: "Render live counters for array accesses, comparisons, and display real-world time complexity summaries."
      }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN"
  },
  {
    id: "proj-snippet-vault",
    slug: "developer-snippet-notes-vault",
    title: "Developer Snippet & Notes Vault",
    tagline: "A lightning-fast personal code vault with syntax highlighting, tag filters, search, and one-click copy.",
    category: "Productivity",
    difficulty: "Beginner",
    estimatedTime: "3.5 Hours",
    xpReward: 400,
    skillsRequired: ["JavaScript ES6+", "Clipboard API", "Tag Filtering", "Fuzzy Search", "JSON Backup / Restore"],
    description: "Every developer needs a personal library of reusable code recipes, config files, and algorithms. Build an offline-first productivity tool that organizes snippets with instant search and syntax tags.",
    features: [
      "Instant full-text search across snippet titles, descriptions, and code blocks",
      "Language tag filtering (JS, TypeScript, Python, HTML, CSS, SQL, Shell)",
      "One-click copy with toast feedback and favorite pin toggles",
      "Export and import vault as a portable JSON backup file"
    ],
    starterFiles: [
      {
        filename: "snippetVault.js",
        language: "javascript",
        content: `export function filterSnippets(snippets, query, language) {
  return snippets.filter(s => {
    const matchesLang = language === 'All' || s.language === language;
    const matchesQuery = !query || 
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.code.toLowerCase().includes(query.toLowerCase());
    return matchesLang && matchesQuery;
  });
}`
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Create the Snippet Form & Local Storage DB",
        description: "Build an intuitive modal to input snippet title, programming language, tags, and code."
      },
      {
        stepNumber: 2,
        title: "Render Syntax-Highlighted Cards",
        description: "Format the code blocks with monospaced typography, dark theme styling, and copy buttons."
      },
      {
        stepNumber: 3,
        title: "Add Real-Time Filtering & Export",
        description: "Wire instant reactive search and enable JSON import/export so developers never lose their recipes."
      }
    ],
    demoOutputPreview: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    sampleGithubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN"
  }
];

export function getAllPracticalProjects(): PracticalProject[] {
  return PRACTICAL_PROJECTS;
}

export function getPracticalProjectBySlug(slug: string): PracticalProject | undefined {
  return PRACTICAL_PROJECTS.find((p) => p.slug === slug);
}
