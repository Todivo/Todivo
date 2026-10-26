import DoneSection from "./DoneSection";
import GoalProgress from "./GoalProgress";
import TodoSection from "./TodoSection";

function GoalDetail() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <h1 className="text-base font-semibold text-text-primary sm:text-xl">
        체다치즈님의 목표
      </h1>
      <GoalProgress />
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-6">
        <TodoSection />
        <DoneSection />
      </div>
    </div>
  );
}
export default GoalDetail;
