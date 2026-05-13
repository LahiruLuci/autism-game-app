"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type ResultActionsProps = {
  childId: string;
};

export function ResultActions({ childId }: ResultActionsProps) {
  const router = useRouter();

  return (
    <section className="space-y-4 pt-4">
      <motion.button 
        whileHover={{ scale: 1.02, translateY: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push(`/games/${childId}`)}
        className="w-full py-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-extrabold shadow-lg shadow-blue-200 transition-all"
      >
        Continue Learning Journey
      </motion.button>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => window.location.reload()}
        className="w-full py-5 rounded-full bg-white text-slate-600 text-sm font-bold border border-slate-100 hover:bg-slate-50 transition-all"
      >
        Try This Activity Again
      </motion.button>
    </section>
  );
}
