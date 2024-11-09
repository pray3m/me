"use client";

import moment from "moment";
import Link from "next/link";
import { FC } from "react";
import { SiWakatime as WakatimeIcon } from "react-icons/si";
import useSWR from "swr";

import CodingActiveList from "./CodingActiveList";
import Overview from "./Overview";

import { fetcher } from "@/services/fetcher";

const CodingActive: FC = () => {
  const { data } = useSWR("/api/wakatime", fetcher);

  const formatLastUpdate = (): string => {
    const lastUpdate = moment(data?.last_update);
    if (lastUpdate.isValid()) {
      return lastUpdate.startOf("hour").fromNow();
    }
    return "";
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="flex items-center gap-2 text-xl">
        <WakatimeIcon />
        <span>Monthly Statistics</span>
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
          <span> last 30 days stats. </span>
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-500">
          Last update: <span>{formatLastUpdate()}</span>
        </div>
      </div>

      <Overview data={data} />
      <CodingActiveList data={data} />
    </div>
  );
};

export default CodingActive;
