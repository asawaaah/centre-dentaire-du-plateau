import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-full font-sans font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[var(--shadow-ambient)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-50 tracking-wide";
  
  const variants = {
    primary: "bg-[var(--color-primary)] text-[var(--color-on-primary)]",
    secondary: "bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
