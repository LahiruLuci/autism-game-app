"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AppAuthError, registerParent } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const fillAllFieldsMessage = "Please fill all fields.";
const passwordMismatchMessage = "Passwords do not match.";
const shortPasswordMessage = "Password must be at least 6 characters.";
const createErrorMessage =
  "We could not create your account. Please try again.";
const emailRateLimitMessage =
  "Too many signup emails were requested. Please wait a few minutes and try again.";
const emailAlreadyRegisteredMessage =
  "This email already has an account. Please log in or use a different email.";
const parentProfilePermissionMessage =
  "Your account was created, but we could not save the parent profile. Please check the parents table access policy.";

export function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setErrorMessage(fillAllFieldsMessage);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(passwordMismatchMessage);
      return;
    }

    if (password.length < 6) {
      setErrorMessage(shortPasswordMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerParent({
        fullName: trimmedName,
        email: trimmedEmail,
        password,
      });

      if (result.requiresEmailConfirmation) {
        const message =
          "Account created. Please check your email and confirm your address before logging in.";
        setSuccessMessage(message);
        toast.success(message);
        return;
      }

      toast.success("Account created successfully.");
      router.push("/children");
      router.refresh();
    } catch (error) {
      let message = createErrorMessage;

      if (error instanceof AppAuthError) {
        if (error.code === "email_rate_limit") {
          message = emailRateLimitMessage;
        }

        if (error.code === "email_already_registered") {
          message = emailAlreadyRegisteredMessage;
        }

        if (error.code === "parent_profile_forbidden") {
          message = parentProfilePermissionMessage;
        }
      }

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <form className="space-y-5" onSubmit={handleSubmit}>
        {successMessage ? (
          <div
            className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
            role="status"
          >
            {successMessage}{" "}
            <Link className="underline" href="/login">
              Go to login
            </Link>
          </div>
        ) : null}

        {errorMessage ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
            role="alert"
          >
            {errorMessage}
          </div>
        ) : null}

        <Input
          autoComplete="name"
          label="Full name"
          name="fullName"
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Your full name"
          type="text"
          value={fullName}
        />
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
          autoComplete="new-password"
          label="Password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 6 characters"
          type="password"
          value={password}
        />
        <Input
          autoComplete="new-password"
          label="Confirm password"
          name="confirmPassword"
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Repeat your password"
          type="password"
          value={confirmPassword}
        />

        <Button isLoading={isSubmitting} type="submit">
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          className="font-bold text-primary-blue transition hover:text-blue-600"
          href="/login"
        >
          Login
        </Link>
      </p>
    </>
  );
}
