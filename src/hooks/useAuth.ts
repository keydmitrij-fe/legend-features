import { signin, refreshToken, logout, getProfile } from "../api/auth"
import {
  setTokens,
  outTokens,
  setAuthenticated,
  setUserProfile,
} from "../store/slices/authSlice"
import { useDispatch } from "react-redux"
import { AuthData } from "../types/auth"
import { useAppSelector } from "../store/store"
import { tokenManager } from "../utils/tokenManager"

export const useAuth = () => {
  const dispatch = useDispatch()
  const auth = useAppSelector((state) => state.auth)

  const login = async (values: AuthData) => {
    const tokens = await signin(values)

    tokenManager.setAccessToken(tokens.accessToken)
    localStorage.setItem("refreshToken", tokens.refreshToken)

    dispatch(setTokens({ refreshToken: tokens.refreshToken }))
    dispatch(setAuthenticated(true))
  }

  const refresh = async () => {
    const refreshTokenValue = localStorage.getItem("refreshToken")
    if (!refreshTokenValue) {
      throw new Error("No refresh token")
    }

    const newTokens = await refreshToken({ refreshToken: refreshTokenValue })

    tokenManager.setAccessToken(newTokens.accessToken)
    localStorage.setItem("refreshToken", newTokens.refreshToken)

    dispatch(setTokens({ refreshToken: newTokens.refreshToken }))
    dispatch(setAuthenticated(true))

    return newTokens.accessToken
  }

  const profile = async () => {
    const userProfile = await getProfile()
    dispatch(setUserProfile(userProfile))

    return userProfile
  }

  const exit = async () => {
    await logout()

    tokenManager.clearAccessToken()
    localStorage.removeItem("refreshToken")

    dispatch(outTokens())
    dispatch(setAuthenticated(false))
    dispatch(setUserProfile(null))
  }

  return {
    accessToken: tokenManager.getAccessToken(),
    refreshToken: auth.refreshToken,
    isAuthenticated: auth.isAuthenticated,
    userProfile: auth.userProfile,
    profile,
    login,
    refresh,
    exit,
  }
}
