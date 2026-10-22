import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/apis/users";

export function useMe() {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: getMe,
  });
}
