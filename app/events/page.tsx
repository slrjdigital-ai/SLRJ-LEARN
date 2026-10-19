import { Metadata } from "next";
import EventsMainView from "@/components/events/EventsMainView";

export const metadata: Metadata = {
  title: "Events & Challenges | SLRJ Learn",
  description:
    "Explore hackathons, coding challenges, technical workshops, and defensive security labs. Compete, collaborate, build practical skills, and earn verified credentials.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-10 px-4 sm:px-6 lg:px-10">
      <EventsMainView />
    </div>
  );
}
