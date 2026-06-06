"use client";

import { motion } from "framer-motion";
import { Heart, Brain, User, Hash, CheckCircle2 } from "lucide-react";

const areas = [
    {
        id: "emotion",
        title: "Emotion Skills",
        icon: <Heart className="w-8 h-8 md:w-10 md:h-10" />,
        description: "Developing the ability to recognize, understand, and respond to emotional cues and expressions.",
        whyItMatters: "Emotional intelligence is the foundation of social connection and self-regulation. Understanding feelings helps children navigate social interactions with more confidence.",
        skills: ["Facial Expression Recognition", "Emotion Labeling", "Empathetic Responses", "Situational Context"],
        color: "text-rose-600",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-100",
        dotColor: "bg-rose-500"
    },
    {
        id: "cognitive",
        title: "Cognitive Skills",
        icon: <Brain className="w-8 h-8 md:w-10 md:h-10" />,
        description: "Strengthening mental processes like memory, attention, pattern recognition, and logical thinking.",
        whyItMatters: "Cognitive development supports problem-solving and learning readiness. It helps children organize information and make sense of their daily environment.",
        skills: ["Pattern Matching", "Visual Memory", "Logical Sequencing", "Focus & Attention"],
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-100",
        dotColor: "bg-blue-500"
    },
    {
        id: "self-awareness",
        title: "Self Awareness",
        icon: <User className="w-8 h-8 md:w-10 md:h-10" />,
        description: "Building an understanding of one's own body, preferences, and personal identity.",
        whyItMatters: "Self-awareness fosters independence and agency. When children understand themselves, they can communicate their needs and preferences more effectively.",
        skills: ["Body Awareness", "Personal Preferences", "Identifying Needs", "Creative Expression"],
        color: "text-indigo-600",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-100",
        dotColor: "bg-indigo-500"
    },
    {
        id: "mathematical",
        title: "Mathematical Skills",
        icon: <Hash className="w-8 h-8 md:w-10 md:h-10" />,
        description: "Introducing fundamental concepts of numbers, quantity, shapes, and spatial awareness.",
        whyItMatters: "Early math skills provide a structured way to understand the world. They support daily tasks like counting, sorting, and recognizing physical patterns.",
        skills: ["Object Counting", "Shape Recognition", "Size Comparisons", "Spatial Awareness"],
        color: "text-teal-600",
        bgColor: "bg-teal-50",
        borderColor: "border-teal-100",
        dotColor: "bg-teal-500"
    }
];

export function DevelopmentCards() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">Core Development Areas</h2>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Our platform focuses on four essential pillars of development, ensuring a balanced and comprehensive learning experience.
                    </p>
                </div>

                <div className="space-y-12 md:space-y-24">
                    {areas.map((area, index) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                        >
                            {/* Image/Visual Side */}
                            <div className="lg:w-1/2 group relative">
                                <div className={`absolute inset-0 ${area.bgColor} rounded-[2.5rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500`} />
                                <div className={`relative h-full min-h-[300px] md:min-h-[400px] bg-white border-2 ${area.borderColor} rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center overflow-hidden shadow-sm`}>
                                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-[2rem] ${area.bgColor} flex items-center justify-center ${area.color} mb-8 transition-transform duration-500 group-hover:scale-110 shadow-inner`}>
                                        {area.icon}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">{area.title}</h3>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {area.skills.map((skill, sIndex) => (
                                            <span key={sIndex} className={`px-4 py-1.5 rounded-full ${area.bgColor} ${area.color} text-[10px] md:text-xs font-black uppercase tracking-widest`}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="lg:w-1/2 flex flex-col justify-center space-y-8 px-4">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${area.dotColor}`} />
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Deep Dive</span>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-800">What is it?</h4>
                                    <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                        {area.description}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xl font-black text-slate-800">Why it matters?</h4>
                                    <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                        {area.whyItMatters}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                    {area.skills.slice(0, 4).map((skill, sIndex) => (
                                        <div key={sIndex} className="flex items-center gap-3">
                                            <CheckCircle2 size={18} className={area.color} />
                                            <span className="text-sm font-bold text-slate-700">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
