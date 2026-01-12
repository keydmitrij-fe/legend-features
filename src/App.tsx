import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import TodoListPage from "./pages/TodoListPage/TodoListPage"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import { Route, Routes, Navigate } from "react-router-dom"
import MainLayout from "./layouts/MainLayout/MainLayout"
import AuthLayout from "./layouts/AuthLayout/AuthLayout"
import AuthGuard from "./components/AuthGuard/AuthGuard"
import UsersPage from "./pages/UsersPage/UsersPage"
import UserEditPage from "./pages/UserEditPage/UserEditPage"
import ForecastPage from "./pages/ForecastPage/ForecastPage"

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route
        path="/"
        element={
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        }
      >
        <Route index element={<TodoListPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="forecast" element={<ForecastPage />} />
        <Route path="users/:userId/edit" element={<UserEditPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
