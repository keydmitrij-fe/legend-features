import {
  MetaResponse,
  Todo,
  TodoInfo,
  ActivTodosStatus,
  TodoRequest,
} from "../types/todo"
import { apiInstance } from "./instance"

export async function getTodos(
  status: ActivTodosStatus = "all"
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await apiInstance.get("/todos", {
    params: { filter: status },
  })
  return response.data
}

export async function addTodos(title: string): Promise<Todo> {
  const response = await apiInstance.post("/todos", {
    title,
    isDone: false,
  })
  return response.data
}

export async function changeTodos(
  id: number,
  { title, isDone }: TodoRequest
): Promise<Todo> {
  const response = await apiInstance.put(`/todos/${id}`, {
    title,
    isDone,
  })
  return response.data
}

export async function deleteTodos(id: number): Promise<string> {
  const response = await apiInstance.delete(`/todos/${id}`)
  return response.data
}
