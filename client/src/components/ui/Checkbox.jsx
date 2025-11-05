// components/ui/Checkbox.jsx
import React, { forwardRef } from "react";

const Checkbox = forwardRef(
  (
    {
      label,
      error,
      helperText,
      className = "",
      checked = false,
      onChange,
      disabled = false,
      required = false,
      indeterminate = false,
      size = "md",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const iconSizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    return (
      <div className={`flex items-start ${className}`}>
        <div className="flex items-center h-5">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              className={`${sizeClasses[size]} text-brand-600 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 rounded focus:ring-brand-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              required={required}
              {...props}
            />
            {(checked || indeterminate) && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {indeterminate ? (
                  <svg
                    className={`${iconSizeClasses[size]} text-white`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className={`${iconSizeClasses[size]} text-white`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="ml-3 text-sm">
          {label && (
            <label className="font-medium text-neutral-700 dark:text-neutral-300">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
          {helperText && !error && (
            <p className="text-neutral-500 dark:text-neutral-400">
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
