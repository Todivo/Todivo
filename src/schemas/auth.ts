import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("이메일 형식이 아닙니다."),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "대문자, 소문자, 특수문자를 모두 포함해야 합니다.",
    ),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.email("이메일 형식이 아닙니다."),
    nickname: z
      .string()
      .min(1, "닉네임을 입력해주세요.")
      .max(20, "닉네임은 20자 이하여야 합니다."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
        "대문자, 소문자, 특수문자를 모두 포함해야 합니다.",
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type SignupForm = z.infer<typeof signupSchema>;
