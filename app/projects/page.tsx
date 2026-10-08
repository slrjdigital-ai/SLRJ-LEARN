import { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects & Architecture Portfolio | SLRJ Digital",
  description:
    "Explore our production prototypes, full-stack web applications, e-commerce architectures, and verified performance benchmarks.",
  alternates: {
    canonical: "https://slrjdigital.com/projects",
  },
  openGraph: {
    title: "Projects & Architecture Portfolio | SLRJ Digital",
    description:
      "Explore our production prototypes, full-stack web applications, e-commerce architectures, and verified performance benchmarks.",
    url: "https://slrjdigital.com/projects",
    siteName: "SLRJ Digital",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
