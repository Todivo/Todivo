import { fetchWithAuth } from "./fetchWithAuth";

export interface Todo {
  id: number;
  teamId: string;
  userId: number;
  goalId: number | null;
  title: string;
  done: boolean;
  fileUrl: string | null;
  linkUrl: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export interface TodoResponse {
  todos: Todo[];
  nextCursor: number | null;
  totalCount: number;
}

export interface GetTodosParams {
  cursor?: number;
  limit?: number;
  keyword?: string;
  done?: boolean;
}

export async function getTodos({
  cursor,
  limit = 10,
  keyword,
  done,
}: GetTodosParams): Promise<TodoResponse> {
  const params = new URLSearchParams({ limit: String(limit) });

  if (cursor) params.set("cursor", String(cursor));
  if (keyword) params.set("keyword", keyword);
  if (done !== undefined) params.set("done", String(done));

  const response = await fetchWithAuth(`/todos?${params.toString()}`);
  if (!response.ok) throw new Error("할 일 목록을 불러오지 못했습니다.");
  return response.json();
}

export interface CreateTodoBody {
  title: string;
  goalId?: number;
  fileUrl?: string;
  linkUrl?: string;
  dueDate?: string;
  tags?: string[];
}

export async function createTodo(body: CreateTodoBody): Promise<Todo> {
  const response = await fetchWithAuth("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("할 일을 생성하지 못했습니다.");
  return response.json();
}

export interface UpdateTodoBody {
  title?: string;
  done?: boolean;
}

export async function updateTodo(
  todoId: number,
  body: UpdateTodoBody,
): Promise<Todo> {
  const response = await fetchWithAuth(`/todos/${todoId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("할 일을 수정하지 못했습니다.");
  return response.json();
}

export async function deleteTodo(todoId: number): Promise<void> {
  const response = await fetchWithAuth(`/todos/${todoId}`, {
    method: "DELETE",
  });
  // 성공 시 204 No Content라 응답 본문이 없음
  if (!response.ok) throw new Error("할 일을 삭제하지 못했습니다.");
}
