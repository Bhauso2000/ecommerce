'use client';

import React from "react";
import { useIsFetching } from "@tanstack/react-query";
import HolyLoader from "holy-loader";

const Loader: React.FC = () => {
  const isFetching = useIsFetching();

  if (isFetching === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <HolyLoader color="#868686" />
    </div>
  );
};

export default Loader;
