import { CAREERS } from "@/common/constant/careers";
import Link from "next/link";
import React from "react";
import { LuDownload } from "react-icons/lu";
import CareerCard from "./CareerCard";
import { HiOutlineBriefcase as CareerIcon } from "react-icons/hi";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";

const CareerList = () => {
  const RESUME_URL = "https://www.linkedin.com/in/pray3m/";

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title="Career" icon={<CareerIcon className="mr-1" />} />

        <SectionSubHeading>
          <p className="dark:text-neutral-400">
            My professional career journey
          </p>
          <Link
            href={RESUME_URL}
            passHref
            target="_blank"
            className="flex items-center gap-2 text-neutral-600 transition-all duration-300 hover:gap-3 hover:text-neutral-700 dark:text-neutral-500 hover:dark:text-neutral-300"
          >
            <LuDownload /> <span>Download Resume</span>
          </Link>
        </SectionSubHeading>

        <p className="text-orange-500">
          ⚠️ Not my real data (for development purpose only){" "}
          {/* TODO: Remove this */}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {CAREERS.map((career, index) => (
          <CareerCard key={index} {...career} />
        ))}
      </div>
    </section>
  );
};

export default CareerList;
