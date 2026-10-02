import { Briefcase, ShoppingCart, Layout, PenTool, Zap, Settings } from 'lucide-react';

export const services = [
  {
    id: 1,
    title: "Business Websites",
    description: "Professional websites designed to establish your brand authority and generate leads.",
    deliverables: "Custom Design, SEO Optimization, CMS Integration, Analytics",
    icon: Briefcase,
    link: "/contact?service=business-websites"
  },
  {
    id: 2,
    title: "E-Commerce Platforms",
    description: "High-converting online stores built for scale, performance, and seamless checkout.",
    deliverables: "Payment Gateways, Inventory Management, Cart Optimization",
    icon: ShoppingCart,
    link: "/contact?service=ecommerce"
  },
  {
    id: 3,
    title: "Web Applications",
    description: "Complex, interactive SaaS or internal tools built with modern React & Next.js architectures.",
    deliverables: "Authentication, Dashboards, API Integration, Database",
    icon: Layout,
    link: "/contact?service=web-apps"
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "Data-driven, accessible, and stunning interfaces that prioritize user experience.",
    deliverables: "Wireframes, Interactive Prototypes, Design Systems",
    icon: PenTool,
    link: "/contact?service=ui-ux"
  },
  {
    id: 5,
    title: "Performance Optimization",
    description: "Comprehensive audits and code refactoring to achieve perfect Core Web Vitals.",
    deliverables: "Speed Optimization, Code Splitting, Image Compression",
    icon: Zap,
    link: "/contact?service=optimization"
  },
  {
    id: 6,
    title: "Maintenance & Support",
    description: "Continuous updates, security patches, and technical support to keep you running smoothly.",
    deliverables: "24/7 Monitoring, Weekly Backups, Feature Updates",
    icon: Settings,
    link: "/contact?service=maintenance"
  }
];
