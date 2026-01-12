import {
  UserRegistration,
  AuthData,
  RefreshToken,
  Token,
  Profile,
} from "../types/auth"
import { apiInstance } from "./instance"

export async function signup(userData: UserRegistration): Promise<Profile> {
  const response = await apiInstance.post("/auth/signup", userData)
  return response.data
}

export async function signin(credentials: AuthData): Promise<Token> {
  const response = await apiInstance.post("/auth/signin", credentials)
  return response.data
}

export async function refreshToken(token: RefreshToken): Promise<Token> {
  const response = await apiInstance.post("/auth/refresh", token)
  return response.data
}

export async function getProfile(): Promise<Profile> {
  const response = await apiInstance.get("/user/profile")
  return response.data
}

export async function logout(): Promise<void> {
  const response = await apiInstance.post("/user/logout")
  return response.data
}
