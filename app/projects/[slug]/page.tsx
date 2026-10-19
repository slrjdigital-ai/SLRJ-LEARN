import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPracticalProjects, getPracticalProjectBySlug } from "@/data/projectsData";
import ProjectWorkspace from "@/components/projects/ProjectWorkspace";

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllPracticalProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPracticalProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | SLRJ Learn",
    };
  }

  return {
    title: `${project.title} — Project Workspace | SLRJ Learn`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Practical Project | SLRJ Learn`,
      description: project.tagline,
      images: [project.demoOutputPreview],
    },
  };
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = getPracticalProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectWorkspace project={project} />;
}
