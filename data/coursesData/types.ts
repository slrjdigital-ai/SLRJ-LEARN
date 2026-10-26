export interface PracticeExercise {
  id: string;
  type: "multiple-choice" | "code-challenge" | "fill-blank";
  prompt: string;
  codeStarter?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
  xpReward: number;
  content: string;
  introduction?: string;
  learningObjectives?: string[];
  syntaxRules?: string[];
  expectedOutput?: string;
  realWorldUseCase?: string;
  codeExample?: {
    language: string;
    code: string;
    output?: string;
    explanation: string;
  };
  commonMistakes?: Array<{
    wrong: string;
    correct: string;
    reason: string;
  }>;
  keyTakeaways: string[];
  exercise: PracticeExercise;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface PdfLesson {
  id: string;
  title: string;
  description: string;
  moduleTitle: string;
  fileUrl: string;
  fileSizeBytes?: number;
  fileSize: string;
  pageCount: number;
  displayOrder: number;
  downloadAllowed: boolean;
}

export interface Course {
  id: string;
  slug: string;
  aliases?: string[];
  title: string;
  description: string;
  shortDescription: string;
  thumbnailUrl: string;
  category:
    | "Programming Languages"
    | "Web Development"
    | "Data Structures & Algorithms"
    | "Tools & Developer Workflow"
    | "Artificial Intelligence & Machine Learning"
    | "Databases"
    | "Cloud & DevOps"
    | "Data Analytics"
    | "Cybersecurity"
    | string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedDuration: string;
  estimatedDurationMinutes: number;
  totalLessons: number;
  totalXp: number;
  icon: string;
  color: string;
  skills: string[];
  skillsGained: string[];
  prerequisites: string[];
  levelNumber?: 1 | 2 | 3;
  levelOrder?: number;
  trackId?: string;
  trackName?: string;
  prerequisiteCourseIds?: string[];
  requiredProjectSlug?: string;
  learningObjectives?: string[];
  learningOutcomes?: string[];
  accessType: "Free" | "Premium";
  isPaid?: boolean;
  price?: number;
  displayOrder?: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  modules: CourseModule[];
  pdfLessons: PdfLesson[];
}

export type CourseLevelId = "basic" | "intermediate" | "pro";

export interface CourseLevelInfo {
  id: CourseLevelId;
  levelNumber: 1 | 2 | 3;
  name: string;
  badgeLabel: string;
  title: string;
  subtitle: string;
  badgeClass: string;
  cardBorderClass: string;
  accentBgClass: string;
  headerGradientClass: string;
}
