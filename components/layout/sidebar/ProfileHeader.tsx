import { BadgeCheck } from "lucide-react"
import Link from "next/link"
import type { FC } from "react"
import Image from "@/components/ds/image"

interface ProfileHeaderProps {
  imageSize: number
  /**
   * `full` — the desktop sidebar card: name, verified badge, and handle.
   * `compact` — the mobile top bar: just the `pray3m` wordmark.
   */
  variant?: "full" | "compact"
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  imageSize,
  variant = "full",
}) => {
  return (
    <div className="flex w-full grow items-center gap-4 lg:flex-col lg:items-start">
      <Image
        src="/images/prem.jpg"
        alt="Prem Gautam"
        width={imageSize}
        height={imageSize}
        rounded="rounded-2xl"
        className="shadow-sm ring-1 ring-border lg:hover:scale-105"
        priority
      />
      {variant === "compact" ? (
        <Link
          href="/"
          className="font-semibold text-foreground text-xl leading-none tracking-wide"
          aria-label="pray3m — home"
        >
          pray3m
        </Link>
      ) : (
        <div className="min-w-0 space-y-0.5">
          <Link
            href="/"
            passHref
            className="inline-flex max-w-full items-center gap-1.5"
          >
            <span className="truncate font-medium text-lg lg:text-xl">
              Prem Gautam
            </span>
            <BadgeCheck
              aria-hidden="true"
              className="size-4 shrink-0 fill-sky-500 text-background"
            />
          </Link>
          <p className="font-medium text-muted-foreground text-sm">@pray3m</p>
        </div>
      )}
    </div>
  )
}

export default ProfileHeader
