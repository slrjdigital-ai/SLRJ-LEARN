export interface StageLessonContent {
  stepId: number;
  overview: string[];
  keyConceptDetails: Array<{
    title: string;
    description: string;
  }>;
  codeExample: {
    language: string;
    code: string;
    explanation: string;
  };
  commonMistakes: string[];
  proTips: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// Detailed lesson knowledge base for all stages
export const STAGE_LESSON_CONTENT: Record<number, StageLessonContent> = {
  // ──────────────────────────────────────────────────────────────────
  // FRONTEND DEVELOPER (1..14)
  // ──────────────────────────────────────────────────────────────────
  1: {
    stepId: 1,
    overview: [
      "The Internet is a global network of interconnected computers communicating via standardized protocols known as TCP/IP. When you enter a URL in your browser, a sequence of rapid network operations takes place before any pixel renders on your screen.",
      "First, your browser queries the Domain Name System (DNS) to resolve human-readable domains (like slrjlearn.in) into numerical IP addresses. Once the IP is resolved, a TCP handshake establishes a secure connection over HTTPS, and an HTTP GET request is sent to the web server.",
      "The server returns HTML, CSS, and JavaScript. Your browser's rendering engine parses the HTML into a Document Object Model (DOM) tree, parses CSS into a CSSOM tree, combines them into a Render Tree, calculates layouts, and paints pixels on your display."
    ],
    keyConceptDetails: [
      { title: "Client-Server Architecture", description: "The client (your browser) sends requests, and the server (computer in a data center) processes requests and returns data." },
      { title: "DNS (Domain Name System)", description: "The phonebook of the Internet. Translates domain names into machine-readable IP addresses (e.g. 192.0.2.1)." },
      { title: "HTTP Status Codes", description: "200 (OK), 301 (Moved Permanently), 400 (Bad Request), 404 (Not Found), 500 (Internal Server Error)." },
      { title: "Critical Rendering Path", description: "HTML → DOM + CSS → CSSOM → Render Tree → Layout → Paint." }
    ],
    codeExample: {
      language: "http",
      code: `GET /index.html HTTP/1.1
Host: slrjlearn.in
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml

HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1420
Cache-Control: max-age=3600

<!DOCTYPE html>
<html lang="en">
<head>
  <title>SLRJ Learn</title>
</head>
<body>
  <h1>Welcome to Web Engineering</h1>
</body>
</html>`,
      explanation: "A standard HTTP GET request and corresponding HTTP 200 OK response with headers and HTML payload."
    },
    commonMistakes: [
      "Confusing the Internet (the physical global network) with the World Wide Web (the system of web pages linked via HTTP).",
      "Assuming HTTPS encrypts the domain name during DNS resolution (DNS queries are often plain UDP unless using DNS-over-HTTPS).",
      "Ignoring HTTP caching headers, causing users to download identical assets on every page load."
    ],
    proTips: [
      "Open Chrome DevTools (F12) and inspect the Network tab on any website to see real-time HTTP requests, response headers, and waterfall timings.",
      "Always design websites assuming network connections can be slow, intermittent, or offline."
    ],
    quiz: {
      question: "Which browser subsystem is responsible for combining the DOM and CSSOM to determine which elements are visible on screen?",
      options: [
        "The JavaScript V8 Engine",
        "The Render Tree",
        "The DNS Resolver",
        "The Cache Storage"
      ],
      correctIndex: 1,
      explanation: "The Render Tree combines the structural DOM with the styling CSSOM, filtering out invisible nodes like <head> and display: none elements."
    }
  },
  2: {
    stepId: 2,
    overview: [
      "HTML5 (HyperText Markup Language) is the foundational skeleton of every web page. It defines the meaning and structure of content using standardized tags and semantic elements.",
      "Semantic HTML tags like <header>, <nav>, <main>, <article>, <section>, and <footer> convey meaning to both browsers and search engines. They enable screen readers used by visually impaired people to navigate effortlessly and improve search engine rankings (SEO).",
      "HTML forms collect user input. Accessible forms always pair every <input> with a descriptive <label> using matching 'for' and 'id' attributes, providing built-in validation before JavaScript runs."
    ],
    keyConceptDetails: [
      { title: "Document Skeleton", description: "<!DOCTYPE html> declares modern HTML5 standards. <html> wraps all content, <head> stores metadata, and <body> holds visible content." },
      { title: "Semantic Elements", description: "Use <button> for actions, <a> for navigation, and <main> for primary content instead of meaningless <div> tags." },
      { title: "Accessible Forms", description: "Always connect <label for='email'> to <input id='email' type='email' required>." }
    ],
    codeExample: {
      language: "html",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Registration</title>
</head>
<body>
  <header>
    <nav aria-label="Main Navigation">
      <a href="/">Home</a>
      <a href="/courses">Courses</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Join the Developer Learning Path</h1>
      <form action="/register" method="POST">
        <div>
          <label for="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" required placeholder="Alex Chen">
        </div>
        <div>
          <label for="userEmail">Email Address:</label>
          <input type="email" id="userEmail" name="email" required placeholder="alex@dev.com">
        </div>
        <button type="submit">Create Account</button>
      </form>
    </article>
  </main>
</body>
</html>`,
      explanation: "A fully valid, semantic, and accessible HTML5 document with proper landmarks, labels, and metadata."
    },
    commonMistakes: [
      "Using <div onclick='...'> instead of <button>. A div is not keyboard accessible and screen readers cannot identify it as an interactive control.",
      "Missing the <meta name='viewport'> tag, which causes mobile browsers to render desktop-sized pages and zoom out.",
      "Leaving off alt attributes on <img> tags, breaking accessibility for screen reader users."
    ],
    proTips: [
      "Validate your HTML markup using the official W3C Markup Validation Service to catch unclosed tags and invalid nesting.",
      "Use native HTML5 form validation attributes (required, pattern, min, max, type='email') for instant client-side checks."
    ],
    quiz: {
      question: "Which HTML5 element represents the primary, unique content of a document, excluding headers, sidebars, and footers?",
      options: [
        "<section>",
        "<main>",
        "<article>",
        "<div>"
      ],
      correctIndex: 1,
      explanation: "<main> designates the central dominant content of the document. There should be only one visible <main> element per page."
    }
  },
  3: {
    stepId: 3,
    overview: [
      "Cascading Style Sheets (CSS3) transforms plain HTML into visually engaging digital interfaces. It controls colors, typography, spacing, visual hierarchies, and layout geometry.",
      "The CSS Box Model is the universal mental model of CSS layout: every element is a rectangular box comprising Content, Padding (inner space), Border (the frame), and Margin (outer clearance).",
      "CSS Specificity dictates which style rules win when conflicts occur. By default, inline styles beat ID selectors, which beat class selectors, which beat element selectors. Keeping specificity low and predictable is key to clean architecture."
    ],
    keyConceptDetails: [
      { title: "Box-Sizing: border-box", description: "Ensures padding and border are included in an element's total width and height, preventing accidental layout breaks." },
      { title: "The Cascade & Specificity", description: "Inline (1000) > ID (100) > Class/Attribute/Pseudo-class (10) > Element (1)." },
      { title: "Positioning Contexts", description: "Static (normal flow), Relative (offset relative to self), Absolute (offset relative to nearest positioned ancestor), Fixed (viewport bound), Sticky." }
    ],
    codeExample: {
      language: "css",
      code: `/* Modern CSS Reset & Box Sizing */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary: #06b6d4;
  --bg-dark: #070b14;
  --text-main: #f8fafc;
  --radius: 1rem;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--bg-dark);
  color: var(--text-main);
  line-height: 1.6;
}

/* Card Component with Box Model */
.feature-card {
  max-width: 400px;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
}`,
      explanation: "Clean, modern CSS using universal border-box reset, CSS custom properties (variables), and smooth transitions."
    },
    commonMistakes: [
      "Not resetting box-sizing to border-box, causing elements with width: 100% and padding: 20px to overflow their parent containers.",
      "Overusing !important to solve specificity conflicts rather than organizing CSS selectors cleanly.",
      "Using absolute positioning for general page layouts rather than Flexbox or CSS Grid."
    ],
    proTips: [
      "Always declare *, *::before, *::after { box-sizing: border-box; } at the top of every stylesheet.",
      "Use CSS Custom Properties (--variables) for design tokens (colors, font sizes, border radiuses) for easy dark mode theming."
    ],
    quiz: {
      question: "If an element has width: 200px, padding: 20px on all sides, border: 2px, and box-sizing: border-box, what is its total rendered width?",
      options: [
        "244px",
        "200px",
        "220px",
        "180px"
      ],
      correctIndex: 1,
      explanation: "With box-sizing: border-box, the specified width (200px) encompasses the content, padding, and border. The total width remains exactly 200px."
    }
  },
  4: {
    stepId: 4,
    overview: [
      "Responsive Web Design ensures websites adapt seamlessly to smartphones, tablets, laptops, and ultra-wide desktop monitors without horizontal scrolling.",
      "CSS Flexbox is designed for 1-dimensional layouts (either a row or a column). It excels at navigation bars, vertical stacks, centering items, and flexible spacing.",
      "CSS Grid is designed for 2-dimensional layouts (rows and columns simultaneously). It powers complex page templates, responsive card showcases, and fluid dashboards with zero JavaScript."
    ],
    keyConceptDetails: [
      { title: "CSS Flexbox", description: "display: flex enables main-axis alignment (justify-content) and cross-axis alignment (align-items)." },
      { title: "CSS Grid", description: "display: grid with grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) creates automatic responsive wrapping." },
      { title: "Mobile-First Media Queries", description: "Write default styles for small screens, then enhance for wider viewports with @media (min-width: 768px)." }
    ],
    codeExample: {
      language: "css",
      code: `/* Auto-Responsive Grid (Zero Media Queries needed!) */
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

/* Flexbox Header Navigation */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

/* Mobile-First Media Query */
@media (min-width: 768px) {
  .hero-section {
    display: flex;
    align-items: center;
    gap: 3rem;
  }
}`,
      explanation: "Powerful auto-fit CSS Grid rule that reflows cards automatically based on available viewport width."
    },
    commonMistakes: [
      "Hardcoding pixel widths (like width: 1200px) instead of fluid constraints (max-width: 1200px; width: 100%).",
      "Designing for desktop first and trying to squeeze elements into mobile screens, which leads to bloated CSS overrides.",
      "Forgetting viewport meta tags, causing smartphones to render tiny desktop views."
    ],
    proTips: [
      "The repeat(auto-fit, minmax(250px, 1fr)) CSS Grid pattern is the modern standard for responsive card layouts without writing multiple media queries.",
      "Use clamp() for fluid typography that scales smoothly between mobile and desktop: font-size: clamp(1rem, 2.5vw, 2.25rem)."
    ],
    quiz: {
      question: "Which CSS Grid property value causes columns to automatically wrap onto new rows while expanding to fill all available space?",
      options: [
        "repeat(3, 1fr)",
        "repeat(auto-fit, minmax(250px, 1fr))",
        "display: flex-wrap",
        "grid-auto-flow: column"
      ],
      correctIndex: 1,
      explanation: "repeat(auto-fit, minmax(250px, 1fr)) automatically calculates how many columns can fit at a minimum of 250px, stretching them equally to fill the row."
    }
  },
  5: {
    stepId: 5,
    overview: [
      "JavaScript is the programming language that powers dynamic interactivity on the modern web. It runs inside all web browsers and allows you to build algorithms, manipulate data, and react to user events.",
      "Variables are declared using 'const' (for values that don't get reassigned) and 'let' (for variables that change). JavaScript is dynamically typed, featuring primitive types (string, number, boolean, null, undefined, symbol, bigint) and reference types (objects, arrays, functions).",
      "Control flow structures (if/else, switch, ternary operators) allow your code to make logical decisions, while loops (for, while, for...of) iterate through collections efficiently."
    ],
    keyConceptDetails: [
      { title: "const vs let", description: "Use const by default. Use let only when reassignment is required. Avoid legacy 'var' due to function-scoping bugs." },
      { title: "Strict Equality (===)", description: "Always use === and !== to compare both value and data type without implicit type coercion." },
      { title: "Arrow Functions", description: "const add = (a, b) => a + b; provides concise syntax and lexical 'this' binding." }
    ],
    codeExample: {
      language: "javascript",
      code: `// Modern ES6+ JavaScript Fundamentals
const student = {
  name: "Sarah Kim",
  score: 88,
  skills: ["HTML", "CSS", "JavaScript"]
};

// Pure function with arrow syntax
const calculateGrade = (score) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  return "F";
};

// Array method iteration (Declarative programming)
const uppercaseSkills = student.skills.map((skill) => skill.toUpperCase());

console.log(\`Student: \${student.name}\`);
console.log(\`Grade: \${calculateGrade(student.score)}\`);
console.log(\`Skills: \${uppercaseSkills.join(", ")}\`);`,
      explanation: "Demonstration of objects, arrow functions, template literals, and declarative array methods."
    },
    commonMistakes: [
      "Using == instead of ===, which leads to strange coercion bugs (e.g. 0 == '' evaluates to true).",
      "Accidentally mutating state directly instead of returning new arrays or objects.",
      "Creating off-by-one errors in traditional for loops instead of using modern array iteration methods like .forEach() or .map()."
    ],
    proTips: [
      "Master array methods early: map (transform), filter (subset), reduce (aggregate), and find (search) replace 90% of manual for loops.",
      "Use template literals (\`Hello \${name}\`) for clean string interpolation without messy '+' concatenation."
    ],
    quiz: {
      question: "What does the expression typeof null evaluate to in JavaScript?",
      options: [
        "'null'",
        "'undefined'",
        "'object'",
        "'boolean'"
      ],
      correctIndex: 2,
      explanation: "In JavaScript, typeof null returns 'object'. This is a historical bug in the original 1995 JavaScript implementation that cannot be changed without breaking legacy websites."
    }
  }
};

// Helper function to get rich lesson content for any step
export function getLessonContentForStep(stepId: number, fallbackTitle: string, fallbackSummary: string): StageLessonContent {
  if (STAGE_LESSON_CONTENT[stepId]) {
    return STAGE_LESSON_CONTENT[stepId];
  }

  // Generative default lesson content for other stages
  return {
    stepId,
    overview: [
      `In this stage, you will master ${fallbackTitle}. This milestone is a critical component of becoming an industry-ready engineer.`,
      fallbackSummary,
      "You will study the theoretical foundations, explore syntax-highlighted code implementations, learn how to prevent common software bugs, and build a hands-on practical assignment."
    ],
    keyConceptDetails: [
      { title: "Core Architectural Principles", description: `Understand how ${fallbackTitle} fits into the complete engineering lifecycle.` },
      { title: "Best Practices & Standards", description: "Write clean, modular, maintainable, and self-documenting code following industry design patterns." },
      { title: "Practical Application", description: "Apply concepts by building concrete features with defensive error handling and testing." }
    ],
    codeExample: {
      language: "typescript",
      code: `// ${fallbackTitle} Implementation Example
interface StageConfig {
  id: number;
  title: string;
  isReady: boolean;
}

export function executeStageLogic(config: StageConfig): string {
  if (!config.isReady) {
    throw new Error("Stage initialization requirements not met.");
  }
  return \`Successfully executed \${config.title} at stage \${config.id}\`;
}

// Test execution
const result = executeStageLogic({
  id: ${stepId},
  title: "${fallbackTitle}",
  isReady: true
});
console.log(result);`,
      explanation: `Executable TypeScript example demonstrating clean interface definition, input validation, and execution logic for ${fallbackTitle}.`
    },
    commonMistakes: [
      "Skipping core fundamentals to jump directly into frameworks without understanding the underlying mechanics.",
      "Neglecting input validation and edge cases, causing unhandled runtime exceptions in production.",
      "Failing to write modular, testable code with clear single-responsibility functions."
    ],
    proTips: [
      "Always break complex programming challenges down into small, isolated functions that you can verify independently.",
      "Use Lumio AI whenever you encounter an error or want a step-by-step breakdown of difficult algorithms."
    ],
    quiz: {
      question: `What is the most effective approach when implementing ${fallbackTitle} in a production environment?`,
      options: [
        "Write code without tests to ship as fast as possible",
        "Implement clear modular architecture with input validation and tests",
        "Hardcode all values directly inside UI components",
        "Rely on client-side state without error boundaries"
      ],
      correctIndex: 1,
      explanation: "Production software engineering requires modular design, robust defensive input validation, and automated tests to guarantee long-term reliability."
    }
  };
}
