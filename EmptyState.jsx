// src/components/common/EmptyState.jsx
import React from "react";

export default function EmptyState({ message = "Nothing to show." }) {
  return (
    <div className="emptystate">
      <div className="empty-illustration">📭</div>
      <div className="empty-message">{message}</div>
    </div>
  );
}
