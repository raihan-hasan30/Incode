export default async function createQuestAPI(params) {
  try {
    // params should be a FormData object
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/quest/create`,
      {
        method: "POST",
        body: params, // FormData
        // Do not set Content-Type header; browser will set it automatically
        // credentials: "include"
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
