// src/context/QueryContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllQueries } from "../services/queryService";
import useSocket from "../hooks/useSocket";

const QueryContext = createContext();

export function QueryProvider({ children }) {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  // sent mails state + helper
  const [sentMails, setSentMails] = useState([]);
  const addToSent = (mail) => {
    if (!mail || !mail._id) return;
    setSentMails((prev) => (prev.some((m) => m._id === mail._id) ? prev : [mail, ...prev]));
  };

  const socket = useSocket();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const all = await getAllQueries();
        const cleaned = (all || []).filter((q) => q && q._id);
        const unique = Array.from(new Map(cleaned.map((q) => [q._id, q])).values());
        setQueries(unique);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("query:created", (q) =>
      setQueries((p) => {
        if (!q || !q._id) return p;
        if (p.some((x) => x._id === q._id)) return p;
        return [q, ...p];
      })
    );
    socket.on("query:updated", (q) => setQueries((p) => p.map((x) => (x._id === q._id ? q : x))));
    socket.on("query:deleted", (d) => setQueries((p) => p.filter((x) => x._id !== d.id)));
    return () => {
      socket.off("query:created");
      socket.off("query:updated");
      socket.off("query:deleted");
    };
  }, [socket]);

  return (
    <QueryContext.Provider value={{ queries, setQueries, loading, sentMails, addToSent }}>
      {children}
    </QueryContext.Provider>
  );
}

export const useQueryContext = () => useContext(QueryContext);
