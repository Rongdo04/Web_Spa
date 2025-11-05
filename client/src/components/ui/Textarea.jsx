// components/ui/Textarea.jsx
import React, { forwardRef } from "react";

const Textarea = forwardRef(
  (
    {
      label,
      error,
      helperText,
      className = "",
      textareaClassName = "",
      required = false,
      disabled = false,
      placeholder,
      value,
      onChange,
      onBlur,
      onFocus,
      rows = 4,
      resize = "vertical",
      maxLength,
      showCount = false,
      ...props
    },
    ref
  ) => {
    const baseTextareaClasses =
      "w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      default:
        "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-brand-500 focus:ring-brand-500",
      error:
        "border-red-500 dark:border-red-400 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-red-500 focus:ring-red-500",
      success:
        "border-green-500 dark:border-green-400 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-green-500 focus:ring-green-500",
    };

    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

    const errorClasses = error
      ? "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500"
      : "";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    const textareaClasses = `${baseTextareaClasses} ${
      error ? variantClasses.error : variantClasses.default
    } ${disabledClasses} ${resizeClasses[resize]} ${textareaClassName}`;

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            className={textareaClasses}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            rows={rows}
            maxLength={maxLength}
            {...props}
          />
        </div>

        {(error || helperText || showCount) && (
          <div className="flex justify-between items-center mt-1">
            <div>
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
              {helperText && !error && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {helperText}
                </p>
              )}
            </div>
            {showCount && maxLength && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {value?.length || 0}/{maxLength}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
