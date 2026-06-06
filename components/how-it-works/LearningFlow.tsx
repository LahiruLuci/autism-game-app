"use client";

import { motion } from "framer-motion";
import { FileSearch, Sparkles, Gamepad2, Database, BarChart2 } from "lucide-react";

export function LearningFlow() {
    const steps = [
        { icon: <FileSearch size={24} />, label: "Assessment Results" },
        { icon: <Sparkles size={24} />, label: "Recommendations" },
        { icon: <Gamepad2 size={24} />, label: "Activities" },
        { icon: <Database size={24} />, label: "Progress Data" },
        { icon: <BarChart2 size={24} />, label: "Parent Insights" },
    ];

    return (
        <section className="py-12 md:py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 text-center">
                        Personalized Learning Flow
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto px-4">
                        Every child follows a personalized learning path based on assessment results and activity performance.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-4 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-4 flex-1 w-full sm:w-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col items-center gap-2 group w-full"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-blue-200 group-hover:shadow-md">
                                    {step.icon}
                                </div>
                                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 text-center max-w-[120px] leading-tight">
                                    {step.label}
                                </span>
                            </motion.div>

                            {index < steps.length - 1 && (
                                <div className="hidden lg:block flex-1 min-w-[40px] h-px bg-gradient-to-r from-blue-200 to-transparent opacity-50 relative">
                                    <motion.div
                                        animate={{ left: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute top-0 w-8 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                                    />
                                </div>
                            )}

                            {/* Mobile Arrow */}
                            {index < steps.length - 1 && (
                                <div className="lg:hidden animate-bounce text-slate-300 py-2">
                                    <ChevronDown size={16} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 to-transparent -z-0" />
        </section>
    );
}

function ChevronDown({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
    );
}
