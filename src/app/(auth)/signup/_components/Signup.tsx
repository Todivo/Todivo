"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Signup () {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
 return (
    <main className="flex flex-col items-center mt-22 w-full">
        <Link href="">
            <h1 className="flex mb-4 text-primary font-baloo text-5xl">
                <Image className="mr-2 mb-10" src="/images/todivo_logo_primary.png" alt="로고" width="48" height="48" />
                todivo
            </h1>
        </Link>
        <form className="flex flex-col">
            <label className="mb-2" htmlFor="nickname">닉네임</label>
            <input className="py-4 mb-4 px-2 w-100 h-14 rounded-xl border border-gray-200" id="nickname" type="text" placeholder="닉네임을 입력하세요" />

            <label className="mb-2" htmlFor="email">이메일</label>
            <input className="py-4 px-2 mb-4 rounded-xl border border-gray-200" id="email" type="email" placeholder="이메일을 입력하세요" />

            <label className="mb-2" htmlFor="password">비밀번호</label>
            <div className="relative">
                <input id="password" className="y-4 py-4 mb-4 px-2 pr-10 rounded-xl border border-gray-200 w-full" type={passwordVisible? 'text': 'password'} placeholder="비밀번호를 입력하세요" />
                <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2" onClick={() => setPasswordVisible((prev) => !prev)}>{passwordVisible? (<Image src="/icons/eye-off.svg" alt="비밀번호 숨기기" width={20} height={20} />) : (<Image src="/icons/eye.svg" alt="비밀번호 보기" width={20} height={20} />)}</button>
            </div>

            <label className="mb-2" htmlFor="passwordConfirm">비밀번호 확인</label>
            <div className="relative">
                <input id="passwordConfirm" className="y-4 mb-4 py-4 px-2 pr-10 rounded-xl border border-gray-200 w-full" type={passwordVisible? 'text': 'password'} placeholder="비밀번호를 입력하세요" />
                <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2" onClick={() => setPasswordConfirmVisible((prev) => !prev)}>{passwordConfirmVisible? (<Image src="/icons/eye-off.svg" alt="비밀번호 숨기기" width={20} height={20} />) : (<Image src="/icons/eye.svg" alt="비밀번호 보기" width={20} height={20} />)}</button>
            </div>
        </form>
        <p className="text-center text-sm ">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="inline-block self-center text-sm font-bold hover:underline text-primary">로그인</Link>
        </p>
    </main>    
    
 );
}
