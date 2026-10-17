import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/apis/comments";

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment({ postId, content }),
    onSuccess: () => {
      //등록 후 댓글 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
}
