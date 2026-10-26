import { useQuery } from "@tanstack/react-query";

import { getTodos } from "@/apis/todos";

export function useTodos(limit = 4) {
  return useQuery({
    queryKey: ["todos", "list", limit],
    queryFn: () => getTodos({ limit }),
  });
}
