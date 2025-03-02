import type React from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  icon,
  ...rest
}) => {
  return (
    <button
      className={`flex items-center gap-2 rounded-lg bg-neutral-500 px-4 py-2 font-medium text-neutral-50 shadow-md transition-all duration-300 hover:bg-neutral-600 dark:bg-neutral-600 dark:hover:bg-neutral-700 ${className} hover:scale-[101%]`}
      {...rest}
    >
      {icon && <>{icon}</>}
      {children}
    </button>
  );
};

export default Button;
