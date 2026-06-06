"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
    {
        question: "How does BrightPath create recommendations?",
        answer: "BrightPath uses the results from your initial parent assessment to analyze your child's specific developmental needs. Our system then identifies activities that align with their current support level in areas like emotion skills, cognition, and self-awareness."
    },
    {
        question: "Do I need technical knowledge?",
        answer: "Not at all. BrightPath is designed to be intuitive and parent-friendly. Every dashboard and activity is clearly labeled, and we provide simple guidance at every step of the journey."
    },
    {
        question: "How long should my child play each day?",
        answer: "We recommend short, consistent practice sessions of 10 to 15 minutes per day. This approach helps reduce overwhelm while allowing for meaningful skill-building in a calm environment."
    },
    {
        question: "Can I track progress over time?",
        answer: "Yes. Every activity your child completes is logged and analyzed. You can view detailed progress trends, accuracy scores, and completion times through your parent dashboard to see how your child is growing."
    },
    {
        question: "Can I update my child's assessment later?",
        answer: "Absolutely. We recommend retaking the parent assessment periodically or whenever you notice significant changes in your child's development to ensure their learning path remains perfectly aligned."
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight text-center mb-10 md:mb-16">
                    Common Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl md:rounded-3xl border transition-all duration-300 ${openIndex === index ? "bg-slate-50 border-slate-200" : "bg-white border-slate-100 hover:border-slate-200"
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-5 py-5 md:px-8 md:py-6 flex items-center justify-between gap-4 text-left"
                            >
                                <span className="text-base md:text-lg font-bold text-slate-800">{faq.question}</span>
                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${openIndex === index ? "bg-slate-900 text-white rotate-180" : "bg-slate-100 text-slate-500"
                                    }`}>
                                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
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
                                        <div className="px-5 pb-5 md:px-8 md:pb-8 text-sm md:text-base text-slate-600 font-medium leading-relaxed">
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

export function FinalCTA() {
    return (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-[2.5rem] md:rounded-[3rem] bg-slate-900 overflow-hidden p-8 md:p-12 lg:p-24 text-center space-y-6 md:space-y-8 shadow-2xl">
                    {/* Decorative background atoms */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-4 md:space-y-6">
                        <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight leading-tight px-2">
                            Ready to Begin Your Child's Learning Journey?
                        </h2>
                        <p className="text-base md:text-lg text-slate-400 font-medium leading-relaxed px-4">
                            Create a profile, complete the assessment, and start personalized learning activities today. BrightPath is here to support you at every stage.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 md:pt-6">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white text-slate-900 font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
                            >
                                Get Started
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </Link>
                            <Link
                                href="/development-areas"
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-slate-800 text-slate-300 border border-slate-700 font-black text-sm uppercase tracking-widest hover:bg-slate-700 hover:text-white transition-all duration-300 flex items-center justify-center"
                            >
                                View Development Areas
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
