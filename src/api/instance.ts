import axios, { AxiosInstance } from "axios"

export const apiInstance: AxiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})
