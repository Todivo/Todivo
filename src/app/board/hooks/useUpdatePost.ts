import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost, UpdatePostParams } from "@/apis/posts";

export function useUpdatePost(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: Omit<UpdatePostParams, "postId">) =>
      updatePost({ postId, ...params }),
    onSuccess: (post) => {
      // 수정된 게시글로 상세 캐시를 바로 교체 (재조회 시 조회수가 오르지 않도록)
      queryClient.setQueryData(["post", postId], post);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
