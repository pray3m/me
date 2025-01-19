import clsx from "clsx";
import { FC } from "react";
import Image from "../elements/Image";
import Link from "next/link";

interface ProfileHeaderProps {
  expandMenu: boolean;
  imageSize: number;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ expandMenu, imageSize }) => {
  return (
    <div
      className={clsx(
        "flex flex-grow gap-4 lg:flex-col",
        expandMenu ? "flex-col !items-start" : "items-center",
      )}
    >
      <Image
        src="/images/prem.jpg"
        alt="Prem Gautam"
        width={expandMenu ? 75 : imageSize}
        height={expandMenu ? 75 : imageSize}
        rounded="rounded-full"
      />
      <Link href="/" passHref>
        <h1 className="flex-grow text-lg font-medium lg:text-xl">
          Prem Gautam
        </h1>
      </Link>
    </div>
  );
};

export default ProfileHeader;
