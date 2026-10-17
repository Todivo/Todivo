import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "@/apis/comments";

export function useUpdateComment(postId: number, commentId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      updateComment({ postId, commentId, content }),
    onSuccess: () => {
      // 수정 후 댓글 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
}
