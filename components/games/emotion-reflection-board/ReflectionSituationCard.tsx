"use client";

import { motion } from "framer-motion";

interface ReflectionSituationCardProps {
  emoji: string;
  situation: string;
}

export function ReflectionSituationCard({ emoji, situation }: ReflectionSituationCardProps) {
  return (
    <motion.div
      key={situation}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/80 p-10 sm:p-14 shadow-premium text-center space-y-8">
        <div className="w-28 h-28 rounded-[2.5rem] bg-white border border-slate-100 flex items-center justify-center text-6xl mx-auto shadow-sm">
          {emoji}
        </div>
        
        <div className="space-y-4">
          <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight px-4">
            {situation}
          </p>
          <div className="h-1 w-20 bg-slate-200 rounded-full mx-auto" />
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">
            How would you feel?
          </p>
        </div>
      </div>
    </motion.div>
  );
}
