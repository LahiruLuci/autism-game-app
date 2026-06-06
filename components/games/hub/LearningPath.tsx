"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Sparkles, Trophy, Star } from "lucide-react";

export function LearningPath() {
    const steps = [
        { icon: <ClipboardCheck />, label: "Assessment", text: "Foundation stage" },
        { icon: <Star />, label: "Level 1", text: "Core skills" },
        { icon: <Sparkles />, label: "Level 2", text: "Growth stage" },
        { icon: <Trophy />, label: "Level 3", text: "Mastery" }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Content */}
                    <div className="lg:w-2/5 space-y-8 text-center lg:text-left">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                                A Guided <span className="text-blue-600">Learning Path</span>
                            </h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                Activities unlock gradually as children build skills and confidence. Our structured progression ensures learning remains supportive and never overwhelming.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100/50 inline-block text-left max-w-md mx-auto lg:mx-0">
                            <p className="text-sm font-bold text-blue-700 leading-relaxed">
                                Children build confidence by mastering simpler activities before moving on to more complex developmental challenges.
                            </p>
                        </div>
                    </div>

                    {/* Right: Timeline Visual */}
                    <div className="lg:w-3/5 w-full relative pt-12 lg:pt-0">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-50 -translate-y-1/2 hidden lg:block" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative">
                            {steps.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex flex-col items-center text-center space-y-6 relative"
                                >
                                    <div className="w-20 h-20 rounded-[2rem] bg-white border-4 border-slate-50 flex items-center justify-center text-blue-600 shadow-sm relative z-10">
                                        {step.icon}
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">{step.label}</p>
                                        <h4 className="text-lg font-bold text-slate-800">{step.text}</h4>
                                    </div>

                                    {/* Connector (Mobile/Tablet) */}
                                    {idx < steps.length - 1 && (
                                        <div className="lg:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-100" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
