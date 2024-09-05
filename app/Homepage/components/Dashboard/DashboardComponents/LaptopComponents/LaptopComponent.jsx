"use client";
import React from "react";
import TotalCostCard from "../TotalCostCard";
import {
  categorizedBranch,
  categorizedDate,
  categorizedStatus,
  computeTotalCost,
  generateWarrantyStatus,
} from "../AllComponents/function";
import BranchPieGateway from "../ChartComponents/ChartGateWay/BranchPieGateway";
import DateChartGateway from "../ChartComponents/ChartGateWay/DateChartGateway";
import LifeSpanGateWay from "../ChartComponents/ChartGateWay/LifeSpanGateWay";
import StatusChartGateway from "../ChartComponents/ChartGateWay/StatusChartGateway";
import { useAtomValue } from "jotai";
import { filterTypeAtom } from "../ExpandComponents/ExpandStore";

const LaptopComponent = ({ dashboardData }) => {
  const filterType = useAtomValue(filterTypeAtom);
  return (
    <div className='w-full flex flex-col  '>
      <p>
        Total Items: <span>{dashboardData?.length}</span>
      </p>
      <div className='flex flex-wrap gap-5 p-3'>
        <div className='flex flex-wrap w-full gap-4'>
          <TotalCostCard cost={computeTotalCost(dashboardData)} loc='laptop' />
        </div>
        <div className='border relative  rounded-md p-2 overflow-auto resize'>
          <StatusChartGateway chartData={categorizedStatus(dashboardData)} />
        </div>
        <div className='border relative  rounded-md p-2 overflow-auto resize'>
          <BranchPieGateway chartData={categorizedBranch(dashboardData)} />
        </div>
        <div className='border relative max-w-[410px]  rounded-md p-2 w-full overflow-auto resize'>
          <LifeSpanGateWay chartData={generateWarrantyStatus(dashboardData)} />
        </div>
        <div className='border relative  rounded-md p-2 w-full overflow-auto resize'>
          <DateChartGateway
            chartData={categorizedDate(dashboardData, filterType)}
          />
        </div>
      </div>
    </div>
  );
};

export default LaptopComponent;
