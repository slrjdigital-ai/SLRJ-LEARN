import fs from "fs";
import path from "path";

export interface CertificateRecord {
  id: string;
  learnerName: string;
  learnerEmail?: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  scorePercentage: number;
  status: "valid" | "revoked";
  revocationReason?: string;
  issuer: string;
  verifiedAt?: string;
}

// In-memory seed database with verifiable certificates
const INITIAL_CERTIFICATES: Record<string, CertificateRecord> = {
  "SLRJ-CERT-2026-WD101": {
    id: "SLRJ-CERT-2026-WD101",
    learnerName: "Alex Morgan",
    learnerEmail: "alex.morgan@example.com",
    courseId: "course-web-dev-101",
    courseTitle: "Web Development Foundations: HTML5, CSS3 & JavaScript",
    issueDate: "October 15, 2026",
    scorePercentage: 100,
    status: "valid",
    issuer: "SLRJ Learn Academy • SLRJ Digital",
  },
  "SLRJ-CERT-2026-PY101": {
    id: "SLRJ-CERT-2026-PY101",
    learnerName: "Kouluri Shahid",
    learnerEmail: "shahid@slrjlearn.in",
    courseId: "course-python-101",
    courseTitle: "Python Programming: Zero to Production",
    issueDate: "October 14, 2026",
    scorePercentage: 100,
    status: "valid",
    issuer: "SLRJ Learn Academy • SLRJ Digital",
  },
  "demo": {
    id: "demo",
    learnerName: "Sample Learner",
    learnerEmail: "learner@slrjlearn.in",
    courseId: "course-web-dev-101",
    courseTitle: "Web Development Foundations: HTML5, CSS3 & JavaScript",
    issueDate: "October 15, 2026",
    scorePercentage: 92,
    status: "valid",
    issuer: "SLRJ Learn Academy • SLRJ Digital",
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
  courseId: string;
  courseTitle: string;
  scorePercentage: number;
}): CertificateRecord {
  const store = getStore();

  // Create unique, non-predictable certificate identifier
  const codePrefix = params.courseId.replace("course-", "").replace("-101", "").toUpperCase();
  const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
  const certId = `SLRJ-CERT-2026-${codePrefix}-${randomHex}`;

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
    courseId: params.courseId,
    courseTitle: params.courseTitle,
    issueDate: dateFormatted,
    scorePercentage: params.scorePercentage,
    status: "valid",
    issuer: "SLRJ Learn Academy • SLRJ Digital",
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
