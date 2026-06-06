"use client";

import { motion } from "framer-motion";
import { Heart, Brain, User, Hash, ChevronRight } from "lucide-react";

interface BrowseByAreaProps {
    activityCounts: Record<string, number>;
}

export function BrowseByArea({ activityCounts }: BrowseByAreaProps) {
    const areas = [
        {
            id: "emotion",
            title: "Emotion Skills",
            icon: <Heart size={20} />,
            color: "bg-rose-500",
            lightColor: "bg-rose-50",
            textColor: "text-rose-600",
            description: "Recognizing and responding to emotional cues.",
            focus: "Empathy & Expression"
        },
        {
            id: "cognitive",
            title: "Cognitive Skills",
            icon: <Brain size={20} />,
            color: "bg-blue-500",
            lightColor: "bg-blue-50",
            textColor: "text-blue-600",
            description: "Building focus, memory, and logical thinking.",
            focus: "Logic & Attention"
        },
        {
            id: "self_awareness",
            title: "Self Awareness",
            icon: <User size={20} />,
            color: "bg-indigo-500",
            lightColor: "bg-indigo-50",
            textColor: "text-indigo-600",
            description: "Understanding body and personal preferences.",
            focus: "Identity & Needs"
        },
        {
            id: "mathematical",
            title: "Mathematical Skills",
            icon: <Hash size={20} />,
            color: "bg-teal-500",
            lightColor: "bg-teal-50",
            textColor: "text-teal-600",
            description: "Exploring numbers, shapes, and patterns.",
            focus: "Numbers & Space"
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Browse by Development Area</h2>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        Focus on specific developmental pillars to support your child's unique learning needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {areas.map((area, idx) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="h-full bg-white rounded-[2.5rem] p-8 border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center space-y-6">
                                <div className={`w-14 h-14 rounded-2xl ${area.lightColor} ${area.textColor} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-inner`}>
                                    {area.icon}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-black text-slate-900">{area.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                        {area.description}
                                    </p>
                                </div>

                                <div className="w-full pt-4 flex flex-col gap-3 border-t border-slate-50">
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Activity Count</span>
                                        <span className={`text-sm font-black ${area.textColor}`}>{activityCounts[area.id] || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Focus</span>
                                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{area.focus}</span>
                                    </div>
                                </div>

                                <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2 ${area.textColor}`}>
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
