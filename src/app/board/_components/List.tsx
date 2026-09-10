export interface BoardItem {
  id: number;
  title: string;
  description: string;
  userThumbnail: string;
  userName: string;
  count: number;
  commentCount: number;
  thumbnail: string;
}

export default function List({ data }: { data: BoardItem }) {
  return (
    <div className="flex justify-between border border-[1px] border-black px-4 py-10">
      <div>
        <h3 className="mb-4 text-lg leading-8 font-bold text-text-primary">
          {data.title}
        </h3>
        <p className="mb-6 leading-8 whitespace-pre-line text-[#737373]">
          {data.description}
        </p>
        <div className="flex items-center gap-2 text-sm leading-4 text-[#737373]">
          <img
            className="h-5 w-5 rounded-full object-cover"
            src={data.userThumbnail}
            alt="thumbnail"
          />
          <span>{data.userName}</span>
          <span>·</span>
          <span>조회 {data.count}</span>
          <span>·</span>
          <span>댓글 {data.commentCount}</span>
        </div>
      </div>
      <img src={data.thumbnail} alt="썸네일" />
    </div>
  );
}
