import type { ElementType } from "react";

export interface Project {
  id: number;
  title: string;
  category: string;
  status: "Concept Project" | "Demo Project" | "Client Project";
  description: string;
  tags: string[];
  image: string;
  concept?: boolean;
  metric?: string;
  url?: string;
  problem?: string;
  solution?: string;
  keyFeatures?: string[];
  goal?: string;
  overview?: string;
  architectureHighlights?: string[];
  outcome?: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  deliverables?: string;
  icon: ElementType;
  link: string;
}
