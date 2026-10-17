"use client";

import { useState } from "react";
import { useCreateComment } from "../../hooks/useCreateComment";

export default function CommentInput({ postId }: { postId: number }) {
  const [content, setContent] = useState("");
  const { mutate, isPending, error, reset } = useCreateComment(postId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    const submitted = content;
    mutate(trimmed, {
      // 요청 중에 새로 입력한 내용은 지우지 않고, 보낸 내용 그대로일 때만 비우기
      onSuccess: () =>
        setContent((current) => (current === submitted ? "" : current)),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            // 입력을 고치면 이전 등록 실패 메시지 지우기
            if (error) reset();
          }}
          aria-invalid={!!error}
          aria-describedby={error ? "comment-error" : undefined}
          maxLength={500}
          className="mt-2 mb-4 h-14 w-140 rounded-3xl border border-text-secondary p-4 focus:ring-1 focus:ring-primary focus:outline-none"
          placeholder="댓글을 입력해주세요."
        />
        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className="color-white h-12 w-20 rounded-full bg-primary text-white"
        >
          등록
        </button>
      </div>
      {error && (
        <p
          id="comment-error"
          role="alert"
          className="mb-4 text-sm text-red-500"
        >
          {error.message}
        </p>
      )}
    </form>
  );
}
