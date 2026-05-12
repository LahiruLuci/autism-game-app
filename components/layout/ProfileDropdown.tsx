"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProfileDropdown({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 pr-4 rounded-full hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm"
      >
        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm">
          {email.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-bold text-slate-700 hidden sm:block truncate max-w-[150px]">
          {email.split("@")[0]}
        </span>
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden py-2 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-5 py-4 border-b border-slate-50 bg-slate-50/50">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Signed in as</p>
            <p className="text-sm font-semibold text-slate-900 truncate">{email}</p>
          </div>
          
          <div className="p-2">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors flex items-center gap-3"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
