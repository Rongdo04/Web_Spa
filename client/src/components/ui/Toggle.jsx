// components/ui/Toggle.jsx
import React, { forwardRef } from "react";

const Toggle = forwardRef(
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
      size = "md",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: {
        container: "w-8 h-4",
        thumb: "w-3 h-3",
        translate: "translate-x-4",
      },
      md: {
        container: "w-11 h-6",
        thumb: "w-5 h-5",
        translate: "translate-x-5",
      },
      lg: {
        container: "w-14 h-7",
        thumb: "w-6 h-6",
        translate: "translate-x-7",
      },
    };

    const currentSize = sizeClasses[size] || sizeClasses.md;

    return (
      <div className={`flex items-start ${className}`}>
        <div className="flex items-center h-5">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              className="sr-only"
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              required={required}
              {...props}
            />
            <button
              type="button"
              className={`${
                currentSize.container
              } relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                checked
                  ? "bg-brand-600 dark:bg-brand-500"
                  : "bg-neutral-200 dark:bg-neutral-700"
              }`}
              onClick={() => !disabled && onChange(!checked)}
              disabled={disabled}
            >
              <span
                className={`${
                  currentSize.thumb
                } pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                  checked ? currentSize.translate : "translate-x-0"
                }`}
              />
            </button>
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

Toggle.displayName = "Toggle";

export default Toggle;
