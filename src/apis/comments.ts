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
