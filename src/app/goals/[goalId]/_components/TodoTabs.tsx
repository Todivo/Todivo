function TodoTabs() {
  return (
    <div role="tablist" className="flex items-center">
      <button
        type="button"
        role="tab"
        aria-selected="true"
        className="ml-2 cursor-pointer text-sm font-bold text-primary sm:ml-6 sm:text-xl"
      >
        ALL
      </button>
      <button
        type="button"
        role="tab"
        aria-selected="false"
        className="ml-3 cursor-pointer text-sm font-bold text-text-secondary sm:ml-4 sm:text-xl"
      >
        TODO
      </button>
    </div>
  );
}
export default TodoTabs;
