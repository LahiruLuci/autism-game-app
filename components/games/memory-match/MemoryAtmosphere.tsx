"use client";

import { motion } from "framer-motion";

export function MemoryAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(191,219,254,0.55),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(221,214,254,0.48),transparent_30%),linear-gradient(135deg,#f8fbff_0%,#eef8ff_42%,#f7f3ff_100%)]" />

      <motion.div
        className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl"
        animate={{ x: [0, 26, 0], y: [0, 18, 0], opacity: [0.45, 0.62, 0.45] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-8 top-24 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl"
        animate={{ x: [0, -22, 0], y: [0, 24, 0], opacity: [0.35, 0.54, 0.35] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-7rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-100/55 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg className="absolute inset-x-0 bottom-0 h-64 w-full opacity-55" viewBox="0 0 1440 260" fill="none" preserveAspectRatio="none">
        <path d="M0 168C170 98 318 110 480 164C646 220 816 226 980 178C1152 128 1286 114 1440 156V260H0V168Z" fill="url(#memoryHill)" />
        <defs>
          <linearGradient id="memoryHill" x1="0" x2="1440" y1="120" y2="220" gradientUnits="userSpaceOnUse">
            <stop stopColor="#DBEAFE" stopOpacity="0.55" />
            <stop offset="0.5" stopColor="#E0F2FE" stopOpacity="0.38" />
            <stop offset="1" stopColor="#EDE9FE" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      {[
        { left: "12%", top: "28%", delay: 0 },
        { left: "22%", top: "72%", delay: 1.5 },
        { left: "76%", top: "30%", delay: 0.8 },
        { left: "88%", top: "68%", delay: 2.1 },
      ].map((dot) => (
        <motion.span
          key={`${dot.left}-${dot.top}`}
          className="absolute h-3 w-3 rounded-full bg-white/80 shadow-[0_0_22px_rgba(96,165,250,0.45)]"
          style={{ left: dot.left, top: dot.top }}
          animate={{ y: [0, -12, 0], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 9, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
