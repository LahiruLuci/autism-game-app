"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Gamepad2, User } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Do not show on auth pages if they exist, but generally this is only rendered when session exists
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 pb-safe">
      <div className="flex justify-around items-center h-[72px] px-2 sm:px-6">
        <Link href="/children" className="flex flex-col items-center justify-center w-full h-full p-2 group transition-transform active:scale-95">
          <div className={`p-2 rounded-2xl transition-all duration-300 ${pathname?.startsWith("/children") ? "bg-blue-100 text-blue-600 shadow-inner" : "text-slate-400 group-hover:bg-slate-50 group-hover:text-slate-600"}`}>
            <Users className="w-6 h-6" />
          </div>
          <span className={`text-[11px] mt-1.5 font-bold tracking-wide ${pathname?.startsWith("/children") ? "text-blue-600" : "text-slate-500"}`}>Children</span>
        </Link>
        
        <Link href="/games" className="flex flex-col items-center justify-center w-full h-full p-2 group transition-transform active:scale-95">
          <div className={`p-2 rounded-2xl transition-all duration-300 ${pathname?.startsWith("/games") ? "bg-violet-100 text-violet-600 shadow-inner" : "text-slate-400 group-hover:bg-slate-50 group-hover:text-slate-600"}`}>
            <Gamepad2 className="w-6 h-6" />
          </div>
          <span className={`text-[11px] mt-1.5 font-bold tracking-wide ${pathname?.startsWith("/games") ? "text-violet-600" : "text-slate-500"}`}>Games</span>
        </Link>

        {/* Note: Profile link just goes to children list since there's no dedicated profile page yet, or could open a menu */}
        <Link href="/children" className="flex flex-col items-center justify-center w-full h-full p-2 group transition-transform active:scale-95">
          <div className={`p-2 rounded-2xl transition-all duration-300 text-slate-400 group-hover:bg-slate-50 group-hover:text-slate-600`}>
            <User className="w-6 h-6" />
          </div>
          <span className="text-[11px] mt-1.5 font-bold tracking-wide text-slate-500">Profile</span>
        </Link>
      </div>
    </div>
  );
}
