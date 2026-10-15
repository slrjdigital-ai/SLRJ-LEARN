import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllMicroTopics, getMicroTopicBySlug } from "@/data/microTopics";
import MicroLessonView from "@/components/micro-lessons/MicroLessonView";

interface MicroLessonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const topics = getAllMicroTopics();
  return topics.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: MicroLessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = getMicroTopicBySlug(slug);

  if (!series) {
    return {
      title: "Micro-Lesson Not Found | SLRJ Learn",
    };
  }

  return {
    title: `${series.title} — ${series.seriesTitle} | SLRJ Learn`,
    description: series.description,
  };
}

export default async function MicroLessonDetailPage({ params }: MicroLessonPageProps) {
  const { slug } = await params;
  const series = getMicroTopicBySlug(slug);

  if (!series) {
    notFound();
  }

  return <MicroLessonView series={series} />;
}
