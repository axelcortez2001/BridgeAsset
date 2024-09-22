"use client";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";

import {
  dashBoardDataAtom,
  fetchDashboardDataAtom,
} from "./DashboardStore/MainStore";
import DashboardHome from "./DashboardComponents/DashboardHome";
import AssetLoading from "../LoadingComponents/AssetLoading";
import { updateStatusAtom } from "../../AssetStore";
import { Card } from "@nextui-org/react";
import DashboardSkeleton from "./DashboardComponents/DashboardSkeleton";

const Dashboard = ({ isSideNavBar, setSideNavBar }) => {
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const fetchDashBoard = useSetAtom(fetchDashboardDataAtom);
  const [updateStatus, setUpdateStatus] = useAtom(updateStatusAtom);
  const dashboardData = useAtomValue(dashBoardDataAtom);

  useEffect(() => {
    const getDashboardData = async () => {
      if (dashboardData === null || updateStatus === true) {
        console.log("Trigger main event");
        setDashboardLoading(true);
        try {
          const res = await fetchDashBoard();
          console.log("res: ", res);
          if (res?.success) {
            console.log("Response: ", res?.message);
          } else {
            console.log("Response: ", res?.error);
          }
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setUpdateStatus(false);
          setTimeout(() => {
            setDashboardLoading(false);
          }, 500);
        }
      }
    };
    getDashboardData();
  }, [dashboardData]);

  const skeletonCount = [1, 2, 3, 4];

  return dashboardLoading ? (
    <div className="pb-2 flex flex-row">
      <div className="transition-all w-full lg:w-[calc(100%-240px)] ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 space-y-2 sm:space-y-0 sm:gap-2 p-2 ">
          <div className="sm:col-span-2">
            <DashboardSkeleton type="item" />
          </div>
          <div className="lg:col-span-2 hidden lg:block" />

          {skeletonCount.map((item) => (
            <DashboardSkeleton key={item} type="cost" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-2">
          {skeletonCount.map((item) => (
            <DashboardSkeleton key={item} type="graph" />
          ))}
        </div>
      </div>
      <div
        className={`w-[240px] transition-all duration-[.40s] p-4 ${
          isSideNavBar
            ? "translate-x-[0px]  lg:translate-x-[0px]"
            : "translate-x-[240px]  lg:translate-x-[0px]"
        } h-[calc(100vh-48px)] fixed p-2 right-0 top-[48px] shadow-xl space-y-2 z-[48] bg-a-lightgrey/60`}
      >
        <DashboardSkeleton type="sidebar" />
      </div>
    </div>
  ) : dashboardData && dashboardData?.length <= 0 ? (
    <div>No Data Available</div>
  ) : (
    <div className="h-full w-full">
      <DashboardHome
        dashboardLoading={!dashboardLoading}
        isSideNavBar={isSideNavBar}
        setSideNavBar={setSideNavBar}
      />
    </div>
  );
};

export default Dashboard;
