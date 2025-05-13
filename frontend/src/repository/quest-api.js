// Quest API utility for CRUD operations
const API_URL = import.meta.env.VITE_API_URL || "";

export async function fetchQuests() {
  const res = await fetch(`/api/quest/?all=true`, {
    credentials: "include", // <-- Add this line
  });
  if (!res.ok) throw new Error("Failed to fetch quests");
  return res.json();
}

export async function createQuest(formData) {
  const res = await fetch(`${API_URL}/api/quest/create`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateQuest(id, formData) {
  const res = await fetch(`${API_URL}/api/quest/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteQuest(id) {
  const res = await fetch(`${API_URL}/api/quest/${id}`, {
    method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function toggleQuestPublish(id) {
  const res = await fetch(`${API_URL}/api/quest/${id}/publish`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
