import { configureStore } from "@reduxjs/toolkit"
import questReducer from "./quest/quest-slice"
import authReducer from "./auth/authSlice"
import leaderReducer from "./learderboard/leaderboard-slice"

export const store = configureStore({
  reducer: {
    quest: questReducer,
    auth: authReducer,
    leaderboard: leaderReducer
  }
})
