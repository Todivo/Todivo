"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <main className="mt-22 flex w-full flex-col items-center">
      <Link href="">
        <h1 className="mb-4 flex font-baloo text-5xl text-primary">
          <Image
            className="mr-2 mb-10"
            src="/images/todivo_logo_primary.png"
            alt="로고"
            width={48}
            height={48}
          />
          todivo
        </h1>
      </Link>
      <form className="flex flex-col items-center">
        <input
          type="email"
          className="mb-4 h-14 w-100 rounded-xl border border-gray-200 px-2 py-4 focus:ring-1 focus:ring-primary/60 focus:outline-none"
          placeholder="이메일을 입력해주세요"
        />
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            className="h-14 w-100 rounded-xl border border-gray-200 px-2 py-4 focus:ring-1 focus:ring-primary/60 focus:outline-none"
            placeholder="비밀번호를 입력해주세요"
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
        <button
          className="mt-12 mb-6 h-14 w-100 rounded-xl bg-primary px-4 py-4 text-white"
          type="submit"
        >
          로그인하기
        </button>
      </form>
      <p className="text-center text-sm">
        투디보가 처음이신가요?{" "}
        <Link
          href="/signup"
          className="inline-block self-center text-sm font-bold text-primary hover:underline"
        ></Link>
      </p>
      <div className="my-6 flex items-center">
        <span className="mr-2 h-[1px] w-34 bg-gray-200"></span>
        sns 계정으로 로그인
        <span className="ml-2 h-[1px] w-34 bg-gray-200"></span>
      </div>
      <div className="flex items-center justify-center">
        <button className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="text-center"
            width={24}
            height={24}
            src="/images/google-login.svg"
            alt="구글 로그인"
          />
        </button>
      </div>
    </main>
  );
}
