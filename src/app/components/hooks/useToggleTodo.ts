import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { type TodoResponse, updateTodo } from "@/apis/todos";

const toggleDone = (page: TodoResponse, id: number, done: boolean) => ({
  ...page,
  todos: page.todos.map((todo) => (todo.id === id ? { ...todo, done } : todo)),
});

export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, done }: { id: number; done: boolean }) =>
      updateTodo(id, { done }),
    // 응답을 기다리지 않고 체크 상태를 먼저 반영
    onMutate: async ({ id, done }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousList = queryClient.getQueriesData<TodoResponse>({
        queryKey: ["todos", "list"],
      });
      const previousSearch = queryClient.getQueriesData<
        InfiniteData<TodoResponse>
      >({ queryKey: ["todos", "search"] });

      queryClient.setQueriesData<TodoResponse>(
        { queryKey: ["todos", "list"] },
        (old) => (old ? toggleDone(old, id, done) : old),
      );
      // 검색 결과는 useInfiniteQuery라 페이지별로 갱신
      queryClient.setQueriesData<InfiniteData<TodoResponse>>(
        { queryKey: ["todos", "search"] },
        (old) =>
          old
            ? {
                ...old,
                pages: old.pages.map((page) => toggleDone(page, id, done)),
              }
            : old,
      );
      return { previous: [...previousList, ...previousSearch] };
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
