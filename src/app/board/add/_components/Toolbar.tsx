import { Editor } from "@tiptap/react";
import { useRef, useState } from "react";
import Image from "next/image";

const BE_API_URL = process.env.NEXT_PUBLIC_BE_API_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export default function Toolbar({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setIsUploading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");

      const presignedRes = await fetch(`${BE_API_URL}${TEAM_ID}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify({ fileName: file.name }),
      });

      if (!presignedRes.ok) {
        throw new Error("이미지 업로드 URL 발급에 실패했습니다.");
      }

      const { uploadUrl, url } = await presignedRes.json();

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      editor.chain().focus().setImage({ src: url }).run();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "이미지 업로드 중 오류가 발생했습니다.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="toolbar flex items-center gap-2 sm:rounded-lg sm:bg-[#fafafa] sm:p-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`font-bold ${editor.isActive("bold") ? "text-primary" : ""}`}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`italic ${editor.isActive("italic") ? "text-primary" : ""}`}
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`underline ${editor.isActive("underline") ? "text-primary" : ""}`}
      >
        U
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <Image
          width={20}
          height={20}
          src="/images/align-left.png"
          alt="왼쪽정렬"
        />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <Image
          width={20}
          height={20}
          src="/images/align-center.png"
          alt="가운데정렬"
        />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <Image
          width={20}
          height={20}
          src="/images/align-right.png"
          alt="오른쪽정렬"
        />
      </button>
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
        ref={fileInputRef}
        onChange={handleImageChange}
        hidden
      />
      <button
        type="button"
        onClick={handleImageButtonClick}
        disabled={isUploading}
      >
        {isUploading ? "업로드 중..." : "이미지"}
      </button>
    </div>
  );
}
