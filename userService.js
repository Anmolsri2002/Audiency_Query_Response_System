// src/services/userService.js
import api from "./api";

export async function getAllUsers() {
  const res = await api.get("/users");
  return res.data;
}
