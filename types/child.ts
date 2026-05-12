export type GenderOption = "Male" | "Female" | "Prefer not to say" | "";

export type ChildProfile = {
  id: string;
  parent_id: string;
  child_name: string;
  age: number;
  gender: GenderOption | null;
  notes: string | null;
  created_at: string;
};

export type NewChildProfile = {
  childName: string;
  age: number;
  gender: GenderOption;
  notes: string;
};
