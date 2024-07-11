import { MenuItemProps } from "@/common/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import Icon from "supercons";

const MenuItem: FC<MenuItemProps> = ({ name, icon, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const isExternalUrl = href?.includes("http");
  const targetUrl = isExternalUrl ? "_blank" : "";

  const activeClasses = isActive
    ? "bg-gray-200 rounded-lg dark:bg-zinc-800 "
    : "hover:dark:bg-zinc-800 md:hover:bg-gray-200 md:hover:rounded-lg md:hover:scale-105 lg:transition-all lg:duration-300";

  return (
    <Link href={href} target={targetUrl}>
      <div
        className={`flex items-center gap-2 py-2 px-3 font-medium ${activeClasses} `}
      >
        <div>{icon}</div>
        <div className="flex-grow">{name}</div>

        {isExternalUrl && (
          <Icon glyph="external" size={22} className="text-gray-500" />
        )}
      </div>
    </Link>
  );
};

export default MenuItem;
