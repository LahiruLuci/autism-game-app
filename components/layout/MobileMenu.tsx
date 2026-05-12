"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-premium py-6 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 z-50">
          <Link href="/#how-it-works" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-600 hover:text-blue-600 p-2">How It Works</Link>
          <Link href="/#development-areas" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-600 hover:text-blue-600 p-2">Development Areas</Link>
          <hr className="border-slate-100 my-2" />
          <Link href="/login" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-700 hover:text-blue-600 p-2">Login</Link>
          <Link href="/register" onClick={() => setIsOpen(false)} className="rounded-2xl bg-blue-400 px-5 py-4 text-center text-lg font-bold text-white shadow-sm hover:bg-blue-500 hover:shadow-md transition-all w-full mt-2">
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}
