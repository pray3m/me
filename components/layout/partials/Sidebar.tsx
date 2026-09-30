import Breakline from "@/components/ds/breakline"
import Navigation from "@/components/layout/sidebar/Navigation"
import Profile from "@/components/layout/sidebar/Profile"

const Sidebar = () => {
  return (
    // The sticky offset matches the shell's top padding (lg:py-4 xl:py-8 in components/layout), so the sidebar never drifts.
    <div className="flex flex-col lg:sticky lg:top-4 lg:z-10 lg:max-h-[calc(100dvh-2rem)] lg:overflow-y-auto lg:py-14 xl:top-8 xl:max-h-[calc(100dvh-4rem)]">
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
