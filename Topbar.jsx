// src/components/layout/Topbar.jsx
import React from "react";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <input className="topbar-search" placeholder="Search mails, senders, tags..." />
      </div>

      <div className="topbar-right">
        <button className="btn small">Help</button>
        <div className="avatar">A</div>
      </div>
    </header>
  );
}
