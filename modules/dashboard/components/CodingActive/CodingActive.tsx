import Link from "next/link";
import React, { FC } from "react";
import { SiWakatime } from "react-icons/si";

const CodingActive: FC = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="flex items-center gap-2 text-xl">
        <SiWakatime />
        <span>Weekly Statistics</span>
      </h2>
      <div className="flex flex-col justify-between gap-1 dark:text-neutral-400 md:flex-row md:items-center">
        <div>
          <span>My </span>
          <Link
            href="https://wakatime.com/@pray3m"
            className="hover:text-neutral-900 hover:underline dark:hover:text-neutral-100"
          >
            WakaTime
          </Link>
          <span> last 7 days stats. </span>
        </div>
        <div>
          Last update: <span> xxxxxxxx </span>
        </div>
      </div>

      <div>Overview</div>
      <div>CodingActiveList</div>
    </div>
  );
};

export default CodingActive;
