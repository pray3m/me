"use client";

import useHasMounted from "@/common/hooks/use-has-mounted";
import { useTheme } from "next-themes";
import { FC } from "react";
import Icon from "supercons";

const ThemeToggle: FC = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  const isDarkMode = resolvedTheme === "dark";
  const switchText = "Switch to ";

  const handleToggle = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 py-2 px-3 w-full lg:hover:dark:bg-zinc-800 lg:hover:bg-gray-200 lg:hover:rounded-lg lg:hover:scale-105 lg:transition-all lg:duration-300 text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-300 "
    >
      <Icon glyph={isDarkMode ? "idea" : "moon-fill"} size={22} />
      <div className="flex lg:text-sm">
        <span className="hidden xl:block xl:mr-1">{switchText}</span>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </div>
    </button>
  );
};

export default ThemeToggle;
