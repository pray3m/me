import Breakline from "@/components/ds/breakline"
import Navigation from "@/components/layout/sidebar/Navigation"
import Profile from "@/components/layout/sidebar/Profile"

const Sidebar = () => {
  return (
    <div className="sticky top-0 z-10 flex flex-col lg:py-14">
      <Profile />

      {/* Desktop-only nav; CSS-hidden on mobile so the shell still SSRs. */}
      <div className="hidden lg:block">
        <Breakline className="my-3" />
        <Navigation />
      </div>
    </div>
  )
}

export default Sidebar
