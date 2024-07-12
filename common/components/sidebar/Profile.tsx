import useIsMobile from "@/common/hooks/useIsMobile";
import clsx from "clsx";
import { FC } from "react";
import Status from "../elements/Status";
import MobileMenuButton from "./MobileMenuButton";
import ProfileHeader from "./ProfileHeader";

const Profile: FC = () => {
  const isMobile = useIsMobile();
  const imageSize = isMobile ? 40 : 100;

  return (
    <div
      className={clsx(
        "z-10 absolute bg-white shadow-sm xl:shadow-none lg:bg-none dark:border-b dark:border-neutral-800 dark:bg-dark w-full p-5 lg:relative lg:p-0"
      )}
    >
      <div className="flex items-center lg:items-start justify-between lg:flex-col lg:space-y-3">
        <ProfileHeader expandMenu={false} imageSize={imageSize} />
        {!isMobile && <Status />}
        {isMobile && <MobileMenuButton />}
      </div>
    </div>
  );
};

export default Profile;
