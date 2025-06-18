export default async function loginAPI(params) {
  try {
    const response = await fetch(
      `/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params),
        credentials: "include" // Ensure cookies are sent with the request
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
