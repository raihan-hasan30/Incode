// Lesson API utility for CRUD operations
const API_URL = import.meta.env.VITE_API_URL || "";

export async function fetchLessons(questId) {
  const res = await fetch(`${API_URL}/api/lesson/${questId}`);
  if (!res.ok) throw new Error("Failed to fetch lessons");
  return res.json();
}

export async function createLesson(questId, data, token) {
  const res = await fetch(`${API_URL}/api/lesson/${questId}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    credentials: "include"
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateLesson(questId, lessonId, data, token) {
  const res = await fetch(`${API_URL}/api/lesson/${questId}/${lessonId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    credentials: "include"
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteLesson(questId, lessonId, token) {
  const res = await fetch(`${API_URL}/api/lesson/${questId}/${lessonId}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: "include"
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
