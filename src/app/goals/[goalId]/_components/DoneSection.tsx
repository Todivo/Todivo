import TodoList from "./TodoList";

function DoneSection() {
  return (
    <section className="flex w-full min-w-0 flex-col gap-4 lg:flex-1">
      <div className="flex h-8 items-center sm:h-10">
        <h2 className="ml-2 text-sm font-semibold text-gray-500 sm:ml-6 sm:text-xl">
          Done
        </h2>
      </div>
      <div className="overflow-y-auto rounded-3xl bg-white p-3 sm:rounded-[40px] sm:p-10 lg:h-119">
        <TodoList />
      </div>
    </section>
  );
}
export default DoneSection;
