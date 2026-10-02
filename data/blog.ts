import { htmlGuideHtml } from "./notes/html-guide";
import { cssFlexboxHtml } from "./notes/css-flexbox";
import { jsBasicsHtml } from "./notes/js-basics";
import { reactRoadmapHtml } from "./notes/react-roadmap";
import { gitGithubHtml } from "./notes/git-github";
import { deploymentHtml } from "./notes/deployment";

export const blogPosts = [
  {
    id: 1,
    title: "HTML Complete Guide",
    description: "Learn the foundation of the web with this comprehensive HTML guide.",
    category: "HTML",
    date: "Sep 2026",
    slug: "html-guide",
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=1000&auto=format&fit=crop",
    htmlContent: htmlGuideHtml,
    content: "## What is HTML?\n\nHTML stands for HyperText Markup Language. It is the standard markup language for documents designed to be displayed in a web browser.\n\n### Key Concepts\n- **Tags**: Used to create elements (e.g., `<p>`, `<div>`, `<h1>`).\n- **Attributes**: Provide additional information about elements (e.g., `class=\"main\"`, `id=\"header\"`).\n- **Structure**: Every HTML document should have a `<html>`, `<head>`, and `<body>`.\n\nStart practicing by creating simple pages and inspecting elements on your favorite websites!"
  },
  {
    id: 2,
    title: "CSS Flexbox Explained",
    description: "Master modern CSS layouts using Flexbox properties.",
    category: "CSS",
    date: "Sep 2026",
    slug: "css-flexbox",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    htmlContent: cssFlexboxHtml,
    content: "## Introduction to Flexbox\n\nFlexbox is a one-dimensional layout method for laying out items in rows or columns.\n\n### Core Properties\n- `display: flex;` - Activates flexbox on a container.\n- `justify-content` - Aligns items horizontally (e.g., `center`, `space-between`).\n- `align-items` - Aligns items vertically.\n- `flex-direction` - Defines the direction items are placed (`row` or `column`).\n\nFlexbox makes responsive design much easier compared to older float-based layouts."
  },
  {
    id: 3,
    title: "JavaScript Basics",
    description: "Get started with JavaScript and make your websites interactive.",
    category: "JavaScript",
    date: "Sep 2026",
    slug: "js-basics",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1000&auto=format&fit=crop",
    htmlContent: jsBasicsHtml,
    content: "## JavaScript Essentials\n\nJavaScript is the programming language of the Web. It allows you to implement complex features on web pages.\n\n### What you should learn first:\n1. **Variables**: `let`, `const`, `var`.\n2. **Data Types**: Strings, Numbers, Arrays, Objects.\n3. **Functions**: Arrow functions and standard functions.\n4. **DOM Manipulation**: How to change HTML elements using JS."
  },
  {
    id: 4,
    title: "React.js Roadmap",
    description: "A step-by-step path to becoming a proficient React developer.",
    category: "React",
    date: "Aug 2026",
    slug: "react-roadmap",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    htmlContent: reactRoadmapHtml,
    content: "## The React Journey\n\nReact is a library for building user interfaces.\n\n### Milestone 1: Components and Props\nUnderstand how to build small, reusable UI pieces and pass data to them.\n\n### Milestone 2: State and Hooks\nLearn `useState` and `useEffect` to manage data that changes over time.\n\n### Milestone 3: Routing\nUse Next.js or React Router to navigate between pages without refreshing."
  },
  {
    id: 5,
    title: "APIs Explained",
    description: "Understand how APIs connect the modern web.",
    category: "APIs",
    date: "Aug 2026",
    slug: "apis-explained",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
    content: "## What is an API?\n\nApplication Programming Interface (API) allows two applications to talk to each other.\n\nIn Web Development, we usually mean REST or GraphQL APIs, where the frontend requests data (like user profiles or posts) from a backend database via HTTP requests."
  },
  {
    id: 6,
    title: "Git & GitHub",
    description: "Version control best practices for developers.",
    category: "Git & GitHub",
    date: "Jul 2026",
    slug: "git-github",
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?q=80&w=1000&auto=format&fit=crop",
    htmlContent: gitGithubHtml,
    content: "## Version Control\n\nGit is a tool to track changes in your source code. GitHub is a platform to host those repositories.\n\n### Essential Commands:\n- `git clone <url>`\n- `git add .`\n- `git commit -m \"message\"`\n- `git push`"
  },
  {
    id: 7,
    title: "Databases",
    description: "An overview of SQL vs NoSQL for web applications.",
    category: "Database",
    date: "Jul 2026",
    slug: "databases",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop",
    content: "## SQL vs NoSQL\n\n- **SQL (Relational)**: PostgreSQL, MySQL. Great for structured data with clear relationships (like an e-commerce store).\n- **NoSQL (Document)**: MongoDB, Firebase. Great for unstructured data and rapid prototyping."
  },
  {
    id: 8,
    title: "Website Deployment",
    description: "How to take your code from localhost to production.",
    category: "Deployment",
    date: "Jun 2026",
    slug: "deployment",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    htmlContent: deploymentHtml,
    content: "## Deploying Your Work\n\nWhen you're ready to share your site with the world:\n- For frontend only (HTML/React): Use Vercel, Netlify, or GitHub Pages.\n- For full-stack: Use Vercel, Heroku, or DigitalOcean.\n\nAlways ensure your environment variables (like API keys) are secured before deploying!"
  },
  {
    id: 9,
    title: "Mastering TypeScript",
    description: "Add static typing to JavaScript for more robust web applications.",
    category: "TypeScript",
    date: "May 2026",
    slug: "typescript-basics",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop",
    content: "## Why TypeScript?\n\nTypeScript is a superset of JavaScript that adds static typing.\n\n- **Type Safety**: Catch errors during development instead of runtime.\n- **Interfaces**: Define the exact shape of your data objects.\n- **Tooling**: Unparalleled autocomplete and intellisense in VS Code."
  },
  {
    id: 10,
    title: "Next.js Framework",
    description: "The React framework for production-grade applications.",
    category: "Next.js",
    date: "May 2026",
    slug: "nextjs-framework",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1000&auto=format&fit=crop",
    content: "## Introduction to Next.js\n\nNext.js builds upon React to offer advanced features out of the box:\n\n- **SSR & SSG**: Server-Side Rendering and Static Site Generation for speed and SEO.\n- **App Router**: Modern directory-based routing system.\n- **API Routes**: Build your backend endpoints in the same project."
  },
  {
    id: 11,
    title: "Backend with Node.js",
    description: "Build scalable network applications using JavaScript on the server.",
    category: "Node.js",
    date: "Apr 2026",
    slug: "nodejs-backend",
    image: "https://images.unsplash.com/photo-1627398225258-14f20286b4ee?q=80&w=1000&auto=format&fit=crop",
    content: "## Node.js & Express\n\nTake JavaScript beyond the browser.\n\n- **Event Loop**: Non-blocking I/O makes Node very fast for web servers.\n- **Express.js**: The most popular minimalist framework for building APIs.\n- **NPM**: The massive ecosystem of open-source packages."
  },
  {
    id: 12,
    title: "Styling with Tailwind CSS",
    description: "Rapidly build modern websites without ever leaving your HTML.",
    category: "Tailwind",
    date: "Apr 2026",
    slug: "tailwind-css",
    image: "https://images.unsplash.com/photo-1618788372246-ce5f4e18bce6?q=80&w=1000&auto=format&fit=crop",
    content: "## Utility-First CSS\n\nTailwind completely changes how you style apps.\n\n- **No Custom CSS**: Use classes like `flex`, `pt-4`, `text-center`.\n- **Responsive**: Built-in prefixes like `md:` and `lg:` make mobile-first design a breeze.\n- **Customizable**: Easy to extend with your own brand colors in `tailwind.config.js`."
  }
];
