"use client";
import React from "react";
import { Spinner } from "@nextui-org/react";
export default function AssetLoading() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Spinner type='spinner' size='xl'>
        Asset Loading...
      </Spinner>
    </div>
  );
}
