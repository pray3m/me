"use client";

import { fetcher } from "@/services/fetcher";
import React, { FC } from "react";
import { BsGithub } from "react-icons/bs";
import useSWR from "swr";
import Overview from "./Overview";
import Calendar from "./Calendar";
import Link from "next/link";

const Contributions: FC = () => {
  const { data, error } = useSWR("api/github", fetcher);

  const contributionCalendar =
    data?.contributionsCollection?.contributionCalendar;

  return (
    <div className="flex flex-col gap-y-2 ">
      <h2 className="flex items-center text-xl lg:text-xl font-medium gap-2">
        <BsGithub />
        <div>
          <span>Contributions</span>
        </div>
      </h2>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <p className="dark:text-neutral-400">
          My Github Contributions from last year.
        </p>
        <Link
          href={`https://github.com/pray3m`}
          target="_blank"
          passHref
          className="text-sm font-mono text-neutral-400 dark:text-neutral-600 hover:text-netral-700 dark:hover:text-neutral-400"
        >
          @pray3m
        </Link>
      </div>

      {!data && <div className="dark:text-neutral-400">No Data</div>}

      {data && (
        <div className="space-y-3">
          <Overview data={contributionCalendar} />
          <Calendar data={contributionCalendar} />
        </div>
      )}
    </div>
  );
};

export default Contributions;
