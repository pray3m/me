import React from "react";

interface Props {
  className?: string;
  [propName: string]: any;
}

const Breakline = ({ className, ...others }: Props) => {
  return (
    <div
      className={`my-4 border-t border-gray-300 dark:border-neutral-700 ${className} `}
      {...others}
    ></div>
  );
};

export default Breakline;
