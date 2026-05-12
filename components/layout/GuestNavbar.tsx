import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

export default function GuestNavbar() {
  return (
    <div className="flex items-center justify-between h-16 sm:h-20 w-full layout-container">
      {/* Left side */}
      <Logo href="/" />

      {/* Center/Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-10">
        <Link href="/#how-it-works" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">How It Works</Link>
        <Link href="/#development-areas" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Development Areas</Link>
      </nav>

      {/* Right side Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors px-4 py-2">
          Login
        </Link>
        <Link href="/register" className="rounded-full bg-blue-400 px-6 py-2.5 text-sm font-extrabold text-white shadow-sm transition-all hover:bg-blue-500 hover:shadow-md hover:-translate-y-0.5">
          Get Started
        </Link>
      </div>

      {/* Mobile Menu (Hamburger) */}
      <MobileMenu />
    </div>
  );
}
