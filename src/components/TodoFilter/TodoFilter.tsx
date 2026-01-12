import { TodoInfo, ActivTodosStatus } from "../../types/todo"
import { Button } from "antd"
import "./TodoFilter.scss"

interface TodoFilterProps {
  activTodosStatus: ActivTodosStatus
  valueOfTodosStatus: TodoInfo
  fetchTodos: (status: ActivTodosStatus) => Promise<void>
  changeaActivTodosStatus: (status: ActivTodosStatus) => void
}

export const TodoFilter = ({
  activTodosStatus,
  valueOfTodosStatus,
  fetchTodos,
  changeaActivTodosStatus,
}: TodoFilterProps) => {
  const handleChangeActivStatus = async (status: ActivTodosStatus) => {
    await changeaActivTodosStatus(status)
    await fetchTodos(status)
  }

  return (
    <div className="todo-filter">
      <Button
        type="default"
        htmlType="button"
        className={`button ${activTodosStatus === "all" ? "active" : ""}`}
        onClick={() => handleChangeActivStatus("all")}
      >
        {`All (${valueOfTodosStatus.all})`}
      </Button>
      <Button
        type="default"
        htmlType="button"
        className={`button ${activTodosStatus === "inWork" ? "active" : ""}`}
        onClick={() => handleChangeActivStatus("inWork")}
      >
        {`In work (${valueOfTodosStatus.inWork})`}
      </Button>
      <Button
        type="default"
        htmlType="button"
        className={`button ${activTodosStatus === "completed" ? "active" : ""}`}
        onClick={() => handleChangeActivStatus("completed")}
      >
        {`Completed (${valueOfTodosStatus.completed})`}
      </Button>
    </div>
  )
}
