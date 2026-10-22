import { ComponentProps } from "react";
import { FaCheck } from "react-icons/fa6";

type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  variant?: "default" | "inverse";
};

const variantStyles = {
  default: {
    input: "border-primary checked:bg-primary",
    icon: "text-white",
  },
  inverse: {
    input: "border-white checked:bg-white",
    icon: "text-primary",
  },
};

function Checkbox({
  variant = "default",
  className = "",
  ...props
}: CheckboxProps) {
  const styles = variantStyles[variant];

  return (
    <span className={`relative flex shrink-0 ${className}`}>
      <input
        type="checkbox"
        className={`peer size-4 cursor-pointer appearance-none rounded-md border sm:size-5 ${styles.input}`}
        {...props}
      />
      <FaCheck
        className={`pointer-events-none absolute inset-0 m-auto hidden size-2.5 peer-checked:block sm:size-3 ${styles.icon}`}
      />
    </span>
  );
}
export default Checkbox;
