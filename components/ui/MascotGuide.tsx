"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MascotGuideProps {
    message: string;
    mascotName?: string;
    imageSrc?: string;
    className?: string;
}

export function MascotGuide({
    message,
    mascotName = "Lumi",
    imageSrc = "/mascot/mascot-normal.png",
    className = ""
}: MascotGuideProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative w-full max-w-4xl mx-auto px-6 ${className}`}
        >
            <div className="bg-white/40 backdrop-blur-md rounded-[3.5rem] border-4 border-white p-10 flex flex-col sm:flex-row items-center gap-10 text-center sm:text-left shadow-sm">
                {/* Mascot Character Container */}
                <div className="relative">
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-32 h-32 sm:w-40 sm:h-40 relative z-10"
                    >
                        <Image
                            src={imageSrc}
                            alt={mascotName}
                            width={160}
                            height={160}
                            className="w-full h-full object-contain"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Message Content */}
                <div className="flex-1 space-y-4">
                    <div className="inline-flex px-5 py-2 rounded-full bg-[#E0F2FE] text-[#0369A1] text-[10px] font-black uppercase tracking-[0.2em]">
                        Let's Learn Together
                    </div>
                    <p className="text-2xl sm:text-4xl font-black text-slate-800 leading-tight">
                        {message}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
