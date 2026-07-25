"use client";

import { motion } from "framer-motion";

export function ChoiceAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(251,207,232,0.42),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(191,219,254,0.48),transparent_32%),radial-gradient(circle_at_52%_88%,rgba(254,215,170,0.34),transparent_34%),linear-gradient(135deg,#fff8fb_0%,#f4fbff_46%,#faf7ff_100%)]" />

      <motion.div
        className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, 18, 0], opacity: [0.38, 0.58, 0.38] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-4rem] top-28 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 24, 0], opacity: [0.35, 0.56, 0.35] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-100/50 blur-3xl"
        animate={{ scale: [1, 1.07, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg className="absolute inset-x-0 bottom-0 h-64 w-full opacity-50" viewBox="0 0 1440 260" fill="none" preserveAspectRatio="none">
        <path d="M0 176C166 116 334 116 508 168C672 216 832 220 1006 170C1178 122 1304 118 1440 158V260H0V176Z" fill="url(#choiceGround)" />
        <defs>
          <linearGradient id="choiceGround" x1="0" x2="1440" y1="122" y2="232" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FCE7F3" stopOpacity="0.42" />
            <stop offset="0.5" stopColor="#E0F2FE" stopOpacity="0.36" />
            <stop offset="1" stopColor="#FFEDD5" stopOpacity="0.42" />
          </linearGradient>
        </defs>
      </svg>

      {[
        { left: "12%", top: "34%", delay: 0, color: "bg-rose-200/35" },
        { left: "26%", top: "76%", delay: 1.4, color: "bg-amber-200/35" },
        { left: "74%", top: "32%", delay: 0.8, color: "bg-sky-200/40" },
        { left: "88%", top: "70%", delay: 2, color: "bg-violet-200/30" },
      ].map((item) => (
        <motion.span
          key={`${item.left}-${item.top}`}
          className={`absolute h-4 w-4 rounded-full ${item.color} shadow-[0_0_24px_rgba(244,114,182,0.25)]`}
          style={{ left: item.left, top: item.top }}
          animate={{ y: [0, -12, 0], opacity: [0.35, 0.76, 0.35] }}
          transition={{ duration: 9, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
