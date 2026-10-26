const SIZE = 68;
const STROKE_WIDTH = 12;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface GoalProgressProps {
  progress?: number;
}

function GoalProgress({ progress = 64 }: GoalProgressProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  const offset = CIRCUMFERENCE * (1 - clamped / 100);

  return (
    <div className="mb-8 flex w-full items-center gap-6 rounded-3xl bg-primary px-8 py-7 text-white shadow-lg sm:w-62">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="shrink-0 -rotate-90"
        role="img"
        aria-label={`목표 진행도 ${clamped}%`}
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          className="stroke-white"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="stroke-teal-600 transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <div className="flex flex-col">
        <span className="text-sm">목표 진행도</span>
        <span className="text-4xl font-bold">
          {clamped}
          <span className="ml-1 text-base font-normal">%</span>
        </span>
      </div>
    </div>
  );
}
export default GoalProgress;
