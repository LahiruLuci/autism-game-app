"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import GuestNavbar from "./GuestNavbar";
import AuthNavbar from "./AuthNavbar";
import MobileBottomNav from "./MobileBottomNav";

export default function Navigation() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
