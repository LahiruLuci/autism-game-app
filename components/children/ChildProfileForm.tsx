"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createChildForCurrentParent } from "@/lib/children";
import type { GenderOption } from "@/types/child";

const genderOptions: GenderOption[] = [
  "",
  "Male",
  "Female",
  "Prefer not to say",
];

export function ChildProfileForm() {
  const router = useRouter();
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<GenderOption>("");
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const trimmedName = childName.trim();
    const parsedAge = Number(age);

    if (!trimmedName || !age) {
      setErrorMessage("Child name and age are required.");
      return;
    }

    if (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 18) {
      setErrorMessage("Age must be between 1 and 18.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createChildForCurrentParent({
        childName: trimmedName,
        age: parsedAge,
        gender,
        notes: notes.trim(),
      });
      toast.success("Child profile saved.");
      router.push("/children");
      router.refresh();
    } catch {
      const message = "We could not save the child profile.";
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
        {errorMessage ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
            role="alert"
          >
            {errorMessage}
          </div>
        ) : null}

        <Input
          autoComplete="off"
          label="Child name"
          name="childName"
          onChange={(event) => setChildName(event.target.value)}
          placeholder="Child name"
          type="text"
          value={childName}
        />

        <Input
          inputMode="numeric"
          label="Age"
          max={18}
          min={1}
          name="age"
          onChange={(event) => setAge(event.target.value)}
          placeholder="Age"
          type="number"
          value={age}
        />

        <label className="block" htmlFor="gender">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Gender
          </span>
          <select
            className="min-h-12 w-full rounded-2xl border border-border-soft bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-primary-blue focus:ring-4 focus:ring-blue-100"
            id="gender"
            name="gender"
            onChange={(event) => setGender(event.target.value as GenderOption)}
            value={gender}
          >
            {genderOptions.map((option) => (
              <option key={option || "empty"} value={option}>
                {option || "Select gender"}
              </option>
            ))}
          </select>
        </label>

        <label className="block" htmlFor="notes">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Notes
          </span>
          <textarea
            className="min-h-32 w-full rounded-2xl border border-border-soft bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-primary-blue focus:ring-4 focus:ring-blue-100"
            id="notes"
            name="notes"
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Optional notes for parents"
            value={notes}
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            isLoading={isSubmitting}
            loadingText="Saving child profile..."
            type="submit"
          >
            Save Child Profile
          </Button>
          <Link
            className="button-secondary inline-flex min-h-12 w-full items-center justify-center"
            href="/children"
          >
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
