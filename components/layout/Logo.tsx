import Image from "next/image";
import Link from "next/link";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2.5"
      aria-label="Lumo Buddy home"
    >
      <Image
        src="/images/logo.jpeg"
        alt=""
        width={48}
        height={48}
        priority
        className="h-11 w-11 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
      />
      <span className="font-display text-xl font-bold tracking-normal text-slate-900 sm:text-2xl">
        Lumo Buddy
      </span>
    </Link>
  );
}
