import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-8 relative z-10">
      <div className="layout-container flex flex-col lg:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center lg:items-start gap-4">
          <Logo />
          <p className="text-sm text-slate-500 font-medium">Supportive learning activities for children.</p>
        </div>
        
        <div className="text-center lg:text-right max-w-md">
          <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium">
            This platform supports learning and progress tracking and is not a medical diagnosis tool.
          </p>
          <div className="flex justify-center lg:justify-end gap-8 text-sm font-bold text-slate-400">
            <Link href="#" className="hover:text-blue-500 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">Support</Link>
          </div>
        </div>
      </div>
      <div className="layout-container mt-12 pt-8 border-t border-slate-100/50 text-center">
        <p className="text-xs font-bold tracking-wider text-slate-300 uppercase">© {new Date().getFullYear()} BrightPath. All rights reserved.</p>
      </div>
    </footer>
  );
}
