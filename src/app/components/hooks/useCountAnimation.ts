import { useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import { animate } from "motion/react";

export default function useCountAnimation(value: number) {
  const motionValue = useMotionValue(0);
  const [count, setCount] = useState(0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setCount(Math.round(latest));
  });

  useEffect(() => {
    const control = animate(motionValue, value, {
      duration: 1,
      ease: "easeOut",
    });

    return () => control.stop();
  }, [motionValue, value]);

  return { count };
}
