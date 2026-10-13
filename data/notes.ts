export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
  explanation: string;
}

export interface SectionDiagram {
  type: "architecture" | "flowchart" | "comparison";
  title: string;
  items: Array<{
    title: string;
    desc: string;
    badge?: string;
  }>;
}

export interface SectionTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface CommonMistake {
  wrong: string;
  correct: string;
  why: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "coding-challenge" | "conceptual";
  options?: string[];
  correctAnswer?: string;
  explanation: string;
  codeStarter?: string;
  solutionHint?: string;
}

export interface NoteSection {
  id: string;
  title: string;
  content: string;
  subsections?: Array<{
    title: string;
    content: string;
    codeSnippet?: CodeSnippet;
  }>;
  codeSnippet?: CodeSnippet;
  diagram?: SectionDiagram;
  table?: SectionTable;
  commonMistakes?: CommonMistake[];
  warnings?: string[];
  bestPractices?: string[];
  revisionNotes?: string[];
}

export interface NoteItem {
  id: string;
  slug: string;
  subCategory?: "HTML" | "CSS" | "Web Fundamentals";
  title: string;
  shortDescription: string;
  category:
    | "Data Structures & Algorithms"
    | "Python & AI"
    | "Computer Science Core"
    | "Cloud & DevOps"
    | "Web Development"
    | "JavaScript"
    | "Git & GitHub"
    | "React"
    | "Next.js"
    | "Backend & Databases"
    | "Deployment";
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readingTime: string;
  lastUpdated: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  status: "published" | "in_development";
  pdf: {
    hasPdf: boolean;
    fileUrl: string;
    filename: string;
    fileSize: string;
    pageCount: number;
    language: string;
    slug?: string;
  } | null;
  tableOfContents: Array<{
    id: string;
    title: string;
    level: number;
  }>;
  introduction: string;
  sections: NoteSection[];
  faqs: Array<{ question: string; answer: string }>;
  practiceQuestions: PracticeQuestion[];
  relatedNoteSlugs: string[];
  tags?: string[];
}

export const NOTES_DATA: NoteItem[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. WEB FUNDAMENTALS: How the Internet Works
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-internet-works",
    slug: "how-the-internet-works",
    title: "How the Internet Works & Web Architecture",
    shortDescription: "A deep dive into DNS resolution, TCP/IP handshakes, TLS encryption, HTTP packet routing, and browser rendering engines.",
    category: "Web Development",
    subCategory: "Web Fundamentals",
    topic: "Internet Architecture & Protocols",
    difficulty: "Beginner",
    readingTime: "12 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/web-fundamentals-complete-handbook.pdf",
      filename: "web-fundamentals-complete-handbook.pdf",
      fileSize: "5.6 KB",
      pageCount: 2,
      language: "English"
    },
    tags: ["Internet", "DNS", "TCP/IP", "HTTP", "Browsers", "Web Architecture"],
    tableOfContents: [
      { id: "overview", title: "1. Global Internet Architecture", level: 2 },
      { id: "dns-resolution", title: "2. The 4-Step DNS Lookup Journey", level: 2 },
      { id: "tcp-tls", title: "3. TCP 3-Way Handshake & TLS Security", level: 2 },
      { id: "browser-parsing", title: "4. How the Browser Renders the Page", level: 2 },
      { id: "common-pitfalls", title: "5. Common Architectural Misconceptions", level: 2 },
      { id: "faq", title: "6. Frequently Asked Questions", level: 2 },
      { id: "practice", title: "7. Knowledge Check & Practice Exercise", level: 2 }
    ],
    introduction: "Every time a user types a URL such as 'https://slrjdigital.in' into their browser and presses Enter, an intricate symphony of distributed computing protocols executes within mere milliseconds. Understanding this foundational pipeline is what separates junior copy-paste coders from true full-stack software engineers.",
    sections: [
      {
        id: "overview",
        title: "1. Global Internet Architecture",
        content: "The internet is not a mystical cloud; it is a physical network of interconnected computers linked through undersea fiber-optic cables, terrestrial optical links, routers, and edge datacenters. Communication is standardized through the Open Systems Interconnection (OSI) and TCP/IP protocol suites.",
        diagram: {
          type: "flowchart",
          title: "The URL Request-to-Render Lifecycle",
          items: [
            { title: "User Action", desc: "User enters URL into browser address bar", badge: "Browser" },
            { title: "DNS Resolver", desc: "Translates human hostname to IP address (e.g., 104.21.55.2)", badge: "DNS" },
            { title: "TCP + TLS Handshake", desc: "SYN -> SYN-ACK -> ACK ensures cryptographic connection", badge: "Transport" },
            { title: "HTTP Request", desc: "GET / HTTP/2 sent with headers and cookies", badge: "Application" },
            { title: "Server & Edge CDN", desc: "Processes request, executes handlers, returns HTML stream", badge: "Server" },
            { title: "Browser Rendering", desc: "Builds DOM & CSSOM, computes layout, paints pixels to screen", badge: "Display" }
          ]
        }
      },
      {
        id: "dns-resolution",
        title: "2. The 4-Step DNS Lookup Journey",
        content: "Domain Name System (DNS) functions as the internet's phonebook. Because humans remember words while routers route packets using numerical IP addresses, the browser resolves the domain via four hierarchical DNS servers:",
        table: {
          title: "DNS Server Hierarchy & Functions",
          headers: ["Server Stage", "Role", "Example Response"],
          rows: [
            ["DNS Recurser", "Queries other DNS servers on behalf of client", "Maintained by ISP or 1.1.1.1 / 8.8.8.8"],
            ["Root Nameserver", "Directs queries to appropriate TLD server", "Points '.in' or '.com' queries to TLD"],
            ["TLD Nameserver", "Manages the top-level domain directory", "Directs to authoritative server for 'slrjdigital.in'"],
            ["Authoritative Nameserver", "Holds final official DNS records", "Returns IP address: 172.67.182.25 (A Record)"]
          ]
        },
        codeSnippet: {
          language: "bash",
          title: "Tracing DNS Lookup using dig in the terminal",
          code: `# Inspect the DNS resolution path for slrjdigital.in
dig slrjdigital.in +trace

# Query specific A records directly from Cloudflare DNS
dig @1.1.1.1 slrjdigital.in A +short`,
          explanation: "The +trace flag instructs dig to begin querying the root nameserver and step through the entire hierarchical delegation chain down to the authoritative answer."
        }
      },
      {
        id: "tcp-tls",
        title: "3. TCP 3-Way Handshake & TLS Security",
        content: "Once the IP address is known, the client initiates a reliable connection over Transmission Control Protocol (TCP) before transmitting data. For encrypted HTTPS traffic, a TLS cryptographic exchange immediately follows.",
        subsections: [
          {
            title: "TCP 3-Way Handshake Sequence",
            content: "1. SYN: Client sends Synchronize packet with random sequence number x.\n2. SYN-ACK: Server receives SYN, acknowledges with ACK (x+1) and sends its own SYN (y).\n3. ACK: Client sends ACK (y+1). The reliable duplex channel is now open."
          },
          {
            title: "TLS 1.3 Cryptographic Handshake",
            content: "TLS 1.3 reduces the handshake overhead to a single round trip (1-RTT). The client sends supported cipher suites and key share parameters. The server responds with chosen cipher parameters, certificate, and shared secret. All subsequent HTTP packets are encrypted against eavesdropping."
          }
        ],
        codeSnippet: {
          language: "http",
          title: "Sample HTTP/2 Request & Response",
          code: `:method: GET
:scheme: https
:authority: slrjdigital.in
:path: /blog
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
accept: text/html,application/xhtml+xml

# HTTP Response from Edge Server
:status: 200
content-type: text/html; charset=utf-8
cache-control: public, max-age=3600, s-maxage=86400
strict-transport-security: max-age=31536000; includeSubDomains`,
          explanation: "HTTP/2 introduces binary framing and multiplexing, allowing multiple simultaneous requests and responses over a single TCP connection."
        }
      },
      {
        id: "browser-parsing",
        title: "4. How the Browser Renders the Page",
        content: "Once bytes arrive across the wire, the browser parsing engine transforms raw text into pixels through the Critical Rendering Path:",
        subsections: [
          {
            title: "DOM Construction (Document Object Model)",
            content: "Bytes -> Characters -> Tokens (startTag, endTag) -> Nodes -> Tree structure representing document hierarchy."
          },
          {
            title: "CSSOM Construction (CSS Object Model)",
            content: "CSS rules are parsed into a tree representing styling cascading hierarchies."
          },
          {
            title: "Render Tree & Layout (Reflow)",
            content: "DOM and CSSOM combine into a Render Tree (elements with display: none are omitted). Layout calculates the exact pixel coordinates and box dimensions for each node on screen."
          },
          {
            title: "Painting & Compositing",
            content: "The browser paints colors, borders, and textures into layers, then GPU compositing merges layers for display."
          }
        ],
        bestPractices: [
          "Minify HTML, CSS, and JavaScript to reduce over-the-wire payload size.",
          "Use DNS preconnect and prefetch tags for external critical origins (<link rel='preconnect' href='...'>).",
          "Prevent render-blocking CSS and JavaScript by utilizing modern module defer/async and Next.js SSR."
        ]
      },
      {
        id: "common-pitfalls",
        title: "5. Common Architectural Misconceptions",
        content: "Review these critical mistakes often encountered during engineering interviews and production deployments:",
        commonMistakes: [
          {
            wrong: "Assuming DNS lookup occurs every single time you navigate between pages on a website.",
            correct: "Browsers, operating systems, and local routers aggressively cache DNS records according to the TTL (Time To Live) field.",
            why: "Without local DNS caching, every web request would incur 50-100ms extra network latency."
          },
          {
            wrong: "Believing HTTPS encrypts the domain name hostname being contacted.",
            correct: "The Server Name Indication (SNI) during TLS handshake can reveal the hostname unless Encrypted Client Hello (ECH) is enabled.",
            why: "The server needs to know which SSL certificate to present before the encrypted channel is established."
          }
        ],
        warnings: [
          "Never send authentication credentials or sensitive payload data over plain HTTP (Port 80).",
          "Be aware of DNS propagation delays (up to 24-48 hours) when changing nameservers or root A records."
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between an IP address and a MAC address?",
        answer: "An IP address (Layer 3) is a logical routable address assigned to your network interface on the internet (e.g. 192.168.1.1 or 172.67.182.25). A MAC address (Layer 2) is a permanent physical identifier burned into your hardware network chip by the manufacturer."
      },
      {
        question: "Why is HTTP/3 faster than HTTP/2?",
        answer: "HTTP/3 runs on top of QUIC, which uses UDP rather than TCP. This eliminates 'Head-of-Line Blocking' caused by packet drops at the TCP transport layer, leading to substantially faster connection establishment on mobile networks."
      },
      {
        question: "What does TTL mean in DNS records?",
        answer: "TTL stands for Time-To-Live. It is a timer (in seconds) that tells intermediate resolvers and browsers how long they can cache that DNS record before querying the authoritative nameserver again."
      }
    ],
    practiceQuestions: [
      {
        id: "q-internet-1",
        question: "Which of the following occurs FIRST when you type a domain into your browser?",
        type: "multiple-choice",
        options: [
          "TCP 3-Way Handshake",
          "Local Browser and OS DNS Cache inspection",
          "TLS Cryptographic Handshake",
          "HTTP GET Request Transmission"
        ],
        correctAnswer: "Local Browser and OS DNS Cache inspection",
        explanation: "Before any packets can leave your device, the browser checks its own internal DNS cache and the OS cache (and hosts file) to see if the IP address is already known."
      },
      {
        id: "q-internet-2",
        question: "What are the three packets exchanged in a standard TCP handshake?",
        type: "multiple-choice",
        options: [
          "PING, PONG, ACK",
          "SYN, SYN-ACK, ACK",
          "HELLO, VERIFY, PROCEED",
          "REQUEST, RESPONSE, CLOSE"
        ],
        correctAnswer: "SYN, SYN-ACK, ACK",
        explanation: "The client sends a SYN (synchronize), the server responds with SYN-ACK (synchronize-acknowledge), and the client finishes with an ACK (acknowledge)."
      }
    ],
    relatedNoteSlugs: ["frontend-vs-backend", "http-https-browsers-servers", "html-basics-document-structure"]
  },

  // ─────────────────────────────────────────────────────────────
  // 2. HTML: HTML5 Basics & Document Structure
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-html5-basics",
    slug: "html-basics-document-structure",
    title: "HTML5 Document Structure & Best Practices",
    shortDescription: "Complete HTML Handwritten Notebook from Basic to Pro: modern document structure, semantic page architecture, accessible forms, multimedia, clean architecture, and 30-day practice plan.",
    category: "Web Development",
    subCategory: "HTML",
    topic: "HTML5 Core Fundamentals",
    difficulty: "Beginner",
    readingTime: "25 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/html5-complete-notes.pdf",
      filename: "html5-complete-notes.pdf",
      fileSize: "29.3 KB",
      pageCount: 10,
      language: "English"
    },
    tags: [
      "HTML",
      "HTML5",
      "Document Structure",
      "Semantic HTML",
      "Forms & Tables",
      "Accessibility",
      "SEO",
      "Handwritten Notes"
    ],
    tableOfContents: [
      { id: "handbook-overview", title: "Handwritten Notebook Overview & Learning Roadmap", level: 2 },
      { id: "level-1-basics", title: "Level 1 — HTML Basics: Structure, Tags, Paths & Tables", level: 2 },
      { id: "level-2-intermediate", title: "Level 2 — Intermediate HTML: Forms, Semantics & Media", level: 2 },
      { id: "level-3-advanced", title: "Level 3 — Advanced HTML: Accessibility, SEO & Modern APIs", level: 2 },
      { id: "level-4-pro", title: "Level 4 — Pro HTML: Architecture, Validation & Security", level: 2 },
      { id: "cheat-sheet-mistakes", title: "HTML Master Cheat Sheet & Common Mistakes Checklist", level: 2 },
      { id: "practice-plan-projects", title: "30-Day Practice Plan & 7 Real-World Mini-Projects", level: 2 },
      { id: "final-revision-checklist", title: "Final Revision Questions & Production Launch Checklist", level: 2 }
    ],
    introduction: "Welcome to the complete HTML Handwritten Notebook — a structured masterclass taking you from Basic to Intermediate, Advanced, and Pro engineering levels.\n\n🎯 GOAL: Build rock-solid HTML fundamentals, author clean semantic documents, construct accessible forms and multimedia experiences, master SEO and screen-reader accessibility, and prepare effortlessly for CSS, JavaScript, and React.\n\n⭐ GOLDEN RULE: HTML is strictly about structure and meaning. CSS controls appearance. JavaScript controls behavior. Keep responsibilities clean and separated.",
    sections: [
      {
        id: "handbook-overview",
        title: "Handwritten Notebook Overview & Learning Roadmap",
        content: "How to use these notes effectively:\n1. Read the core concept first, then type the code yourself in VS Code instead of blindly copy-pasting.\n2. Underline or highlight the Remember boxes while revising.\n3. After completing each level, build the practice challenges and mini-project.\n4. Keep a dedicated folder called 'html-practice' on your computer and create a separate file for every exercise.\n5. Always use index.html as the primary entry point for multi-page websites.",
        diagram: {
          type: "comparison",
          title: "4-Level Engineering Progression",
          items: [
            {
              title: "Level 1: Basic Foundations",
              desc: "Document skeleton, tags, elements, attributes, text hierarchy, links, images, relative paths, lists, and tables.",
              badge: "Foundations"
            },
            {
              title: "Level 2: Intermediate Capabilities",
              desc: "Form architecture, input types, fieldsets, semantic page layouts, generic containers, audio/video, iframes, and head metadata.",
              badge: "Interactive"
            },
            {
              title: "Level 3: Advanced Standards",
              desc: "Accessibility (WCAG/ARIA), button vs link rules, technical SEO, responsive viewport, inline SVG, canvas, and native dialogs.",
              badge: "A11y & SEO"
            },
            {
              title: "Level 4: Professional Architecture",
              desc: "Component class naming (BEM), clean folder structure, W3C validation, performance optimization, security, and full-stack thinking.",
              badge: "Production"
            }
          ]
        },
        table: {
          title: "Learning Progression Matrix",
          headers: ["Level", "Focus Area", "Key Deliverables & Skills"],
          rows: [
            ["LEVEL 1 — BASIC", "Syntax & Core Tags", "Structure, tags, text, links, images, lists, tables, file paths."],
            ["LEVEL 2 — INTERMEDIATE", "Forms & Semantics", "Forms, inputs, validation, semantic layout, multimedia, entities, head tags."],
            ["LEVEL 3 — ADVANCED", "A11y, SEO & APIs", "WCAG accessibility, SEO architecture, inline SVG, Canvas, details/summary, dialog."],
            ["LEVEL 4 — PRO", "Production Engineering", "Clean folder architecture, maintainable BEM naming, validation, performance, security."]
          ]
        },
        bestPractices: [
          "Study • Write • Practice • Build • Revise: Follow this 5-step cycle for every topic.",
          "Treat HTML tags as structural semantics, never as styling shortcuts (e.g., avoid using <h1> just to make text larger)."
        ]
      },
      {
        id: "level-1-basics",
        title: "Level 1 — HTML Basics: Structure, Tags, Paths & Tables",
        content: "HTML (HyperText Markup Language) is the standard markup language used to structure content on web pages. HyperText represents text that can link to other resources, while Markup refers to specialized tags that tell the browser what a piece of content represents.\n\nRemember: HTML is NOT a programming language; it contains no conditional branching or variables. It is a markup declaration language.",
        diagram: {
          type: "architecture",
          title: "HTML Document Tree Architecture",
          items: [
            {
              title: "<!DOCTYPE html>",
              desc: "Document type declaration. Informs modern browser engines to render in standards mode instead of quirks mode.",
              badge: "Declaration"
            },
            {
              title: "<html lang='en'>",
              desc: "Root element wrapping all page contents. Declares natural language for search engines and screen readers.",
              badge: "Root Element"
            },
            {
              title: "<head>",
              desc: "Machine-readable metadata, character sets, viewport scaling, tab title, and external stylesheets/scripts.",
              badge: "Metadata & Links"
            },
            {
              title: "<body>",
              desc: "All visible content presented to human users (headings, paragraphs, images, navigation, tables, and forms).",
              badge: "Visible Content"
            }
          ]
        },
        codeSnippet: {
          language: "html",
          title: "Standard HTML5 Document Skeleton",
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Personal student portfolio and engineering notes.">
    <title>My First Webpage | SLRJ Digital</title>
  </head>
  <body>
    <h1>Welcome to Web Engineering</h1>
    <p>This is my first standards-compliant HTML5 webpage.</p>
  </body>
</html>`,
          explanation: "Every modern HTML5 page must declare <!DOCTYPE html>, specify charset UTF-8, and define the mobile viewport meta tag."
        },
        subsections: [
          {
            title: "3. Tags, Elements and Attributes",
            content: "• Tag: A markup token such as <p> or </p>.\n• Element: The complete structure including opening tag, content, and closing tag (e.g., <p>Hello World</p>).\n• Attribute: Extra metadata placed inside an opening tag (e.g., <a href='https://example.com' target='_blank'>Visit</a>).\n• Void Elements: Self-closing tags that do not have closing tags and cannot wrap child content (e.g., <img>, <br>, <hr>, <input>, <meta>, <link>)."
          },
          {
            title: "4. Text Formatting Hierarchy",
            content: "Use headings <h1> through <h6> strictly in descending logical order:\n• <h1>: Main page topic (use only once per document).\n• <h2>: Primary section headings.\n• <h3> to <h6>: Nested sub-headings.\n• <p>: Normal textual paragraph.\n• <strong>: Indicates serious importance or urgency (rendered bold).\n• <em>: Stress emphasis that changes sentence meaning (rendered italic).\n• <mark>: Text highlighted for contextual relevance.\n• <small>: Fine print, disclaimers, or copyright notices.\n• <sub> & <sup>: Subscripts (H₂O) and superscripts (x²).\n• <hr>: Thematic horizontal break between topics; <br>: Line break (use sparingly, never for vertical layout spacing)."
          },
          {
            title: "5. Comments & Security Note",
            content: "Write comments using <!-- This is a comment -->.\nComments are ignored by the browser parser but remain completely visible in 'View Page Source'. Never put API keys, passwords, student records, or sensitive logic in HTML comments."
          },
          {
            title: "6. Hyperlinks (Anchor Tags)",
            content: "The <a> element creates clickable hyperlinks:\n• Internal page: <a href='about.html'>About Us</a>\n• External website: <a href='https://www.google.com' target='_blank' rel='noopener noreferrer'>Google</a>\n• Email composer: <a href='mailto:hello@slrjdigital.in'>Email Support</a>\n• Phone dialer: <a href='tel:+911234567890'>Call Office</a>\nRemember: 'href' defines the destination URL. The text between <a> and </a> is the user-visible clickable link."
          },
          {
            title: "7. Images & Meaningful Alt Text",
            content: "Embed raster and vector images with <img src='images/photo.jpg' alt='A mountain landscape during sunset' width='600' height='400'>.\n• 'src': Relative path or absolute URL of the asset.\n• 'alt': Meaningful description read aloud by screen-readers and displayed if network connectivity fails.\n• 'width' & 'height': Explicit dimensions prevent Cumulative Layout Shift (CLS) as images load."
          },
          {
            title: "8. File Paths & Directory Traversal",
            content: "Understanding relative file paths:\n• './' or just 'file.html': Current directory.\n• 'images/photo.jpg': Subfolder inside the current directory.\n• '../': Go up one directory level.\n• '../../': Go up two directory levels.\nExample: From 'pages/about.html' to access root 'images/photo.jpg', write: <img src='../images/photo.jpg' alt='Photo'>"
          },
          {
            title: "9. Lists: Unordered, Ordered & Description",
            content: "HTML provides three distinct list elements:\n• <ul>: Unordered bulleted list (items where order does not matter).\n• <ol>: Ordered numbered list (step-by-step algorithms, recipes, workflows).\n• <dl>, <dt>, <dd>: Description/glossary list for terms and definitions.",
            codeSnippet: {
              language: "html",
              title: "HTML List Types in Action",
              code: `<!-- Unordered List -->
<ul>
  <li>HTML5 Semantics</li>
  <li>CSS3 Grid & Flexbox</li>
  <li>Modern JavaScript</li>
</ul>

<!-- Ordered List (Study Workflow) -->
<ol>
  <li>Open VS Code</li>
  <li>Create index.html</li>
  <li>Write standards-compliant HTML</li>
</ol>

<!-- Description List -->
<dl>
  <dt>HTML</dt>
  <dd>Structures web content and semantic meaning.</dd>
  <dt>CSS</dt>
  <dd>Styles layout, colors, typography, and responsive animations.</dd>
</dl>`,
              explanation: "Choose the correct list type based on data semantics rather than default browser bullet formatting."
            }
          },
          {
            title: "10. Accessible Data Tables",
            content: "Tables must only be used to display tabular, multidimensional data — NEVER for page layout.\nStructure tables properly using <caption> (accessible table title), <thead> (table header), <tbody> (table data), <tfoot> (summary rows), <th> (header cell with scope='col' or scope='row'), and <td> (standard data cell)."
          }
        ],
        commonMistakes: [
          {
            wrong: "Putting visible text elements (<h1>, <p>, <div>) inside the <head> tag.",
            correct: "Place all visible content strictly inside the <body> tag; keep <head> for metadata, title, and resource links.",
            why: "The browser <head> is machine-readable only; placing visible tags there violates HTML specs and breaks rendering trees."
          },
          {
            wrong: "Using repeated <br><br><br> tags to create vertical space between elements.",
            correct: "Use CSS margins and paddings (e.g., class='my-6' or margin-bottom) for spacing.",
            why: "<br> indicates a linguistic line break (like a poem or physical address), not a styling tool."
          }
        ]
      },
      {
        id: "level-2-intermediate",
        title: "Level 2 — Intermediate HTML: Forms, Semantics & Media",
        content: "Level 2 covers interactive user inputs, semantic document layouts, audio/video integration, and global attributes.",
        diagram: {
          type: "flowchart",
          title: "Typical Form Data Processing Pipeline",
          items: [
            {
              title: "1. User Input",
              desc: "User types data into interactive form controls (text, email, password, radio buttons, checkboxes, file upload).",
              badge: "Client Input"
            },
            {
              title: "2. <form> Container",
              desc: "Collects values matched to input 'name' attributes. Connects <label for='id'> to <input id='id'> for accessibility.",
              badge: "Markup"
            },
            {
              title: "3. Browser Validation",
              desc: "HTML5 constraints (required, type='email', minlength, pattern) validate data format before dispatch.",
              badge: "Client Validation"
            },
            {
              title: "4. Form Submission",
              desc: "Dispatches HTTP POST (or GET) request payload over HTTPS to configured backend route action.",
              badge: "Network Dispatch"
            },
            {
              title: "5. Server / API & Database",
              desc: "Backend API endpoint validates, sanitizes, authenticates, and persists data into the database.",
              badge: "Backend Processing"
            }
          ]
        },
        codeSnippet: {
          language: "html",
          title: "Production Accessible Registration Form",
          code: `<form action="/api/register" method="post" class="auth-form">
  <!-- Name Field -->
  <div class="form-group">
    <label for="full-name">Full Name</label>
    <input id="full-name" name="name" type="text" placeholder="John Doe" required autocomplete="name">
  </div>

  <!-- Email Field -->
  <div class="form-group">
    <label for="user-email">Email Address</label>
    <input id="user-email" name="email" type="email" placeholder="name@domain.com" required autocomplete="email">
  </div>

  <!-- Course Select -->
  <div class="form-group">
    <label for="course-choice">Select Enrolled Track</label>
    <select id="course-choice" name="course" required>
      <option value="" disabled selected>Choose a track...</option>
      <option value="fullstack">Full-Stack Web Development</option>
      <option value="dsa">Data Structures & Algorithms</option>
      <option value="ai">Python & Applied AI</option>
    </select>
  </div>

  <!-- Radio Group wrapped in Fieldset -->
  <fieldset class="contact-pref">
    <legend>Preferred Notification Mode</legend>
    <label><input type="radio" name="contact_pref" value="email" checked> Email</label>
    <label><input type="radio" name="contact_pref" value="sms"> SMS</label>
  </fieldset>

  <!-- Submit Button -->
  <button type="submit" class="submit-btn">Register Account</button>
</form>`,
          explanation: "Always connect every <label for='...'> explicitly to the input's matching 'id'. Use method='post' for sensitive and state-changing payloads."
        },
        subsections: [
          {
            title: "12. Common Input Types & Security Warning",
            content: "HTML5 provides rich input types with native mobile keyboards:\n• text, email, password, number, date, time, file, radio, checkbox, submit, color, range.\n⚠️ SECURITY WARNING: Never rely solely on client-side HTML validation. Any user can bypass HTML constraints using DevTools or curl. Always re-validate and sanitize all data on the backend server."
          },
          {
            title: "14. Semantic HTML Page Layout",
            content: "Semantic elements convey purpose and meaning to search bots and assistive screen readers:\n• <header>: Banner, site logo, primary headline.\n• <nav>: Primary navigational links.\n• <main>: Central, unique content of the page (only one per document).\n• <section>: Thematic grouping of content with an identifiable heading.\n• <article>: Self-contained, reusable piece of content (blog post, product card).\n• <aside>: Tangential content, sidebar, related resources.\n• <footer>: Author info, copyright, sitemap, legal terms."
          },
          {
            title: "15. Containers: <div> vs <span>",
            content: "• <div>: Generic block-level container starting on a new line and taking 100% available width. Use only when no semantic tag fits.\n• <span>: Generic inline container that wraps text snippets without breaking the line. Ideal for styling small words or icons."
          },
          {
            title: "16. Multimedia: Native Audio & Video",
            content: "Embed media natively without third-party plugins:\n<audio controls><source src='music.mp3' type='audio/mpeg'>Your browser does not support audio.</audio>\n<video controls width='640'><source src='intro.mp4' type='video/mp4'>Your browser does not support video.</video>"
          },
          {
            title: "17. Sandboxed Embeds & <iframe>",
            content: "Embed external widgets or YouTube videos using <iframe>:\n<iframe src='https://www.youtube.com/embed/VIDEO_ID' title='Video player' width='560' height='315' allowfullscreen loading='lazy'></iframe>\nRule: Always include a descriptive 'title' attribute for screen readers, and only embed from trusted origins."
          },
          {
            title: "18. HTML Entities",
            content: "Reserved characters must be written as HTML character entities:\n• &lt; represents '<' (less than)\n• &gt; represents '>' (greater than)\n• &amp; represents '&' (ampersand)\n• &quot; represents '\"' (quotation mark)\n• &nbsp; represents non-breaking space\n• &copy; represents '©' (copyright)\n• &reg; represents '®' (registered trademark)"
          },
          {
            title: "19. Metadata & Head Elements",
            content: "The <head> element contains crucial machine instructions:\n• <meta charset='UTF-8'>: Unicode encoding.\n• <meta name='viewport' content='width=device-width, initial-scale=1.0'>: Enables responsive CSS scaling on mobile screens.\n• <meta name='description' content='...'>: Search engine snippet.\n• <link rel='stylesheet' href='style.css'>: Connects CSS styles."
          },
          {
            title: "20. HTML5 Global Attributes",
            content: "Attributes valid on almost every HTML element:\n• id: Unique identifier on the entire page.\n• class: Reusable classification hook for CSS and JS.\n• title: Advisory tooltip text on hover.\n• lang: Natural language of the element.\n• data-*: Custom attributes to store private application data (e.g., data-user-id='42')."
          }
        ]
      },
      {
        id: "level-3-advanced",
        title: "Level 3 — Advanced HTML: Accessibility, SEO & Modern APIs",
        content: "Level 3 focuses on creating web experiences that are universally accessible, search-engine optimized, and leverage modern native browser APIs.",
        subsections: [
          {
            title: "21. Accessibility Fundamentals (A11y)",
            content: "• Use semantic HTML before reaching for ARIA attributes.\n• Every informative image must have descriptive alt text; purely decorative images must use alt=''.\n• Every form control must have a connected <label>.\n• Maintain strict heading hierarchy (h1 -> h2 -> h3).\n• Ensure full keyboard navigation: every interactive control must be reachable via Tab and activatable via Enter/Space.\n• Never convey vital information through color alone."
          },
          {
            title: "22. The Golden Rule: Buttons vs Links",
            content: "🧠 SIMPLE DECISION RULE:\n• If it takes the user somewhere (navigates to a new URL, page, or page anchor) ➔ Use an anchor tag <a href='...'>.\n• If it makes something happen (opens a modal, submits a form, toggles dark mode, deletes an item) ➔ Use a button tag <button type='button'>.\nNever write <div onclick='...'> or <a href='#'> for actions."
          },
          {
            title: "23. Technical SEO in HTML",
            content: "Search engine crawlers rely on HTML semantics:\n1. Give each page a unique, descriptive <title> (50-60 characters).\n2. Write a compelling <meta name='description'> (140-160 characters).\n3. Maintain exactly one <h1> heading representing the core subject.\n4. Write meaningful anchor link text (avoid generic 'click here' or 'read more'; write 'view course curriculum').\n5. Include Open Graph tags (og:title, og:image, og:url) for social previews."
          },
          {
            title: "24. Responsive-Friendly HTML Structure",
            content: "Always specify <meta name='viewport' content='width=device-width, initial-scale=1.0'>. HTML provides the logical content order and flexible container tree; CSS media queries and flex/grid systems apply the visual responsiveness."
          },
          {
            title: "25. Inline SVG Basics",
            content: "Scalable Vector Graphics (SVG) are XML-based vector graphics that scale infinitely without pixelation. Unlike raster formats (JPEG/PNG), inline SVGs can be styled with CSS fill and animated with JavaScript.\nExample: <svg width='24' height='24' viewBox='0 0 24 24' role='img' aria-label='Checkmark icon'><path fill='currentColor' d='...' /></svg>"
          },
          {
            title: "26. Canvas Basics (<canvas>)",
            content: "The <canvas> element provides an empty raster bitmap drawing surface. While SVG is DOM-based and vector, Canvas is drawn pixel-by-pixel via JavaScript (2D context or WebGL 3D), ideal for games, data charts, and particle physics."
          },
          {
            title: "27. Native Accordion: <details> & <summary>",
            content: "Create interactive collapsible accordions with zero JavaScript:\n<details>\n  <summary>What is HTML?</summary>\n  <p>HTML is the standard markup language for web document structure.</p>\n</details>"
          },
          {
            title: "28. Native Modal Dialog: <dialog>",
            content: "HTML5 offers the native <dialog> element. Call dialog.showModal() in JavaScript to render an accessible modal with built-in backdrop styling, focus trapping, and ESC-key dismiss behavior."
          }
        ],
        codeSnippet: {
          language: "html",
          title: "Native Accordion & Modal Implementation",
          code: `<!-- Native Accordion with zero JS -->
<details class="faq-item">
  <summary class="faq-question">Why is semantic HTML critical for SEO?</summary>
  <div class="faq-answer">
    <p>Semantic tags allow search engine crawlers to accurately parse page hierarchy, extract rich snippets, and index key topics efficiently.</p>
  </div>
</details>

<!-- Native Accessible Dialog -->
<dialog id="cookie-dialog" class="modal-card">
  <h3>Cookie Preferences</h3>
  <p>We use essential cookies to maintain user session security.</p>
  <form method="dialog">
    <button type="submit">Accept & Close</button>
  </form>
</dialog>`,
          explanation: "Native HTML elements reduce JavaScript bundle size, improve page load performance, and come with built-in accessibility."
        }
      },
      {
        id: "level-4-pro",
        title: "Level 4 — Pro HTML: Architecture, Validation & Security",
        content: "Professional frontend engineering demands clean folder organization, maintainable component class names, strict standards validation, performance optimization, and cybersecurity awareness.",
        subsections: [
          {
            title: "29. Clean Project Architecture & Separation of Concerns",
            content: "Recommended standard project structure:\nproject/\n├── index.html\n├── pages/\n│   ├── about.html\n│   ├── services.html\n│   └── contact.html\n├── assets/\n│   ├── images/\n│   └── icons/\n├── css/\n│   └── style.css\n└── js/\n    └── script.js\n\nKeep HTML (structure), CSS (styling), and JavaScript (behavior) strictly decoupled."
          },
          {
            title: "30. Maintainable Class Naming (BEM Philosophy)",
            content: "Name classes based on what the element represents, not how it looks (e.g., use 'product-card' instead of 'blue-box').\nBlock Element Modifier (BEM):\n• Block: .product-card\n• Element: .product-card__title, .product-card__image\n• Modifier: .product-card--featured"
          },
          {
            title: "31. HTML Validation & Debug Workflow",
            content: "When a layout breaks, follow this 4-step debug method:\n1. Inspect Element in Browser DevTools.\n2. Verify closing tags and element nesting.\n3. Run your code through the official W3C HTML Validator (validator.w3.org).\n4. Check CSS rules and JavaScript console errors."
          },
          {
            title: "32. Performance-Aware HTML",
            content: "• Always declare explicit width and height on <img> elements to reserve layout space and prevent Cumulative Layout Shift (CLS).\n• Add loading='lazy' on below-the-fold images to defer network fetching until the user scrolls nearby.\n• Minimize unnecessary nested <div> wrappers to keep the DOM tree shallow and performant."
          },
          {
            title: "33. Cybersecurity Awareness",
            content: "🚨 GOLDEN SECURITY RULE: Anything delivered to the browser can be inspected, modified, and tampered with by the client.\n• Never put database connection strings, passwords, or private API keys in HTML or frontend code.\n• Sanitize user-submitted HTML on the server before rendering to prevent Cross-Site Scripting (XSS) attacks.\n• Use rel='noopener noreferrer' when opening external links in target='_blank'."
          },
          {
            title: "34. Forms + Backend Thinking",
            content: "Connecting frontend HTML to full-stack backend services:\nBrowser Form ➔ HTTP POST Request with FormData / JSON ➔ Express / Next.js API Route Handler ➔ Input Validation & Authentication ➔ Database Query (PostgreSQL / MongoDB) ➔ JSON Response back to client."
          }
        ],
        codeSnippet: {
          language: "html",
          title: "BEM-Structured Production Component",
          code: `<article class="product-card product-card--featured">
  <img 
    class="product-card__image" 
    src="/images/course-banner.jpg" 
    alt="Full-Stack Web Development Course Overview"
    width="800" 
    height="450" 
    loading="lazy"
  >
  <div class="product-card__content">
    <span class="product-card__badge">Bestseller</span>
    <h2 class="product-card__title">Full-Stack Web Architecture</h2>
    <p class="product-card__description">Master HTML5, CSS3, React 19, and Next.js App Router.</p>
    <div class="product-card__footer">
      <span class="product-card__price">₹4,999</span>
      <a href="/enroll" class="product-card__btn">Enroll Now</a>
    </div>
  </div>
</article>`,
          explanation: "Readable BEM class naming clearly communicates component boundaries, reduces CSS specificity collisions, and improves team maintainability."
        }
      },
      {
        id: "cheat-sheet-mistakes",
        title: "HTML Master Cheat Sheet & Common Mistakes Checklist",
        content: "A quick-reference cheat sheet covering every primary element category and a checklist of the top 10 mistakes to avoid in production.",
        table: {
          title: "Complete HTML Elements Master Reference",
          headers: ["Category", "Core Elements", "Primary Function"],
          rows: [
            ["Structure", "<!DOCTYPE html>, <html>, <head>, <body>", "Document envelope, standards mode, and root containers."],
            ["Text", "<h1>…<h6>, <p>, <strong>, <em>, <mark>, <small>, <sub>, <sup>, <hr>, <br>", "Headings, paragraphs, typography emphasis, and breaks."],
            ["Links", "<a href='...'>", "Hyperlinks (internal, external, mailto, tel)."],
            ["Images", "<img src='...' alt='...'>", "Raster and vector image embedding."],
            ["Lists", "<ul>, <ol>, <li>, <dl>, <dt>, <dd>", "Unordered bullets, ordered sequences, and description definitions."],
            ["Tables", "<table>, <caption>, <thead>, <tbody>, <tfoot>, <tr>, <th>, <td>", "Tabular data presentation with accessible column/row headers."],
            ["Forms", "<form>, <label>, <input>, <select>, <option>, <textarea>, <fieldset>, <legend>, <button>", "Interactive user input collection, validation, and submission."],
            ["Semantic", "<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>", "Structural meaning for search bots, screen readers, and maintainability."],
            ["Multimedia", "<audio>, <video>, <source>, <iframe>", "Native audio/video playback and sandboxed third-party embeds."],
            ["Modern APIs", "<svg>, <canvas>, <details>, <summary>, <dialog>, data-*", "Vector graphics, scriptable drawing, accordions, and modals."]
          ]
        },
        revisionNotes: [
          "Checklist Item 1: Always declare <!DOCTYPE html> at the very top of your file.",
          "Checklist Item 2: Never duplicate 'id' attribute values across the same document.",
          "Checklist Item 3: Never leave meaningful <img> tags without informative alt text.",
          "Checklist Item 4: Avoid div-soup; use semantic tags (<nav>, <header>, <main>, <article>, <section>, <footer>) wherever appropriate.",
          "Checklist Item 5: Never use <table> elements for page layout styling.",
          "Checklist Item 6: Avoid repeated <br> tags for visual spacing; use CSS margins and padding.",
          "Checklist Item 7: Never use a link <a> for an action that should be a <button>.",
          "Checklist Item 8: Never store secrets, passwords, or private API keys in client-side HTML or JS.",
          "Checklist Item 9: Never rely solely on client-side form validation; always enforce backend validation.",
          "Checklist Item 10: Run every page through the W3C Markup Validator to catch unclosed or invalid tags."
        ]
      },
      {
        id: "practice-plan-projects",
        title: "30-Day Practice Plan & 7 Real-World Mini-Projects",
        content: "Follow this structured 30-day curriculum and build the 7 real-world projects to cement your HTML mastery.",
        table: {
          title: "30-Day HTML Learning Roadmap",
          headers: ["Days", "Curriculum Focus", "Practical Build Challenge"],
          rows: [
            ["Days 1–3", "Structure + Headings + Paragraphs + Comments", "Build a Personal Intro page with valid HTML5 skeleton."],
            ["Days 4–6", "Hyperlinks + Images + Relative Paths", "Construct a 3-page connected mini website with image gallery."],
            ["Days 7–9", "Lists + Accessible Tables", "Create a student course timetable and marks gradebook."],
            ["Days 10–13", "Forms + Fieldsets + Native Validation", "Build a comprehensive student event registration page."],
            ["Days 14–16", "Semantic HTML Layout Architecture", "Create a multi-column tech blog layout with header, nav, and aside."],
            ["Days 17–19", "Audio + Video + Sandboxed iframes", "Build a multimedia showcase with native players and fallbacks."],
            ["Days 20–22", "Accessibility (WCAG) + Technical SEO", "Audit and enhance previous pages for screen readers and search bots."],
            ["Days 23–25", "Inline SVG + Details/Summary + Dialog", "Create an interactive product FAQ and terms modal."],
            ["Days 26–28", "Folder Architecture + W3C Validation", "Refactor project files into clean folders and eliminate all W3C warnings."],
            ["Days 29–30", "Final Comprehensive Capstone Project", "Build and deploy a complete 5-page production website."]
          ]
        },
        subsections: [
          {
            title: "Project 1 — Personal Profile (HTML Only)",
            content: "What to build: A clean single-page profile with <h1> heading, profile picture (<img> with alt), bio paragraphs, skills bullet list (<ul>), and social links (<a>)."
          },
          {
            title: "Project 2 — College Timetable & Gradebook (HTML Only)",
            content: "What to build: A multi-column timetable using <table>, <caption>, <thead>, <tbody>, <th> with scope='col', and formatted marks."
          },
          {
            title: "Project 3 — Student Registration Portal (HTML + Validation)",
            content: "What to build: An interactive registration form with name, email, password, course dropdown (<select>), gender radio group, terms checkbox, and submit button."
          },
          {
            title: "Project 4 — Restaurant Menu Card (Semantic HTML + CSS)",
            content: "What to build: A multi-course restaurant menu using semantic <section>, <article> cards for food items, item descriptions, price tags, and dietary badges."
          },
          {
            title: "Project 5 — Travel Agency Multi-Page Portal (HTML + CSS + JS)",
            content: "What to build: A 5-page site (Home, Destinations, Packages, Booking, Contact) with unified navigation, responsive layouts, booking form, and FAQ accordion."
          },
          {
            title: "Project 6 — Student Developer Portfolio (HTML + CSS + JS)",
            content: "What to build: A personal engineering portfolio showcasing featured projects, skill progress bars, contact inquiry form, and WCAG AA accessibility compliance."
          },
          {
            title: "Project 7 — Full-Stack Starter (HTML + Node.js / Express)",
            content: "What to build: A frontend form that dispatches POST requests to an Express.js API endpoint, validates the payload, saves records to SQLite or Postgres, and renders confirmation."
          }
        ]
      },
      {
        id: "final-revision-checklist",
        title: "Final Revision Questions & Production Launch Checklist",
        content: "Test your understanding with these comprehensive revision questions and run through the pre-launch checklist before releasing any website.",
        subsections: [
          {
            title: "15 Key Revision Concepts",
            content: "1. What does HTML stand for? HyperText Markup Language.\n2. Tag vs Element: A tag is the markup token (<p>); an element includes the opening tag, content, and closing tag (<p>Text</p>).\n3. Purpose of <!DOCTYPE html>: Tells the browser to render using modern HTML5 standards rather than legacy quirks mode.\n4. id vs class: 'id' must be unique per page; 'class' is reusable across multiple elements.\n5. Importance of alt text: Screen-readers announce it to visually impaired users; browsers display it if images fail to load; search engines index it for SEO.\n6. Button vs Link: Use <a> for navigating to a new URL; use <button> for triggering client actions.\n7. Semantic HTML: Tags that convey explicit meaning about content structure to browsers and search crawlers.\n8. Purpose of <label>: Connects accessible text to form controls and expands clickable touch targets.\n9. Why tables shouldn't be used for layout: Breaks screen readers, complicates responsiveness, and produces bloated markup.\n10. Viewport meta tag: Directs mobile browsers to scale viewport dimensions to the physical device width at 1:1 ratio.\n11. SVG vs Canvas: SVG is vector/DOM-based; Canvas is a scriptable pixel raster drawing surface.\n12. Server-side validation requirement: Client-side validation is easily bypassed; servers must enforce security.\n13. No secrets in frontend: Frontend code is public; users can view all code and comments via browser DevTools.\n14. How semantics aid maintainability: Teams can immediately recognize layout sections (<header>, <nav>, <article>) without deciphering classes.\n15. Multi-page organization: Use an index.html entry point, a /pages subfolder for secondary views, and /assets for images/css/js."
          },
          {
            title: "Production Launch Checklist (12-Point Gate)",
            content: "☐ 1. At least 5 pages connected with valid, tested hyperlinks.\n☐ 2. Consistent header, navigation, and footer structure across all views.\n☐ 3. Semantic HTML elements (<header>, <nav>, <main>, <article>, <footer>) used throughout.\n☐ 4. All meaningful images have informative alt text; decorative images have alt=''.\n☐ 5. All form controls are explicitly paired with <label for='...'> tags.\n☐ 6. Zero duplicate 'id' attribute values across the document.\n☐ 7. Clean, consistent code indentation and maintainable BEM naming conventions.\n☐ 8. Mobile viewport meta tag correctly declared in the <head>.\n☐ 9. Unique descriptive <title> and meta description tags on every page.\n☐ 10. Code validated using W3C Markup Validator with zero critical errors.\n☐ 11. Zero secrets, API keys, or passwords in frontend code or comments.\n☐ 12. CSS and JavaScript cleanly separated from HTML files."
          }
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between an HTML tag and an HTML element?",
        answer: "A tag is a syntax markup token enclosed in angle brackets, such as <p> or </p>. An element refers to the complete unit consisting of the opening tag, attributes, child content, and closing tag (e.g., <p class='lead'>Hello</p>). Void elements like <img> do not require closing tags."
      },
      {
        question: "When should I use a <button> instead of an anchor <a> tag?",
        answer: "Follow the simple navigation vs action rule: If clicking it changes the URL or navigates the user to another page or section, use an <a> tag. If clicking it performs an action (such as opening a modal dialog, toggling an accordion, submitting a form, or deleting an item), use a <button type='button'> tag."
      },
      {
        question: "Why is the viewport meta tag mandatory on modern websites?",
        answer: "Without '<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">', mobile browsers assume the page is designed exclusively for desktop monitors and render it zoomed out at a default 980px viewport width, making text illegibly small and breaking responsive CSS media queries."
      },
      {
        question: "Why should tables never be used to structure website layout?",
        answer: "In the 1990s, developers used tables for layout before CSS was standardized. Doing so today ruins accessibility because screen readers announce row and column coordinates for layout blocks, severely slows down DOM rendering, and makes mobile responsiveness nearly impossible. Tables must be reserved strictly for multidimensional tabular data."
      },
      {
        question: "Why is client-side HTML validation insufficient for security?",
        answer: "HTML5 constraints (like required, type='email', and minlength) exist solely for user experience and immediate feedback. Anyone can disable browser validation in DevTools or send malicious requests directly to your server via curl or Postman. The backend server must always independently validate, sanitize, and authenticate incoming payloads."
      }
    ],
    practiceQuestions: [
      {
        id: "q-html-1",
        question: "Which meta tag is required for responsive mobile layouts?",
        type: "multiple-choice",
        options: [
          "<meta charset='UTF-8'>",
          "<meta name='viewport' content='width=device-width, initial-scale=1.0'>",
          "<meta http-equiv='X-UA-Compatible' content='IE=edge'>",
          "<meta name='robots' content='index, follow'>"
        ],
        correctAnswer: "<meta name='viewport' content='width=device-width, initial-scale=1.0'>",
        explanation: "The viewport meta tag tells mobile browsers to set the viewport width equal to the physical device width and initial zoom to 1.0."
      },
      {
        id: "q-html-2",
        question: "What is the primary difference between HTML and a programming language like JavaScript or Python?",
        type: "multiple-choice",
        options: [
          "HTML cannot be read by web browsers",
          "HTML is a markup language for structure and meaning, with no conditional branching or variables",
          "HTML can only be written on Windows computers",
          "HTML requires a compiler like C++ before running"
        ],
        correctAnswer: "HTML is a markup language for structure and meaning, with no conditional branching or variables",
        explanation: "HTML is a markup declaration language that gives content structural semantics. It is not a programming language."
      },
      {
        id: "q-html-3",
        question: "Which of the following is considered a void element that cannot contain closing tags or child content?",
        type: "multiple-choice",
        options: [
          "<article>",
          "<section>",
          "<img>",
          "<form>"
        ],
        correctAnswer: "<img>",
        explanation: "<img>, <input>, <br>, <hr>, <meta>, and <link> are void elements and cannot enclose children."
      },
      {
        id: "q-html-4",
        question: "When should an engineer choose <button> instead of an anchor <a> link?",
        type: "multiple-choice",
        options: [
          "Whenever you want the text to be colored blue",
          "When the element performs an in-page action (e.g., opening a modal or submitting) rather than navigating to a URL",
          "Only when submitting forms",
          "There is no difference between <a> and <button>"
        ],
        correctAnswer: "When the element performs an in-page action (e.g., opening a modal or submitting) rather than navigating to a URL",
        explanation: "Rule: Navigation ➔ <a> tag. Action ➔ <button> tag."
      },
      {
        id: "q-html-5",
        question: "Why should sensitive credentials (such as API keys or database passwords) never be written in HTML or frontend code?",
        type: "multiple-choice",
        options: [
          "HTML files cannot store letters and numbers",
          "Frontend code and comments are delivered directly to the browser and can be inspected by anyone in DevTools",
          "Search engines automatically delete HTML files with passwords",
          "The browser will refuse to load any page with credentials"
        ],
        correctAnswer: "Frontend code and comments are delivered directly to the browser and can be inspected by anyone in DevTools",
        explanation: "Everything delivered to the client browser is completely public. Private secrets must always remain on a secure backend server."
      }
    ],
    relatedNoteSlugs: ["semantic-html-complete-guide", "forms-tables-lists-accessibility", "css-selectors-specificity-box-model"]
  },

  // ─────────────────────────────────────────────────────────────
  // 3. CSS: Selectors, Specificity & Box Model
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-css-box-model",
    slug: "css-selectors-specificity-box-model",
    title: "CSS Selectors, Specificity & The Box Model",
    shortDescription: "A comprehensive guide to the CSS Cascade, specificity calculation, border-box vs content-box, margins, paddings, and borders.",
    category: "Web Development",
    subCategory: "CSS",
    topic: "Core CSS & Layout Mechanics",
    difficulty: "Beginner",
    readingTime: "11 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/css-flexbox-grid-cheatsheet.pdf",
      filename: "css-flexbox-grid-cheatsheet.pdf",
      fileSize: "5.5 KB",
      pageCount: 2,
      language: "English"
    },
    tags: ["CSS", "Box Model", "Specificity", "Cascade", "Selectors"],
    tableOfContents: [
      { id: "box-model", title: "1. The CSS Box Model Demystified", level: 2 },
      { id: "box-sizing", title: "2. The Golden Rule: box-sizing: border-box", level: 2 },
      { id: "specificity", title: "3. Specificity Calculator & Hierarchy", level: 2 },
      { id: "margin-collapse", title: "4. Margin Collapse Traps", level: 2 },
      { id: "faq", title: "5. Frequently Asked Questions", level: 2 }
    ],
    introduction: "CSS is deceptively simple at first glance, but without mastering the Box Model and Specificity, developers spend hours wrestling with mysterious sizing bugs and overridden rules.",
    sections: [
      {
        id: "box-model",
        title: "1. The CSS Box Model Demystified",
        content: "Every element on a webpage is rendered as a rectangular box. The Box Model consists of four concentric layers:",
        diagram: {
          type: "architecture",
          title: "Concentric Layers of the CSS Box Model",
          items: [
            { title: "Margin", desc: "Transparent area outside the border separating neighboring elements.", badge: "Outer" },
            { title: "Border", desc: "Stroke wrapping around padding and content.", badge: "Boundary" },
            { title: "Padding", desc: "Clear space between content and border.", badge: "Inner Spacing" },
            { title: "Content", desc: "The core text, image, or video itself (width & height).", badge: "Core" }
          ]
        }
      },
      {
        id: "box-sizing",
        title: "2. The Golden Rule: box-sizing: border-box",
        content: "By default in legacy CSS (content-box), setting width: 300px with padding: 20px and border: 2px makes the total rendered width 344px (300 + 40 + 4). This breaks layout mathematics. Using border-box fixes this completely.",
        codeSnippet: {
          language: "css",
          title: "Universal Box-Sizing Reset",
          code: `/* The Universal Modern CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Now a 300px card stays exactly 300px! */
.card {
  width: 300px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #0A0A1A;
}`,
          explanation: "With border-box, padding and border are subtracted from the interior content box rather than expanding the outer box dimension."
        }
      },
      {
        id: "specificity",
        title: "3. Specificity Calculator & Hierarchy",
        content: "When conflicting CSS rules target the same element, browsers calculate specificity weight:",
        table: {
          title: "Specificity Weight Hierarchy",
          headers: ["Selector Type", "Weight (A, B, C)", "Example Selector"],
          rows: [
            ["Inline Styles", "1, 0, 0, 0", "style='color: gold;'"],
            ["ID Selectors", "0, 1, 0, 0", "#main-nav"],
            ["Class / Pseudo-class / Attribute", "0, 0, 1, 0", ".card, :hover, [type='text']"],
            ["Element / Pseudo-element", "0, 0, 0, 1", "div, h1, p, ::before"],
            ["Universal / Inherited", "0, 0, 0, 0", "*, body *"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Why should I avoid using !important in CSS?",
        answer: "!important breaks the natural cascade and specificity rules. It creates maintenance nightmares where future developers must write even more !important rules to override styles."
      }
    ],
    practiceQuestions: [
      {
        id: "q-css-1",
        question: "With box-sizing: border-box, what is the total rendered width of an element with width: 200px, padding: 15px, border: 2px, and margin: 10px?",
        type: "multiple-choice",
        options: ["234px", "200px", "220px", "217px"],
        correctAnswer: "200px",
        explanation: "With border-box, padding and border are absorbed inside the defined 200px width. Margins exist outside the box boundary."
      }
    ],
    relatedNoteSlugs: ["css-flexbox-grid-mastery", "responsive-design-media-queries-animations", "html-basics-document-structure"]
  },

  // ─────────────────────────────────────────────────────────────
  // 4. JAVASCRIPT: Promises, Async/Await & Fetch
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-js-async",
    slug: "javascript-promises-async-await",
    title: "JavaScript Promises, Async/Await & Fetching APIs",
    shortDescription: "Master asynchronous JavaScript: Event Loop, Microtask vs Macrotask queues, Promise chaining, async/await syntax, and error handling.",
    category: "JavaScript",
    topic: "Asynchronous JavaScript & Network APIs",
    difficulty: "Intermediate",
    readingTime: "13 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/javascript-modern-guide.pdf",
      filename: "javascript-modern-guide.pdf",
      fileSize: "5.7 KB",
      pageCount: 2,
      language: "English"
    },
    tags: ["JavaScript", "Promises", "Async/Await", "Fetch API", "Event Loop"],
    tableOfContents: [
      { id: "event-loop", title: "1. The Single-Threaded Event Loop", level: 2 },
      { id: "promises-anatomy", title: "2. The Anatomy of a Promise", level: 2 },
      { id: "async-await", title: "3. Clean Async/Await Patterns", level: 2 },
      { id: "parallel-promises", title: "4. Concurrency: Promise.all vs allSettled", level: 2 },
      { id: "error-handling", title: "5. Robust Error Handling Strategies", level: 2 },
      { id: "faq", title: "6. Frequently Asked Questions", level: 2 }
    ],
    introduction: "JavaScript is single-threaded, meaning it can only execute one command at a time. Yet it powers real-time chat, streaming media, and high-frequency API requests without freezing the user interface. It achieves this concurrency through the Event Loop and Asynchronous APIs.",
    sections: [
      {
        id: "event-loop",
        title: "1. The Single-Threaded Event Loop",
        content: "The JavaScript runtime consists of a Call Stack, Web APIs (provided by the browser/Node.js), a Microtask Queue (Promises, queueMicrotask), and a Macrotask Queue (setTimeout, setInterval, I/O).",
        diagram: {
          type: "flowchart",
          title: "Event Loop Task Processing Priority",
          items: [
            { title: "Call Stack", desc: "Executes synchronous statements sequentially until empty", badge: "Immediate" },
            { title: "Microtask Queue", desc: "Executes ALL Promise resolutions before rendering", badge: "High Priority" },
            { title: "Browser Render", desc: "Repaints screen if scheduled (60Hz / 120Hz)", badge: "Display Frame" },
            { title: "Macrotask Queue", desc: "Picks ONE timer/IO callback, then cycles back to Call Stack", badge: "Normal Priority" }
          ]
        }
      },
      {
        id: "async-await",
        title: "3. Clean Async/Await Patterns",
        content: "Async/await is syntactic sugar over native Promises, turning nested .then() callback chains into readable synchronous-looking code.",
        codeSnippet: {
          language: "typescript",
          title: "Production Fetch Wrapper with Timeout & Status Checks",
          code: `async function fetchLearningNotes(category: string, signal?: AbortSignal) {
  try {
    const response = await fetch(\`/api/notes?category=\${encodeURIComponent(category)}\`, {
      method: "GET",
      headers: { "Accept": "application/json" },
      signal, // Enables cancellation if component unmounts
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    return { success: true, notes: data.notes };
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("Fetch request aborted.");
      return { success: false, aborted: true };
    }
    console.error("Failed to fetch notes:", error.message);
    return { success: false, error: error.message };
  }
}`,
          explanation: "Notice the error handling: fetch() does not reject on HTTP 404 or 500 status codes; you must explicitly check response.ok."
        }
      },
      {
        id: "parallel-promises",
        title: "4. Concurrency: Promise.all vs allSettled",
        content: "Avoid waterfall requests where independent calls wait for each other unnecessarily:",
        codeSnippet: {
          language: "javascript",
          title: "Parallel Concurrency with Promise.all",
          code: `// SLOW WATERFALL (Total time = 300ms + 400ms = 700ms)
const user = await fetchUser();
const notes = await fetchNotes();

// FAST PARALLEL (Total time = max(300ms, 400ms) = 400ms)
const [user, notes] = await Promise.all([
  fetchUser(),
  fetchNotes(),
]);`,
          explanation: "Promise.all executes both network operations in parallel on the browser networking layer."
        }
      }
    ],
    faqs: [
      {
        question: "Why doesn't fetch() throw an error on 404 Not Found?",
        answer: "fetch() only rejects when a network failure occurs (e.g. offline, DNS failure, CORS block). An HTTP 404 or 500 is considered a successful HTTP transaction with error status."
      }
    ],
    practiceQuestions: [
      {
        id: "q-async-1",
        question: "In what order will the numbers 1, 2, 3, 4 log to the console?",
        type: "coding-challenge",
        codeStarter: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
        solutionHint: "Synchronous logs run first (1, 4), then Microtasks (3), then Macrotasks (2).",
        explanation: "1, 4 (Call Stack), then 3 (Microtask Queue from Promise), then 2 (Macrotask Queue from setTimeout)."
      }
    ],
    relatedNoteSlugs: ["javascript-variables-data-types-operators", "react-hooks-event-handling", "rest-apis-design-architecture"]
  },

  // ─────────────────────────────────────────────────────────────
  // 8. REACT: Components, Props & State
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-react-basics",
    slug: "react-components-props-state",
    title: "React Components, Props & State Mastery",
    shortDescription: "A comprehensive guide to React's declarative component architecture, immutable state, unidirectional data flow, and props.",
    category: "React",
    topic: "React Core Foundations",
    difficulty: "Beginner",
    readingTime: "12 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/react-hooks-architecture-handbook.pdf",
      filename: "react-hooks-architecture-handbook.pdf",
      fileSize: "6.0 KB",
      pageCount: 2,
      language: "English"
    },
    tags: ["React", "Components", "Props", "State", "Hooks"],
    tableOfContents: [
      { id: "declarative-ui", title: "1. The Declarative UI Paradigm", level: 2 },
      { id: "props-vs-state", title: "2. Props vs State Demystified", level: 2 },
      { id: "immutability", title: "3. The Golden Rule of State Immutability", level: 2 },
      { id: "lifting-state", title: "4. Lifting State Up Between Components", level: 2 },
      { id: "practice", title: "5. Practice Exercise", level: 2 }
    ],
    introduction: "React revolutionized frontend web development by replacing imperative DOM manipulation (document.getElementById, element.appendChild) with declarative components that automatically synchronize with underlying data state.",
    sections: [
      {
        id: "props-vs-state",
        title: "2. Props vs State Demystified",
        content: "Understanding the difference between Props (external inputs) and State (internal memory) is the foundation of React engineering:",
        table: {
          title: "Props vs State Comparison",
          headers: ["Attribute", "Props (Properties)", "State"],
          rows: [
            ["Ownership", "Passed in by parent component", "Created and owned within the component"],
            ["Mutability", "Read-Only (Immutable by the receiving child)", "Mutable only via state setter function"],
            ["Purpose", "Configure child components and pass callbacks", "Hold interactive data that changes over time"],
            ["Re-render Trigger", "Changes in parent props trigger child re-render", "Calling setter function triggers component re-render"]
          ]
        }
      },
      {
        id: "immutability",
        title: "3. The Golden Rule of State Immutability",
        content: "In React, state values are immutable. You must never mutate arrays or objects directly; always return new references via spread syntax or array methods.",
        codeSnippet: {
          language: "tsx",
          title: "Immutable State Updates in React",
          code: `// WRONG: Direct Mutation (React will NOT re-render!)
const [notes, setNotes] = useState([{ id: 1, title: "HTML" }]);
notes.push({ id: 2, title: "CSS" }); // BUG!
setNotes(notes);

// CORRECT: Creating a New Array Reference
setNotes(prevNotes => [
  ...prevNotes,
  { id: 2, title: "CSS" }
]);

// UPDATING OBJECT STATE IMMUTABLY
setUser(prev => ({
  ...prev,
  preferences: {
    ...prev.preferences,
    theme: "dark"
  }
}));`,
          explanation: "React relies on Object.is reference equality to detect state changes. If you mutate the existing object, the reference remains identical and React skips re-rendering."
        }
      }
    ],
    faqs: [
      {
        question: "Why should keys in React lists be unique IDs instead of index?",
        answer: "Using array indices as keys causes subtle UI bugs when items are filtered, deleted, or reordered. Stable IDs allow React's reconciliation engine to preserve component state and DOM focus correctly."
      }
    ],
    practiceQuestions: [
      {
        id: "q-react-1",
        question: "What happens if you mutate state directly without calling its setter function in React?",
        type: "multiple-choice",
        options: [
          "React crashes with an immediate fatal compiler error",
          "React skips re-rendering because reference equality check detects no change",
          "React automatically rolls back the mutation",
          "The browser page refreshes"
        ],
        correctAnswer: "React skips re-rendering because reference equality check detects no change",
        explanation: "React checks if oldState === newState. Mutating the same object in place keeps the memory address identical, preventing re-renders."
      }
    ],
    relatedNoteSlugs: ["react-hooks-event-handling", "nextjs-app-router-layouts", "javascript-functions-arrays-objects"]
  },

  // ─────────────────────────────────────────────────────────────
  // 9. NEXT.JS: App Router & Layout Architecture
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-nextjs-app-router",
    slug: "nextjs-app-router-layouts",
    title: "Next.js App Router & Layout Architecture",
    shortDescription: "Master Next.js App Router: file-system routing conventions, nested layouts, loading skeletons, error boundaries, and streaming SSR.",
    category: "Next.js",
    topic: "Next.js Full-Stack Architecture",
    difficulty: "Intermediate",
    readingTime: "15 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/nextjs-app-router-guide.pdf",
      filename: "nextjs-app-router-guide.pdf",
      fileSize: "6.2 KB",
      pageCount: 2,
      language: "English"
    },
    tags: ["Next.js", "App Router", "Layouts", "RSC", "SSR", "SEO"],
    tableOfContents: [
      { id: "app-router-mental-model", title: "1. The App Router Mental Model", level: 2 },
      { id: "special-files", title: "2. Special File System Conventions", level: 2 },
      { id: "nested-layouts", title: "3. Nested Layouts & State Preservation", level: 2 },
      { id: "dynamic-segments", title: "4. Dynamic Routes & Static Params", level: 2 },
      { id: "faq", title: "5. Frequently Asked Questions", level: 2 }
    ],
    introduction: "The Next.js App Router represents a massive architectural leap for React applications, bringing React Server Components (RSC), nested layouts, streaming responses, and edge optimization directly into the core framework.",
    sections: [
      {
        id: "app-router-mental-model",
        title: "1. The App Router Mental Model",
        content: "By default, all components inside the app/ directory are React Server Components (RSC). They render on the server, fetch data without exposing private endpoints, and stream zero JavaScript to client bundles unless marked with 'use client'.",
        table: {
          title: "Special File Roles in Next.js App Router",
          headers: ["Filename", "Segment Role", "Behavior on Route Transition"],
          rows: [
            ["layout.tsx", "Shared UI shell for route & children", "Preserved and does NOT re-render during child navigation"],
            ["page.tsx", "Unique view rendered at that path", "Replaced when navigating between different routes"],
            ["loading.tsx", "Instant loading skeleton fallback", "Wrapped automatically in React Suspense boundary"],
            ["error.tsx", "Client-side error boundary fallback", "Catches runtime exceptions in child subtrees"],
            ["not-found.tsx", "Custom 404 page for unmatched paths", "Triggered automatically or via notFound() function"]
          ]
        }
      },
      {
        id: "dynamic-segments",
        title: "4. Dynamic Routes & Static Params",
        content: "Dynamic segment routes like app/blog/[slug]/page.tsx allow rendering an unlimited number of notes while maintaining lightning-fast performance through generateStaticParams:",
        codeSnippet: {
          language: "tsx",
          title: "Dynamic Note Route with Static Generation in Next.js",
          code: `// app/blog/[slug]/page.tsx
import { getAllNotes, getNoteBySlug } from "@/data/notes";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// 1. Tell Next.js all slugs to pre-render at build time
export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

// 2. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return { title: "Note Not Found" };

  return {
    title: \`\${note.title} | SLRJ Digital\`,
    description: note.shortDescription,
    alternates: { canonical: \`https://slrjdigital.in/notes/\${slug}\` },
  };
}

// 3. Page Component
export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return <article><h1>{note.title}</h1>{/* Content */}</article>;
}`,
          explanation: "generateStaticParams enables Next.js to pre-render all educational notes as static HTML during npm run build, delivering 0ms server response times from CDN caches."
        }
      }
    ],
    faqs: [
      {
        question: "When should I add 'use client' to a file?",
        answer: "Only add 'use client' when a component needs client-side interactivity: useState, useEffect, onClick handlers, browser APIs (localStorage, window), or custom interactive hooks."
      }
    ],
    practiceQuestions: [
      {
        id: "q-next-1",
        question: "Which file provides shared UI across sibling routes that persists across page navigations without re-rendering?",
        type: "multiple-choice",
        options: ["page.tsx", "layout.tsx", "template.tsx", "loading.tsx"],
        correctAnswer: "layout.tsx",
        explanation: "Layouts maintain their state, preserve scroll position, and do not re-render when navigating between sub-routes."
      }
    ],
    relatedNoteSlugs: ["react-components-props-state", "nextjs-server-client-components-fetching", "nextjs-metadata-seo-deployment"]
  },

  // ─────────────────────────────────────────────────────────────
  // 10. GIT & GITHUB: Git Fundamentals & Workflow
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-git-fundamentals",
    slug: "git-fundamentals-commands-guide",
    title: "Git Fundamentals & Essential Commands Guide",
    shortDescription: "A developer's guide to version control: repository initialization, staging, atomic commits, commit logs, and difference tracking.",
    category: "Git & GitHub",
    topic: "Version Control Systems",
    difficulty: "Beginner",
    readingTime: "10 min read",
    lastUpdated: "October 2026",
    isFeatured: false,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/git-github-essential-workflow.pdf",
      filename: "git-github-essential-workflow.pdf",
      fileSize: "5.7 KB",
      pageCount: 2,
      language: "English"
    },
    tags: ["Git", "GitHub", "Version Control", "CLI", "Workflows"],
    tableOfContents: [
      { id: "three-trees", title: "1. The Three Stages of Git Architecture", level: 2 },
      { id: "core-commands", title: "2. The Essential Command Sequence", level: 2 },
      { id: "conventional-commits", title: "3. Writing Professional Commit Messages", level: 2 },
      { id: "git-rescue", title: "4. Git Rescue Cheatsheet", level: 2 },
      { id: "faq", title: "5. Frequently Asked Questions", level: 2 }
    ],
    introduction: "Git is the ubiquitous version control system underpinning the global software industry. Learning Git thoroughly allows engineers to experiment freely, collaborate without overwriting teammates' work, and roll back regressions safely.",
    sections: [
      {
        id: "three-trees",
        title: "1. The Three Stages of Git Architecture",
        content: "Locally, Git tracks files across three distinct states:",
        diagram: {
          type: "flowchart",
          title: "The Three Git Workspaces",
          items: [
            { title: "Working Directory", desc: "Files on your local disk currently being edited", badge: "Untracked / Modified" },
            { title: "Staging Area (Index)", desc: "Files marked with git add ready for next atomic snapshot", badge: "Staged" },
            { title: "Git Repository (.git)", desc: "Permanent committed snapshots in local database", badge: "Committed" }
          ]
        }
      },
      {
        id: "core-commands",
        title: "2. The Essential Command Sequence",
        content: "Master the standard daily command cycle:",
        codeSnippet: {
          language: "bash",
          title: "Daily Git Workflow Commands",
          code: `# Check status of modified and staged files
git status

# Stage specific files or entire directory
git add app/blog/ data/notes.ts

# Commit with a clear, concise Conventional Commit message
git commit -m "feat(blog): implement responsive notes listing and search"

# Inspect visual compact history
git log --oneline --graph -n 10

# Push local commits to remote GitHub repository
git push origin feature/blog-enhancements`,
          explanation: "Atomic commits keep each commit focused on one cohesive task, making code review and debugging straightforward."
        }
      }
    ],
    faqs: [
      {
        question: "What is the difference between git reset and git revert?",
        answer: "git reset moves branch pointers backward, effectively rewriting local history. git revert creates a brand-new commit that inverses the changes of a previous commit, making it safe for public shared branches."
      }
    ],
    practiceQuestions: [
      {
        id: "q-git-1",
        question: "Which command moves modified files from the Working Directory into the Staging Area?",
        type: "multiple-choice",
        options: ["git commit", "git push", "git add", "git checkout"],
        correctAnswer: "git add",
        explanation: "git add stages selected modifications into the index in preparation for committing."
      }
    ],
    relatedNoteSlugs: ["git-branching-merging-collaboration", "vercel-deployment-domains-dns"]
  },

  // ─────────────────────────────────────────────────────────────
  // 11. BACKEND: RESTful API Design & Best Practices
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-rest-apis",
    slug: "rest-apis-design-architecture",
    title: "RESTful API Design & Architectural Best Practices",
    shortDescription: "Learn to design scalable, secure RESTful APIs: HTTP verbs, status code conventions, JSON schemas, idempotency, and versioning.",
    category: "Backend & Databases",
    topic: "API Architecture & HTTP Standards",
    difficulty: "Intermediate",
    readingTime: "13 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/rest-apis-backend-handbook.pdf",
      filename: "rest-apis-backend-handbook.pdf",
      fileSize: "6.2 KB",
      pageCount: 2,
      language: "English"
    },
    tags: ["Backend", "REST APIs", "Node.js", "HTTP", "Architecture"],
    tableOfContents: [
      { id: "rest-principles", title: "1. Core Principles of REST Architecture", level: 2 },
      { id: "http-verbs", title: "2. HTTP Verbs & Idempotency", level: 2 },
      { id: "status-codes", title: "3. The HTTP Status Code Taxonomy", level: 2 },
      { id: "payload-validation", title: "4. Input Validation & Security", level: 2 },
      { id: "faq", title: "5. Frequently Asked Questions", level: 2 }
    ],
    introduction: "APIs (Application Programming Interfaces) are the communicative bridge connecting web frontends, mobile applications, and third-party integrations with server databases. Adhering to REST principles ensures predictable, maintainable endpoints.",
    sections: [
      {
        id: "http-verbs",
        title: "2. HTTP Verbs & Idempotency",
        content: "RESTful architectures leverage standard HTTP methods to express desired actions upon resources:",
        table: {
          title: "HTTP Verbs and Idempotency Rules",
          headers: ["Method", "Action", "Idempotent?", "Safe?"],
          rows: [
            ["GET", "Retrieve resource(s)", "Yes", "Yes (No side-effects)"],
            ["POST", "Create a new subordinate resource", "No (Repeated calls create duplicates)", "No"],
            ["PUT", "Completely replace an existing resource", "Yes (Repeated calls result in same state)", "No"],
            ["PATCH", "Partially update specific fields", "No (Depends on operation)", "No"],
            ["DELETE", "Remove the resource", "Yes (Deleting once or ten times has same end state)", "No"]
          ]
        }
      },
      {
        id: "status-codes",
        title: "3. The HTTP Status Code Taxonomy",
        content: "Always return accurate HTTP status codes rather than masking failures inside { status: 200, error: 'Failed' } payloads:",
        table: {
          title: "Essential Status Codes",
          headers: ["Code", "Category", "Meaning & Use Case"],
          rows: [
            ["200 OK", "Success", "Standard successful response for GET, PUT, or PATCH"],
            ["201 Created", "Success", "Resource successfully created via POST"],
            ["204 No Content", "Success", "Action succeeded but response body is intentionally empty (e.g. DELETE)"],
            ["400 Bad Request", "Client Error", "Invalid request body schema, missing required parameters"],
            ["401 Unauthorized", "Client Error", "Authentication credentials missing or invalid"],
            ["403 Forbidden", "Client Error", "Authenticated, but caller lacks sufficient authorization/role"],
            ["404 Not Found", "Client Error", "Requested resource does not exist at specified URI"],
            ["500 Internal Error", "Server Error", "Unhandled exception thrown in server execution logic"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Why should API URIs use nouns instead of verbs?",
        answer: "In REST, the URI specifies the resource noun (e.g. /api/notes), while the HTTP method specifies the verb action (GET, POST, DELETE). Writing /api/getNotes duplicates the HTTP verb and violates REST conventions."
      }
    ],
    practiceQuestions: [
      {
        id: "q-api-1",
        question: "Which HTTP status code should be returned when a new note resource is successfully created via a POST request?",
        type: "multiple-choice",
        options: ["200 OK", "201 Created", "204 No Content", "301 Moved Permanently"],
        correctAnswer: "201 Created",
        explanation: "HTTP 201 explicitly signifies that a new resource was created as a result of the request."
      }
    ],
    relatedNoteSlugs: ["nodejs-backend-fundamentals", "databases-sql-nosql-security", "javascript-promises-async-await"]
  },

  // ─────────────────────────────────────────────────────────────
  // 12. DEPLOYMENT: Vercel & Production DNS
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-deployment-vercel",
    slug: "vercel-deployment-domains-dns",
    title: "Production Deployment on Vercel & Custom DNS Setup",
    shortDescription: "Deploy Next.js apps with automated CI/CD pipelines, configure custom domains, root A records, CNAME subdomains, and SSL certificates.",
    category: "Deployment",
    topic: "Production Infrastructure & DevOps",
    difficulty: "Intermediate",
    readingTime: "10 min read",
    lastUpdated: "October 2026",
    isFeatured: false,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/nextjs-app-router-guide.pdf",
      filename: "nextjs-app-router-guide.pdf",
      fileSize: "6.2 KB",
      pageCount: 2,
      language: "English"
    },
    tags: ["Deployment", "Vercel", "DNS", "Domains", "SSL", "DevOps"],
    tableOfContents: [
      { id: "git-integration", title: "1. Automated Git CI/CD Deployments", level: 2 },
      { id: "dns-records", title: "2. Configuring Custom DNS (A & CNAME)", level: 2 },
      { id: "env-vars", title: "3. Managing Production Secrets", level: 2 },
      { id: "troubleshooting", title: "4. Production Troubleshooting", level: 2 },
      { id: "faq", title: "5. Frequently Asked Questions", level: 2 }
    ],
    introduction: "Building high-performance web applications is only half the battle. Delivering your application to users worldwide requires automated cloud deployments, custom domain routing, SSL certificate provisioning, and edge caching.",
    sections: [
      {
        id: "dns-records",
        title: "2. Configuring Custom DNS (A & CNAME)",
        content: "To point your registered domain (e.g. slrjdigital.in) to your hosting provider:",
        table: {
          title: "Standard DNS Record Configurations",
          headers: ["Record Type", "Name / Host", "Target Value", "Purpose"],
          rows: [
            ["A Record", "@ (root domain)", "76.76.21.21 (Vercel IP)", "Points apex domain directly to edge load balancer"],
            ["CNAME Record", "www (subdomain)", "cname.vercel-dns.com", "Aliases www subdomain to main distribution"],
            ["TXT Record", "_vercel", "vc-domain-verify=...", "Proves domain ownership during SSL provisioning"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "How long does DNS propagation take?",
        answer: "DNS changes typically propagate globally within 5 to 60 minutes, though in rare circumstances with high TTL values it can take up to 24-48 hours."
      }
    ],
    practiceQuestions: [
      {
        id: "q-dep-1",
        question: "Which DNS record type is used to map a subdomain (like www.slrjdigital.in) to another hostname?",
        type: "multiple-choice",
        options: ["A Record", "CNAME Record", "MX Record", "PTR Record"],
        correctAnswer: "CNAME Record",
        explanation: "CNAME (Canonical Name) aliases one domain name to another canonical domain name."
      }
    ],
    relatedNoteSlugs: ["nextjs-metadata-seo-deployment", "how-the-internet-works"]
  },
  // ─────────────────────────────────────────────────────────────
  // 13. DSA: Arrays, Hash Maps & Big-O Notation
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-dsa-arrays",
    slug: "dsa-arrays-time-complexity",
    title: "Data Structures: Arrays, Hash Maps & Time Complexity (Big-O)",
    shortDescription: "Master asymptotic notation, memory layout of contiguous arrays, hash table collision resolution, and interview two-pointer patterns.",
    category: "Data Structures & Algorithms",
    topic: "Asymptotic Analysis, Arrays & Hashing",
    difficulty: "Intermediate",
    readingTime: "15 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/dsa-complete-handbook.pdf",
      filename: "dsa-complete-handbook.pdf",
      fileSize: "6.8 KB",
      pageCount: 2,
      language: "English",
      slug: "dsa-complete-handbook"
    },
    tableOfContents: [
      { id: "big-o-notation", title: "1. Understanding Big-O, Omega & Theta", level: 2 },
      { id: "array-memory-layout", title: "2. Array Memory Layout & Dynamic Resizing", level: 2 },
      { id: "hash-maps-collisions", title: "3. Hash Maps & Collision Resolution O(1)", level: 2 },
      { id: "two-pointer-patterns", title: "4. Two-Pointer & Sliding Window Interview Patterns", level: 2 }
    ],
    introduction: "In technical software engineering interviews, choosing the optimal data structure separates working code from scalable systems. This guide demystifies asymptotic complexity and explains how contiguous memory arrays and hash maps achieve constant-time lookups.",
    sections: [
      {
        id: "big-o-notation",
        title: "1. Understanding Big-O, Omega & Theta",
        content: "Asymptotic analysis evaluates algorithm execution time and auxiliary memory consumption as input size N grows toward infinity. Big-O characterizes the mathematical upper bound (worst-case), Big-Omega defines the lower bound (best-case), and Big-Theta represents the tight bound where upper and lower bounds coincide.",
        codeSnippet: {
          language: "javascript",
          title: "Time Complexity Hierarchy Comparison",
          code: "// O(1) - Constant Time\nfunction getFirstElement(arr) {\n  return arr[0];\n}\n\n// O(log N) - Logarithmic Time (Binary Search)\nfunction binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}\n\n// O(N) - Linear Time\nfunction findMax(arr) {\n  let max = -Infinity;\n  for (const n of arr) if (n > max) max = n;\n  return max;\n}",
          explanation: "Binary search cuts the search space in half with each iteration, achieving O(log N) efficiency compared to O(N) linear scanning."
        },
        warnings: [
          "Never evaluate complexity using seconds or wall-clock time; clock speeds fluctuate across hardware, whereas operation counts are invariant."
        ]
      },
      {
        id: "hash-maps-collisions",
        title: "3. Hash Maps & Collision Resolution O(1)",
        content: "A Hash Map maps keys to index locations via a cryptographic or modular hash function. In the average case, insertions, deletions, and lookups require O(1) time. When two distinct keys hash to the same bucket (collision), systems resolve the collision using Separate Chaining (linked lists/trees per bucket) or Open Addressing (linear/quadratic probing).",
        diagram: {
          type: "comparison",
          title: "Hash Map Operations vs Unsorted Array",
          items: [
            { title: "Hash Map Lookup", desc: "O(1) average time via key hashing", badge: "Optimal" },
            { title: "Unsorted Array Lookup", desc: "O(N) linear scan required to locate elements", badge: "Slow" },
            { title: "Collision Resolution", desc: "Chaining degrades to O(N) only when hash function clusters", badge: "Important" }
          ]
        },
        bestPractices: [
          "Choose good hash functions with uniform distribution.",
          "Keep load factor below 0.7 to avoid frequent bucket resizing overhead."
        ]
      }
    ],
    faqs: [
      {
        question: "Why is hash map lookup considered O(1) if collisions can occur?",
        answer: "With a uniform hash function and dynamic bucket resizing when the load factor exceeds 0.7, bucket list lengths remain constant (O(1)) on average."
      }
    ],
    practiceQuestions: [
      {
        id: "q-dsa-1",
        question: "What is the worst-case time complexity of searching an element in a Hash Table that resolves collisions with Separate Chaining?",
        type: "multiple-choice",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correctAnswer: "O(N)",
        explanation: "If all N keys produce the exact same hash code and hash to the same bucket, the bucket becomes a single linked list of length N, resulting in O(N) worst-case search."
      }
    ],
    relatedNoteSlugs: ["dsa-trees-graphs-algorithms", "python-fundamentals-oop"]
  },
  // ─────────────────────────────────────────────────────────────
  // 14. DSA: Trees & Graphs
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-dsa-trees",
    slug: "dsa-trees-graphs-algorithms",
    title: "Trees, Binary Search Trees & Graph Traversals (BFS / DFS)",
    shortDescription: "Comprehensive guide to hierarchical data structures, binary search trees, graph representation (adjacency lists), and BFS/DFS search algorithms.",
    category: "Data Structures & Algorithms",
    topic: "Trees, Graphs & Non-Linear Structures",
    difficulty: "Advanced",
    readingTime: "18 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: false,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/dsa-complete-handbook.pdf",
      filename: "dsa-complete-handbook.pdf",
      fileSize: "6.8 KB",
      pageCount: 2,
      language: "English",
      slug: "dsa-complete-handbook"
    },
    tableOfContents: [
      { id: "binary-search-trees", title: "1. Binary Search Trees (BST) & Invariance", level: 2 },
      { id: "tree-traversals", title: "2. Tree Traversals (Inorder, Preorder, Postorder)", level: 2 },
      { id: "graph-representations", title: "3. Graph Representations: Adjacency List vs Matrix", level: 2 },
      { id: "bfs-vs-dfs", title: "4. Breadth-First Search (BFS) vs Depth-First Search (DFS)", level: 2 }
    ],
    introduction: "Trees and graphs model complex relationships from DOM hierarchies to social networks and network routing. Master the algorithmic properties of BSTs and traversal mechanics.",
    sections: [
      {
        id: "binary-search-trees",
        title: "1. Binary Search Trees (BST) & Invariance",
        content: "A Binary Search Tree enforces the BST invariant: for any node N, all values in its left subtree are strictly less than N.val, and all values in its right subtree are strictly greater than N.val. This ordering enables O(log N) lookup in balanced trees.",
        codeSnippet: {
          language: "javascript",
          title: "BST Node & Recursive Search",
          code: "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nfunction searchBST(root, val) {\n  if (!root || root.val === val) return root;\n  return val < root.val \n    ? searchBST(root.left, val) \n    : searchBST(root.right, val);\n}",
          explanation: "Each recursive step navigates left or right, halving remaining candidates in balanced trees."
        }
      },
      {
        id: "bfs-vs-dfs",
        title: "4. Breadth-First Search (BFS) vs Depth-First Search (DFS)",
        content: "Breadth-First Search explores all immediate neighbor vertices before descending to deeper levels. BFS uses a Queue (FIFO) and guarantees the shortest path in unweighted graphs. Depth-First Search explores as deep as possible along each branch before backtracking, using a Stack (LIFO) or recursion.",
        codeSnippet: {
          language: "javascript",
          title: "Graph BFS Using Adjacency List & Queue",
          code: "function bfsShortestPath(graph, start, target) {\n  const queue = [[start, 0]]; // [node, distance]\n  const visited = new Set([start]);\n\n  while (queue.length > 0) {\n    const [node, dist] = queue.shift();\n    if (node === target) return dist;\n\n    for (const neighbor of graph[node] || []) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push([neighbor, dist + 1]);\n      }\n    }\n  }\n  return -1; // Unreachable\n}",
          explanation: "BFS explores level by level, ensuring that the first time target is popped from the queue, the distance is the true shortest path."
        }
      }
    ],
    faqs: [
      {
        question: "When should I use BFS instead of DFS?",
        answer: "Use BFS when searching for the shortest path in unweighted graphs or level-order tree traversal. Use DFS when checking for cycle detection, topological sorting, or solving maze/backtracking problems."
      }
    ],
    practiceQuestions: [
      {
        id: "q-tree-1",
        question: "Which traversal of a Binary Search Tree produces values in strictly sorted ascending order?",
        type: "multiple-choice",
        options: ["Pre-order (Root, Left, Right)", "In-order (Left, Root, Right)", "Post-order (Left, Right, Root)", "Level-order (BFS)"],
        correctAnswer: "In-order (Left, Root, Right)",
        explanation: "In-order traversal visits left subtree (smaller values), current node, then right subtree (larger values), naturally yielding sorted order."
      }
    ],
    relatedNoteSlugs: ["dsa-arrays-time-complexity", "python-fundamentals-oop"]
  },
  // ─────────────────────────────────────────────────────────────
  // 15. PYTHON & AI: Python Core & OOP
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-python-oop",
    slug: "python-fundamentals-oop",
    title: "Python Core Programming & Object-Oriented Design (OOP)",
    shortDescription: "Idiomatic Python guide covering data structures, list comprehensions, decorators, generators, dunder methods, and clean object-oriented architecture.",
    category: "Python & AI",
    topic: "Python Syntax, Data Structures & Classes",
    difficulty: "Beginner",
    readingTime: "14 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/python-ai-essentials.pdf",
      filename: "python-ai-essentials.pdf",
      fileSize: "6.4 KB",
      pageCount: 2,
      language: "English",
      slug: "python-ai-essentials"
    },
    tableOfContents: [
      { id: "python-idioms", title: "1. Pythonic Syntax & List Comprehensions", level: 2 },
      { id: "generators-decorators", title: "2. Generators, Iterators & Custom Decorators", level: 2 },
      { id: "oop-classes-dunder", title: "3. Object-Oriented Programming & Special Dunder Methods", level: 2 }
    ],
    introduction: "Python powers artificial intelligence, backend services, and scientific computing. Understanding idiomatic syntax, decorators, and special methods transforms novice scripts into robust, maintainable software.",
    sections: [
      {
        id: "python-idioms",
        title: "1. Pythonic Syntax & List Comprehensions",
        content: "Python emphasizes readable, expressive code. List comprehensions allow concise filtering and transformation of sequences in a single, memory-efficient expression.",
        codeSnippet: {
          language: "python",
          title: "List & Dictionary Comprehensions with Type Hints",
          code: "# Comprehension filtering even squares\nnumbers: list[int] = [1, 2, 3, 4, 5, 6]\neven_squares: list[int] = [x**2 for x in numbers if x % 2 == 0]\n# Result: [4, 16, 36]\n\n# Dictionary comprehension\nusers: list[dict] = [{'id': 1, 'name': 'Alex'}, {'id': 2, 'name': 'Sarah'}]\nuser_lookup: dict[int, str] = {u['id']: u['name'] for u in users}\n# Result: {1: 'Alex', 2: 'Sarah'}",
          explanation: "Comprehensions are optimized internally in CPython and execute faster than imperative for-loops with append."
        }
      },
      {
        id: "oop-classes-dunder",
        title: "3. Object-Oriented Programming & Special Dunder Methods",
        content: "In Python, special methods flanked by double underscores (__init__, __repr__, __eq__) define operator overloading and object lifecycle behaviors.",
        codeSnippet: {
          language: "python",
          title: "Custom Python Class with Dunder Methods",
          code: "class LearningCourse:\n    def __init__(self, title: str, hours: int):\n        self.title = title\n        self.hours = hours\n        \n    def __repr__(self) -> str:\n        return f\"LearningCourse(title='{self.title}', hours={self.hours})\"\n        \n    def __add__(self, other: 'LearningCourse') -> int:\n        return self.hours + other.hours\n\nc1 = LearningCourse('DSA Masterclass', 40)\nc2 = LearningCourse('AI & ML Deep Dive', 60)\nprint(c1 + c2) # 100",
          explanation: "Implementing __repr__ produces clear debug output, while __add__ enables intuitive operator behavior."
        }
      }
    ],
    faqs: [
      {
        question: "What is the difference between __str__ and __repr__?",
        answer: "__repr__ is intended for developers and debugging (unambiguous, valid Python code representation). __str__ is intended for end-user readable formatting."
      }
    ],
    practiceQuestions: [
      {
        id: "q-py-1",
        question: "Which keyword creates a generator function in Python that yields values one at a time on demand?",
        type: "multiple-choice",
        options: ["return", "yield", "generator", "async"],
        correctAnswer: "yield",
        explanation: "The yield keyword pauses function execution and returns a generator iterator, consuming minimal memory."
      }
    ],
    relatedNoteSlugs: ["ai-data-science-machine-learning", "dsa-arrays-time-complexity"]
  },
  // ─────────────────────────────────────────────────────────────
  // 16. PYTHON & AI: Machine Learning & GenAI
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-ai-ml",
    slug: "ai-data-science-machine-learning",
    title: "Introduction to Machine Learning, Pandas & Generative AI",
    shortDescription: "Learn data science workflows with Pandas & NumPy, supervised vs unsupervised learning algorithms, and modern Generative AI & LLM architectures.",
    category: "Python & AI",
    topic: "Data Science, Supervised ML & LLM Engineering",
    difficulty: "Intermediate",
    readingTime: "16 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/python-ai-essentials.pdf",
      filename: "python-ai-essentials.pdf",
      fileSize: "6.4 KB",
      pageCount: 2,
      language: "English",
      slug: "python-ai-essentials"
    },
    tableOfContents: [
      { id: "pandas-numpy", title: "1. Data Wrangling with NumPy & Pandas", level: 2 },
      { id: "supervised-vs-unsupervised", title: "2. Supervised vs Unsupervised Machine Learning", level: 2 },
      { id: "generative-ai-llms", title: "3. Large Language Models (LLMs) & Prompt Engineering", level: 2 }
    ],
    introduction: "Modern artificial intelligence combines data preprocessing, statistical modeling, and generative transformer models. Learn how Python powers the AI revolution from Pandas to LLMs.",
    sections: [
      {
        id: "pandas-numpy",
        title: "1. Data Wrangling with NumPy & Pandas",
        content: "NumPy provides multidimensional arrays with vectorized C-level math operations. Pandas layers DataFrames on top of NumPy, enabling intuitive tabular data transformation, grouping, filtering, and missing data imputation.",
        codeSnippet: {
          language: "python",
          title: "Pandas DataFrame Aggregation & Cleaning",
          code: "import pandas as pd\n\ndata = {\n    'student': ['Alex', 'Sarah', 'Dev', 'Priya'],\n    'track': ['Full-Stack', 'AI', 'DSA', 'AI'],\n    'score': [92, 95, 88, 97]\n}\ndf = pd.DataFrame(data)\n\n# Grouping by track and computing mean score\ntrack_averages = df.groupby('track')['score'].mean().reset_index()\nprint(track_averages)",
          explanation: "Pandas handles complex data aggregation with clean, vectorized queries instead of manual nested iteration."
        }
      },
      {
        id: "generative-ai-llms",
        title: "3. Large Language Models (LLMs) & Prompt Engineering",
        content: "Large Language Models (LLMs) are deep neural networks based on the Transformer architecture. Using self-attention mechanisms, they compute next-token probabilities given preceding context. Effective prompt engineering incorporates system role definition, few-shot demonstration, and structured output schemas.",
        bestPractices: [
          "Constrain LLM responses to JSON schemas for reliable API integration.",
          "Employ Retrieval-Augmented Generation (RAG) with vector embeddings to ground responses in private documentation."
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between Supervised and Unsupervised Learning?",
        answer: "Supervised learning trains on labeled data (features paired with known answers like prices or categories). Unsupervised learning discovers hidden patterns in unlabeled data (clustering or dimensionality reduction)."
      }
    ],
    practiceQuestions: [
      {
        id: "q-ai-1",
        question: "What key mechanism introduced in the 2017 Transformer paper enables models to dynamically weigh the importance of different words in a sequence?",
        type: "multiple-choice",
        options: ["Convolution", "Recurrent Memory Cells", "Self-Attention", "Backpropagation"],
        correctAnswer: "Self-Attention",
        explanation: "Self-attention enables transformer models to evaluate relationships between all words in a sentence simultaneously."
      }
    ],
    relatedNoteSlugs: ["python-fundamentals-oop", "operating-systems-process-threads"]
  },
  // ─────────────────────────────────────────────────────────────
  // 17. CS CORE: Operating Systems
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-os-core",
    slug: "operating-systems-process-threads",
    title: "Operating Systems: Processes, Threads, Scheduling & Memory",
    shortDescription: "Understand OS internals: process lifecycle, multithreading, race conditions, deadlocks (Coffman conditions), and virtual memory paging.",
    category: "Computer Science Core",
    topic: "OS Architecture & Concurrency",
    difficulty: "Intermediate",
    readingTime: "17 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: false,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/os-networking-handbook.pdf",
      filename: "os-networking-handbook.pdf",
      fileSize: "6.5 KB",
      pageCount: 2,
      language: "English",
      slug: "os-networking-handbook"
    },
    tableOfContents: [
      { id: "processes-vs-threads", title: "1. Processes vs Threads & Context Switching", level: 2 },
      { id: "cpu-scheduling", title: "2. CPU Scheduling Algorithms (Round Robin, SJF)", level: 2 },
      { id: "deadlocks-concurrency", title: "3. Race Conditions, Mutexes & Deadlock Prevention", level: 2 },
      { id: "virtual-memory", title: "4. Virtual Memory, Paging & TLB", level: 2 }
    ],
    introduction: "The Operating System coordinates hardware resources, execution schedules, and physical memory. This guide explains the core principles tested in campus placements and technical interviews.",
    sections: [
      {
        id: "processes-vs-threads",
        title: "1. Processes vs Threads & Context Switching",
        content: "A Process is an executing program instance with its own isolated address space, heap, registers, and open file descriptors. A Thread is a lightweight unit of execution within a process that shares the heap and global variables with sibling threads while maintaining its own stack and registers.",
        diagram: {
          type: "comparison",
          title: "Process vs Thread Architecture",
          items: [
            { title: "Process", desc: "Heavyweight, isolated memory space, expensive context switch", badge: "Isolated" },
            { title: "Thread", desc: "Lightweight, shared memory space, fast context switch", badge: "Shared" },
            { title: "Context Switch", desc: "OS saves registers and loads PCB/TCB to switch CPU execution", badge: "Overhead" }
          ]
        }
      },
      {
        id: "deadlocks-concurrency",
        title: "3. Race Conditions, Mutexes & Deadlock Prevention",
        content: "When multiple threads concurrently modify shared state without synchronization, a Race Condition occurs. Deadlock happens when two or more processes permanently block each other. Deadlock requires all 4 Coffman Conditions to hold simultaneously: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
        warnings: [
          "Never acquire locks in inconsistent orders across different threads; inconsistent lock ordering is the primary cause of circular wait deadlocks."
        ]
      }
    ],
    faqs: [
      {
        question: "How does Virtual Memory protect processes from one another?",
        answer: "The OS and Memory Management Unit (MMU) translate each process's virtual memory addresses to physical RAM via Page Tables, preventing one process from reading or overwriting another process's memory."
      }
    ],
    practiceQuestions: [
      {
        id: "q-os-1",
        question: "Which of the following is NOT one of the 4 Coffman conditions required for a deadlock to occur?",
        type: "multiple-choice",
        options: ["Mutual Exclusion", "Circular Wait", "Preemption of Resources", "Hold and Wait"],
        correctAnswer: "Preemption of Resources",
        explanation: "Deadlock requires NO PREEMPTION (resources cannot be forcibly reclaimed from a process holding them)."
      }
    ],
    relatedNoteSlugs: ["dbms-sql-relational-design", "cloud-docker-containerization"]
  },
  // ─────────────────────────────────────────────────────────────
  // 18. CS CORE: DBMS & SQL
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-dbms-sql",
    slug: "dbms-sql-relational-design",
    title: "Database Management Systems (DBMS), SQL & Normalization",
    shortDescription: "Essential database engineering: relational schema design, 1NF to 3NF normalization, ACID guarantees, complex SQL queries, and B-Tree indexing.",
    category: "Computer Science Core",
    topic: "Relational Design, SQL & Transactions",
    difficulty: "Intermediate",
    readingTime: "16 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/dbms-sql-cheatsheet.pdf",
      filename: "dbms-sql-cheatsheet.pdf",
      fileSize: "6.1 KB",
      pageCount: 2,
      language: "English",
      slug: "dbms-sql-cheatsheet"
    },
    tableOfContents: [
      { id: "acid-properties", title: "1. ACID Guarantees & Transaction Isolation", level: 2 },
      { id: "database-normalization", title: "2. Database Normalization (1NF, 2NF, 3NF)", level: 2 },
      { id: "advanced-sql", title: "3. Complex SQL JOINs & Window Functions", level: 2 },
      { id: "b-tree-indexing", title: "4. Indexing Internals: B-Trees & Query Optimization", level: 2 }
    ],
    introduction: "Databases form the backbone of modern software. Understanding relational schemas, ACID isolation levels, and B-Tree indexing ensures your applications remain performant under scale.",
    sections: [
      {
        id: "acid-properties",
        title: "1. ACID Guarantees & Transaction Isolation",
        content: "Relational DBMS enforce four fundamental properties: Atomicity (all-or-nothing), Consistency (integrity constraints preserved), Isolation (concurrent operations do not corrupt data), and Durability (committed data survives crashes via WAL logs).",
        codeSnippet: {
          language: "sql",
          title: "Atomic SQL Transaction with Error Rollback",
          code: "BEGIN TRANSACTION;\n\n-- Deduct funds from sender\nUPDATE accounts \nSET balance = balance - 250.00 \nWHERE id = 'acc_user_1' AND balance >= 250.00;\n\n-- Credit recipient\nUPDATE accounts \nSET balance = balance + 250.00 \nWHERE id = 'acc_user_2';\n\n-- Log transaction audit trail\nINSERT INTO transfer_logs (sender, recipient, amount, created_at)\nVALUES ('acc_user_1', 'acc_user_2', 250.00, NOW());\n\nCOMMIT;",
          explanation: "If any individual statement fails or the database crashes mid-operation, the entire transaction is rolled back."
        }
      },
      {
        id: "b-tree-indexing",
        title: "4. Indexing Internals: B-Trees & Query Optimization",
        content: "Without an index, the database must execute a Full Table Scan (O(N)) inspecting every disk page. A B-Tree index maintains a balanced, multi-way search tree that reduces lookup to O(log N) disk reads.",
        bestPractices: [
          "Follow the Leftmost Prefix Rule for composite indexes (index on (col_a, col_b) only speeds queries filtering col_a).",
          "Never index high-write columns with low cardinality (such as boolean flags) as index maintenance costs outweigh benefits."
        ]
      }
    ],
    faqs: [
      {
        question: "Why should we normalize databases to 3NF?",
        answer: "Normalization eliminates data redundancy, guarantees that every non-key column depends solely on the primary key, and prevents update/deletion anomalies."
      }
    ],
    practiceQuestions: [
      {
        id: "q-db-1",
        question: "Which SQL clause filters the results of an aggregate function (such as COUNT or AVG)?",
        type: "multiple-choice",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        correctAnswer: "HAVING",
        explanation: "WHERE filters rows before aggregation, while HAVING filters aggregated group results after GROUP BY."
      }
    ],
    relatedNoteSlugs: ["operating-systems-process-threads", "cloud-docker-containerization"]
  },
  // ─────────────────────────────────────────────────────────────
  // 19. CLOUD & DEVOPS: Docker & Containerization
  // ─────────────────────────────────────────────────────────────
  {
    id: "note-docker-devops",
    slug: "cloud-docker-containerization",
    title: "Docker & Containerization for Cloud DevOps Engineers",
    shortDescription: "Complete guide to Docker containers, writing production multi-stage Dockerfiles, compose multi-service orchestration, and CI/CD pipelines.",
    category: "Cloud & DevOps",
    topic: "Dockerfiles, Compose & Microservices",
    difficulty: "Intermediate",
    readingTime: "15 min read",
    lastUpdated: "October 2026",
    isFeatured: true,
    isPopular: true,
    status: "published",
    pdf: {
      hasPdf: true,
      fileUrl: "/pdfs/docker-devops-guide.pdf",
      filename: "docker-devops-guide.pdf",
      fileSize: "6.3 KB",
      pageCount: 2,
      language: "English",
      slug: "docker-devops-guide"
    },
    tableOfContents: [
      { id: "containers-vs-vms", title: "1. Containers vs Virtual Machines", level: 2 },
      { id: "dockerfile-best-practices", title: "2. Writing Production Multi-Stage Dockerfiles", level: 2 },
      { id: "docker-compose-services", title: "3. Multi-Service Orchestration with Docker Compose", level: 2 },
      { id: "cicd-container-deployments", title: "4. Automated CI/CD Workflows", level: 2 }
    ],
    introduction: "Modern cloud deployments package applications into lightweight, isolated container images. Learn the foundational DevOps container workflows used in production software engineering.",
    sections: [
      {
        id: "containers-vs-vms",
        title: "1. Containers vs Virtual Machines",
        content: "Virtual Machines emulate entire guest operating systems atop a hypervisor, consuming gigabytes of memory. Docker containers share the host Linux kernel while isolating processes using Linux cgroups (resource limits) and namespaces (process & network isolation).",
        codeSnippet: {
          language: "dockerfile",
          title: "Lean Multi-Stage Dockerfile for Node.js Applications",
          code: "# Stage 1: Build & Dependencies\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Stage 2: Minimal Production Image\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/package*.json ./\nCOPY --from=builder /app/.next ./.next\nCOPY --from=builder /app/public ./public\nCOPY --from=builder /app/node_modules ./node_modules\n\nUSER node\nEXPOSE 3000\nCMD [\"npm\", \"start\"]",
          explanation: "Multi-stage builds exclude development tools, compilers, and source files from the final container, slashing image size."
        }
      },
      {
        id: "docker-compose-services",
        title: "3. Multi-Service Orchestration with Docker Compose",
        content: "Docker Compose coordinates multi-container environments (e.g. Next.js app + PostgreSQL + Redis) using declarative YAML manifests with isolated internal bridge networks.",
        bestPractices: [
          "Use non-root users inside containers to prevent host root compromise.",
          "Use named volumes for database storage to ensure persistent data survives container restarts."
        ]
      }
    ],
    faqs: [
      {
        question: "Why should I use Alpine or Distroless images?",
        answer: "Alpine and Distroless images strip unnecessary package managers and shell binaries, drastically reducing image download times and eliminating common CVE vulnerabilities."
      }
    ],
    practiceQuestions: [
      {
        id: "q-dock-1",
        question: "Which Linux kernel feature enables Docker to isolate process trees, network interfaces, and mount points?",
        type: "multiple-choice",
        options: ["Namespaces", "Control Groups (cgroups)", "SELinux", "Systemd"],
        correctAnswer: "Namespaces",
        explanation: "Namespaces provide isolated views of system resources (PID, NET, MNT, IPC), while cgroups regulate resource limits (CPU, memory)."
      }
    ],
    relatedNoteSlugs: ["dbms-sql-relational-design", "operating-systems-process-threads"]
  }
];

export function getAllNotes(): NoteItem[] {
  return NOTES_DATA;
}

export function getNoteBySlug(slug: string): NoteItem | undefined {
  return NOTES_DATA.find((n) => n.slug === slug);
}

export function getFeaturedNotes(): NoteItem[] {
  return NOTES_DATA.filter((n) => n.isFeatured);
}

export function getPopularNotes(): NoteItem[] {
  return NOTES_DATA.filter((n) => n.isPopular);
}

export function getRecentNotes(count = 4): NoteItem[] {
  return NOTES_DATA.slice(0, count);
}

export function getNotesByCategory(category: string): NoteItem[] {
  if (category === "All") return NOTES_DATA;
  return NOTES_DATA.filter(
    (n) => n.category.toLowerCase() === category.toLowerCase()
  );
}

export const CATEGORIES = [
  "All",
  "Data Structures & Algorithms",
  "Python & AI",
  "Computer Science Core",
  "Cloud & DevOps",
  "Web Development",
  "JavaScript",
  "Git & GitHub",
  "React",
  "Next.js",
  "Backend & Databases",
  "Deployment"
] as const;

export type NoteCategory = (typeof CATEGORIES)[number];
