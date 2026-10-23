import { useQuery } from "@tanstack/react-query";

import { getGoals } from "@/apis/goals";

export function useGoals() {
  return useQuery({
    queryKey: ["goals", "list"],
    queryFn: () => getGoals(),
  });
}
