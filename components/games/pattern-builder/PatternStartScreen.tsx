"use client";

import { motion } from "framer-motion";
import { Sparkles, Play } from "lucide-react";

interface PatternStartScreenProps {
  onStart: () => void;
  level: number;
}

export function PatternStartScreen({ onStart, level }: PatternStartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-12 py-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-28 h-28 rounded-[3rem] bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 shadow-xl shadow-blue-900/5 relative"
      >
        <Sparkles size={54} strokeWidth={1.5} />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-blue-200/50 scale-125"
        />
      </motion.div>

      <div className="space-y-4 max-w-2xl">
        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Ready to Build Patterns? <br/><span className="text-blue-500">Let's solve them gently.</span>
        </h2>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">
          Look at the sequence and find the missing piece. It's like solving a beautiful puzzle together!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 border border-white/80 shadow-sm flex flex-col items-center gap-2">
          <span className="text-3xl">🧩</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Logic</span>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 border border-white/80 shadow-sm flex flex-col items-center gap-2">
          <span className="text-3xl">🎨</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visual</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group relative flex items-center gap-6 px-14 py-7 rounded-full bg-slate-900 text-white text-xl font-black shadow-2xl shadow-slate-300 hover:bg-blue-600 transition-all"
      >
        <Play size={24} fill="currentColor" />
        <span className="tracking-tight">Start Pattern Activity</span>
      </motion.button>
    </div>
  );
}
