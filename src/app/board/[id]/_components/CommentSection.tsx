import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

export default function CommentSection() {
  return (
    <div className="flex flex-col">
      <h4 className="mb-4">댓글 3</h4>
      <CommentInput />
      <div className="flex flex-col">
        <CommentList />
        <CommentList />
        <CommentList />
      </div>
    </div>
  );
}
