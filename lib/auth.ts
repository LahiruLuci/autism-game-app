import { supabase } from "./supabase";

export type AuthErrorCode =
  | "email_rate_limit"
  | "email_already_registered"
  | "register_failed"
  | "parent_profile_forbidden"
  | "parent_profile_failed"
  | "login_failed";

export class AppAuthError extends Error {
  code: AuthErrorCode;

  constructor(code: AuthErrorCode) {
    super(code);
    this.name = "AppAuthError";
    this.code = code;
  }
}

type RegisterParentInput = {
  fullName: string;
  email: string;
  password: string;
};

type LoginParentInput = {
  email: string;
  password: string;
};

export async function registerParent({
  fullName,
  email,
  password,
}: RegisterParentInput) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !data.user) {
    const message = error?.message.toLowerCase() ?? "";

    if (error) {
      console.error("Supabase signup error:", {
        message: error.message,
        name: error.name,
        status: error.status,
      });
    }

    if (message.includes("rate limit")) {
      throw new AppAuthError("email_rate_limit");
    }

    if (
      message.includes("already registered") ||
      message.includes("already exists") ||
      message.includes("user already")
    ) {
      throw new AppAuthError("email_already_registered");
    }

    throw new AppAuthError("register_failed");
  }

  const { error: sessionError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (sessionError) {
    throw new AppAuthError("register_failed");
  }

  const { error: profileError } = await supabase.from("parents").insert({
    id: data.user.id,
    full_name: fullName,
    email,
  });

  if (profileError) {
    console.error("Supabase parent profile insert error:", {
      code: profileError.code,
      details: profileError.details,
      hint: profileError.hint,
      message: profileError.message,
    });

    if (profileError.code === "42501") {
      throw new AppAuthError("parent_profile_forbidden");
    }

    throw new AppAuthError("parent_profile_failed");
  }

  return data.user;
}

export async function loginParent({ email, password }: LoginParentInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    throw new AppAuthError("login_failed");
  }

  return data.user;
}
