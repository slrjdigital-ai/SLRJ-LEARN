import { Metadata } from "next";
import EventsComingSoonView from "@/components/events/EventsComingSoonView";

export const metadata: Metadata = {
  title: "Events — Coming Soon... | SLRJ Learn",
  description: "Live events and challenges are coming soon to SLRJ Learn.",
};

export default function EventDetailPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-10 px-4 sm:px-6 lg:px-10">
      <EventsComingSoonView />
    </div>
  );
}
