// ============================================================================
// SLRJ Learn — Authoritative Certificates & Credentials Store
// In-memory persistent registry for verifiable certificates issued for
// Courses, Role Roadmaps, Practical Projects, and Events/Hackathons.
// ============================================================================

export type CertificateCategory =
  | "Course"
  | "Roadmap"
  | "Project"
  | "Event"
  | "Special";

export interface CertificateRecord {
  id: string; // e.g. SLRJ-CERT-2026-WD101
  learnerName: string;
  learnerEmail?: string;
  title: string;
  category: CertificateCategory;
  sourceType: "course" | "roadmap" | "project" | "event" | "custom";
  sourceId: string;
  sourceTitle: string;
  courseTitle?: string; // backwards compatibility alias for sourceTitle
  courseId?: string; // backwards compatibility alias for sourceId
  issueDate: string;
  scorePercentage?: number;
  status: "valid" | "revoked";
  revocationReason?: string;
  issuer: string;
  skillsGained: string[];
  verifiedAt?: string;
  verificationUrl?: string;
}

// In-memory seed database with verifiable certificates
const INITIAL_CERTIFICATES: Record<string, CertificateRecord> = {
  "SLRJ-CERT-2026-WD101": {
    id: "SLRJ-CERT-2026-WD101",
    learnerName: "Shahid",
    learnerEmail: "shahid@slrjlearn.in",
    title: "Certificate of Course Completion",
    category: "Course",
    sourceType: "course",
    sourceId: "course-web-dev-101",
    sourceTitle: "Web Development Foundations: HTML5, CSS3 & JavaScript",
    issueDate: "October 15, 2026",
    scorePercentage: 100,
    status: "valid",
    issuer: "SLRJ Learn Academy • SLRJ Digital",
    skillsGained: ["Semantic HTML5", "Modern CSS Layouts (Grid & Flexbox)", "DOM Events", "Responsive Design"],
    verifiedAt: "2026-10-15T12:00:00.000Z",
  },

  "SLRJ-CERT-2026-PY101": {
    id: "SLRJ-CERT-2026-PY101",
    learnerName: "Kouluri Shahid",
    learnerEmail: "shahid@slrjlearn.in",
    title: "Certificate of Programming Mastery",
    category: "Course",
    sourceType: "course",
    sourceId: "course-python-101",
    sourceTitle: "Python Programming: Zero to Production",
    issueDate: "October 14, 2026",
    scorePercentage: 100,
    status: "valid",
    issuer: "SLRJ Learn Academy • SLRJ Digital",
    skillsGained: ["Object-Oriented Python", "Data Structures", "Algorithm Optimization", "File I/O"],
    verifiedAt: "2026-10-14T10:00:00.000Z",
  },

  "SLRJ-CERT-2026-HACK-SAAS": {
    id: "SLRJ-CERT-2026-HACK-SAAS",
    learnerName: "Shahid",
    learnerEmail: "shahid@slrjlearn.in",
    title: "Hackathon Finalist Distinction Certificate",
    category: "Event",
    sourceType: "event",
    sourceId: "evt-hackathon-saas-2026",
    sourceTitle: "Build Something Amazing: Full-Stack SaaS Hackathon",
    issueDate: "October 16, 2026",
    scorePercentage: 96,
    status: "valid",
    issuer: "SLRJ Innovation Labs • SLRJ Digital",
    skillsGained: ["Full-Stack Architecture", "Next.js 16 & Turbopack", "Stripe API Integration", "CI/CD Deployment"],
    verifiedAt: "2026-10-16T18:00:00.000Z",
  },

  "SLRJ-CERT-2026-ROADMAP-FE": {
    id: "SLRJ-CERT-2026-ROADMAP-FE",
    learnerName: "Kouluri Shahid",
    learnerEmail: "shahid@slrjlearn.in",
    title: "Career Track Completion Certificate",
    category: "Roadmap",
    sourceType: "roadmap",
    sourceId: "frontend",
    sourceTitle: "Frontend Developer Career Roadmap",
    issueDate: "October 12, 2026",
    scorePercentage: 98,
    status: "valid",
    issuer: "SLRJ Engineering Guild • SLRJ Digital",
    skillsGained: ["React 19 & Next.js", "Tailwind CSS", "TypeScript", "Performance & Web Vitals"],
    verifiedAt: "2026-10-12T15:30:00.000Z",
  },

  "demo": {
    id: "demo",
    learnerName: "Sample Learner",
    learnerEmail: "learner@slrjlearn.in",
    title: "Certificate of Course Completion",
    category: "Course",
    sourceType: "course",
    sourceId: "course-web-dev-101",
    sourceTitle: "Web Development Foundations: HTML5, CSS3 & JavaScript",
    issueDate: "October 15, 2026",
    scorePercentage: 92,
    status: "valid",
    issuer: "SLRJ Learn Academy • SLRJ Digital",
    skillsGained: ["HTML5", "CSS3", "JavaScript"],
    verifiedAt: "2026-10-15T08:00:00.000Z",
  },
};

// Global in-memory cache
declare global {
  var __slrjCertificatesCache: Record<string, CertificateRecord> | undefined;
}

function getStore(): Record<string, CertificateRecord> {
  if (!global.__slrjCertificatesCache) {
    global.__slrjCertificatesCache = { ...INITIAL_CERTIFICATES };
  }
  return global.__slrjCertificatesCache;
}

export function getCertificateById(id: string): CertificateRecord | null {
  const store = getStore();
  const cert = store[id] || store[id.toUpperCase()] || store[id.toLowerCase()];
  return cert || null;
}

export function issueCertificate(params: {
  learnerName: string;
  learnerEmail?: string;
  title?: string;
  category?: CertificateCategory;
  sourceType?: "course" | "roadmap" | "project" | "event" | "custom";
  sourceId?: string;
  sourceTitle?: string;
  courseId?: string; // backwards compatibility
  courseTitle?: string; // backwards compatibility
  scorePercentage?: number;
  skillsGained?: string[];
  issuer?: string;
}): CertificateRecord {
  const store = getStore();

  const resolvedSourceId = params.sourceId || params.courseId || "course-gen";
  const resolvedSourceTitle = params.sourceTitle || params.courseTitle || "Course Study";

  // Create unique, non-predictable certificate identifier
  const prefix = (params.sourceType || "CERT").toUpperCase().substring(0, 4);
  const codePrefix = resolvedSourceId.replace("course-", "").replace("-101", "").replace("evt-", "").toUpperCase();
  const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
  const certId = `SLRJ-${prefix}-2026-${codePrefix.substring(0, 8)}-${randomHex}`;

  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const record: CertificateRecord = {
    id: certId,
    learnerName: params.learnerName || "Learner",
    learnerEmail: params.learnerEmail,
    title: params.title || "Certificate of Completion",
    category: params.category || "Course",
    sourceType: params.sourceType || "course",
    sourceId: resolvedSourceId,
    sourceTitle: resolvedSourceTitle,
    courseId: resolvedSourceId,
    courseTitle: resolvedSourceTitle,
    issueDate: dateFormatted,
    scorePercentage: params.scorePercentage ?? 100,
    status: "valid",
    issuer: params.issuer || "SLRJ Learn Academy • SLRJ Digital",
    skillsGained: params.skillsGained || ["Verified Practical Skills", "Technical Competence"],
    verifiedAt: now.toISOString(),
  };

  store[certId] = record;
  return record;
}

export function revokeCertificate(certId: string, reason: string): boolean {
  const store = getStore();
  if (store[certId]) {
    store[certId].status = "revoked";
    store[certId].revocationReason = reason;
    return true;
  }
  return false;
}

export function getAllCertificates(): CertificateRecord[] {
  const store = getStore();
  return Object.values(store);
}
