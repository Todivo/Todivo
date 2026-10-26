"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  IoChevronBack,
  IoCheckboxOutline,
  IoNotificationsOutline,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import TodoCreateForm from "../domain/TodoCreateForm";
import Modal from "../Modal";

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
  const pathname = usePathname();
  const router = useRouter();
  // 목표 상세 페이지에 있으면 '목표 별 할일' 메뉴를 활성 상태로 표시
  const goalMenuActive = isGoalActive || pathname.startsWith("/goals/");
  // 모바일: 서랍 열림 / 태블릿: 펼친 사이드바를 위에 띄움
  const [isOpen, setIsOpen] = useState(false);
  // 데스크톱: 사이드바 접힘
  const [isCollapsed, setIsCollapsed] = useState(false);

  const openSidebar = () => {
    setIsOpen(true);
    setIsCollapsed(false);
  };
  const closeSidebar = () => {
    setIsOpen(false);
    setIsCollapsed(true);
  };

  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  return (
    <>
      {/* 모바일 상단 헤더 */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-12 items-center justify-between bg-background px-4 shadow-sm sm:hidden">
        <button
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={isOpen}
          onClick={openSidebar}
          className="cursor-pointer text-2xl text-gray-500"
        >
          <IoMenu />
        </button>
        <button
          type="button"
          aria-label="알림"
          className="relative cursor-pointer text-xl text-gray-400"
        >
          <IoNotificationsOutline />
          <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-orange-400" />
        </button>
      </header>

      {/* 태블릿·접힌 데스크톱: 아이콘만 있는 좁은 사이드바 */}
      <div
        className={`relative hidden h-full w-15 shrink-0 transition-[width] duration-300 ease-in-out sm:block ${
          isCollapsed ? "lg:w-15" : "lg:w-90"
        }`}
      >
        <nav
          className={`absolute inset-y-0 left-0 flex w-15 flex-col items-center gap-6 rounded-r-3xl border-r border-text-secondary/20 bg-background pt-8 shadow-md transition-opacity duration-300 ${
            isCollapsed ? "" : "lg:pointer-events-none lg:opacity-0"
          }`}
        >
          <button
            type="button"
            aria-label="사이드바 펼치기"
            onClick={openSidebar}
            className="flex cursor-pointer items-center text-xl text-gray-300"
          >
            <IoChevronForward className="-mr-3" />
            <IoChevronForward />
          </button>
          <Link href="/" aria-label="홈">
            <Image
              src="/images/todivo_logo_primary.svg"
              alt="투디보 로고"
              width={28}
              height={28}
            />
          </Link>
          <button
            type="button"
            aria-label="알림"
            className="relative cursor-pointer text-xl text-gray-400"
          >
            <IoNotificationsOutline />
            <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-orange-400" />
          </button>
        </nav>
      </div>

      {/* 모바일·태블릿 펼침 배경 (페이드 인/아웃) */}
      <div
        aria-hidden
        onClick={closeSidebar}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* 펼친 사이드바: 모든 화면에서 슬라이드로 열리고 닫힘 */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[85vw] max-w-90 cursor-pointer flex-col rounded-r-3xl border-r border-text-secondary/20 bg-background pt-26 shadow-md transition-transform duration-300 ease-in-out sm:w-90 ${
          isOpen ? "translate-x-0" : "translate-x-[-110%]"
        } ${isCollapsed ? "lg:translate-x-[-110%]" : "lg:translate-x-0"}`}
      >
        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={closeSidebar}
          className="absolute top-8 right-8 cursor-pointer text-2xl text-gray-400 sm:hidden"
        >
          <IoClose />
        </button>
        <button
          type="button"
          aria-label="사이드바 접기"
          onClick={closeSidebar}
          className="absolute top-8 right-8 hidden cursor-pointer items-center text-xl text-gray-300 sm:flex"
        >
          <IoChevronBack className="-mr-3" />
          <IoChevronBack />
        </button>

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

        <ul
          className="flex flex-1 flex-col overflow-y-auto pt-7"
          onClick={(e) => {
            // 모바일·태블릿에서 메뉴 링크를 누르면 펼친 사이드바 닫기
            if ((e.target as HTMLElement).closest("a")) setIsOpen(false);
          }}
        >
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
                if (goals.length > 0) router.push(`/goals/${goals[0].id}`);
              }}
              className={`flex w-full cursor-pointer items-center justify-between rounded-2xl py-3 pr-6 pl-5 text-[18px] text-foreground ${
                goalMenuActive ? "bg-bg-primary" : ""
              }`}
            >
              <span
                className={`flex items-center gap-2 text-[18px] ${
                  goalMenuActive ? "font-bold text-primary" : "text-foreground"
                }`}
              >
                <IoFlag
                  className={goalMenuActive ? "text-primary" : "text-gray-400"}
                />
                목표 별 할일
              </span>
              {isGoalOpen ? (
                <IoChevronUp
                  className={goalMenuActive ? "text-primary" : "text-gray-400"}
                />
              ) : (
                <IoChevronDown
                  className={goalMenuActive ? "text-primary" : "text-gray-400"}
                />
              )}
            </button>

            {isGoalOpen && (
              <ul className="flex flex-col gap-3 py-3 pl-8">
                {goals.map((goal) => (
                  <li
                    key={goal.id}
                    className={`text-[14px] ${
                      pathname === `/goals/${goal.id}`
                        ? "font-bold text-primary"
                        : "text-text-secondary"
                    }`}
                  >
                    <Link href={`/goals/${goal.id}`}>{goal.title}</Link>
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
          <button
            type="button"
            onClick={() => setIsTodoModalOpen(true)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-4xl border border-primary py-4 text-primary"
          >
            <IoCheckboxOutline className="text-xl" />
            새로운 할 일
          </button>

          <Modal
            isOpen={isTodoModalOpen}
            onClose={() => setIsTodoModalOpen(false)}
            title="할 일 생성"
          >
            <TodoCreateForm onClose={() => setIsTodoModalOpen(false)} />
          </Modal>

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
    </>
  );
}
