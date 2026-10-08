import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Snack Haven — Fine Dining & Menu Platform",
    category: "Business Website",
    description: "Modern digital dining portal featuring real-time menu browsing, table reservation requests, and smooth visual storytelling.",
    tags: ["Next.js 16", "Tailwind CSS", "Responsive Design", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop",
    concept: true,
    url: "https://snack-haven.netlify.app",
    metric: "Sub-350ms TTFB & 100/100 Core Web Vitals",
    overview: "Designed for high-end hospitality venues seeking to capture online table reservations and showcase chef specials with instant responsiveness.",
    architectureHighlights: [
      "Lightweight responsive image optimization using modern picture elements",
      "Interactive digital menu filtering with zero layout shift (CLS 0.00)",
      "Mobile-first reservation request workflow"
    ],
    outcome: "Production prototype demonstrating sub-second load times and seamless booking UX."
  },
  {
    id: 2,
    title: "PrimeEstate — Real Estate Property Engine",
    category: "Business Website",
    description: "High-performance property catalog featuring multi-attribute search, luxury listing filters, and integrated inquiry modals.",
    tags: ["React 19", "Maps Integration", "UI/UX Architecture", "TypeScript"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
    concept: true,
    url: "https://real-estate66.netlify.app",
    metric: "Instant Client-Side Filtering & Zero Delay",
    overview: "Architected to solve property discovery friction with instant client-side query matching and high-resolution photo galleries.",
    architectureHighlights: [
      "Optimized multi-facet property search (price, location, bedrooms)",
      "Interactive map overlays and neighborhood accessibility highlights",
      "Lead generation capture directly tied to specific property IDs"
    ],
    outcome: "Demonstrates ultra-responsive real estate lead generation architecture."
  },
  {
    id: 3,
    title: "ShopZen — Modern Headless E-Commerce",
    category: "E-Commerce",
    description: "End-to-end shopping experience featuring instant cart drawer, multi-currency layout, and streamlined checkout pipeline.",
    tags: ["Next.js", "Stripe Checkout", "State Management", "Tailwind"],
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop",
    concept: true,
    url: "https://shopzen1.netlify.app",
    metric: "Optimized 3-Step Checkout Funnel Architecture",
    overview: "Built to demonstrate frictionless e-commerce speed, eliminating cart abandonment friction through sub-second page transitions.",
    architectureHighlights: [
      "Persistent client-side cart drawer with real-time total recalculation",
      "Stripe payment gateway integration scaffolding",
      "Mobile-optimized one-thumb checkout layout"
    ],
    outcome: "Full-scale e-commerce blueprint with proven low-friction checkout UX."
  },
  {
    id: 4,
    title: "GymForge — Athletic Performance & Membership",
    category: "Business Website",
    description: "High-energy fitness portal with trainer showcases, class schedule calendars, and recurring membership inquiry flows.",
    tags: ["TypeScript", "Tailwind CSS", "Motion Physics", "Mobile First"],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
    concept: true,
    url: "https://gym-forge1.netlify.app",
    metric: "98+ Mobile Performance & High-Energy UX",
    overview: "Created for fitness clubs and training facilities needing strong brand authority and easy membership enrollment.",
    architectureHighlights: [
      "Weekly class timetable grid with trainer bio modals",
      "High-contrast dark aesthetic engineered for brand impact",
      "Fast member enrollment inquiry funnel"
    ],
    outcome: "High-impact brand positioning with verified mobile performance scores."
  },
  {
    id: 5,
    title: "TradeSmart Pro — Corporate Fintech Landing",
    category: "Web Apps",
    description: "Enterprise landing page engineered for financial tools, featuring interactive market calculators and compliance disclosures.",
    tags: ["Next.js", "Analytics", "Core Web Vitals", "Security"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    concept: true,
    url: "https://tradesmart-pro1.netlify.app",
    metric: "Verified 100/100 Core Web Vitals Benchmark",
    overview: "Engineered to prove how complex corporate SaaS products can achieve perfect Lighthouse performance scores without compromising on visuals.",
    architectureHighlights: [
      "Zero cumulative layout shift with pre-reserved metric chart slots",
      "Automated lead capture form with honeypot security protection",
      "Strict WCAG AA contrast compliance throughout all dashboards"
    ],
    outcome: "Benchmark corporate fintech prototype with flawless performance metrics."
  },
  {
    id: 6,
    title: "Aura Creative — Agency UI/UX & Design System",
    category: "UI/UX",
    description: "Bespoke design system showcase with fluid micro-interactions, dark cyberpunk aesthetic, and interactive typography scale.",
    tags: ["UI/UX Design", "Framer Motion", "Design Tokens", "Bespoke CSS"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
    concept: true,
    url: "https://port-folio00.netlify.app",
    metric: "60 FPS Hardware-Accelerated Animation Pipeline",
    overview: "A pure design engineering showcase illustrating how custom design systems, smooth scrolling, and micro-interactions elevate agency authority.",
    architectureHighlights: [
      "Hardware-accelerated CSS GPU matrix transforms",
      "Custom color tokens with seamless contrast compliance",
      "Component-driven design architecture ready for enterprise handoff"
    ],
    outcome: "Award-caliber interactive design system demonstrating SLRJ's frontend craft."
  }
];
