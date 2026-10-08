import type { ElementType } from "react";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  concept?: boolean;
  metric?: string;
  url?: string;
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

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  slug: string;
  image?: string;
  content?: string;
  htmlContent?: string;
}
