import clsx from "clsx";
import { FC } from "react";
import Image from "../elements/Image";

interface ProfileHeaderProps {
  expandMenu: boolean;
  imageSize: number;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ expandMenu, imageSize }) => {
  return (
    <div
      className={clsx(
        "flex  gap-4 flex-grow lg:flex-col",
        expandMenu ? "flex-col !items-start" : "items-center"
      )}
    >
      <Image
        src="/images/prem.jpg"
        alt="Prem Gautam"
        width={expandMenu ? 75 : imageSize}
        height={expandMenu ? 75 : imageSize}
        rounded="rounded-full"
      />
      <h1 className="flex-grow text-lg lg:text-xl font-medium">Prem Gautam</h1>
    </div>
  );
};

export default ProfileHeader;
