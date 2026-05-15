"use client";

import { motion } from "framer-motion";
import { ListOrdered, Play } from "lucide-react";

interface RoutineStartScreenProps {
  onStart: () => void;
  level: number;
}

export function RoutineStartScreen({ onStart, level }: RoutineStartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-12 py-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-28 h-28 rounded-[3rem] bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-600 shadow-xl shadow-amber-900/5 relative"
      >
        <ListOrdered size={54} strokeWidth={1.5} />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-[3rem] bg-amber-200/20 blur-xl -z-10"
        />
      </motion.div>

      <div className="space-y-4 max-w-2xl">
        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
          What Happens First? <br/><span className="text-amber-500">Let's build your routine.</span>
        </h2>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">
          Look at the mixed steps and tap them in the order they happen. You're doing great!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 border border-white/80 shadow-sm flex flex-col items-center gap-2">
          <span className="text-3xl">🌞</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Daily Life</span>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 border border-white/80 shadow-sm flex flex-col items-center gap-2">
          <span className="text-3xl">🔢</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group relative flex items-center gap-6 px-14 py-7 rounded-full bg-slate-900 text-white text-xl font-black shadow-2xl shadow-slate-300 hover:bg-amber-600 transition-all"
      >
        <Play size={24} fill="currentColor" />
        <span className="tracking-tight">Start Routine Order</span>
      </motion.button>
    </div>
  );
}
