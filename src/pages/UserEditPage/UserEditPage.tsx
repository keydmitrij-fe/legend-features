import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Form, Input, Button } from "antd"
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons"
import { updateUser, getUserById } from "../../api/users"
import { User, UserRequest } from "../../types/users"
import "./UserEditPage.scss"
import { getChangedFields } from "../../helpers/objectHelpers"

const VALIDATION_RULES = {
  USERNAME_MIN_LENGTH: 1,
  USERNAME_MAX_LENGTH: 64,
}

const ERROR_MESSAGES = {
  USERNAME_MIN_MAX_LENGTH: "User name must be between 1 and 60 characters",
}

const UserEditPage = () => {
  const { userId } = useParams<string>()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [userData, setUserData] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return

      try {
        const user = await getUserById(Number(userId))
        setUserData(user)
        form.setFieldsValue({
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber || "",
        })
      } catch {
        alert("HTTP error! Restart your browser.")
      }
    }

    fetchUserData()
  }, [userId, form])

  const handleUpdateUser = async (values: UserRequest) => {
    if (!userId || !userData) return

    try {
      const updateData = getChangedFields<UserRequest>(values, userData, [
        "username",
        "email",
        "phoneNumber",
      ])

      if (Object.keys(updateData).length === 0) {
        setIsEditing(false)
        return
      }

      await updateUser(
        Number(userId),
        updateData.username,
        updateData.email,
        updateData.phoneNumber
      )

      const updatedUser = await getUserById(Number(userId))
      setUserData(updatedUser)
      setIsEditing(false)
    } catch {
      alert("HTTP error! Restart your browser.")
    }
  }

  const handleEditUser = () => {
    setIsEditing(true)
  }

  const handleCancelEditUser = () => {
    form.setFieldsValue({
      username: userData?.username,
      email: userData?.email,
      phoneNumber: userData?.phoneNumber || "",
    })
    setIsEditing(false)
  }

  const handleBackToUsersPage = () => {
    navigate("/users")
  }

  return (
    <div className="user-edit-page">
      <Form form={form} layout="vertical" onFinish={handleUpdateUser}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            {
              min: VALIDATION_RULES.USERNAME_MIN_LENGTH,
              max: VALIDATION_RULES.USERNAME_MAX_LENGTH,
              message: ERROR_MESSAGES.USERNAME_MIN_MAX_LENGTH,
            },
          ]}
        >
          <Input readOnly={!isEditing} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input readOnly={!isEditing} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              pattern: /^\+\d{11}$/,
              message: "Phone must start with + and have 11 digits",
            },
          ]}
        >
          <Input readOnly={!isEditing} />
        </Form.Item>

        <Form.Item>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBackToUsersPage}>
            Back
          </Button>
          {!isEditing ? (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEditUser}
            >
              Edit
            </Button>
          ) : (
            <>
              <Button onClick={handleCancelEditUser} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default UserEditPage
