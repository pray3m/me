import type { FC } from "react"
import type { MenuItemProps } from "@/common/lib/types"
import MenuItem from "./MenuItem"

interface MenuProps {
  title?: string
  list: MenuItemProps[]
}

const Menu: FC<MenuProps> = ({ title, list }) => {
  return (
    <div className="flex flex-col space-y-1">
      {title && (
        <div className="mt-1 mb-2 ml-2 hidden text-muted-foreground text-sm lg:block">
          {title}
        </div>
      )}

      {list?.map((item: MenuItemProps, index: number) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  )
}

export default Menu
