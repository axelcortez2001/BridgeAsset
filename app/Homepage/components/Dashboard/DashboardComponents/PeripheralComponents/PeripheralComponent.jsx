"use client";
import React from "react";
import { categorizedBranch, computeTotalCost } from "../AllComponents/function";
import TotalCostCard from "../TotalCostCard";
import BranchPieGateway from "../ChartComponents/ChartGateWay/BranchPieGateway";

const PeripheralComponent = ({ dashboardData }) => {
  return (
    <div className='w-full flex flex-col'>
      <p>
        Total Items: <span>{dashboardData?.length}</span>
      </p>
      <div className='flex flex-wrap gap-5 p-3'>
        <div className='flex flex-wrap w-full gap-4'>
          <TotalCostCard
            cost={computeTotalCost(dashboardData)}
            loc='peripheral'
          />
        </div>
        <div className='border relative  rounded-md p-2 overflow-auto resize'>
          <BranchPieGateway chartData={categorizedBranch(dashboardData)} />
        </div>
      </div>
    </div>
  );
};

export default PeripheralComponent;
