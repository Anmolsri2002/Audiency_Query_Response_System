// src/components/inbox/EmailList.jsx
import React from "react";
import EmailCard from "./EmailCard";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

export default function EmailList({ mails, loading }) {
  if (loading) return <Loader />;

  if (!mails || mails.length === 0) return <EmptyState message="No messages yet." />;

  return (
    <div className="email-list">
      {mails.filter(m=>m._id).map((m) => (
        <EmailCard key={m._id} mail={m} />
      ))}
    </div>
  );
}
