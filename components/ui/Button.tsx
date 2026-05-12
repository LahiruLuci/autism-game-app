import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  className,
  disabled,
  isLoading = false,
  loadingText = "Please wait...",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-primary-blue text-white shadow-md shadow-blue-200 hover:bg-blue-500"
      : "border border-border-soft bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50";

  return (
    <button
      className={clsx(
        "inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-60",
        variantClass,
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
