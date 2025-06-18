export async function saveBattleResult({ quest_id, point, right, wrong }) {
  const response = await fetch('/api/battle-result', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ quest_id, point, right, wrong }),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return await response.json();
}
