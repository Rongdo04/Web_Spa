// components/ui/Radio.jsx
import React, { forwardRef } from "react";

const Radio = forwardRef(
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
      value,
      name,
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
      sm: "w-2 h-2",
      md: "w-2.5 h-2.5",
      lg: "w-3 h-3",
    };

    return (
      <div className={`flex items-start ${className}`}>
        <div className="flex items-center h-5">
          <div className="relative">
            <input
              ref={ref}
              type="radio"
              className={`${sizeClasses[size]} text-brand-600 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 focus:ring-brand-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              required={required}
              value={value}
              name={name}
              {...props}
            />
            {checked && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className={`${iconSizeClasses[size]} bg-brand-600 rounded-full`}
                />
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

Radio.displayName = "Radio";

// RadioGroup component for managing multiple radio buttons
const RadioGroup = ({
  children,
  value,
  onChange,
  name,
  className = "",
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Radio) {
          return React.cloneElement(child, {
            name,
            checked: child.props.value === value,
            onChange: (e) => onChange(e.target.value),
          });
        }
        return child;
      })}
    </div>
  );
};

Radio.Group = RadioGroup;

export default Radio;
