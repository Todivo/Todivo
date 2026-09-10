"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import Form from "@/app/components/domain/Form";
import Editor from "./Editor";

const BE_API_URL = process.env.NEXT_PUBLIC_BE_API_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export default function Add() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await fetch(`${BE_API_URL}${TEAM_ID}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        throw new Error("게시글 등록에 실패했습니다.");
      }

      const post = await res.json();
      router.push(`/board/${post.id}`);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "게시글 등록 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = title.trim() !== "" && content.trim() !== "";

  return (
    <main className="rounded-2xl border border-red-500 bg-white px-10 py-8">
      <Form id="post-add-form" onSubmit={handleSubmit}>
        <Form.Header>
          <div className="flex items-center justify-between pb-4 sm:border-0 sm:pb-0">
            <div className="flex items-center gap-2">
              <IoMenuOutline className="text-2xl sm:hidden" />
              <h2 className="text-lg font-semibold sm:text-xl">
                게시물 작성하기
              </h2>
            </div>
            <div className="flex items-center gap-3 sm:gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="cursor-pointer text-text-secondary sm:rounded-full sm:border sm:border-[#ddd] sm:px-4 sm:py-2"
              >
                취소
              </button>
              <button
                type="submit"
                form="post-add-form"
                disabled={!canSubmit || isSubmitting}
                className="cursor-pointer text-primary disabled:text-[#ddd] sm:rounded-full sm:bg-primary sm:px-4 sm:py-2 sm:text-white sm:disabled:bg-[#ddd] sm:disabled:text-text-secondary"
              >
                <span className="sm:hidden">등록</span>
                <span className="hidden sm:inline">
                  {isSubmitting ? "등록 중..." : "등록하기"}
                </span>
              </button>
            </div>
          </div>
        </Form.Header>
        <Form.Body>
          <Editor
            title={title}
            onTitleChange={setTitle}
            onChange={setContent}
          />
        </Form.Body>
      </Form>
    </main>
  );
}
