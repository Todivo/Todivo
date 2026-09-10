import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

export default function CommentSection() {
  return (
    <div className="flex flex-col text-center">
      <h4 className="mb-4 self-start">
        댓글 <span className="font-semibold text-primary">3</span>
      </h4>
      <CommentInput />
      <div className="flex flex-col">
        <CommentList />
        <CommentList />
        <CommentList />
      </div>
    </div>
  );
}
