import { createSlice } from "@reduxjs/toolkit"

const initialAuth = {
  username: "Raihan",
  email: "raihan@gmail.com"
}
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {}
})

export default authSlice.reducer
// export {} from authSlice.actions
