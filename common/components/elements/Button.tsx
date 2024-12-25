import React, { ButtonHTMLAttributes, ReactNode } from "react";

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
      className={`flex items-center gap-2 rounded-lg bg-cyan-900 px-4 py-2 font-medium text-white shadow-md transition-all duration-300 hover:bg-cyan-950 ${className}`}
      {...rest}
    >
      {icon && <>{icon}</>}
      {children}
    </button>
  );
};

export default Button;
