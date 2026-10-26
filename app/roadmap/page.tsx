import { Metadata } from "next";
import MyLearningRoadmapHub from "@/components/roadmap/MyLearningRoadmapHub";

export const metadata: Metadata = {
  title: "My Learning Roadmap | SLRJ Learn",
  description:
    "Learn. Build. Grow. Structured learning roadmap for programming, computer science, and AI. Follow sequenced levels, check prerequisites, and complete practical projects.",
  openGraph: {
    title: "My Learning Roadmap — Sequenced Career Pathways | SLRJ Learn",
    description:
      "Structured learning progression from fundamentals to real-world projects and advanced specializations.",
  },
};

export default function RoadmapPage() {
  return <MyLearningRoadmapHub />;
}
