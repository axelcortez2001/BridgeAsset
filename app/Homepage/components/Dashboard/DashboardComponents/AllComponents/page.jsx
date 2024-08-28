"use client";
import React from "react";
import { categorizedAsset, computeTotalCost } from "./function";
import { Card } from "@nextui-org/react";
import TotalCostCard from "../TotalCostCard";

const AllComponent = ({ dashboardData }) => {
  console.log(categorizedAsset(dashboardData));
  return (
    <div className='w-full flex flex-col gap-5 h-screen'>
      <p>
        Total Items: <span>{dashboardData?.length}</span>
      </p>
      <div className='flex flex-wrap gap-5'>
        <TotalCostCard cost={computeTotalCost(dashboardData)} />
        <div className='border rounded-md'></div>
      </div>
    </div>
  );
};

export default AllComponent;
