"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { loginParent } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const fillAllFieldsMessage = "Please fill all fields.";
const loginErrorMessage =
  "We could not log you in. Please check your email and password.";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setErrorMessage(fillAllFieldsMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      await loginParent({
        email: trimmedEmail,
        password,
      });
      toast.success("Login successful.");
      router.push("/children");
      router.refresh();
    } catch {
      setErrorMessage(loginErrorMessage);
      toast.error(loginErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <form className="space-y-5" onSubmit={handleSubmit}>
        {errorMessage ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
            role="alert"
          >
            {errorMessage}
          </div>
        ) : null}

        <Input
          autoComplete="email"
          label="Email address"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="parent@example.com"
          type="email"
          value={email}
        />
        <Input
          autoComplete="current-password"
          label="Password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your password"
          type="password"
          value={password}
        />

        <Button isLoading={isSubmitting} type="submit">
          Login
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          className="font-bold text-primary-blue transition hover:text-blue-600"
          href="/register"
        >
          Create account
        </Link>
      </p>
    </>
  );
}
