import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts, GetPostsParams } from "@/apis/posts";

export function usePosts({
  type = "all",
  search,
}: Omit<GetPostsParams, "cursor" | "limit">) {
  return useInfiniteQuery({
    queryKey: ["posts", type, search],
    queryFn: ({ pageParam }) => getPosts({ cursor: pageParam, type, search }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
}
