// components/ui/Input.jsx
import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      className = "",
      inputClassName = "",
      type = "text",
      required = false,
      disabled = false,
      placeholder,
      value,
      onChange,
      onBlur,
      onFocus,
      icon,
      rightIcon,
      size = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const baseInputClasses =
      "w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed";

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm h-8",
      md: "px-3 py-2 text-sm h-10",
      lg: "px-4 py-3 text-base h-12",
    };

    const variantClasses = {
      default:
        "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-brand-500 focus:ring-brand-500",
      error:
        "border-red-500 dark:border-red-400 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-red-500 focus:ring-red-500",
      success:
        "border-green-500 dark:border-green-400 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-green-500 focus:ring-green-500",
    };

    const errorClasses = error
      ? "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500"
      : "";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    const inputClasses = `${baseInputClasses} ${sizeClasses[size]} ${
      error ? variantClasses.error : variantClasses[variant]
    } ${disabledClasses} ${inputClassName}`;

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-400 dark:text-neutral-500">
                {icon}
              </span>
            </div>
          )}

          <input
            ref={ref}
            type={type}
            className={`${inputClasses} ${icon ? "pl-10" : ""} ${
              rightIcon ? "pr-10" : ""
            }`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {helperText && !error && (
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
