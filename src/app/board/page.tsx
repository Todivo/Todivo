"use client";

import { useState } from "react";
import Board from "./_components/Board";
import { BoardItem } from "./_components/List";

export default function BoardPage() {
  const [data, setData] = useState<BoardItem[]>([
    {
      id: 0,
      title: "디지털 정리의 날: 불필요한 할 일 정리하기",
      description: `오래된 할 일들을 지우는 것만으로도 뿌듯하네요.\n 여러분은 주기적으로 투두를 정리하시나요?`,
      userThumbnail: "/images/thumbnail.png",
      userName: "체다치즈",
      count: 6,
      commentCount: 26,
      thumbnail: "/images/board-thumbnail.png",
    },
  ]);

  return <Board data={data} />;
}
