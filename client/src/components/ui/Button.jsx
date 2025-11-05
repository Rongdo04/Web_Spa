// components/ui/Button.jsx
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon = null,
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "btn-brand shadow-brand hover:shadow-lg focus:ring-brand-500 dark:shadow-brand-900/50",
    secondary:
      "bg-neutral-100 hover:bg-neutral-200 text-neutral-800 focus:ring-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:focus:ring-neutral-600",
    outline:
      "border border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white focus:ring-brand-500 dark:border-brand-400 dark:text-brand-400 dark:hover:bg-brand-400 dark:hover:text-white dark:focus:ring-brand-400",
    danger:
      "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-red-200 dark:bg-red-600 dark:hover:bg-red-700 dark:shadow-red-900/50 dark:focus:ring-red-400",
    success:
      "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500 shadow-green-200 dark:bg-green-600 dark:hover:bg-green-700 dark:shadow-green-900/50 dark:focus:ring-green-400",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500 shadow-yellow-200 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:shadow-yellow-900/50 dark:focus:ring-yellow-400",
    ghost:
      "hover:bg-neutral-100 text-neutral-700 focus:ring-neutral-300 dark:hover:bg-neutral-800 dark:text-neutral-300 dark:focus:ring-neutral-600",
    link: "text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline focus:ring-brand-500 dark:text-brand-400 dark:hover:text-brand-300 dark:focus:ring-brand-400",
  };

  const sizes = {
    xs: "px-2 py-1 text-xs h-6",
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-4 py-2 text-sm h-10",
    lg: "px-6 py-3 text-base h-12",
    xl: "px-8 py-4 text-lg h-14",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
