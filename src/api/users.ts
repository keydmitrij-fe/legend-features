import {
  MetaResponse,
  User,
  UserFilters,
  UserRequest,
  UserRolesRequest,
  Roles,
} from "../types/users"
import { apiInstance } from "./instance"

export async function getUsers(
  params: UserFilters = {}
): Promise<MetaResponse<User>> {
  const response = await apiInstance.get("/admin/users", { params })
  return response.data
}

export async function getUserById(id: number): Promise<User> {
  const response = await apiInstance.get(`/admin/users/${id}`)
  return response.data
}

export async function updateUserRights(
  id: number,
  roles: Roles[]
): Promise<User> {
  const response = await apiInstance.post(`/admin/users/${id}/rights`, {
    roles,
  })
  return response.data
}

export async function updateUser(
  id: number,
  username?: string,
  email?: string,
  phoneNumber?: string
): Promise<UserRequest> {
  const response = await apiInstance.put(`/admin/users/${id}`, {
    username,
    email,
    phoneNumber,
  })
  return response.data
}

export async function blockUser(id: number): Promise<User> {
  const response = await apiInstance.post(`/admin/users/${id}/block`)
  return response.data
}

export async function unblockUser(id: number): Promise<User> {
  const response = await apiInstance.post(`/admin/users/${id}/unblock`)
  return response.data
}

export async function deleteUser(id: number): Promise<void> {
  const response = await apiInstance.delete(`/admin/users/${id}`)
  return response.data
}
