import { Metadata } from "next";
import MyLearningRoadmapHub from "@/components/roadmap/MyLearningRoadmapHub";

export const metadata: Metadata = {
  title: "My Journey — Structured Learning Roadmap | SLRJ Learn",
  description:
    "Follow structured learning paths, build verified projects, and master software development with SLRJ Learn.",
};

export default function MyJourneyPage() {
  return <MyLearningRoadmapHub />;
}
