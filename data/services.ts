import { Briefcase, ShoppingCart, Layout, PenTool, Zap, Settings } from 'lucide-react';
import { Service } from '@/types';

export const services: Service[] = [
  {
    id: 1,
    slug: "business-websites",
    title: "Business Websites",
    description: "High-authority corporate and local business websites engineered to build trust, capture inbound inquiries, and turn casual visitors into paying clients.",
    deliverables: "Custom Responsive Architecture, Lead Generation Funnels, Headless CMS, Core Web Vitals SEO Suite",
    icon: Briefcase,
    link: "/contact?service=business-websites"
  },
  {
    id: 2,
    slug: "e-commerce",
    title: "E-Commerce Platforms",
    description: "Lightning-fast online stores engineered for frictionless checkout, high conversion rates, multi-currency support, and seamless catalog management.",
    deliverables: "Secure Payment Gateways (Stripe/Razorpay), Inventory Architecture, Cart Abandonment Recovery, Instant Search",
    icon: ShoppingCart,
    link: "/contact?service=ecommerce"
  },
  {
    id: 3,
    slug: "web-apps",
    title: "Web Applications & SaaS",
    description: "Scalable, full-stack interactive web applications, client portals, and SaaS MVPs developed with modern Next.js 16 App Router and robust databases.",
    deliverables: "Role-Based Authentication, Interactive Dashboards, REST/GraphQL Endpoints, Real-Time Database Architecture",
    icon: Layout,
    link: "/contact?service=web-apps"
  },
  {
    id: 4,
    slug: "ui-ux",
    title: "UI/UX Design Systems",
    description: "Research-backed, accessible digital interfaces that deliver captivating user journeys, reduce cognitive load, and command market leadership.",
    deliverables: "Interactive Figma Prototypes, Component Design Tokens, User Journey Mapping, Micro-Interaction Choreography",
    icon: PenTool,
    link: "/contact?service=ui-ux"
  },
  {
    id: 5,
    slug: "optimization",
    title: "Performance Optimization",
    description: "Comprehensive audits and full-codebase refactoring to transform slow, bloated websites into lightning-fast, high-performance web experiences.",
    deliverables: "Sub-Second TTFB Tuning, Next-Gen Asset Compression, Script Pruning, Edge Caching Strategies",
    icon: Zap,
    link: "/contact?service=optimization"
  },
  {
    id: 6,
    slug: "maintenance",
    title: "Ongoing Maintenance & Support",
    description: "Proactive monitoring, security patching, cloud backups, and on-demand engineer support to keep your website secure, modern, and running reliably.",
    deliverables: "Continuous Proactive Monitoring, Regular Automated Backups, Security Vulnerability Scans, Dedicated Support Requests",
    icon: Settings,
    link: "/contact?service=maintenance"
  }
];
