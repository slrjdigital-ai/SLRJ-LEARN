import { Suspense } from "react";
import { Metadata } from "next";
import ExploreCoursesView from "@/components/courses/ExploreCoursesView";

export const metadata: Metadata = {
  title: "Explore Courses — SLRJ Learn",
  description:
    "Discover new skills, learn at your own pace, and build your future with structured curricula, in-browser code exercises, and accessible PDF course materials.",
};

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-12 flex flex-col items-center justify-center space-y-3 text-slate-500">
          <div className="w-8 h-8 rounded-full border-3 border-slate-300 border-t-[#12316B] animate-spin" />
          <p className="text-sm font-semibold">Loading courses catalog...</p>
        </div>
      }
    >
      <ExploreCoursesView />
    </Suspense>
  );
}

