"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalHubCTA({ childId }: { childId: string }) {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-[3rem] bg-slate-900 overflow-hidden p-12 lg:p-24 text-center space-y-8 shadow-2xl">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                            Continue Your Child's Learning Journey
                        </h2>
                        <p className="text-lg text-slate-400 font-medium leading-relaxed">
                            Explore recommended activities and support steady progress with daily personalized exercises.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                            <Link
                                href={`/games/${childId}`}
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white text-slate-900 font-black text-sm uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                Continue Learning
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </Link>
                            <Link
                                href={`/children/${childId}`}
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-slate-800 text-slate-300 border border-slate-700 font-black text-sm uppercase tracking-widest hover:bg-slate-700 hover:text-white transition-all duration-300 flex items-center justify-center"
                            >
                                View Child Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
