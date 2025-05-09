export default async function createLessonAPI(quest_id, params) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/quest/${quest_id}/lesson`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params),
        // credentials: "include" // Ensure cookies are sent with the request
      }
    )

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}
