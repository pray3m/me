import { useState, useEffect } from "react";

const useWindowSize = (): number | undefined => {
  const [windowSize, setWindowSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
