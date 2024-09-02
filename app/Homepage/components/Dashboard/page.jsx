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

const Dashboard = () => {
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const fetchDashBoard = useSetAtom(fetchDashboardDataAtom);
  const [updateStatus, setUpdateStatus] = useAtom(updateStatusAtom);
  const dashboardData = useAtomValue(dashBoardDataAtom);

  useEffect(() => {
    const getDashboardData = async () => {
      if (dashboardData === null || updateStatus === true) {
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
          setUpdateStatus(false);
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
