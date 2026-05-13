"use client";

import { motion } from "framer-motion";

type ResultReflectionProps = {
  session: any;
};

export function ResultReflection({ session }: ResultReflectionProps) {
  const accuracy = (session.correct_answers / session.attempts) * 100;
  
  let reflectionMessage = "Calm matching activities help build confidence 💛";
  if (accuracy >= 90) {
    reflectionMessage = "Wonderful matching today! You are becoming very confident 😊";
  } else if (accuracy >= 70) {
    reflectionMessage = "Nice work! You understood the feelings very well 🌈";
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="bg-white/40 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 text-left space-y-4"
    >
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        <h3 className="uppercase tracking-[0.2em] text-[10px] font-bold text-slate-400">
          Learning Reflection
        </h3>
      </div>
      <p className="text-slate-700 font-medium leading-relaxed">
        {reflectionMessage}
      </p>
      <p className="text-sm text-slate-500 leading-relaxed">
        Understanding feelings is a journey that grows step by step. Every time you practice, you are doing a great job.
      </p>
    </motion.section>
  );
}
