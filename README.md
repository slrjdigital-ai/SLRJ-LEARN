# SLRJ-LEARN 🚀
### Modern Computer Science & Software Engineering Learning Portal

Welcome to **SLRJ-LEARN**, a comprehensive full-stack education and tech learning hub built by [SLRJ Digital](https://slrjdigital.in). Designed for aspiring developers, computer science students, and interview prep candidates.

---

## ✨ Features & Highlights

- 📚 **Comprehensive Study Guides & Notes**:
  - Detailed, curated notes across Web Fundamentals, JavaScript, React & Next.js, Data Structures & Algorithms (DSA), Python & AI, Backend Systems & APIs, Cloud & DevOps, and CS Core.
  - Interactive code blocks with one-click copy and live code visualization.
  - In-browser interactive chapter quizzes to test knowledge retention.
  - Table of contents with active scroll-spying and reading time estimates.

- 🗺️ **Interactive Learning Roadmaps**:
  - Step-by-step career tracks (Full-Stack Web Developer, Frontend, Backend, AI/ML, DevOps, DSA).
  - Progress tracker allowing learners to check off completed milestones.

- 📄 **Downloadable Tech Cheatsheets & Handbooks**:
  - Quick-reference downloadable PDF handbooks generated using `pdf-lib`.
  - Built-in PDF preview modal with direct download links.

- 🔐 **Authentication & Student Dashboard**:
  - Secure OTP-based authentication via Nodemailer.
  - Dedicated student dashboard with enrolled roadmap progress, saved notes, and learning stats.

- 🎨 **Cutting-Edge UI / UX**:
  - Dark-mode cyberpunk / futuristic aesthetic with neon accents (cyan, purple, emerald, amber).
  - Smooth scrolling powered by **Lenis**.
  - Fluid animations with **Framer Motion**.
  - Interactive mouse spotlights, ambient background lights, and 3D visual elements.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **PDF Generation**: [pdf-lib](https://pdf-lib.js.org/)
- **Email / OTP**: [Nodemailer](https://nodemailer.com/)

---

## 📂 Project Structure

```text
├── app/
│   ├── api/               # API routes (Auth OTP, Newsletter, Contact, Feedback)
│   ├── about/             # About SLRJ Digital & Team
│   ├── contact/           # Contact form & inquiry
│   ├── dashboard/         # User learning dashboard & progress
│   ├── login/ & register/ # OTP authentication pages
│   ├── notes/             # Note catalog & dynamic slug reader
│   ├── pdfs/              # PDF handbooks & cheatsheets
│   ├── projects/          # Showcase projects
│   ├── roadmap/           # Interactive career roadmap tracks
│   ├── services/          # Tech services & solutions
│   ├── layout.tsx         # Global layout & metadata
│   └── page.tsx           # Home learning portal
├── components/
│   ├── blog/              # Learning components (NoteCard, RoadmapTracker, Quizzes, etc.)
│   ├── AuthGuard.tsx      # Route protection guard
│   ├── Navbar.tsx         # Responsive navigation bar
│   ├── Footer.tsx         # Footer with quick links & newsletter
│   └── ...                # Animated backgrounds, spotlights & visual components
├── context/
│   └── AuthContext.tsx    # Global auth context & session handling
├── data/
│   ├── notes.ts           # Curated tech notes & quiz content
│   ├── pdfs.ts            # Handbook metadata
│   └── roadmap.ts         # Career roadmap milestone definitions
├── lib/                   # Email auth and helper utilities
├── public/                # Static assets, logos, and generated PDFs
└── scripts/
    └── generate-pdfs.js   # Script to generate PDF cheatsheets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- npm, yarn, pnpm, or bun

### 1. Clone the repository
```bash
git clone https://github.com/slrjdigital-ai/SLRJ-LEARN.git
cd SLRJ-LEARN
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local` and set your credentials:
```bash
cp .env.example .env.local
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📜 License & Credits

Built with ❤️ by [SLRJ Digital](https://slrjdigital.in). All rights reserved.
