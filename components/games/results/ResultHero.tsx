"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CELEBRATIONS = [
  "Wonderful Practice 🌈",
  "You Did Great 🌟",
  "Nice Learning Today 💛",
  "Calm and Careful Work 🌼",
  "Beautiful Effort ✨",
];

const ENCOURAGEMENTS = [
  "You practiced understanding feelings today 🌈",
  "Every small activity helps learning grow gently 💛",
  "You are learning emotions step by step ✨",
];

export function ResultHero() {
  const [celebration, setCelebration] = useState("");
  const [encouragement, setEncouragement] = useState("");

  useEffect(() => {
    setCelebration(CELEBRATIONS[Math.floor(Math.random() * CELEBRATIONS.length)]);
    setEncouragement(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
  }, []);

  return (
    <section className="text-center space-y-8">
      {/* Soft Floating Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-48 h-48 mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-violet-100/40 to-orange-100/40 blur-3xl rounded-full" />
        <div className="relative w-full h-full rounded-[3rem] bg-white shadow-xl shadow-blue-900/5 flex items-center justify-center text-7xl border border-white/80">
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🎨
          </motion.span>
        </div>
      </motion.div>

      <div className="space-y-3">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900"
        >
          {celebration}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 font-medium"
        >
          {encouragement}
        </motion.p>
      </div>
    </section>
  );
}
