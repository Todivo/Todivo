import { fetchWithAuth } from "./fetchWithAuth";

export interface Goal {
  id: number;
  teamId: string;
  userId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  todoCount: number;
  completedCount: number;
}

export interface GoalResponse {
  goals: Goal[];
  nextCursor: number | null;
  totalCount: number;
}

export async function getGoals(limit = 100): Promise<GoalResponse> {
  const response = await fetchWithAuth(`/goals?limit=${limit}`);
  if (!response.ok) throw new Error("목표 목록을 불러오지 못했습니다.");
  return response.json();
}
