import { TodoItem } from "../TodoItem/TodoItem"
import { Todo } from "../../types/todo"

interface TodoListProps {
  todo: Todo[]
  fetchTodos: () => Promise<void>
}

export const TodoList = ({ todo, fetchTodos }: TodoListProps) => {
  return (
    <ul>
      {todo.map((item) => (
        <TodoItem
          id={item.id}
          checked={item.isDone}
          title={item.title}
          fetchTodos={fetchTodos}
          key={item.id}
        />
      ))}
    </ul>
  )
}
