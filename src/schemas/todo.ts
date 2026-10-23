import { z } from "zod";

export const todoCreateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "할 일 제목을 입력해주세요.")
    .max(100, "제목은 100자 이하여야 합니다."),
  dueDate: z.string().min(1, "마감기한을 선택해주세요."),
  linkUrl: z.union([z.literal(""), z.url("링크 형식이 아닙니다.")]),
});

export type TodoCreateForm = z.infer<typeof todoCreateSchema>;
