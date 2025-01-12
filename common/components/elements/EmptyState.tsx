import React, { FC } from "react";
import Icon from "supercons";

interface Props {
  message: string;
}

const EmptyState: FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-1 py-3 text-neutral-400 dark:text-neutral-500">
      <Icon glyph="sam" size={48} />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
