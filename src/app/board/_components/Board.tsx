import { IoFilterOutline } from "react-icons/io5";
import List, { BoardItem } from "./List";

export default function Board({ data }: { data: BoardItem[] }) {
  return (
    <>
      <h2>소통 게시판</h2>
      <input type="text" />
      <section>
        <button>+ 게시물 작성하기</button>
        <span>
          최신순
          <IoFilterOutline />
        </span>

        <ul>
          {data.map((item) => (
            <List key={item.id} data={item} />
          ))}
        </ul>
      </section>
    </>
  );
}
