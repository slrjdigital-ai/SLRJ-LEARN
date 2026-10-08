export default function Loading() {
  return (
    <div className="min-h-screen bg-[#020108] text-white flex items-center justify-center relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col items-center gap-6 relative z-10">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-pink-500 animate-spin [animation-duration:1.5s]" />
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-gray-400 tracking-[0.25em] uppercase">
            Loading Interface...
          </span>
        </div>
      </div>
    </div>
  );
}
