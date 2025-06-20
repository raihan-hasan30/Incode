export default async function validateUser() {
  try {
    const res = await axios.get("/api/auth/me");
    return res
  } catch (err) {
    return null
  }
}
