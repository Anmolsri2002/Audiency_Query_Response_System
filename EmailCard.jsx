// src/components/inbox/EmailCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import TagBadge from "../common/TagBadge";
import { formatTime } from "../../utils/formatter";

export default function EmailCard({ mail }) {
  return (
    <Link to={`/query/${mail._id}`} className="email-card">
      <div className="email-card-left">
        <div className="sender">{mail.sender}</div>
        <div className="subject">{mail.subject}</div>
        <div className="preview">{(mail.message || "").slice(0, 100)}</div>
        <div className="tags">
          {(mail.tags || []).map((t) => <TagBadge key={t} text={t} />)}
        </div>
      </div>

      <div className="email-card-right">
        <div className={`priority ${mail.priority || "medium"}`}>{mail.priority}</div>
        <div className="time">{formatTime(mail.createdAt)}</div>
      </div>
    </Link>
  );
}
