import { Metadata } from "next";
import { blogPosts } from "@/data/blog";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

// Generate static params for all the blog slugs
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | SLRJ Digital",
    };
  }

  return {
    title: `${post.title} | SLRJ Digital Technical Insights`,
    description: post.description,
    alternates: {
      canonical: `https://slrjdigital.in/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | SLRJ Digital`,
      description: post.description,
      url: `https://slrjdigital.in/blog/${post.slug}`,
      siteName: "SLRJ Digital",
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-[#020108] text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className={`${post.htmlContent ? "max-w-5xl" : "max-w-3xl"} mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
        {/* Back button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-xs font-mono font-bold text-gray-400 hover:text-cyan-400 transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Technical Notes</span>
        </Link>
        
        {/* Header */}
        <header className="mb-12 border-b border-white/10 pb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-gray-400 text-xs font-mono">
              {post.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight font-brand">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            {post.description}
          </p>
        </header>

        {/* Content */}
        {post.htmlContent ? (
          <div 
            className="prose prose-invert max-w-none text-gray-200"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }} 
          />
        ) : (
          <div className="prose prose-invert max-w-none">
            {post.content?.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl sm:text-3xl font-black text-white mt-12 mb-6 font-brand border-b border-white/5 pb-2">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl sm:text-2xl font-bold text-cyan-300 mt-8 mb-4 font-brand">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').map(item => item.replace('- ', ''));
                return (
                  <ul key={index} className="list-disc list-inside text-gray-300 space-y-2 mb-6 text-base sm:text-lg leading-relaxed marker:text-cyan-400">
                    {items.map((item, i) => {
                      const parts = item.split('**');
                      return (
                        <li key={i}>
                          {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part)}
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              if (paragraph.match(/^\d+\./)) {
                 const items = paragraph.split('\n').map(item => item.replace(/^\d+\.\s/, ''));
                 return (
                   <ol key={index} className="list-decimal list-inside text-gray-300 space-y-2 mb-6 text-base sm:text-lg leading-relaxed marker:text-purple-400">
                      {items.map((item, i) => {
                        const parts = item.split('**');
                        return (
                          <li key={i}>
                            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part)}
                          </li>
                        );
                      })}
                   </ol>
                 );
              }
              const codeParts = paragraph.split('`');
              return (
                <p key={index} className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                  {codeParts.map((part, i) => 
                    i % 2 === 1 
                      ? <code key={i} className="bg-purple-950/60 text-cyan-300 px-2 py-0.5 rounded font-mono text-sm border border-purple-500/30">{part}</code> 
                      : part
                  )}
                </p>
              );
            })}
          </div>
        )}

        {/* Article Author & Conversion Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-black/80 border border-purple-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
              <Sparkles size={13} />
              SLRJ Engineering Team
            </span>
            <h4 className="text-xl font-bold text-white font-brand">
              Need modern high-performance architecture built for your business?
            </h4>
            <p className="text-sm text-gray-400 mt-1 max-w-xl">
              We engineer custom Next.js 16 platforms with 100/100 Core Web Vitals, enterprise security, and revenue-focused funnels.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all flex items-center gap-2 shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            <span>Request Consultation</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
