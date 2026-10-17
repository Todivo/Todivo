import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/apis/posts";

export function useDeletePost(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      // 삭제된 글이 목록에 남지 않도록 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
