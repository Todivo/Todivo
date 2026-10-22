import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type TodoResponse, updateTodo } from "@/apis/todos";

export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, done }: { id: number; done: boolean }) =>
      updateTodo(id, { done }),
    // 응답을 기다리지 않고 체크 상태를 먼저 반영
    onMutate: async ({ id, done }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previous = queryClient.getQueriesData<TodoResponse>({
        queryKey: ["todos"],
      });
      queryClient.setQueriesData<TodoResponse>(
        { queryKey: ["todos"] },
        (old) =>
          old
            ? {
                ...old,
                todos: old.todos.map((todo) =>
                  todo.id === id ? { ...todo, done } : todo,
                ),
              }
            : old,
      );
      return { previous };
    },
    onError: (_error, _variables, context) => {
      context?.previous.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
