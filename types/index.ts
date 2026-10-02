export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  concept?: boolean;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: any; // Lucide icon
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
