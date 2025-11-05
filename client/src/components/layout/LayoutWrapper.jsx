// components/layout/LayoutWrapper.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const LayoutWrapper = ({
  children,
  showHeader = true,
  showFooter = true,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-200 ${className}`}
      {...props}
    >
      {showHeader && <Header />}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {showFooter && <Footer />}
    </div>
  );
};

export default LayoutWrapper;
