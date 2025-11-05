// components/ui/EmptyState.jsx
import React from "react";
import Button from "./Button";

const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-neutral-400 dark:text-neutral-600">
          {icon}
        </div>
      )}

      {title && (
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm">
          {description}
        </p>
      )}

      {action && <div>{action}</div>}
    </div>
  );
};

// Pre-built empty state components
const EmptySearch = ({ onClear, className = "", ...props }) => (
  <EmptyState
    icon={
      <svg
        className="w-16 h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    }
    title="No results found"
    description="Try adjusting your search or filter to find what you're looking for."
    action={
      onClear && (
        <Button variant="outline" onClick={onClear}>
          Clear filters
        </Button>
      )
    }
    className={className}
    {...props}
  />
);

const EmptyData = ({ onCreate, className = "", ...props }) => (
  <EmptyState
    icon={
      <svg
        className="w-16 h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    }
    title="No data available"
    description="Get started by creating your first item."
    action={onCreate && <Button onClick={onCreate}>Create new item</Button>}
    className={className}
    {...props}
  />
);

const EmptyError = ({ onRetry, className = "", ...props }) => (
  <EmptyState
    icon={
      <svg
        className="w-16 h-16 text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    }
    title="Something went wrong"
    description="We encountered an error while loading your data. Please try again."
    action={onRetry && <Button onClick={onRetry}>Try again</Button>}
    className={className}
    {...props}
  />
);

EmptyState.Search = EmptySearch;
EmptyState.Data = EmptyData;
EmptyState.Error = EmptyError;

export default EmptyState;
