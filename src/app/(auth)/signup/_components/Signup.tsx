"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
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
      <form className="flex flex-col">
        <label className="mb-2" htmlFor="nickname">
          닉네임
        </label>
        <input
          className="mb-4 h-14 w-100 rounded-xl border border-gray-200 px-2 py-4 focus:ring-1 focus:ring-primary/60 focus:outline-none"
          id="nickname"
          type="text"
          placeholder="닉네임을 입력하세요"
        />

        <label className="mb-2" htmlFor="email">
          이메일
        </label>
        <input
          className="mb-4 rounded-xl border border-gray-200 px-2 py-4 focus:ring-1 focus:ring-primary/60 focus:outline-none"
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
        />

        <label className="mb-2" htmlFor="password">
          비밀번호
        </label>
        <div className="relative mb-4">
          <input
            id="password"
            className="w-full rounded-xl border border-gray-200 px-2 py-4 pr-10 focus:ring-1 focus:ring-primary/60 focus:outline-none"
            type={passwordVisible ? "text" : "password"}
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

        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <div className="relative mb-4">
          <input
            id="passwordConfirm"
            className="w-full rounded-xl border border-gray-200 px-2 py-4 pr-10 focus:ring-1 focus:ring-primary/60 focus:outline-none"
            type={passwordVisible ? "text" : "password"}
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
        <button
          type="submit"
          className="mt-12 mb-6 h-14 w-100 rounded-xl bg-primary px-4 py-4 text-white"
        >
          회원가입
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
