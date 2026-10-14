import { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects & Architecture Portfolio | SLRJ Learn",
  description:
    "Explore our production prototypes, full-stack web applications, e-commerce architectures, and verified performance benchmarks.",
  alternates: {
    canonical: "https://slrjlearn.in/projects",
  },
  openGraph: {
    title: "Projects & Architecture Portfolio | SLRJ Learn",
    description:
      "Explore our production prototypes, full-stack web applications, e-commerce architectures, and verified performance benchmarks.",
    url: "https://slrjlearn.in/projects",
    siteName: "SLRJ Learn",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
