"use client";

import { motion } from "framer-motion";
import { Brain, Play } from "lucide-react";

interface MemoryStartScreenProps {
  onStart: () => void;
  level: number;
}

export function MemoryStartScreen({ onStart, level }: MemoryStartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-10 py-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 rounded-[2.5rem] bg-blue-100 flex items-center justify-center text-blue-600 shadow-xl shadow-blue-900/5"
      >
        <Brain size={48} strokeWidth={1.5} />
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ready to Match? 🧠</h2>
        <p className="text-xl text-slate-500 font-medium max-w-md mx-auto">
          Find the matching cards to practice your memory and focus. Let's explore together!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/80 shadow-sm">
          <span className="text-2xl mb-2 block">🌟</span>
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Focus</span>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/80 shadow-sm">
          <span className="text-2xl mb-2 block">🧠</span>
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Memory</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group relative flex items-center gap-4 px-12 py-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl font-black shadow-2xl shadow-blue-200 hover:shadow-blue-300 transition-all"
      >
        <Play size={24} fill="currentColor" />
        <span>Start Calm Activity</span>
      </motion.button>
    </div>
  );
}
