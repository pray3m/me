import type { FC } from "react"
import Status from "@/components/blocks/Status"
import MobileNav from "./MobileNav"
import ProfileHeader from "./ProfileHeader"

const Profile: FC = () => {
  return (
    <>
      {/* Mobile (< lg): fixed top bar with the menu drawer (client island). */}
      <MobileNav />

      {/* Desktop (>= lg): static sidebar profile, server-rendered. */}
      <div className="hidden lg:block">
        <div className="flex flex-col items-start space-y-3">
          <ProfileHeader imageSize={100} />
          <Status />
        </div>
      </div>
    </>
  )
}

export default Profile
