"use client";
import React from "react";
import TotalCostCard from "../TotalCostCard";
import { computeTotalCost } from "../AllComponents/function";

const MonitorComponent = ({ dashboardData }) => {
  return (
    <div className='w-full flex flex-col'>
      <p>
        Total Items: <span>{dashboardData?.length}</span>
      </p>
      <div className='flex flex-wrap gap-5'>
        <TotalCostCard cost={computeTotalCost(dashboardData)} loc='monitor' />
      </div>
    </div>
  );
};

export default MonitorComponent;
