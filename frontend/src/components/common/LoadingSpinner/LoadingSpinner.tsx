import React from "react";
import { Backdrop } from "@mui/material";

import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps extends React.PropsWithChildren {
  className?: string;
  isLoading?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  isLoading = false,
}) => {
  return (
    <Backdrop
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#fffd",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
      className={`flex flex-col items-center justify-center ${
        className || "min-h-screen max-h-screen"
      }`}
    >
      <div
        className={`flex items-center justify-center w-28 h-28 rounded-full bg-[#38b613] before:content-[''] before:block before:w-16 before:h-16 before:rounded-full before:border-8 before:border-solid before:border-white before:border-r-transparent before:border-l-transparent ${styles.spinner} animate-[pulse_1.5s_ease-in-out_infinite]`}
      />
      <span className="font-bold text-2xl mt-4 text-[#38b613]">Loading...</span>
    </Backdrop>
  );
};

export default LoadingSpinner;
