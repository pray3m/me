import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  [propName: string]: any;
}

const Container = ({ children, className = "", ...others }: Props) => {
  return (
    <div
      className={`
    mt-20 mb-10 lg:mt-0 p-8 ${className}
    `}
      {...others}
    >
      {children}
    </div>
  );
};

export default Container;
