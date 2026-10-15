import { Metadata } from "next";
import TopicsDashboard from "@/components/micro-lessons/TopicsDashboard";

export const metadata: Metadata = {
  title: "Explore Topics — Micro-Learning Library | SLRJ Learn",
  description:
    "Bite-sized, SoloLearn-inspired micro-lessons. Master Python in 10 minutes, JavaScript interactive challenges, AI concepts, soft skills, resume building, and coding puzzles.",
};

export default function TopicsPage() {
  return <TopicsDashboard />;
}
