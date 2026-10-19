"use client";

import React, { useState, useMemo } from "react";
import { CertificateRecord } from "@/data/certificatesStore";
import { useCertificatesManager } from "@/lib/certificateStorage";
import CertificatesHeader from "./CertificatesHeader";
import CertificateCategoryTabs from "./CertificateCategoryTabs";
import CertificateSearchAndFilters, { CertificateFilterState } from "./CertificateSearchAndFilters";
import CertificateGrid from "./CertificateGrid";
import CertificateModal from "./CertificateModal";

export default function MyCertificatesMainView() {
  const { certificates, stats, isLoaded } = useCertificatesManager();

  // Active Category Tab
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filters State
  const [filters, setFilters] = useState<CertificateFilterState>({
    searchQuery: "",
    status: "all",
    sortBy: "newest",
  });

  // Dedicated Certificate Modal State
  const [activeModalCert, setActiveModalCert] = useState<CertificateRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCertificate = (cert: CertificateRecord) => {
    setActiveModalCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseCertificate = () => {
    setIsModalOpen(false);
    setActiveModalCert(null);
  };

  // Change individual filter key
  const handleChangeFilter = <K extends keyof CertificateFilterState>(
    key: K,
    value: CertificateFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Reset all filters and category
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setFilters({
      searchQuery: "",
      status: "all",
      sortBy: "newest",
    });
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    filters.searchQuery.trim() !== "" ||
    filters.status !== "all" ||
    filters.sortBy !== "newest";

  // Category counts based on total earned certificates
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: certificates.length,
      Course: 0,
      Roadmap: 0,
      Project: 0,
      Event: 0,
    };

    certificates.forEach((c) => {
      if (counts[c.category] !== undefined) {
        counts[c.category] += 1;
      }
    });

    return counts;
  }, [certificates]);

  // Filtered and Sorted Certificates
  const displayedCertificates = useMemo(() => {
    let result = [...certificates];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((c) => c.category === selectedCategory);
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter((c) => c.status === filters.status);
    }

    // Search query
    const query = filters.searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((c) => {
        const titleMatch = c.title.toLowerCase().includes(query);
        const idMatch = c.id.toLowerCase().includes(query);
        const sourceMatch = c.sourceTitle.toLowerCase().includes(query);
        const issuerMatch = c.issuer.toLowerCase().includes(query);
        const learnerMatch = c.learnerName.toLowerCase().includes(query);
        const skillsMatch = c.skillsGained?.some((s) => s.toLowerCase().includes(query));
        return (
          titleMatch ||
          idMatch ||
          sourceMatch ||
          issuerMatch ||
          learnerMatch ||
          Boolean(skillsMatch)
        );
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (filters.sortBy === "newest") {
        return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime() || b.id.localeCompare(a.id);
      }
      if (filters.sortBy === "oldest") {
        return new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime() || a.id.localeCompare(b.id);
      }
      if (filters.sortBy === "alphabetical") {
        return a.title.localeCompare(b.title) || a.sourceTitle.localeCompare(b.sourceTitle);
      }
      return 0;
    });

    return result;
  }, [certificates, selectedCategory, filters]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ── Top Header with Real Statistics & Instant Lookup ── */}
      <CertificatesHeader
        totalCertificates={stats.total}
        verifiedCount={stats.verified}
        coursesCompletedCount={stats.coursesCompleted}
        recentAchievementsCount={stats.recentCount}
      />

      {/* ── Category Navigation Tabs ── */}
      <div className="pt-2">
        <CertificateCategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />
      </div>

      {/* ── Search & Filter Controls ── */}
      <CertificateSearchAndFilters
        filters={filters}
        onChangeFilter={handleChangeFilter}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* ── Responsive Certificate Grid / Zero State ── */}
      {!isLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-64 rounded-2xl bg-slate-100 border border-slate-200/80"
            />
          ))}
        </div>
      ) : (
        <CertificateGrid
          certificates={displayedCertificates}
          totalLearnerCertificates={certificates.length}
          onViewCertificate={handleOpenCertificate}
          onResetFilters={handleResetFilters}
        />
      )}

      {/* ── Interactive Print-Ready Certificate Details Modal ── */}
      <CertificateModal
        certificate={activeModalCert}
        isOpen={isModalOpen}
        onClose={handleCloseCertificate}
      />
    </div>
  );
}
