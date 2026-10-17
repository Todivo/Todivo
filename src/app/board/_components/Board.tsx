"use client";

import { IoFilterOutline } from "react-icons/io5";
import List from "./List";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { usePosts } from "../hooks/usePosts";
import { useState } from "react";
import { GetPostsParams } from "@/apis/posts";

type SortType = NonNullable<GetPostsParams["type"]>;

// API type: all = 최신순, best = 조회수순
const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: "all", label: "최신순" },
  { value: "best", label: "인기순" },
];

export default function Board() {
  const router = useRouter();
  const [sort, setSort] = useState<SortType>("all");
  const {
    data: postsData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts({ type: sort });

  const posts = postsData?.pages.flatMap((page) => page.posts) ?? [];
  return (
    <main className="bg-[#F2F2F2]">
      <h2 className="text-2xl">소통 게시판</h2>
      <div className="relative mx-auto block w-fit">
        <input
          className="h-12 w-108 rounded-full border border-[1px] border-text-secondary bg-white px-5 py-3 text-text-secondary"
          type="text"
          placeholder="검색해주세요"
        />
        <CiSearch className="absolute top-1/2 right-1 -translate-y-1/2 pr-2 text-3xl text-black" />
      </div>
      <section>
        <div className="align-center flex flex-col">
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => router.push("/board/add")}
              className="align-center flex justify-center gap-2 rounded-full bg-primary px-4 py-0.5 text-white sm:p-4"
            >
              <FaPlus className="flex self-center" />
              <span className="align-center flex hidden lg:inline">
                게시물 작성하기
              </span>
            </button>
          </div>
          <div className="mb-10 flex items-center justify-end gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
              className="cursor-pointer bg-transparent outline-none"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <IoFilterOutline />
          </div>
        </div>
        {isPending && <p>불러오는 중...</p>}
        {isError && <p>에러가 발생했습니다.</p>}

        <ul>
          {posts.map((post) => (
            <List key={post.id} data={post} />
          ))}
        </ul>
      </section>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "불러오는 중..." : "더 불러오기"}
        </button>
      )}
    </main>
  );
}
