import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTodo, type CreateTodoBody } from "@/apis/todos";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateTodoBody) => createTodo(body),
    onSuccess: () => {
      // 할 일 목록과 목표 진행도 모두 새로고침
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
}
