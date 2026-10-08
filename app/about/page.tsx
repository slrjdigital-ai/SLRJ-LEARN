import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | SLRJ Digital - Values, Architecture & Leadership",
  description:
    "Discover the engineering philosophy behind SLRJ Digital. Rooted in Sankalp, Lakshya, Rachna, and Josh, we engineer high-performance web platforms and bespoke digital experiences.",
  alternates: {
    canonical: "https://slrjdigital.com/about",
  },
  openGraph: {
    title: "About SLRJ Digital | High-Performance Web Agency",
    description:
      "Rooted in four timeless pillars: Sankalp, Lakshya, Rachna, and Josh. Discover our architecture, precision engineering lifecycle, and leadership.",
    url: "https://slrjdigital.com/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
