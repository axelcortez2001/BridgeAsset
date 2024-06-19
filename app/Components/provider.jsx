"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "jotai";
import React from "react";

const Providers = ({ children }) => {
  return (
    <NextUIProvider>
      <Provider>{children}</Provider>
    </NextUIProvider>
  );
};

export default Providers;
