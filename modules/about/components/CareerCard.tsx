import { CareerProps } from "@/common/utils/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const CareerCard: FC<CareerProps> = ({
  position,
  company,
  logo,
  location,
  location_type,
  type,
  start_date,
  end_date,
  industry,
  link,
}) => {
  return (
    <div>
      {logo ? (
        <Image src={logo} width={50} height={50} alt={company} />
      ) : (
        <h2> COmpanyt</h2>
      )}

      <div>
        <h6> {position}</h6>
        <div>
          <div>
            <Link href={link || "#"} target="_blank">
              <span> company</span>
            </Link>
            <span>{location}</span>
          </div>

          <div>
            <div>
              <span>Start Date </span> - <span>End Date</span>
            </div>

            <span className="hidden md:block text-neutral-300 dark:text-neutral-700">
              •
            </span>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
