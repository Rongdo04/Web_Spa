import React from "react";

const Card = ({
  as: As = "div",
  children,
  className = "",
  padding = "md",
  hover = false,
  shadow = "soft",
  variant = "default",
  interactiveCursor = false, // tránh pointer không cần thiết
  ...props
}) => {
  const base =
    "bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 transition-all duration-200 focus-within:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40";

  const paddingMap = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const shadowMap = {
    none: "shadow-none",
    soft: "shadow-soft",
    medium: "shadow-medium",
    large: "shadow-large",
  };

  const hoverCls = hover
    ? "hover:shadow-lg hover:-translate-y-1 focus-within:shadow-lg focus-within:-translate-y-1"
    : "";

  const variantMap = {
    default: "",
    brand:
      "border-emerald-200/60 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/40 dark:to-transparent",
    outline: "border-2 border-emerald-300 dark:border-emerald-700",
  };

  const cursorCls = interactiveCursor ? "cursor-pointer" : "";

  const classes = [
    base,
    paddingMap[padding],
    shadowMap[shadow],
    hoverCls,
    variantMap[variant],
    cursorCls,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <As className={classes} {...props}>
      {children}
    </As>
  );
};

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`mb-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", ...props }) => (
  <h3
    className={`text-lg font-semibold text-neutral-900 dark:text-neutral-100 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({ children, className = "", ...props }) => (
  <p
    className={`text-neutral-600 dark:text-neutral-400 ${className}`}
    {...props}
  >
    {children}
  </p>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = "", ...props }) => (
  <div
    className={`mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 ${className}`}
    {...props}
  >
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
