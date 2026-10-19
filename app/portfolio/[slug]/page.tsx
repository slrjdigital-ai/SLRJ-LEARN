import { Metadata } from "next";
import PublicPortfolioView from "@/components/portfolio/PublicPortfolioView";

interface PortfolioPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "learner-portfolio" },
    { slug: "demo" },
    { slug: "shahid" },
  ];
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug} — Engineering Portfolio | SLRJ Learn`,
    description: "Explore verified engineering projects, production architectures, and skills on SLRJ Learn.",
  };
}

export default async function PublicPortfolioPage({ params }: PortfolioPageProps) {
  const { slug } = await params;
  return <PublicPortfolioView slug={slug} />;
}
