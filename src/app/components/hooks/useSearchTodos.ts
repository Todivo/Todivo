import { useQuery } from "@tanstack/react-query";

import { getTodos } from "@/apis/todos";

export function useSearchTodos(keyword: string) {
  return useQuery({
    queryKey: ["todos", "search", keyword],
    queryFn: () => getTodos({ keyword }),
    enabled: keyword.length > 0,
  });
}
