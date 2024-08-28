"use client";
import React from "react";
import { computeTotalCost } from "../AllComponents/function";

const PeripheralComponent = ({ dashboardData }) => {
  return (
    <div className='w-full flex flex-col'>
      <p>
        Total Items: <span>{dashboardData?.length}</span>
      </p>
      <div className='border rounded-md h-20 w-20'>
        Total Cost: {computeTotalCost(dashboardData)}
      </div>
    </div>
  );
};

export default PeripheralComponent;
