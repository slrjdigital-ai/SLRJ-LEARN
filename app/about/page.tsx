import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | SLRJ Learn - Values & Architecture",
  description:
    "Discover the engineering philosophy behind SLRJ Learn. Rooted in Sankalp, Lakshya, Rachna, and Josh, we engineer high-performance web platforms and educational experiences.",
  alternates: {
    canonical: "https://slrjlearn.in/about",
  },
  openGraph: {
    title: "About SLRJ Learn | Learning Platform & Engineering Hub",
    description:
      "Rooted in four timeless pillars: Sankalp, Lakshya, Rachna, and Josh. Discover our architecture and precision engineering lifecycle.",
    url: "https://slrjlearn.in/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
