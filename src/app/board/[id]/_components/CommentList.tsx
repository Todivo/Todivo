"use client";

import Image from "next/image";
import { useState } from "react";

import { Comment } from "@/apis/comments";

import { useUpdateComment } from "../../hooks/useUpdateComment";

export default function CommentList({ comment }: { comment: Comment }) {
  const [isEditing, setIsEditing] = useState(false);
  // 수정 중에만 쓰는 임시 내용. 화면 표시는 항상 서버 값(comment.content)을 사용
  const [draft, setDraft] = useState("");
  const { mutate, isPending, error, reset } = useUpdateComment(
    comment.postId,
    comment.id,
  );

  const startEditing = () => {
    setDraft(comment.content);
    reset();
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (trimmed === comment.content) {
      setIsEditing(false);
      return;
    }
    mutate(trimmed, { onSuccess: () => setIsEditing(false) });
  };

  return (
    <div className="group flex gap-2 p-4">
      {isEditing ? (
        <div className="flex flex-col gap-1">
          <textarea
            className="border border-black"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              if (error) reset();
            }}
            maxLength={500}
            aria-invalid={!!error}
          />
          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error.message}
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <Image
              width={32}
              height={32}
              src={comment.writer.image ?? "/images/user-thumbnail.png"}
              alt="썸네일"
              className="inline-block h-8 w-8 rounded-full object-cover"
            />
            <span className="text-text-secondary">{comment.writer.name}</span>
          </div>
          <p className="text-text-primary">{comment.content}</p>
        </div>
      )}
      {isEditing ? (
        <>
          <button
            onClick={handleSave}
            disabled={isPending || !draft.trim()}
            className="text-text-secondary"
          >
            {isPending ? "저장 중..." : "완료"}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            disabled={isPending}
            className="text-text-secondary"
          >
            취소
          </button>
        </>
      ) : (
        <>
          <button
            onClick={startEditing}
            className="text-text-secondary opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary"
          >
            수정
          </button>
          <button className="text-text-secondary opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary">
            삭제
          </button>
        </>
      )}
    </div>
  );
}
