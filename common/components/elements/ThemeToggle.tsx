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

  const handleToggle = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className="flex w-full items-center gap-2 px-3 py-2 text-neutral-700 hover:text-neutral-900 lg:transition-all lg:duration-300 lg:hover:scale-105 lg:hover:rounded-lg lg:hover:bg-gray-200 dark:text-neutral-400 dark:hover:text-neutral-300 lg:dark:hover:bg-zinc-800"
    >
      <Icon glyph={isDarkMode ? "sun-fill" : "moon-fill"} size={22} />
      <div className="flex">{isDarkMode ? "Light Mode" : "Dark Mode"}</div>
    </button>
  );
};

export default ThemeToggle;
