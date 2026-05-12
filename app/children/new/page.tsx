"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChildProfileForm } from "@/components/children/ChildProfileForm";
import { LoadingState } from "@/components/ui/LoadingState";
import { getCurrentParent } from "@/lib/children";

export default function NewChildPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function checkParent() {
      try {
        await getCurrentParent();
      } catch (error) {
        const message =
          error instanceof Error && error.message === "not_authenticated"
            ? "Please login again."
            : "We could not load child profiles.";

        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }

        if (isMounted) {
          setErrorMessage(message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    checkParent();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50 px-4 py-10">
      <section className="w-full max-w-2xl">
        <Link
          className="mb-6 inline-flex text-sm font-semibold text-slate-500 transition hover:text-primary-blue"
          href="/children"
        >
          Back to child profiles
        </Link>

        <div className="rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-premium backdrop-blur sm:p-8">
          <div className="mb-8">
            <span className="mb-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase text-blue-600">
              Child Profile
            </span>
            <h1 className="section-heading mb-3">Add Child Profile</h1>
            <p className="body-text">
              Create a profile before starting the survey.
            </p>
          </div>

          {isLoading ? <LoadingState message="Loading child profiles..." /> : null}
          {!isLoading && errorMessage ? (
            <div
              className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
              role="alert"
            >
              {errorMessage}
            </div>
          ) : null}
          {!isLoading && !errorMessage ? <ChildProfileForm /> : null}
        </div>
      </section>
    </main>
  );
}
