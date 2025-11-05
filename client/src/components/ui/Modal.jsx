// components/ui/Modal.jsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
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

  const sizeClasses = {
    sm: "max-w-md",
    small: "max-w-md",
    md: "max-w-lg",
    medium: "max-w-lg",
    lg: "max-w-2xl",
    large: "max-w-4xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-neutral-900 rounded-lg shadow-large w-full max-h-[90vh] flex flex-col ${sizeClasses[size]} ${className}`}
        {...domProps}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 flex-shrink-0">
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

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const ModalHeader = ({ children, className = "", ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const ModalTitle = ({ children, className = "", ...props }) => (
  <h2
    className={`text-xl font-semibold text-neutral-900 dark:text-neutral-100 ${className}`}
    {...props}
  >
    {children}
  </h2>
);

const ModalDescription = ({ children, className = "", ...props }) => (
  <p
    className={`text-neutral-600 dark:text-neutral-400 ${className}`}
    {...props}
  >
    {children}
  </p>
);

const ModalContent = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const ModalFooter = ({ children, className = "", ...props }) => (
  <div
    className={`flex justify-end gap-3 mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 ${className}`}
    {...props}
  >
    {children}
  </div>
);

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
