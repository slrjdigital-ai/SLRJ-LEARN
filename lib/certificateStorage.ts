// ============================================================================
// SLRJ Learn — Certificates Client Persistence & React Hook
// Manages the learner's earned credentials, cross-module auto-issuance eligibility,
// and synchronized storage with hydration safety.
// ============================================================================

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  CertificateRecord,
  getAllCertificates,
  getCertificateById,
  issueCertificate,
  revokeCertificate as revokeAuthoritativeCertificate,
} from "@/data/certificatesStore";

const CERTIFICATES_STORAGE_KEY = "slrj_learner_certificates_v2";
const CERTIFICATES_EVENT = "slrj-certificates-updated";

// Default initial certificates seeded for the learner (empty for clean slate)
const DEFAULT_CERT_IDS: string[] = [];

export function getStoredCertificateIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CERTIFICATES_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw) as string[];
  } catch (err) {
    console.error("Failed to parse stored certificate IDs:", err);
    return [];
  }
}

export function saveStoredCertificateIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(CERTIFICATES_EVENT));
  } catch (err) {
    console.error("Failed to save certificate IDs:", err);
  }
}

export function useCertificatesManager() {
  const [certIds, setCertIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync state on mount to ensure deterministic initial client hydration
  useEffect(() => {
    setCertIds(getStoredCertificateIds());
    setIsLoaded(true);

    const handleSync = () => {
      setCertIds(getStoredCertificateIds());
    };

    window.addEventListener(CERTIFICATES_EVENT, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(CERTIFICATES_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  // Fetch full records for active certificate IDs
  const certificates = useMemo(() => {
    const records: CertificateRecord[] = [];
    const allKnown = getAllCertificates();

    certIds.forEach((id) => {
      const found = allKnown.find((c) => c.id.toLowerCase() === id.toLowerCase()) || getCertificateById(id);
      if (found) records.push(found);
    });

    return records;
  }, [certIds]);

  const getCertificate = useCallback((id: string): CertificateRecord | null => {
    return getCertificateById(id);
  }, []);

  // Idempotent issuance of a certificate
  const claimCertificate = useCallback(
    (params: {
      learnerName: string;
      learnerEmail?: string;
      title?: string;
      category?: CertificateRecord["category"];
      sourceType?: CertificateRecord["sourceType"];
      sourceId: string;
      sourceTitle: string;
      scorePercentage?: number;
      skillsGained?: string[];
      issuer?: string;
    }) => {
      const allKnown = getAllCertificates();
      // Check if already claimed for this specific sourceId
      const existing = allKnown.find(
        (c) => c.sourceId.toLowerCase() === params.sourceId.toLowerCase()
      );

      if (existing) {
        const currentIds = getStoredCertificateIds();
        if (!currentIds.includes(existing.id)) {
          const updated = [...currentIds, existing.id];
          saveStoredCertificateIds(updated);
          setCertIds(updated);
        }
        return existing;
      }

      const issued = issueCertificate(params);
      const currentIds = getStoredCertificateIds();
      const updated = [...currentIds, issued.id];
      saveStoredCertificateIds(updated);
      setCertIds(updated);
      return issued;
    },
    []
  );

  const revokeUserCertificate = useCallback((certId: string, reason: string) => {
    revokeAuthoritativeCertificate(certId, reason);
    window.dispatchEvent(new CustomEvent(CERTIFICATES_EVENT));
  }, []);

  // Computed summary statistics
  const stats = useMemo(() => {
    const verified = certificates.filter((c) => c.status === "valid").length;
    const coursesCompleted = certificates.filter((c) => c.sourceType === "course").length;
    const recentCount = certificates.length;

    return {
      total: certificates.length,
      verified,
      coursesCompleted,
      recentCount,
    };
  }, [certificates]);

  return {
    isLoaded,
    certificates,
    certIds,
    stats,
    getCertificate,
    claimCertificate,
    revokeCertificate: revokeUserCertificate,
  };
}
