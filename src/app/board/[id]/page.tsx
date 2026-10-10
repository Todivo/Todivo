import PostDetail from "./_components/PostDetail";

export default async function BoardDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);

  return (
    <main className="rounded-xl border border-red-500 bg-white p-14">
      <PostDetail postId={postId} />
    </main>
  );
}
