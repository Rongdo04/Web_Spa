// components/ui/Tooltip.jsx
import React, { useState, useRef, useEffect } from "react";

const Tooltip = ({
  children,
  content,
  placement = "top",
  delay = 200,
  disabled = false,
  className = "",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  const placementClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    "top-start": "bottom-full left-0 mb-2",
    "top-end": "bottom-full right-0 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    "bottom-start": "top-full left-0 mt-2",
    "bottom-end": "top-full right-0 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    "left-start": "right-full top-0 mr-2",
    "left-end": "right-full bottom-0 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
    "right-start": "left-full top-0 ml-2",
    "right-end": "left-full bottom-0 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-t-neutral-900 dark:border-t-neutral-100",
    "top-start":
      "top-full left-4 border-t-neutral-900 dark:border-t-neutral-100",
    "top-end":
      "top-full right-4 border-t-neutral-900 dark:border-t-neutral-100",
    bottom:
      "bottom-full left-1/2 transform -translate-x-1/2 border-b-neutral-900 dark:border-b-neutral-100",
    "bottom-start":
      "bottom-full left-4 border-b-neutral-900 dark:border-b-neutral-100",
    "bottom-end":
      "bottom-full right-4 border-b-neutral-900 dark:border-b-neutral-100",
    left: "left-full top-1/2 transform -translate-y-1/2 border-l-neutral-900 dark:border-l-neutral-100",
    "left-start":
      "left-full top-4 border-l-neutral-900 dark:border-l-neutral-100",
    "left-end":
      "left-full bottom-4 border-l-neutral-900 dark:border-l-neutral-100",
    right:
      "right-full top-1/2 transform -translate-y-1/2 border-r-neutral-900 dark:border-r-neutral-100",
    "right-start":
      "right-full top-4 border-r-neutral-900 dark:border-r-neutral-100",
    "right-end":
      "right-full bottom-4 border-r-neutral-900 dark:border-r-neutral-100",
  };

  const showTooltip = () => {
    if (disabled) return;

    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div
      className={`relative inline-block ${className}`}
      ref={tooltipRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      {...props}
    >
      <div ref={triggerRef}>{children}</div>

      {isVisible && content && (
        <div
          className={`absolute z-50 px-3 py-2 text-sm text-white dark:text-neutral-900 bg-neutral-900 dark:bg-neutral-100 rounded-lg shadow-lg whitespace-nowrap ${placementClasses[placement]}`}
        >
          {content}
          {/* Arrow */}
          <div
            className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[placement]}`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
