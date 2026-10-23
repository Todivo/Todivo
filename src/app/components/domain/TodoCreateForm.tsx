"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IoCalendarOutline,
  IoClose,
  IoDocumentAttachOutline,
  IoLinkOutline,
} from "react-icons/io5";

import { uploadImage } from "@/apis/images";
import { todoCreateSchema, type TodoCreateForm } from "@/schemas/todo";
import { useCreateTodo } from "../hooks/useCreateTodo";

const MAX_TAGS = 10;

const labelClassName = "mb-2 block text-sm font-semibold text-text-primary";
const inputClassName =
  "w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none";
const errorClassName = "mt-1 text-xs text-red-500";

function RequiredMark() {
  return <span className="ml-0.5 text-red-500">*</span>;
}

type TodoCreateFormProps = {
  onClose: () => void;
};

export default function TodoCreateForm({ onClose }: TodoCreateFormProps) {
  const { mutateAsync: createTodo } = useCreateTodo();

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TodoCreateForm>({
    resolver: zodResolver(todoCreateSchema),
    mode: "onChange",
    defaultValues: { title: "", dueDate: "", linkUrl: "" },
  });

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 입력 중 Enter가 두 번 처리되는 것 방지
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    e.preventDefault();

    const tag = tagInput.trim();
    if (!tag || tags.includes(tag) || tags.length >= MAX_TAGS) return;
    setTags((prev) => [...prev, tag]);
    setTagInput("");
  };

  const removeTag = (target: string) => {
    setTags((prev) => prev.filter((tag) => tag !== target));
  };

  const onSubmit = async ({ title, dueDate, linkUrl }: TodoCreateForm) => {
    setIsSubmitting(true);
    try {
      const fileUrl = imageFile ? await uploadImage(imageFile) : undefined;

      await createTodo({
        title,
        dueDate: new Date(dueDate).toISOString(),
        linkUrl: linkUrl || undefined,
        fileUrl,
        tags: tags.length > 0 ? tags : undefined,
      });
      onClose();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "할 일 생성 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <label htmlFor="todo-title" className={labelClassName}>
          제목
          <RequiredMark />
        </label>
        <input
          id="todo-title"
          type="text"
          placeholder="할 일의 제목을 적어주세요"
          maxLength={100}
          className={inputClassName}
          {...register("title")}
        />
        {errors.title && (
          <p className={errorClassName}>{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="todo-due-date" className={labelClassName}>
          마감기한
          <RequiredMark />
        </label>
        <div className="relative">
          <IoCalendarOutline className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
          <input
            id="todo-due-date"
            type="date"
            className={`${inputClassName} cursor-pointer pl-10`}
            {...register("dueDate")}
          />
        </div>
        {errors.dueDate && (
          <p className={errorClassName}>{errors.dueDate.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="todo-tag" className={labelClassName}>
          태그
        </label>
        <input
          id="todo-tag"
          type="text"
          placeholder="입력 후 Enter"
          value={tagInput}
          maxLength={50}
          disabled={tags.length >= MAX_TAGS}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          className={inputClassName}
        />
        {tags.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="flex items-center gap-1 rounded-full bg-bg-primary px-3 py-1 text-xs text-primary"
              >
                #{tag}
                <button
                  type="button"
                  aria-label={`${tag} 태그 삭제`}
                  onClick={() => removeTag(tag)}
                >
                  <IoClose />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label htmlFor="todo-link" className={labelClassName}>
          링크
        </label>
        <div className="relative">
          <IoLinkOutline className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
          <input
            id="todo-link"
            type="url"
            placeholder="링크를 업로드해주세요"
            className={`${inputClassName} border-dashed bg-gray-50 pl-10`}
            {...register("linkUrl")}
          />
        </div>
        {errors.linkUrl && (
          <p className={errorClassName}>{errors.linkUrl.message}</p>
        )}
      </div>

      <div>
        <span className={labelClassName}>이미지</span>
        {imageFile ? (
          <div className="flex items-center justify-between rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm">
            <span className="truncate">{imageFile.name}</span>
            <button
              type="button"
              aria-label="이미지 삭제"
              onClick={() => setImageFile(null)}
              className="shrink-0 text-gray-500"
            >
              <IoClose />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-6 text-sm text-gray-400">
            <IoDocumentAttachOutline className="size-5" />
            이미지 첨부
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
          </label>
        )}
        <p className="mt-2 text-xs text-gray-400">
          이미지는 최대 1개만 첨부할 수 있습니다.
        </p>
      </div>

      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 cursor-pointer rounded-full border border-gray-300 py-3"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex-1 cursor-pointer rounded-full bg-primary py-3 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isSubmitting ? "생성 중..." : "확인"}
        </button>
      </div>
    </form>
  );
}
