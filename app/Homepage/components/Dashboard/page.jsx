"use client";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";

import {
  dashBoardDataAtom,
  fetchDashboardDataAtom,
} from "./DashboardStore/MainStore";
import DashboardHome from "./DashboardComponents/DashboardHome";
import AssetLoading from "../LoadingComponents/AssetLoading";

const Dashboard = () => {
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const fetchDashBoard = useSetAtom(fetchDashboardDataAtom);
  const dashboardData = useAtomValue(dashBoardDataAtom);

  useEffect(() => {
    const getDashboardData = async () => {
      if (dashboardData === null) {
        setDashboardLoading(true);
        try {
          const res = await fetchDashBoard();
          if (res?.success) {
            console.log("Response: ", res?.message);
          } else {
            console.log("Response: ", res?.error);
          }
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setDashboardLoading(false);
        }
      }
    };
    getDashboardData();
  }, [dashboardData]);

  return dashboardLoading ? (
    <AssetLoading />
  ) : dashboardData && dashboardData?.length < 1 ? (
    <div>No Data Available</div>
  ) : (
    <div className='relative max-h-screen border overflow-y-auto w-full'>
      <DashboardHome
        dashboardData={dashboardData}
        dashboardLoading={dashboardLoading}
      />
    </div>
  );
};

export default Dashboard;
