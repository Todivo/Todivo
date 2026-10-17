import Edit from "./_components/Edit";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <Edit postId={Number(id)} />;
}
