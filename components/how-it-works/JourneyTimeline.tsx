"use client";

import { motion } from "framer-motion";
import { UserPlus, ClipboardCheck, Sparkles, Gamepad2, LineChart } from "lucide-react";

const steps = [
    {
        icon: <UserPlus className="w-8 h-8" />,
        title: "Create Child Profile",
        description: "Add your child and create a personalized learning space tailored to their identity and preferences.",
        color: "bg-blue-500",
        lightColor: "bg-blue-50",
        borderColor: "border-blue-100",
        iconColor: "text-blue-600"
    },
    {
        icon: <ClipboardCheck className="w-8 h-8" />,
        title: "Complete Assessment",
        description: "Answer a short parent survey to help BrightPath understand your child's current needs and developmental stage.",
        color: "bg-violet-500",
        lightColor: "bg-violet-50",
        borderColor: "border-violet-100",
        iconColor: "text-violet-600"
    },
    {
        icon: <Sparkles className="w-8 h-8" />,
        title: "Receive Personalized Recommendations",
        description: "BrightPath identifies areas that may need support and recommends suitable activities specifically for your child.",
        color: "bg-teal-500",
        lightColor: "bg-teal-50",
        borderColor: "border-teal-100",
        iconColor: "text-teal-600"
    },
    {
        icon: <Gamepad2 className="w-8 h-8" />,
        title: "Start Learning Activities",
        description: "Your child can complete carefully designed learning activities at their own pace in a calm, focused environment.",
        color: "bg-amber-500",
        lightColor: "bg-amber-50",
        borderColor: "border-amber-100",
        iconColor: "text-amber-600"
    },
    {
        icon: <LineChart className="w-8 h-8" />,
        title: "Track Progress",
        description: "View reports, activity results, and learning insights through the intuitive parent dashboard.",
        color: "bg-rose-500",
        lightColor: "bg-rose-50",
        borderColor: "border-rose-100",
        iconColor: "text-rose-600"
    }
];

export function JourneyTimeline() {
    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                        The Learning Journey
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl mx-auto px-4">
                        A structured path designed to support both you and your child at every step of development.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-slate-50 hidden lg:block" />

                    <div className="space-y-12 lg:space-y-32">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-24 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Visual Side */}
                                <div className="flex-1 flex justify-center w-full">
                                    <div className={`relative w-full max-w-[280px] aspect-square sm:w-80 sm:h-80 rounded-[2.5rem] md:rounded-[3rem] ${step.lightColor} border-2 ${step.borderColor} flex items-center justify-center group overflow-hidden shadow-sm`}>
                                        <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-500" />
                                        <div className={`p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white shadow-xl ${step.iconColor} transition-transform duration-500 group-hover:scale-110`}>
                                            {step.icon}
                                        </div>
                                        {/* Floating decorative elements */}
                                        <div className={`absolute top-10 right-10 w-4 h-4 rounded-full ${step.color} opacity-20`} />
                                        <div className={`absolute bottom-20 left-12 w-6 h-6 rounded-full ${step.color} opacity-10`} />
                                    </div>
                                </div>

                                {/* Milestone Dot (Desktop) */}
                                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-slate-50 items-center justify-center z-10 shadow-sm">
                                    <div className={`w-4 h-4 rounded-full ${step.color}`} />
                                </div>

                                {/* Content Side */}
                                <div className="flex-1 text-center lg:text-left space-y-3 md:space-y-4 px-4">
                                    <div className="inline-flex items-center gap-2 mb-1">
                                        <span className={`w-7 h-7 md:w-8 md:h-8 rounded-lg ${step.color} text-white flex items-center justify-center font-black text-xs md:text-sm`}>
                                            {index + 1}
                                        </span>
                                        <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${step.iconColor}`}>
                                            Step {index + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
