import { IoFilterOutline } from "react-icons/io5";
import List, { BoardItem } from "./List";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

export default function Board({ data }: { data: BoardItem[] }) {
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
            <button className="align-center flex justify-center gap-2 rounded-full bg-primary px-4 py-0.5 text-white sm:p-4">
              <FaPlus className="flex self-center" />
              <span className="align-center flex hidden lg:inline">
                게시물 작성하기
              </span>
            </button>
          </div>
          <div className="align-center mb-10 flex justify-end">
            <span className="mr-2">최신순</span>
            <IoFilterOutline />
          </div>
        </div>
        <ul>
          {data.map((item) => (
            <List key={item.id} data={item} />
          ))}
        </ul>
      </section>
    </main>
  );
}
