"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";

export default function AuthNavbar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <div className="flex items-center justify-between h-16 sm:h-20 w-full layout-container">
      {/* Left side */}
      <div className="flex items-center gap-12">
        <Logo href="/children" />
        
        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/children" 
            className={`text-sm transition-all duration-300 ${isActive("/children") ? "font-bold text-blue-600 border-b-2 border-blue-600 pb-1" : "font-semibold text-slate-500 hover:text-blue-600 hover:-translate-y-0.5"}`}
          >
            Children
          </Link>
          <Link 
            href="/games" 
            className={`text-sm transition-all duration-300 ${isActive("/games") ? "font-bold text-violet-600 border-b-2 border-violet-600 pb-1" : "font-semibold text-slate-500 hover:text-violet-600 hover:-translate-y-0.5"}`}
          >
            Games
          </Link>
        </nav>
      </div>

      {/* Right side Desktop & Mobile */}
      <div className="flex items-center gap-4">
        <ProfileDropdown email={userEmail} />
      </div>
    </div>
  );
}
