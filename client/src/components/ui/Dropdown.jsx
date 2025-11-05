// components/ui/Dropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";

const Dropdown = ({
  trigger,
  children,
  placement = "bottom-start",
  className = "",
  triggerClassName = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const placementClasses = {
    "top-start": "bottom-full left-0 mb-2",
    "top-end": "bottom-full right-0 mb-2",
    "bottom-start": "top-full left-0 mt-2",
    "bottom-end": "top-full right-0 mt-2",
    "left-start": "right-full top-0 mr-2",
    "left-end": "right-full bottom-0 mr-2",
    "right-start": "left-full top-0 ml-2",
    "right-end": "left-full bottom-0 ml-2",
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef} {...props}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        className={triggerClassName}
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute z-50 min-w-[200px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-large ${placementClasses[placement]}`}
        >
          <div className="py-2">{children}</div>
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({
  children,
  onClick,
  disabled = false,
  className = "",
  icon,
  ...props
}) => {
  return (
    <button
      className={`w-full flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </button>
  );
};

const DropdownSeparator = ({ className = "", ...props }) => (
  <div
    className={`border-t border-neutral-200 dark:border-neutral-800 my-1 ${className}`}
    {...props}
  />
);

const DropdownLabel = ({ children, className = "", ...props }) => (
  <div
    className={`px-4 py-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider ${className}`}
    {...props}
  >
    {children}
  </div>
);

Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;
Dropdown.Label = DropdownLabel;

export default Dropdown;
