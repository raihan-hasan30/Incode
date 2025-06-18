export default async function getUsersApi() {
  try {
    // params should be a FormData object
    const response = await fetch(`/api/users`, {
      credentials: "include", // <-- Add this line
    })

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
