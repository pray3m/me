import { ToggleModeContext } from "@/common/context/ToggleModeContext";
import { FC, useContext } from "react";
import ToggleMode from "./ToggleMode";

const ToggleModeButton: FC = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ToggleModeContext);

  return <ToggleMode isDarkMode={isDarkMode} onToggleChange={toggleDarkMode} />;
};

export default ToggleModeButton;
