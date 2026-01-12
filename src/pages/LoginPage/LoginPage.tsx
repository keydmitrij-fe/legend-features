import { useNavigate, Link } from "react-router-dom"
import { AuthData } from "../../types/auth"
import { Button, Form, Input, Typography, message, Spin } from "antd"
import { useAuth } from "../../hooks/useAuth"
import "./LoginPage.scss"
import { useState } from "react"

const { Title, Text } = Typography

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const [messageApi, contextHolder] = message.useMessage()

  const errorAlert = () => {
    messageApi.open({
      type: "error",
      content: "Invalid username or password!",
    })
  }

  const handleSubmit = async (values: AuthData) => {
    setLoading(true)
    try {
      await login(values)
      navigate("/", { replace: true })
    } catch (error) {
      errorAlert()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {contextHolder}
      <Spin spinning={loading} tip="Signing in..." size="large">
        <Title level={3} className="login-page_title">
          Sign In
        </Title>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: false }}
          onFinish={handleSubmit}
          className="login-page__form"
          labelCol={{ span: 5 }}
          disabled={loading}
        >
          <Form.Item<AuthData>
            label="Login"
            name="login"
            rules={[{ required: true, message: "Please input your login!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<AuthData>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
          Not registered yet? <Link to="/register">Create an account.</Link>
        </Text>
      </Spin>
    </div>
  )
}

export default LoginPage
