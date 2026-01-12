import { Button, Form, Input, message, Spin, Typography } from "antd"
import { signup } from "../../api/auth"
import { UserRegistration } from "../../types/auth"
import { Link, useNavigate } from "react-router-dom"
import "./RegisterPage.scss"
import { useState } from "react"
import { CheckCircleOutlined } from "@ant-design/icons"

const VALIDATION_RULES = {
  USERNAME_MIN_LENGTH: 1,
  USERNAME_MAX_LENGTH: 64,
  LOGIN_MIN_LENGTH: 2,
  LOGIN_MAX_LENGTH: 64,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 64,
}

const ERROR_MESSAGES = {
  USERNAME_MIN_MAX_LENGTH: "User name must be between 1 and 60 characters",
  LOGIN_MIN_MAX_LENGTH: "Login must be between 2 and 60 characters",
  PASSWORD_MIN_MAX_LENGTH: "Password must be between 6 and 60 characters",
  HTTP_ERROR: "HTTP error! Restart your browser.",
}

const { Title, Text } = Typography

const RegisterPage = () => {
  const [isSuccessfulLogin, setIsSuccessfulLogin] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [messageApi, contextHolder] = message.useMessage()

  const errorAlert = () => {
    messageApi.open({
      type: "error",
      content: "The user already exists!",
    })
  }

  const handleSubmit = async (values: UserRegistration) => {
    setLoading(true)
    try {
      await signup(values)
      setIsSuccessfulLogin(true)
    } catch (error) {
      errorAlert()
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = () => {
    navigate("/login", { replace: true })
  }

  return (
    <div className="register-page">
      {contextHolder}
      <Spin spinning={loading} tip="Creating account..." size="large">
        <Title level={3} className="register-page_title">
          Sign Up
        </Title>
        {!isSuccessfulLogin ? (
          <>
            <Form
              name="basic"
              form={form}
              labelCol={{ span: 7 }}
              style={{ maxWidth: 600 }}
              onFinish={handleSubmit}
              autoComplete="off"
              className="register-page_form"
              disabled={loading}
            >
              <Form.Item<UserRegistration>
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
                <Input />
              </Form.Item>

              <Form.Item<UserRegistration>
                label="Login"
                name="login"
                rules={[
                  { required: true, message: "Please input your login!" },
                  {
                    min: VALIDATION_RULES.LOGIN_MIN_LENGTH,
                    max: VALIDATION_RULES.LOGIN_MAX_LENGTH,
                    message: ERROR_MESSAGES.LOGIN_MIN_MAX_LENGTH,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<UserRegistration>
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
                <Input />
              </Form.Item>

              <Form.Item<UserRegistration>
                label="Phone number"
                name="phoneNumber"
                rules={[
                  {
                    pattern: /^\+\d{11}$/,
                    message: "Phone must start with + and have 11 digits",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<UserRegistration>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: VALIDATION_RULES.PASSWORD_MIN_LENGTH,
                    max: VALIDATION_RULES.PASSWORD_MAX_LENGTH,
                    message: ERROR_MESSAGES.PASSWORD_MIN_MAX_LENGTH,
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      )
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 0,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>

            <Text>
              Have an account? <Link to="/login">Log in.</Link>
            </Text>
          </>
        ) : (
          <div className="successful-wrapper">
            <CheckCircleOutlined />
            <Text className="successful-text">
              Registration successful! Please log in.
            </Text>
            <Button type="default" htmlType="button" onClick={handleConfirm}>
              Ok
            </Button>
          </div>
        )}
      </Spin>
    </div>
  )
}

export default RegisterPage
