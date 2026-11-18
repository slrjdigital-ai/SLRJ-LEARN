"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PracticeCoursesView from "@/components/playground/PracticeCoursesView";
import LearnIDE from "@/components/playground/LearnIDE";
import { getCourseBySlug } from "@/data/courses";

function PracticeContent() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");

  if (courseSlug) {
    const course = getCourseBySlug(courseSlug);
    return (
      <LearnIDE
        courseSlug={courseSlug}
        courseTitle={course?.title || "Coding Practice"}
      />
    );
  }

  return <PracticeCoursesView />;
}

export default function PracticeClient() {
  return (
    <Suspense
      fallback={
        <div className="py-24 flex flex-col items-center justify-center text-slate-500 gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#12316B] border-t-transparent animate-spin" />
          <span className="text-xs font-mono font-bold text-slate-600">
            Loading Practice Catalog...
          </span>
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
