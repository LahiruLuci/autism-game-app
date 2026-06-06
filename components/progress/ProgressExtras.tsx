"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProgressEmptyState() {
    return (
        <div className="py-24 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="w-20 h-20 mx-auto rounded-[2rem] bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <svg className="w-9 h-9 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <div className="space-y-3">
                    <h2 className="text-2xl font-black text-slate-900">No Children Added Yet</h2>
                    <p className="text-slate-500 font-medium leading-relaxed">
                        Add a child profile to start tracking learning progress and receive personalized activity recommendations.
                    </p>
                </div>
                <Link
                    href="/children/new"
                    className="inline-flex items-center gap-3 h-14 px-10 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
                >
                    Add First Child
                    <ArrowRight size={18} strokeWidth={2.5} />
                </Link>
            </div>
        </div>
    );
}

export function ProgressNoActivityState({ children }: { children: { id: string; child_name: string }[] }) {
    return (
        <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-[2.5rem] bg-slate-50 border border-slate-100 p-12 text-center space-y-6">
                    <h3 className="text-2xl font-black text-slate-900">No Learning Activity Yet</h3>
                    <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                        Start recommended activities to begin tracking progress. Each completed activity will appear here.
                    </p>
                    {children.length > 0 && (
                        <Link
                            href={`/games/${children[0].id}`}
                            className="inline-flex items-center gap-3 h-14 px-10 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
                        >
                            Continue Learning
                            <ArrowRight size={18} strokeWidth={2.5} />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}

export function ProgressFinalCTA() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-[3rem] bg-slate-900 overflow-hidden p-10 md:p-20 text-center space-y-6 shadow-2xl">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3" />
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                            Continue Your Child's Learning Journey
                        </h2>
                        <p className="text-base md:text-lg text-slate-400 font-medium leading-relaxed">
                            Explore recommended activities and support steady progress with daily personalized exercises.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link
                                href="/children"
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white text-slate-900 font-black text-sm uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                            >
                                View Child Profiles
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </Link>
                            <Link
                                href="/development-areas"
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-slate-800 text-slate-300 border border-slate-700 font-black text-sm uppercase tracking-widest hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center"
                            >
                                Development Areas
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
