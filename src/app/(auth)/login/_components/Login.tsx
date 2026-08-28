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
          />
        </h1>
      </Link>
      <form className="flex flex-col">
        <input type="email" placeholder="이메일을 입력해주세요" />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요"
        />
        <button type="submit">로그인</button>
      </form>
      <p className="text-center text-sm">
        투디보가 처음이신가요?{" "}
        <Link
          href="/signup"
          className="inline-block self-center text-sm font-bold text-primary hover:underline"
        ></Link>
      </p>
    </main>
  );
}
