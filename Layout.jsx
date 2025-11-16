// src/components/layout/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="layout-root">
      <Sidebar />
      <div className="layout-main">
        <Topbar />
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
}
