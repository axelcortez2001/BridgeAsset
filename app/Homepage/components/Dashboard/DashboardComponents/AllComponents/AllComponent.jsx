"use client";
import React from "react";
import { categorizedAsset, computeTotalCost } from "./function";
import { Card } from "@nextui-org/react";
import TotalCostCard from "../TotalCostCard";
import Categories from "./Charts/Categories";

const AllComponent = ({ dashboardData }) => {
  console.log(categorizedAsset(dashboardData));
  return (
    <div className='w-full flex flex-col gap-5 h-screen'>
      <p>
        Total Items: <span>{dashboardData?.length}</span>
      </p>
      <div className='flex flex-wrap gap-5'>
        <TotalCostCard cost={computeTotalCost(dashboardData)} />
        <div className='border w-full rounded-md p-2'>
          <Categories chartData={categorizedAsset(dashboardData)} />
        </div>
      </div>
    </div>
  );
};

export default AllComponent;
