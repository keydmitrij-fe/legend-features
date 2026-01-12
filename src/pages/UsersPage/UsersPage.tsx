import { useEffect, useState } from "react"
import { UsersTable } from "../../components/UsersTable/UsersTable"
import "./UsersPage.scss"
import {
  getUsers,
  deleteUser,
  blockUser,
  unblockUser,
  updateUserRights,
} from "../../api/users"
import { Roles, User, UserFilters } from "../../types/users"
import { useAuth } from "../../hooks/useAuth"
import UsersPagination from "../../components/UsersPagination/UsersPagination"
import UsersSearch from "../../components/UsersSearch/UsersSearch"

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [filters, setFilters] = useState<UserFilters>({
    sortBy: "id",
    sortOrder: "asc",
    isBlocked: undefined,
    limit: 20,
    page: 0,
  })

  const { userProfile } = useAuth()
  const userIsAdmin = userProfile?.roles?.includes("ADMIN") || false

  const fetchUsers = async (params: UserFilters = {}): Promise<void> => {
    try {
      const response = await getUsers({
        ...filters,
        ...params,
      })
      setUsers(response.data)
      setTotalUsers(response.meta.totalAmount)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  const handleSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    const newSortParams = {
      ...filters,
      sortBy,
      sortOrder,
      page: 0,
    }

    setFilters(newSortParams)
    fetchUsers(newSortParams)
  }

  const handleBlockedFilterChange = (isBlocked: boolean | undefined) => {
    const newFilters = {
      ...filters,
      isBlocked,
      page: 0,
    }
    setFilters(newFilters)
    fetchUsers(newFilters)
  }

  // Обработчик удаления пользователя
  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId)
      await fetchUsers(filters)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  // Обработчик блокировки пользователя
  const handleBlockUser = async (userId: number) => {
    try {
      await blockUser(userId)
      await fetchUsers(filters)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  // Обработчик разблокировки пользователя
  const handleUnblockUser = async (userId: number) => {
    try {
      await unblockUser(userId)
      await fetchUsers(filters)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  // Обработчик обновления ролей пользователя
  const handleUpdateUserRoles = async (userId: number, newRoles: Roles[]) => {
    try {
      await updateUserRights(userId, newRoles)
      await fetchUsers(filters)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  // Обработчик изменения пагинации
  const handlePaginationChange = (page: number, pageSize: number) => {
    const newFilters = {
      ...filters,
      page: page - 1,
      limit: pageSize,
    }
    setFilters(newFilters)
    fetchUsers(newFilters)
  }

  // Обработчик поиска
  const handleSearchChange = (searchValue: string) => {
    const newFilters = {
      ...filters,
      search: searchValue || undefined,
      page: 0,
    }
    setFilters(newFilters)
    fetchUsers(newFilters)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="users-page">
      <UsersSearch
        onSearchChange={handleSearchChange}
        currentSearch={filters.search}
      />
      <UsersTable
        usersData={users}
        userIsAdminValue={userIsAdmin}
        currentBlockedFilter={filters.isBlocked}
        onSortChange={handleSortChange}
        onBlockedFilterChange={handleBlockedFilterChange}
        onDeleteUser={handleDeleteUser}
        onBlockUser={handleBlockUser}
        onUnblockUser={handleUnblockUser}
        onUpdateUserRoles={handleUpdateUserRoles}
      />
      <UsersPagination
        current={(filters.page || 0) + 1}
        pageSize={filters.limit || 20}
        total={totalUsers}
        onChange={handlePaginationChange}
      />
    </div>
  )
}

export default UsersPage
