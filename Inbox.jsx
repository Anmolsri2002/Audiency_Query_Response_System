// src/pages/Inbox.jsx
import React, { useState } from "react";
import { useQueryContext } from "../context/QueryContext";
import EmailList from "../components/inbox/EmailList";

export default function Inbox() {
  const { queries, loading } = useQueryContext();

  // default category "all"
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = queries.filter(q =>
    selectedCategory === "all" ? true : q.tags.includes(selectedCategory)
  );

  return (
    <div>
      <h1 className="page-title">Inbox</h1>

      {/* EmailList ko filtered mails bhej rahe hain */}
      <EmailList mails={filtered} loading={loading} />

      {/* SAMPLE cards display with map */}
      <div>
        {filtered.map((q) => (
          <div key={q.id} className="email-card">
            <b>{q.sender}</b>
            <span>{q.subject}</span>
            <p>{q.message.slice(0, 50)}...</p>
            <span className={`priority ${q.priority}`}>{q.priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
