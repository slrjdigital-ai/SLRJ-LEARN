"use client";

import * as motion from "framer-motion/client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#060713] overflow-hidden pointer-events-none">
      {/* Base Mesh with subtle breathing */}
      <motion.div 
        animate={{ opacity: [0.4, 0.65, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 15% 15%, rgba(99, 102, 241, 0.16) 0%, transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.14) 0%, transparent 50%),
            radial-gradient(circle at 50% 85%, rgba(56, 189, 248, 0.12) 0%, transparent 55%)
          `
        }}
      />
      
      {/* Animated Floating Orbs (Royal Indigo, Neon Violet, Electric Cyan theme) */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[45vw] h-[45vw] rounded-full opacity-25 mix-blend-screen animate-float-slow will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-[25%] -right-[10%] w-[40vw] h-[40vw] rounded-full opacity-22 mix-blend-screen animate-float-medium will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)', animationDelay: '-5s' }}
      />
      <div 
        className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] rounded-full opacity-20 mix-blend-screen animate-float-fast will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(56, 189, 248, 0.20) 0%, transparent 70%)', animationDelay: '-10s' }}
      />

      {/* Subtle Glowing Tech Dust */}
      <motion.div 
        animate={{ y: [0, -30, 0], opacity: [0, 0.7, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[30%] left-[30%] w-2 h-2 bg-indigo-400 rounded-full blur-[2px]"
      />
      <motion.div 
        animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[40%] right-[25%] w-2.5 h-2.5 bg-purple-400 rounded-full blur-[2px]"
      />
      <motion.div 
        animate={{ y: [0, -50, 0], opacity: [0, 0.6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[20%] right-[40%] w-1.5 h-1.5 bg-cyan-300 rounded-full blur-[1px]"
      />
      
      {/* Drifting Star Pattern Layer */}
      <div className="absolute inset-[-50%] z-0">
        <div 
          className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMjAiIHI9IjAuNSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC44Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxODAiIHI9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjE5MCIgY3k9IjIwIiByPSIwLjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNiIvPjwvc3ZnPg==')] bg-repeat animate-star-drift-slow"
          style={{ backgroundSize: '150px 150px' }}
        />
      </div>
    </div>
  );
}
