// src/services/queryService.js
import api from "./api";

export async function getAllQueries() {
  const res = await api.get("/queries");
  return res.data;
}

export async function getQueryById(id) {
  const res = await api.get(`/queries/${id}`);
  return res.data;
}

export async function replyToQuery(id, payload) {
  const res = await api.post(`/queries/${id}/reply`, payload);
  return res.data;
}
