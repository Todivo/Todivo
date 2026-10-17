"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "@/app/components/domain/Form";
import Editor from "@/app/board/add/_components/Editor";
import { Post } from "@/apis/posts";
import { usePost } from "@/app/board/hooks/usePost";
import { useUpdatePost } from "@/app/board/hooks/useUpdatePost";

export default function Edit({ postId }: { postId: number }) {
  const { data: post, isPending, isError } = usePost(postId);

  if (isPending) return <p>불러오는 중...</p>;
  if (isError) return <p>게시글을 불러오지 못했습니다.</p>;

  // 게시글을 불러온 뒤에 폼을 렌더링해야 에디터 초기값이 채워짐
  return <EditForm post={post} />;
}

function EditForm({ post }: { post: Post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const { mutate, isPending } = useUpdatePost(post.id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    mutate(
      { title, content },
      {
        onSuccess: () => router.push(`/board/${post.id}`),
        onError: (error) => alert(error.message),
      },
    );
  };

  const canSubmit = title.trim() !== "" && content.trim() !== "";

  return (
    <main className="rounded-2xl bg-white px-10 py-8">
      <Form id="post-edit-form" onSubmit={handleSubmit}>
        <Form.Header>
          <div className="flex items-center justify-between pb-4 sm:pb-0">
            <h2 className="text-lg font-semibold sm:text-xl">게시물 수정하기</h2>
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
                form="post-edit-form"
                disabled={!canSubmit || isPending}
                className="cursor-pointer text-primary disabled:text-[#ddd] sm:rounded-full sm:bg-primary sm:px-4 sm:py-2 sm:text-white sm:disabled:bg-[#ddd] sm:disabled:text-text-secondary"
              >
                {isPending ? "수정 중..." : "수정하기"}
              </button>
            </div>
          </div>
        </Form.Header>
        <Form.Body>
          <Editor
            title={title}
            onTitleChange={setTitle}
            content={post.content}
            onChange={setContent}
          />
        </Form.Body>
      </Form>
    </main>
  );
}
