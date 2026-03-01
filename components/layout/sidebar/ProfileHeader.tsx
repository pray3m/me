import Link from "next/link"
import type { FC } from "react"
import Image from "@/components/ds/image"

interface ProfileHeaderProps {
  imageSize: number
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ imageSize }) => {
  return (
    <div className="flex w-full grow items-center gap-4 lg:flex-col lg:items-start">
      <Image
        src="/images/prem.jpg"
        alt="Prem Gautam"
        width={imageSize}
        height={imageSize}
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
