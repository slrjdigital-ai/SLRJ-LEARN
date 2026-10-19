import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EVENTS_CATALOG, getEventBySlug } from "@/data/eventsData";
import EventDetailsView from "@/components/events/EventDetailsView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EVENTS_CATALOG.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | SLRJ Learn",
    };
  }

  return {
    title: `${event.title} | Events & Challenges | SLRJ Learn`,
    description: event.shortDescription,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-10 px-4 sm:px-6 lg:px-10">
      <EventDetailsView event={event} />
    </div>
  );
}
