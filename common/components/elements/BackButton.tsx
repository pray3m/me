import React, { type FC } from "react";
import Link from "next/link";
import Icon from "supercons";

type Props = {
  url: string;
};
const BackButton: FC<Props> = ({ url }) => {
  return (
    <div className="w-fit">
      <Link href={url} passHref>
        <div className="flex w-max items-center gap-1 pb-5 font-medium text-neutral-600 transition-all duration-300 hover:gap-2 dark:text-neutral-400">
          <Icon glyph="back" size={32} />
          <span>Back</span>
        </div>
      </Link>
    </div>
  );
};
export default BackButton;
