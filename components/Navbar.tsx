"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false);
    } else {
      setHidden(false);
    }
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed w-full z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1], filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Link href="/" className="text-2xl sm:text-3xl font-black tracking-tight font-brand flex items-center gap-2 sm:gap-2.5">
                <Image
                  src="/logo.png?v=5"
                  alt="SLRJ Digital Logo"
                  width={48}
                  height={48}
                  unoptimized
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain bg-transparent filter drop-shadow-[0_0_15px_rgba(168,85,247,0.7)] drop-shadow-[0_0_4px_rgba(56,189,248,0.6)]"
                />
                <span className="flex">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-purple-400 to-purple-700">SL</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-pink-300 via-pink-500 to-fuchsia-700 ml-[-0.05em]">RJ</span>
                </span>
                <motion.span 
                  animate={{ opacity: [0.7, 1, 0.7] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
                  className="text-white text-xs md:text-sm font-bold tracking-[0.35em] font-brand mt-1 hidden sm:inline"
                >
                  DIGITAL
                </motion.span>
              </Link>
            </motion.div>
          </div>
          
          {/* Desktop Menu (Lg and above) */}
          <div className="hidden lg:block">
            <div className="ml-8 flex items-center space-x-6 xl:space-x-8">
              <Link href="/" className="hover:text-purple-400 transition-colors px-3 py-2 text-sm font-medium">Home</Link>
              <Link href="/services" className="hover:text-purple-400 transition-colors px-3 py-2 text-sm font-medium">Services</Link>
              <Link href="/projects" className="hover:text-purple-400 transition-colors px-3 py-2 text-sm font-medium">Projects</Link>
              <Link href="/about" className="hover:text-purple-400 transition-colors px-3 py-2 text-sm font-medium">About</Link>
              <Link href="/blog" className="hover:text-purple-400 transition-colors px-3 py-2 text-sm font-medium">Blog</Link>
              <Link href="/#feedback" className="hover:text-purple-400 transition-colors px-3 py-2 text-sm font-medium">Feedback</Link>
              <Link 
                href="/contact" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Mobile & Tablet menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              suppressHydrationWarning
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-b border-white/10 bg-[#04020F]/95 backdrop-blur-2xl max-h-[calc(100vh-5rem)] overflow-y-auto shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5 sm:px-6">
              <Link href="/" className="block px-4 py-3 rounded-xl text-base font-medium hover:text-purple-400 hover:bg-white/5 transition-colors" onClick={toggleMenu}>Home</Link>
              <Link href="/services" className="block px-4 py-3 rounded-xl text-base font-medium hover:text-purple-400 hover:bg-white/5 transition-colors" onClick={toggleMenu}>Services</Link>
              <Link href="/projects" className="block px-4 py-3 rounded-xl text-base font-medium hover:text-purple-400 hover:bg-white/5 transition-colors" onClick={toggleMenu}>Projects</Link>
              <Link href="/about" className="block px-4 py-3 rounded-xl text-base font-medium hover:text-purple-400 hover:bg-white/5 transition-colors" onClick={toggleMenu}>About</Link>
              <Link href="/blog" className="block px-4 py-3 rounded-xl text-base font-medium hover:text-purple-400 hover:bg-white/5 transition-colors" onClick={toggleMenu}>Blog</Link>
              <Link href="/#feedback" className="block px-4 py-3 rounded-xl text-base font-medium hover:text-purple-400 hover:bg-white/5 transition-colors" onClick={toggleMenu}>Feedback & Ratings</Link>
              <div className="pt-2">
                <Link href="/contact" className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-3.5 rounded-full text-base font-semibold shadow-lg shadow-purple-600/30 active:scale-98 transition-all" onClick={toggleMenu}>
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}



