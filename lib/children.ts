import { supabase } from "./supabase";
import type { ChildProfile, NewChildProfile } from "@/types/child";

export type ParentProfile = {
  id: string;
  full_name: string;
  email: string;
};

export type LatestAssessment = {
  id: string;
  predicted_level?: number | null;
  recommendation?: string | null;
  created_at?: string | null;
};

type ChildProfileRow = Omit<ChildProfile, "notes"> & {
  notes?: string | null;
};

export class ChildProfileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChildProfileError";
  }
}

function normalizeChildProfile(row: ChildProfileRow): ChildProfile {
  return {
    ...row,
    notes: row.notes ?? null,
  };
}

export async function getCurrentParent() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new ChildProfileError("not_authenticated");
  }

  const { data: parent, error: parentError } = await supabase
    .from("parents")
    .select("id, full_name, email")
    .eq("id", user.id)
    .single<ParentProfile>();

  if (parentError || !parent) {
    throw new ChildProfileError("parent_not_found");
  }

  return parent;
}

export async function getChildrenForCurrentParent() {
  const parent = await getCurrentParent();

  const { data, error } = await supabase
    .from("children")
    .select("id, parent_id, child_name, age, gender, created_at")
    .eq("parent_id", parent.id)
    .order("created_at", { ascending: false })
    .returns<ChildProfileRow[]>();

  if (error) {
    console.error("Supabase children load error:", {
      code: error.code,
      details: error.details,
      hint: error.hint,
      message: error.message,
    });
    throw new ChildProfileError("children_load_failed");
  }

  return {
    parent,
    children: (data ?? []).map(normalizeChildProfile),
  };
}

export async function createChildForCurrentParent(input: NewChildProfile) {
  const parent = await getCurrentParent();

  const { data, error } = await supabase
    .from("children")
    .insert({
      id: crypto.randomUUID(),
      parent_id: parent.id,
      child_name: input.childName,
      age: input.age,
      gender: input.gender || null,
    })
    .select("id, parent_id, child_name, age, gender, created_at")
    .single<ChildProfileRow>();

  if (error || !data) {
    if (error) {
      console.error("Supabase child profile insert error:", {
        code: error.code,
        details: error.details,
        hint: error.hint,
        message: error.message,
      });
    }

    throw new ChildProfileError("child_save_failed");
  }

  return normalizeChildProfile(data);
}

export async function getChildForCurrentParent(childId: string) {
  const parent = await getCurrentParent();

  const { data, error } = await supabase
    .from("children")
    .select("id, parent_id, child_name, age, gender, created_at")
    .eq("id", childId)
    .eq("parent_id", parent.id)
    .single<ChildProfileRow>();

  if (error || !data) {
    if (error) {
      console.error("Supabase child profile load error:", {
        code: error.code,
        details: error.details,
        hint: error.hint,
        message: error.message,
      });
    }

    throw new ChildProfileError("child_not_found");
  }

  return {
    parent,
    child: normalizeChildProfile(data),
  };
}

export async function getLatestAssessmentForChild(childId: string) {
  const { data, error } = await supabase
    .from("assessments")
    .select("id, predicted_level, recommendation, created_at")
    .eq("child_id", childId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<LatestAssessment>();

  if (error) {
    return null;
  }

  return data;
}
