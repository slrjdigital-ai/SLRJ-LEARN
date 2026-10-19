import { Metadata } from "next";
import ExploreCoursesView from "@/components/courses/ExploreCoursesView";

export const metadata: Metadata = {
  title: "Explore Courses — SLRJ Learn",
  description:
    "Discover new skills, learn at your own pace, and build your future with structured curricula, in-browser code exercises, and accessible PDF course materials.",
};

export default function CoursesPage() {
  return <ExploreCoursesView />;
}
