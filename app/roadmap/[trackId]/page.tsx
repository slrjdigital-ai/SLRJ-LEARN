import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROADMAP_TRACKS, ROADMAP_STEPS } from "@/data/roadmap";
import RoadmapDetailsView from "@/components/roadmap/RoadmapDetailsView";

interface LearningPathPageProps {
  params: Promise<{ trackId: string }>;
}

export async function generateStaticParams() {
  return ROADMAP_TRACKS.map((track) => ({
    trackId: track.id,
  }));
}

export async function generateMetadata({ params }: LearningPathPageProps): Promise<Metadata> {
  const { trackId } = await params;
  const track = ROADMAP_TRACKS.find((t) => t.id === trackId);

  if (!track) {
    return {
      title: "Career Roadmap Not Found | SLRJ Learn",
    };
  }

  return {
    title: `${track.name} Career Roadmap | SLRJ Learn`,
    description: track.description,
    openGraph: {
      title: `${track.name} Curriculum & Stages | SLRJ Learn`,
      description: track.description,
    },
  };
}

export default async function LearningPathDetailPage({ params }: LearningPathPageProps) {
  const { trackId } = await params;
  const track = ROADMAP_TRACKS.find((t) => t.id === trackId);

  if (!track) {
    notFound();
  }

  const steps = ROADMAP_STEPS.filter((s) => s.trackId === track.id);

  return <RoadmapDetailsView track={track} steps={steps} />;
}
