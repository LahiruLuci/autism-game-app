import { supabase } from "./supabase";

export type AuthErrorCode =
  | "email_rate_limit"
  | "email_already_registered"
  | "email_not_confirmed"
  | "invalid_credentials"
  | "email_provider_disabled"
  | "register_failed"
  | "parent_profile_forbidden"
  | "parent_profile_failed"
  | "auth_connection_failed"
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

function getAuthErrorCode(error: { code?: string; message: string }) {
  const code = error.code ?? "";
  const message = error.message.toLowerCase();

  if (code === "email_not_confirmed" || message.includes("email not confirmed")) {
    return "email_not_confirmed";
  }

  if (code === "invalid_credentials" || message.includes("invalid login credentials")) {
    return "invalid_credentials";
  }

  if (code === "email_provider_disabled") {
    return "email_provider_disabled";
  }

  if (message.includes("failed to fetch") || message.includes("network")) {
    return "auth_connection_failed";
  }

  return null;
}

async function ensureParentProfile({
  id,
  email,
  fullName,
}: {
  id: string;
  email: string;
  fullName: string;
}) {
  const { data: existingParent, error: lookupError } = await supabase
    .from("parents")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (lookupError) {
    console.error("Supabase parent profile lookup error:", {
      code: lookupError.code,
      message: lookupError.message,
    });
    throw new AppAuthError("parent_profile_failed");
  }

  if (existingParent) {
    return;
  }

  const { error: profileError } = await supabase.from("parents").insert({
    id,
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
}

export async function registerParent({
  fullName,
  email,
  password,
}: RegisterParentInput) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
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

  if (!data.session) {
    return {
      user: data.user,
      requiresEmailConfirmation: true,
    };
  }

  await ensureParentProfile({
    id: data.user.id,
    email,
    fullName,
  });

  return {
    user: data.user,
    requiresEmailConfirmation: false,
  };
}

export async function loginParent({ email, password }: LoginParentInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    if (error) {
      console.error("Supabase login error:", {
        code: error.code,
        message: error.message,
        status: error.status,
      });

      const authErrorCode = getAuthErrorCode(error);
      if (authErrorCode) {
        throw new AppAuthError(authErrorCode);
      }
    }

    throw new AppAuthError("login_failed");
  }

  await ensureParentProfile({
    id: data.user.id,
    email: data.user.email ?? email,
    fullName:
      typeof data.user.user_metadata.full_name === "string"
        ? data.user.user_metadata.full_name
        : "Parent",
  });

  return data.user;
}
