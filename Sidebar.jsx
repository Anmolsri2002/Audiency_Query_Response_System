// src/components/layout/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const categories = [
    { label: "Inbox", value: "all" },
    { label: "Questions", value: "question" },
    { label: "Requests", value: "request" },
    { label: "Complaints", value: "complaint" },
    { label: "Urgent", value: "urgent" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">MailBox</div>
        <Link to="/" className="compose">+ Compose</Link>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-link">Inbox</Link>
        <Link to="/analytics" className="nav-link">Analytics</Link>
        <Link to="/sent" className="nav-link">Sent</Link>
        <Link to="/starred" className="nav-link">Starred</Link>
        <Link to="/trash" className="nav-link">Trash</Link>
      </nav>
    </aside>
  );
}
