// src/context/UIContext.jsx
import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState(null); // currently selected email
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <UIContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        selectedQuery,
        setSelectedQuery,
        loading,
        setLoading,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
