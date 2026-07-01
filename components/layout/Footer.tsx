"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShieldCheck, Sparkles } from "lucide-react";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/development-areas", label: "Development areas" },
      { href: "/children", label: "Learning hub" },
    ],
  },
  {
    title: "Parents",
    links: [
      { href: "/children", label: "Child profiles" },
      { href: "/progress", label: "Progress dashboard" },
      { href: "/children", label: "Recommended games" },
    ],
  },
  {
    title: "Skills",
    links: [
      { href: "/development-areas", label: "Emotion skills" },
      { href: "/development-areas", label: "Daily routines" },
      { href: "/development-areas", label: "Early math" },
    ],
  },
];

const values = [
  { icon: Heart, label: "Child-friendly" },
  { icon: Sparkles, label: "Calm practice" },
  { icon: ShieldCheck, label: "Parent-guided" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.includes("/games/")) return null;

  return (
    <footer className="relative z-10 w-full overflow-hidden border-t border-slate-200 bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(59,130,246,0.24),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(139,92,246,0.20),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Lumo Buddy home">
              <Image
                src="/images/logo.jpeg"
                alt=""
                width={52}
                height={52}
                priority
                className="h-12 w-12 rounded-2xl border border-white/10 object-cover shadow-lg shadow-blue-950/40"
              />
              <div>
                <p className="text-2xl font-black tracking-tight">Lumo Buddy</p>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-200">Calm supportive learning</p>
              </div>
            </Link>

            <p className="max-w-xl text-sm font-semibold leading-7 text-slate-300 sm:text-base">
              Gentle activities and simple progress tracking for children, guided by parents and designed around calm, predictable learning moments.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {values.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-bold text-slate-200"
                >
                  <Icon className="h-3.5 w-3.5 text-blue-200" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">
                  {group.title}
                </h2>
                <nav className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <Link
                      key={`${group.title}-${link.label}`}
                      href={link.href}
                      className="text-sm font-bold text-slate-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="max-w-3xl text-xs font-medium leading-6 text-slate-400">
              <span className="font-black text-slate-200">Support note:</span> Lumo Buddy supports learning practice and progress tracking. It is not a medical diagnosis tool and does not replace professional guidance.
            </p>

            <Link
              href="/children"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-black text-slate-950 transition-colors hover:bg-blue-100"
            >
              Continue Learning
            </Link>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs font-semibold text-slate-500">
            © {new Date().getFullYear()} Lumo Buddy. Calm, parent-guided learning for children.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs font-semibold text-slate-500">
            <span>Child-friendly</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span>Privacy-minded</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span>Supportive</span>
          </div>
        </div>
      </div>
    </footer>
  );
}