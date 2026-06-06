"use client";

import { motion } from "framer-motion";
import { UserCircle, Sparkles, Trophy, LineChart, PieChart, ShieldCheck, Lock, Database } from "lucide-react";

export function DashboardShowcase() {
    const highlights = [
        { icon: <UserCircle size={18} />, label: "Child Profiles" },
        { icon: <Sparkles size={18} />, label: "Learning Recommendations" },
        { icon: <Trophy size={18} />, label: "Activity Results" },
        { icon: <LineChart size={18} />, label: "Progress Tracking" },
        { icon: <PieChart size={18} />, label: "Parent Insights" },
    ];

    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left: Content */}
                    <div className="lg:w-2/5 space-y-4 md:space-y-6 text-center lg:text-left">
                        <h2 className="text-2xl md:text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight px-4 md:px-0">
                            A Dashboard Designed for <span className="text-blue-600">Clarity</span>
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 px-4 md:px-0">
                            Parents can monitor learning progress and make informed decisions using simple, easy-to-understand insights provided by our comprehensive dashboard.
                        </p>

                        <div className="space-y-3 pt-4 inline-flex flex-col items-start mx-auto lg:mx-0">
                            {highlights.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shadow-sm border border-blue-100/50">
                                        {item.icon}
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Mockup Showcase */}
                    <div className="lg:w-3/5 w-full relative mt-8 lg:mt-0">
                        <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full" />

                        <div className="relative rounded-[2rem] md:rounded-[2.5rem] border-4 md:border-8 border-slate-900 bg-slate-900 overflow-hidden shadow-2xl">
                            {/* Browser Header */}
                            <div className="h-6 md:h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-rose-500" />
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-500" />
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500" />
                            </div>

                            {/* Mockup Content */}
                            <div className="aspect-[16/10] bg-slate-50 p-3 md:p-6 flex gap-4 overflow-hidden">
                                {/* Sidebar */}
                                <div className="w-10 md:w-16 space-y-4 pt-4 hidden sm:block">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-slate-200 mx-auto" />)}
                                </div>
                                {/* Main Content */}
                                <div className="flex-1 space-y-4 md:space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="w-1/3 h-6 md:h-8 bg-white rounded-lg border border-slate-200 shadow-sm" />
                                        <div className="w-16 md:w-24 h-6 md:h-8 bg-blue-500 rounded-lg shadow-sm" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                        <div className="h-24 md:h-32 bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm p-3 md:p-4 space-y-2 md:space-y-3">
                                            <div className="w-1/2 h-1.5 md:h-2 bg-slate-100 rounded" />
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-50" />
                                                <div className="flex-1 h-2 md:h-3 bg-slate-100 rounded" />
                                            </div>
                                        </div>
                                        <div className="h-24 md:h-32 bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm p-3 md:p-4 space-y-2 md:space-y-3 hidden sm:block">
                                            <div className="w-1/2 h-1.5 md:h-2 bg-slate-100 rounded" />
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-emerald-50" />
                                                <div className="flex-1 h-2 md:h-3 bg-slate-100 rounded" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-32 md:h-44 bg-white rounded-[1.5rem] md:rounded-3xl border border-slate-200 shadow-sm p-4 md:p-6 space-y-4">
                                        <div className="w-1/4 h-2 md:h-3 bg-slate-100 rounded" />
                                        <div className="flex items-end gap-2 md:gap-3 h-14 md:h-20">
                                            {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                                <div key={i} className="flex-1 bg-blue-500/10 rounded-t-sm md:rounded-t-lg relative group">
                                                    <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm md:rounded-t-lg transition-all duration-500" style={{ height: `${h}%` }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating floating indicators */}
                        <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl border border-slate-100 hidden sm:block">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                    <Trophy size={16} />
                                </div>
                                <div>
                                    <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">Goals Met</p>
                                    <p className="text-xs md:text-sm font-black text-slate-800">85% Complete</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function TrustSection() {
    const cards = [
        {
            icon: <ShieldCheck size={28} className="text-blue-600" />,
            title: "Private Child Profiles",
            description: "Only parents have access to their child's profile and learning history."
        },
        {
            icon: <LineChart size={28} className="text-blue-600" />,
            title: "Progress Tracking",
            description: "Detailed insights into developmental progress over time, kept entirely secure."
        },
        {
            icon: <Database size={28} className="text-blue-600" />,
            title: "Secure Data Storage",
            description: "We use enterprise-grade encryption to protect your sensitive information."
        }
    ];

    return (
        <section className="py-12 md:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 px-4">Safety & Privacy First</h2>
                    <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto px-4">
                        BrightPath is built on a foundation of trust. We prioritize your family's privacy above all else.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
                        >
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1rem] md:rounded-[1.25rem] bg-blue-50 flex items-center justify-center mb-6 md:mb-8 transition-transform group-hover:scale-110 shadow-inner">
                                {card.icon}
                            </div>
                            <h3 className="text-lg md:text-xl font-black text-slate-800 mb-3 md:mb-4">{card.title}</h3>
                            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">{card.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
