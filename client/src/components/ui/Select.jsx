// components/ui/Select.jsx
import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  error,
  helperText,
  label,
  required = false,
  className = "",
  size = "md",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef(null);
  const searchRef = useRef(null);

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-3 py-2 text-sm h-10",
    lg: "px-4 py-3 text-base h-12",
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className={`relative w-full ${className}`} ref={selectRef} {...props}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          className={`w-full ${
            sizeClasses[size]
          } text-left border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500"
              : "border-neutral-300 dark:border-neutral-700 focus:border-brand-500 focus:ring-brand-500"
          } bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span
            className={`block truncate ${
              !selectedOption ? "text-neutral-500 dark:text-neutral-400" : ""
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-large max-h-60 overflow-hidden">
            {options.length > 5 && (
              <div className="p-2 border-b border-neutral-200 dark:border-neutral-800">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                />
              </div>
            )}
            <div className="py-1 max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                      value === option.value
                        ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400"
                        : "text-neutral-900 dark:text-neutral-100"
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    <div className="flex items-center">
                      {option.icon && (
                        <span className="mr-3">{option.icon}</span>
                      )}
                      <span>{option.label}</span>
                      {value === option.value && (
                        <svg
                          className="w-4 h-4 ml-auto text-brand-600 dark:text-brand-400"
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
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400">
                  No options found
                </div>
              )}
            </div>
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
};

export default Select;
