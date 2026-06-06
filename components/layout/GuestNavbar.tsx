"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { motion } from "framer-motion";

export default function GuestNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/development-areas", label: "Development Areas" },
  ];

  return (
    <div className="flex items-center justify-between h-16 sm:h-20 w-full layout-container">
      {/* Left side */}
      <Logo href="/" />

      {/* Center/Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-bold transition-all duration-300 py-1 ${isActive ? "text-blue-600" : "text-slate-500 hover:text-blue-600"
                }`}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right side Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/login"
          className={`text-sm font-bold transition-colors px-4 py-2 ${pathname === "/login" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
            }`}
        >
          Login
        </Link>
        <Link href="/register" className="rounded-full bg-blue-500 px-6 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-600 hover:shadow-xl hover:-translate-y-0.5">
          Get Started
        </Link>
      </div>

      {/* Mobile Menu (Hamburger) */}
      <MobileMenu />
    </div>
  );
}
