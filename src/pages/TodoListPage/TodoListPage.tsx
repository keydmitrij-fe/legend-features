import { useEffect, useState } from "react"
import { getTodos } from "../../api/todos"
import { TodoForm } from "../../components/TodoForm/TodoForm"
import { TodoList } from "../../components/TodosList/TodoList"
import { TodoFilter } from "../../components/TodoFilter/TodoFilter"
import { Todo, TodoInfo, ActivTodosStatus } from "../../types/todo"
import "./TodoListPage.scss"

const TodoListPage = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [valueOfTodosStatus, setValueOfTodosStatus] = useState<TodoInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  })
  const [activTodosStatus, setActivTodosStatus] =
    useState<ActivTodosStatus>("all")

  const fetchTodos = async (status?: ActivTodosStatus): Promise<void> => {
    try {
      const response = await getTodos(status)
      if (response.info) {
        setValueOfTodosStatus({
          all: response.info.all,
          inWork: response.info.inWork,
          completed: response.info.completed,
        })
      }
      setTodos(response.data)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  useEffect(() => {
    const fetchTodosWithInterval = async () => {
      await fetchTodos(activTodosStatus)
    }

    fetchTodosWithInterval()
    const intervalId = setInterval(fetchTodosWithInterval, 5000)

    return () => clearInterval(intervalId)
  }, [activTodosStatus])

  const changeaActivTodosStatus = (status: ActivTodosStatus) => {
    setActivTodosStatus(status)
  }

  return (
    <div className="todo">
      <TodoForm fetchTodos={() => fetchTodos(activTodosStatus)} />
      <TodoFilter
        fetchTodos={fetchTodos}
        valueOfTodosStatus={valueOfTodosStatus}
        activTodosStatus={activTodosStatus}
        changeaActivTodosStatus={changeaActivTodosStatus}
      />
      <TodoList todo={todos} fetchTodos={() => fetchTodos(activTodosStatus)} />
    </div>
  )
}

export default TodoListPage
