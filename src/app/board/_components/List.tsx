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
    <div>
      <div>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <div>
          <img src={data.userThumbnail} alt="thumbnail" />
          <span>{data.userName}</span>
          <span>조회 {data.count}</span>
          <span>댓글 {data.commentCount}</span>
        </div>
      </div>
      <img src={data.thumbnail} alt="썸네일" />
    </div>
  );
}
