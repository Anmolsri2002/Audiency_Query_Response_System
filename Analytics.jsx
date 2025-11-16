// src/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Analytics() {
  const [stats, setStats] = useState({ total: 0, byPriority: {} });

  useEffect(() => {
    (async () => {
      const res = await api.get("/queries");
      const all = res.data;
      const byPriority = all.reduce((acc, q) => { acc[q.priority] = (acc[q.priority] || 0) + 1; return acc; }, {});
      setStats({ total: all.length, byPriority });
    })();
  }, []);

  return (
    <div>
      <h1 className="page-title">Analytics</h1>
      <div className="analytics-grid">
        <div className="card">
          <div className="muted">Total Queries</div>
          <div className="big">{stats.total}</div>
        </div>
        <div className="card">
          <div className="muted">By Priority</div>
          {Object.entries(stats.byPriority).map(([k, v]) => (
            <div className="stat-row" key={k}><div>{k}</div><div>{v}</div></div>
          ))}
        </div>
        <div className="card">
          <div className="muted">Top Tags</div>
          <div className="muted">Coming soon</div>
        </div>
      </div>
    </div>
  );
}
