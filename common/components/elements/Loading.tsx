import React, { type FC } from "react";
import { HashLoader } from "react-spinners";

const Loading: FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <HashLoader color="#36d7b7" />
    </div>
  );
};

export default Loading;
