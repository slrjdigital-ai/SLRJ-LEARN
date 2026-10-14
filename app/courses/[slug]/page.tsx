import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCourses, getCourseBySlug } from "@/data/courses";
import CourseLearningView from "@/components/course/CourseLearningView";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found | SLRJ Learn",
    };
  }

  return {
    title: `${course.title} | SLRJ Learn`,
    description: course.shortDescription,
    openGraph: {
      title: `${course.title} | SLRJ Learn`,
      description: course.shortDescription,
    },
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseLearningView course={course} />;
}
