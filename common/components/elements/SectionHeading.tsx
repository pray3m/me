import type React from "react";
import type { FC } from "react";

interface Props {
  title: string;
  icon?: React.ReactNode;
}

const SectionHeading: FC<Props> = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-1 text-xl font-medium text-neutral-800 dark:text-neutral-300">
      {icon && <>{icon}</>}
      <h2 className="capitalize">{title}</h2>
    </div>
  );
};

export default SectionHeading;
