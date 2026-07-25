"use client";

import { motion } from "framer-motion";

export function PatternAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(191,219,254,0.5),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(196,181,253,0.38),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(186,230,253,0.5),transparent_34%),linear-gradient(135deg,#f8fbff_0%,#f1f8ff_46%,#faf7ff_100%)]" />

      <motion.div
        className="absolute left-[-4rem] top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, 18, 0], opacity: [0.4, 0.62, 0.4] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-3rem] top-32 h-80 w-80 rounded-full bg-indigo-200/25 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 22, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 27, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-100/55 blur-3xl"
        animate={{ scale: [1, 1.07, 1], opacity: [0.48, 0.68, 0.48] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {[
        { left: "12%", top: "34%", shape: "rounded-full", delay: 0, color: "bg-blue-300/22" },
        { left: "24%", top: "74%", shape: "rounded-[0.7rem]", delay: 1.2, color: "bg-amber-200/28" },
        { left: "70%", top: "33%", shape: "rounded-[0.7rem]", delay: 0.7, color: "bg-violet-300/22" },
        { left: "86%", top: "72%", shape: "rounded-full", delay: 1.8, color: "bg-sky-300/24" },
      ].map((item) => (
        <motion.span
          key={`${item.left}-${item.top}`}
          className={`absolute h-12 w-12 ${item.shape} ${item.color} shadow-[0_0_38px_rgba(96,165,250,0.18)]`}
          style={{ left: item.left, top: item.top }}
          animate={{ y: [0, -14, 0], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 10, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <svg className="absolute inset-x-0 bottom-0 h-64 w-full opacity-50" viewBox="0 0 1440 260" fill="none" preserveAspectRatio="none">
        <path d="M0 178C182 116 342 118 506 170C666 222 808 222 986 172C1164 122 1302 122 1440 158V260H0V178Z" fill="url(#patternGround)" />
        <defs>
          <linearGradient id="patternGround" x1="0" x2="1440" y1="125" y2="232" gradientUnits="userSpaceOnUse">
            <stop stopColor="#DBEAFE" stopOpacity="0.46" />
            <stop offset="0.5" stopColor="#E0F2FE" stopOpacity="0.36" />
            <stop offset="1" stopColor="#EDE9FE" stopOpacity="0.48" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
