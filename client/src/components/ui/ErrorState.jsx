// components/ui/ErrorState.jsx
import React from "react";
import Button from "./Button";

const ErrorState = ({
  title = "Something went wrong",
  description,
  error,
  onRetry,
  onGoBack,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      <div className="mb-4 text-red-400">
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-sm">
          {description}
        </p>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg max-w-md">
          <p className="text-sm text-red-600 dark:text-red-400 font-mono">
            {error}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {onRetry && <Button onClick={onRetry}>Try again</Button>}
        {onGoBack && (
          <Button variant="outline" onClick={onGoBack}>
            Go back
          </Button>
        )}
      </div>
    </div>
  );
};

// Pre-built error state components
const NetworkError = ({ onRetry, className = "", ...props }) => (
  <ErrorState
    title="Network Error"
    description="Unable to connect to the server. Please check your internet connection and try again."
    onRetry={onRetry}
    className={className}
    {...props}
  />
);

const NotFoundError = ({ onGoBack, className = "", ...props }) => (
  <ErrorState
    title="Page Not Found"
    description="The page you're looking for doesn't exist or has been moved."
    onGoBack={onGoBack}
    className={className}
    {...props}
  />
);

const ServerError = ({ onRetry, className = "", ...props }) => (
  <ErrorState
    title="Server Error"
    description="Something went wrong on our end. We're working to fix it."
    onRetry={onRetry}
    className={className}
    {...props}
  />
);

ErrorState.Network = NetworkError;
ErrorState.NotFound = NotFoundError;
ErrorState.Server = ServerError;

export default ErrorState;
