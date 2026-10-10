"use client";

import { useState } from "react";
import { Comment } from "@/apis/comments";

export default function CommentList({ comment }: { comment: Comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  return (
    <div className="group flex gap-2 p-4">
      {isEditing ? (
        <textarea
          className="border border-black"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <img
              src={comment.writer.image ?? "/images/user-thumbnail.png"}
              alt="썸네일"
              className="inline-block h-8 w-8 rounded-full object-cover"
            />
            <span className="text-text-secondary">{comment.writer.name}</span>
          </div>
          <p className="text-text-primary">{content}</p>
        </div>
      )}
      <button
        onClick={() => setIsEditing((prev) => !prev)}
        className="hidden text-text-secondary group-hover:inline"
      >
        {isEditing ? "완료" : "수정"}
      </button>
      <button className="hidden text-text-secondary group-hover:inline">
        삭제
      </button>
    </div>
  );
}
