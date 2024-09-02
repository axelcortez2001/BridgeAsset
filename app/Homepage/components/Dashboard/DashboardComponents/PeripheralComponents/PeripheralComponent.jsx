"use client";
import React from "react";
import { computeTotalCost } from "../AllComponents/function";
import TotalCostCard from "../TotalCostCard";

const PeripheralComponent = ({ dashboardData }) => {
  return (
    <div className='w-full flex flex-col'>
      <p>
        Total Items: <span>{dashboardData?.length}</span>
      </p>
      <div className='flex flex-wrap gap-5'>
        <TotalCostCard
          cost={computeTotalCost(dashboardData)}
          loc='peripheral'
        />
      </div>
    </div>
  );
};

export default PeripheralComponent;
