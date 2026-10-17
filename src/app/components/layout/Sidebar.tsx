"use client";

import Image from "next/image";
import Link from "next/link";
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
  { icon: IoCalendar, label: "캘린더", href: undefined },
  { icon: IoChatbubble, label: "소통 게시판", href: "/board" },
  { icon: IoStar, label: "찜한 할 일", href: undefined },
];

interface Goal {
  id: string | number;
  title: string;
  active?: boolean;
}

const defaultGoals: Goal[] = [
  { id: 1, title: "자바스크립트로 웹 서비스 만들기", active: true },
  { id: 2, title: "디자인 시스템 강의 듣기" },
];

interface SidebarProps {
  userName: string;
  userEmail: string;
  userImage?: string;
  goals?: Goal[];
}

export default function Sidebar({
  userName,
  userEmail,
  userImage = "/images/landing-goal.png",
  goals = defaultGoals,
}: SidebarProps) {
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [isGoalActive, setIsGoalActive] = useState(false);

  return (
    <div className="relative flex h-full w-90 cursor-pointer flex-col rounded-r-3xl border-r border-text-secondary/20 bg-background pt-26 shadow-md">
      <div className="absolute top-8 right-8 flex items-center text-xl text-gray-300">
        <IoChevronForward className="-mr-3" />
        <IoChevronForward />
      </div>

      <Link href="/" className="flex shrink-0 items-center gap-2 pl-8">
        <Image
          src="/images/todivo_logo_primary.svg"
          alt="투디보 로고"
          width={48}
          height={48}
        />
        <p className="pl-1 font-baloo text-4xl font-bold text-primary">
          todivo
        </p>
      </Link>

      <ul className="flex flex-1 flex-col overflow-y-auto pt-7">
        <li>
          <Link
            href="/"
            className="flex items-center gap-2 py-5 pl-13 text-[18px] text-foreground"
          >
            <IoGrid className="text-gray-400" />
            대시보드
          </Link>
        </li>

        <li className="px-8">
          <button
            type="button"
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
              {goals.map((goal) => (
                <li
                  key={goal.id}
                  className={`text-[14px] ${
                    goal.active
                      ? "font-bold text-primary"
                      : "text-text-secondary"
                  }`}
                >
                  {goal.title}
                </li>
              ))}
            </ul>
          )}
        </li>

        {navItems.map(({ icon: Icon, label, href }) => {
          const itemClassName =
            "flex items-center gap-2 py-5 pl-13 text-[18px] text-foreground";
          const content = (
            <>
              <Icon className="text-gray-400" />
              {label}
            </>
          );

          return href ? (
            <li key={label}>
              <Link href={href} className={itemClassName}>
                {content}
              </Link>
            </li>
          ) : (
            <li key={label} className={itemClassName}>
              {content}
            </li>
          );
        })}

        <li className="flex items-center gap-2 py-5 pl-13 text-[18px] text-foreground">
          <IoLogOut className="text-gray-400" />
          로그아웃
        </li>
      </ul>

      <div className="flex shrink-0 cursor-pointer flex-col gap-4 px-8 pb-6">
        <div className="flex items-center justify-center gap-2 rounded-4xl border border-primary py-5 text-primary">
          <IoCheckboxOutline className="text-xl" />
          새로운 할 일
        </div>

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

          <div className="relative rounded-full border border-text-secondary/20 p-4.5">
            <IoNotificationsOutline className="text-2xl text-gray-400" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
