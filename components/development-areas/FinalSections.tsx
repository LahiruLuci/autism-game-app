"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
    {
        question: "At what age should my child start?",
        answer: "BrightPath is designed for children at various developmental stages. We focus on skill levels rather than strict age brackets to ensure every child gets the support they need at their own pace."
    },
    {
        question: "How often are skills assessed?",
        answer: "Assessment is an ongoing process. While we recommend a formal parent survey review every few months, the platform continuously tracks activity performance to refine recommendations."
    },
    {
        question: "Can I focus on just one area?",
        answer: "Yes, you can prioritize specific learning tracks in the parent dashboard, although we recommend a balanced approach across all core development pillars for holistic growth."
    },
    {
        question: "Are these skills recognized by specialists?",
        answer: "The developmental areas we support—emotion recognition, cognitive patterns, self-awareness, and basic mathematics—are foundational skills widely recognized in childhood development and neurodiversity support."
    }
];

export function DevelopmentFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight text-center mb-16">
                    Common Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl md:rounded-3xl border transition-all duration-300 ${openIndex === index ? "bg-white border-slate-200 shadow-sm" : "bg-white/50 border-slate-100 hover:border-slate-200"
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-6 flex items-center justify-between gap-4 text-left"
                            >
                                <span className="text-base md:text-lg font-bold text-slate-800">{faq.question}</span>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openIndex === index ? "bg-slate-900 text-white rotate-180" : "bg-slate-100 text-slate-500"
                                    }`}>
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function DevelopmentCTA() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-[3rem] bg-slate-900 overflow-hidden p-12 lg:p-24 text-center space-y-8 shadow-2xl">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                            Start Supporting Your Child's Growth Today
                        </h2>
                        <p className="text-lg text-slate-400 font-medium leading-relaxed">
                            Every milestone counts. Join BrightPath to access personalized learning activities and track your child's developmental progress.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                Get Started
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </Link>
                            <Link
                                href="/login"
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white text-slate-900 font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all duration-300 flex items-center justify-center"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
