"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, BarChart2, User } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const tabs = [
    { href: "/children", label: "Children", icon: <Users className="w-6 h-6" />, match: "/children" },
    { href: "/progress", label: "Progress", icon: <BarChart2 className="w-6 h-6" />, match: "/progress" },
    { href: "/children", label: "Profile", icon: <User className="w-6 h-6" />, match: "__none__" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 pb-safe">
      <div className="flex justify-around items-center h-[72px] px-2 sm:px-6">
        {tabs.map((tab) => {
          const isActive = pathname?.startsWith(tab.match) && tab.match !== "__none__";
          return (
            <Link
              key={tab.href + tab.label}
              href={tab.href}
              className="flex flex-col items-center justify-center w-full h-full p-2 group transition-transform active:scale-95"
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? "bg-blue-100 text-blue-600 shadow-inner" : "text-slate-400 group-hover:bg-slate-50 group-hover:text-slate-600"
                }`}>
                {tab.icon}
              </div>
              <span className={`text-[11px] mt-1.5 font-bold tracking-wide ${isActive ? "text-blue-600" : "text-slate-500"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
