import React from "react";
import { ClipLoader, GridLoader, PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <PacmanLoader
      color="#ffffff"
      size={50}
      cssOverride={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Loader;
