"use client";

import { motion } from "framer-motion";

export function CalmFooterMessage() {
  return (
    <section className="py-24 text-center space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <div className="text-4xl">🌱</div>
        <div className="space-y-3">
          <h2 className="font-display text-2xl font-bold text-slate-800">
            Learning grows slowly and positively over time.
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Supportive daily activities can help children build confidence step by step. 
            We are here to support this journey gently.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
