import { Metadata } from "next";
import { getAllNotes } from "@/data/notes";
import NotesClient from "@/components/blog/NotesClient";

export const metadata: Metadata = {
  title: "Computer Science, Programming & Tech Notes | SLRJ Learn",
  description:
    "Explore our complete library of engineering study notes across Web Development, Data Structures & Algorithms, Python & AI, CS Core, and Cloud DevOps.",
  alternates: {
    canonical: "https://slrjlearn.in/notes",
  },
  openGraph: {
    title: "Engineering Study Notes & Tutorials | SLRJ Learn",
    description: "Browse curated notes on Web Development, DSA, Python & AI, Operating Systems, DBMS & SQL, and Cloud DevOps.",
    url: "https://slrjlearn.in/notes",
    siteName: "SLRJ Learn",
  },
};

interface NotesPageProps {
  searchParams?: Promise<{ category?: string }>;
}

export default async function NotesDirectoryPage({ searchParams }: NotesPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const selectedCategory = resolvedParams.category || "All";
  const notes = getAllNotes();

  return (
    <div className="min-h-screen bg-[#080C16] text-white pt-20">
      <NotesClient
        initialNotes={notes}
        selectedCategoryFromQuery={selectedCategory}
      />
    </div>
  );
}
