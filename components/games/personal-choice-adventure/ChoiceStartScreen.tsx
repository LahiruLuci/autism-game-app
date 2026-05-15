"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface ChoiceStartScreenProps {
  onStart: () => void;
  level: number;
}

export function ChoiceStartScreen({ onStart, level }: ChoiceStartScreenProps) {
  const getLevelDescription = () => {
    switch (level) {
      case 1: return "Focus on basic needs and simple self-care.";
      case 2: return "Practice routine choices and behavior at home or school.";
      case 3: return "Learn calm problem-solving and safe social choices.";
      default: return "Practice making helpful decisions.";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full mx-auto bg-white/60 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 border border-white/80 text-center"
    >
      <div className="w-20 h-20 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">
        🌟
      </div>
      
      <div className="space-y-3 mb-8">
        <span className="px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-100">
          Level {level}
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900 leading-tight">Personal Choice Adventure</h1>
        <p className="text-slate-500 font-medium leading-relaxed">
          {getLevelDescription()}
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full inline-flex items-center justify-center gap-3 py-5 rounded-full bg-slate-900 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 hover:scale-[1.02] transition-all"
      >
        <Play size={18} />
        Start Activity
      </button>
    </motion.div>
  );
}
