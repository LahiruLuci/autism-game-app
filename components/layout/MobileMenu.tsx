"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuLinks = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/development-areas", label: "Development Areas" },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-xl transition-all ${isOpen ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50"
          }`}
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
        <div className="absolute top-[100%] left-0 w-full bg-white border-b border-slate-200 shadow-premium py-6 px-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 z-50">
          {menuLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-bold p-3 rounded-2xl transition-all ${isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
          <hr className="border-slate-100 my-2 mx-3" />
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className={`text-lg font-bold p-3 rounded-2xl transition-all ${pathname === "/login"
              ? "bg-blue-50 text-blue-600"
              : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              }`}
          >
            Login
          </Link>
          <Link href="/register" onClick={() => setIsOpen(false)} className="rounded-2xl bg-blue-500 px-5 py-4 text-center text-lg font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all w-full mt-2">
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}
