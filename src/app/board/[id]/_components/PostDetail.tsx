"use client";

import Form from "@/app/components/domain/Form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Images from "@tiptap/extension-image";
import { usePost } from "../../hooks/usePost";
import CommentSection from "./CommentSection";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeletePost } from "../../hooks/useDeletePost";

function formatDate(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function PostDetail({ postId }: { postId: number }) {
  const router = useRouter();
  const { data: post, isPending, isError } = usePost(postId);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost(postId);

  // 작성할 때와 같은 tiptap 확장으로 읽기 전용 렌더링 (스키마 밖의 태그·스크립트는 걸러짐)
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        TextAlign.configure({ types: ["header", "paragraph"] }),
        Images,
      ],
      content: post?.content ?? "",
      editable: false,
      immediatelyRender: false, //Next.js SSR hydration 에러 방지(필수)
    },
    [post?.content],
  );

  const handleDelete = () => {
    if (!confirm("게시글을 삭제할까요?")) return;

    deletePost(undefined, {
      onSuccess: () => router.replace("/board"),
      onError: (error) => alert(error.message),
    });
  };

  if (isPending) return <p>불러오는 중...</p>;
  if (isError) return <p>게시글을 불러오지 못했습니다.</p>;

  return (
    <>
      <Form>
        <Form.Header>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <div className="flex gap-3 text-sm text-text-secondary">
              <Link
                href={`/board/${postId}/edit`}
                className="hover:text-text-primary"
              >
                수정
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="cursor-pointer hover:text-text-primary disabled:cursor-default"
              >
                삭제
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1 border-b border-[#ddd] pb-8">
            <Image
              width={5}
              height={5}
              className="mr-2 rounded-full object-cover"
              src={post.writer.image ?? "/images/thumbnail.png"}
              alt="thumbnail"
            />
            <span>{post.writer.name}</span>
          </div>
        </Form.Header>

        <Form.Body>
          <EditorContent editor={editor} />
        </Form.Body>
        <Form.Footer>
          <div className="text-text-secondary">
            <span>{formatDate(post.createdAt)} </span>
            <span>·</span> <span>조회 {post.viewCount}</span>
          </div>
        </Form.Footer>
      </Form>
      <CommentSection postId={postId} />
    </>
  );
}
