"use client";
import React from "react";
import TotalCostCard from "../TotalCostCard";
import {
  categorizedBranch,
  categorizedDate,
  categorizedStatus,
  computeTotalCost,
  generateWarrantyStatus,
  generateYTD,
} from "../AllComponents/function";
import BranchPieGateway from "../ChartComponents/ChartGateWay/BranchPieGateway";
import DateChartGateway from "../ChartComponents/ChartGateWay/DateChartGateway";
import LifeSpanGateWay from "../ChartComponents/ChartGateWay/LifeSpanGateWay";
import StatusChartGateway from "../ChartComponents/ChartGateWay/StatusChartGateway";
import { useAtomValue } from "jotai";
import { filterTypeAtom } from "../ExpandComponents/ExpandStore";
import YTDGateway from "../ChartComponents/ChartGateWay/YTDGateway";

const MonitorComponent = ({ dashboardData }) => {
  const filterType = useAtomValue(filterTypeAtom);
  return (
    <div className="w-full h-full flex flex-col">
      <p>
        Total Items: <span>{dashboardData?.length}</span>
      </p>
      <div className="flex flex-wrap gap-5 p-3">
        <div className="flex flex-wrap w-full gap-4" id="Cost">
          <TotalCostCard cost={computeTotalCost(dashboardData)} loc="monitor" />
        </div>
        <div
          className="border relative  rounded-md p-2 overflow-auto resize"
          id="Status Asset Collection"
        >
          <StatusChartGateway chartData={categorizedStatus(dashboardData)} />
        </div>
        <div
          className="border relative  rounded-md p-2 overflow-auto resize"
          id="Branches Asset Collection"
        >
          <BranchPieGateway chartData={categorizedBranch(dashboardData)} />
        </div>
        <div
          className="border relative max-w-[410px]   rounded-md p-2 w-full overflow-auto resize"
          id="Asset Warranty Status"
        >
          <LifeSpanGateWay chartData={generateWarrantyStatus(dashboardData)} />
        </div>
        <div
          className="border relative  rounded-md p-2 w-full"
          id="Cost Accumulated"
        >
          <DateChartGateway
            chartData={categorizedDate(dashboardData, filterType)}
          />
        </div>
        <div
          className="border relative  rounded-md p-2 w-full overflow-auto resize"
          id="Ytd Chart Data"
        >
          <YTDGateway chartData={generateYTD(dashboardData)} />
        </div>
      </div>
    </div>
  );
};

export default MonitorComponent;
