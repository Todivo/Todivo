import { FaCheck, FaRegStar } from "react-icons/fa6";
import { LuFileText, LuPaperclip } from "react-icons/lu";

type TodoItemProps = {
  title: string;
};

function TodoItem({ title }: TodoItemProps) {
  return (
    <li className="flex cursor-pointer items-center gap-2 rounded-2xl px-2 py-2 sm:gap-3 sm:px-4 sm:py-3">
      <label className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <span className="relative flex shrink-0">
          <input
            type="checkbox"
            className="peer size-4 cursor-pointer appearance-none rounded-md border border-primary checked:bg-primary sm:size-5"
          />
          <FaCheck className="pointer-events-none absolute inset-0 m-auto hidden size-2.5 text-white peer-checked:block sm:size-3" />
        </span>
        <span className="truncate text-sm text-text-primary sm:text-base">
          {title}
        </span>
      </label>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <span className="flex size-6 items-center justify-center rounded-full bg-bg-todo/20 text-todo-icon">
          <LuFileText className="size-3" />
        </span>
        <span className="flex size-6 items-center justify-center rounded-full bg-bg-todo/20 text-todo-icon">
          <LuPaperclip className="size-3" />
        </span>
        <button
          type="button"
          aria-label="즐겨찾기"
          className="flex size-6 cursor-pointer items-center justify-center text-star"
        >
          <FaRegStar className="size-5 sm:size-6" />
        </button>
      </div>
    </li>
  );
}
export default TodoItem;
