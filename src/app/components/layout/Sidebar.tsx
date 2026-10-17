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
  IoChevronForward,
  IoCheckboxOutline,
  IoNotificationsOutline,
} from "react-icons/io5";

const navItems = [
  { icon: IoCalendar, label: "캘린더" },
  { icon: IoChatbubble, label: "소통 게시판" },
  { icon: IoStar, label: "찜한 할 일" },
  { icon: IoLogOut, label: "로그아웃" },
];

interface SidebarProps {
  userName: string;
  userEmail: string;
  userImage?: string;
}

export default function Sidebar({
  userName,
  userEmail,
  userImage = "/images/landing-goal.png",
}: SidebarProps) {
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [isGoalActive, setIsGoalActive] = useState(false);

  return (
    <div className="relative flex h-full w-90 cursor-pointer flex-col rounded-r-3xl border-r border-text-secondary/20 bg-background pt-26 shadow-md">
      <button className="absolute top-8 right-8 flex cursor-pointer items-center text-xl text-gray-300">
        <IoChevronForward className="-mr-3" />
        <IoChevronForward />
      </button>

      <nav className="flex shrink-0 items-center gap-2 pl-8">
        <Image
          src="/images/todivo_logo_primary.svg"
          alt="투디보 로고"
          width={48}
          height={48}
        />
        <p className="pl-1 font-baloo text-4xl font-bold text-primary">
          todivo
        </p>
      </nav>

      <ul className="flex flex-1 flex-col overflow-y-auto pt-7">
        <li className="flex items-center gap-2 py-5 pl-13 text-[18px] text-foreground">
          <IoGrid className="text-gray-400" />
          대시보드
        </li>

        <li className="px-8">
          <button
            onClick={() => {
              setIsGoalOpen((prev) => !prev);
              setIsGoalActive(true);
            }}
            className={`flex w-full cursor-pointer items-center justify-between rounded-2xl py-3 pr-6 pl-5 text-[18px] text-foreground ${
              isGoalActive ? "bg-bg-primary" : ""
            }`}
          >
            <span
              className={`flex items-center gap-2 text-[18px] ${
                isGoalActive ? "font-bold text-primary" : "text-foreground"
              }`}
            >
              <IoFlag
                className={isGoalActive ? "text-primary" : "text-gray-400"}
              />
              목표 별 할일
            </span>
            {isGoalOpen ? (
              <IoChevronUp
                className={isGoalActive ? "text-primary" : "text-gray-400"}
              />
            ) : (
              <IoChevronDown
                className={isGoalActive ? "text-primary" : "text-gray-400"}
              />
            )}
          </button>

          {isGoalOpen && (
            <ul className="flex flex-col gap-3 py-3 pl-8">
              <li className="text-[14px] font-bold text-primary">
                자바스크립트로 웹 서비스 만들기
              </li>
              <li className="text-[14px] text-text-secondary">
                디자인 시스템 강의 듣기
              </li>
            </ul>
          )}
        </li>

        {navItems.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 py-5 pl-13 text-[18px] text-foreground"
          >
            <Icon className="text-gray-400" />
            {label}
          </li>
        ))}
      </ul>

      <div className="flex shrink-0 flex-col gap-4 px-8 pb-6">
        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-4xl border border-primary py-5 text-primary">
          <IoCheckboxOutline className="text-xl" />
          새로운 할 일
        </button>

        <div className="flex items-center justify-between pt-5 pb-5">
          <div className="flex items-center gap-2 rounded-full border border-gray-300 py-3 pr-21 pl-3">
            {userImage ? (
              <Image
                src={userImage}
                alt="프로필"
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-background">
                {userName.charAt(0)}
              </span>
            )}
            <div className="flex flex-col">
              <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                {userName}
                <IoChevronForward className="text-xs text-gray-400" />
              </span>
              <span className="text-xs text-text-secondary">{userEmail}</span>
            </div>
          </div>

          <button className="relative cursor-pointer rounded-full border border-text-secondary/20 p-4.5">
            <IoNotificationsOutline className="text-2xl text-gray-400" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
