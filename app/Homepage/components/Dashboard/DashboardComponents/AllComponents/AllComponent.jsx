"use client";
import React, { useEffect } from "react";
import { categorizedAsset, computeTotalCost } from "./function";
import { Card } from "@nextui-org/react";
import TotalCostCard from "../TotalCostCard";
import Categories from "./Charts/Categories";

const AllComponent = ({ dashboardData }) => {
  const filteredLaptop = dashboardData.filter(
    (data) => data?.category.toLowerCase() === "laptop"
  );
  const filteredMonitor = dashboardData.filter(
    (data) => data?.category.toLowerCase() === "monitor"
  );
  const filteredPeripheral = dashboardData.filter(
    (data) => data?.category.toLowerCase() === "peripheral"
  );
  return (
    <div className='w-full flex flex-col gap-5 h-screen mt-4'>
      <p>
        Total Items: <span>{dashboardData?.length}</span>
      </p>
      <div className='flex flex-wrap gap-5 p-3'>
        <div className='flex flex-wrap w-full gap-4'>
          <TotalCostCard cost={computeTotalCost(dashboardData)} loc='total' />
          <TotalCostCard cost={computeTotalCost(filteredLaptop)} loc='laptop' />
          <TotalCostCard
            cost={computeTotalCost(filteredMonitor)}
            loc='monitor'
          />
          <TotalCostCard
            cost={computeTotalCost(filteredPeripheral)}
            loc='peripheral'
          />
        </div>
        <div className='border relative w-full rounded-md p-2 overflow-auto resize'>
          <Categories chartData={categorizedAsset(dashboardData)} />
        </div>
      </div>
    </div>
  );
};

export default AllComponent;
