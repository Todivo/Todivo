import TodoList from "./TodoList";
import { FaPlus } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import TodoTabs from "./TodoTabs";

function TodoSection() {
  return (
    <section className="flex w-full min-w-0 flex-col gap-4 lg:flex-1">
      <div className="flex items-center justify-between">
        <TodoTabs />
        <div className="flex gap-2">
          <button
            aria-label="캘린더보기"
            className="inline-flex size-8 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-500 text-sm text-gray-500 sm:h-10 sm:w-30 sm:rounded-3xl"
          >
            <CiCalendar className="size-4" />
            <span className="hidden sm:inline">캘린더보기</span>
          </button>
          <button
            aria-label="할 일 추가"
            className="inline-flex size-8 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm text-background sm:h-10 sm:w-30 sm:rounded-3xl"
          >
            <FaPlus className="size-4" />
            <span className="hidden sm:inline">할 일 추가</span>
          </button>
        </div>
      </div>

      <div className="overflow-y-auto rounded-3xl bg-[#fffde7] p-3 sm:h-119 sm:rounded-[40px] sm:p-10">
        <TodoList />
      </div>
    </section>
  );
}
export default TodoSection;
