// components/ui/Breadcrumbs.jsx
import React from "react";

const Breadcrumbs = ({
  items = [],
  separator = "/",
  className = "",
  ...props
}) => {
  if (items.length === 0) return null;

  return (
    <nav
      className={`flex items-center space-x-1 text-sm ${className}`}
      {...props}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-neutral-400 dark:text-neutral-600 mx-2">
              {separator}
            </span>
          )}
          {item.href ? (
            <a
              href={item.href}
              className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span
              className={`${
                index === items.length - 1
                  ? "text-neutral-900 dark:text-neutral-100 font-medium"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Breadcrumb item component
const BreadcrumbItem = ({ children, href, className = "", ...props }) => {
  if (href) {
    return (
      <a
        href={href}
        className={`text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <span
      className={`text-neutral-600 dark:text-neutral-400 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Breadcrumb separator component
const BreadcrumbSeparator = ({ children = "/", className = "", ...props }) => (
  <span
    className={`text-neutral-400 dark:text-neutral-600 mx-2 ${className}`}
    {...props}
  >
    {children}
  </span>
);

Breadcrumbs.Item = BreadcrumbItem;
Breadcrumbs.Separator = BreadcrumbSeparator;

export default Breadcrumbs;
