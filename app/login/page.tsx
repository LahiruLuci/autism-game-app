import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-10">
      <section className="w-full max-w-md">
        <Link
          className="mb-6 inline-flex text-sm font-semibold text-slate-500 transition hover:text-primary-blue"
          href="/"
        >
          Back to home
        </Link>

        <div className="rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-premium backdrop-blur sm:p-8">
          <div className="mb-8 text-center">
            <span className="mb-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase text-blue-600">
              Parent Access
            </span>
            <h1 className="section-heading mb-3">Welcome Back</h1>
            <p className="body-text">
              Continue your child&rsquo;s learning activities.
            </p>
          </div>

          <LoginForm />
        </div>
      </section>
    </main>
  );
}
