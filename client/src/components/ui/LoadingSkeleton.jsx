// components/ui/LoadingSkeleton.jsx
import React from "react";

const LoadingSkeleton = ({
  className = "",
  variant = "text",
  lines = 1,
  ...props
}) => {
  const baseClasses =
    "animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded";

  const variants = {
    text: "h-4",
    title: "h-6",
    avatar: "w-10 h-10 rounded-full",
    button: "h-10 w-24",
    card: "h-32",
    image: "h-48",
    table: "h-12",
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variants[variant]} ${
              index === lines - 1 ? "w-3/4" : "w-full"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

// Pre-built skeleton components
const SkeletonCard = ({ className = "", ...props }) => (
  <div
    className={`p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg ${className}`}
    {...props}
  >
    <LoadingSkeleton variant="avatar" className="mb-4" />
    <LoadingSkeleton variant="title" className="mb-2" />
    <LoadingSkeleton variant="text" lines={3} />
  </div>
);

const SkeletonTable = ({ rows = 5, columns = 4, className = "", ...props }) => (
  <div className={`space-y-3 ${className}`} {...props}>
    {/* Header */}
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns }).map((_, index) => (
        <LoadingSkeleton key={index} variant="text" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={rowIndex}
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <LoadingSkeleton key={colIndex} variant="text" />
        ))}
      </div>
    ))}
  </div>
);

const SkeletonList = ({ items = 5, className = "", ...props }) => (
  <div className={`space-y-3 ${className}`} {...props}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3">
        <LoadingSkeleton variant="avatar" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton variant="text" />
          <LoadingSkeleton variant="text" className="w-2/3" />
        </div>
      </div>
    ))}
  </div>
);

LoadingSkeleton.Card = SkeletonCard;
LoadingSkeleton.Table = SkeletonTable;
LoadingSkeleton.List = SkeletonList;

export default LoadingSkeleton;
