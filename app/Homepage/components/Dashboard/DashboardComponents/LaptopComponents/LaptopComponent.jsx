"use client";
import React from "react";
import TotalCostCard from "../TotalCostCard";
import { computeTotalCost } from "../AllComponents/function";

const LaptopComponent = ({ dashboardData }) => {
  return (
    <div className='w-full flex flex-col  '>
      <p>
        Total Items: <span>{dashboardData?.length}</span>
      </p>
      <div className='flex flex-wrap gap-5'>
        <TotalCostCard cost={computeTotalCost(dashboardData)} loc='laptop' />
      </div>
    </div>
  );
};

export default LaptopComponent;
