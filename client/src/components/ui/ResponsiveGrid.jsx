// components/ui/ResponsiveGrid.jsx
import React from "react";

const ResponsiveGrid = ({
  children,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 4,
  className = "",
  ...props
}) => {
  const getGridClasses = () => {
    const baseClasses = "grid";
    const gapClasses = `gap-${gap}`;

    const colClasses = Object.entries(cols)
      .map(([breakpoint, columns]) => {
        const breakpointMap = {
          sm: "sm",
          md: "md",
          lg: "lg",
          xl: "xl",
          "2xl": "2xl",
        };
        return `${breakpointMap[breakpoint]}:grid-cols-${columns}`;
      })
      .join(" ");

    return `${baseClasses} grid-cols-1 ${colClasses} ${gapClasses}`;
  };

  return (
    <div className={`${getGridClasses()} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Pre-built grid components
const CardGrid = ({ children, className = "", ...props }) => (
  <ResponsiveGrid
    cols={{ sm: 1, md: 2, lg: 3, xl: 4 }}
    gap={6}
    className={className}
    {...props}
  >
    {children}
  </ResponsiveGrid>
);

const ProductGrid = ({ children, className = "", ...props }) => (
  <ResponsiveGrid
    cols={{ sm: 2, md: 3, lg: 4, xl: 5 }}
    gap={4}
    className={className}
    {...props}
  >
    {children}
  </ResponsiveGrid>
);

const ImageGrid = ({ children, className = "", ...props }) => (
  <ResponsiveGrid
    cols={{ sm: 2, md: 3, lg: 4, xl: 6 }}
    gap={2}
    className={className}
    {...props}
  >
    {children}
  </ResponsiveGrid>
);

const StatsGrid = ({ children, className = "", ...props }) => (
  <ResponsiveGrid
    cols={{ sm: 1, md: 2, lg: 4 }}
    gap={4}
    className={className}
    {...props}
  >
    {children}
  </ResponsiveGrid>
);

ResponsiveGrid.Card = CardGrid;
ResponsiveGrid.Product = ProductGrid;
ResponsiveGrid.Image = ImageGrid;
ResponsiveGrid.Stats = StatsGrid;

export default ResponsiveGrid;
