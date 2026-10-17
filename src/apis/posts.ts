const BE_API_URL = process.env.NEXT_PUBLIC_BE_API_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export interface Post {
  id: number;
  teamId: string;
  userId: number;
  title: string;
  content: string;
  image: string | null;
  viewCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  writer: { id: number; name: string; image: string | null };
}

export interface PostResponse {
  posts: Post[];
  nextCursor: string | null;
  totalCount: number;
}

export interface GetPostsParams {
  cursor?: string;
  limit?: number;
  type?: "all" | "best";
  search?: string;
}

export async function getPosts({
  cursor,
  limit = 10,
  type = "all",
  search,
}: GetPostsParams): Promise<PostResponse> {
  const params = new URLSearchParams({ limit: String(limit), type });

  if (cursor) params.set("cursor", cursor);
  if (search) params.set("search", search);

  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BE_API_URL}${TEAM_ID}/posts?${params.toString()}`,
    {
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    },
  );
  if (!response.ok) throw new Error("게시글 목록을 불러오지 못했습니다.");
  return response.json();
}

export async function getPost(postId: number): Promise<Post> {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${BE_API_URL}${TEAM_ID}/posts/${postId}`, {
    headers: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
  if (!response.ok) throw new Error("게시글을 불러오지 못했습니다.");
  return response.json();
}

export interface UpdatePostParams {
  postId: number;
  title?: string;
  content?: string;
  image?: string | null;
}

export async function updatePost({
  postId,
  ...body
}: UpdatePostParams): Promise<Post> {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${BE_API_URL}${TEAM_ID}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("게시글을 수정하지 못했습니다.");
  return response.json();
}

export async function deletePost(postId: number): Promise<void> {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${BE_API_URL}${TEAM_ID}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
  // 성공 시 204 No Content라 응답 본문이 없음
  if (!response.ok) throw new Error("게시글을 삭제하지 못했습니다.");
}
