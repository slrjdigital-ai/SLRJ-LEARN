import { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Engineering Notes & Web Development Tutorials | SLRJ Digital",
  description:
    "Comprehensive full-stack engineering guides, React 19 / Next.js 16 architectural blueprints, performance optimization tutorials, and web development notes.",
  alternates: {
    canonical: "https://slrjdigital.in/blog",
  },
  openGraph: {
    title: "Engineering Notes & Web Development Tutorials | SLRJ Digital",
    description:
      "Comprehensive full-stack engineering guides, React 19 / Next.js 16 architectural blueprints, and web development notes.",
    url: "https://slrjdigital.in/blog",
    siteName: "SLRJ Digital",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
