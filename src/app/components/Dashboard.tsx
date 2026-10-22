"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

import { useProgress } from "./hooks/useProgress";
import { useSearchTodos } from "./hooks/useSearchTodos";
import { useTodos } from "./hooks/useTodos";
import { useToggleTodo } from "./hooks/useToggleTodo";

export default function Dashboard() {
  const progress = useProgress();
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  const {
    data: todosData,
    isLoading: isTodosLoading,
    isError: isTodosError,
  } = useTodos(4);
  const todos = todosData?.todos ?? [];
  const { mutate: toggleTodo } = useToggleTodo();

  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const {
    data: searchData,
    isFetching: isSearching,
    isError: isSearchError,
  } = useSearchTodos(keyword);
  const searchedTodos = searchData?.todos ?? [];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(keywordInput.trim());
  };

  return (
    <>
      <h2 className="mb-10 text-2xl">체다치즈님의 대시보드</h2>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <section className="w-full min-w-0 lg:flex-1">
          <div className="flex items-center justify-between">
            <h2 className="mb-2 flex text-lg">
              <Image
                width={40}
                height={40}
                src="/images/todo.svg"
                className="mr-3 h-auto"
                alt="목표 아이콘"
              />
              목표별 할일
            </h2>
            <Link href="/" className="text-primary">
              모두보기 &gt;
            </Link>
          </div>
          <div className="min-h-[256px] w-full rounded-[40px] bg-primary">
            <ul className="p-6">
              {isTodosLoading && <li>불러오는 중...</li>}
              {isTodosError && !todosData && (
                <li>할 일을 불러오지 못했습니다.</li>
              )}
              {!isTodosLoading && !isTodosError && todos.length === 0 && (
                <li>등록된 할 일이 없습니다.</li>
              )}
              {todos.map((todo) => (
                <li key={todo.id} className="mb-4 flex gap-3 last:mb-2">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={(e) =>
                      toggleTodo({ id: todo.id, done: e.target.checked })
                    }
                    className="mt-1 shrink-0 cursor-pointer self-start"
                  />
                  <span className="break-keep">{todo.title}</span>
                  <div className="ml-auto flex shrink-0 gap-3 self-start">
                    <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white opacity-60">
                      <GoPencil />
                    </button>
                    <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white opacity-60">
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="w-full min-w-0 lg:flex-1">
          <h2 className="mb-2 flex text-lg">
            <Image
              width={40}
              height={40}
              src="/images/progress.svg"
              className="mr-3"
              alt="진행 아이콘"
            />
            내 진행 상황
          </h2>
          <div className="flex min-h-[256px] w-full items-center justify-center gap-10 rounded-[40px] bg-modal-blue p-6">
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
                <span className="text-7xl font-bold text-white">
                  {progress}
                </span>
                <span className="text-2xl text-white">%</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section>
        <h2 className="mt-10 mb-4 text-lg">검색된 할 일</h2>
        <div className="flex flex-col items-center justify-center rounded-[20px] border-[1px] border-[#ccc] bg-white px-4.5 py-20 opacity-60">
          <form
            onSubmit={handleSearch}
            className="relative mb-10 w-full max-w-[754px]"
          >
            <input
              type="text"
              placeholder="할 일을 검색해주세요."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              className="w-full rounded-2xl border border-black px-4 py-2 pr-10"
            />
            <button
              type="submit"
              aria-label="검색"
              className="absolute top-1/2 right-3 -translate-y-1/2"
            >
              <CiSearch className="h-[20px] w-[20px]" />
            </button>
          </form>

          {!keyword && <p>검색어를 입력해주세요.</p>}
          {keyword && isSearching && <p>검색 중...</p>}
          {keyword && isSearchError && <p>검색 중 에러가 발생했습니다.</p>}
          {keyword && !isSearching && !isSearchError && (
            <>
              {searchedTodos.length === 0 ? (
                <p>검색된 할 일이 없습니다.</p>
              ) : (
                <ul>
                  {searchedTodos.map((todo) => (
                    <li key={todo.id} className="pb-4 last:pb-0">
                      <input
                        type="checkbox"
                        checked={todo.done}
                        readOnly
                        className="mr-2"
                      />
                      {todo.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
