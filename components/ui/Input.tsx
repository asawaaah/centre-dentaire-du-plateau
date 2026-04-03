import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 rounded-lg bg-[var(--color-surface-container-lowest)] font-sans text-[var(--color-on-surface)] transition-all duration-300 outline-none border border-transparent focus:border-[var(--color-primary)] focus:border-opacity-40 focus:ring-0 focus:shadow-[var(--shadow-ambient)] placeholder-[var(--color-outline-variant)] ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
