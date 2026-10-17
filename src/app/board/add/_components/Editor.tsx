"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./Toolbar";

const TITLE_MAX_LENGTH = 30;

type EditorProps = {
  title: string;
  onTitleChange: (title: string) => void;
  content?: string;
  onChange?: (html: string) => void;
};

export default function Editor({
  title,
  onTitleChange,
  content,
  onChange,
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["header", "paragraph"],
      }),
      Image,
      Placeholder.configure({
        placeholder: "이 곳을 통해 내용을 작성해주세요.",
      }),
    ],
    content: content ?? "",
    immediatelyRender: false, //Next.js SSR hydration 에러 방지(필수)
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  const text = editor.getText();
  const countWithSpaces = text.length;
  const countWithoutSpaces = text.replace(/\s/g, "").length;

  return (
    <div className="sm:rounded-2xl sm:border sm:border-[#ddd] sm:p-6">
      <div className="border-b border-[#ddd] bg-[#fafafa] px-4 py-2 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
        <Toolbar editor={editor} />
      </div>
      <div className="flex items-center justify-between border-b border-[#ddd] px-4 py-4 sm:mt-4 sm:px-0">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value.slice(0, TITLE_MAX_LENGTH))}
          maxLength={TITLE_MAX_LENGTH}
          placeholder="게시물의 제목을 입력해주세요"
          className="w-full text-xl font-semibold outline-none sm:text-2xl"
        />
        <span className="shrink-0 text-sm text-[#999]">
          {title.length}/<span className="text-primary">{TITLE_MAX_LENGTH}</span>
        </span>
      </div>
      <EditorContent
        editor={editor}
        className="min-h-75 px-4 py-4 sm:px-0 [&_.ProseMirror]:min-h-75 [&_.ProseMirror]:outline-none"
      />
      <div className="flex justify-end gap-2 px-4 pb-4 text-sm text-[#999] sm:px-0 sm:pb-0">
        <span>공백포함 {countWithSpaces}자</span>
        <span>|</span>
        <span>공백제외 {countWithoutSpaces}자</span>
      </div>
    </div>
  );
}
