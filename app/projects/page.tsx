import { Metadata } from "next";
import ProjectsMainView from "@/components/projects/ProjectsMainView";

export const metadata: Metadata = {
  title: "Projects & Portfolio — Practical Engineering | SLRJ Learn",
  description:
    "Turn your skills into real projects. Build, document, and showcase production software applications across 8 career roadmaps with Playground integration and a verified public portfolio.",
  openGraph: {
    title: "Projects & Portfolio | SLRJ Learn Academy",
    description:
      "Explore 24+ practical software projects, guided milestones, starter code, interactive Playground sandbox, and public portfolio publishing.",
  },
};

export default function ProjectsPage() {
  return <ProjectsMainView />;
}
