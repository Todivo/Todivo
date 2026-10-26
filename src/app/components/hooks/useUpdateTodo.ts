import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTodo } from "@/apis/todos";

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      updateTodo(id, { title }),
    onSuccess: () => {
      // 목록과 검색 결과 모두 새로고침
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
