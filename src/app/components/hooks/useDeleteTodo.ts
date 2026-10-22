import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTodo } from "@/apis/todos";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      // 목록, 검색 결과, 진행도 모두 새로고침
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
