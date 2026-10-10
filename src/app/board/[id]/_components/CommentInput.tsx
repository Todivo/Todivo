"use client";

import { useState } from "react";
import { useCreateComment } from "../../hooks/useCreateComment";

export default function CommentInput({ postId }: { postId: number }) {
  const [content, setContent] = useState("");
  const { mutate, isPending } = useCreateComment(postId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    mutate(trimmed, { onSuccess: () => setContent("") });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
    </form>
  );
}
