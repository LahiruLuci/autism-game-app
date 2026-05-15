"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import GuestNavbar from "./GuestNavbar";
import AuthNavbar from "./AuthNavbar";
import MobileBottomNav from "./MobileBottomNav";

export default function Navigation() {
  const pathname = usePathname();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        if (error) {
          // If there's an auth error (like invalid refresh token), sign out to clear stale data
          if (error.message.includes("Refresh Token Not Found")) {
            await supabase.auth.signOut();
          }
          throw error;
        }
        setSession(currentSession);
      } catch (err) {
        console.warn("[Navigation] Session check failed:", err);
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Early return for "Journey Mode" (immersive pages)
  // Must be after all hooks to follow React rules
  if (pathname?.includes("/games/")) {
    return null;
  }

  if (loading) {
    return <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 h-16 sm:h-20 w-full"></header>;
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all duration-300 w-full">
        {session ? <AuthNavbar userEmail={session.user?.email || ""} /> : <GuestNavbar />}
      </header>
      {session && <MobileBottomNav />}
    </>
  );
}
