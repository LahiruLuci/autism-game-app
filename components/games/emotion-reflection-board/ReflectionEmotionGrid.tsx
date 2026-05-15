"use client";

import { motion } from "framer-motion";
import { EMOTION_DATA } from "@/lib/games/emotion-reflection-board/helpers";

interface ReflectionEmotionGridProps {
  emotions: string[];
  onSelect: (emotion: string) => void;
  disabled: boolean;
}

export function ReflectionEmotionGrid({ emotions, onSelect, disabled }: ReflectionEmotionGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 w-full max-w-5xl mx-auto px-6">
      {emotions.map((id, index) => {
        const data = EMOTION_DATA[id];
        return (
          <motion.button
            key={id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={!disabled ? { y: -8, scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            disabled={disabled}
            onClick={() => onSelect(id)}
            className={`group relative aspect-square sm:aspect-auto sm:h-40 rounded-[2.5rem] bg-gradient-to-br ${data.gradient} border border-white shadow-sm flex flex-col items-center justify-center gap-3 p-4 transition-all hover:shadow-xl disabled:opacity-50`}
          >
            <span className="text-4xl group-hover:scale-110 transition-transform duration-500">
              {data.icon}
            </span>
            <span className={`text-xs font-black uppercase tracking-widest ${data.color}`}>
              {data.label}
            </span>
            
            <div className="absolute inset-0 rounded-[2.5rem] bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        );
      })}
    </div>
  );
}
