import { fetchWithAuth } from "./fetchWithAuth";

export interface User {
  id: number;
  teamId: string;
  email: string;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getMe(): Promise<User> {
  const response = await fetchWithAuth("/users/me");
  if (!response.ok) throw new Error("사용자 정보를 불러오지 못했습니다.");
  return response.json();
}
