import { useState } from "react"
import {
  Table,
  Button,
  Tag,
  Dropdown,
  Menu,
  Modal,
  Select,
  TableProps,
} from "antd"
import {
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  LockOutlined,
  UnlockOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { User, Roles } from "../../types/users"
import "./UsersTable.scss"

interface UsersTableProps {
  usersData: User[]
  userIsAdminValue: boolean
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void
  onBlockedFilterChange: (isBlocked: boolean | undefined) => void
  currentBlockedFilter?: boolean
  onDeleteUser: (userId: number) => void
  onBlockUser: (userId: number) => void
  onUnblockUser: (userId: number) => void
  onUpdateUserRoles: (userId: number, newRoles: Roles[]) => void
}

const { Option } = Select

export const UsersTable = ({
  usersData,
  userIsAdminValue,
  onSortChange,
  onBlockedFilterChange,
  currentBlockedFilter,
  onDeleteUser,
  onBlockUser,
  onUnblockUser,
  onUpdateUserRoles,
}: UsersTableProps) => {
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [userToBlock, setUserToBlock] = useState<User | null>(null)
  const [userToEditRoles, setUserToEditRoles] = useState<User | null>(null)
  const [selectedRoles, setSelectedRoles] = useState<Roles[]>([])

  const navigate = useNavigate()

  const handleEdit = (user: User) => {
    navigate(`/users/${user.id}/edit`)
  }

  const handleDelete = (user: User) => {
    setUserToDelete(user)
  }

  const handleSortChange: TableProps<User>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    const currentSorter = Array.isArray(sorter) ? sorter[0] : sorter

    if (!currentSorter?.order) {
      onSortChange("id", "asc")
      return
    }

    if (currentSorter.field && typeof currentSorter.field === "string") {
      onSortChange(
        currentSorter.field,
        currentSorter.order === "ascend" ? "asc" : "desc"
      )
    }
  }

  const handleStatusFilterSelect = (info: { key: string }) => {
    const selectedOption = statusFilterOptions.find(
      (option) => option.key === info.key
    )
    if (selectedOption && onBlockedFilterChange) {
      onBlockedFilterChange(selectedOption.value)
    }
  }

  const handleBlockUser = (user: User) => {
    setUserToBlock(user)
  }

  const handleEditRoles = (user: User) => {
    setUserToEditRoles(user)
    setSelectedRoles(user.roles || [])
  }

  // хендлеры модалок
  const handleConfirmBlock = () => {
    if (userToBlock) {
      if (userToBlock.isBlocked) {
        onUnblockUser(userToBlock.id)
      } else {
        onBlockUser(userToBlock.id)
      }
      setUserToBlock(null)
    }
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      onDeleteUser(userToDelete.id)
      setUserToDelete(null)
    }
  }

  const handleConfirmRoleChange = () => {
    if (userToEditRoles) {
      onUpdateUserRoles(userToEditRoles.id, selectedRoles)
      setUserToEditRoles(null)
    }
  }

  const handleCancelModal = () => {
    setUserToDelete(null)
    setUserToBlock(null)
    setUserToEditRoles(null)
  }

  const statusFilterOptions = [
    {
      key: "all",
      label: "All",
      value: undefined,
    },
    {
      key: "active",
      label: "Active",
      value: false,
    },
    {
      key: "blocked",
      label: "Blocked",
      value: true,
    },
  ]

  const statusFilterMenu = (
    <Menu onClick={handleStatusFilterSelect}>
      <Menu.Item key="all">All</Menu.Item>
      <Menu.Item key="active">Active</Menu.Item>
      <Menu.Item key="blocked">Blocked</Menu.Item>
    </Menu>
  )

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Registration date",
      dataIndex: "date",
      key: "date",
      render: (dateString: string) => {
        if (!dateString) return "—"

        try {
          const date = new Date(dateString)
          return date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        } catch (error) {
          return "—"
        }
      },
    },
    {
      title: (
        <>
          <div>
            <span>Status</span>
          </div>
          <Dropdown overlay={statusFilterMenu} trigger={["click"]}>
            <Button
              type={currentBlockedFilter !== undefined ? "primary" : "default"}
              size="small"
              icon={<FilterOutlined />}
            >
              {currentBlockedFilter === undefined && "All"}
              {currentBlockedFilter === false && "Active"}
              {currentBlockedFilter === true && "Blocked"}
            </Button>
          </Dropdown>
        </>
      ),
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (status: boolean) => (
        <Tag color={status === false ? "green" : "red"}>
          {status === false ? "Active" : "Blocked"}
        </Tag>
      ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles: Roles[]) => {
        return roles.map((role: Roles) => (
          <div className="roles">
            <Tag
              color={
                role === Roles.ADMIN
                  ? "red"
                  : role === Roles.MODERATOR
                  ? "blue"
                  : "green"
              }
              key={role}
            >
              {role}
            </Tag>
          </div>
        ))
      },
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber: string) => {
        if (!phoneNumber || phoneNumber.trim() === "") {
          return "—"
        }
        return phoneNumber
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: User) => (
        <div className="actions">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<UserSwitchOutlined />}
            size="small"
            onClick={() => handleEditRoles(record)}
            disabled={!userIsAdminValue}
          />
          <Button
            icon={record.isBlocked ? <UnlockOutlined /> : <LockOutlined />}
            size="small"
            type={record.isBlocked ? "primary" : "default"}
            danger={!record.isBlocked}
            onClick={() => handleBlockUser(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => handleDelete(record)}
            disabled={!userIsAdminValue}
          />
        </div>
      ),
    },
  ]

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={usersData}
        pagination={false}
        size="middle"
        onChange={handleSortChange}
      />

      <Modal
        title="Delete user?"
        open={!!userToDelete}
        onOk={handleConfirmDelete}
        onCancel={handleCancelModal}
        okText="Delete"
        cancelText="Cancel"
        okType="danger"
      >
        {userToDelete && (
          <p>
            Are you sure you want to delete the user{" "}
            <strong>{userToDelete.username}</strong> ({userToDelete.email})?
          </p>
        )}
      </Modal>

      <Modal
        title={userToBlock?.isBlocked ? "Unblock the user?" : "Block the user?"}
        open={!!userToBlock}
        onOk={handleConfirmBlock}
        onCancel={handleCancelModal}
        okText={userToBlock?.isBlocked ? "Unblock" : "Block"}
        cancelText="Cancel"
        okType={userToBlock?.isBlocked ? "default" : "danger"}
      >
        {userToBlock && (
          <p>
            Are you sure you want to{" "}
            {userToBlock.isBlocked ? "unblock" : "block"} the user{" "}
            <strong>{userToBlock.username}</strong> ({userToBlock.email})?
          </p>
        )}
      </Modal>

      <Modal
        title="Change user roles?"
        open={!!userToEditRoles}
        onOk={handleConfirmRoleChange}
        onCancel={handleCancelModal}
        okText="Save"
        cancelText="Cancel"
      >
        {userToEditRoles && (
          <div>
            <p>
              Select the roles for the user{" "}
              <strong>{userToEditRoles.username}</strong>:
            </p>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select Roles"
              value={selectedRoles}
              onChange={setSelectedRoles}
            >
              <Option value={Roles.USER}>USER</Option>
              <Option value={Roles.MODERATOR}>MODERATOR</Option>
              <Option value={Roles.ADMIN}>ADMIN</Option>
            </Select>
          </div>
        )}
      </Modal>
    </>
  )
}
