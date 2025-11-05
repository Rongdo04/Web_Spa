// components/ui/Sheet.jsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Sheet = ({
  isOpen,
  onClose,
  title,
  children,
  side = "right",
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = "",
  ...props
}) => {
  // Remove isOpen from props to avoid passing it to DOM
  const { isOpen: _, ...domProps } = { isOpen, ...props };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sideClasses = {
    left: "left-0",
    right: "right-0",
    top: "top-0 left-0 right-0",
    bottom: "bottom-0 left-0 right-0",
  };

  const sizeClasses = {
    sm: side === "left" || side === "right" ? "w-80" : "h-80",
    md: side === "left" || side === "right" ? "w-96" : "h-96",
    lg: side === "left" || side === "right" ? "w-1/2" : "h-1/2",
    xl: side === "left" || side === "right" ? "w-2/3" : "h-2/3",
    full: side === "left" || side === "right" ? "w-full" : "h-full",
  };

  const animationClasses = {
    left: "transform transition-transform duration-300 ease-in-out",
    right: "transform transition-transform duration-300 ease-in-out",
    top: "transform transition-transform duration-300 ease-in-out",
    bottom: "transform transition-transform duration-300 ease-in-out",
  };

  const sheetContent = (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Sheet */}
      <div
        className={`relative bg-white dark:bg-neutral-900 shadow-large ${sideClasses[side]} ${sizeClasses[size]} ${animationClasses[side]} ${className}`}
        {...domProps}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
            {title && (
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="ml-auto"
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                }
              />
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );

  return createPortal(sheetContent, document.body);
};

const SheetHeader = ({ children, className = "", ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const SheetTitle = ({ children, className = "", ...props }) => (
  <h2
    className={`text-xl font-semibold text-neutral-900 dark:text-neutral-100 ${className}`}
    {...props}
  >
    {children}
  </h2>
);

const SheetDescription = ({ children, className = "", ...props }) => (
  <p
    className={`text-neutral-600 dark:text-neutral-400 ${className}`}
    {...props}
  >
    {children}
  </p>
);

const SheetContent = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const SheetFooter = ({ children, className = "", ...props }) => (
  <div
    className={`flex justify-end gap-3 mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 ${className}`}
    {...props}
  >
    {children}
  </div>
);

Sheet.Header = SheetHeader;
Sheet.Title = SheetTitle;
Sheet.Description = SheetDescription;
Sheet.Content = SheetContent;
Sheet.Footer = SheetFooter;

export default Sheet;
