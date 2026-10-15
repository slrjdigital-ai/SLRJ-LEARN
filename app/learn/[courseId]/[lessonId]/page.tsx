import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCourses, getCourseById } from "@/data/courses";
import PdfLessonPlayer from "@/components/course/PdfLessonPlayer";

interface LearnPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  const params: Array<{ courseId: string; lessonId: string }> = [];

  for (const course of courses) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        params.push({
          courseId: course.id,
          lessonId: lesson.id,
        });
        // Also allow slug as courseId for convenience
        params.push({
          courseId: course.slug,
          lessonId: lesson.id,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: LearnPageProps): Promise<Metadata> {
  const { courseId, lessonId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    return { title: "Lesson Not Found | SLRJ Learn" };
  }

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const lesson = allLessons.find((l) => l.id === lessonId) || allLessons[0];

  return {
    title: `${lesson?.title || "Lesson"} — ${course.title} | SLRJ Learn`,
    description: lesson?.content?.slice(0, 160) || course.shortDescription,
  };
}

export default async function LearnLessonPage({ params }: LearnPageProps) {
  const { courseId, lessonId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return <PdfLessonPlayer course={course} initialLessonId={lessonId} />;
}
