import { CAREERS } from "@/common/constant/careers";
import Link from "next/link";
import React from "react";
import { LuDownload } from "react-icons/lu";
import CareerCard from "./CareerCard";
import { HiOutlineBriefcase as CareerIcon } from "react-icons/hi";

const CareerList = () => {
  const RESUME_URL = "https://www.linkedin.com/in/pray3m/";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="flex text-xl items-center gap-2">
          <CareerIcon />
          <span>Career</span>
        </h2>
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-3">
          <p className="dark:text-neutral-400">
            My professional career journey
          </p>
          <Link
            href={RESUME_URL}
            passHref
            target="_blank"
            className="flex gap-2 hover:gap-3 transition-all duration-300 items-center text-neutral-600 dark:text-neutral-500 hover:text-neutral-700 hover:dark:text-neutral-300"
          >
            <LuDownload /> <span>Download Resume</span>
          </Link>
        </div>
        <p className="text-orange-500">
          ⚠️ Not my real data (for development purpose only){" "}
          {/* TODO: Remove this */}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3 md:gap-4">
        {CAREERS.map((career, index) => (
          <CareerCard key={index} {...career} />
        ))}
      </div>
    </div>
  );
};

export default CareerList;
