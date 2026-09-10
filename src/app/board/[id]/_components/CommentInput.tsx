export default function CommentInput() {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="mt-2 mb-4 h-14 w-140 rounded-3xl border border-text-secondary p-4 focus:ring-1 focus:ring-primary focus:outline-none"
        placeholder="댓글을 입력해주세요."
      />
      <button className="color-white h-12 w-20 rounded-full bg-primary text-white">
        등록
      </button>
    </div>
  );
}
