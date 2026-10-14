import { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact & Community | SLRJ Learn",
  description:
    "Request support, community inquiries, or direct WhatsApp assistance with SLRJ Learn.",
  alternates: {
    canonical: "https://slrjlearn.in/contact",
  },
  openGraph: {
    title: "Contact & Community | SLRJ Learn",
    description:
      "Request support, community inquiries, or direct WhatsApp assistance with SLRJ Learn.",
    url: "https://slrjlearn.in/contact",
    siteName: "SLRJ Learn",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
