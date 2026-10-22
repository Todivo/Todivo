import { useQuery } from "@tanstack/react-query";

import { getTodos } from "@/apis/todos";

// 전체 할 일 중 완료한 비율(%)
// queryKey를 ["todos", ...]로 두어 체크 토글 후 invalidate 시 함께 갱신됨
export function useProgress() {
  const { data: allData } = useQuery({
    queryKey: ["todos", "count", "all"],
    queryFn: () => getTodos({ limit: 1 }),
  });
  const { data: doneData } = useQuery({
    queryKey: ["todos", "count", "done"],
    queryFn: () => getTodos({ limit: 1, done: true }),
  });

  const total = allData?.totalCount ?? 0;
  const done = doneData?.totalCount ?? 0;

  return total === 0 ? 0 : Math.round((done / total) * 100);
}
