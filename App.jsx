// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inbox from "./pages/Inbox";
import Sent from "./pages/Sent";
import Analytics from "./pages/Analytics";
import EmailDetail from "./components/email/EmailDetail";
import NotFound from "./pages/NotFound";
import { QueryProvider } from "./context/QueryContext";
import "./styles/layout.css";
import "./styles/inbox.css";
import "./styles/email.css";

export default function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Inbox /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/query/:id" element={<Layout><EmailDetail /></Layout>} />
          <Route path="/sent" element={<Layout><Sent /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  );
}
