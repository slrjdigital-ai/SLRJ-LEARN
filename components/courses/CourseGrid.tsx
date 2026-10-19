"use client";

import { Course } from "@/data/courses";
import CourseCard from "./CourseCard";

interface CourseGridProps {
  courses: Course[];
  onOpenQuickRead?: (course: Course) => void;
}

export default function CourseGrid({ courses, onOpenQuickRead }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onOpenQuickRead={onOpenQuickRead}
        />
      ))}
    </div>
  );
}
