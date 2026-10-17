const BE_API_URL = process.env.NEXT_PUBLIC_BE_API_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export interface Comment {
  id: number;
  teamId: string;
  postId: number;
  userId: number;
  content: string;
  parentId: number | null;
  likeCount: number;
  replyCount?: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
  writer: { id: number; name: string; image: string | null };
}

export interface CreateCommentParams {
  postId: number;
  content: string;
  parentId?: number;
}

export async function createComment({
  postId,
  content,
  parentId,
}: CreateCommentParams): Promise<Comment> {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${BE_API_URL}${TEAM_ID}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify({ content, parentId }),
  });

  if (!response.ok) {
    throw new Error("댓글을 등록하지 못했습니다.");
  }
  return response.json();
}

export interface CommentResponse {
  comments: Comment[];
  nextCursor: string | null;
  totalCount: number;
}

export interface GetCommentsParams {
  postId: number;
  cursor?: string;
  limit?: number;
}

export async function getComments({
  postId,
  cursor,
  limit = 10,
}: GetCommentsParams): Promise<CommentResponse> {
  const params = new URLSearchParams({ limit: String(limit) });

  if (cursor) params.set("cursor", cursor);

  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BE_API_URL}${TEAM_ID}/posts/${postId}/comments?${params.toString()}`,
    {
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    },
  );
  if (!response.ok) throw new Error("댓글 목록을 불러오지 못했습니다.");
  return response.json();
}

export interface UpdateCommentParams {
  postId: number;
  commentId: number;
  content: string;
}

export async function updateComment({
  postId,
  commentId,
  content,
}: UpdateCommentParams): Promise<Comment> {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BE_API_URL}${TEAM_ID}/posts/${postId}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify({ content }),
    },
  );
  if (!response.ok) throw new Error("댓글을 수정하지 못했습니다.");
  return response.json();
}
