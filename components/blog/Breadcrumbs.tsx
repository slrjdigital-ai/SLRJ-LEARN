import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 py-3 overflow-x-auto whitespace-nowrap">
      <Link
        href="/"
        className="flex items-center gap-1.5 hover:text-white transition-colors"
      >
        <Home size={14} className="text-cyan-400" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight size={14} className="text-gray-600 flex-shrink-0" />
            {isLast || !item.href ? (
              <span className="text-emerald-400 font-medium truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-white transition-colors truncate max-w-[150px] sm:max-w-xs"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
