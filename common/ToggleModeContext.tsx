import { createContext } from "react";

interface ToggleModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ToggleModeContext = createContext<ToggleModeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {
    console.log("mode changed ");
  },
});
