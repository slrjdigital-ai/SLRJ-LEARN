import { Metadata } from "next";
import MyCertificatesMainView from "@/components/certificates/MyCertificatesMainView";

export const metadata: Metadata = {
  title: "My Certificates — Digital Credential Wallet | SLRJ Learn",
  description:
    "View, verify, download, and share official verifiable certificates and credentials earned through courses, role roadmaps, practical projects, and hackathons.",
  openGraph: {
    title: "My Certificates | SLRJ Learn Academy",
    description:
      "Explore verifiable digital credentials, print-ready landscape PDF certificates, and instant online QR verification.",
  },
};

export default function CertificatesPage() {
  return (
    <div className="space-y-8 pb-16">
      <MyCertificatesMainView />
    </div>
  );
}
