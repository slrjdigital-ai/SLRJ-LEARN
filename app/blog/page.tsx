import { blogPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";

export const metadata = {
  title: "Web Development Notes | SLRJ Digital",
  description: "Educational web development content, guides, and tutorials."
};

export default function BlogPage() {
  const categories = ["All", "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Tailwind", "APIs", "Database", "Git & GitHub", "Deployment"];

  return (
    <>
      <section className="pt-32 pb-16 bg-transparent grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6">
            <BookOpen size={16} className="text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Educational Content</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Web Development <span className="gold-gradient-text">Notes.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Learn, build, and grow with our educational resources on modern web development.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === "All" 
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white cursor-not-allowed" // Frontend only for now
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-transparent min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="glass-card group overflow-hidden flex flex-col h-full">
                <div className="aspect-video bg-[#0A0D14] relative overflow-hidden flex items-center justify-center border-b border-white/5">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/40 to-transparent" />
                  
                  {/* Topic name graphic overlay */}
                  <div className="relative z-10 text-center px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-purple-500/30 shadow-lg group-hover:border-purple-500/70 group-hover:scale-105 transition-all duration-300">
                    <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-purple-500 uppercase tracking-wider drop-shadow-md">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-purple-400 text-xs font-bold uppercase tracking-wider bg-purple-500/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs font-medium">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{post.title}</h3>
                  <p className="text-gray-400 text-base mb-8 flex-1 leading-relaxed">{post.description}</p>
                  <div className="inline-flex items-center text-sm font-bold text-white group-hover:text-purple-400 transition-colors mt-auto">
                    Read Notes <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <ContactCTA />
    </>
  );
}



