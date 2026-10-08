import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Snack Haven — Fine Dining & Menu Platform",
    category: "Business Website",
    status: "Concept Project",
    concept: true,
    description: "Modern digital dining portal featuring real-time menu browsing, table reservation requests, and smooth visual storytelling.",
    tags: ["Next.js 16", "Tailwind CSS", "Responsive Design", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop",
    url: "https://snack-haven.netlify.app",
    metric: "Performance First • Seamless Booking UX",
    problem: "Restaurants often lose potential diners due to slow-loading PDF menus, clunky mobile navigation, and confusing reservation workflows.",
    solution: "A responsive, interactive web application featuring fast visual menu filtering, instant item previews, and an intuitive reservation request flow.",
    keyFeatures: [
      "Real-time category filtering for menus and specials",
      "Mobile-optimized table reservation request form",
      "High-resolution dish gallery with optimized responsive images",
      "Direct Google Maps location and operating hours widget"
    ],
    goal: "Provide hospitality businesses with an engaging, fast platform that simplifies dining discovery and drives table inquiries.",
    overview: "Designed for hospitality venues seeking to capture online table reservations and showcase chef specials with instant responsiveness.",
    architectureHighlights: [
      "Lightweight responsive image optimization using modern picture elements",
      "Interactive digital menu filtering with smooth state transitions",
      "Mobile-first reservation request workflow"
    ],
    outcome: "Functional concept project demonstrating sub-second page transitions and seamless booking UX."
  },
  {
    id: 2,
    title: "PrimeEstate — Real Estate Property Engine",
    category: "Business Website",
    status: "Concept Project",
    concept: true,
    description: "High-performance property catalog featuring multi-attribute search, luxury listing filters, and integrated inquiry modals.",
    tags: ["React 19", "Maps Integration", "UI/UX Architecture", "TypeScript"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
    url: "https://real-estate66.netlify.app",
    metric: "Instant Client-Side Filtering & Search",
    problem: "Home buyers encounter slow and overwhelming property search engines that reload entire pages on every filter adjustment.",
    solution: "A reactive listing catalog with instantaneous client-side filtering by price, location, bedrooms, and property type.",
    keyFeatures: [
      "Multi-facet parameter search with instant UI feedback",
      "High-resolution property gallery modals with amenity tags",
      "Property-specific agent inquiry modal with form validation",
      "Interactive map overlays and neighborhood highlight cards"
    ],
    goal: "Demonstrate a streamlined, friction-free property discovery experience for real estate firms and independent brokers.",
    overview: "Architected to solve property discovery friction with instant client-side query matching and high-resolution photo galleries.",
    architectureHighlights: [
      "Optimized multi-facet property search (price, location, bedrooms)",
      "Interactive map integration and neighborhood accessibility highlights",
      "Lead generation capture directly tied to specific property IDs"
    ],
    outcome: "High-performance real estate blueprint with responsive multi-attribute filtering."
  },
  {
    id: 3,
    title: "ShopZen — Modern Headless E-Commerce",
    category: "E-Commerce",
    status: "Concept Project",
    concept: true,
    description: "End-to-end shopping experience featuring instant cart drawer, multi-currency layout, and streamlined checkout pipeline.",
    tags: ["Next.js", "Stripe Checkout", "State Management", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop",
    url: "https://shopzen1.netlify.app",
    metric: "Designed for Streamlined Checkout Flow",
    problem: "Complex checkout funnels, slow cart updates, and poor mobile drawer navigation contribute heavily to abandoned carts.",
    solution: "A modern headless e-commerce store with a slide-out cart drawer, instantaneous quantity recalculations, and clean checkout states.",
    keyFeatures: [
      "Slide-out persistent cart drawer with instant quantity controls",
      "Clear product variant selectors (sizes, colors, stock badges)",
      "Streamlined 3-step checkout funnel layout",
      "Fully responsive mobile shopping experience"
    ],
    goal: "Showcase an ultra-fast, user-friendly shopping experience designed to reduce customer hesitation and streamline buying.",
    overview: "Built to demonstrate frictionless e-commerce speed, eliminating cart abandonment friction through sub-second page transitions.",
    architectureHighlights: [
      "Persistent client-side cart drawer with real-time total recalculation",
      "Stripe payment gateway integration scaffolding",
      "Mobile-optimized one-thumb checkout layout"
    ],
    outcome: "Modern e-commerce store demo illustrating conversion-focused navigation and fluid cart management."
  },
  {
    id: 4,
    title: "GymForge — Athletic Performance & Membership",
    category: "Business Website",
    status: "Concept Project",
    concept: true,
    description: "High-energy fitness portal with trainer showcases, class schedule calendars, and recurring membership inquiry flows.",
    tags: ["TypeScript", "Tailwind CSS", "Motion Physics", "Mobile First"],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
    url: "https://gym-forge1.netlify.app",
    metric: "Mobile-First UI • Class Scheduling",
    problem: "Gyms often rely on static schedules that are unreadable on mobile phones, making it difficult for members to book classes or join.",
    solution: "A dynamic fitness web experience with clear weekly class timetables, trainer bios, and quick membership inquiry actions.",
    keyFeatures: [
      "Interactive weekly schedule grid filterable by discipline and time",
      "Trainer profile showcase with specializations and social links",
      "Transparent tier comparison for monthly and annual memberships",
      "One-click trial pass inquiry with WhatsApp link integration"
    ],
    goal: "Give fitness studios an energetic, high-contrast web presence that converts casual visitors into gym members.",
    overview: "Created for fitness clubs and training facilities needing strong brand authority and easy membership enrollment.",
    architectureHighlights: [
      "Weekly class timetable grid with trainer bio modals",
      "High-contrast dark aesthetic engineered for brand impact",
      "Fast member enrollment inquiry funnel"
    ],
    outcome: "High-impact brand positioning prototype engineered for mobile gym members."
  },
  {
    id: 5,
    title: "TradeSmart Pro — Corporate Fintech Landing",
    category: "Web Apps",
    status: "Concept Project",
    concept: true,
    description: "Enterprise landing page engineered for financial tools, featuring interactive market calculators and compliance disclosures.",
    tags: ["Next.js", "Analytics", "Security", "TypeScript"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    url: "https://tradesmart-pro1.netlify.app",
    metric: "Interactive Calculator • Clean Architecture",
    problem: "Financial SaaS products often struggle to communicate value clearly without overwhelming prospects with complex terminology.",
    solution: "A structured corporate landing page featuring an interactive ROI/yield calculator, trust disclosures, and clear value tiers.",
    keyFeatures: [
      "Interactive slider calculator estimating portfolio yield and savings",
      "Enterprise security disclosure cards and compliance architecture",
      "Feature comparison matrix highlighting SaaS plan tiers",
      "Spam-protected lead generation form with validation feedback"
    ],
    goal: "Demonstrate enterprise-level clarity, accessible data visualization, and professional trust architecture for fintech platforms.",
    overview: "Engineered to prove how complex corporate SaaS products can achieve clear visual communication without compromising on performance.",
    architectureHighlights: [
      "Zero layout shift with pre-reserved metric chart slots",
      "Automated lead capture form with honeypot security protection",
      "Accessible color contrast compliance throughout all dashboards"
    ],
    outcome: "Corporate fintech landing prototype demonstrating clear product positioning and interactive calculations."
  },
  {
    id: 6,
    title: "Aura Creative — Agency UI/UX & Design System",
    category: "UI/UX",
    status: "Concept Project",
    concept: true,
    description: "Bespoke design system showcase with fluid micro-interactions, dark cyberpunk aesthetic, and interactive typography scale.",
    tags: ["UI/UX Design", "Framer Motion", "Design Tokens", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
    url: "https://port-folio00.netlify.app",
    metric: "Custom Design Tokens • Fluid Motion",
    problem: "Digital brands frequently use generic, cookie-cutter templates that blend into competitors and fail to leave a memorable impression.",
    solution: "A bespoke creative agency showcase featuring dark cyber aesthetics, fluid micro-interactions, and custom design tokens.",
    keyFeatures: [
      "Custom typography scale with high-contrast cyber color tokens",
      "Smooth micro-interactions and hover states on interactive cards",
      "Modular design components adaptable for full-scale client brands",
      "Responsive layout tested across desktop, tablet, and mobile"
    ],
    goal: "Highlight SLRJ's custom frontend craft and demonstrate how bespoke design systems establish distinct market authority.",
    overview: "A pure design engineering showcase illustrating how custom design systems, smooth scrolling, and micro-interactions elevate agency authority.",
    architectureHighlights: [
      "Hardware-accelerated CSS GPU matrix transforms",
      "Custom color tokens with seamless contrast compliance",
      "Component-driven design architecture ready for enterprise handoff"
    ],
    outcome: "Interactive design system showcase demonstrating SLRJ's creative frontend craft."
  }
];
