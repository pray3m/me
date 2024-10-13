import { CAREERS } from "@/common/constant/careers";
import Link from "next/link";
import React from "react";
import { LuDownload } from "react-icons/lu";
import CareerCard from "./CareerCard";

const CareerList = () => {
  const RESUME_URL = "https://www.linkedin.com/in/premgautam/";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2>Career</h2>
        <div>
          <p>My professional career journey</p>
          <Link href={RESUME_URL} passHref>
            <LuDownload /> <span>Download Resume</span>
          </Link>
        </div>
      </div>

      <div>
        {CAREERS.map((career, index) => (
          <CareerCard key={index} {...career} />
        ))}
      </div>
    </div>
  );
};

export default CareerList;
