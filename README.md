# SLRJ Learn 🎓
### Professional Online Learning Management Platform
**Parent Brand:** SLRJ Digital  
**Repository:** https://github.com/slrjdigital-ai/SLRJ-LEARN.git  
**Domain:** [https://slrjlearn.in](https://slrjlearn.in)

Welcome to **SLRJ Learn**, a comprehensive online learning management platform delivering PDF-based courses, digital handwritten notes, structured career roadmaps, interactive in-browser coding playgrounds, server-graded assessments, and verifiable landscape certificates with live QR verification.

---

## 🎨 Brand Identity & Design Tokens

Built adhering strictly to the SLRJ Learn & SLRJ Digital design system:

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Navy** | `#12316B` | Primary branding, buttons, headers, borders |
| **Secondary Blue** | `#2456A6` | Active navigation, interaction states, gradients |
| **Cyan Accent** | `#18B6D2` | Accents, badges, highlights, QR stamps |
| **Main Background** | `#F7F9FC` | Clean modern background |
| **Card Background** | `#FFFFFF` | Content containers, lesson panes |
| **Main Text** | `#182230` | High-contrast readable typography |
| **Secondary Text** | `#64748B` | Subheadings, metadata, descriptions |
| **Borders** | `#E2E8F0` | Dividers, card boundaries |
| **Success** | `#16865C` | Passed assessments, verified stamps |
| **Error** | `#C83C4A` | Validation alerts, revoked certificates |

---

## ✨ Features & Architecture

### 1. Public Learning Portal & Homepage
- **Hero Section**: *"Learn Skills. Build Projects. Grow Your Future."*
- **5 Learning Pillars**: Structured materials, self-paced learning, evaluated assessments, real analytics, and verifiable certificates.
- **Featured Course Catalog**: Web Development, Python, JavaScript/TypeScript, Data Structures & Algorithms, AI Engineering, and Relational Databases.
- **How It Works**: 5-step methodology (Discover → Enrol → Study & PDF Notes → Pass Server-Side Assessment → Earn Verified Certificate).
- **Certificate Preview**: Authentic landscape certificate design with live QR verification.
- **FAQ Accordion**: Answers to common learner questions.

### 2. Interactive Course Catalog & Syllabus (`/courses` & `/courses/[slug]`)
- Keyword search & filter by category, difficulty, and access type.
- Course syllabus breakdown with expandable module lists.
- Associated handwritten PDF handbooks and prerequisites.
- Direct entry into the focused lesson player.

### 3. Focused PDF Learning Experience (`/learn/[courseId]/[lessonId]`)
- Collapsible curriculum sidebar with real-time completion tracking.
- Structured lesson content with syntax-highlighted code blocks and one-click copy.
- Direct access to 17 real handwritten PDF handbooks from `public/pdfs/`.
- Socratic practice exercises with instant feedback and XP rewards.
- Previous/Next navigation and persistent completion saving in `localStorage`.
- Unlocks the final assessment upon completing all course lessons.

### 4. Server-Side Assessment Engine (`/dashboard/assessments/[id]`)
- Secure server-side scoring endpoint (`/api/assessments/submit`).
- Stripped client question endpoint (`/api/assessments/[id]`) to prevent answer leaking.
- 80% passing threshold for certificate eligibility.
- Answer review and explanation breakdowns after submission.

### 5. Verifiable Certificates & QR Verification (`/verify-certificate/[id]`)
- Official landscape certificate format branded with official SLRJ logo (`/logo.png`).
- Tamper-proof unique certificate IDs (e.g. `SLRJ-CERT-2026-WD101`).
- Authentic dynamic SVG QR code linking directly to public verification URL.
- One-click print / save to PDF functionality.
- Registry lookup with valid, revoked, and not-found status checks.

### 6. Protected Administrator Console (`/admin`)
- Overview metrics: Active learners, published courses, PDF handbooks, and issued certificates.
- Course and lesson syllabus oversight.
- PDF resources inventory (17 genuine handbooks).
- Server question bank review.
- Certificate audit trail with reason-based certificate revocation.

### 7. Transparent Pricing (`/pricing`)
- Open Community Plan: 100% free courses, notes, and certificates.
- Mentorship tier with pending payment gateway documentation.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **PDF Generation**: [`pdf-lib`](https://pdf-lib.js.org/) v1.17.1 & `sharp`
- **Email / OTP**: [`nodemailer`](https://nodemailer.com/) v10.0.13
- **Icons**: [`lucide-react`](https://lucide.dev/) v1.48.0 & `react-icons`
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)

---

## 📂 Key Route Structure

```text
├── app/
│   ├── page.tsx                                  # Upgraded Public Homepage
│   ├── courses/
│   │   ├── page.tsx                              # Course Catalog with Filters
│   │   └── [slug]/page.tsx                       # Course Details & Syllabus
│   ├── learn/
│   │   └── [courseId]/[lessonId]/page.tsx        # Focused PDF Lesson Player
│   ├── dashboard/
│   │   ├── page.tsx                              # Student Learning Dashboard
│   │   └── assessments/[assessmentId]/page.tsx   # Server-Scored Assessment Taking
│   ├── verify-certificate/
│   │   └── [certificateId]/page.tsx              # Public QR Verification Page
│   ├── admin/
│   │   └── page.tsx                              # Protected Administrator Console
│   ├── pricing/page.tsx                          # Transparent Plans & Pricing
│   ├── certificates/page.tsx                     # Certificates & Assessment Hub
│   ├── roadmap/                                  # 8 Role Roadmaps
│   ├── pdfs/                                     # 17 Downloadable PDF Handbooks
│   └── api/
│       ├── assessments/
│       │   ├── [assessmentId]/route.ts           # Sanitized questions fetch
│       │   └── submit/route.ts                   # Secure server-side grading
│       └── auth/                                 # OTP authentication routes
```

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/slrjdigital-ai/SLRJ-LEARN.git
cd SLRJ-LEARN
npm install
```

### 2. Environment Configuration
Create a `.env.local` file based on `.env.example`:
```env
# Email OTP Credentials (Nodemailer)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password

# Base URL for Certificate QR Verification
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📜 License & Parent Brand
&copy; 2026 **SLRJ Learn**. An educational initiative of **SLRJ Digital**. All rights reserved.
