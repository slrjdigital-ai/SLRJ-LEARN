import { Metadata } from "next";
import { getAllCourses, getCourseBySlug } from "@/data/courses";
import LearnIDE from "@/components/playground/LearnIDE";

interface CoursePracticePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCourses().map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: CoursePracticePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  return {
    title: `${course?.title || "Coding Practice"} | Practice IDE | SLRJ Learn`,
    description: `Hands-on coding practice and interactive programming playground for ${
      course?.title || "computer science"
    }.`,
  };
}

export default async function CoursePracticePage({
  params,
}: CoursePracticePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  return (
    <LearnIDE
      courseSlug={slug}
      courseTitle={course?.title || "Coding Practice"}
    />
  );
}
