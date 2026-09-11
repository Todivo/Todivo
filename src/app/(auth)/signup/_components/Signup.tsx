"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupForm } from "@/schemas/auth";

const BE_API_URL = process.env.NEXT_PUBLIC_BE_API_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export default function Signup() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async ({ email, nickname, password }: SignupForm) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${BE_API_URL}${TEAM_ID}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name: nickname, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message ?? "회원가입에 실패했습니다.");
      }

      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      router.push("/login");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mt-22 flex w-full flex-col items-center">
      <Link href="">
        <h1 className="mb-4 flex font-baloo text-5xl text-primary">
          <Image
            className="mr-2 mb-10"
            src="/images/todivo_logo_primary.png"
            alt="로고"
            width="48"
            height="48"
          />
          todivo
        </h1>
      </Link>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-2" htmlFor="nickname">
          닉네임
        </label>
        <input
          className="mb-4 h-14 w-100 rounded-xl border border-gray-200 px-2 py-4 focus:ring-1 focus:ring-primary/60 focus:outline-none"
          id="nickname"
          type="text"
          {...register("nickname")}
          placeholder="닉네임을 입력하세요"
        />
        {errors.nickname && (
          <p className="-mt-3 mb-2 text-sm text-red-500">
            {errors.nickname.message}
          </p>
        )}

        <label className="mb-2" htmlFor="email">
          이메일
        </label>
        <input
          className="mb-4 rounded-xl border border-gray-200 px-2 py-4 focus:ring-1 focus:ring-primary/60 focus:outline-none"
          id="email"
          type="email"
          {...register("email")}
          placeholder="이메일을 입력하세요"
        />
        {errors.email && (
          <p className="-mt-3 mb-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}

        <label className="mb-2" htmlFor="password">
          비밀번호
        </label>
        <div className="relative mb-4">
          <input
            id="password"
            className="w-full rounded-xl border border-gray-200 px-2 py-4 pr-10 focus:ring-1 focus:ring-primary/60 focus:outline-none"
            type={passwordVisible ? "text" : "password"}
            {...register("password")}
            placeholder="비밀번호를 입력하세요"
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2"
            onClick={() => setPasswordVisible((prev) => !prev)}
          >
            {passwordVisible ? (
              <Image
                src="/icons/eye-off.svg"
                alt="비밀번호 숨기기"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/icons/eye.svg"
                alt="비밀번호 보기"
                width={20}
                height={20}
              />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="-mt-3 mb-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}

        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <div className="relative mb-4">
          <input
            id="passwordConfirm"
            className="w-full rounded-xl border border-gray-200 px-2 py-4 pr-10 focus:ring-1 focus:ring-primary/60 focus:outline-none"
            type={passwordConfirmVisible ? "text" : "password"}
            {...register("passwordConfirm")}
            placeholder="비밀번호를 입력하세요"
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2"
            onClick={() => setPasswordConfirmVisible((prev) => !prev)}
          >
            {passwordConfirmVisible ? (
              <Image
                src="/icons/eye-off.svg"
                alt="비밀번호 숨기기"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/icons/eye.svg"
                alt="비밀번호 보기"
                width={20}
                height={20}
              />
            )}
          </button>
        </div>
        {errors.passwordConfirm && (
          <p className="-mt-3 mb-2 text-sm text-red-500">
            {errors.passwordConfirm.message}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-12 mb-6 h-14 w-100 rounded-xl bg-primary px-4 py-4 text-white disabled:opacity-60"
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>
      </form>
      <p className="text-center text-sm">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="inline-block self-center text-sm font-bold text-primary hover:underline"
        >
          로그인
        </Link>
      </p>
    </main>
  );
}
