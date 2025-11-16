// src/components/email/EmailDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useQueryContext } from "../../context/QueryContext";

export default function EmailDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToSent } = useQueryContext();

  const [mail, setMail] = useState(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await api.get(`/queries/${id}`);
      setMail(res.data);
    })();
  }, [id]);

  const sendReply = async () => {
  if (!reply.trim()) return;
  setSending(true);
  try {
    const res = await api.post(`/queries/${id}/reply`, { message: reply, repliedBy: "Agent" });
    const data = res.data || {};

    // backend may return sent as data.sentMail or data.sent
    const sent = data.sentMail || data.sent || (data.sentMail && data.sentMail._id ? data.sentMail : null);
    const finalSent = sent || (data._id && data.folder === "sent" ? data : null);

    if (finalSent) {
      if (typeof addToSent === "function") {
        addToSent(finalSent);
      } else {
        console.warn("addToSent not available; sent mail:", finalSent);
      }
      navigate("/sent");
    } else {
      // fallback: synthesize local sent item so Sent page shows something
      const synthetic = {
        _id: `local-sent-${Date.now()}`,
        subject: `Re: ${mail?.subject || ""}`,
        sender: "Agent",
        message: reply,
        folder: "sent",
        createdAt: new Date().toISOString(),
      };
      if (typeof addToSent === "function") addToSent(synthetic);
      navigate("/sent");
    }
    setReply("");
  } catch (err) {
    console.error("Reply failed", err);
  } finally {
    setSending(false);
  }
};

  if (!mail) return <div className="loader-inline">Loading...</div>;

  return (
    <div className="email-detail">
      <h2>{mail.subject}</h2>

      <div className="meta">
        <div>From: <strong>{mail.sender}</strong></div>
        <div>Channel: {mail.channel}</div>
        <div>Status: {mail.status}</div>
      </div>

      <div className="message-block">{mail.message}</div>

      <div className="reply-box">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your reply..."
        />
        <div className="reply-actions">
          <button className="btn" onClick={() => setReply("")}>Discard</button>
          <button
            className="btn primary"
            disabled={sending}
            onClick={sendReply}
          >
            {sending ? "Sending..." : "Send Reply"}
          </button>
        </div>
      </div>
    </div>
  );
}
