"use client";

import { useComments } from "../../hooks/useComments";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

export default function CommentSection({ postId }: { postId: number }) {
  const { data, isPending, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useComments(postId);

  const comments = data?.pages.flatMap((page) => page.comments) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  return (
    <div className="flex flex-col text-center">
      <h4 className="mb-4 self-start">
        댓글 <span className="font-semibold text-primary">{totalCount}</span>
      </h4>
      <CommentInput postId={postId} />
      <div className="flex flex-col">
        {isPending && <p>댓글을 불러오는 중...</p>}
        {isError && <p>댓글을 불러오지 못했습니다.</p>}
        {!isPending && !isError && comments.length === 0 && (
          <p className="text-text-secondary">첫 댓글을 남겨보세요.</p>
        )}
        {comments.map((comment) => (
          <CommentList key={comment.id} comment={comment} />
        ))}
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-2 text-text-secondary"
        >
          {isFetchingNextPage ? "불러오는 중..." : "댓글 더보기"}
        </button>
      )}
    </div>
  );
}
