import { blogPosts } from "@/data/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// Generate static params for all the blog slugs
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 pb-16 min-h-screen">
      <div className={`${post.htmlContent ? "max-w-5xl" : "max-w-3xl"} mx-auto px-4 sm:px-6 lg:px-8`}>
        
        {/* Back button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-[#FFB800] transition-colors mb-12"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Notes
        </Link>
        
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#FFB800] text-sm font-bold uppercase tracking-wider bg-[#FFB800]/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm font-medium">
              {post.date}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-400">
            {post.description}
          </p>
        </header>

        {/* Content */}
        {post.htmlContent ? (
          <div 
            dangerouslySetInnerHTML={{ __html: post.htmlContent }} 
          />
        ) : (
          <div className="prose prose-invert prose-yellow max-w-none">
            {post.content?.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-3xl font-bold text-white mt-12 mb-6">{paragraph.replace('## ', '')}</h2>
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-2xl font-bold text-white mt-8 mb-4">{paragraph.replace('### ', '')}</h3>
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').map(item => item.replace('- ', ''));
                return (
                  <ul key={index} className="list-disc list-inside text-gray-300 space-y-2 mb-6 text-lg leading-relaxed marker:text-[#FFB800]">
                    {items.map((item, i) => {
                      const parts = item.split('**');
                      return (
                        <li key={i}>
                          {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part)}
                        </li>
                      );
                    })}
                  </ul>
                )
              }
              if (paragraph.match(/^\d+\./)) {
                 const items = paragraph.split('\n').map(item => item.replace(/^\d+\.\s/, ''));
                 return (
                   <ol key={index} className="list-decimal list-inside text-gray-300 space-y-2 mb-6 text-lg leading-relaxed marker:text-[#FFB800]">
                      {items.map((item, i) => {
                        const parts = item.split('**');
                        return (
                          <li key={i}>
                            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part)}
                          </li>
                        );
                      })}
                   </ol>
                 )
              }
              const codeParts = paragraph.split('`');
              return (
                <p key={index} className="text-gray-300 text-lg leading-relaxed mb-6">
                  {codeParts.map((part, i) => 
                    i % 2 === 1 
                      ? <code key={i} className="bg-white/10 text-[#FFB800] px-1.5 py-0.5 rounded font-mono text-base">{part}</code> 
                      : part
                  )}
                </p>
              );
            })}
          </div>
        )}
        
      </div>
    </article>
  );
}
