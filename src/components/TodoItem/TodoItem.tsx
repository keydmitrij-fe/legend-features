import { useState } from "react"
import { Form, Input, Button, Checkbox } from "antd"
import { changeTodos, deleteTodos } from "../../api/todos"
import "./TodoItem.scss"
import {
  FormOutlined,
  DeleteOutlined,
  CheckOutlined,
  StopOutlined,
} from "@ant-design/icons"

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

interface TodoItemProps {
  id: number
  checked: boolean
  title: string
  fetchTodos: () => Promise<void>
}

export const TodoItem = ({ id, checked, title, fetchTodos }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [form] = Form.useForm()
  const formId = `edit-form-${id}`

  const handleCompleteTodoItem = async () => {
    await changeTodos(id, { isDone: !checked })
    await fetchTodos()
  }

  const handleStartEditing = () => {
    form.setFieldsValue({ title })
    setIsEditing(true)
  }

  const handleSave = async (values: { title: string }) => {
    await changeTodos(id, { title: values.title })
    setIsEditing(false)
    await fetchTodos()
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.resetFields()
  }

  const handleDeleteTodoItem = async () => {
    await deleteTodos(id)
    await fetchTodos()
  }

  return (
    <li className="todo-item">
      <div className="todo-item__checkbox-wrapper">
        <Checkbox checked={checked} onChange={handleCompleteTodoItem} />
      </div>

      {isEditing ? (
        <Form form={form} onFinish={handleSave} id={formId}>
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
            <Input autoFocus />
          </Form.Item>
        </Form>
      ) : (
        <p className={`todo-item__content ${checked ? "completed" : ""}`}>
          {title}
        </p>
      )}

      <div className="todo-item__buttons-wrapper">
        {isEditing ? (
          <>
            <Button htmlType="submit" form={formId} icon={<CheckOutlined />} />
            <Button onClick={handleCancel} icon={<StopOutlined />} />
          </>
        ) : (
          <Button onClick={handleStartEditing} icon={<FormOutlined />} />
        )}
        <Button
          onClick={handleDeleteTodoItem}
          icon={<DeleteOutlined />}
          danger
        />
      </div>
    </li>
  )
}
