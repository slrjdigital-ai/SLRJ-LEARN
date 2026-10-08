import { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact & Project Consultation | SLRJ Digital",
  description:
    "Request an architectural consultation, fixed-price project proposal, or direct WhatsApp inquiry for your web development or design project with SLRJ Digital.",
  alternates: {
    canonical: "https://slrjdigital.com/contact",
  },
  openGraph: {
    title: "Contact & Project Consultation | SLRJ Digital",
    description:
      "Request an architectural consultation, fixed-price project proposal, or direct WhatsApp inquiry with SLRJ Digital.",
    url: "https://slrjdigital.com/contact",
    siteName: "SLRJ Digital",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
