import { useInfiniteQuery } from "@tanstack/react-query";

import { getTodos } from "@/apis/todos";

export function useSearchTodos(keyword: string) {
  return useInfiniteQuery({
    queryKey: ["todos", "search", keyword],
    queryFn: ({ pageParam }) => getTodos({ cursor: pageParam, keyword }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: keyword.length > 0,
  });
}
