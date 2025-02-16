"use client";

import useHasMounted from "@/common/hooks/use-has-mounted";
import { useTheme } from "next-themes";
import type { FC } from "react";
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
      className="flex w-full items-center gap-2 px-3 py-2 text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 hover:dark:text-neutral-300 lg:transition-all lg:duration-300 lg:hover:scale-105 lg:hover:rounded-lg lg:hover:bg-gray-200 lg:hover:dark:bg-zinc-800"
    >
      <Icon glyph={isDarkMode ? "idea" : "moon-fill"} size={22} />
      <div className="flex lg:text-sm">
        <span className="hidden xl:mr-1 xl:block">{switchText}</span>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </div>
    </button>
  );
};

export default ThemeToggle;
