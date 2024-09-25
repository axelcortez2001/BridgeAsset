"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  categorizedAsset,
  categorizedBranch,
  categorizedDate,
  computeTotalCost,
  generateWarrantyStatus,
} from "./function";
import { Card, CardBody } from "@nextui-org/react";
import TotalCostCard from "../TotalCostCard";
import AllComponentsGateway from "../ChartComponents/ChartGateWay/AllComponentsGateway";
import BranchPieGateway from "../ChartComponents/ChartGateWay/BranchPieGateway";
import { useAtomValue } from "jotai";
import { tabLocationAtom } from "./Charts/AllComponentsStore";
import DateChartGateway from "../ChartComponents/ChartGateWay/DateChartGateway";
import { dashBoardDataAtom } from "../../DashboardStore/MainStore";
import LifeSpanGateWay from "../ChartComponents/ChartGateWay/LifeSpanGateWay";
import { filterTypeAtom } from "../ExpandComponents/ExpandStore";
import ResizableSnapContainer from "@/app/Homepage/components/Dashboard/DashboardComponents/ResizableSnapContainer";

const AllComponent = () => {
  const dashboardData = useAtomValue(dashBoardDataAtom);
  const tabLocation = useAtomValue(tabLocationAtom);
  const filterType = useAtomValue(filterTypeAtom);
  const [mouseIsUp, setMouseIsUp] = useState(true);

  const [parentForResizable, setParentForResizable] = useState(0);

  const parentContainer = useRef(null);

  useEffect(() => {
    const parent = parentContainer.current;

    if (!parent) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setParentForResizable(entry.contentRect.width - 8);
      }
    });

    observer.observe(parent);

    return () => {
      observer.unobserve(parent);
    };
  }, [parentContainer]);

  const filteredLaptop = dashboardData.filter(
    (data) => data?.category.toLowerCase() === "laptop"
  );
  const filteredMonitor = dashboardData.filter(
    (data) => data?.category.toLowerCase() === "monitor"
  );
  const filteredPeripheral = dashboardData.filter(
    (data) => data?.category.toLowerCase() === "peripheral"
  );

  const handleMouseDown = () => {
    setMouseIsUp(false);
  };

  const handleMouseUp = () => {
    setMouseIsUp(true);
  };

  return (
    <div
      className="w-full h-[calc(100vh-48px)] overflow-y-scroll mt-2 space-y-2 ss:mt-0 p-0 ss:p-2 "
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      ref={parentContainer}
    >
      <div
        className="grid grid-cols-1 ss:grid-cols-2 lg:grid-cols-4 gap-2"
        id="Cost"
      >
        <div className="ss:col-span-2">
          <TotalCostCard cost={dashboardData?.length} loc="total item" />
        </div>
        <div className="lg:col-span-2 hidden lg:block" />
        <div>
          <TotalCostCard cost={computeTotalCost(dashboardData)} loc="total" />
        </div>
        <div>
          <TotalCostCard cost={computeTotalCost(filteredLaptop)} loc="laptop" />
        </div>
        <div>
          <TotalCostCard
            cost={computeTotalCost(filteredMonitor)}
            loc="monitor"
          />
        </div>
        <div>
          <TotalCostCard
            cost={computeTotalCost(filteredPeripheral)}
            loc="peripheral"
          />
        </div>
      </div>

      <div className="flex flex-wrap flex-none gap-2">
        <ResizableSnapContainer
          divId="Asset Categories"
          parentForResizable={parentForResizable}
          mouseIsUp={mouseIsUp}
          content={
            <AllComponentsGateway chartData={categorizedAsset(dashboardData)} />
          }
        />

        <ResizableSnapContainer
          divId="Branches Asset Collection"
          parentForResizable={parentForResizable}
          mouseIsUp={mouseIsUp}
          content={
            <BranchPieGateway chartData={categorizedBranch(dashboardData)} />
          }
        />

        <ResizableSnapContainer
          divId="Asset Warranty Status"
          parentForResizable={parentForResizable}
          mouseIsUp={mouseIsUp}
          content={
            <LifeSpanGateWay
              chartData={generateWarrantyStatus(dashboardData)}
            />
          }
        />

        <ResizableSnapContainer
          divId="Cost Accumulated"
          parentForResizable={parentForResizable}
          mouseIsUp={mouseIsUp}
          content={
            <DateChartGateway
              chartData={categorizedDate(dashboardData, filterType)}
            />
          }
        />
      </div>
    </div>
  );
};

export default AllComponent;
