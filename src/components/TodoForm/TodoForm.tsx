import { Form, Input, Button } from "antd"
import { addTodos } from "../../api/todos"
import "./TodoForm.scss"

const VALIDATION_RULES = {
  TITLE_MIN_LENGTH: 2,
  TITLE_MAX_LENGTH: 64,
}

const ERROR_MESSAGES = {
  EMPTY_FIELD: "Поле не может быть пустым!",
  MIN_LENGTH: `Минимум ${VALIDATION_RULES.TITLE_MIN_LENGTH} символа!`,
  MAX_LENGTH: `Максимум ${VALIDATION_RULES.TITLE_MAX_LENGTH} символов!`,
  HTTP_ERROR: "HTTP error! Restart your browser.",
}

interface TodoFormProps {
  fetchTodos: () => Promise<void>
}

export const TodoForm = ({ fetchTodos }: TodoFormProps) => {
  const [form] = Form.useForm()

  const handleSubmit = async (values: { title: string }) => {
    try {
      await addTodos(values.title)
      await fetchTodos()
      form.resetFields()
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  return (
    <Form
      form={form}
      className="todo-form"
      onFinish={handleSubmit}
      initialValues={{ title: "" }}
    >
      <Form.Item
        name="title"
        rules={[
          { required: true, message: ERROR_MESSAGES.EMPTY_FIELD },
          {
            min: VALIDATION_RULES.TITLE_MIN_LENGTH,
            message: ERROR_MESSAGES.MIN_LENGTH,
          },
          {
            max: VALIDATION_RULES.TITLE_MAX_LENGTH,
            message: ERROR_MESSAGES.MAX_LENGTH,
          },
        ]}
        className="todo-form__item"
      >
        <Input placeholder="Write something..." autoFocus />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="button">
          Add ToDo item
        </Button>
      </Form.Item>
    </Form>
  )
}
