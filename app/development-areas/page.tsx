"use client";

import { CalmBackground } from "@/components/ui/CalmBackground";
import { DevelopmentHero } from "@/components/development-areas/Hero";
import { DevelopmentCards } from "@/components/development-areas/DevelopmentCards";
import { SupportFlows, ImportanceGrid } from "@/components/development-areas/ValueSections";
import { DevelopmentFAQ, DevelopmentCTA } from "@/components/development-areas/FinalSections";

export default function DevelopmentAreasPage() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-white">
            {/* Visual Ambiance */}
            <CalmBackground />

            {/* 1. Hero Section */}
            <DevelopmentHero />

            {/* 2. Four Core Development Areas */}
            <DevelopmentCards />

            {/* 3. & 4. Support Flows & Personalization */}
            <SupportFlows />

            {/* 5. Why These Skills Matter */}
            <ImportanceGrid />

            {/* 6. FAQ Section */}
            <DevelopmentFAQ />

            {/* 7. Final CTA */}
            <DevelopmentCTA />

            {/* Standard Educational Footer */}
            <footer className="py-12 border-t border-slate-100 text-center">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                    Empowering Children Through Personalized Learning 💙
                </p>
            </footer>
        </main>
    );
}
