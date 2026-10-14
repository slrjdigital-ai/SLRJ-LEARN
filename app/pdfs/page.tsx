import { Metadata } from "next";
import { getAllPdfs } from "@/data/pdfs";
import PdfsClient from "@/components/blog/PdfsClient";

export const metadata: Metadata = {
  title: "Free PDF Study Guides | SLRJ Learn",
  description:
    "Download or preview free PDF study handbooks covering Web Development, Data Structures & Algorithms, Python & AI, Operating Systems, DBMS & SQL, and Cloud DevOps.",
  alternates: {
    canonical: "https://slrjlearn.in/pdfs",
  },
  openGraph: {
    title: "Free Tech & CS PDF Study Library | SLRJ Learn",
    description:
      "Browse and download free PDF study guides covering Full-Stack Web Development, DSA, Python & AI, CS Core subjects, and Cloud DevOps.",
    url: "https://slrjlearn.in/pdfs",
    siteName: "SLRJ Learn",
  },
};

export default function PdfsDirectoryPage() {
  const pdfs = getAllPdfs();

  return (
    <div className="min-h-screen bg-[#080C16] text-white pt-20">
      <PdfsClient initialPdfs={pdfs} />
    </div>
  );
}
