import { createSlice } from "@reduxjs/toolkit"
import { AuthState } from "../../types/auth"

const initialState: AuthState = {
  userProfile: null,
  isAuthenticated: false,
  refreshToken: localStorage.getItem("refreshToken"),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setTokens: (state, action) => {
      state.refreshToken = action.payload.refreshToken
    },
    outTokens: (state) => {
      state.refreshToken = null
    },
  },
})

export const { setUserProfile, setAuthenticated, setTokens, outTokens } =
  authSlice.actions
export default authSlice.reducer
