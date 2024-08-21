"use client";

import { fetcher } from "@/services/fetcher";
import React, { FC } from "react";
import { BsGithub } from "react-icons/bs";
import useSWR from "swr";

const Contributions: FC = () => {
  const { data } = useSWR("api/github", fetcher);
  console.log(data.data.data.user);

  return (
    <div className="flex flex-col gap-y-2 ">
      <h2 className="flex items-center text-xl lg:text-xl font-medium gap-2">
        <BsGithub /> <span>Contributions</span>
      </h2>
      <p className="dark:text-neutral-400">
        My Github Contributions from last year.
      </p>

      {true && (
        <div className="space-y-3">
          <p>Overview</p>
          <p>Calendar</p>
        </div>
      )}
    </div>
  );
};

export default Contributions;
