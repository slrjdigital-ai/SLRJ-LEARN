import { Metadata } from "next";
import RoleRoadmapsView from "@/components/roadmap/RoleRoadmapsView";

export const metadata: Metadata = {
  title: "Role Roadmaps | SLRJ Learn Academy",
  description:
    "Choose your career path. Follow your roadmap. Build job-ready skills with structured PDF courses, practical projects, and verifiable milestones.",
  openGraph: {
    title: "Role Roadmaps — Career Development Paths | SLRJ Learn",
    description:
      "Explore 8 in-demand software and tech career roadmaps with integrated learning resources, curriculum stages, and portfolio projects.",
  },
};

export default function RoadmapPage() {
  return <RoleRoadmapsView />;
}
