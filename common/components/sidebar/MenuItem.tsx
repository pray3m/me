import { MenuContext } from "@/common/context/MenuContext";
import { MenuItemProps } from "@/common/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useContext, useState } from "react";
import Icon from "supercons";

const MenuItem: FC<MenuItemProps> = ({ name, icon, href }) => {
  const { hideNavbar } = useContext(MenuContext);

  const pathname = usePathname();
  const isActive = pathname === href;
  const isExternalUrl = href?.includes("http");
  const targetUrl = isExternalUrl ? "_blank" : "";

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const activeClasses = isActive
    ? "bg-gray-200 rounded-lg dark:bg-neutral-800 "
    : "hover:dark:bg-neutral-800 md:hover:bg-gray-200 md:hover:rounded-lg md:hover:scale-105 lg:transition-all lg:duration-300 text-neutral-900 dark:!text-netral-300";

  const handleClick = () => {
    hideNavbar();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link href={href} target={targetUrl} onClick={handleClick}>
      <div
        className={`flex items-center gap-2 px-3 py-2 font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 hover:dark:text-neutral-300 ${activeClasses} `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>{icon}</div>
        <div className="flex-grow">{name}</div>

        {isExternalUrl && isHovered && (
          <Icon
            glyph="external"
            size={22}
            className="-rotate-45 text-gray-500 lg:transition-all lg:duration-300"
          />
        )}
      </div>
    </Link>
  );
};

export default MenuItem;
