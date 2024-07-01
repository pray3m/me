import React from "react";

interface Props {
  className?: string;
  [propName: string]: any;
}

const Breakline = ({ className, ...others }: Props) => {
  return (
    <div
      className={`
    border-t dark:border-neutral-700 border-gray-300 my-4 ${className} 
        `}
      {...others}
    ></div>
  );
};

export default Breakline;
