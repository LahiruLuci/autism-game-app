"use client";

import { motion } from "framer-motion";
import { PlayCircle, Target, Trophy, LineChart, FileText, Sparkles, Gamepad2, TrendingUp, ChevronRight } from "lucide-react";

export function SupportFlows() {
    const activitySteps = [
        { icon: <PlayCircle />, label: "Targeted Activity" },
        { icon: <Target />, label: "Skill Practice" },
        { icon: <Trophy />, label: "Confidence Building" },
        { icon: <LineChart />, label: "Progress Tracking" }
    ];

    const personalizationSteps = [
        { icon: <FileText size={24} />, label: "Parent Assessment", desc: "Understanding current needs" },
        { icon: <Sparkles size={24} />, label: "Recommendations", desc: "Personalized path focus" },
        { icon: <Gamepad2 size={24} />, label: "Learning Activities", desc: "Tailored skill building" },
        { icon: <TrendingUp size={24} />, label: "Growth Insights", desc: "Informed next steps" }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-32">

                {/* Support Flow */}
                <div className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">How Activities Support Development</h2>
                        <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                            Our structured approach ensures that every interaction contributes to meaningful developmental outcomes.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 max-w-4xl mx-auto">
                        {activitySteps.map((step, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-center gap-8 md:gap-4 flex-1">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col items-center gap-4 group"
                                >
                                    <div className="w-20 h-20 rounded-[2rem] bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-blue-200 group-hover:shadow-md">
                                        {step.icon}
                                    </div>
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 text-center">
                                        {step.label}
                                    </span>
                                </motion.div>
                                {index < activitySteps.length - 1 && (
                                    <div className="text-slate-300 rotate-90 md:rotate-0">
                                        <ChevronRight size={20} strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Personalization Explanation */}
                <div className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Personalized Recommendations</h2>
                        <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                            Recommendations are dynamically adjusted based on child performance and assessment updates.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {personalizationSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/60 backdrop-blur-sm border border-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                                    {step.icon}
                                </div>
                                <h4 className="text-lg font-black text-slate-800 mb-2">{step.label}</h4>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
            {/* Visual Ambiance */}
            <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-50/50 rounded-bl-[10rem] -z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50/50 rounded-tr-[5rem] -z-0" />
        </section>
    );
}

export function ImportanceGrid() {
    const items = [
        {
            title: "Communication",
            desc: "Developing the ability to express needs and understand others clearly.",
            color: "bg-amber-500"
        },
        {
            title: "Daily Independence",
            desc: "Building the skills needed to navigate daily life with confidence.",
            color: "bg-emerald-500"
        },
        {
            title: "Problem Solving",
            desc: "Strengthening logic and critical thinking for real-world challenges.",
            color: "bg-violet-500"
        },
        {
            title: "Learning Readiness",
            desc: "Preparing for academic environments through focused mental exercises.",
            color: "bg-blue-500"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">Why These Skills Matter</h2>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Developmental milestones are building blocks for long-term well-being and success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="group flex gap-6 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className={`w-3 h-auto rounded-full ${item.color} opacity-20 group-hover:opacity-100 transition-opacity`} />
                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-slate-800">{item.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
