// components/ui/Tabs.jsx
import React, { useState, createContext, useContext } from "react";

const TabsContext = createContext();

const Tabs = ({
  children,
  defaultValue,
  value,
  onValueChange,
  className = "",
  orientation = "horizontal",
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(value || defaultValue || "");

  const handleTabChange = (newValue) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
    if (!value) {
      setActiveTab(newValue);
    }
  };

  const currentValue = value || activeTab;

  return (
    <TabsContext.Provider
      value={{
        activeTab: currentValue,
        onTabChange: handleTabChange,
        orientation,
      }}
    >
      <div
        className={`${orientation === "vertical" ? "flex" : ""} ${className}`}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className = "", ...props }) => {
  const { orientation } = useContext(TabsContext);

  return (
    <div
      className={`flex ${
        orientation === "vertical" ? "flex-col w-48 mr-4" : "flex-row"
      } bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const TabsTrigger = ({
  value,
  children,
  disabled = false,
  className = "",
  ...props
}) => {
  const { activeTab, onTabChange } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
        isActive
          ? "bg-white dark:bg-neutral-900 text-brand-600 dark:text-brand-400 shadow-sm"
          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={() => !disabled && onTabChange(value)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className = "", ...props }) => {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;

  return (
    <div className={`mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;
