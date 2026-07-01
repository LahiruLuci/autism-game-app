"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";

const navLinks = [
  { href: "/children", label: "Children" },
  { href: "/progress", label: "Progress" },
];

export default function AuthNavbar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between h-16 sm:h-20 w-full layout-container">
      {/* Left side */}
      <div className="flex items-center gap-10">
        <Logo href="/" />

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-bold py-1 transition-all duration-300 ${isActive ? "text-blue-600" : "text-slate-500 hover:text-blue-600"
                  }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="auth-nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <ProfileDropdown email={userEmail} />
      </div>
    </div>
  );
}
