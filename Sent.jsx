import React, { useEffect, useState } from "react";

export default function Sent() {
  const [sentMails, setSentMails] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sentMails")) || [];
    setSentMails(stored);
  }, []);

  return (
    <div className="sent-page">
      <h2>Sent Mails</h2>

      {sentMails.length === 0 ? (
        <p>No sent mails yet.</p>
      ) : (
        <ul className="email-list">
          {sentMails.map(mail => (
            <li key={mail._id} className="email-item">
              <h4>{mail.subject}</h4>
              <p>{mail.message}</p>
              <small>Replied At: {new Date(mail.updatedAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
