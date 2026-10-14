import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNotes, getNoteBySlug } from "@/data/notes";
import { getPdfBySlug } from "@/data/pdfs";
import NoteDetailClient from "@/components/blog/NoteDetailClient";
import EmbeddedPdfViewer from "@/components/blog/EmbeddedPdfViewer";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import TableOfContents from "@/components/blog/TableOfContents";
import CodeBlock from "@/components/blog/CodeBlock";
import InteractiveQuiz from "@/components/blog/InteractiveQuiz";
import {
  Clock,
  Calendar,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Layers,
  FileText,
  Eye,
  Download,
} from "lucide-react";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    return {
      title: "Note Not Found | SLRJ Learn",
    };
  }

  const url = `https://slrjlearn.in/notes/${slug}`;

  return {
    title: `${note.title} | SLRJ Learn Notes`,
    description: note.shortDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${note.title} | SLRJ Learn`,
      description: note.shortDescription,
      url,
      type: "article",
      siteName: "SLRJ Learn",
      authors: ["Kouluri Shahid", "SLRJ Learn Engineering"],
      tags: note.tags,
      images: [
        {
          url: "https://slrjlearn.in/og-image.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.title} | SLRJ Learn`,
      description: note.shortDescription,
    },
  };
}

export default async function NoteDetailPage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const allNotes = getAllNotes();
  const currentIndex = allNotes.findIndex((n) => n.slug === note.slug);
  const prevNote = currentIndex > 0 ? allNotes[currentIndex - 1] : null;
  const nextNote = currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null;

  // Find related notes
  const relatedNotes = allNotes
    .filter((n) => note.relatedNoteSlugs.includes(n.slug) && n.slug !== note.slug)
    .slice(0, 3);

  // PDF Resource Resolution
  const pdfResource = note.pdf?.hasPdf
    ? getPdfBySlug(note.pdf.filename.replace(".pdf", "")) || {
        id: note.id,
        slug: note.slug,
        title: `${note.title} Handbook`,
        description: note.shortDescription,
        category: note.category,
        fileUrl: note.pdf.fileUrl,
        filename: note.pdf.filename,
        fileSize: note.pdf.fileSize,
        format: "PDF Document",
        language: note.pdf.language,
        pageCount: note.pdf.pageCount,
        publishedDate: note.lastUpdated,
        status: "published" as const,
        topicsCovered: note.tags || [],
        recommendedFor: "Developers & Students",
      }
    : undefined;

  // Article JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: note.title,
    description: note.shortDescription,
    author: {
      "@type": "Organization",
      name: "SLRJ Learn",
      url: "https://slrjlearn.in",
    },
    publisher: {
      "@type": "Organization",
      name: "SLRJ Learn",
      logo: {
        "@type": "ImageObject",
        url: "https://slrjlearn.in/logo.png",
      },
    },
    dateModified: "2026-10-10",
    inLanguage: "en-US",
    proficiencyLevel: note.difficulty,
  };

  return (
    <div className="min-h-screen bg-[#080C16] text-white pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Notes", href: "/notes" },
            { label: note.category, href: `/notes?category=${encodeURIComponent(note.category)}` },
            { label: note.title },
          ]}
        />

        {/* ── Article Header Banner ──────────────────────────── */}
        <header className="py-8 pb-10 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
              {note.category}
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300">
              {note.difficulty}
            </span>
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5 ml-2">
              <Clock size={13} className="text-gray-400" />
              <span>{note.readingTime}</span>
            </span>
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5 ml-2">
              <Calendar size={13} className="text-gray-400" />
              <span>Updated {note.lastUpdated}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-brand tracking-tight mb-6 leading-tight max-w-4xl">
            {note.title}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed mb-6 font-normal">
            {note.shortDescription}
          </p>

          <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck size={14} />
              <span>SLRJ Learn Engineering Verified</span>
            </span>
            <span>•</span>
            <span>Topic: {note.topic}</span>
          </div>
        </header>

        {/* Downloadable / Verified PDF Study Guide Banner */}
        {note.pdf?.hasPdf && pdfResource && (
          <NoteDetailClient note={note} pdfResource={pdfResource} />
        )}

        {/* ── Interactive Live Embedded PDF Document with 4 Level Tabs ─────────── */}
        {note.pdf?.hasPdf && note.pdf.fileUrl && (
          <EmbeddedPdfViewer note={note} />
        )}

        {/* ── Main Two-Column Reading Layout ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10">
          {/* Main Article Content (8 cols) */}
          <main className="lg:col-span-8 min-w-0">
            {/* Introduction Lead */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 mb-10 leading-relaxed text-gray-200 text-sm sm:text-base border-l-4 border-l-amber-400">
              <strong className="block text-white font-brand text-base mb-2">
                Executive Overview
              </strong>
              <p>{note.introduction}</p>
            </div>

            {/* Sections Loop */}
            <div className="space-y-12">
              {note.sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 pb-8 border-b border-white/5 last:border-b-0"
                >
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-brand tracking-tight mb-4 flex items-center gap-3">
                    <span className="w-2 h-6 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 inline-block" />
                    <span>{section.title}</span>
                  </h2>

                  <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4 mb-6">
                    {section.content.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {/* Optional Visual Diagram */}
                  {section.diagram && (
                    <div className="my-8 p-6 sm:p-7 rounded-2xl bg-[#0D1527] border border-slate-800 shadow-xl">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles size={16} className="text-cyan-400" />
                        <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                          {section.diagram.title}
                        </h4>
                      </div>

                      <div className="space-y-3">
                        {section.diagram.items.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                                {dIdx + 1}
                              </span>
                              <div>
                                <strong className="text-sm text-white font-semibold block">
                                  {item.title}
                                </strong>
                                <span className="text-xs text-gray-400 block">
                                  {item.desc}
                                </span>
                              </div>
                            </div>
                            {item.badge && (
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10 self-start sm:self-center">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Optional Reference Table */}
                  {section.table && (
                    <div className="my-8 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                      <div className="px-5 py-3 bg-[#0D1527] border-b border-slate-800">
                        <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                          {section.table.title}
                        </h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-white/[0.02] border-b border-white/10 text-gray-400 font-mono text-xs uppercase">
                            <tr>
                              {section.table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="px-5 py-3 font-semibold">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {section.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`px-5 py-3.5 ${
                                      cIdx === 0
                                        ? "font-mono font-semibold text-amber-300 text-xs sm:text-sm"
                                        : "text-gray-300"
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Code Snippet */}
                  {section.codeSnippet && (
                    <CodeBlock
                      code={section.codeSnippet.code}
                      language={section.codeSnippet.language}
                      title={section.codeSnippet.title}
                      explanation={section.codeSnippet.explanation}
                    />
                  )}

                  {/* Subsections if present */}
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="mt-8 space-y-6 pl-2 sm:pl-4 border-l-2 border-white/10">
                      {section.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-3">
                          <h3 className="text-lg sm:text-xl font-bold text-white font-brand">
                            {sub.title}
                          </h3>
                          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                            {sub.content}
                          </p>
                          {sub.codeSnippet && (
                            <CodeBlock
                              code={sub.codeSnippet.code}
                              language={sub.codeSnippet.language}
                              title={sub.codeSnippet.title}
                              explanation={sub.codeSnippet.explanation}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Common Mistakes & Warnings */}
                  {section.commonMistakes && section.commonMistakes.length > 0 && (
                    <div className="my-8 p-6 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20">
                      <div className="flex items-center gap-2 mb-4 text-rose-400">
                        <AlertTriangle size={18} />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                          Common Mistakes & Anti-Patterns
                        </h4>
                      </div>

                      <div className="space-y-4">
                        {section.commonMistakes.map((mistake, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs sm:text-sm"
                          >
                            <div className="flex items-start gap-2 text-rose-300">
                              <span className="font-mono font-bold text-rose-400">❌ Mistake:</span>
                              <span>{mistake.wrong}</span>
                            </div>
                            <div className="flex items-start gap-2 text-emerald-300">
                              <span className="font-mono font-bold text-emerald-400">✅ Correct:</span>
                              <span>{mistake.correct}</span>
                            </div>
                            <p className="text-gray-400 text-xs pl-5 pt-1">
                              <strong>Why:</strong> {mistake.why}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Best Practices */}
                  {section.bestPractices && section.bestPractices.length > 0 && (
                    <div className="my-8 p-6 rounded-2xl bg-amber-500/[0.05] border border-amber-500/25">
                      <div className="flex items-center gap-2 mb-3 text-amber-400">
                        <Lightbulb size={18} />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                          Production Best Practices
                        </h4>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                        {section.bestPractices.map((tip, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2.5">
                            <span className="text-amber-400 font-bold mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* ── Frequently Asked Questions ─────────────────────── */}
            {note.faqs && note.faqs.length > 0 && (
              <section id="faq" className="my-14 scroll-mt-28">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-800">
                  <HelpCircle size={20} className="text-cyan-400" />
                  <h3 className="text-2xl font-black text-white font-brand">
                    Frequently Asked Questions
                  </h3>
                </div>

                <div className="space-y-4">
                  {note.faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-5 rounded-2xl bg-[#0D1527] border border-slate-800"
                    >
                      <h4 className="text-base font-bold text-white mb-2 flex items-start gap-2">
                        <span className="text-cyan-400 font-mono font-bold">Q:</span>
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Interactive Practice Questions & Assignments ───── */}
            {note.practiceQuestions && note.practiceQuestions.length > 0 && (
              <InteractiveQuiz questions={note.practiceQuestions} />
            )}

            {/* ── Next / Previous Navigation ─────────────────────── */}
            <div className="my-12 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevNote ? (
                <Link
                  href={`/notes/${prevNote.slug}`}
                  className="p-5 rounded-2xl bg-[#0D1527] border border-slate-800 hover:border-cyan-500/40 transition-all text-left group"
                >
                  <span className="text-xs font-mono text-gray-500 flex items-center gap-1 mb-1">
                    <ArrowLeft size={12} />
                    <span>Previous Topic</span>
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {prevNote.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextNote ? (
                <Link
                  href={`/notes/${nextNote.slug}`}
                  className="p-5 rounded-2xl bg-[#0D1527] border border-slate-800 hover:border-cyan-500/40 transition-all text-right group"
                >
                  <span className="text-xs font-mono text-gray-500 flex items-center justify-end gap-1 mb-1">
                    <span>Next Topic</span>
                    <ArrowRight size={12} />
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {nextNote.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* ── Related Notes ──────────────────────────────────── */}
            {relatedNotes.length > 0 && (
              <div className="my-14">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b border-white/10">
                  <Layers size={18} className="text-cyan-400" />
                  <h3 className="text-xl font-bold text-white font-brand">
                    Related Web Development Notes
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {relatedNotes.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/notes/${rel.slug}`}
                      className="p-5 rounded-2xl bg-[#08051C] border border-white/10 hover:border-amber-400/40 transition-all group"
                    >
                      <span className="text-[10px] font-mono text-cyan-300 uppercase block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-2 font-brand">
                        {rel.title}
                      </h4>
                      <p className="text-gray-400 text-xs line-clamp-2">
                        {rel.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Desktop Sticky Table of Contents Sidebar (4 cols) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <TableOfContents items={note.tableOfContents} />

              {/* Roadmap Quick Link */}
              <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
                <span className="text-xs font-mono text-cyan-400 block mb-1">
                  Structured Learning
                </span>
                <p className="text-xs text-gray-300 mb-3">
                  See where this topic fits into our 12-step web development path.
                </p>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <span>Open Full Roadmap</span>
                  <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
