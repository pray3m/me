import clsx from "clsx"
import Link from "next/link"
import type { FC } from "react"
import Image from "../elements/Image"

interface ProfileHeaderProps {
  expandMenu: boolean
  imageSize: number
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ expandMenu, imageSize }) => {
  return (
    <div
      className={clsx(
        "flex w-full grow gap-4 lg:flex-col",
        expandMenu ? "items-start! flex-col" : "items-center"
      )}
    >
      <Image
        src="/images/prem.jpg"
        alt="Prem Gautam"
        width={expandMenu ? 75 : imageSize}
        height={expandMenu ? 75 : imageSize}
        rounded="rounded-full"
        className="lg:hover:scale-105"
      />
      <Link href="/" passHref>
        <h1 className="grow font-medium text-lg lg:text-xl">Prem Gautam</h1>
      </Link>
    </div>
  )
}

export default ProfileHeader
