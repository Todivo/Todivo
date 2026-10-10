"use client";

import Image from "next/image";
import { useState } from "react";
import {
  IoGrid,
  IoFlag,
  IoCalendar,
  IoChatbubble,
  IoStar,
  IoLogOut,
  IoChevronUp,
  IoChevronDown,
} from "react-icons/io5";

const navItems = [
  { icon: IoCalendar, label: "캘린더" },
  { icon: IoChatbubble, label: "소통 게시판" },
  { icon: IoStar, label: "찜한 할 일" },
  { icon: IoLogOut, label: "로그아웃" },
];

export default function Sidebar() {
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [isGoalActive, setIsGoalActive] = useState(false);

  return (
    <div className="h-full w-90 border-r border-text-secondary/20 bg-background pt-20 shadow-md">
      <nav className="flex items-center gap-2 pl-8">
        <Image
          src="/images/todivo_logo_primary.svg"
          alt="투디보 로고"
          width={48}
          height={48}
        />
        <p className="font-baloo text-3xl font-bold text-primary">todivo</p>
      </nav>

      <ul className="flex flex-col pt-7">
        <li className="flex items-center gap-2 py-3 pl-8 text-foreground">
          <IoGrid className="text-gray-400" />
          대시보드
        </li>

        <li className="px-4">
          <button
            onClick={() => {
              setIsGoalOpen((prev) => !prev);
              setIsGoalActive(true);
            }}
            className={`flex w-full items-center justify-between rounded-3xl py-3 pr-6 pl-4 text-foreground ${
              isGoalActive ? "bg-bg-primary" : ""
            }`}
          >
            <span
              className={`flex items-center gap-2 ${
                isGoalActive ? "font-bold text-primary" : "text-foreground"
              }`}
            >
              <IoFlag
                className={isGoalActive ? "text-primary" : "text-gray-400"}
              />
              목표 별 할일
            </span>
            {isGoalOpen ? <IoChevronUp /> : <IoChevronDown />}
          </button>

          {isGoalOpen && (
            <ul className="flex flex-col gap-3 py-3 pl-8">
              <li className="text-[13px] font-bold text-primary">
                자바스크립트로 웹 서비스 만들기
              </li>
              <li className="text-[13px] text-text-secondary">
                디자인 시스템 강의 듣기
              </li>
            </ul>
          )}
        </li>

        {navItems.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 py-3 pl-8 text-foreground"
          >
            <Icon className="text-gray-400" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
