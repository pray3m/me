import React, { FC } from "react";
import { motion } from "framer-motion";

const Status: FC = () => {
  return (
    <div className="flex items-center gap-2 pb-2">
      <motion.div
        className="h-2 w-2 bg-green-600 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      />
      <span className="font-medium text-sm animate-pulse">
        available for hire
      </span>
    </div>
  );
};

export default Status;
