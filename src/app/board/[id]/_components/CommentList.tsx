"use client";

import Image from "next/image";
import { useState } from "react";

export default function CommentList() {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("댓글 내용입니다.");

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
            <Image
              src="/images/user-thumbnail.png"
              alt="썸네일"
              width={32}
              height={32}
              className="inline-block rounded-full object-cover"
            />
            <span className="text-text-secondary">고양이</span>
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
