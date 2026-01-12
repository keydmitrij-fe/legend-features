import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { apiInstance } from "../../api/instance"
import { Spin } from "antd"
import { tokenManager } from "../../utils/tokenManager"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, refreshToken, refresh, exit } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)

  const checkAuth = async () => {
    try {
      await refresh()
    } catch (error) {
      exit()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (refreshToken && !isAuthenticated) {
      checkAuth()
    } else {
      setLoading(false)
    }
  }, [refreshToken, isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) return

    const responseInterceptor = apiInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && isAuthenticated) {
          try {
            const newAccessToken = await refresh()
            error.config.headers.Authorization = `Bearer ${newAccessToken}`
            return apiInstance.request(error.config)
          } catch (refreshError) {
            exit()
          }
        }
        return Promise.reject(error)
      }
    )

    return () => {
      apiInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [isAuthenticated, exit, refresh])

  useEffect(() => {
    const requestInterceptor = apiInstance.interceptors.request.use(
      (config) => {
        const accessToken = tokenManager.getAccessToken()
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    return () => {
      apiInstance.interceptors.request.eject(requestInterceptor)
    }
  }, [])

  if (loading) {
    return <Spin fullscreen size="large" tip="Checking authentication..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default AuthGuard
