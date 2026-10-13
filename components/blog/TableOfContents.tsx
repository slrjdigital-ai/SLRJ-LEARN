"use client";

import { useEffect, useState } from "react";
import { AlignLeft, ChevronDown, ChevronUp } from "lucide-react";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // offset for sticky navigation header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setIsOpenMobile(false);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div>
      {/* Mobile Accordion */}
      <div className="lg:hidden mb-6 p-4 rounded-2xl bg-[#09071B] border border-white/10 shadow-lg">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full flex items-center justify-between text-sm font-semibold text-white focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <AlignLeft size={16} className="text-amber-400" />
            <span>Table of Contents ({items.length} sections)</span>
          </span>
          {isOpenMobile ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isOpenMobile && (
          <ul className="mt-3 pt-3 border-t border-white/10 space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToHeading(item.id)}
                  className={`text-left text-xs transition-colors block w-full py-1 ${
                    activeId === item.id
                      ? "text-amber-400 font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block sticky top-28 p-5 rounded-2xl bg-[#080618]/90 border border-white/10 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/10">
          <AlignLeft size={16} className="text-amber-400" />
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Table of Contents
          </h4>
        </div>

        <nav aria-label="Article Table of Contents">
          <ul className="space-y-1.5 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    className={`text-left text-xs py-1.5 px-2.5 rounded-lg transition-all w-full flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? "bg-amber-400/10 text-amber-300 font-medium border-l-2 border-amber-400 pl-2"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="truncate">{item.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
