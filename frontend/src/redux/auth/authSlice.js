import { createSlice } from "@reduxjs/toolkit"

const initialAuth = {
}
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    setAuth: (state, action) => {
      state = action.payload
      return state
    },
    clearAuth: (state) => {
      state = initialAuth
      return state
    },
  }
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer
