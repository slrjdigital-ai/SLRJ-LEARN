import { Metadata } from "next";
import EventsComingSoonView from "@/components/events/EventsComingSoonView";

export const metadata: Metadata = {
  title: "Events — Coming Soon... | SLRJ Learn",
  description:
    "Live coding hackathons, speed-coding sprint tournaments, expert keynotes, and defensive security CTFs are coming soon to SLRJ Learn.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-10 px-4 sm:px-6 lg:px-10">
      <EventsComingSoonView />
    </div>
  );
}
