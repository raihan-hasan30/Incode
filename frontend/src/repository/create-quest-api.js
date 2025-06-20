export default async function createQuestAPI(params) {
  try {
    const response = await fetch(
      `/api/quest/create`,
      {
        method: "POST",
        body: params, 
        credentials: "include"
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
