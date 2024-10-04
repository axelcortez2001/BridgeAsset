"use client";
import React, { useEffect, useRef, useState } from "react";
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
import ResizableSnapContainer from "../ResizableSnapContainer";

const FilteredComponents = ({ dashboardData }) => {
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

  const handleMouseDown = () => {
    setMouseIsUp(false);
  };

  const handleMouseUp = () => {
    setMouseIsUp(true);
  };

  return (
    <div
      className="w-full h-[calc(100vh-48px)] overflow-auto mt-2 space-y-2 ss:mt-0 p-0 ss:p-2 "
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      ref={parentContainer}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2" id="Cost">
        <div>
          <TotalCostCard cost={dashboardData?.length} loc="total item" />
        </div>
        <div>
          <TotalCostCard cost={computeTotalCost(dashboardData)} loc="total" />
        </div>
      </div>

      <div className="flex flex-wrap flex-none gap-2 px-2">
        <ResizableSnapContainer
          divId="Status Asset Collection"
          parentForResizable={parentForResizable}
          mouseIsUp={mouseIsUp}
          content={
            <StatusChartGateway chartData={categorizedStatus(dashboardData)} />
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

        <ResizableSnapContainer
          divId="Ytd Chart Data"
          parentForResizable={parentForResizable}
          mouseIsUp={mouseIsUp}
          content={<YTDGateway chartData={generateYTD(dashboardData)} />}
        />
      </div>
    </div>
  );
};

export default FilteredComponents;
