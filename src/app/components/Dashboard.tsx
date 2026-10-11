"use client";

import Link from "next/link";
import Image from "next/image";

import { CiSearch } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Dashboard() {
  const progress = 74;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <>
      <h2 className="text-2xl">체다치즈님의 대시보드</h2>
      <div className="flex items-center justify-between">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="flex text-lg">
              <Image
                width={40}
                height={40}
                src="/images/img_goal.png"
                alt="목표 아이콘"
              />
              목표별 할일
            </h2>
            <Link href="/" className="text-[#2DD4BF]">
              모두보기 &gt;
            </Link>
          </div>
          <div className="h-[256px] w-[640px] flex-1 rounded-[40px] bg-[#2DD4BF]">
            <ul className="p-6">
              <li className="mb-2 flex">
                <input type="checkbox" className="mr-2" />
                사용자 데이터 렌더링 구현
                <div className="ml-auto flex gap-3">
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white opacity-60">
                    <GoPencil />
                  </button>
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white opacity-60">
                    <FaRegTrashAlt />
                  </button>
                </div>
              </li>
              <li className="mb-2 flex">
                <input type="checkbox" className="mr-2" />
                실제 디자인 시스템 사례 조사
                <div className="ml-auto flex gap-3">
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white opacity-60">
                    <GoPencil />
                  </button>
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white opacity-60">
                    <FaRegTrashAlt />
                  </button>
                </div>
              </li>
              <li className="mb-2 flex">
                <input type="checkbox" className="mr-2" />
                개발 폴더 구조 세팅
                <div className="ml-auto flex gap-3">
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white opacity-60">
                    <GoPencil />
                  </button>
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white opacity-60">
                    <FaRegTrashAlt />
                  </button>
                </div>
              </li>
              <li className="mb-2 flex">
                <input type="checkbox" className="mr-2" />
                강의 내용을 노션이나 문서에 요약 정리
                <div className="ml-auto flex gap-3">
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white opacity-60">
                    <GoPencil />
                  </button>
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white opacity-60">
                    <FaRegTrashAlt />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section>
          <h2 className="flex text-lg">
            <Image
              width={40}
              height={40}
              src="/images/img_progress.png"
              alt="진행 아이콘"
            />
            내 진행 상황
          </h2>
          <div className="flex h-[256px] w-[640px] flex-1 items-center justify-center gap-10 rounded-[40px] bg-[#1EACFF] p-6">
            {/* 도넛 차트 */}
            <svg
              width="160"
              height="160"
              viewBox="0 0 128 128"
              className="-scale-x-100 -rotate-90"
            >
              {/* 배경 원 (흰색) */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                fill="none"
                stroke="white"
                strokeWidth="20"
              />
              {/* 진행 원 (진한 파랑) */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                fill="none"
                stroke="#4169C0"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>

            <div className="flex flex-col">
              <p className="text-lg text-white">체다치즈님의 진행도는</p>
              <div className="flex items-end">
                <span className="text-7xl font-bold text-white">70</span>
                <span className="text-2xl text-white">%</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section>
        <h2 className="text-lg">검색된 할 일</h2>
        <div className="flex flex-col items-center justify-center border-[1px] border-[#ccc] bg-white opacity-60">
          <div className="relative w-[754px]">
            <input
              type="text"
              placeholder="할 일을 검색해주세요."
              className="w-full rounded-2xl border border-black px-4 py-2 pr-10"
            />
            <CiSearch className="absolute top-1/2 right-3 h-[20px] w-[20px] -translate-y-1/2" />
          </div>

          <ul>
            <li>
              <input type="checkbox" />
              사용자 데이터 렌더링 구현
            </li>
            <li>
              <input type="checkbox" />
              실제 디자인 시스템 사레 조사
            </li>
            <li>
              <input type="checkbox" />
              개발 폴더 구조 세팅
            </li>
            <li>
              <input type="checkbox" />
              강의 내용을 노션이나 문서에 요약 정리
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
