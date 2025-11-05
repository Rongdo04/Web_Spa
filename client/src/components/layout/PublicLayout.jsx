// components/layout/PublicLayout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const PublicLayout = ({ children, className = "", ...props }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-200">
      <Header />

      {/* Main Content */}
      <main className={`flex-1 ${className}`} {...props}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
