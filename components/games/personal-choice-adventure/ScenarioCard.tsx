"use client";

import { motion } from "framer-motion";

interface ScenarioCardProps {
  emoji: string;
  situation: string;
  question: string;
}

export function ScenarioCard({ emoji, situation, question }: ScenarioCardProps) {
  return (
    <motion.div
      key={situation}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/80 p-10 sm:p-14 shadow-premium text-center space-y-6">
        <div className="w-24 h-24 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-center text-5xl mx-auto shadow-sm">
          {emoji}
        </div>
        
        <div className="space-y-2">
          <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {situation}
          </p>
          <p className="text-blue-600 font-bold tracking-tight text-lg italic">
            {question}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
