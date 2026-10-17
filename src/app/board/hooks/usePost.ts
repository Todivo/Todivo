import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/apis/posts";

export function usePost(postId: number) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
    // 조회할 때마다 조회수가 1 올라가므로 창 포커스·네트워크 재연결로 다시 요청하지 않음
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
