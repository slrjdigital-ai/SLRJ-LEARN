import { Metadata } from "next";
import { getCertificateById } from "@/data/certificatesStore";
import CertificateVerificationView from "@/components/certificates/CertificateVerificationView";

interface VerifyPageProps {
  params: Promise<{
    certificateId: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { certificateId: "SLRJ-CERT-2026-WD101" },
    { certificateId: "SLRJ-CERT-2026-PY101" },
    { certificateId: "SLRJ-CERT-2026-HACK-SAAS" },
    { certificateId: "SLRJ-CERT-2026-ROADMAP-FE" },
    { certificateId: "demo" },
  ];
}

export async function generateMetadata({ params }: VerifyPageProps): Promise<Metadata> {
  const { certificateId } = await params;
  const cert = getCertificateById(certificateId);

  if (!cert) {
    return {
      title: "Certificate Verification | SLRJ Learn",
      description: "Verify authentic certificates issued by SLRJ Learn.",
    };
  }

  const title = cert.sourceTitle || (cert as any).courseTitle || cert.title;

  return {
    title: `Verified Certificate — ${cert.learnerName} | SLRJ Learn`,
    description: `Official Certificate of Completion awarded to ${cert.learnerName} for ${title}.`,
  };
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { certificateId } = await params;
  const cert = getCertificateById(certificateId);

  return <CertificateVerificationView certificate={cert} certificateId={certificateId} />;
}
